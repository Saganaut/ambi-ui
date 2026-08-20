import { FloatingPortal } from "@floating-ui/react";
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { ChevronDownIcon } from "lucide-react";
import shared from "../Field.module.css";
import type { ComboboxProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
import styles from "./Combobox.module.css";
import { useComboBox } from "./useComboBox";

const Combobox = ({
  options,
  value = "",
  onChange,
  onInputValueChange,
  noOptionsMessage = "No options",
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
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ref,
  onFocus,
  onKeyDown,
  ...rest
}: ComboboxProps) => {
  const Combobox = useComboBox({
    disabled,
    onChange,
    id,
    options,
    value,
    infoMessage,
    errorMessage,
    validationState,
    variant,
  });
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
        Combobox.inputVariant !== "brand" && shared[Combobox.inputVariant],
      ])}
    >
      {label && (
        <FieldLabel
          className={shared.labelWrapper}
          id={Combobox.inputId}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      )}
      <div
        className={jC([shared.fieldWrapper, fullWidth && shared.fullWidth])}
        data-status={Combobox.dataStatus}
      >
        <div className={styles.combobox}>
          <input
            {...rest}
            {...Combobox.getReferenceProps({
              onFocus: (event) => {
                Combobox.setOpen(true);
                onFocus?.(event as React.FocusEvent<HTMLInputElement>);
              },
              onKeyDown: (event) => {
                onKeyDown?.(event as React.KeyboardEvent<HTMLInputElement>);
                if (event.defaultPrevented) return;
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  Combobox.setOpen(true);
                  const direction = event.key === "ArrowDown" ? 1 : -1;
                  Combobox.setActiveIndex((current) => {
                    if (Combobox.filtered.length === 0) return -1;
                    if (current < 0)
                      return direction === 1 ? 0 : Combobox.filtered.length - 1;
                    return (
                      (current + direction + Combobox.filtered.length) %
                      Combobox.filtered.length
                    );
                  });
                } else if (
                  event.key === "Enter" &&
                  Combobox.isOpen &&
                  Combobox.filtered.length > 0
                ) {
                  event.preventDefault();
                  Combobox.select(
                    Combobox.activeIndex >= 0 ? Combobox.activeIndex : 0,
                  );
                } else if (event.key === "Escape") {
                  Combobox.setInputValue(Combobox.selectedLabel);
                  Combobox.setOpen(false);
                }
              },
            })}
            ref={(node) => {
              Combobox.refs.setReference(node);
              if (typeof ref === "function") ref(node);
              else if (ref != null) ref.current = node;
            }}
            id={Combobox.inputId}
            type="text"
            role="combobox"
            value={Combobox.inputValue}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={Combobox.isOpen}
            aria-controls={Combobox.listboxId}
            aria-activedescendant={
              Combobox.activeIndex >= 0
                ? `${Combobox.listboxId}-option-${Combobox.activeIndex}`
                : undefined
            }
            aria-invalid={Combobox.aria.invalid}
            aria-busy={Combobox.aria.busy}
            aria-describedby={Combobox.aria.describedBy}
            className={jC([
              shared.field,
              styles.input,
              shape !== "default" && shared[shape],
            ])}
            data-fill={fill === "default" ? undefined : fill}
            onChange={(event) => {
              Combobox.setInputValue(event.target.value);
              onInputValueChange?.(event.target.value);
              Combobox.setActiveIndex(-1);
              Combobox.setOpen(true);
            }}
          />
          <button
            type="button"
            data-combobox-toggle
            className={styles.chevronButton}
            aria-label={Combobox.isOpen ? "Close options" : "Open options"}
            aria-controls={Combobox.listboxId}
            aria-expanded={Combobox.isOpen}
            disabled={disabled}
            onPointerDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => Combobox.setOpen((prev) => !prev)}
          >
            <ChevronDownIcon
              aria-hidden="true"
              className={jC([
                styles.chevron,
                Combobox.isOpen && styles.chevronOpen,
              ])}
            />
          </button>
        </div>

        {Combobox.isOpen && (
          <FloatingPortal root={Combobox.portalRoot ?? undefined}>
            <div
              ref={Combobox.refs.setFloating}
              style={Combobox.floatingStyles}
              className={styles.panel}
              {...Combobox.getFloatingProps()}
            >
              <ul
                id={Combobox.listboxId}
                role="listbox"
                className={styles.list}
              >
                {Combobox.filtered.length === 0 ? (
                  <li className={styles.empty}>{noOptionsMessage}</li>
                ) : (
                  Combobox.filtered.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${Combobox.listboxId}-option-${index}`}
                      ref={(node) => {
                        Combobox.optionRefs.current[index] = node;
                      }}
                      role="option"
                      aria-selected={option.value === value}
                      className={jC([
                        styles.option,
                        index === Combobox.activeIndex && styles.active,
                        option.value === value && styles.selected,
                      ])}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => Combobox.setActiveIndex(index)}
                      onClick={() => Combobox.select(index)}
                    >
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </FloatingPortal>
        )}

        {Combobox.hasMessage && (
          <FeedbackMessage
            id={Combobox.messageId}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
          />
        )}
      </div>
    </div>
  );
};

export { Combobox };
