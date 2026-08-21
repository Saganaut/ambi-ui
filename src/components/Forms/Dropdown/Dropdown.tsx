import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import utilities from "@styles/utilities.module.css";
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useRef } from "react";
import { ChipList } from "../Chip/ChipList";
import shared from "../Field.module.css";
import type { DropdownOption, DropdownProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
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
  "aria-label": ariaLabel,
  ...rest
}: DropdownProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const {
    isOpen,
    isMounted,
    transitionStyles,
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
    chipRefs,
    isTypingRef,
    refs,
    filtered,
    toggle,
    selectActive,
    removeChip,
    inputId,
    listboxId,
    labelId,
    valueId,
    optionId,
    activeId,
    messageId,
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

  const labelText = label ?? ariaLabel;
  // Multiple selections are summarised here and spelled out by the chip list
  // below, so the trigger stays a <button> with no interactive descendants.
  const triggerLabel =
    selectedValues.length === 0
      ? placeholder
      : multiple
        ? `${selectedValues.length.toString()} selected`
        : (options.find((option) => option.value === selectedValues[0])
            ?.label ?? selectedValues[0]);

  /** Enter always selects; Space only when typeahead is not mid-word. */
  const selectOnKey = (event: KeyboardEvent) => {
    if (!isOpen) return;
    const isSelectKey =
      event.key === "Enter" || (event.key === " " && !isTypingRef.current);
    if (isSelectKey && selectActive()) event.preventDefault();
  };

  return (
    <div
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        shared.fieldRoot,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[variant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        inputVariant !== "brand" && shared[inputVariant],
      ])}
    >
      {label ? (
        <FieldLabel
          id={labelId}
          className={shared.labelWrapper}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      ) : (
        ariaLabel && (
          <span id={labelId} className={utilities.visuallyHidden}>
            {ariaLabel}
          </span>
        )
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
          role="combobox"
          aria-labelledby={labelText ? `${labelId} ${valueId}` : undefined}
          aria-label={
            labelText ? `${labelText}-dropdown` : `${valueId}-dropdown`
          }
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          {...getReferenceProps({ onKeyDown: selectOnKey })}
        >
          <span
            id={valueId}
            className={
              selectedValues.length === 0
                ? styles.dropdownPlaceholder
                : undefined
            }
          >
            {triggerLabel}
          </span>

          <ChevronDownIcon
            className={jC([styles.chevron, isOpen ? styles.chevronOpen : ""])}
          />
        </button>

        {multiple && selectedValues.length > 0 && (
          <ChipList
            aria-label={
              labelText ? `Selected ${labelText}` : "Selected options"
            }
            chips={selectedValues.map((value, index) => ({
              value,
              label:
                options.find((option) => option.value === value)?.label ??
                value,
              ref: (node) => {
                chipRefs.current[index] = node;
              },
              onRemove: removeChip,
            }))}
          />
        )}

        {(isOpen || isMounted) && (
          <FloatingPortal root={portalRoot ?? undefined}>
            <FloatingFocusManager
              context={context}
              modal={false}
              initialFocus={searchable ? searchRef : -1}
            >
              <div
                ref={refs.setFloating}
                className={styles.dropdownPositioner}
                data-placement={placement}
                style={floatingStyles}
                {...getFloatingProps()}
                aria-activedescendant={undefined}
              >
                <div className={styles.dropdownPanel} style={transitionStyles}>
                  {searchable && (
                    <div className={styles.dropdownSearch}>
                      <input
                        ref={searchRef}
                        type="text"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                        }}
                        onKeyDown={selectOnKey}
                        placeholder="Search..."
                        aria-label="Search options"
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-controls={listboxId}
                        aria-activedescendant={activeId}
                        aria-autocomplete="list"
                        autoComplete="off"
                        className={shared.noBorders}
                      />
                    </div>
                  )}
                  <ul
                    id={listboxId}
                    role="listbox"
                    aria-labelledby={labelText ? labelId : undefined}
                    aria-label={labelText ? undefined : "Options"}
                    aria-multiselectable={multiple}
                    className={styles.dropdownList}
                  >
                    {filtered.map((opt, index) => (
                      <li
                        key={opt.value}
                        id={optionId(index)}
                        role="option"
                        aria-selected={selectedValues.includes(opt.value)}
                        data-active={activeIndex === index}
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
                        })}
                      >
                        {multiple && (
                          <CheckIcon
                            aria-hidden="true"
                            className={jC([
                              styles.optionCheck,
                              selectedValues.includes(opt.value)
                                ? styles.optionCheckOn
                                : "",
                            ])}
                          />
                        )}
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                  {/* Outside the <ul>: a listbox may only own `option` children. */}
                  {filtered.length === 0 && (
                    <div className={styles.dropdownEmpty}>No options</div>
                  )}
                  {searchable && (
                    <span
                      aria-live="polite"
                      className={utilities.visuallyHidden}
                    >
                      {`${filtered.length.toString()} options available`}
                    </span>
                  )}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}

        {/* Mounted unconditionally: a live region inserted at the same moment as
            its text is not announced. */}
        <FeedbackMessage
          id={messageId}
          errorMessage={errorMessage}
          infoMessage={infoMessage}
        />
      </div>
    </div>
  );
};

export { Dropdown };
export type { DropdownOption };
