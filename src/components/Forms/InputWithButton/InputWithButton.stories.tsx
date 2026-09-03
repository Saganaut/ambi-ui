/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@styles/variants.module.css";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import type { FieldVariant } from "../Field.types";
import { InputWithButton } from "./InputWithButton";

const VARIANTS: FieldVariant[] = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
];

const SIZES = ["xs", "sm", "md", "lg"] as const;

const sectionStyle = {
  border: "1px dashed gray",
  padding: "8px",
  display: "grid",
  gap: "1rem",
  width: "100%",
} as const;

const gridStyle = {
  display: "grid",
  gap: "2rem 3rem",
  alignItems: "start",
} as const;

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={sectionStyle}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div style={gridStyle}>{children}</div>
  </section>
);

const meta = {
  title: "Common/Input/InputWithButton",
  component: InputWithButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "InputWithButton combines a single-line field with an immediately related action, such as joining with a code or submitting a search.",
          typeName: "InputWithButtonProps",
          example: `import { InputWithButton } from "@saganaut/ambi-ui";

<InputWithButton
  label="Join code"
  value={code}
  onChange={(event) => setCode(event.target.value)}
  buttonLabel="Join"
  onButtonClick={joinSession}
/>`,
          styles:
            "The input and action share `variant`, `fill`, `fieldSize`, and `shape`. Shared `--field-*` and `--btn-*` custom properties provide scoped overrides; keep validation guidance attached to the field.",
        }),
      },
    },
  },
  args: {
    label: "Join code",
    placeholder: "Enter session code",
    id: "join-code",
    buttonLabel: "Join",
    onChange: fn(),
    onButtonClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
    },
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: {
      control: "inline-radio",
      options: ["default", "pill", "squircle"],
    },
    fieldSize: {
      control: "inline-radio",
      options: SIZES,
    },
  },
} satisfies Meta<typeof InputWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All input-with-button variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "3rem", width: "90vw" }}>
      <Section title="Message and label placement">
        <InputWithButton
          {...args}
          id={`${args.id}-info-top`}
          label="Info · label above"
          infoMessage="Ask the host for the code."
        />
        <InputWithButton
          {...args}
          id={`${args.id}-error-top`}
          label="Error · label above"
          errorMessage="That code didn't match any session."
        />
        <InputWithButton
          {...args}
          id={`${args.id}-info-start`}
          label="Info · label in front"
          labelPosition="start"
          infoMessage="Ask the host for the code."
        />
        <InputWithButton
          {...args}
          id={`${args.id}-error-start`}
          label="Error · label in front"
          labelPosition="start"
          errorMessage="That code didn't match any session."
        />
      </Section>

      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <InputWithButton
            {...args}
            key={fieldSize}
            id={`${args.id}-size-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
          />
        ))}
      </Section>

      <Section title="Style variants">
        {VARIANTS.map((variant) => (
          <InputWithButton
            {...args}
            key={variant}
            id={`${args.id}-variant-${variant}`}
            label={`${variant[0].toUpperCase()}${variant.slice(1)}`}
            variant={variant}
          />
        ))}
      </Section>

      <Section title="Fill and shape">
        {(["default", "bordered", "ghost"] as const).map((fill) => (
          <InputWithButton
            {...args}
            key={fill}
            id={`${args.id}-fill-${fill}`}
            label={`${fill[0].toUpperCase()}${fill.slice(1)} fill`}
            fill={fill}
          />
        ))}
        <InputWithButton {...args} id={`${args.id}-pill`} label="Pill shape" shape="pill" />
        <InputWithButton
          {...args}
          id={`${args.id}-squircle`}
          label="Squircle shape"
          shape="squircle"
        />
      </Section>

      <Section title="Button content">
        <InputWithButton
          {...args}
          id={`${args.id}-button-icon-only`}
          label="Icon-only button"
          buttonLabel={undefined}
          buttonIcon={<ArrowRight />}
          buttonAriaLabel="Join session"
        />
        <InputWithButton
          {...args}
          id={`${args.id}-button-label-icon`}
          label="Button with icon"
          buttonIcon={<ArrowRight />}
          buttonIconPosition="right"
        />
      </Section>

      <Section title="Validation and availability">
        <InputWithButton
          {...args}
          id={`${args.id}-validating`}
          label="Validating"
          validationState="validating"
          value="ABC123"
        />
        <InputWithButton
          {...args}
          id={`${args.id}-valid`}
          label="Valid"
          validationState="valid"
          value="ABC123"
        />
        <InputWithButton
          {...args}
          id={`${args.id}-invalid`}
          label="Invalid"
          validationState="invalid"
          errorMessage="That code didn't match any session."
          value="ABC123"
        />
        <InputWithButton
          {...args}
          id={`${args.id}-disabled`}
          label="Disabled"
          value="ABC123"
          disabled
        />
      </Section>
    </div>
  ),
};

/** All supported field sizes, including alternate label and button content layouts. */
export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={{ display: "grid", gap: "3rem", width: "min(90vw, 48rem)" }}>
      <Section title="Label above">
        {SIZES.map((fieldSize) => (
          <InputWithButton
            {...args}
            key={fieldSize}
            id={`${args.id}-sizes-top-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
          />
        ))}
      </Section>

      <Section title="Label in front">
        {SIZES.map((fieldSize) => (
          <InputWithButton
            {...args}
            key={fieldSize}
            id={`${args.id}-sizes-start-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            labelPosition="start"
            fieldSize={fieldSize}
          />
        ))}
      </Section>

      <Section title="Icon action">
        {SIZES.map((fieldSize) => (
          <InputWithButton
            {...args}
            key={fieldSize}
            id={`${args.id}-sizes-icon-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
            buttonLabel={undefined}
            buttonIcon={<ArrowRight />}
            buttonAriaLabel="Join session"
          />
        ))}
      </Section>
    </div>
  ),
};
