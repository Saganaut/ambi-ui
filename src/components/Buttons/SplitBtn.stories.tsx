import type { Meta, StoryObj } from "@storybook/react-vite";
import { CirclePlus } from "lucide-react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import type { BtnFill, BtnShape, BtnSize, BtnVariant } from "./Btn.types";
import { SplitBtn } from "./SplitBtn";

const VARIANTS: BtnVariant[] = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
  "isDisabled",
];
const FILLS: BtnFill[] = ["default", "bordered", "ghost"];
const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];
const SHAPES: BtnShape[] = ["default", "pill"];

const menuItems = (
  <>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item>Archive</DropdownMenu.Item>
  </>
);

const StoryRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: "0.5rem" }}>
    <strong>{label}</strong>
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  </div>
);

const meta = {
  title: "Common/Buttons/SplitBtn",
  component: SplitBtn,
  tags: ["autodocs"],
  args: {
    children: "Button",
    menuItems,
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "inline-radio", options: SHAPES },
    menuItems: { control: false },
  },
} satisfies Meta<typeof SplitBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <StoryRow label="Default">
        <SplitBtn {...args} />
      </StoryRow>

      <StoryRow label="Variants">
        {VARIANTS.map((variant) => (
          <SplitBtn key={variant} {...args} variant={variant}>
            {variant}
          </SplitBtn>
        ))}
      </StoryRow>

      <StoryRow label="Fills">
        {FILLS.map((fill) => (
          <SplitBtn key={fill} {...args} fill={fill}>
            {fill}
          </SplitBtn>
        ))}
      </StoryRow>

      <StoryRow label="Sizes">
        {SIZES.map((size) => (
          <SplitBtn key={size} {...args} size={size}>
            {size}
          </SplitBtn>
        ))}
      </StoryRow>

      <StoryRow label="Shapes">
        {SHAPES.map((shape) => (
          <SplitBtn key={shape} {...args} shape={shape}>
            {shape}
          </SplitBtn>
        ))}
      </StoryRow>

      <StoryRow label="With icon">
        <SplitBtn {...args} icon={<CirclePlus />}>
          Add deck
        </SplitBtn>
        <SplitBtn {...args} icon={<CirclePlus />} iconPosition="right">
          Add deck
        </SplitBtn>
      </StoryRow>

      <StoryRow label="States">
        <SplitBtn {...args} isLoading>
          Saving…
        </SplitBtn>
        <SplitBtn {...args} disabled>
          Disabled
        </SplitBtn>
      </StoryRow>
    </div>
  ),
};
