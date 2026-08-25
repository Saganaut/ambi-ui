import type { Placement, UseInteractionsReturn } from "@floating-ui/react";
import type { HTMLProps, ReactNode } from "react";
import type { BaseShapes, BaseVariants } from "../Base.types";
import type { BtnFill, BtnSize } from "../Buttons/Btn.types";

interface ListNavContext {
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
}
interface ChildFunctionArgs {
  ctx: {
    close: () => void;
    styles: React.CSSProperties;
    listNav?: ListNavContext;
  };
}

export interface PopoverNavValue {
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
}

export interface PopoverWrapperProps {
  children: ReactNode | ((arg0: ChildFunctionArgs) => ReactNode);
  placement?: Placement;
  offsetAmount?: number;
  renderTrigger: (props: HTMLProps<HTMLElement>) => ReactNode;
  zIndex?: number;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /*** "click" (default) toggles on trigger click. "
   * hover" keeps it open while the pointer travels from the trigger
   * to the portalled content and also opens it from keyboard focus.
   * "controlled" wires no open interaction — the consumer drives `open`*/
  openOn?: "click" | "hover" | "controlled";
  /**
   * Whether the floating focus manager moves focus into the popover on open
   * and restores it on close. Turn off for menus opened from a still-focused
   * field, so opening doesn't pull the caret out of the trigger. Defaults to
   * true.
   */
  manageFocus?: boolean;
  /**
   * Which floating element receives focus when the popover opens. Pass -1 to
   * retain focus on an anchor's existing control while retaining portal tab
   * order and focus guards.
   */
  initialFocus?: number;
  /**
   * Opt into arrow-key list navigation. The popover exposes floating-ui's
   * `getItemProps` and the active index through `ctx.listNav`; children wrap
   * their focusable items with those so Up/Down moves roving focus between them.
   * Pairs with `manageFocus={false}` for a field-anchored menu: the caret stays
   * in the field on open, and the arrow keys step into the menu on demand.
   */
  listNavigation?: boolean;
  /**
   * Render a callout tail (arrow) pointing at the trigger. Styling is up to
   * the consumer via `arrowClassName` (set the svg `fill` to the popover's
   * surface color). Remember to include the tail height in `offsetAmount`.
   */
  showArrow?: boolean;
  arrowClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
export interface PopoverProps {
  children: ReactNode;
  className?: string;
  role?: "dialog" | "toolbar" | "menu";
  ariaLabel?: string;
  style?: React.CSSProperties;
  /**
   * Surface presentation. These drive the shared `--control-*` custom
   * properties from `variants.module.css`, which the popover's own
   * `--popover-*` properties (and its nested primitives) read from.
   */
  variant?: BaseVariants;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BaseShapes;
}
