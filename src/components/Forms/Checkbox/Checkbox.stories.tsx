/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Common/Input/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Allow guests to join",
    id: "allow-guests",
    labelPosition: "labelAfter",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["labelBefore", "labelAfter"],
    },
    checked: { control: "boolean" },
    shape: {
      control: "inline-radio",
      options: ["default", "squircle"],
    },
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
      <Checkbox
        {...args}
        id={`${args.id}-disabled`}
        label="Disabled"
        checked
        disabled
      />
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

export const LabelPositions: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "22rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-label-after`}
        label="Label after the control"
        labelPosition="labelAfter"
      />
      <Checkbox
        {...args}
        id={`${args.id}-label-before`}
        label="Label before the control"
        labelPosition="labelBefore"
      />
      <Checkbox
        {...args}
        id={`${args.id}-spaced-after`}
        label="Label after, spaced"
        labelPosition="labelAfter"
        fullWidth
        spaceBetween
      />
      <Checkbox
        {...args}
        id={`${args.id}-spaced-before`}
        label="Label before, spaced"
        labelPosition="labelBefore"
        fullWidth
        spaceBetween
      />
    </div>
  ),
};

export const Messages: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem", width: "22rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-after-info`}
        label="Label after"
        infoMessage="Helpful information stays below the row."
      />
      <Checkbox
        {...args}
        id={`${args.id}-before-info`}
        label="Label before"
        labelPosition="labelBefore"
        infoMessage="This message is below the label and control."
      />
      <Checkbox
        {...args}
        id={`${args.id}-after-error`}
        label="Label after with error"
        errorMessage="This option is required."
        validationState="invalid"
      />
      <Checkbox
        {...args}
        id={`${args.id}-spaced-error`}
        label="Full-width row with error"
        labelPosition="labelBefore"
        errorMessage="The error remains beneath the full row."
        fullWidth
        spaceBetween
      />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Checkbox {...args} id={`${args.id}-unchecked`} label="Unchecked" />
      <Checkbox
        {...args}
        id={`${args.id}-checked-state`}
        label="Checked"
        checked
      />
      <Checkbox
        {...args}
        id={`${args.id}-disabled-state`}
        label="Disabled"
        disabled
      />
      <Checkbox
        {...args}
        id={`${args.id}-checked-disabled`}
        label="Checked and disabled"
        checked
        disabled
      />
      <Checkbox
        {...args}
        id={`${args.id}-extra-label`}
        label="With extra label information"
        extraLabelInfo="Optional setting"
      />
      <Checkbox
        {...args}
        id={`${args.id}-no-label`}
        label={undefined}
        aria-label="No label"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-xs`}
        label="Extra small"
        fieldSize="xs"
      />
      <Checkbox
        {...args}
        id={`${args.id}-sm`}
        label="Small"
        fieldSize="sm"
        checked
      />
      <Checkbox {...args} id={`${args.id}-md`} label="Medium" fieldSize="md" />
      <Checkbox
        {...args}
        id={`${args.id}-lg`}
        label="Large"
        fieldSize="lg"
        checked
      />
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      {(["xs", "sm", "md", "lg"] as const).map((fieldSize) => (
        <div
          key={fieldSize}
          style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
        >
          <Checkbox
            {...args}
            id={`${args.id}-${fieldSize}-default`}
            label={`${fieldSize} default`}
            fieldSize={fieldSize}
            shape="default"
            checked
          />
          <Checkbox
            {...args}
            id={`${args.id}-${fieldSize}-squircle`}
            label={`${fieldSize} squircle`}
            fieldSize={fieldSize}
            shape="squircle"
            checked
          />
        </div>
      ))}
    </div>
  ),
};

