import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import shared from "../Field.module.css";
import type { NumberInputProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
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
  compact = false,
  expectedMaxValue,
  ref,
  ...rest
}: NumberInputProps) => {
  const { inputId, messageId, hasMessage, hasError, inputVariant, aria } =
    useField({
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
  const sizingValue = Number.isFinite(expectedMaxValue)
    ? expectedMaxValue
    : undefined;

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
      data-label-position={labelPosition}
      className={jC([
        shared.fieldRoot,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[inputVariant],
        variantStyles[fieldSize],
        variantStyles[shape],
        variantStyles[fill],
        reserveMessageSpace && !hasMessage && shared.reserveMessageSpace,
      ])}
    >
      {label && (
        <FieldLabel
          className={styles.labelWrapper}
          id={inputId}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      )}
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.numberInputWrapper,
          compact ? styles.compact : "",
        ])}
      >
        <div
          className={jC([
            shared.field,
            styles.field,
            disabled ? styles.disabled : "",
            hasError ? styles.error : "",
          ])}
        >
          <span className={styles.valueStack}>
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
            {compact && sizingValue != null && (
              <span className={styles.valueSizer} aria-hidden="true">
                {sizingValue}
              </span>
            )}
          </span>
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
          <FeedbackMessage
            id={messageId}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
          />
        )}
      </div>
    </div>
  );
};

export { NumberInput };
