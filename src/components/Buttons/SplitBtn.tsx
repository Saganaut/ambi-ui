import { ChevronDownIcon } from "lucide-react";
import { jC } from "../../utils/utils";
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
    <div className={jC([styles.splitBtn, className])}>
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
        variant={variant}
        size={size}
        fill={fill}
        iconPosition={iconPosition}
        isLoading={isLoading}
        position={menuPosition}
        trigger={(toggle, referenceProps) => (
          <Btn
            variant={variant}
            fill={fill}
            size={size}
            shape={shape}
            isDisabled={disabled ?? isLoading}
            aria-label={menuAriaLabel}
            className={styles.splitBtnSecondary}
            icon={<ChevronDownIcon className={styles.chevronIcon} />}
            {...referenceProps}
            onClick={(event) => {
              toggle();
              referenceProps?.onClick?.(event);
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
