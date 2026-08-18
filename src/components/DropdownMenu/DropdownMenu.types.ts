import type { UseInteractionsReturn } from "@floating-ui/react";
import type { ReactElement, ReactNode } from "react";
import type { BaseShapes, BaseVariants, CursorAnchor, MenuPosition } from "../Base.types";
import type { BtnFill, BtnSize, IconBtnPosition } from "../Buttons/Btn.types";

export interface DropdownMenuContextValue {
  closeMenu: () => void;
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
}

// Anything with clientX/clientY — typically a MouseEvent / React.MouseEvent.
// Only used when `anchorToCursor` is set; otherwise toggle ignores its argument.

export type ToggleFn = (anchor?: CursorAnchor) => void;

export interface DropdownMenuProps {
  children: ReactNode;
  trigger: (toggle: ToggleFn, referenceProps?: Record<string, any>) => ReactElement;

  variant?: BaseVariants;
  fill?: BtnFill;
  size?: BtnSize;
  shape?: BaseShapes;
  position?: MenuPosition;
  isLoading?: boolean;

  className?: string;
  anchorToCursor?: boolean;
  iconPosition?: IconBtnPosition;
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
