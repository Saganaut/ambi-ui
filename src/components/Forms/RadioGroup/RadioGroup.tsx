// RadioGroup — wraps Radio items into a named fieldset where exactly one option must be selected
import { jC } from "@utils/utils";
import { Check, Loader, X } from "lucide-react";
import { FeedbackMessage } from "../_shared/FeedbackMessage";
import shared from "../Field.module.css";
import type { RadioGroupProps } from "../Field.types";
import { Radio } from "../Radio/Radio";
import { useField } from "../useField";
import styles from "./RadioGroup.module.css";

const RadioGroup = ({
  name,
  legend,
  label,
  extraLabelInfo,
  options,
  value,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  validationState,
  className,
  id,
  ...rest
}: RadioGroupProps) => {
  const {
    inputId: groupId,
    messageId,
    hasMessage,
    dataStatus,
    aria,
  } = useField({
    id,
    infoMessage,
    errorMessage,
    validationState,
    variant: "primary",
  });
  const groupLabel = legend ?? label;

  return (
    <fieldset
      {...rest}
      id={groupId}
      disabled={disabled}
      aria-invalid={aria.invalid}
      aria-busy={aria.busy}
      aria-describedby={aria.describedBy}
      className={jC([shared.fieldRoot, shared.top, shared.md, className])}
    >
      {/* Leave as is, do not replace with FieldLabel component otherwise we ll have nested labels*/}

      {groupLabel && (
        <legend className={jC([shared.labelWrapper, styles.radioGroupLegend])}>
          {groupLabel}
          {extraLabelInfo && (
            <span className={shared.extraLabelInfo}>{extraLabelInfo}</span>
          )}
        </legend>
      )}
      <div
        className={jC([shared.fieldWrapper, styles.radioGroupContainer])}
        data-status={dataStatus}
      >
        <div className={styles.radioGroupOptions}>
          {options.map((option) => (
            <Radio
              key={option.value}
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              label={option.label}
              checked={value === option.value}
              onChange={() => {
                onChange(option.value);
              }}
              disabled={disabled}
            />
          ))}
        </div>
        {hasMessage && (
          <FeedbackMessage
            id={messageId}
            errorMessage={errorMessage}
            infoMessage={infoMessage}
          />
        )}
        <div className={shared.statusIcon}>
          {dataStatus === "valid" && <Check />}
          {dataStatus === "validating" && <Loader />}
          {dataStatus === "invalid" && <X />}
        </div>
      </div>
    </fieldset>
  );
};

export { RadioGroup };
