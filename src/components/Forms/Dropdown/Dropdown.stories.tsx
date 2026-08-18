/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn, userEvent, within } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
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
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Dropdown selects one option, or several when `multiple` is enabled. Search is useful for longer option sets; keep option labels concise and use a visible field label.",
          typeName: "DropdownProps (with DropdownOption for options)",
          example: `import { Dropdown } from "@saganaut/ambi-ui";

<Dropdown
  label="Region"
  options={regions}
  value={region}
  onChange={setRegion}
  multiple={false}
/>`,
          styles:
            "Use shared field `variant`, `fill`, `fieldSize`, `shape`, and width props first. Panel-specific custom properties include `--dropdown-panel-bg-color`, `--dropdown-panel-radius`, `--dropdown-option-hover-bg-color`, and `--dropdown-list-max-height`.",
        }),
      },
    },
  },
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
    fieldSize: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    value: { control: false },
    onChange: { control: false },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All dropdown variants, states, and parity examples on a single canvas. */
export const Overview: Story = {
  render: (args) => {
    const { multiple: _multiple, value: _value, onChange: _onChange, ...sharedArgs } = args;
    const [defaultValue, setDefaultValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("gondor");
    const [multipleValue, setMultipleValue] = useState<string[]>(["history", "science"]);
    const [searchableValue, setSearchableValue] = useState<string[]>([]);

    return (
      <div style={{ display: "grid", gap: "2rem", width: "min(48rem, 90vw)" }}>
        <Dropdown
          {...sharedArgs}
          multiple={false}
          label="Default"
          value={defaultValue}
          onChange={setDefaultValue}
        />
        <Dropdown
          {...sharedArgs}
          multiple={false}
          label="With selection"
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Dropdown
          label="Multiple"
          options={CATEGORY_OPTIONS}
          multiple
          placeholder="Select categories..."
          value={multipleValue}
          onChange={setMultipleValue}
        />
        <Dropdown
          label="Searchable"
          options={CATEGORY_OPTIONS}
          searchable
          multiple
          placeholder="Search categories..."
          value={searchableValue}
          onChange={setSearchableValue}
        />
        <Dropdown
          {...sharedArgs}
          multiple={false}
          label="Compact"
          labelPosition="start"
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Dropdown
          {...sharedArgs}
          multiple={false}
          label="With info message"
          infoMessage="Where the trivia is set."
        />
        <Dropdown
          {...sharedArgs}
          multiple={false}
          label="With error"
          errorMessage="A region is required."
        />
        <Dropdown {...sharedArgs} multiple={false} label="Disabled" value="gondor" disabled />

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
            <Dropdown label="Disabled dropdown" options={REGION_OPTIONS} value="gondor" disabled />
          </div>
        </section>

        <section style={{ display: "grid", gap: "1rem", maxWidth: "24rem" }}>
          <h3 style={{ margin: 0 }}>Focus and open parity</h3>
          <Input label="Focused input" />
          <Dropdown label="Open dropdown" options={REGION_OPTIONS} />
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
