/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@styles/variants.module.css";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import { Toggle } from "./Toggle";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const VARIANTS = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
] as const;
const SHAPES = ["default", "pill", "squircle"] as const;
const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section style={{ display: "grid", gap: ".75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div style={{ display: "grid", gap: "1rem" }}>{children}</div>
  </section>
);

// Toggle is controlled, so stories need to retain the next checked value for
// clicks to visibly update the switch. Keep calling the supplied handler so
// interactions are still reported in Storybook's actions panel.
const InteractiveToggle = (args: ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);

  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        args.onChange?.(event);
      }}
    />
  );
};

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
  args: {
    id: "allow-late-joins",
    label: "Allow late joins",
    checked: true,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    fieldSize: { control: "inline-radio", options: SIZES },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: SHAPES },
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
        <InteractiveToggle {...args} id={`${args.id}-playground`} />
        <InteractiveToggle
          {...args}
          id={`${args.id}-off`}
          label="Off"
          checked={false}
        />
        <InteractiveToggle
          {...args}
          id={`${args.id}-disabled`}
          label="Disabled"
          disabled
        />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <InteractiveToggle
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
          <InteractiveToggle
            {...args}
            key={variant}
            id={`${args.id}-${variant}`}
            label={variant}
            variant={variant}
          />
        ))}
      </Section>
      <Section title="Shapes">
        {SHAPES.map((shape) => (
          <InteractiveToggle
            {...args}
            key={shape}
            id={`${args.id}-shape-${shape}`}
            label={shape}
            shape={shape}
          />
        ))}
      </Section>
      <Section title="Labels and available space">
        <InteractiveToggle
          {...args}
          id={`${args.id}-top`}
          label="Space between"
          labelPosition="start"
          extraLabelInfo="Optional"
          spaceBetween={true}
        />
        <InteractiveToggle
          {...args}
          id={`${args.id}-full`}
          label="Use the full row and keep the switch aligned when this label becomes much longer"
          fullWidth
        />
        <div style={{ width: "14rem" }}>
          <InteractiveToggle
            {...args}
            id={`${args.id}-narrow`}
            label="A long setting label in narrow available space"
            fullWidth
          />
        </div>
      </Section>
      <Section title="Messages and validation">
        <InteractiveToggle
          {...args}
          id={`${args.id}-info`}
          label="Share results"
          infoMessage="Participants can see results after answering."
        />
        <InteractiveToggle
          {...args}
          id={`${args.id}-invalid`}
          label="Accept required setting"
          checked={false}
          validationState="invalid"
          errorMessage="Enable this setting to continue."
        />
        <InteractiveToggle
          {...args}
          id={`${args.id}-validating`}
          label="Checking availability"
          validationState="validating"
        />
        <InteractiveToggle
          {...args}
          id={`${args.id}-valid`}
          label="Available"
          validationState="valid"
        />
      </Section>
    </div>
  ),
};
