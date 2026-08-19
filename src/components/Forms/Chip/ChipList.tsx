import type { ComponentPropsWithoutRef } from "react";
import { Chip, type ChipProps } from "./Chip";
import styles from "./ChipList.module.css";

interface ChipListProps extends ComponentPropsWithoutRef<"ul"> {
  chips: ChipProps[];
}

const ChipList = ({ chips, className, ...rest }: ChipListProps) => {
  return (
    <ul {...rest} className={[styles.chipList, className].filter(Boolean).join(" ")}>
      {chips.map((chip) => (
        <li key={chip.value}>
          <Chip {...chip} />
        </li>
      ))}
    </ul>
  );
};

export { ChipList };
export type { ChipListProps };
