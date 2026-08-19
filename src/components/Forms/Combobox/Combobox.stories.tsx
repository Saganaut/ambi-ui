/* oxlint-disable react-hooks/rules-of-hooks, react-x/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import { Combobox } from "./Combobox";

const OPTIONS = [
  { value: "gondor", label: "Gondor" },
  { value: "mordor", label: "Mordor" },
  { value: "rohan", label: "Rohan" },
  { value: "shire", label: "The Shire" },
  { value: "rivendell", label: "Rivendell" },
  { value: "lothlorien", label: "Lothlórien" },
];

const VARIANTS = ["primary", "secondary", "brand", "info", "error", "success", "warning"] as const;
const SHAPES = ["default", "pill", "squircle"] as const;

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: "1rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
        gap: "1.5rem",
      }}
    >
      {children}
    </div>
  </section>
);

const meta = {
  title: "Common/Input/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Combobox combines an editable text field with a filtered, single-select option list. Use it when users benefit from typing to find an option; use Dropdown for a conventional select.",
          typeName: "ComboboxProps (with DropdownOption for options)",
          example: `import { Combobox } from "@saganaut/ambi-ui";

<Combobox
  label="Region"
  options={regions}
  value={region}
  onChange={setRegion}
  placeholder="Search regions..."
/>`,
          styles:
            "Combobox supports the shared field `variant`, `fill`, `fieldSize`, `shape`, and width props.",
        }),
      },
    },
  },
  args: {
    label: "Region",
    placeholder: "Search regions...",
    options: OPTIONS,
    noOptionsMessage: "No regions found",
    onChange: fn(),
    onInputValueChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    shape: { control: "inline-radio", options: SHAPES },
    fieldSize: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    variant: { control: "select", options: VARIANTS },
    value: { control: false },
    options: { control: "object" },
    onChange: { control: false },
    onInputValueChange: { control: false },
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Combobox
        {...args}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          args.onChange?.(nextValue);
        }}
      />
    );
  },
};

export const Overview: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("rohan");

    return (
      <div style={{ display: "grid", gap: "2rem", width: "min(48rem, 90vw)" }}>
        <Combobox {...args} label="Default" value={value} onChange={setValue} />
        <Combobox
          {...args}
          label="With selection"
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Combobox {...args} label="With info" infoMessage="Start typing to filter regions." />
        <Combobox
          {...args}
          label="Invalid"
          errorMessage="Choose a known region."
          validationState="invalid"
        />
        <Combobox {...args} label="Disabled" value="gondor" disabled />

        <Section title="Color variants">
          {VARIANTS.map((variant) => (
            <Combobox
              {...args}
              key={variant}
              id={`combobox-variant-${variant}`}
              label={variant}
              variant={variant}
            />
          ))}
        </Section>

        <Section title="Shapes">
          {SHAPES.map((shape) => (
            <Combobox
              {...args}
              key={shape}
              id={`combobox-shape-${shape}`}
              label={`${shape} shape`}
              shape={shape}
            />
          ))}
        </Section>
      </div>
    );
  },
};

export const KeyboardSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Combobox {...args} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Region" });

    await userEvent.click(input);
    await userEvent.type(input, "mor");
    await expect(input).toHaveValue("mor");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("Mordor");
    await expect(input).toHaveAttribute("aria-expanded", "false");
  },
};
