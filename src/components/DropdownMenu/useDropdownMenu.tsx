import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
  type FloatingContext,
  type Placement,
  type UseFloatingReturn,
  type UseInteractionsReturn,
} from "@floating-ui/react";
import { useRef, useState, type CSSProperties, type RefObject } from "react";
import { inheritThemeMiddleware } from "@utils/inheritTheme";
import type { MenuPosition } from "../Base.types";
import type { ToggleFn } from "./DropdownMenu.types";

interface UseDropdownMenuProps {
  position: MenuPosition;
  anchorToCursor: boolean;
}

type UseDropdownMenuReturn = Pick<UseFloatingReturn<HTMLElement>, "refs" | "floatingStyles"> &
  UseInteractionsReturn & {
    activeIndex: number | null;
    closeMenu: () => void;
    context: FloatingContext<HTMLElement>;
    elementsRef: RefObject<(HTMLElement | null)[]>;
    isMounted: boolean;
    toggle: ToggleFn;
    transitionStyles: CSSProperties;
  };

// `position` names the corner of the panel that meets the trigger: top-* opens
// below the trigger, bottom-* above; -right/-left aligns that edge. Translated
// to floating-ui placements (LTR: start = left edge, end = right edge).
const placementMap: Record<MenuPosition, Placement> = {
  "top-right": "bottom-end",
  "top-left": "bottom-start",
  "bottom-right": "top-end",
  "bottom-left": "top-start",
};

export function useDropdownMenu({
  position,
  anchorToCursor,
}: UseDropdownMenuProps): UseDropdownMenuReturn {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Shared with FloatingList (populated via useListItem) and read by
  // useListNavigation to move focus between items with the arrow keys.
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    open,
    onOpenChange: setOpen,
    placement: placementMap[position],
    strategy: "fixed",
    middleware: [offset(8), flip(), shift({ padding: 8 }), inheritThemeMiddleware],
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
    setOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return {
    activeIndex,
    closeMenu,
    context,
    elementsRef,
    floatingStyles,
    getFloatingProps,
    getItemProps,
    getReferenceProps,
    isMounted,
    refs,
    toggle,
    transitionStyles,
  };
}
