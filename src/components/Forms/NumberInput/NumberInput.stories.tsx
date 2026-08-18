/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "../../../styles/variants.module.css";
import { NumberInput } from "./NumberInput";

// NumberInput is a controlled numeric field (value/onChange typed as number).
// The stories wrap it in a stateful host so typing/stepping updates the value.
const meta = {
  title: "Common/Input/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "NumberInput provides a controlled numeric field with step controls and optional minimum, maximum, and step constraints.",
          typeName: "NumberInputProps",
          example: `import { NumberInput } from "@saganaut/ambi-ui";

<NumberInput
  label="Round timer"
  value={seconds}
  min={5}
  max={120}
  step={5}
  onChange={setSeconds}
/>`,
          styles:
            "Use shared field appearance and width props first. Stepper-specific custom properties include `--stepper-width`, `--icon-size`, `--input-padding`, and `--font-size`; the shared field tokens control labels and messages.",
        }),
      },
    },
  },
  args: {
    label: "Round timer (seconds)",
    id: "round-timer",
    value: 30,
    min: 0,
    max: 300,
    step: 5,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    fieldSize: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg"],
    },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    value: { control: false },
    onChange: { control: false },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <NumberInput {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All number-input variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ display: "grid", gap: "2rem", width: "min(30rem, 85vw)" }}>
        <NumberInput
          {...args}
          id={`${args.id}-default`}
          label="Default"
          value={value}
          onChange={setValue}
        />
        <NumberInput
          {...args}
          id={`${args.id}-front`}
          label="Label in front"
          labelPosition="start"
          value={value}
          onChange={setValue}
        />
        <NumberInput {...args} id={`${args.id}-disabled`} label="Disabled" disabled />
        <NumberInput
          {...args}
          id={`${args.id}-info`}
          label="With info message"
          infoMessage="How long players have to answer."
          value={value}
          onChange={setValue}
        />
        <NumberInput
          {...args}
          id={`${args.id}-error`}
          label="With error"
          errorMessage="Must be at least 5 seconds."
          value={value}
          onChange={setValue}
        />

        <section style={{ display: "grid", gap: "1rem" }}>
          <h3 style={{ margin: 0 }}>Sizes</h3>
          {(["xs", "sm", "md", "lg"] as const).map((size) => (
            <NumberInput
              {...args}
              key={size}
              id={`${args.id}-${size}`}
              label={`Round timer (${size})`}
              fieldSize={size}
              value={value}
              onChange={setValue}
            />
          ))}
        </section>

        <NumberInput
          {...args}
          id={`${args.id}-compact`}
          label="Compact"
          labelPosition="start"
          compact
          value={value}
          onChange={setValue}
        />
        <NumberInput
          {...args}
          id={`${args.id}-full-width`}
          label="Full width"
          fullWidth
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
