/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CirclePlus, PlusIcon } from "lucide-react";
import type { ReactNode } from "react";
import { fn } from "storybook/test";
import userAvatar from "../../assets/user-avatar.svg";
import { componentDocs } from "../../storybookDocs";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { Btn } from "./Btn";
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
];
const FILLS: BtnFill[] = ["default", "bordered", "ghost"];
const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];
const SHAPES: BtnShape[] = ["default", "pill", "squircle"];
const menuItems = (
  <>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item>Archive</DropdownMenu.Item>
  </>
);
const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: ".75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: ".75rem" }}>
      {children}
    </div>
  </section>
);

const meta = {
  title: "Common/Buttons",
  component: Btn,
  subcomponents: { SplitBtn },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: componentDocs({
          summary:
            "Button triggers an action. Choose a semantic variant for intent, emphasis, size, and shape. Icon-only and avatar buttons require an accessible name. SplitBtn pairs the primary action with a related menu.",
          typeName: "BtnProps (and SplitBtnProps for SplitBtn)",
          example: `import { Btn } from "@saganaut/ambi-ui";

<Btn variant="brand" icon={<PlusIcon />} onClick={createDeck}>
  Create deck
</Btn>`,
          styles:
            "Use `variant`, `fill`, `size`, and `shape` first. The overview compares all supported forms and states. For a scoped override, pass `className`/`style` or component custom properties such as `--btn-bg-color`, `--btn-color`, `--btn-radius`, `--btn-min-height`, and `--btn-icon-size`.",
        }),
      },
    },
  },
  args: { onClick: fn(), children: undefined },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "select", options: [...SHAPES, "avatar"] },
    iconPosition: { control: "inline-radio", options: ["left", "right"] },
  },
} satisfies Meta<typeof Btn>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Button appearance, form, state, capacity, and split-button coverage on one canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.25rem", width: "min(76rem, 92vw)" }}>
      <Section title="Playground">
        <Btn {...args}>Button</Btn>
        <Btn {...args} icon={<CirclePlus />}>
          Add deck
        </Btn>
        <Btn {...args} icon={<CirclePlus />} iconPosition="right">
          Continue
        </Btn>
      </Section>
      <Section title="Variants">
        {VARIANTS.map((variant) => (
          <Btn {...args} key={variant} variant={variant}>
            {variant}
          </Btn>
        ))}
      </Section>
      <Section title="Fills">
        {FILLS.map((fill) => (
          <Btn {...args} key={fill} fill={fill}>
            {fill}
          </Btn>
        ))}
      </Section>
      <Section title="Sizes">
        {SIZES.map((size) => (
          <Btn {...args} key={size} size={size}>
            {size}
          </Btn>
        ))}
      </Section>
      <Section title="Shapes">
        {SHAPES.map((shape) => (
          <Btn {...args} key={shape} shape={shape}>
            {shape}
          </Btn>
        ))}
      </Section>
      <Section title="Icon-only and avatar">
        {SIZES.map((size) => (
          <Btn
            {...args}
            key={`icon-${size}`}
            icon={<PlusIcon />}
            size={size}
            aria-label={`Add (${size})`}
          />
        ))}
        {SIZES.map((size) => (
          <Btn
            {...args}
            key={`avatar-${size}`}
            icon={<img src={userAvatar} alt="" style={{ width: "100%", height: "100%" }} />}
            size={size}
            shape="avatar"
            aria-label={`Profile (${size})`}
          />
        ))}
      </Section>
      <Section title="States and content">
        <Btn {...args} isLoading>
          Saving…
        </Btn>
        <Btn {...args} isDisabled>
          Disabled
        </Btn>
        <Btn {...args}>
          A deliberately long action label that may wrap or consume available space
        </Btn>
        <div style={{ width: "10rem" }}>
          <Btn {...args} style={{ width: "100%" }}>
            Full available width
          </Btn>
        </div>
      </Section>
      <Section title="Split buttons">
        {SIZES.map((size) => (
          <SplitBtn {...args} key={size} size={size} menuItems={menuItems}>
            {size}
          </SplitBtn>
        ))}
        <SplitBtn {...args} menuItems={menuItems} icon={<CirclePlus />}>
          Add deck
        </SplitBtn>
        <SplitBtn {...args} menuItems={menuItems} isLoading>
          Saving…
        </SplitBtn>
        <SplitBtn {...args} menuItems={menuItems} disabled>
          Disabled
        </SplitBtn>
      </Section>
    </div>
  ),
};
