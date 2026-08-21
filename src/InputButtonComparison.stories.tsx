import { Btn } from "@components/Buttons/Btn";
import type {
  BtnFill,
  BtnSize,
  BtnVariant,
} from "@components/Buttons/Btn.types";
import { Checkbox } from "@components/Forms/Checkbox/Checkbox";
import { Input } from "@components/Forms/Input/Input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "@styles/variants.module.css";
import type { ReactNode } from "react";
import { referenceDocs } from "./storybookDocs";

const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];
const VARIANTS: BtnVariant[] = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
];
const FILLS: BtnFill[] = ["default", "bordered", "ghost"];

const comparisonGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "minmax(5rem, max-content) minmax(18rem, 28rem) minmax(8rem, max-content)",
  alignItems: "center",
  gap: "var(--stack-md) var(--control-gap-lg)",
  width: "max-content",
  maxWidth: "100%",
} as const;

const Comparison = ({
  title,
  children,
  includeCheckbox = false,
}: {
  title: string;
  children: ReactNode;
  includeCheckbox?: boolean;
}) => (
  <section style={{ display: "grid", gap: "var(--stack-sm)" }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
    <div
      style={{
        ...comparisonGridStyle,
        gridTemplateColumns: includeCheckbox
          ? "minmax(5rem, max-content) minmax(18rem, 28rem) minmax(8rem, max-content) minmax(8rem, max-content)"
          : comparisonGridStyle.gridTemplateColumns,
      }}
    >
      <span aria-hidden="true" />
      <strong>Input</strong>
      {includeCheckbox && <strong>Checkbox</strong>}
      <strong>Button</strong>
      {children}
    </div>
  </section>
);

const meta = {
  title: "Comparisons/Inputs vs buttons",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component: referenceDocs({
          summary:
            "Inputs, checkboxes, and buttons displayed side by side to compare shared sizes and styles.",
          usage:
            "Use this canvas when choosing a common `size`, `variant`, `fill`, or `shape` across mixed controls. Open each component's docs page for its copyable usage example and complete props table.",
          styles:
            "Rows show the exact visual result of the shared appearance unions: sizes `xs`–`lg`, semantic variants, default/bordered/ghost fills, and default/pill shapes.",
        }),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputsVsButtons: Story = {
  name: "Inputs vs buttons",
  render: () => (
    <div style={{ display: "grid", gap: "var(--stack-xl)", width: "100%" }}>
      <Comparison title="Sizes" includeCheckbox>
        {SIZES.map((size) => (
          <div key={size} style={{ display: "contents" }}>
            <strong>{size}</strong>
            <Input
              fieldSize={size}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              reserveMessageSpace={false}
              fullWidth
            />
            <Checkbox
              id={`comparison-checkbox-${size}`}
              fieldSize={size}
              label="Checkbox"
              reserveMessageSpace={false}
            />
            <Btn size={size}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Variants" includeCheckbox>
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ display: "contents" }}>
            <strong>{variant}</strong>
            <Input
              variant={variant}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              reserveMessageSpace={false}
              fullWidth
            />
            <Checkbox
              id={`comparison-checkbox-${variant}`}
              variant={variant}
              label="Checkbox"
              reserveMessageSpace={false}
            />
            <Btn variant={variant}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Fills" includeCheckbox>
        {FILLS.map((fill) => (
          <div key={fill} style={{ display: "contents" }}>
            <strong>{fill}</strong>
            <Input
              fill={fill}
              label="Label"
              labelPosition="start"
              placeholder="Value"
              reserveMessageSpace={false}
              fullWidth
            />
            <Checkbox
              id={`comparison-checkbox-${fill}`}
              fill={fill}
              label="Checkbox"
              reserveMessageSpace={false}
            />
            <Btn fill={fill}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Shapes" includeCheckbox>
        <strong>default</strong>
        <Input
          label="Label"
          labelPosition="start"
          placeholder="Value"
          reserveMessageSpace={false}
          fullWidth
        />
        <Checkbox
          id="comparison-checkbox-default"
          label="Checkbox"
          reserveMessageSpace={false}
        />
        <Btn>Button</Btn>

        <strong>pill</strong>
        <Input
          label="Label"
          labelPosition="start"
          placeholder="Value"
          reserveMessageSpace={false}
          shape="pill"
          fullWidth
        />
        <Checkbox
          id="comparison-checkbox-pill"
          label="Checkbox"
          shape="pill"
          reserveMessageSpace={false}
        />
        <Btn shape="pill">Button</Btn>
      </Comparison>
    </div>
  ),
};
