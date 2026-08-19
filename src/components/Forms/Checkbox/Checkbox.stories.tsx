/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { Checkbox } from "./Checkbox";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const VARIANTS = ["primary", "secondary", "brand", "info", "error", "success", "warning"] as const;
const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: ".75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
        gap: "1rem 2rem",
        alignItems: "start",
      }}
    >
      {children}
    </div>
  </section>
);

const meta = {
  title: "Common/Input/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Checkbox lets a person select one or more independent options. Use RadioGroup when exactly one choice is required and Toggle when a preference takes effect immediately.",
          typeName: "CheckboxProps",
          example: `import { Checkbox } from "@saganaut/ambi-ui";

<Checkbox
  id="email-updates"
  label="Send email updates"
  checked={subscribed}
  onChange={(event) => setSubscribed(event.target.checked)}
/>`,
          styles:
            "Use `variant`, `fill`, `fieldSize`, and `shape` first. The overview covers checked, indeterminate, disabled, validation, labels, and constrained layouts. Scoped custom properties include `--checkbox-bg-color`, `--checkbox-border-color`, `--checkbox-radius`, and `--checkbox-gap`.",
        }),
      },
    },
  },
  args: {
    label: "Allow guests to join",
    id: "allow-guests",
    labelPosition: "labelAfter",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["labelBefore", "labelAfter"] },
    fieldSize: { control: "inline-radio", options: SIZES },
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    shape: { control: "inline-radio", options: ["default", "pill", "squircle"] },
    validationState: {
      control: "inline-radio",
      options: ["idle", "validating", "valid", "invalid"],
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Checkbox appearance, state, layout, message, validation, and content coverage. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", width: "min(68rem, 92vw)" }}>
      <Section title="Playground and selection">
        <Checkbox {...args} id={`${args.id}-playground`} />
        <Checkbox {...args} id={`${args.id}-checked`} label="Checked" checked />
        <Checkbox {...args} id={`${args.id}-disabled`} label="Disabled" disabled />
        <Checkbox
          {...args}
          id={`${args.id}-checked-disabled`}
          label="Checked and disabled"
          checked
          disabled
        />
      </Section>
      <Section title="Label position and spacing">
        <Checkbox {...args} id={`${args.id}-after`} label="Label after" />
        <Checkbox
          {...args}
          id={`${args.id}-before`}
          label="Label before"
          labelPosition="labelBefore"
        />
        <Checkbox
          {...args}
          id={`${args.id}-spaced`}
          label="Opposite ends of the row"
          labelPosition="labelBefore"
          fullWidth
          spaceBetween
        />
        <Checkbox
          {...args}
          id={`${args.id}-extra`}
          label="Additional context"
          extraLabelInfo="Optional"
        />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize, index) => (
          <Checkbox
            {...args}
            key={fieldSize}
            id={`${args.id}-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
            checked={index % 2 === 1}
          />
        ))}
      </Section>
      <Section title="Shapes and fills">
        {(["default", "pill", "squircle"] as const).map((shape) => (
          <Checkbox
            {...args}
            key={shape}
            id={`${args.id}-shape-${shape}`}
            label={shape}
            shape={shape}
            checked
          />
        ))}
        {(["default", "bordered", "ghost"] as const).map((fill) => (
          <Checkbox
            {...args}
            key={fill}
            id={`${args.id}-fill-${fill}`}
            label={`${fill} fill`}
            fill={fill}
            checked
          />
        ))}
      </Section>
      <Section title="Variants">
        {VARIANTS.map((variant) => (
          <Checkbox
            {...args}
            key={variant}
            id={`${args.id}-${variant}`}
            label={variant}
            variant={variant}
            checked
          />
        ))}
      </Section>
      <Section title="Messages and validation">
        <Checkbox
          {...args}
          id={`${args.id}-info`}
          label="Supporting information"
          infoMessage="Guests can participate without creating an account."
        />
        <Checkbox
          {...args}
          id={`${args.id}-invalid`}
          label="Required agreement"
          validationState="invalid"
          errorMessage="Accept the rules to continue."
        />
        <Checkbox
          {...args}
          id={`${args.id}-validating`}
          label="Checking setting"
          validationState="validating"
        />
        <Checkbox
          {...args}
          id={`${args.id}-valid`}
          label="Setting accepted"
          validationState="valid"
          checked
        />
      </Section>
      <Section title="Space and long content">
        <div style={{ width: "14rem" }}>
          <Checkbox
            {...args}
            id={`${args.id}-narrow`}
            label="A deliberately long checkbox label that wraps in narrow space"
            infoMessage="Supporting text also wraps cleanly."
            fullWidth
          />
        </div>
        <Checkbox
          {...args}
          id={`${args.id}-long-row`}
          label="A long full-width settings-row label keeps the control aligned at the far edge"
          labelPosition="labelBefore"
          fullWidth
          spaceBetween
        />
        <Checkbox
          {...args}
          id={`${args.id}-no-reserve`}
          label="No reserved message space"
          reserveMessageSpace={false}
        />
        <Checkbox
          {...args}
          id={`${args.id}-aria`}
          label={undefined}
          aria-label="Unlabelled example"
        />
      </Section>
    </div>
  ),
};
