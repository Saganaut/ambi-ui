// Common textarea component matching Input structure for multi-line text entry.
// `fullWidth` stretches the field to its container (used inside tight editor
// cells like MCQ option cards), `isBordered={false}` drops the visible border
// so the field reads as plain text until focused.
import React, { useId } from "react";
import type { InputBaseProps } from "../InputBaseProps";
import shared from "../Input.module.css";
import styles from "./TextArea.module.css";
import type { FieldStyleProps } from "../Field.types";

interface TextAreaProps
  extends InputBaseProps, FieldStyleProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default";
  labelPosition?: "labelAbove" | "labelInFront";
  fullWidth?: boolean;
  // `autoGrow={false}` opts out of `field-sizing: content` so the field
  // fills its container instead of growing with content. Hosts using
  // this typically pair it with `useFitText` to shrink the font.
  autoGrow?: boolean;
  ref?: React.RefObject<HTMLTextAreaElement | null>;
}

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
  labelPosition = "labelAbove",
  errorMessage,
  fullWidth = false,
  isBordered = true,
  autoGrow = true,
  fill = "default",
  shape = "default",
  size = "md",
}: TextAreaProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasMessage = errorMessage != null || infoMessage != null;
  return (
    <div
      className={[shared.inputContainer, shared[labelPosition], fullWidth ? shared.fullWidth : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <label htmlFor={inputId}>{label}</label>}
      <div
        className={[styles.textarea, fullWidth ? styles.fullWidth : ""].filter(Boolean).join(" ")}
      >
        <textarea
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
          data-auto-grow={autoGrow ? "true" : "false"}
          className={[
            shared.fieldControl,
            shared[size],
            shape === "pill" && shared.pill,
            errorMessage ? shared.error : "",
            isBordered ? "" : shared.noBorders,
            autoGrow ? "" : styles.noAutoGrow,
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
