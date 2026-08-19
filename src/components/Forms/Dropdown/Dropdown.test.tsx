import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "storybook/test";
import { afterEach, describe, expect, it } from "vitest";
import { Dropdown } from "./Dropdown";

const OPTIONS = [
  { value: "gondor", label: "Gondor" },
  { value: "mordor", label: "Mordor" },
];

afterEach(cleanup);

describe("Dropdown", () => {
  it("opens its options when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Region" options={OPTIONS} />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const option = await screen.findByRole("option", { name: "Gondor" });
    expect(option).toBeInTheDocument();
    await waitFor(() => {
      const panel = option.parentElement?.parentElement as HTMLElement;
      expect(getComputedStyle(panel).opacity).toBe("1");
      expect(panel.getBoundingClientRect().width).toBeGreaterThan(0);
      expect(panel.getBoundingClientRect().height).toBeGreaterThan(0);
    });
  });
});
