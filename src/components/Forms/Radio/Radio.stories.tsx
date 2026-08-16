/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { Radio } from "./Radio";

const meta = {
  title: "Common/Input/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: {
    name: "example",
    value: "option-1",
    label: "Option one",
    checked: true,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["labelBefore", "labelAfter"],
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All radio variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Radio {...args} name={`${args.name}-default`} label="Default" />
      <Radio {...args} name={`${args.name}-unchecked`} label="Unchecked" checked={false} />
      <Radio
        {...args}
        name={`${args.name}-before`}
        label="Label before"
        labelPosition="labelBefore"
      />
      <Radio {...args} name={`${args.name}-disabled`} label="Disabled" disabled />
      <Radio
        {...args}
        name={`${args.name}-info`}
        label="With info message"
        infoMessage="Recommended for new players."
      />
      <Radio
        {...args}
        name={`${args.name}-error`}
        label="With error"
        checked={false}
        errorMessage="Selection required."
      />
    </div>
  ),
};
