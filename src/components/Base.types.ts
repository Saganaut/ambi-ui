export type BaseVariants =
  | "primary"
  | "secondary"
  | "brand"
  | "info"
  | "error"
  | "success"
  | "warning";

export type BaseSizes = "xs" | "sm" | "md" | "lg" | "xl";

export interface CursorAnchor {
  clientX: number;
  clientY: number;
}

export type BaseFills = "default" | "bordered" | "ghost";

export type BaseShapes = "default" | "pill" | "squircle";

export type MenuPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";
