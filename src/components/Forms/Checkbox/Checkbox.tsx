// Common checkbox input component used in forms throughout the app
import { useId } from "react";
import shared from "../Field.module.css";
import type { CheckboxProps } from "../Field.types";
import styles from "./Checkbox.module.css";

const Checkbox = ({
  id,
  label,
  labelPosition = "start",
  spaceBetween = false,
  checked,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={[
        styles.checkboxContainer,
        labelPosition === "start" ? styles.labelBefore : "",
        spaceBetween ? styles.stretch : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        {...rest}
        type="checkbox"
        id={inputId}
        className={styles.checkboxInput}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={inputId} className={styles.checkboxWrap}>
        <span className={styles.checkboxControl} />
        {label && <span className={styles.checkboxLabelText}>{label}</span>}
      </label>
      {(errorMessage != null || infoMessage != null) && (
        <span
          className={[
            shared.inputInfoMessage,
            styles.message,
            errorMessage ? shared.errorMessage : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {errorMessage ?? infoMessage}
        </span>
      )}
    </div>
  );
};

export { Checkbox };