export const ValidationStates: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-idle`}
        label="Idle"
        validationState="idle"
      />
      <Checkbox
        {...args}
        id={`${args.id}-validating`}
        label="Validating"
        validationState="validating"
        infoMessage="Checking this selection…"
      />
      <Checkbox
        {...args}
        id={`${args.id}-valid`}
        label="Valid"
        validationState="valid"
        checked
        infoMessage="Selection accepted."
      />
      <Checkbox
        {...args}
        id={`${args.id}-invalid`}
        label="Invalid"
        validationState="invalid"
        errorMessage="Please select this option."
      />
    </div>
  ),
};

export const ColorVariants: Story = {
  render: (args) => (
    <>
      {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: "1.5rem",
        }}
      >
        <Checkbox
          {...args}
          id={`${args.id}-primary`}
          label="Primary"
          variant="primary"
        />
        <Checkbox
          {...args}
          id={`${args.id}-secondary`}
          label="Secondary"
          variant="secondary"
        />
        <Checkbox
          {...args}
          id={`${args.id}-brand`}
          label="Brand"
          variant="brand"
        />
        <Checkbox
          {...args}
          id={`${args.id}-info-variant`}
          label="Info"
          variant="info"
        />
        <Checkbox
          {...args}
          id={`${args.id}-error-variant`}
          label="Error"
          variant="error"
        />
        <Checkbox
          {...args}
          id={`${args.id}-success-variant`}
          label="Success"
          variant="success"
        />
        <Checkbox
          {...args}
          id={`${args.id}-warning-variant`}
          label="Warning"
          variant="warning"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: "1.5rem",
        }}
      >
        <Checkbox
          {...args}
          id={`${args.id}-primary`}
          label="Primary"
          variant="primary"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-secondary`}
          label="Secondary"
          variant="secondary"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-brand`}
          label="Brand"
          variant="brand"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-info-variant`}
          label="Info"
          variant="info"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-error-variant`}
          label="Error"
          variant="error"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-success-variant`}
          label="Success"
          variant="success"
          checked
        />
        <Checkbox
          {...args}
          id={`${args.id}-warning-variant`}
          label="Warning"
          variant="warning"
          checked
        />
      </div>
    </>
  ),
};

