// Numeric input: same labelled-container layout as Input, but the value/onChange
// API is typed as `number` so callers skip the parse-fallback dance. The native
// number spinners can't be styled to the design, so they're suppressed and a
// custom two-button stepper drives min/max/step. The field grows to fill its
// parent — the host dictates the width.
import { ChevronDown, ChevronUp } from "lucide-react";
import shared from "../Field.module.css";
import type { NumberInputProps } from "../Field.types";
import styles from "./NumberInput.module.css";

const toNumber = (raw: string | number | undefined): number | undefined => {
  if (raw == null || raw === "") return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const NumberInput = ({
  value,
  onChange,
  onBlur,
  id,
  name,
  label,
  labelPosition = "top",
  infoMessage,
  errorMessage,
  fullWidth = false,
  fieldSize = "md",
  fill = "default",
  shape = "default",
  disabled,
  min,
  max,
  step,
  placeholder,
  ...rest
}: NumberInputProps) => {
  const minN = toNumber(min);
  const maxN = toNumber(max);
  const stepN = toNumber(step) ?? 1;
  const current = Number.isFinite(value) ? value : 0;

  const clamp = (candidate: number) => {
    let next = candidate;
    if (minN != null) next = Math.max(minN, next);
    if (maxN != null) next = Math.min(maxN, next);
    return next;
  };

  const stepBy = (delta: number) => {
    if (disabled) return;
    onChange(clamp(current + delta));
  };

  const atMax = maxN != null && current >= maxN;
  const atMin = minN != null && current <= minN;

  return (
    <div
      className={[shared.fieldContainer, shared[labelPosition], fullWidth ? shared.fullWidth : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.wrapper}>
        <div
          className={[
            styles.field,
            styles[fieldSize],
            shape === "pill" ? styles.pill : "",
            disabled ? styles.disabled : "",
            errorMessage != null ? styles.error : "",
          ]
            .filter(Boolean)
            .join(" ")}
          data-fill={fill === "default" ? undefined : fill}
        >
          <input
            {...rest}
            type="number"
            id={id}
            name={name}
            value={current}
            onChange={(event) => {
              const next = Number(event.target.value);
              onChange(Number.isFinite(next) ? next : 0);
            }}
            onBlur={onBlur}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            className={[styles.input, errorMessage != null ? styles.error : ""]
              .filter(Boolean)
              .join(" ")}
          />
          <div className={styles.stepper}>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase"
              className={[styles.stepBtn, styles.stepUp].join(" ")}
              disabled={disabled || atMax}
              onClick={() => stepBy(stepN)}
            >
              <ChevronUp className={styles.icon} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease"
              className={[styles.stepBtn, styles.stepDown].join(" ")}
              disabled={disabled || atMin}
              onClick={() => stepBy(-stepN)}
            >
              <ChevronDown className={styles.icon} />
            </button>
          </div>
        </div>
        {(errorMessage != null || infoMessage != null) && (
          <span
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

export { NumberInput };
