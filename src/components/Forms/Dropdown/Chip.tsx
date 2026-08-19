import type { KeyboardEvent, MouseEvent } from "react";
import styles from "./Dropdown.module.css";

/*TODO: this needs to be moved to a generic place and made more generic
including passing down sizes and possibly shapes, maybe even variants?*/
interface ChipProps {
  label: string;
  value: string;
  removeChip: (event: MouseEvent<HTMLSpanElement>, value: string) => void;
  removeChipOnKey: (e: KeyboardEvent<HTMLSpanElement>, value: string) => void;
}
const Chip = ({ label, value, removeChip, removeChipOnKey }: ChipProps) => {
  return (
    <span className={styles.chip}>
      {label}
      <span
        role="button"
        tabIndex={0}
        aria-label={`Remove ${label}`}
        className={styles.chipRemove}
        onClick={(e) => {
          removeChip(e, value);
        }}
        onKeyDown={(e) => {
          removeChipOnKey(e, value);
        }}
      >
        &times;
      </span>
    </span>
  );
};

export { Chip };
