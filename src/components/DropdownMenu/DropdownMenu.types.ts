import type { UseInteractionsReturn } from "@floating-ui/react";
import type { ReactElement, ReactNode } from "react";
import type { MenuPosition } from "../Buttons/Btn.types";

export interface DropdownMenuContextValue {
  closeMenu: () => void;
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
}

// Anything with clientX/clientY — typically a MouseEvent / React.MouseEvent.
// Only used when `anchorToCursor` is set; otherwise toggle ignores its argument.
export interface CursorAnchor {
  clientX: number;
  clientY: number;
}
export type ToggleFn = (anchor?: CursorAnchor) => void;

export interface DropdownMenuProps {
  trigger: (toggle: ToggleFn) => ReactElement;
  children: ReactNode;
  position?: MenuPosition;
  className?: string;
  anchorToCursor?: boolean;
}
export interface DropdownMenuLabelProps {
  children: ReactNode;
  className?: string;
}

export interface DropdownMenuLinkProps extends DropdownMenuLabelProps {}

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  centered?: boolean;
}
