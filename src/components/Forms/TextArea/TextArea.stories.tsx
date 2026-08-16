/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { TextArea } from "./TextArea";

const meta = {
  title: "Common/Input/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    label: "Description",
    placeholder: "Describe your deck…",
    id: "deck-description",
    rows: 4,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: {
      control: "inline-radio",
      options: ["top", "start"],
    },
    variant: { control: "inline-radio", options: ["default"] },
    fill: {
      control: "inline-radio",
      options: ["default", "bordered", "ghost"],
    },
    shape: { control: "inline-radio", options: ["default", "pill"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
