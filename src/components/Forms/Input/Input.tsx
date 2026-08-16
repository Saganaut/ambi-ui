import { Check, Loader, X } from "lucide-react";
import { useId } from "react";
import variantStyles from "../../../styles/variants.module.css";
import type { BtnVariant } from "../../Buttons/Btn.types";
import shared from "../Field.module.css";
import type { InputProps } from "../Field.types";

const Input = ({
  variant = "primary",
  infoMessage,
  label,
  labelPosition = "top",
  errorMessage,
  fullWidth = false,
  extraLabelInfo,
  className,
  id,
  validationState,
  reserveMessageSpace = true,
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ref,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const hasMessage = errorMessage != null || infoMessage != null;
  const hasError = errorMessage != null || validationState === "invalid";
  const dataStatus = hasError ? "invalid" : (validationState ?? "idle");
  const inputVariant: BtnVariant = hasError ? "error" : variant;

  return (
    <div
      data-fill={fill === "default" ? undefined : fill}
      className={[
        shared.fieldContainer,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[variant],

        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],

        inputVariant !== "brand" && shared[inputVariant],
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Label Wrapper */}
      {label && (
        <div className={[shared.labelWrapper].filter(Boolean).join(" ")}>
          <label htmlFor={inputId}>{label}</label>
          {extraLabelInfo && (
            <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
          )}
        </div>
      )}

      {/* Field Wrapper */}
      <div
        className={[shared.fieldWrapper, fullWidth && shared.fullWidth]
          .filter(Boolean)
          .join(" ")}
        data-status={dataStatus}
      >
        <input
          {...rest}
          id={inputId}
          ref={ref}
          aria-invalid={hasError ?? undefined}
          aria-busy={validationState === "validating" || undefined}
          aria-describedby={hasMessage ? messageId : undefined}
          className={[shared.field, shape === "pill" && shared.pill]
            .filter(Boolean)
            .join(" ")}
          data-fill={fill === "default" ? undefined : fill}
        />

        {hasMessage && (
          <span
            id={messageId}
            aria-live="polite"
            className={[
              shared.inputInfoMessage,
              shared.message,
              errorMessage && shared.errorMessage,
            ]
              .filter(Boolean)
              .join(" ")}
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

export { Input };
