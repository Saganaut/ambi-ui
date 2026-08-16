/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";
import "../../../styles/variants.module.css";
import { Input } from "../Input/Input";
import { Dropdown } from "./Dropdown";
import { CATEGORY_OPTIONS, REGION_OPTIONS } from "./Dropdown.mocks";

// Dropdown is a controlled select (value is a string[] even in single mode).
// The stories wrap it in a stateful host so selecting / deselecting and chip
// removal actually update the displayed value.
const meta = {
  title: "Common/Input/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    label: "Region",
    options: REGION_OPTIONS,
    placeholder: "Select a region...",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    value: { control: false },
    onChange: { control: false },
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(args.value ?? []);
    return <Dropdown {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All dropdown variants, states, and parity examples on a single canvas. */
export const Overview: Story = {
  render: (args) => {
    const [defaultValue, setDefaultValue] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string[]>(["gondor"]);
    const [multipleValue, setMultipleValue] = useState<string[]>(["history", "science"]);
    const [searchableValue, setSearchableValue] = useState<string[]>([]);

    return (
      <div style={{ display: "grid", gap: "2rem", width: "min(48rem, 90vw)" }}>
        <Dropdown {...args} label="Default" value={defaultValue} onChange={setDefaultValue} />
        <Dropdown
          {...args}
          label="With selection"
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Dropdown
          {...args}
          label="Multiple"
          options={CATEGORY_OPTIONS}
          multiple
          placeholder="Select categories..."
          value={multipleValue}
          onChange={setMultipleValue}
        />
        <Dropdown
          {...args}
          label="Searchable"
          options={CATEGORY_OPTIONS}
          searchable
          multiple
          placeholder="Search categories..."
          value={searchableValue}
          onChange={setSearchableValue}
        />
        <Dropdown
          {...args}
          label="Compact"
          labelPosition="start"
          compact
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Dropdown {...args} label="With info message" infoMessage="Where the trivia is set." />
        <Dropdown {...args} label="With error" errorMessage="A region is required." />
        <Dropdown {...args} label="Disabled" value={["gondor"]} disabled />

        <section style={{ display: "grid", gap: "1rem" }}>
          <h3 style={{ margin: 0 }}>Field parity matrix</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1rem",
              maxWidth: "48rem",
            }}
          >
            <Input label="Default input" placeholder="Enter a region..." />
            <Dropdown label="Default dropdown" options={REGION_OPTIONS} />
            <Input
              label="Invalid input"
              defaultValue="Unknown"
              errorMessage="Choose a known region."
            />
            <Dropdown
              label="Invalid dropdown"
              options={REGION_OPTIONS}
              errorMessage="Choose a known region."
            />
            <Input label="Disabled input" defaultValue="Gondor" disabled />
            <Dropdown
              label="Disabled dropdown"
              options={REGION_OPTIONS}
              value={["gondor"]}
              disabled
            />
          </div>
        </section>

        <section style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
          <h3 style={{ margin: 0 }}>Focus and open parity</h3>
          <Input label="Focused input" />
          <Dropdown label="Open dropdown" options={REGION_OPTIONS} />
        </section>

        <section style={{ display: "grid", gap: "1rem" }}>
          <h3 style={{ margin: 0 }}>Borderless on raised surface</h3>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              maxWidth: "24rem",
              padding: "1rem",
              background: "var(--bg-surface-raised)",
            }}
          >
            <Input label="Borderless input" isBordered={false} />
            <Dropdown label="Borderless dropdown" options={REGION_OPTIONS} isBordered={false} />
          </div>
        </section>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("textbox", { name: "Focused input" }));
    const trigger = canvas.getByRole("button", { name: "Open dropdown" });
    await userEvent.click(trigger);
    await userEvent.hover(trigger);
  },
};
