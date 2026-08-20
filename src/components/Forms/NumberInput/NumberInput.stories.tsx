/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@styles/variants.module.css";
import { useState } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
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
            `NumberInput is a controlled numeric field with built-in increment and decrement controls. Use \`min\`, \`max\`, and \`step\` for numeric constraints, and update the value through \`onChange\`.

### Width behaviour

By default, the field uses the shared responsive field width. Set \`fullWidth\` to fill its container or \`compact\` to size it to its numeric content.

A compact input normally grows and shrinks as its value changes. Add \`expectedMaxValue\` to reserve enough room for an expected value and prevent that layout shift. The sizing value is visual only: it is hidden from assistive technology and does not constrain input. Use \`max\` separately when the value must have an actual upper limit. If the entered value is wider than \`expectedMaxValue\`, the field grows to fit it.

### Labels, messages, and states

Labels can sit above the field or at its start. The component also supports the shared field sizes, fills, shapes, validation messages, disabled state, and reserved message space. The step buttons disable automatically at \`min\` and \`max\`.`,
          typeName: "NumberInputProps",
          example: `import { NumberInput } from "@saganaut/ambi-ui";

<NumberInput
  label="Round timer"
  value={seconds}
  min={5}
  max={120}
  step={5}
  onChange={setSeconds}
  compact
  expectedMaxValue={120}
/>`,
          styles:
            "Use `fieldSize`, `fill`, `shape`, `fullWidth`, and `compact` before overriding CSS. NumberInput-specific custom properties use the `--number-input-*` prefix for the stepper, icon, padding, typography, divider, colors, and hover state. Shared `--field-*` tokens control the outer field, label, and message layout.",
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
    compact: {
      description:
        "Sizes the control to its numeric content instead of the shared field width.",
    },
    expectedMaxValue: {
      description:
        "Reserves compact-mode width for this value without displaying it or imposing a numeric maximum.",
      control: "number",
    },
    min: {
      description:
        "Native minimum value; also disables the decrement button when reached.",
    },
    max: {
      description:
        "Native maximum value; also disables the increment button when reached.",
    },
    step: {
      description: "Amount added or subtracted by the step buttons.",
    },
    labelPosition: {
      description: "Places the label above the field or at its start.",
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
    fullWidth: {
      description: "Makes the component fill the available container width.",
    },
    value: {
      description: "The controlled numeric value.",
      control: false,
    },
    onChange: {
      description: "Called with the next numeric value after typing or stepping.",
      control: false,
    },
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
          infoMessage="How long players have to answer."
        />{" "}
        <NumberInput
          {...args}
          id={`${args.id}-top-expected`}
          label="Label on top"
          labelPosition="top"
          value={value}
          onChange={setValue}
          compact={true}
        />
        <NumberInput
          {...args}
          id={`${args.id}-top`}
          label="Label on top + expected value"
          labelPosition="top"
          value={value}
          onChange={setValue}
          compact={true}
          expectedMaxValue={1000}
        />
        <NumberInput
          {...args}
          id={`${args.id}-disabled`}
          label="Disabled"
          disabled
        />
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
          label="Compact (stable up to 1000)"
          labelPosition="start"
          compact
          expectedMaxValue={1000}
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
