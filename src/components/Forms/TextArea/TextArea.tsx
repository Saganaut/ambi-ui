// Common textarea component matching Input structure for multi-line text entry.
// `fullWidth` stretches the field to its container (used inside tight editor
// cells like MCQ option cards).
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import shared from "../Field.module.css";
import type { TextAreaProps } from "../Field.types";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import { FieldLabel } from "../_shared/FieldLabel";
import { useField } from "../useField";
import styles from "./TextArea.module.css";

const TextArea = ({
  value,
  ref,
  onChange,
  onFocus,
  onBlur,
  "aria-haspopup": ariaHasPopup,
  "aria-expanded": ariaExpanded,
  maxLength,
  id,
  rows = 4,
  placeholder,
  disabled,
  infoMessage,
  label,
  labelPosition = "top",
  extraLabelInfo,
  errorMessage,
  fullWidth = false,
  className,
  validationState,
  reserveMessageSpace = true,
  variant = "primary",
  fill = "default",
  shape = "default",
  fieldSize = "md",
  ...rest
}: TextAreaProps) => {
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
          className={styles.textAreaLabelWrapper}
          id={inputId}
          label={label}
          extraLabelInfo={extraLabelInfo}
        />
      )}
      <div
        className={jC([
          shared.fieldWrapper,
          fullWidth && shared.fullWidth,
          styles.textarea,
        ])}
        data-status={dataStatus}
      >
        <textarea
          {...rest}
          id={inputId}
          ref={ref}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-haspopup={ariaHasPopup}
          aria-expanded={ariaExpanded}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={aria.invalid}
          aria-busy={aria.busy}
          aria-describedby={aria.describedBy}
          data-auto-grow={fullWidth ? "true" : "false"}
          className={jC([shared.field, fullWidth ? "" : styles.noAutoGrow])}
        />
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

export { TextArea };
