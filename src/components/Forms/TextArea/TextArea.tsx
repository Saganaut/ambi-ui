// Common textarea component matching Input structure for multi-line text entry.
// `fullWidth` stretches the field to its container (used inside tight editor
// cells like MCQ option cards).
import { useId } from "react";
import shared from "../Field.module.css";
import type { TextAreaProps } from "../Field.types";
import styles from "./TextArea.module.css";

const TextArea = ({
  value,
  ref,
  onChange,
  onFocus,
  onBlur,
  "aria-haspopup": ariaHasPopup,
  "aria-expanded": ariaExpanded,
  maxLength,
  id,
  rows = 4,
  placeholder,
  disabled,
  infoMessage,
  label,
  labelPosition = "top",
  errorMessage,
  fullWidth = false,
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ...rest
}: TextAreaProps) => {
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
        fullWidth ? shared.fullWidth : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <label htmlFor={inputId}>{label}</label>}
      <div
        className={[styles.textarea, fullWidth ? styles.fullWidth : ""].filter(Boolean).join(" ")}
      >
        <textarea
          {...rest}
          id={inputId}
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-haspopup={ariaHasPopup}
          aria-expanded={ariaExpanded}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={errorMessage != null || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          data-auto-grow={fullWidth ? "true" : "false"}
          className={[
            shared.field,
            shape === "pill" && shared.pill,
            errorMessage ? shared.error : "",
            fullWidth ? "" : styles.noAutoGrow,
          ]
            .filter(Boolean)
            .join(" ")}
          data-fill={fill === "default" ? undefined : fill}
        />
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

export { TextArea };
