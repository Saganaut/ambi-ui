/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Common/Input/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Allow guests to join",
    id: "allow-guests",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["labelBefore", "labelAfter"],
    },
    checked: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All checkbox variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Checkbox {...args} id={`${args.id}-default`} label="Default" />
      <Checkbox {...args} id={`${args.id}-checked`} label="Checked" checked />
      <Checkbox
        {...args}
        id={`${args.id}-before`}
        label="Label before"
        labelPosition="labelBefore"
        checked
      />
      <Checkbox {...args} id={`${args.id}-disabled`} label="Disabled" checked disabled />
      <Checkbox
        {...args}
        id={`${args.id}-info`}
        label="With info message"
        infoMessage="Guests can play without an account."
      />
      <Checkbox
        {...args}
        id={`${args.id}-error`}
        label="With error"
        errorMessage="You must accept the rules."
      />
    </div>
  ),
};
