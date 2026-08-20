import { jC } from "@utils/utils";
import type { ReactNode } from "react";
import shared from "../Field.module.css";
interface FieldLabelProps {
  id: string;
  label: string;
  extraLabelInfo?: ReactNode;
  className?: string;
}
const FieldLabel = ({
  id,
  label,
  extraLabelInfo,
  className,
}: FieldLabelProps) => {
  return (
    <div className={jC([className])}>
      <label htmlFor={id}>{label}</label>
      {extraLabelInfo && (
        <div className={shared.extraLabelInfo}>{extraLabelInfo}</div>
      )}
    </div>
  );
};

export { FieldLabel };
