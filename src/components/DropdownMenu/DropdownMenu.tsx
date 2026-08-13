import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useRole,
  useTransitionStyles,
  type Placement,
} from "@floating-ui/react";
import React, { createContext, use, useRef, useState } from "react";
import type { MenuPosition } from "../Buttons/Btn.types";
import styles from "./DropdownMenu.module.css";
import type {
  DropdownMenuContextValue,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuLinkProps,
  DropdownMenuProps,
  ToggleFn,
} from "./DropdownMenu.types";
const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  closeMenu: () => undefined,
  getItemProps: () => ({}),
  activeIndex: null,
});

// `position` names the corner of the panel that meets the trigger: top-* opens
// below the trigger, bottom-* above; -right/-left aligns that edge. Translated
// to floating-ui placements (LTR: start = left edge, end = right edge).
const placementMap: Record<MenuPosition, Placement> = {
  "top-right": "bottom-end",
  "top-left": "bottom-start",
  "bottom-right": "top-end",
  "bottom-left": "top-start",
};

const DropdownMenu = ({
  trigger,
  children,
  position = "top-right",
  className,
  anchorToCursor = false,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Shared with FloatingList (populated via useListItem) and read by
  // useListNavigation to move focus between items with the arrow keys.
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placementMap[position],
    strategy: "fixed",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 150, close: 100 },
    initial: ({ side }) => ({
      opacity: 0,
      transform: `translateY(${side === "top" ? "4px" : "-4px"}) scale(0.98)`,
    }),
    open: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
    close: ({ side }) => ({
      opacity: 0,
      transform: `translateY(${side === "top" ? "4px" : "-4px"}) scale(0.98)`,
    }),
  });

  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    role,
    dismiss,
    listNavigation,
  ]);

  const toggle: ToggleFn = (anchor) => {
    if (anchorToCursor && anchor) {
      // Anchor to a zero-size virtual element at the click point so floating-ui
      // positions the panel from the cursor (context-menu behaviour).
      const { clientX: x, clientY: y } = anchor;
      refs.setPositionReference({
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x,
          y,
          top: y,
          left: x,
          right: x,
          bottom: y,
        }),
      });
      setOpen(true);
      return;
    }
    // Non-cursor menus never set a position reference, so floating-ui anchors
    // to the wrapper element. (Calling setPositionReference(null) here would
    // wipe the wrapper reference and pin the panel to the viewport origin.)
    setOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div
      ref={(node) => {
        refs.setReference(node);
      }}
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      {...getReferenceProps()}
    >
      {trigger(toggle)}
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={(node) => {
                refs.setFloating(node);
              }}
              className={styles.positioner}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div className={styles.panel} style={transitionStyles}>
                <DropdownMenuContext value={{ closeMenu, getItemProps, activeIndex }}>
                  <FloatingList elementsRef={elementsRef}>{children}</FloatingList>
                </DropdownMenuContext>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
};

const Item = ({
  children,
  className,
  centered = false,
  onClick,
  ...rest
}: DropdownMenuItemProps) => {
  const { closeMenu, getItemProps, activeIndex } = use(DropdownMenuContext);
  const { ref, index } = useListItem();
  return (
    <button
      type="button"
      ref={ref}
      className={[styles.item, centered && styles.center, className].filter(Boolean).join(" ")}
      {...rest}
      {...getItemProps({
        onClick: (event) => {
          closeMenu();
          onClick?.(event as React.MouseEvent<HTMLButtonElement>);
        },
      })}
      role="menuitem"
      tabIndex={activeIndex === index ? 0 : -1}
    >
      {children}
    </button>
  );
};

const Link = ({ children, className }: DropdownMenuLinkProps) => {
  const { closeMenu, getItemProps, activeIndex } = use(DropdownMenuContext);
  const { ref, index } = useListItem();
  return (
    <div
      ref={ref}
      className={[styles.item, className].filter(Boolean).join(" ")}
      {...getItemProps({
        onClick: () => {
          closeMenu();
        },
        // The wrapper is the focusable menuitem; relay keyboard activation to
        // the inner anchor so Enter/Space navigates like a mouse click.
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            closeMenu();
            event.currentTarget.querySelector("a")?.click();
          }
        },
      })}
      role="menuitem"
      tabIndex={activeIndex === index ? 0 : -1}
    >
      {children}
    </div>
  );
};

const Label = ({ children, className }: DropdownMenuLabelProps) => (
  <span className={[styles.label, className].filter(Boolean).join(" ")}>{children}</span>
);

const Divider = () => <div className={styles.divider} />;

DropdownMenu.Divider = Divider;
DropdownMenu.Item = Item;
DropdownMenu.Label = Label;
DropdownMenu.Link = Link;

export { DropdownMenu };
