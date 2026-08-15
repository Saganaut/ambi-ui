import { ChevronLeft, ChevronRight } from "lucide-react";
import { type KeyboardEvent } from "react";
import variantStyles from "../../styles/variants.module.css";
import { Btn } from "../Buttons/Btn";
import styles from "./Pagination.module.css";
import type { PageToken, PaginationProps } from "./Pagination.types";

const Pagination = (props: PaginationProps) => {
  const {
    page,
    onPageChange,
    variant = "primary",
    fill = "default",
    size = "md",
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    ariaLabel = "Pagination",
    className,
  } = props;

  const knownTotal = props.pageCount != null;
  const pageCount = knownTotal ? props.pageCount : Infinity;
  const compact = knownTotal ? (props.compact ?? false) : true;

  if (knownTotal && pageCount <= 1) return null;

  const clampedPage = knownTotal ? Math.max(0, Math.min(page, pageCount - 1)) : Math.max(0, page);
  const canGoPrev = !disabled && clampedPage > 0;
  const canGoNext = !disabled && (knownTotal ? clampedPage < pageCount - 1 : props.hasMore);

  const goTo = (next: number) => {
    if (disabled) return;
    const bounded = knownTotal ? Math.max(0, Math.min(next, pageCount - 1)) : Math.max(0, next);
    if (bounded !== clampedPage) onPageChange(bounded);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(clampedPage - 1);
    } else if (e.key === "ArrowRight") {
      if (!canGoNext) return;
      e.preventDefault();
      goTo(clampedPage + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End" && knownTotal) {
      e.preventDefault();
      goTo(pageCount - 1);
    }
  };

  return (
    <nav
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      data-fill={fill === "default" ? undefined : fill}
      className={[
        styles.pagination,
        variantStyles[variant],
        styles[size],
        compact ? styles.compact : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Btn
        variant={variant}
        fill={fill}
        size={size}
        className={styles.navBtn}
        icon={<ChevronLeft />}
        isDisabled={!canGoPrev}
        onClick={() => {
          goTo(clampedPage - 1);
        }}
        aria-label="Previous page"
      />

      {compact ? (
        <span className={styles.compactLabel} aria-live="polite">
          {knownTotal
            ? `Page ${String(clampedPage + 1)} of ${String(pageCount)}`
            : `Page ${String(clampedPage + 1)}`}
        </span>
      ) : (
        <ol className={styles.list}>
          {buildPages({
            page: clampedPage,
            pageCount,
            siblingCount,
            boundaryCount,
          }).map((token, idx) => (
            <li
              key={typeof token === "number" ? `p-${String(token)}` : `${token}-${String(idx)}`}
              className={styles.item}
            >
              {typeof token === "number" ? (
                <button
                  type="button"
                  className={[styles.pageBtn, token === clampedPage ? styles.current : null]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={token === clampedPage ? "page" : undefined}
                  aria-label={`Go to page ${String(token + 1)}`}
                  disabled={disabled}
                  onClick={() => {
                    goTo(token);
                  }}
                >
                  {token + 1}
                </button>
              ) : (
                <span className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      <Btn
        variant={variant}
        fill={fill}
        size={size}
        className={styles.navBtn}
        icon={<ChevronRight />}
        isDisabled={!canGoNext}
        onClick={() => {
          goTo(clampedPage + 1);
        }}
        aria-label="Next page"
      />
    </nav>
  );
};

interface BuildPagesArgs {
  page: number;
  pageCount: number;
  siblingCount: number;
  boundaryCount: number;
}

// Returns the page index strip with ellipsis tokens. All page values are
// zero-indexed; the component renders them as 1-indexed labels.
const buildPages = ({
  page,
  pageCount,
  siblingCount,
  boundaryCount,
}: BuildPagesArgs): PageToken[] => {
  const range = (start: number, end: number) =>
    Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

  const totalSlots = boundaryCount * 2 + siblingCount * 2 + 3;
  if (pageCount <= totalSlots) {
    return range(0, pageCount - 1);
  }

  const windowSize = siblingCount * 2 + 1;
  const leadingEnd = boundaryCount + windowSize;
  const trailingStart = pageCount - boundaryCount - windowSize - 1;

  // At either edge, replace the unnecessary ellipsis with one extra page so
  // long pagers always contain exactly `totalSlots` items.
  if (page <= leadingEnd) {
    return [
      ...range(0, leadingEnd),
      "ellipsis-end",
      ...range(pageCount - boundaryCount, pageCount - 1),
    ];
  }

  if (page >= trailingStart) {
    return [
      ...range(0, boundaryCount - 1),
      "ellipsis-start",
      ...range(trailingStart, pageCount - 1),
    ];
  }

  // Move middle pages in fixed groups instead of a sliding window. Selecting
  // any page in the group therefore leaves every button in the same slot.
  const firstMiddlePage = leadingEnd + 1;
  const lastMiddleStart = trailingStart - windowSize;
  const groupStart = Math.min(
    firstMiddlePage + Math.floor((page - firstMiddlePage) / windowSize) * windowSize,
    lastMiddleStart,
  );

  return [
    ...range(0, boundaryCount - 1),
    "ellipsis-start",
    ...range(groupStart, groupStart + windowSize - 1),
    "ellipsis-end",
    ...range(pageCount - boundaryCount, pageCount - 1),
  ];
};

export { Pagination };
