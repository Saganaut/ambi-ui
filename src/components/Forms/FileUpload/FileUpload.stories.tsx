/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "Common/Input/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  args: {
    label: "Upload assets",
    onChange: fn(),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const sectionStyle = {
  display: "grid",
  gap: "1rem",
} as const;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(18rem, 100%), 1fr))",
  gap: "1rem",
  alignItems: "start",
} as const;

/** All file-upload shapes, sizes, and variants on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", width: "min(72rem, 90vw)" }}>
      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Shapes</h2>
        <div style={gridStyle}>
          {(["default", "pill", "squircle"] as const).map((shape) => (
            <FileUpload
              {...args}
              key={shape}
              id={`file-upload-shape-${shape}`}
              label={shape[0].toUpperCase() + shape.slice(1)}
              shape={shape}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Sizes</h2>
        <div style={gridStyle}>
          {(["xs", "sm", "md", "lg"] as const).map((fieldSize) => (
            <FileUpload
              {...args}
              key={fieldSize}
              id={`file-upload-size-${fieldSize}`}
              label={fieldSize.toUpperCase()}
              fieldSize={fieldSize}
            />
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ margin: 0 }}>Variants</h2>
        <div style={gridStyle}>
          {(
            [
              "primary",
              "secondary",
              "brand",
              "info",
              "error",
              "success",
              "warning",
            ] as const
          ).map((variant) => (
            <FileUpload
              {...args}
              key={variant}
              id={`file-upload-variant-${variant}`}
              label={variant[0].toUpperCase() + variant.slice(1)}
              variant={variant}
            />
          ))}
        </div>
      </section>
    </div>
  ),
};
