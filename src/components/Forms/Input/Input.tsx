import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import shared from "../Field.module.css";
import type { InputProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
import { StatusIcon } from "../_shared/StatusIcon";
import { useField } from "../useField";

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
  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } =
    useField({
      id,
      infoMessage,
      errorMessage,
      validationState,
      variant,
    });

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
        reserveMessageSpace && shared.reserveMessageSpace,
      ])}
    >
      {/* Label Wrapper */}
      {label && (
        <FieldLabel
          className={shared.labelWrapper}
          id={inputId}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      )}

      {/* Field Wrapper */}
      <div
        className={jC([shared.fieldWrapper, fullWidth && shared.fullWidth])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          id={inputId}
          ref={ref}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
          className={shared.field}
        />

        {hasMessage && (
          <FeedbackMessage
            id={messageId}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
          />
        )}
        <StatusIcon dataStatus={dataStatus} />
      </div>
    </div>
  );
};

export { Input };
