// Text input fused with an action button, used for search or submit-inline patterns
import { Check, Loader, X } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import { Btn } from "../../Buttons/Btn";
import shared from "../Field.module.css";
import type { InputWithButtonProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./InputWithButton.module.css";

const InputWithButton = ({
  id,
  value,
  onChange,
  maxLength,
  placeholder,
  disabled,
  label,
  labelPosition = "top",
  extraLabelInfo,
  buttonLabel = "Submit",
  onButtonClick,
  errorMessage,
  infoMessage,
  reserveMessageSpace = true,
  fullWidth = false,
  className,
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ref,
  ...rest
}: InputWithButtonProps) => {
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
      {label && (
        <div className={shared.labelWrapper}>
          <label htmlFor={inputId}>{label}</label>
          {extraLabelInfo && <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>}
        </div>
      )}
      <div
        className={jC([shared.fieldWrapper, fullWidth && shared.fullWidth, styles.inputWithButton])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          id={inputId}
          ref={ref}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
          className={jC([shared.field, shape === "pill" && shared.pill])}
          data-fill={fill === "default" ? undefined : fill}
        />
        <Btn
          type="button"
          onClick={onButtonClick}
          isDisabled={disabled}
          fill={fill}
          shape={shape}
          size={fieldSize}
        >
          {buttonLabel}
        </Btn>
        {hasMessage && (
          <span
            id={messageId}
            aria-live="polite"
            className={jC([
              shared.inputInfoMessage,
              shared.message,
              errorMessage && shared.errorMessage,
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

export { InputWithButton };
