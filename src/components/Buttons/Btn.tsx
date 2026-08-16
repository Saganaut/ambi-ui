import variantStyles from "../../styles/variants.module.css";
import { jC } from "../../utils/utils";
import type { BtnProps } from "./Btn.types";
import styles from "./Buttons.module.css";
const Btn = ({
  variant = "primary",
  fill = "default",
  size = "md",
  shape = "default",
  isDisabled = false,
  type = "button",
  icon,
  iconPosition = "left",
  isLoading,
  className,
  children,
  ref,
  ...rest
}: BtnProps) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading || undefined}
      data-icon-position={icon ? iconPosition : undefined}
      {...rest}
      data-fill={fill === "default" ? undefined : fill}
      className={jC([
        styles.btn,
        children == null && styles.iconBtn,
        variantStyles[variant],
        styles[size],
        shape !== "default" && styles[shape],
        className,
      ])}
    >
      {icon != null && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export { Btn, type BtnProps };
