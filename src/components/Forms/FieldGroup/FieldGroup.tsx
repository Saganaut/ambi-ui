import type { ComponentPropsWithRef, CSSProperties } from "react";
import styles from "./FieldGroup.module.css";

type FieldGroupProps = ComponentPropsWithRef<"div"> & {
  /** Shared width of labels placed before their controls. */
  labelWidth?: CSSProperties["width"];
};

const FieldGroup = ({ labelWidth, className, style, ...rest }: FieldGroupProps) => (
  <div
    {...rest}
    className={[styles.fieldGroup, className].filter(Boolean).join(" ")}
    style={
      labelWidth == null
        ? style
        : ({ ...style, "--field-label-width": labelWidth } as CSSProperties)
    }
  />
);

export { FieldGroup };
export type { FieldGroupProps };
