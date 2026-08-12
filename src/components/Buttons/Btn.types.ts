import type { ReactNode, Ref } from "react";
import type { BaseSizes, BaseVariants } from "../Base.types";

export type BtnSize = Exclude<BaseSizes, "xl">;

export type BtnVariant = BaseVariants | "isDisabled";

export type BtnFill = "default" | "bordered" | "ghost";

export type BtnShape = "default" | "pill" | "avatar";

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: BtnVariant;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BtnShape;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  children?: ReactNode;
  isDisabled?: boolean;
}
