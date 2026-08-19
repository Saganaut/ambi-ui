// Common radio input component used in form option groups throughout the app
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { Check, Loader, X } from "lucide-react";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import shared from "../Field.module.css";
import type { RadioProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./Radio.module.css";

const Radio = ({
  id,
  label,
  labelPosition = "start",
  extraLabelInfo,
  checked,
  onChange,
  name,
  value,
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
}: RadioProps) => {
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
          styles.radioContainer,
          labelPosition === "start" && styles.labelBefore,
        ])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          ref={ref}
          type="radio"
          id={inputId}
          className={styles.radioInput}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
        />
        {/* Leave as is, do not replace with FieldLabel component otherwise we ll have nested labels*/}

        <label htmlFor={inputId} className={styles.radioWrap}>
          <span className={styles.radioControl} />
          {label && (
            <span className={shared.labelWrapper}>
              <span className={styles.radioLabelText}>{label}</span>
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
        <div className={shared.statusIcon}>
          {dataStatus === "valid" && <Check />}
          {dataStatus === "validating" && <Loader />}
          {dataStatus === "invalid" && <X />}
        </div>
      </div>
    </div>
  );
};

export { Radio };
