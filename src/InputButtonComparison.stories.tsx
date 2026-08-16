import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import "./styles/variants.module.css";
import { Btn } from "./components/Buttons/Btn";
import type { BtnFill, BtnSize, BtnVariant } from "./components/Buttons/Btn.types";
import { Input } from "./components/Forms/Input/Input";

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
  gridTemplateColumns: "minmax(5rem, max-content) minmax(18rem, 28rem) minmax(8rem, max-content)",
  alignItems: "center",
  gap: "var(--stack-md) var(--gap-lg)",
  width: "max-content",
  maxWidth: "100%",
} as const;

const Comparison = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: "var(--stack-sm)" }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
    <div style={comparisonGridStyle}>
      <span aria-hidden="true" />
      <strong>Input</strong>
      <strong>Button</strong>
      {children}
    </div>
  </section>
);

const meta = {
  title: "Comparisons",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Inputs and regular buttons displayed side by side to compare shared sizes and styles.",
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
      <Comparison title="Sizes">
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
            <Btn size={size}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Variants">
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
            <Btn variant={variant}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Fills">
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
            <Btn fill={fill}>Button</Btn>
          </div>
        ))}
      </Comparison>

      <Comparison title="Shapes">
        <strong>default</strong>
        <Input
          label="Label"
          labelPosition="start"
          placeholder="Value"
          reserveMessageSpace={false}
          fullWidth
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
        <Btn shape="pill">Button</Btn>
      </Comparison>
    </div>
  ),
};
