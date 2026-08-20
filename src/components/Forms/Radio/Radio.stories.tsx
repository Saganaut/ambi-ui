/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { Radio } from "./Radio";

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
const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
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
  title: "Common/Input/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Radio represents one choice within a mutually exclusive set. Prefer RadioGroup for standard forms so related radios receive a clear group label.",
          typeName: "RadioProps",
          example: `import { Radio } from "@saganaut/ambi-ui";

<Radio
  name="difficulty"
  value="easy"
  label="Easy"
  checked={difficulty === "easy"}
  onChange={() => setDifficulty("easy")}
/>`,
          styles:
            "Radio follows the shared field label, message, validation, and disabled styles. Use semantic props and design tokens first; `className` and `style` are available for local layout overrides.",
        }),
      },
    },
  },
  args: {
    name: "example",
    value: "option-1",
    label: "Option one",
    checked: true,
    labelPosition: "labelAfter",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["labelBefore", "labelAfter", "labelAbove"],
    },
    fieldSize: { control: "inline-radio", options: SIZES },
    variant: { control: "select", options: VARIANTS },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: {
      control: "inline-radio",
      options: ["default", "pill", "squircle"],
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All radio variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", width: "min(68rem, 92vw)" }}>
      <Section title="Selection and state">
        <Radio {...args} name={`${args.name}-default`} label="Default" />
        <Radio
          {...args}
          name={`${args.name}-unchecked`}
          label="Unchecked"
          checked={false}
        />
        <Radio
          {...args}
          name={`${args.name}-disabled`}
          label="Disabled"
          disabled
        />
      </Section>
      <Section title="Label position and spacing">
        <Radio
          {...args}
          name={`${args.name}-before`}
          label="Label before"
          labelPosition="labelBefore"
        />
        <Radio
          {...args}
          name={`${args.name}-after`}
          label="Label after"
          labelPosition="labelAfter"
        />
        <Radio
          {...args}
          name={`${args.name}-above`}
          label="Label above"
          labelPosition="labelAbove"
        />
        <Radio
          {...args}
          name={`${args.name}-spaced`}
          label="Opposite ends"
          labelPosition="labelBefore"
          fullWidth
          spaceBetween
        />
      </Section>
      <Section title="Sizes">
        {SIZES.map((fieldSize) => (
          <Radio
            {...args}
            key={fieldSize}
            name={`${args.name}-${fieldSize}`}
            label={fieldSize.toUpperCase()}
            fieldSize={fieldSize}
          />
        ))}
      </Section>
      <Section title="Shapes and fills">
        {(["default", "pill", "squircle"] as const).map((shape) => (
          <Radio
            {...args}
            key={shape}
            name={`${args.name}-${shape}`}
            label={shape}
            shape={shape}
          />
        ))}
        {(["default", "bordered", "ghost"] as const).map((fill) => (
          <Radio
            {...args}
            key={fill}
            name={`${args.name}-${fill}`}
            label={`${fill} fill`}
            fill={fill}
          />
        ))}
      </Section>
      <Section title="Variants">
        {VARIANTS.map((variant) => (
          <Radio
            {...args}
            key={variant}
            name={`${args.name}-${variant}`}
            label={variant}
            variant={variant}
          />
        ))}
      </Section>
      <Section title="Messages and validation">
        <Radio
          {...args}
          name={`${args.name}-info`}
          label="With info message"
          infoMessage="Recommended for new players."
        />
        <Radio
          {...args}
          name={`${args.name}-error`}
          label="With error"
          checked={false}
          errorMessage="Selection required."
        />
      </Section>
    </div>
  ),
};
