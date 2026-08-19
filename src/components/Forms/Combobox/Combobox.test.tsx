import { cleanup, render, screen } from "@testing-library/react";
import { useState } from "react";
import { userEvent } from "storybook/test";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

const OPTIONS = [
  { value: "gondor", label: "Gondor" },
  { value: "mordor", label: "Mordor" },
  { value: "rohan", label: "Rohan" },
];

afterEach(cleanup);

const ControlledCombobox = () => {
  const [value, setValue] = useState("");
  return (
    <Combobox id="region" label="Region" options={OPTIONS} value={value} onChange={setValue} />
  );
};

describe("Combobox", () => {
  it("filters options as the user types and selects one", async () => {
    const user = userEvent.setup();
    render(<ControlledCombobox />);

    const input = screen.getByRole("combobox", { name: "Region" });
    await user.type(input, "mor");

    expect(screen.queryByRole("option", { name: "Gondor" })).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mordor" })).toBeInTheDocument();

    await user.click(screen.getByRole("option", { name: "Mordor" }));
    expect(input).toHaveValue("Mordor");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("supports arrow-key navigation and selection", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox label="Region" options={OPTIONS} onChange={onChange} />);

    const input = screen.getByRole("combobox", { name: "Region" });
    await user.click(input);
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith("mordor");
    expect(input).toHaveValue("Mordor");
  });

  it("selects the first filtered option when Enter is pressed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox label="Region" options={OPTIONS} onChange={onChange} />);

    const input = screen.getByRole("combobox", { name: "Region" });
    await user.type(input, "or");
    await user.keyboard("{Enter}");

    expect(onChange).toHaveBeenCalledWith("gondor");
    expect(input).toHaveValue("Gondor");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps input focus while exposing the active option", async () => {
    const user = userEvent.setup();
    render(<ControlledCombobox />);

    const input = screen.getByRole("combobox", { name: "Region" });
    await user.click(input);
    await user.keyboard("{ArrowDown}");

    expect(document.activeElement).toBe(input);
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Gondor" }).id,
    );
  });

  it("toggles the options from the chevron without taking input focus", async () => {
    const user = userEvent.setup();
    render(<ControlledCombobox />);

    const input = screen.getByRole("combobox", { name: "Region" });
    const toggle = screen.getByRole("button", { name: "Open options" });

    await user.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Close options" }));
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(input);

    await user.click(toggle);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(document.activeElement).toBe(input);
  });
});
