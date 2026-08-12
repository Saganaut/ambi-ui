/**
 * Wrapper with Floating UI functionality to wrap dialogs, menus, and other popovers.
 * Styling is up to the consumer.
 *  **/

import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import { useEffect, useRef, useState } from "react";
import type { PopoverWrapperProps } from "./Popover.types";

/**
 * Arrow-key navigation handles handed to children (via `ctx.listNav`) so each
 * menu item can register itself and pick up roving focus. Present only when the
 * consumer opts in with `listNavigation`.
 */

const ARROW_WIDTH = 18;
const ARROW_HEIGHT = 10;

/**
 * Popovers can nest: a trigger rendered inside one popover's floating content
 * may open another (e.g. a toolbar opening a color picker). Dismissal only
 * understands that relationship through a shared FloatingTree — without one,
 * pressing inside a nested popover's portal reads as an outside press and
 * closes the parent. The outermost popover creates the tree; nested ones
 * (detected via the parent-node context) join it.
 */
export const PopoverWrapper = (props: PopoverWrapperProps) => {
  const parentId = useFloatingParentNodeId();
  if (parentId === null) {
    return (
      <FloatingTree>
        <PopoverWrapperImpl {...props} />
      </FloatingTree>
    );
  }
  return <PopoverWrapperImpl {...props} />;
};

const PopoverWrapperImpl = ({
  children,
  placement = "bottom",
  offsetAmount = 8,
  renderTrigger,
  zIndex = 1000,
  open,
  onOpenChange,
  openOn = "click",
  manageFocus = true,
  initialFocus,
  listNavigation = false,
  showArrow = false,
  arrowClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: PopoverWrapperProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;
  const setIsOpen = (next: boolean) => {
    if (open === undefined) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
  };

  const arrowRef = useRef<SVGSVGElement | null>(null);
  const nodeId = useFloatingNodeId();
  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetAmount),
      flip({ fallbackAxisSideDirection: "end" }),
      shift({ padding: 8 }),
      ...(showArrow ? [arrow({ element: arrowRef })] : []),
    ],
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context);

  // Populated by the children's items (via `useListItem` inside `FloatingList`)
  // and read by `useListNavigation` to move roving focus with the arrow keys.
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Start each open with nothing highlighted so the caret stays in the field
  // until the user arrows into the menu.
  useEffect(() => {
    if (!isOpen) setActiveIndex(null);
  }, [isOpen]);

  const click = useClick(context, {
    enabled: openOn === "click" || openOn === "hover",
    // Hover affordances still need an intentional touch/keyboard path, but a
    // mouse click on their anchor must not fight the hover interaction. A
    // repeated touch keeps a hover affordance open; Escape or an outside press
    // dismisses it. This avoids treating focus followed by click as a toggle.
    ignoreMouse: openOn === "hover",
    toggle: openOn !== "hover",
  });
  const hover = useHover(context, {
    enabled: openOn === "hover",
    // Touch devices synthesize mouse-enter events for a tap. Hover must not
    // open from that synthetic event; useClick provides the deliberate path.
    mouseOnly: true,
    handleClose: safePolygon(),
  });
  const focus = useFocus(context, { enabled: openOn === "hover" });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    enabled: listNavigation,
    focusItemOnOpen: false,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, hover, focus, dismiss, role, listNav],
  );
  const triggerProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  const renderChildren = () =>
    typeof children === "function"
      ? children({
          ctx: {
            close: () => setIsOpen(false),
            styles: transitionStyles,
            listNav: listNavigation ? { getItemProps, activeIndex } : undefined,
          },
        })
      : children;
  return (
    <FloatingNode id={nodeId}>
      {renderTrigger(triggerProps)}

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            disabled={!manageFocus}
            initialFocus={initialFocus}
          >
            <div
              ref={refs.setFloating}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledby}
              style={{ ...floatingStyles, zIndex }}
              {...getFloatingProps()}
            >
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  width={ARROW_WIDTH}
                  height={ARROW_HEIGHT}
                  tipRadius={2}
                  className={arrowClassName}
                />
              )}
              {/* Children may be a function so they can read `ctx` (close, transition
                  styles, and — when opted in — the list-navigation handles). List
                  items register through `FloatingList`, so wrap when enabled. */}
              {listNavigation ? (
                <FloatingList elementsRef={elementsRef}>
                  {renderChildren()}
                </FloatingList>
              ) : (
                renderChildren()
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
};
