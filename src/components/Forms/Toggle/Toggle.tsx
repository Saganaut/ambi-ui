// Toggle switch built on a visually-hidden checkbox; CSS :has() drives all visual state
import { useId } from "react";
import shared from "../Field.module.css";
import type { ToggleProps } from "../Field.types";
import styles from "./Toggle.module.css";

const Toggle = ({
  id,
  label,
  labelPosition = "start",
  checked,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  ...rest
}: ToggleProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={[styles.toggleContainer, labelPosition === "start" ? styles.labelBefore : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        {...rest}
        type="checkbox"
        id={inputId}
        className={styles.toggleInput}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={inputId} className={styles.toggleWrap}>
        <span className={styles.toggleTrack}>
          <span className={styles.toggleThumb} />
        </span>
        {label && <span className={styles.toggleLabelText}>{label}</span>}
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

export { Toggle };
