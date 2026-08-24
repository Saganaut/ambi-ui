import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import variantStyles from "@styles/variants.module.css";
import styles from "./DropdownMenu.module.css";
import { DropdownMenu } from "./DropdownMenu";

afterEach(cleanup);

describe("DropdownMenu", () => {
  it("uses shared variant classes instead of a data-fill attribute", async () => {
    render(
      <DropdownMenu
        variant="error"
        fill="ghost"
        size="lg"
        shape="pill"
        trigger={(toggle, triggerProps) => (
          <button
            type="button"
            {...triggerProps}
            onClick={(event) => {
              triggerProps?.onClick?.(event);
              toggle();
            }}
          >
            Open menu
          </button>
        )}
      >
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    await waitFor(() => expect(screen.getByText("Delete")).toBeInTheDocument());

    const panel = screen.getByText("Delete").closest(`.${styles.panel}`);
    expect(panel).toHaveClass(
      variantStyles.error,
      variantStyles.ghost,
      variantStyles.lg,
      variantStyles.pill,
    );
    expect(panel).not.toHaveAttribute("data-fill");
  });
});
