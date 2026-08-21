import type {
  BaseFills,
  BaseShapes,
  BaseSizes,
  BaseVariants,
} from "@components/Base.types";
import type { ReactNode, Ref } from "react";

export type CardSize = Exclude<BaseSizes, "xl">;

export type CardVariant = BaseVariants;

export type CardFill = BaseFills;

export type CardShape = BaseShapes | "avatar";

export interface BaseCardProps<
  T extends HTMLButtonElement | HTMLDivElement,
> extends React.HTMLAttributes<T> {
  children?: ReactNode;
  onClick?: () => void;
  ref?: Ref<T>;
  variant?: CardVariant;
  fill?: CardFill;
  size?: CardSize;
  shape?: CardShape;
  className?: string;
  as?: "div" | "button";
}
