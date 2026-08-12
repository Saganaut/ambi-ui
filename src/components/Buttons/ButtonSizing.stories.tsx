import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";
import userAvatar from "../../assets/user-avatar.svg";
import { Btn } from "./Btn";
import type { BtnSize } from "./Btn.types";

const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];

const meta = {
  title: "Common/Buttons/Button Sizing",
  component: Btn,
  parameters: {
    controls: { disable: true },
  },
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

const columnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "8rem",
} as const;

export const Comparison: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3rem repeat(3, minmax(8rem, max-content))",
        alignItems: "center",
        gap: "1.5rem 1rem",
        width: "max-content",
      }}
    >
      <span aria-hidden="true" />
      <strong style={columnStyle}>Icon</strong>
      <strong style={columnStyle}>Avatar</strong>
      <strong style={columnStyle}>Regular</strong>

      {SIZES.map((size) => (
        <div key={size} style={{ display: "contents" }}>
          <strong>{size}</strong>

          <div style={columnStyle}>
            <Btn icon={<PlusIcon />} size={size} aria-label={`Add (${size})`} />
          </div>

          <div style={columnStyle}>
            <Btn
              icon={<img src={userAvatar} alt="" />}
              size={size}
              shape="avatar"
              aria-label={`User profile (${size})`}
            />
          </div>

          <div style={columnStyle}>
            <Btn size={size}>Button</Btn>
          </div>
        </div>
      ))}
    </div>
  ),
};
