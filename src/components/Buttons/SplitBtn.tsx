import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Btn } from "./Btn";
import type { SplitBtnProps } from "./Btn.types";
import styles from "./Buttons.module.css";

const SplitBtn = ({
  variant = "primary",
  fill = "default",
  size = "md",
  shape = "default",
  icon,
  iconPosition = "left",
  isLoading,
  disabled,
  className,
  children,
  menuItems,
  menuPosition = "top-right",
  menuAriaLabel = "More options",
  ...rest
}: SplitBtnProps) => {
  return (
    <div className={[styles.splitBtn, className].filter(Boolean).join(" ")}>
      <Btn
        variant={variant}
        fill={fill}
        size={size}
        shape={shape}
        icon={icon}
        iconPosition={iconPosition}
        isLoading={isLoading}
        isDisabled={disabled}
        className={styles.primaryBtn}
        {...rest}
      >
        {children}
      </Btn>
      <DropdownMenu
        position={menuPosition}
        trigger={(toggle) => (
          <Btn
            variant={variant}
            fill={fill}
            size={size}
            shape={shape}
            isDisabled={disabled ?? isLoading}
            aria-label={menuAriaLabel}
            className={styles.splitBtnSecondary}
            icon={<ChevronDownIcon className={styles.chevronIcon} />}
            onClick={() => {
              toggle();
            }}
          />
        )}
      >
        {menuItems}
      </DropdownMenu>
    </div>
  );
};

export { SplitBtn };
