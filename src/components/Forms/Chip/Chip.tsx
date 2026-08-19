import { XIcon } from "lucide-react";
import type { RefObject } from "react";
import styles from "./Chip.module.css";

/*TODO: this needs to be moved to a generic place and made more generic
including passing down sizes and possibly shapes, maybe even variants?*/
export interface ChipProps {
  label: string;
  value: string;
  ref?: RefObject<HTMLButtonElement | null> | ((node: HTMLButtonElement | null) => void);
  onRemove: (value: string) => void;
}

const Chip = ({ label, value, ref, onRemove }: ChipProps) => {
  return (
    <button
      type="button"
      ref={ref}
      className={styles.chip}
      aria-label={`Remove ${label}`}
      onClick={() => {
        onRemove(value);
      }}
    >
      {label}
      <XIcon aria-hidden="true" className={styles.chipRemove} />
    </button>
  );
};

export { Chip };
