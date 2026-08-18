import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { Dropdown } from "./components/Forms/Dropdown/Dropdown";
import { REGION_OPTIONS } from "./components/Forms/Dropdown/Dropdown.mocks";
import type { FieldSize } from "./components/Forms/Field.types";
import { Input } from "./components/Forms/Input/Input";
import { InputWithButton } from "./components/Forms/InputWithButton/InputWithButton";
import { NumberInput } from "./components/Forms/NumberInput/NumberInput";
import { TextArea } from "./components/Forms/TextArea/TextArea";
import { referenceDocs } from "./storybookDocs";
import "./styles/variants.module.css";

const SIZES: FieldSize[] = ["xs", "sm", "md", "lg"];

const sizeGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  alignItems: "start",
  gap: "var(--gap-lg)",
  width: "100%",
} as const;

const ComparisonSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: "var(--stack-sm)", minWidth: 0 }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
    <div style={sizeGridStyle}>{children}</div>
  </section>
);

const SizeCell = ({ size, children }: { size: FieldSize; children: ReactNode }) => (
  <div style={{ display: "grid", gap: "var(--gap-xs)", minWidth: 0 }}>
    <strong>{size}</strong>
    <div style={{ minWidth: 0 }}>{children}</div>
  </div>
);

const meta = {
  title: "Comparisons/Input sizing",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component: referenceDocs({
          summary: "Field component sizes displayed side by side for visual alignment.",
          usage:
            "Use this reference to choose one `fieldSize` for a row or form containing different field types. Component pages contain the controlled/uncontrolled usage examples and full prop types.",
          styles:
            "Every column uses the same `FieldSize` value (`xs`, `sm`, `md`, or `lg`) so control height, typography, padding, labels, and validation affordances can be reviewed together.",
        }),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputSizing: Story = {
  name: "Input sizing comparisons",
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--stack-xl)",
        width: "100%",
        maxWidth: "90rem",
        margin: "0 auto",
      }}
    >
      <ComparisonSection title="Input">
        {SIZES.map((fieldSize) => (
          <SizeCell key={fieldSize} size={fieldSize}>
            <Input
              fieldSize={fieldSize}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              fullWidth
              validationState="validating"
            />
          </SizeCell>
        ))}
      </ComparisonSection>

      <ComparisonSection title="Input + button">
        {SIZES.map((fieldSize) => (
          <SizeCell key={fieldSize} size={fieldSize}>
            <InputWithButton
              fieldSize={fieldSize}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              buttonLabel="Submit"
            />
          </SizeCell>
        ))}
      </ComparisonSection>

      <ComparisonSection title="Dropdown">
        {SIZES.map((fieldSize) => (
          <SizeCell key={fieldSize} size={fieldSize}>
            <Dropdown
              fieldSize={fieldSize}
              label="Label"
              labelPosition="start"
              options={REGION_OPTIONS}
              placeholder="Select a region"
              fullWidth
            />
          </SizeCell>
        ))}
      </ComparisonSection>

      <ComparisonSection title="Number input">
        {SIZES.map((fieldSize) => (
          <SizeCell key={fieldSize} size={fieldSize}>
            <NumberInput
              fieldSize={fieldSize}
              label="Label"
              labelPosition="start"
              value={30}
              onChange={() => undefined}
              fullWidth
            />
          </SizeCell>
        ))}
      </ComparisonSection>

      <ComparisonSection title="Text area">
        {SIZES.map((fieldSize) => (
          <SizeCell key={fieldSize} size={fieldSize}>
            <TextArea
              fieldSize={fieldSize}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              rows={2}
              fullWidth
            />
          </SizeCell>
        ))}
      </ComparisonSection>
    </div>
  ),
};
