/**
 * Renders a controlled select field with optional search and multi-selection.
 *
 * The option panel is portalled and positioned by Floating UI so scroll and
 * overflow ancestors cannot clip it.
 */
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
} from "@floating-ui/react";
import { useEffect, useId, useRef, useState } from "react";
import { inheritTheme } from "../../../utils/inheritTheme";
import type { BtnVariant } from "../../Buttons/Btn.types";
import shared from "../Field.module.css";
import type { DropdownOption, DropdownProps } from "../Field.types";
import styles from "./Dropdown.module.css";
import { useDropdown } from "./useDropdown";

const Dropdown = ({
  options,
  value: selectedValue,
  onChange,
  multiple = false,
  searchable = false,
  label,
  labelPosition = "top",
  placeholder,
  errorMessage,
  infoMessage,
  id,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  disabled,
  ref,

  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ...rest
}: DropdownProps) => {
  const selectedValues = Array.isArray(selectedValue)
    ? selectedValue
    : selectedValue == null
      ? []
      : [selectedValue];
  const generatedId = useId();
  const dropdownId = id ?? generatedId;
  const listboxId = useId();
  const messageId = `${dropdownId}-message`;
  const inputVariant: BtnVariant = errorMessage != null ? "error" : variant;
  const { isOpen, query, setQuery, setOpen, filtered, toggle, removeChip, removeChipOnKey } =
    useDropdown({
      options,
      value: selectedValues,
      multiple,
      searchable,
      onChange: (values) => {
        if (multiple) {
          (onChange as ((value: string[]) => void) | undefined)?.(values);
        } else {
          (onChange as ((value: string) => void) | undefined)?.(values[0] ?? "");
        }
      },
    });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const optionLabels = useRef<(string | null)[]>([]);
  const selectedIndex = filtered.findIndex((option) => selectedValues.includes(option.value));
  const { refs, floatingStyles, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: "bottom-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          if (elements.reference instanceof Element) {
            inheritTheme(elements.reference, elements.floating);
          }
          elements.floating.style.setProperty(
            "--dropdown-reference-width",
            `${rects.reference.width.toString()}px`,
          );
        },
      }),
    ],
  });
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    } else if (!searchable && activeIndex != null) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen, searchable]);
  useEffect(() => {
    if (disabled && isOpen) {
      setOpen(false);
    }
  }, [disabled, isOpen, setOpen]);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: optionRefs,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onNavigate: setActiveIndex,
    focusItemOnOpen: !searchable,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: optionLabels,
    activeIndex,
    selectedIndex: selectedIndex < 0 ? null : selectedIndex,
    onMatch: setActiveIndex,
    enabled: !searchable,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    listNavigation,
    typeahead,
  ]);
  const portalRoot = refs.domReference.current?.closest("dialog") as HTMLElement | null;

  const triggerContent =
    selectedValues.length === 0 ? (
      <span className={styles.dropdownPlaceholder}>{placeholder}</span>
    ) : multiple ? (
      <span className={styles.chipList}>
        {selectedValues.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span key={v} className={styles.chip}>
              {opt?.label}
              <span
                role="button"
                tabIndex={0}
                aria-label={`Remove ${opt?.label ?? v}`}
                className={styles.chipRemove}
                onClick={(e) => {
                  removeChip(e, v);
                }}
                onKeyDown={(e) => {
                  removeChipOnKey(e, v);
                }}
              >
                &times;
              </span>
            </span>
          );
        })}
      </span>
    ) : (
      <span>{options.find((o) => o.value === selectedValues[0])?.label ?? placeholder}</span>
    );

  return (
    <div
      className={[
        shared.fieldContainer,
        shared[fieldSize],
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        reserveMessageSpace && shared.reserveMessageSpace,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <label htmlFor={dropdownId}>{label}</label>}
      <div className={styles.dropdown}>
        <button
          {...rest}
          ref={(node) => {
            refs.setReference(node);
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
          }}
          type="button"
          id={dropdownId}
          className={[
            shared.field,
            shape === "pill" && shared.pill,
            inputVariant !== "brand" && shared[inputVariant],
            styles.dropdownTrigger,
          ]
            .filter(Boolean)
            .join(" ")}
          data-fill={fill === "default" ? undefined : fill}
          disabled={disabled}
          aria-invalid={errorMessage != null || undefined}
          aria-describedby={errorMessage != null || infoMessage != null ? messageId : undefined}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          {...getReferenceProps()}
        >
          {triggerContent}
          <svg
            className={[styles.chevron, isOpen ? styles.chevronOpen : ""].filter(Boolean).join(" ")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {isOpen && (
          <FloatingPortal root={portalRoot ?? undefined}>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                className={[styles.dropdownPanel].filter(Boolean).join(" ")}
                data-placement={placement}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {searchable && (
                  <div className={styles.dropdownSearch}>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                      placeholder="Search..."
                      aria-label="Search options"
                      // The panel is already a raised surface — opt the search
                      // box out of the shared field chrome (bg/shadow).
                      className={shared.noBorders}
                      autoFocus
                    />
                  </div>
                )}
                <ul
                  id={listboxId}
                  role="listbox"
                  aria-multiselectable={multiple}
                  className={styles.dropdownList}
                >
                  {filtered.length === 0 ? (
                    <li className={styles.dropdownEmpty}>No options</li>
                  ) : (
                    filtered.map((opt, index) => (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={selectedValues.includes(opt.value)}
                        className={[
                          styles.dropdownOption,
                          selectedValues.includes(opt.value) ? styles.selected : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        ref={(node) => {
                          optionRefs.current[index] = node;
                          optionLabels.current[index] = opt.label;
                        }}
                        {...getItemProps({
                          onClick: () => {
                            toggle(opt.value);
                          },
                          onKeyDown: (event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              toggle(opt.value);
                            }
                          },
                        })}
                        tabIndex={activeIndex === index ? 0 : -1}
                      >
                        {multiple && (
                          <input
                            type="checkbox"
                            readOnly
                            checked={selectedValues.includes(opt.value)}
                            tabIndex={-1}
                            aria-hidden="true"
                          />
                        )}
                        {opt.label}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}

        {(errorMessage != null || infoMessage != null) && (
          <span
            id={messageId}
            className={[
              shared.inputInfoMessage,
              styles.message,
              errorMessage ? shared.errorMessage : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {errorMessage ?? infoMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export { Dropdown };
export type { DropdownOption };
