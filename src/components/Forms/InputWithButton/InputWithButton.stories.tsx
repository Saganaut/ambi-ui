/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { InputWithButton } from "./InputWithButton";

const meta = {
  title: "Common/Input/InputWithButton",
  component: InputWithButton,
  tags: ["autodocs"],
  args: {
    label: "Join code",
    placeholder: "Enter session code",
    id: "join-code",
    buttonLabel: "Join",
    onChange: fn(),
    onButtonClick: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof InputWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All input-with-button variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <InputWithButton {...args} id={`${args.id}-default`} label="Default" />
      <InputWithButton
        {...args}
        id={`${args.id}-info`}
        label="With info message"
        infoMessage="Ask the host for the code."
      />
      <InputWithButton
        {...args}
        id={`${args.id}-error`}
        label="With error"
        errorMessage="That code didn't match any session."
      />
      <InputWithButton
        {...args}
        id={`${args.id}-front`}
        label="Label in front"
        labelPosition="start"
      />
      <InputWithButton
        {...args}
        id={`${args.id}-disabled`}
        label="Disabled"
        value="ABC123"
        disabled
      />
    </div>
  ),
};
