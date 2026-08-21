// Toggle switch built on a visually-hidden checkbox; CSS :has() drives all visual state
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
import shared from "../Field.module.css";
import type { ToggleProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./Toggle.module.css";

const Toggle = ({
  id,
  label,
  labelPosition = "start",
  extraLabelInfo,
  checked,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  fullWidth = false,
  reserveMessageSpace = true,
  className,
  validationState,
  variant = "primary",
  fill = "default",
  fieldSize = "md",
  shape = "pill",
  spaceBetween = false,
  ref,
  ...rest
}: ToggleProps) => {
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
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        shared.fieldRoot,
        shared[labelPosition],
        fullWidth && shared.fullWidth,
        className,
        variantStyles[variant],
        reserveMessageSpace && shared.reserveMessageSpace,

        shared[inputVariant],
      ])}
    >
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.toggleComponent,
          spaceBetween && styles.spaceBetween,
          styles[fieldSize],
          styles[shape],
          labelPosition === "start" && styles.start,
        ])}
        data-status={dataStatus}
      >
        {" "}
        <div className={jC([spaceBetween && styles.spaceBetween])}>
          <input
            {...rest}
            ref={ref}
            type="checkbox"
            id={inputId}
            className={styles.toggleInput}
            checked={checked ?? false}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={aria.invalid}
            aria-busy={aria.busy}
            aria-describedby={aria.describedBy}
          />

          <label
            htmlFor={inputId}
            className={jC([
              styles.toggleWrap,
              spaceBetween && styles.spaceBetween,
            ])}
          >
            <span className={styles.toggleTrack}>
              <span className={styles.toggleThumb} />
            </span>
            {label && (
              <FieldLabel
                className={shared.labelWrapper}
                id={`${inputId}Label`}
                extraLabelInfo={extraLabelInfo}
                label={label}
              />
            )}
          </label>
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

export { Toggle };
