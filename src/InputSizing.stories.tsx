import { Dropdown } from "@components/Forms/Dropdown/Dropdown";
import { REGION_OPTIONS } from "@components/Forms/Dropdown/Dropdown.mocks";
import type { FieldSize } from "@components/Forms/Field.types";
import { Input } from "@components/Forms/Input/Input";
import { InputWithButton } from "@components/Forms/InputWithButton/InputWithButton";
import { NumberInput } from "@components/Forms/NumberInput/NumberInput";
import { TextArea } from "@components/Forms/TextArea/TextArea";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@styles/variants.module.css";
import type { ReactNode } from "react";
import { referenceDocs } from "./storybookDocs";

const SIZES: FieldSize[] = ["xs", "sm", "md", "lg"];

const FIELDS: { label: string; render: (fieldSize: FieldSize) => ReactNode }[] =
  [
    {
      label: "Input",
      render: (fieldSize) => (
        <Input
          fieldSize={fieldSize}
          label="Label"
          labelPosition="start"
          placeholder="Value"
          fullWidth
          validationState="validating"
        />
      ),
    },
    {
      label: "Input + button",
      render: (fieldSize) => (
        <InputWithButton
          fieldSize={fieldSize}
          label="Label"
          labelPosition="start"
          placeholder="Value"
          buttonLabel="Submit"
        />
      ),
    },
    {
      label: "Dropdown",
      render: (fieldSize) => (
        <Dropdown
          fieldSize={fieldSize}
          label="Label"
          labelPosition="start"
          options={REGION_OPTIONS}
          placeholder="Select a region"
          fullWidth
        />
      ),
    },
    {
      label: "Number input",
      render: (fieldSize) => (
        <NumberInput
          fieldSize={fieldSize}
          label="Label"
          labelPosition="start"
          value={30}
          onChange={() => undefined}
          fullWidth
        />
      ),
    },
    {
      label: "Text area",
      render: (fieldSize) => (
        <TextArea
          fieldSize={fieldSize}
          label="Label"
          labelPosition="start"
          placeholder="Value"
          rows={2}
          fullWidth
        />
      ),
    },
  ];

const fieldGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
  alignItems: "start",
  gap: "var(--control-gap-lg)",
  width: "100%",
} as const;

const SizeSection = ({
  size,
  children,
}: {
  size: FieldSize;
  children: ReactNode;
}) => (
  <section style={{ display: "grid", gap: "var(--stack-sm)", minWidth: 0 }}>
    <h2 style={{ margin: 0 }}>{size}</h2>
    <div style={fieldGridStyle}>{children}</div>
  </section>
);

const FieldCell = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div style={{ display: "grid", gap: "10px", minWidth: 0 }}>
    <strong>{label}</strong>
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
          summary:
            "Field components grouped by size so every control at the same `fieldSize` sits side by side.",
          usage:
            "Use this reference to choose one `fieldSize` for a row or form containing different field types. Component pages contain the controlled/uncontrolled usage examples and full prop types.",
          styles:
            "Each section pins one `FieldSize` value (`xs`, `sm`, `md`, or `lg`) across every field type so control height, typography, padding, labels, and validation affordances can be compared directly.",
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
      {SIZES.map((fieldSize) => (
        <SizeSection key={fieldSize} size={fieldSize}>
          {FIELDS.map((field) => (
            <FieldCell key={field.label} label={field.label}>
              {field.render(fieldSize)}
            </FieldCell>
          ))}
        </SizeSection>
      ))}
    </div>
  ),
};
