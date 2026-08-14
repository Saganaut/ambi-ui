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
