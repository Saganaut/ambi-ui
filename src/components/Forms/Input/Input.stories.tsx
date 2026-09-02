/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { Input } from "./Input";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const VARIANTS = ["primary", "secondary", "brand", "info", "error", "success", "warning"] as const;
const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: "1rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
        gap: "1.5rem",
      }}
    >
      {children}
    </div>
  </section>
);
const meta = {
  title: "Common/Input/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Input collects a single line of text or another native input value. Prefer a persistent label over placeholder-only instructions, and make errors specific and actionable.",
          typeName: "InputProps",
          example: `import { Input } from "@saganaut/ambi-ui";

<Input
  label="Deck name"
  value={name}
  onChange={(event) => setName(event.target.value)}
  errorMessage={name ? undefined : "Enter a deck name."}
  fullWidth
/>`,
          styles:
            "Use `variant`, `fill`, `fieldSize`, `shape`, and `fullWidth` first. Shared field custom properties include `--field-bg-color`, `--field-border-color`, `--field-radius`, `--field-min-height`, and `--field-label-width`.",
        }),
      },
    },
  },
  args: { label: "Deck name", placeholder: "e.g. Lord of the Rings trivia", id: "deck-name" },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    shape: { control: "inline-radio", options: ["default", "pill", "squircle"] },
    fieldSize: { control: "inline-radio", options: SIZES },
    variant: { control: "select", options: VARIANTS },
    validationState: {
      control: "inline-radio",
      options: ["idle", "validating", "valid", "invalid"],
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Input appearance, layout, messages, validation, availability, and content stress cases. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", width: "min(72rem, 92vw)" }}>
      <Section title="Playground and labels">
        <Input {...args} id={`${args.id}-playground`} />
        <Input {...args} id={`${args.id}-optional`} label="Deck name" extraLabelInfo="Optional" />
        <Input
          {...args}
          id={`${args.id}-start`}
          label="Short code"
          labelPosition="start"
          placeholder="ABC123"
        />
        <Input
          {...args}
          id={`${args.id}-required`}
          label="Account email"
          type="email"
          required
          extraLabelInfo="Required"
        />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <Input
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
          <Input
            {...args}
            key={variant}
            id={`${args.id}-${variant}`}
            label={variant}
            variant={variant}
          />
        ))}
      </Section>
      <Section title="Fills and shapes">
        {(["default", "bordered", "ghost"] as const).map((fill) => (
          <Input
            {...args}
            key={fill}
            id={`${args.id}-${fill}`}
            label={`${fill} fill`}
            fill={fill}
          />
        ))}
        {(["default", "pill", "squircle"] as const).map((shape) => (
          <Input
            {...args}
            key={shape}
            id={`${args.id}-${shape}`}
            label={`${shape} shape`}
            shape={shape}
          />
        ))}
      </Section>
      <Section title="Label in front">
        {SIZES.map((fieldSize) => (
          <Input
            {...args}
            key={`start-${fieldSize}`}
            id={`${args.id}-start-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            labelPosition="start"
            fieldSize={fieldSize}
            fullWidth
          />
        ))}
        {VARIANTS.map((variant) => (
          <Input
            {...args}
            key={`start-${variant}`}
            id={`${args.id}-start-${variant}`}
            label={variant}
            labelPosition="start"
            variant={variant}
            fullWidth
          />
        ))}
      </Section>
      <Section title="Messages and validation">
        <Input
          {...args}
          id={`${args.id}-info`}
          label="Supporting information"
          infoMessage="Shown to players in the lobby."
        />
        <Input
          {...args}
          id={`${args.id}-invalid`}
          label="Invalid"
          defaultValue="Trivia"
          validationState="invalid"
          errorMessage="Use at least 10 characters."
        />
        <Input
          {...args}
          id={`${args.id}-validating`}
          label="Validating"
          defaultValue="Friday night trivia"
          validationState="validating"
          infoMessage="Checking availability…"
        />
        <Input
          {...args}
          id={`${args.id}-valid`}
          label="Valid"
          defaultValue="Friday night trivia"
          validationState="valid"
          infoMessage="This name is available."
        />
      </Section>
      <Section title="Availability and content">
        <Input
          {...args}
          id={`${args.id}-disabled`}
          label="Disabled"
          defaultValue="Existing value"
          disabled
        />
        <Input
          {...args}
          id={`${args.id}-readonly`}
          label="Read only"
          defaultValue="Generated value"
          readOnly
        />
        <div style={{ width: "14rem" }}>
          <Input
            {...args}
            id={`${args.id}-narrow`}
            label="A deliberately long field label in narrow available space"
            infoMessage="A long supporting message should wrap cleanly without obscuring the input."
            fullWidth
          />
        </div>
        <Input
          {...args}
          id={`${args.id}-full`}
          label="Full available width"
          fullWidth
          maxLength={60}
          extraLabelInfo="0 / 60"
        />
        <Input
          {...args}
          id={`${args.id}-no-reserve`}
          label="No reserved message space"
          reserveMessageSpace={false}
        />
      </Section>
    </div>
  ),
};
