// Numeric input: same labelled-container layout as Input, but the value/onChange
// API is typed as `number` so callers skip the parse-fallback dance. The native
// number spinners can't be styled to the design, so they're suppressed and a
// custom two-button stepper drives min/max/step. The field grows to fill its
// parent — the host dictates the width.
import { Check, ChevronDown, ChevronUp, Loader, X } from "lucide-react";
import variantStyles from "../../../styles/variants.module.css";
import { jC } from "../../../utils/utils";
import shared from "../Field.module.css";
import type { NumberInputProps } from "../Field.types";
import { useField } from "../useField";
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
  extraLabelInfo,
  infoMessage,
  errorMessage,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  validationState,
  variant = "primary",
  fieldSize = "md",
  fill = "default",
  shape = "default",
  disabled,
  min,
  max,
  step,
  placeholder,
  ref,
  ...rest
}: NumberInputProps) => {
  const {
    inputId,
    messageId,
    hasMessage,
    hasError,
    dataStatus,
    inputVariant,
    aria,
  } = useField({
    id,
    infoMessage,
    errorMessage,
    validationState,
    variant,
  });
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
      {label && (
        <div className={shared.labelWrapper}>
          <label htmlFor={inputId}>{label}</label>
          {extraLabelInfo && (
            <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
          )}
        </div>
      )}
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.wrapper,
        ])}
        data-status={dataStatus}
      >
        <div
          className={jC([
            styles.field,
            styles[fieldSize],
            shape === "pill" ? styles.pill : "",
            disabled ? styles.disabled : "",
            hasError ? styles.error : "",
          ])}
          data-fill={fill === "default" ? undefined : fill}
        >
          <input
            {...rest}
            type="number"
            id={inputId}
            ref={ref}
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
            aria-invalid={aria.invalid}
            aria-busy={aria.busy}
            aria-describedby={aria.describedBy}
            className={jC([styles.input, hasError ? styles.error : ""])}
          />
          <div className={styles.stepper}>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Increase"
              className={jC([styles.stepBtn, styles.stepUp])}
              disabled={disabled || atMax}
              onClick={() => stepBy(stepN)}
            >
              <ChevronUp className={styles.icon} />
            </button>
            <button
              type="button"
              tabIndex={-1}
              aria-label="Decrease"
              className={jC([styles.stepBtn, styles.stepDown])}
              disabled={disabled || atMin}
              onClick={() => stepBy(-stepN)}
            >
              <ChevronDown className={styles.icon} />
            </button>
          </div>
        </div>
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

export { NumberInput };
