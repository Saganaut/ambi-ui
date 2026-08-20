// Toggle switch built on a visually-hidden checkbox; CSS :has() drives all visual state
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import shared from "../Field.module.css";
import type { ToggleProps } from "../Field.types";
import { useField } from "../useField";
import styles from "./Toggle.module.css";

const Toggle = ({
  id,
  label,
  labelPosition = "labelAfter",
  extraLabelInfo,
  spaceBetween = false,
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
  shape = "default",
  fieldSize = "md",
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
        shared.fieldBlock,
        fullWidth && shared.fullWidth,
        styles.toggleBlock,
        className,
        variantStyles[inputVariant],
        reserveMessageSpace && shared.reserveMessageSpace,
        shared[fieldSize],
        styles[fieldSize],
      ])}
    >
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.toggleContainer,
          labelPosition === "labelBefore" && styles.labelBefore,
          labelPosition === "labelAbove" && styles.labelAbove,
          spaceBetween && labelPosition !== "labelAbove" && styles.stretch,
          reserveMessageSpace && !hasMessage && styles.reserveMessageSpace,
        ])}
        data-status={dataStatus}
      >
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          id={inputId}
          className={styles.toggleInput}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
        />
        <label htmlFor={inputId} className={styles.toggleWrap}>
          <span
            className={jC([
              styles.toggleTrack,
              shape !== "default" && styles[shape],
            ])}
          >
            <span className={styles.toggleThumb} />
          </span>
          {label && (
            <span
              className={jC([shared.labelWrapper, styles.toggleLabelWrapper])}
            >
              <span className={styles.toggleLabelText}>{label}</span>
              {extraLabelInfo && (
                <span className={shared.extraLabelInfo}>{extraLabelInfo}</span>
              )}
            </span>
          )}
        </label>
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
