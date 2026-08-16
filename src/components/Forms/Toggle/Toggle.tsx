// Toggle switch built on a visually-hidden checkbox; CSS :has() drives all visual state
import { Check, Loader, X } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import shared from "../Field.module.css";
import type { ToggleProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./Toggle.module.css";

const Toggle = ({
  id,
  label,
  labelPosition = "start",
  extraLabelInfo,
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
  fieldSize = "md",
  ref,
  ...rest
}: ToggleProps) => {
  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } = useField({
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
        shared.fieldContainer,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[variant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        inputVariant !== "brand" && shared[inputVariant],
      ])}
    >
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.toggleContainer,
          labelPosition === "start" && styles.labelBefore,
        ])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          id={inputId}
          className={styles.toggleInput}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
        />
        <label htmlFor={inputId} className={styles.toggleWrap}>
          <span className={styles.toggleTrack}>
            <span className={styles.toggleThumb} />
          </span>
          {label && (
            <span className={shared.labelWrapper}>
              <span className={styles.toggleLabelText}>{label}</span>
              {extraLabelInfo && <span className={shared.extraLabelInfo}>{extraLabelInfo}</span>}
            </span>
          )}
        </label>
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
        <div className={shared.statusIcon}>
          {dataStatus === "valid" && <Check />}
          {dataStatus === "validating" && <Loader />}
          {dataStatus === "invalid" && <X />}
        </div>
      </div>
    </div>
  );
};

export { Toggle };
