/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CirclePlus, CircleX, PenLine, PlusIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import userAvatar from "../../assets/user-avatar.svg";
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
const SHAPES: BtnShape[] = ["default", "pill"];

const menuItems = (
  <>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item>Archive</DropdownMenu.Item>
  </>
);

const Row = ({ children }: { children: ReactNode }) => (
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

const StoryRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: "grid", gap: "0.5rem" }}>
    <strong>{label}</strong>
    <Row>{children}</Row>
  </div>
);

const onClickFn = () => {
  console.log("Click");
};
const meta = {
  title: "Common/Buttons",
  component: Btn,
  subcomponents: { SplitBtn },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Buttons share one set of semantic inputs and derive the rest of their presentation from them.

### Features

- **Appearance-aware edges.** In light mode, the default border is transparent and elevation is communicated with a shadow. In dark mode, the border is automatically derived from the button background using relative OKLCH color, so it remains visible across variants without a separate border palette.
- **Derived states.** Hover colors and dark-mode borders are calculated from \`--color\` and \`--bg-color\`. The \`bordered\` fill also derives its border from \`--bg-color\`, while \`ghost\` makes the background, border, and shadow transparent.
- **Composable forms.** The same variants, fills, sizes, shapes, icons, loading, and disabled behavior are shared by regular, icon-only, avatar, and split buttons.
- **Native button props.** Props not owned by the component are forwarded to the underlying \`button\`, including \`aria-*\`, \`data-*\`, event handlers, and \`style\`.

### Accessibility

- **Color contrast** Components are evaluated using APCA algorithm, some items such as Brand button are only meant to be used with large text.


### Style overrides

Pass component CSS variables through \`style\` for a local override. Because other values are derived, changing a foundational variable such as \`--bg-color\` also updates bordered and dark-mode edge colors.

\`--color\`, \`--bg-color\`, \`--border-color\`, \`--hover-color\`, \`--hover-bg-color\`, \`--hover-border-color\`, \`--shadow-size\`, \`--shadow-color\`, \`--font-size\`, \`--icon-size\`, \`--gap\`, \`--padding\`, \`--radius\`, and \`--min-height\` are available.

~~~tsx
<Btn
  style={{
    "--bg-color": "var(--bg-brand)",
    "--color": "var(--text-on-brand)",
    "--radius": "var(--radius-full)",
  } as CSSProperties}
>
  Custom button
</Btn>
~~~
        `,
      },
    },
  },
  args: { onClick: onClickFn, children: undefined },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: {
      control: "select",
      options: ["default", "pill", "avatar"],
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

export const Split: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Split buttons pair a primary action with a menu while preserving the same visual API.",
      },
    },
  },
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <StoryRow label="Default">
        <SplitBtn {...args} menuItems={menuItems}>
          Button
        </SplitBtn>
      </StoryRow>
      <StoryRow label="Variants">
        {VARIANTS.map((variant) => (
          <SplitBtn key={variant} {...args} menuItems={menuItems} variant={variant}>
            {variant}
          </SplitBtn>
        ))}
      </StoryRow>
      <StoryRow label="Fills">
        {FILLS.map((fill) => (
          <SplitBtn key={fill} {...args} menuItems={menuItems} fill={fill}>
            {fill}
          </SplitBtn>
        ))}
      </StoryRow>
      <StoryRow label="Sizes">
        {SIZES.map((size) => (
          <SplitBtn key={size} {...args} menuItems={menuItems} size={size}>
            {size}
          </SplitBtn>
        ))}
      </StoryRow>
      <StoryRow label="Shapes">
        {SHAPES.map((shape) => (
          <SplitBtn key={shape} {...args} menuItems={menuItems} shape={shape}>
            {shape}
          </SplitBtn>
        ))}
      </StoryRow>
      <StoryRow label="With icon">
        <SplitBtn {...args} menuItems={menuItems} icon={<CirclePlus />}>
          Add deck
        </SplitBtn>
        <SplitBtn {...args} menuItems={menuItems} icon={<CirclePlus />} iconPosition="right">
          Add deck
        </SplitBtn>
      </StoryRow>
      <StoryRow label="States">
        <SplitBtn {...args} menuItems={menuItems} isLoading>
          Saving…
        </SplitBtn>
        <SplitBtn {...args} menuItems={menuItems} disabled>
          Disabled
        </SplitBtn>
      </StoryRow>
    </div>
  ),
};

export const StyleOverrides: Story = {
  name: "Style overrides",
  render: (args) => (
    <Btn
      {...args}
      style={
        {
          "--bg-color": "var(--bg-brand)",
          "--color": "var(--text-on-brand)",
          "--radius": "var(--radius-full)",
          "--padding": "var(--p-pill-lg)",
        } as CSSProperties
      }
    >
      Custom properties
    </Btn>
  ),
};
