/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../../styles/variants.module.css";
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
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    fieldSize: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg"],
    },
    validationState: {
      control: "inline-radio",
      options: ["idle", "validating", "valid", "invalid"],
    },
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
        id={`${args.id}-extra-label-info`}
        label="With extra label info"
        extraLabelInfo="Optional"
      />
      <Input
        {...args}
        id={`${args.id}-info`}
        label="With info message"
        infoMessage="Shown to players in the lobby."
      />{" "}
      <Input
        {...args}
        id={`${args.id}-info`}
        label="With info message"
        infoMessage="Shown to players in the lobby. Shown to players in the lobby. Shown to players in the lobby."
      />
      <Input
        {...args}
        id={`${args.id}-error`}
        label="With error"
        errorMessage="Name is required."
      />{" "}
      <Input
        {...args}
        id={`${args.id}-error`}
        label="With error"
        errorMessage="Name is required. Please enter a name. Are you sure you entered a name. If you don't know what a name is, well I can't help you."
      />
      <Input
        {...args}
        id={`${args.id}-front`}
        label="Label in front"
        labelPosition="start"
      />
      <Input
        {...args}
        id={`${args.id}-front`}
        label="Label in front"
        labelPosition="start"
        extraLabelInfo="Optional OptionalOptionalOptional OptionalOptional OptionalOptional"
      />
      <Input
        {...args}
        id={`${args.id}-compact`}
        label="Compact"
        labelPosition="start"
        fieldSize="sm"
        placeholder="km"
      />
      <Input
        {...args}
        id={`${args.id}-full-width`}
        label="Full width"
        fullWidth
      />
    </div>
  ),
};

/** Label arrangements and richer supporting content shown alongside the label. */
export const LabelVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <Input {...args} id={`${args.id}-label-default`} label="Deck name" />
      <Input
        {...args}
        id={`${args.id}-label-optional`}
        label="Deck name"
        extraLabelInfo="Optional"
      />
      <Input
        {...args}
        id={`${args.id}-label-limit`}
        label="Deck name"
        extraLabelInfo={<span aria-label="Maximum 60 characters">0 / 60</span>}
        maxLength={60}
      />
      <Input
        {...args}
        id={`${args.id}-label-required`}
        label="Deck name"
        extraLabelInfo={<strong>Required</strong>}
        required
      />
      <Input
        {...args}
        id={`${args.id}-label-start`}
        label="Deck name"
        labelPosition="start"
        extraLabelInfo="Optional"
      />
      <Input
        {...args}
        id={`${args.id}-label-info`}
        label="Deck name"
        extraLabelInfo="Optional"
        infoMessage="Shown to players in the lobby."
      />{" "}
    </div>
  ),
};

/** Fill and shape combinations available to a standard input. */
export const AppearanceVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <Input {...args} id={`${args.id}-fill-default`} label="Default fill" />
      <Input
        {...args}
        id={`${args.id}-fill-bordered`}
        label="Bordered"
        fill="bordered"
      />
      <Input
        {...args}
        id={`${args.id}-fill-ghost`}
        label="Ghost"
        fill="ghost"
      />
      <Input {...args} id={`${args.id}-shape-pill`} label="Pill" shape="pill" />
      <Input
        {...args}
        id={`${args.id}-bordered-pill`}
        label="Bordered pill"
        fill="bordered"
        shape="pill"
      />
    </div>
  ),
};

/** Validation lifecycle states, including their messages and accessible field attributes. */
export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <Input
        {...args}
        id={`${args.id}-validation-idle`}
        label="Idle"
        validationState="idle"
        infoMessage="Validation has not started."
      />
      <Input
        {...args}
        id={`${args.id}-validation-validating`}
        label="Validating"
        defaultValue="Friday night trivia"
        validationState="validating"
        infoMessage="Checking whether this name is available…"
      />
      <Input
        {...args}
        id={`${args.id}-validation-valid`}
        label="Valid"
        defaultValue="Friday night trivia"
        validationState="valid"
        infoMessage="This name is available."
        checked
      />
      <Input
        {...args}
        id={`${args.id}-validation-invalid`}
        label="Invalid"
        defaultValue="Trivia"
        validationState="invalid"
        errorMessage="Use at least 10 characters."
      />
      <Input
        {...args}
        id={`${args.id}-validation-error-precedence`}
        label="Error message takes precedence"
        defaultValue="Trivia"
        validationState="valid"
        errorMessage="This name is already in use."
      />
    </div>
  ),
};
