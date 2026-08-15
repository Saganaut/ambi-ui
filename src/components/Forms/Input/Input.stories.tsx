/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Common/Input/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Deck name",
    placeholder: "e.g. Lord of the Rings trivia",
    id: "deck-name",
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["labelAbove", "labelInFront"] },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All input variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <Input {...args} id={`${args.id}-default`} label="Default" />
      <Input
        {...args}
        id={`${args.id}-info`}
        label="With info message"
        infoMessage="Shown to players in the lobby."
      />
      <Input
        {...args}
        id={`${args.id}-error`}
        label="With error"
        errorMessage="Name is required."
      />
      <Input
        {...args}
        id={`${args.id}-front`}
        label="Label in front"
        labelPosition="labelInFront"
      />
      <Input
        {...args}
        id={`${args.id}-compact`}
        label="Compact"
        labelPosition="labelInFront"
        compact
        placeholder="km"
      />
      <Input {...args} id={`${args.id}-full-width`} label="Full width" fullWidth />
    </div>
  ),
};
