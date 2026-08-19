import { FloatingPortal } from "@floating-ui/react";
import { ChevronDownIcon } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import { FeedbackMessage } from "../FeedbackMessage";
import shared from "../Field.module.css";
import type { ComboboxProps } from "../Field.types";
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
  const Comboxbox = useComboBox({
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
        Comboxbox.inputVariant !== "brand" && shared[Comboxbox.inputVariant],
      ])}
    >
      {label && (
        <div className={shared.labelWrapper}>
          <label htmlFor={Comboxbox.inputId}>{label}</label>
          {extraLabelInfo && (
            <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
          )}
        </div>
      )}
      <div
        className={jC([shared.fieldWrapper, fullWidth && shared.fullWidth])}
        data-status={Comboxbox.dataStatus}
      >
        <div className={styles.combobox}>
          <input
            {...rest}
            {...Comboxbox.getReferenceProps({
              onFocus: (event) => {
                Comboxbox.setOpen(true);
                onFocus?.(event as React.FocusEvent<HTMLInputElement>);
              },
              onKeyDown: (event) => {
                onKeyDown?.(event as React.KeyboardEvent<HTMLInputElement>);
                if (event.defaultPrevented) return;
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  Comboxbox.setOpen(true);
                  const direction = event.key === "ArrowDown" ? 1 : -1;
                  Comboxbox.setActiveIndex((current) => {
                    if (Comboxbox.filtered.length === 0) return -1;
                    if (current < 0)
                      return direction === 1
                        ? 0
                        : Comboxbox.filtered.length - 1;
                    return (
                      (current + direction + Comboxbox.filtered.length) %
                      Comboxbox.filtered.length
                    );
                  });
                } else if (
                  event.key === "Enter" &&
                  Comboxbox.isOpen &&
                  Comboxbox.filtered.length > 0
                ) {
                  event.preventDefault();
                  Comboxbox.select(
                    Comboxbox.activeIndex >= 0 ? Comboxbox.activeIndex : 0,
                  );
                } else if (event.key === "Escape") {
                  Comboxbox.setInputValue(Comboxbox.selectedLabel);
                  Comboxbox.setOpen(false);
                }
              },
            })}
            ref={(node) => {
              Comboxbox.refs.setReference(node);
              if (typeof ref === "function") ref(node);
              else if (ref != null) ref.current = node;
            }}
            id={Comboxbox.inputId}
            type="text"
            role="combobox"
            value={Comboxbox.inputValue}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={Comboxbox.isOpen}
            aria-controls={Comboxbox.listboxId}
            aria-activedescendant={
              Comboxbox.activeIndex >= 0
                ? `${Comboxbox.listboxId}-option-${Comboxbox.activeIndex}`
                : undefined
            }
            aria-invalid={Comboxbox.aria.invalid}
            aria-busy={Comboxbox.aria.busy}
            aria-describedby={Comboxbox.aria.describedBy}
            className={jC([
              shared.field,
              styles.input,
              shape !== "default" && shared[shape],
            ])}
            data-fill={fill === "default" ? undefined : fill}
            onChange={(event) => {
              Comboxbox.setInputValue(event.target.value);
              onInputValueChange?.(event.target.value);
              Comboxbox.setActiveIndex(-1);
              Comboxbox.setOpen(true);
            }}
          />
          <ChevronDownIcon
            className={jC([
              styles.chevron,
              Comboxbox.isOpen && styles.chevronOpen,
            ])}
          />
        </div>

        {Comboxbox.isOpen && (
          <FloatingPortal root={Comboxbox.portalRoot ?? undefined}>
            <div
              ref={Comboxbox.refs.setFloating}
              style={Comboxbox.floatingStyles}
              className={styles.panel}
              {...Comboxbox.getFloatingProps()}
            >
              <ul
                id={Comboxbox.listboxId}
                role="listbox"
                className={styles.list}
              >
                {Comboxbox.filtered.length === 0 ? (
                  <li className={styles.empty}>{noOptionsMessage}</li>
                ) : (
                  Comboxbox.filtered.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${Comboxbox.listboxId}-option-${index}`}
                      ref={(node) => {
                        Comboxbox.optionRefs.current[index] = node;
                      }}
                      role="option"
                      aria-selected={option.value === value}
                      className={jC([
                        styles.option,
                        index === Comboxbox.activeIndex && styles.active,
                        option.value === value && styles.selected,
                      ])}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => Comboxbox.setActiveIndex(index)}
                      onClick={() => Comboxbox.select(index)}
                    >
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </FloatingPortal>
        )}

        {Comboxbox.hasMessage && (
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
