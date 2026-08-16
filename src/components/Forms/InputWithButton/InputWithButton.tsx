// Text input fused with an action button, used for search or submit-inline patterns
import { useId } from "react";
import { Btn } from "../../Buttons/Btn";
import shared from "../Field.module.css";
import type { InputWithButtonProps } from "../Field.types";
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
  buttonLabel = "Submit",
  onButtonClick,
  errorMessage,
  infoMessage,
  reserveMessageSpace = true,
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ...rest
}: InputWithButtonProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasMessage = errorMessage != null || infoMessage != null;
  return (
    <div
      className={[
        shared.fieldContainer,
        shared[fieldSize],
        shared[labelPosition],
        reserveMessageSpace && shared.reserveMessageSpace,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <label htmlFor={inputId}>{label}</label>}
      <div className={styles.inputWithButton}>
        <input
          {...rest}
          id={inputId}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={errorMessage != null || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          className={[
            shared.field,
            shape === "pill" && shared.pill,
            errorMessage ? shared.error : "",
          ]
            .filter(Boolean)
            .join(" ")}
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
            className={[
              shared.inputInfoMessage,
              styles.message,
              errorMessage && shared.errorMessage,
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

export { InputWithButton };
