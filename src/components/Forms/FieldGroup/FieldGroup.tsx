import type { ComponentPropsWithRef, CSSProperties } from "react";
import { jC } from "../../../utils/utils";
import styles from "./FieldGroup.module.css";

type FieldGroupProps = ComponentPropsWithRef<"div"> & {
  /** Shared width of labels placed before their controls. */
  labelWidth?: CSSProperties["width"];
};

const FieldGroup = ({ labelWidth, className, style, ...rest }: FieldGroupProps) => (
  <div
    {...rest}
    className={jC([styles.fieldGroup, className])}
    style={
      labelWidth == null
        ? style
        : ({ ...style, "--field-label-width": labelWidth } as CSSProperties)
    }
  />
);

export { FieldGroup };
export type { FieldGroupProps };
