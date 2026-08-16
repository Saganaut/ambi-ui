/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import "../../../styles/variants.module.css";
import { Toggle } from "./Toggle";

const meta = {
  title: "Common/Input/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    label: "Allow late joins",
    checked: true,
    onChange: fn(),
  },
  argTypes: {
    labelPosition: { control: "inline-radio", options: ["labelBefore", "labelAfter"] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
