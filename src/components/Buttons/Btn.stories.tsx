/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CirclePlus, CircleX, PenLine, PlusIcon } from "lucide-react";
import userAvatar from "../../assets/user-avatar.svg";
import { Btn } from "./Btn";
import type { BtnFill, BtnSize, BtnVariant } from "./Btn.types";

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

const Row = ({ children }: { children: React.ReactNode }) => (
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
);

const StoryRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: "0.5rem" }}>
    <strong>{label}</strong>
    <Row>{children}</Row>
  </div>
);

const onClickFn = () => {
  console.log("Click");
};
const meta = {
  title: "Common/Buttons/Btn",
  component: Btn,
  tags: ["autodocs"],
  args: { onClick: onClickFn },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: {
      control: "select",
      options: ["default", "round", "pill", "avatar"],
    },
  },
} satisfies Meta<typeof Btn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <StoryRow label="Default">
        <Btn {...args}>Primary</Btn>
      </StoryRow>

      <StoryRow label="Variants">
        {VARIANTS.map((variant) => (
          <Btn key={variant} {...args} variant={variant}>
            {variant}
          </Btn>
        ))}
      </StoryRow>

      <StoryRow label="Fills">
        {FILLS.map((fill) => (
          <Btn key={fill} {...args} fill={fill}>
            {fill}
          </Btn>
        ))}
      </StoryRow>

      <StoryRow label="Sizes">
        {SIZES.map((size) => (
          <Btn key={size} {...args} size={size}>
            {size}
          </Btn>
        ))}
      </StoryRow>

      <StoryRow label="Shapes">
        <Btn {...args} shape="default">
          Default
        </Btn>
        <Btn {...args} shape="pill">
          Pill
        </Btn>
      </StoryRow>

      <StoryRow label="With icon">
        <Btn {...args} icon={<CirclePlus />}>
          Add deck
        </Btn>
        <Btn {...args} icon={<CirclePlus />} iconPosition="right">
          Add deck
        </Btn>
      </StoryRow>

      <StoryRow label="States">
        <Btn {...args} isLoading>
          Saving…
        </Btn>
        <Btn {...args} isDisabled>
          Disabled
        </Btn>
      </StoryRow>
    </div>
  ),
};

export const IconOnly: Story = {
  name: "Icon only",
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <StoryRow label="Default">
        <Btn {...args} icon={<PlusIcon />} aria-label="Add" />
      </StoryRow>

      <StoryRow label="Variants">
        {VARIANTS.map((variant) => (
          <Btn key={variant} {...args} icon={<PlusIcon />} variant={variant} aria-label={variant} />
        ))}
      </StoryRow>

      <StoryRow label="Fills">
        {FILLS.map((fill) => (
          <Btn key={fill} {...args} icon={<PlusIcon />} fill={fill} aria-label={fill} />
        ))}
      </StoryRow>

      <StoryRow label="Sizes">
        {SIZES.map((size) => (
          <Btn key={size} {...args} icon={<PlusIcon />} size={size} aria-label={size} />
        ))}
      </StoryRow>
    </div>
  ),
};

export const MiscIcons: Story = {
  name: "Misc icons",
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <StoryRow label="Actions">
        <Btn {...args} icon={<CircleX />} fill="ghost" aria-label="Close" />
        <Btn {...args} icon={<PenLine />} aria-label="Edit" />
      </StoryRow>

      <StoryRow label="Avatar">
        {SIZES.map((size) => (
          <Btn
            key={size}
            {...args}
            icon={
              <img
                src={userAvatar}
                alt=""
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            }
            size={size}
            shape="avatar"
            aria-label={`User profile (${size})`}
          />
        ))}
      </StoryRow>
    </div>
  ),
};
