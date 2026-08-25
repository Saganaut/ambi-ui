import type { BaseShapes } from "../Base.types";
import type { BtnFill, BtnSize, BtnVariant } from "../Buttons/Btn.types";

export interface PaginationBaseProps {
  page: number;
  onPageChange: (page: number) => void;
  variant?: BtnVariant;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BaseShapes;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  pageLabel?: string;
}

interface KnownTotalProps extends PaginationBaseProps {
  pageCount: number;
  hasMore?: never;
  compact?: boolean;
  expectedMaxValue?: never;
}

interface UnknownTotalProps extends PaginationBaseProps {
  pageCount?: undefined;
  hasMore: boolean;
  compact?: never;
  /**
   * Highest page number the compact label should be able to show without
   * resizing. Known totals derive this from `pageCount`; supply it here so an
   * unknown-total pager reserves room up front. Defaults to three digits.
   */
  expectedMaxValue?: number;
}

export type PaginationProps = KnownTotalProps | UnknownTotalProps;

export type PageToken = number | "ellipsis-start" | "ellipsis-end";
