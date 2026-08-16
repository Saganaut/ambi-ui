// RadioGroup — wraps Radio items into a named fieldset where exactly one option must be selected
import shared from "../Field.module.css";
import type { RadioGroupProps } from "../Field.types";
import { Radio } from "../Radio/Radio";
import styles from "./RadioGroup.module.css";

const RadioGroup = ({
  name,
  legend,
  options,
  value,
  onChange,
  disabled,
  errorMessage,
  infoMessage,
  ...rest
}: RadioGroupProps) => {
  return (
    <fieldset {...rest} className={styles.radioGroupContainer}>
      {legend && <legend className={styles.radioGroupLegend}>{legend}</legend>}
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
      {(errorMessage != null || infoMessage != null) && (
        <span
          className={[
            shared.inputInfoMessage,
            styles.message,
            errorMessage ? shared.errorMessage : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {errorMessage ?? infoMessage}
        </span>
      )}
    </fieldset>
  );
};

export { RadioGroup };
