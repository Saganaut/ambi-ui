// Common checkbox input component used in forms throughout the app
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import shared from "../Field.module.css";
import type { CheckboxProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  id,
  label,
  labelPosition = "end",
  extraLabelInfo,
  spaceBetween = false,
  checked,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ref,
  ...rest
}: CheckboxProps) => {
  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } =
    useField({
      id,
      infoMessage,
      errorMessage,
      validationState,
      variant,
    });

  return (
    <div
      className={jC([
        shared.fieldRoot,
        fullWidth && shared.fullWidth,
        styles.checkboxComponent,
        className,
        variantStyles[inputVariant],
        variantStyles[fieldSize],
        variantStyles[shape],
        variantStyles[fill],
        reserveMessageSpace && !hasMessage && shared.reserveMessageSpace,
      ])}
    >
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          labelPosition === "start" && styles.start,
          spaceBetween && styles.stretch,
        ])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          id={inputId}
          className={styles.checkboxInput}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
        />
        {/* Leave as is, do not replace with FieldLabel component otherwise we ll have nested labels*/}
        <label htmlFor={inputId} className={styles.checkboxWrap}>
          <span className={styles.checkboxControl}>
            <svg
              className={styles.checkboxTick}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12.5 9.5 17 19 7" />
            </svg>
          </span>
          {label && (
            <span
              className={jC([shared.labelWrapper, styles.checkboxLabelWrapper])}
            >
              <span className={styles.checkboxLabelText}>{label}</span>
              {extraLabelInfo && (
                <span className={shared.extraLabelInfo}>{extraLabelInfo}</span>
              )}
            </span>
          )}
        </label>
        {hasMessage && (
          <FeedbackMessage
            className={styles.message}
            id={messageId}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
          />
        )}
      </div>
    </div>
  );
};

export { Checkbox };
