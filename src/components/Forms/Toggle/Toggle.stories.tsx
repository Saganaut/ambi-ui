/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { Toggle } from "./Toggle";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const VARIANTS = ["primary", "secondary", "brand", "info", "error", "success", "warning"] as const;
const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: ".75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div style={{ display: "grid", gap: "1rem" }}>{children}</div>
  </section>
);

const meta = {
  title: "Common/Input/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Toggle changes a setting immediately between on and off. Use it for reversible preferences, not for selecting one item or confirming an action.",
          typeName: "ToggleProps",
          example: `import { Toggle } from "@saganaut/ambi-ui";

<Toggle
  id="late-joins"
  label="Allow late joins"
  checked={enabled}
  onChange={(event) => setEnabled(event.target.checked)}
/>`,
          styles:
            "Use `variant`, `fill`, `fieldSize`, and shared field message props first. The overview compares on/off, disabled, validation, label placement, and narrow/full-width layouts. Pass `className` or `style` for local layout changes.",
        }),
      },
    },
  },
  args: { id: "allow-late-joins", label: "Allow late joins", checked: true, onChange: fn() },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    fieldSize: { control: "inline-radio", options: SIZES },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    variant: { control: "select", options: VARIANTS },
    validationState: {
      control: "inline-radio",
      options: ["idle", "validating", "valid", "invalid"],
    },
  },
} satisfies Meta<typeof Toggle>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Toggle states, sizes, variants, label placement, messages, and constrained content. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.25rem", width: "min(42rem, 90vw)" }}>
      <Section title="Playground and states">
        <Toggle {...args} id={`${args.id}-playground`} />
        <Toggle {...args} id={`${args.id}-off`} label="Off" checked={false} />
        <Toggle {...args} id={`${args.id}-disabled`} label="Disabled" disabled />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <Toggle
            {...args}
            key={fieldSize}
            id={`${args.id}-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
          />
        ))}
      </Section>
      <Section title="Variants">
        {VARIANTS.map((variant) => (
          <Toggle
            {...args}
            key={variant}
            id={`${args.id}-${variant}`}
            label={variant}
            variant={variant}
          />
        ))}
      </Section>
      <Section title="Labels and available space">
        <Toggle
          {...args}
          id={`${args.id}-top`}
          label="Label above"
          labelPosition="top"
          extraLabelInfo="Optional"
        />
        <Toggle
          {...args}
          id={`${args.id}-full`}
          label="Use the full row and keep the switch aligned when this label becomes much longer"
          fullWidth
        />
        <div style={{ width: "14rem" }}>
          <Toggle
            {...args}
            id={`${args.id}-narrow`}
            label="A long setting label in narrow available space"
            fullWidth
          />
        </div>
      </Section>
      <Section title="Messages and validation">
        <Toggle
          {...args}
          id={`${args.id}-info`}
          label="Share results"
          infoMessage="Participants can see results after answering."
        />
        <Toggle
          {...args}
          id={`${args.id}-invalid`}
          label="Accept required setting"
          checked={false}
          validationState="invalid"
          errorMessage="Enable this setting to continue."
        />
        <Toggle
          {...args}
          id={`${args.id}-validating`}
          label="Checking availability"
          validationState="validating"
        />
        <Toggle {...args} id={`${args.id}-valid`} label="Available" validationState="valid" />
      </Section>
    </div>
  ),
};
