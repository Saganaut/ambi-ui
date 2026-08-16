import type { ReactNode, Ref } from "react";
import type { BaseFills, BaseShapes, BaseSizes, BaseVariants, MenuPosition } from "../Base.types";

export type BtnSize = Exclude<BaseSizes, "xl">;

export type BtnVariant = BaseVariants;

export type BtnFill = BaseFills;

//TODO: Remove avatar as its just a pill icon shape
export type BtnShape = BaseShapes | "avatar";

export type IconBtnPosition = "left" | "right";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;

  ref?: Ref<HTMLButtonElement>;
  variant?: BtnVariant;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BtnShape;
  icon?: ReactNode;
  iconPosition?: IconBtnPosition;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface SplitBtnProps extends BaseButtonProps {
  menuItems: ReactNode;
  menuPosition?: MenuPosition;
  menuAriaLabel?: string;
}

type LabelledButton = {
  children: ReactNode;
  "aria-label"?: string;
};

type IconOnlyButton = {
  children?: never;
  icon: ReactNode;
  "aria-label": string;
};

export type BtnProps = BaseButtonProps & (LabelledButton | IconOnlyButton);
