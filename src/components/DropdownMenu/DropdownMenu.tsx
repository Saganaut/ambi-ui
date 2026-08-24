import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  useListItem,
} from "@floating-ui/react";
import variantStyles from "@styles/variants.module.css";
import { jC } from "@utils/utils";
import React, { createContext, use } from "react";
import styles from "./DropdownMenu.module.css";

import type {
  DropdownMenuContextValue,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuLinkProps,
  DropdownMenuProps,
} from "./DropdownMenu.types";
import { useDropdownMenu } from "./useDropdownMenu";

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  closeMenu: () => undefined,
  getItemProps: () => ({}),
  activeIndex: null,
});
/* Root styling should have a .rootDropdown class for styling */
const DropdownMenu = ({
  variant = "primary",
  fill = "default",
  size = "md",
  shape = "default",
  iconPosition,
  trigger,
  children,
  position = "top-right",
  className,
  anchorToCursor = false,
}: DropdownMenuProps) => {
  const {
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
  } = useDropdownMenu({ position, anchorToCursor });
  return (
    <div
      ref={(node) => {
        refs.setReference(node);
      }}
      data-icon-position={iconPosition ?? undefined}
      className={jC([styles.wrapper])}
    >
      {trigger(toggle, {
        ...getReferenceProps(),
      })}
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
              <div
                className={jC([
                  styles.panel,
                  variantStyles[variant],
                  variantStyles[size],
                  variantStyles[shape],
                  variantStyles[fill],
                  className,
                ])}
                style={transitionStyles}
              >
                <DropdownMenuContext
                  value={{ closeMenu, getItemProps, activeIndex }}
                >
                  <FloatingList elementsRef={elementsRef}>
                    {children}
                  </FloatingList>
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
      className={jC([styles.item, centered && styles.center, className])}
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
      className={jC([styles.item, className])}
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
  <span className={jC([styles.label, className])}>{children}</span>
);

const Divider = () => <div className={styles.divider} />;

DropdownMenu.Divider = Divider;
DropdownMenu.Item = Item;
DropdownMenu.Label = Label;
DropdownMenu.Link = Link;

export { DropdownMenu };
