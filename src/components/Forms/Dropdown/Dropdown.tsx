/**
 * Renders a controlled select field with optional search and multi-selection.
 *
 * The option panel is portalled and positioned by Floating UI so scroll and
 * overflow ancestors cannot clip it.
 */
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { ChevronDownIcon } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import shared from "../Field.module.css";
import type { DropdownOption, DropdownProps } from "../Field.types";
import { Chip } from "./Chip";
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
  extraLabelInfo,
  placeholder,
  errorMessage,
  infoMessage,
  id,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  disabled,
  ref,
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ...rest
}: DropdownProps) => {
  const {
    isOpen,
    query,
    setQuery,
    getItemProps,
    activeIndex,
    optionLabels,
    floatingStyles,
    portalRoot,
    context,
    placement,
    getReferenceProps,
    getFloatingProps,
    optionRefs,
    refs,
    filtered,
    toggle,
    removeChip,
    removeChipOnKey,
    inputId,
    messageId,
    hasMessage,
    dataStatus,
    inputVariant,
    aria,
    selectedValues,
  } = useDropdown({
    useFieldProps: { id, infoMessage, errorMessage, validationState, variant },
    options,
    selectedValue,
    multiple,
    disabled,
    searchable,
    onChange: (values) => {
      if (multiple) {
        (onChange as ((value: string[]) => void) | undefined)?.(values);
      } else {
        (onChange as ((value: string) => void) | undefined)?.(values[0] ?? "");
      }
    },
  });

  const triggerContent =
    selectedValues.length === 0 ? (
      <span className={styles.dropdownPlaceholder}>{placeholder}</span>
    ) : multiple ? (
      <span className={styles.chipList}>
        {selectedValues.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <Chip
              key={v}
              value={v}
              label={opt?.label ?? v}
              removeChip={removeChip}
              removeChipOnKey={removeChipOnKey}
            />
          );
        })}
      </span>
    ) : (
      <span>
        {options.find((o) => o.value === selectedValues[0])?.label ??
          placeholder}
      </span>
    );

  return (
    <div
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        shared.fieldBlock,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[variant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        inputVariant !== "brand" && shared[inputVariant],
      ])}
    >
      {label && (
        <div className={shared.labelWrapper}>
          <label htmlFor={inputId}>{label}</label>
          {extraLabelInfo && (
            <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
          )}
        </div>
      )}
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.dropdown,
        ])}
        data-status={dataStatus}
      >
        <button
          {...rest}
          ref={(node) => {
            refs.setReference(node);
            if (typeof ref === "function") ref(node);
            else if (ref != null) ref.current = node;
          }}
          type="button"
          id={inputId}
          className={jC([
            shared.field,
            shape !== "default" && shared[shape],
            styles.dropdownTrigger,
          ])}
          data-fill={fill === "default" ? undefined : fill}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? inputId : undefined}
          {...getReferenceProps()}
        >
          {triggerContent}

          <ChevronDownIcon
            className={jC([styles.chevron, isOpen ? styles.chevronOpen : ""])}
          />
        </button>

        {isOpen && (
          <FloatingPortal root={portalRoot ?? undefined}>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                className={jC([styles.dropdownPanel])}
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
                  id={`${inputId}-inputId`}
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
                        className={jC([
                          styles.dropdownOption,
                          selectedValues.includes(opt.value)
                            ? styles.selected
                            : "",
                        ])}
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

        {hasMessage && (
          <span
            id={messageId}
            aria-live="polite"
            className={jC([
              shared.inputInfoMessage,
              shared.message,
              errorMessage ? shared.errorMessage : "",
            ])}
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
