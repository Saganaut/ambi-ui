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
  labelPosition = "labelAfter",
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
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        shared.fieldBlock,
        fullWidth && shared.fullWidth,
        styles.checkboxBlock,
        className,
        variantStyles[inputVariant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        styles[fieldSize],
      ])}
    >
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          labelPosition === "labelBefore" && styles.labelBefore,
          spaceBetween && styles.stretch,
          reserveMessageSpace && !hasMessage && styles.reserveMessageSpace,
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
          <span
            className={jC([
              styles.checkboxControl,
              shape !== "default" && styles[shape],
            ])}
          />
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
