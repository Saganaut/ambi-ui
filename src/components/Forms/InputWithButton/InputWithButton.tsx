// Text input fused with an action button, used for search or submit-inline patterns
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { Btn } from "../../Buttons/Btn";
import shared from "../Field.module.css";
import type { InputWithButtonProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
import { StatusIcon } from "../_shared/StatusIcon";
import { useField } from "../useField";
import styles from "./InputWithButton.module.css";

/*
TODO: We should have states for the button that align with the input field
Validating
Disabled should be similar color

*/
const InputWithButton = ({
  id,
  value,
  onChange,
  maxLength,
  placeholder,
  disabled,
  label,
  labelPosition = "top",
  extraLabelInfo,
  buttonLabel,
  buttonIcon,
  buttonIconPosition = "left",
  buttonAriaLabel,
  onButtonClick,
  errorMessage,
  infoMessage,
  reserveMessageSpace = true,
  fullWidth = false,
  className,
  validationState,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ref,
  ...rest
}: InputWithButtonProps) => {
  const { inputId, messageId, hasMessage, dataStatus, inputVariant, aria } =
    useField({
      id,
      infoMessage,
      errorMessage,
      validationState,
      variant,
    });

  const deriveButtonVariant = () => {
    if (dataStatus === "invalid") {
      return "error";
    }
    return variant;
  };
  const deriveButtonDisabledState = () => {
    if (disabled === true) return true;
    if (dataStatus === "invalid" || dataStatus === "validating") {
      return true;
    }
    return false;
  };

  return (
    <div
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
      {label && (
        <FieldLabel
          className={shared.labelWrapper}
          id={inputId}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      )}
      <div
        className={jC([shared.fieldWrapper, fullWidth && shared.fullWidth])}
        data-status={dataStatus}
      >
        <div
          className={jC([
            shared.fieldWrapper,
            fullWidth && shared.fullWidth,
            styles.inputWithButton,
          ])}
          data-status={dataStatus}
        >
          <div className={styles.relative}>
            <input
              {...rest}
              id={inputId}
              ref={ref}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={aria.invalid}
              aria-busy={aria.busy}
              aria-describedby={aria.describedBy}
              className={shared.field}
            />
            <StatusIcon dataStatus={dataStatus} />
          </div>
          <Btn
            type="button"
            onClick={onButtonClick}
            isDisabled={deriveButtonDisabledState()}
            fill={fill}
            shape={shape}
            size={fieldSize}
            icon={buttonIcon}
            iconPosition={buttonIconPosition}
            aria-label={buttonAriaLabel}
            variant={deriveButtonVariant()}
          >
            {buttonLabel ?? (buttonIcon == null ? "Submit" : undefined)}
          </Btn>
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

export { InputWithButton };
