import type { ReactNode, Ref } from "react";
import type { BaseSizes, BaseVariants } from "../Base.types";

export type BtnSize = Exclude<BaseSizes, "xl">;

export type BtnVariant = BaseVariants | "isDisabled";

export type BtnFill = "default" | "bordered" | "ghost";

export type BtnShape = "default" | "pill" | "avatar";

export type MenuPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type IconBtnPosition = "left" | "right";

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: BtnVariant;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BtnShape;
  icon?: ReactNode;
  iconPosition?: IconBtnPosition;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

export interface SplitBtnProps extends BtnProps {
  menuItems: ReactNode;
  menuPosition?: MenuPosition;
  menuAriaLabel?: string;
}