export const FillVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-fill-default`}
        label="Default fill"
        fill="default"
      />
      <Checkbox
        {...args}
        id={`${args.id}-fill-bordered`}
        label="Bordered fill"
        fill="bordered"
        checked
      />
      <Checkbox
        {...args}
        id={`${args.id}-fill-ghost`}
        label="Ghost fill"
        fill="ghost"
      />
    </div>
  ),
};

export const CheckedByLabelPosition: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(12rem, 1fr))",
        gap: "1.5rem 2.5rem",
        maxWidth: "36rem",
      }}
    >
      <Checkbox
        {...args}
        id={`${args.id}-after-unchecked`}
        label="After, unchecked"
        labelPosition="labelAfter"
      />
      <Checkbox
        {...args}
        id={`${args.id}-after-checked`}
        label="After, checked"
        labelPosition="labelAfter"
        checked
      />
      <Checkbox
        {...args}
        id={`${args.id}-before-unchecked`}
        label="Before, unchecked"
        labelPosition="labelBefore"
      />
      <Checkbox
        {...args}
        id={`${args.id}-before-checked`}
        label="Before, checked"
        labelPosition="labelBefore"
        checked
      />
    </div>
  ),
};

export const FullWidthRows: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(100%, 36rem)" }}>
      <Checkbox
        {...args}
        id={`${args.id}-full-after`}
        label="Control and label grouped at the start"
        labelPosition="labelAfter"
        fullWidth
      />
      <Checkbox
        {...args}
        id={`${args.id}-full-after-spaced`}
        label="Control left, label right"
        labelPosition="labelAfter"
        fullWidth
        spaceBetween
      />
      <Checkbox
        {...args}
        id={`${args.id}-full-before`}
        label="Label and control grouped at the start"
        labelPosition="labelBefore"
        fullWidth
      />
      <Checkbox
        {...args}
        id={`${args.id}-full-before-spaced`}
        label="Label left, control right"
        labelPosition="labelBefore"
        fullWidth
        spaceBetween
        checked
      />
    </div>
  ),
};

export const MessageReservation: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(14rem, 1fr))",
        gap: "2rem",
        maxWidth: "40rem",
      }}
    >
      <Checkbox
        {...args}
        id={`${args.id}-reserved-empty`}
        label="Reserved, no message"
        reserveMessageSpace
      />
      <Checkbox
        {...args}
        id={`${args.id}-unreserved-empty`}
        label="Not reserved, no message"
        reserveMessageSpace={false}
      />
      <Checkbox
        {...args}
        id={`${args.id}-reserved-info`}
        label="Reserved with info"
        reserveMessageSpace
        infoMessage="Information below the content."
      />
      <Checkbox
        {...args}
        id={`${args.id}-unreserved-error`}
        label="Not reserved with error"
        reserveMessageSpace={false}
        errorMessage="Error below the content."
      />
    </div>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2rem", width: "min(100%, 28rem)" }}>
      <Checkbox
        {...args}
        id={`${args.id}-long-after`}
        label="Send me occasional product announcements, research invitations, and account recommendations"
        labelPosition="labelAfter"
      />
      <Checkbox
        {...args}
        id={`${args.id}-long-before`}
        label="I agree that this longer label can wrap across multiple lines before the checkbox control"
        labelPosition="labelBefore"
        checked
      />
      <Checkbox
        {...args}
        id={`${args.id}-long-extra`}
        label="Advanced notifications"
        extraLabelInfo="Includes weekly summaries and alerts about unusual activity across every connected workspace."
      />
      <Checkbox
        {...args}
        id={`${args.id}-long-message`}
        label="Terms and conditions"
        errorMessage="You must accept the terms and conditions before you can continue to the next step."
        validationState="invalid"
      />
    </div>
  ),
};

export const NativeAttributes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <Checkbox
        {...args}
        id={`${args.id}-required`}
        label="Required"
        required
      />
      <Checkbox
        {...args}
        id={`${args.id}-named`}
        label="With name and value"
        name="preferences"
        value="updates"
      />
      <Checkbox
        {...args}
        id={`${args.id}-readonly`}
        label="Read only"
        checked
        readOnly
      />
      <Checkbox
        {...args}
        id={`${args.id}-aria`}
        label={undefined}
        aria-label="Enable notifications"
      />
      <Checkbox
        {...args}
        id={`${args.id}-tab-order`}
        label="Removed from tab order"
        tabIndex={-1}
      />
    </div>
  ),
};

export const DenseSettingsList: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        width: "min(100%, 34rem)",
        padding: "1rem",
        border: "1px solid currentColor",
        borderRadius: "0.5rem",
      }}
    >
      <Checkbox
        {...args}
        id={`${args.id}-email`}
        label="Email notifications"
        extraLabelInfo="Product and account updates"
        labelPosition="labelBefore"
        fullWidth
        spaceBetween
        checked
        reserveMessageSpace={false}
      />
      <Checkbox
        {...args}
        id={`${args.id}-email`}
        label="Email notifications"
        extraLabelInfo="Product and account updates"
        labelPosition="labelAfter"
        fullWidth
        spaceBetween
        checked
        reserveMessageSpace={false}
      />
      <Checkbox
        {...args}
        id={`${args.id}-push`}
        label="Push notifications"
        extraLabelInfo="Alerts on signed-in devices"
        labelPosition="labelBefore"
        fullWidth
        spaceBetween
        reserveMessageSpace={false}
      />
      <Checkbox
        {...args}
        id={`${args.id}-sms`}
        label="SMS notifications"
        extraLabelInfo="Important security alerts only"
        labelPosition="labelBefore"
        fullWidth
        spaceBetween
        disabled
        reserveMessageSpace={false}
      />
    </div>
  ),
};
