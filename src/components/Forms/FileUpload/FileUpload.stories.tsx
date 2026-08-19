/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { componentDocs } from "../../../storybookDocs";
import "@styles/variants.module.css";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "Common/Input/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "FileUpload accepts files through the system picker or drag and drop. Configure accepted types, maximum size, and single or multiple selection to match the task.",
          typeName: "FileUploadProps",
          example: `import { FileUpload } from "@saganaut/ambi-ui";

<FileUpload
  label="Cover image"
  accept="image/png,image/jpeg"
  maxBytes={5_000_000}
  onChange={setFiles}
/>`,
          styles:
            "Use `variant`, `fill`, `fieldSize`, and `shape` first. Custom properties include `--file-upload-bg-color`, `--file-upload-border-color`, `--file-upload-radius`, `--file-upload-min-height`, and `--file-upload-icon-size`.",
        }),
      },
    },
  },
  args: {
    label: "Upload assets",
    onChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["top", "start"] },
    fieldSize: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["default", "pill", "squircle"] },
    fill: { control: "inline-radio", options: ["default", "bordered", "ghost"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "brand", "info", "error", "success", "warning"],
    },
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
          {(["primary", "secondary", "brand", "info", "error", "success", "warning"] as const).map(
            (variant) => (
              <FileUpload
                {...args}
                key={variant}
                id={`file-upload-variant-${variant}`}
                label={variant[0].toUpperCase() + variant.slice(1)}
                variant={variant}
              />
            ),
          )}
        </div>
      </section>
    </div>
  ),
};
