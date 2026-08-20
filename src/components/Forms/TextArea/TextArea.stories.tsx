/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { TextArea } from "./TextArea";

const SIZES = ["xs", "sm", "md", "lg"] as const;
const FILLS = ["default", "bordered", "ghost"] as const;
const SHAPES = ["default", "pill", "squircle"] as const;
const VARIANTS = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
] as const;
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
  title: "Common/Input/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "TextArea collects multi-line text using the same label, message, validation, appearance, and sizing system as other fields.",
          typeName: "TextAreaProps",
          example: `import { TextArea } from "@saganaut/ambi-ui";

<TextArea
  label="Description"
  rows={4}
  value={description}
  onChange={(event) => setDescription(event.target.value)}
  fullWidth
/>`,
          styles:
            "TextArea shares `variant`, `fill`, `fieldSize`, `shape`, validation, messages, and `--field-*` custom properties with Input. Use `rows` for its initial height and native textarea props for browser behavior.",
        }),
      },
    },
  },
  args: {
    label: "Description",
    placeholder: "Describe your deck…",
    id: "deck-description",
    rows: 4,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    variant: {
      control: "select",
      options: VARIANTS,
    },
    fill: { control: "inline-radio", options: FILLS },
    shape: { control: "inline-radio", options: SHAPES },
    fieldSize: { control: "inline-radio", options: SIZES },
    validationState: {
      control: "inline-radio",
      options: ["idle", "validating", "valid", "invalid"],
    },
  },
} satisfies Meta<typeof TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Text area appearance, layout, messages, validation, capacity, and content stress cases. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", width: "min(72rem, 92vw)" }}>
      <Section title="Playground and label placement">
        <TextArea {...args} id={`${args.id}-playground`} />
        <TextArea
          {...args}
          id={`${args.id}-start`}
          label="Summary"
          labelPosition="start"
          extraLabelInfo="Optional"
          rows={3}
        />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <TextArea
            {...args}
            key={fieldSize}
            id={`${args.id}-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
            rows={2}
          />
        ))}
      </Section>
      <Section title="Color variants">
        {VARIANTS.map((variant) => (
          <TextArea
            {...args}
            key={variant}
            id={`${args.id}-${variant}`}
            label={variant}
            variant={variant}
            rows={2}
          />
        ))}
      </Section>
      <Section title="Fills and shapes">
        {FILLS.map((fill) => (
          <TextArea
            {...args}
            key={fill}
            id={`${args.id}-${fill}`}
            label={`${fill} fill`}
            fill={fill}
            rows={2}
          />
        ))}
        {SHAPES.map((shape) => (
          <TextArea
            {...args}
            key={shape}
            id={`${args.id}-${shape}`}
            label={`${shape} shape`}
            shape={shape}
            rows={2}
          />
        ))}
      </Section>
      <Section title="Messages and validation">
        <TextArea
          {...args}
          id={`${args.id}-info`}
          label="Supporting information"
          infoMessage="Visible to everyone invited to the deck."
        />
        <TextArea
          {...args}
          id={`${args.id}-error`}
          label="Invalid description"
          defaultValue="Too short"
          validationState="invalid"
          errorMessage="Write at least 20 characters."
        />
        <TextArea
          {...args}
          id={`${args.id}-validating`}
          label="Validating"
          defaultValue="A useful description is being checked."
          validationState="validating"
        />
        <TextArea
          {...args}
          id={`${args.id}-valid`}
          label="Valid"
          defaultValue="A clear and useful description."
          validationState="valid"
        />
      </Section>
      <Section title="Space and long content">
        <div style={{ width: "14rem" }}>
          <TextArea
            {...args}
            id={`${args.id}-narrow`}
            label="A deliberately long label that wraps in a narrow space"
            infoMessage="A longer supporting message should wrap without colliding with the field or status icon."
            fullWidth
          />
        </div>
        <TextArea
          {...args}
          id={`${args.id}-full`}
          label="Full available width"
          fullWidth
          rows={3}
          maxLength={240}
          extraLabelInfo="0 / 240"
        />
        <TextArea
          {...args}
          id={`${args.id}-disabled`}
          label="Disabled"
          defaultValue="This content cannot be edited."
          disabled
        />
        <TextArea
          {...args}
          id={`${args.id}-no-reserve`}
          label="No reserved message space"
          reserveMessageSpace={false}
        />
      </Section>
    </div>
  ),
};
