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

/** All file-upload variants and states on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "min(30rem, 85vw)" }}>
      <FileUpload {...args} label="Default" />
      <FileUpload {...args} label="Images only" accept="image/*" />
      <FileUpload {...args} label="With info message" infoMessage="PNG or JPG, up to 5 MB each." />
      <FileUpload {...args} label="With error" errorMessage="At least one file is required." />
    </div>
  ),
};
