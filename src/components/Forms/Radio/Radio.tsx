// Common radio input component used in form option groups throughout the app
import { useId } from "react";
import shared from "../Field.module.css";
import type { RadioProps } from "../Field.types";
import styles from "./Radio.module.css";

const Radio = ({
  id,
  label,
  labelPosition = "start",
  checked,
  onChange,
  name,
  value,
  disabled,
  errorMessage,
  infoMessage,
  ...rest
}: RadioProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={[styles.radioContainer, labelPosition === "start" ? styles.labelBefore : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        {...rest}
        type="radio"
        id={inputId}
        className={styles.radioInput}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={inputId} className={styles.radioWrap}>
        <span className={styles.radioControl} />
        {label && <span className={styles.radioLabelText}>{label}</span>}
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

export { Radio };
