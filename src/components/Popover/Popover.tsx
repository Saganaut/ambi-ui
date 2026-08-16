// Popover — floating surface for editing toolbars and inline-edit controls.
// Provides the shared visual chrome (border, bg, shadow, padding) plus a small
// set of row / button / divider primitives
// Used in conjuction wiht PopverWrapper and PopoverNavContext to provide full utility
import { useListItem } from "@floating-ui/react";
import { useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import { jC } from "../../utils/utils";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types";
import { PopoverNavContext } from "./PopoverNavContext";

const Popover = ({ children, className, role = "dialog", ariaLabel, style }: PopoverProps) => (
  <div className={jC([styles.popover, className])} role={role} aria-label={ariaLabel} style={style}>
    {children}
  </div>
);

interface RowProps {
  children: ReactNode;
  className?: string;
}

const Row = ({ children, className }: RowProps) => (
  <div className={jC([styles.row, className])}>{children}</div>
);

const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const nav = useContext(PopoverNavContext);
  const { ref, index } = useListItem();

  if (!nav) {
    return (
      <button className={styles.btn} type="button" {...props}>
        {children}
      </button>
    );
  }
  return (
    <button
      className={styles.btn}
      type="button"
      ref={ref}
      {...nav.getItemProps(props)}
      role="menuitem"
      tabIndex={nav.activeIndex === index ? 0 : -1}
    >
      {children}
    </button>
  );
};

const Divider = () => <div className={styles.divider} aria-hidden="true" />;

interface GroupLabelProps {
  children: ReactNode;
}

const GroupLabel = ({ children }: GroupLabelProps) => (
  <span className={styles.groupLabel}>{children}</span>
);

Popover.row = Row;
Popover.Button = Button;
Popover.divider = Divider;
Popover.groupLabel = GroupLabel;

export { Popover };
