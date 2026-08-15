// Text input fused with an action button, used for search or submit-inline patterns
import React, { useId } from "react";
import type { ReactNode } from "react";
import type { InputBaseProps } from "../InputBaseProps";
import shared from "../Input.module.css";
import styles from "./InputWithButton.module.css";
import { Btn } from "@saganaut/ambi-ui";
import type { FieldStyleProps } from "../Field.types";

interface InputWithButtonProps
  extends
    InputBaseProps,
    FieldStyleProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  labelPosition?: "labelAbove" | "labelInFront";
  buttonLabel?: ReactNode;
  onButtonClick?: () => void;
}

const InputWithButton = ({
  id,
  value,
  onChange,
  maxLength,
  placeholder,
  disabled,
  label,
  labelPosition = "labelAbove",
  buttonLabel = "Submit",
  onButtonClick,
  errorMessage,
  infoMessage,
  ariaLabel,
  isBordered = true,
  fill = "default",
  shape = "default",
  size = "md",
  ...rest
}: InputWithButtonProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasMessage = errorMessage != null || infoMessage != null;
  return (
    <div
      className={[shared.inputContainer, shared[labelPosition], shared.withBottomPadding].join(" ")}
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
          aria-label={ariaLabel}
          aria-invalid={errorMessage != null || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          className={[
            shared.fieldControl,
            shared[size],
            shape === "pill" && shared.pill,
            errorMessage ? shared.error : "",
            isBordered ? "" : shared.noBorders,
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
          size={size}
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
