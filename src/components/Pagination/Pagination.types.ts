import type { BtnFill, BtnSize, BtnVariant } from "../Buttons/Btn.types";

export interface PaginationBaseProps {
  page: number;
  onPageChange: (page: number) => void;
  variant?: BtnVariant;
  fill?: BtnFill;
  size?: BtnSize;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

interface KnownTotalProps extends PaginationBaseProps {
  pageCount: number;
  hasMore?: never;
  compact?: boolean;
}

interface UnknownTotalProps extends PaginationBaseProps {
  pageCount?: undefined;
  hasMore: boolean;
  compact?: never;
}

export type PaginationProps = KnownTotalProps | UnknownTotalProps;

export type PageToken = number | "ellipsis-start" | "ellipsis-end";
