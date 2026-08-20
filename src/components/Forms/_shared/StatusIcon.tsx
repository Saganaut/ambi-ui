import { jC } from "@utils/utils";
import { Check, Loader, X } from "lucide-react";
import shared from "../Field.module.css";
import type { ValidationState } from "../Field.types";

interface StatusIconProps {
  dataStatus: ValidationState;
  className?: string;
}

const StatusIcon = ({ dataStatus, className }: StatusIconProps) => {
  return (
    <div className={jC([className, shared.statusIcon])}>
      {dataStatus === "valid" && <Check />}
      {dataStatus === "validating" && <Loader />}
      {dataStatus === "invalid" && <X />}
    </div>
  );
};

export { StatusIcon };
