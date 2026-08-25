import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import type { BaseShapes, MenuPosition } from "../Base.types";
import { Btn } from "../Buttons/Btn";
import type { BtnFill, BtnSize, BtnVariant } from "../Buttons/Btn.types";
import { DropdownMenu } from "./DropdownMenu";
import type { DropdownMenuProps, ToggleFn } from "./DropdownMenu.types";

const POSITIONS: MenuPosition[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
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
const SHAPES: BaseShapes[] = ["default", "pill", "squircle"];

type Appearance = Pick<
  DropdownMenuProps,
  "variant" | "fill" | "size" | "shape"
>;

const appearanceProps = (args: DropdownMenuProps): Appearance => ({
  variant: args.variant,
  fill: args.fill,
  size: args.size,
  shape: args.shape,
});

// The trigger keeps the menu's appearance so the button and panel read as one
// control, which is how these props are meant to be used together.
const makeTrigger =
  (label: string, appearance: Appearance = {}) =>
  (toggle: ToggleFn, referenceProps?: Record<string, any>) => (
    <Btn
      icon={<ChevronDown />}
      iconPosition="right"
      {...appearance}
      {...referenceProps}
      onClick={(event) => {
        toggle();
        referenceProps?.onClick?.(event);
      }}
    >
      {label}
    </Btn>
  );

const menuContent = (
  <>
    <DropdownMenu.Label>File actions</DropdownMenu.Label>
    <DropdownMenu.Item>
      <Pencil size={16} aria-hidden="true" />
      Rename
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <Copy size={16} aria-hidden="true" />
      Duplicate
    </DropdownMenu.Item>
    <DropdownMenu.Divider />
    <DropdownMenu.Item disabled>
      <Trash2 size={16} aria-hidden="true" />
      Delete (unavailable)
    </DropdownMenu.Item>
  </>
);

const shortMenu = (
  <>
    <DropdownMenu.Item>First action</DropdownMenu.Item>
    <DropdownMenu.Item>Second action</DropdownMenu.Item>
  </>
);

const meta = {
  title: "Common/DropdownMenu",
  component: DropdownMenu,
  subcomponents: {
    Item: DropdownMenu.Item,
    Label: DropdownMenu.Label,
    Link: DropdownMenu.Link,
    Divider: DropdownMenu.Divider,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Dropdown Menu presents a keyboard-navigable action list anchored to a trigger or cursor position.

The trigger render function receives a toggle callback and the reference props required for positioning and interaction. Compose menus with \`DropdownMenu.Item\`, \`Label\`, \`Divider\`, and \`Link\`. Its \`variant\`, \`fill\`, and \`size\` props use the same appearance vocabulary as Button and Pagination.

### How to use

~~~tsx
import { Btn, DropdownMenu } from "@saganaut/ambi-ui";

<DropdownMenu trigger={(toggle, triggerProps) => (
  <Btn {...triggerProps} onClick={toggle}>Actions</Btn>
)}>
  <DropdownMenu.Item onClick={duplicate}>Duplicate</DropdownMenu.Item>
  <DropdownMenu.Divider />
  <DropdownMenu.Item disabled>Delete</DropdownMenu.Item>
</DropdownMenu>
~~~

### Types and styles

The API table is generated from \`DropdownMenuProps\`; compound items use \`DropdownMenuItemProps\`, \`DropdownMenuLabelProps\`, and \`DropdownMenuLinkProps\`. Prefer \`variant\`, \`fill\`, \`size\`, \`shape\`, and \`position\`; scoped custom properties include \`--dropdown-menu-bg-color\`, \`--dropdown-menu-radius\`, \`--dropdown-menu-shadow\`, and \`--dropdown-menu-item-hover-bg-color\`.

### Accessibility

- Provides menu semantics, focus management, dismissal, and arrow-key list navigation.
- Items receive roving tab focus and links retain keyboard activation.
- Label icon-only triggers with \`aria-label\` in the trigger render function.
- Disabled menu items remain unavailable to pointer interaction.
        `,
      },
    },
  },
  args: {
    position: "top-left",
    anchorToCursor: false,
    trigger: makeTrigger("Actions"),
    children: menuContent,
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "select", options: SHAPES },
    position: {
      control: "select",
      options: POSITIONS,
      description: "Panel edge and alignment relative to the trigger.",
    },
    anchorToCursor: {
      control: "boolean",
      description:
        "Position the menu at the pointer coordinates passed to toggle.",
    },
    trigger: {
      control: false,
      description: "Render function for the menu trigger.",
    },
    children: {
      control: false,
      description: "Menu items and compound content primitives.",
    },
    className: { control: false },
    iconPosition: { control: false },
    isLoading: { control: false },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "1rem",
    }}
  >
    {children}
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section style={{ display: "grid", gap: "0.75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <Row>{children}</Row>
  </section>
);

// Misc groups the behaviours that only apply to Dropdown Menu, so the canvas
// still ends on the single shared section rather than a tail of one-offs.
const MiscGroup = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div style={{ display: "grid", gap: "0.5rem" }}>
    <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500 }}>
      {title}
    </h3>
    <Row>{children}</Row>
  </div>
);

/** Every dropdown menu state, appearance option, and behaviour on one canvas. */
export const Overview: Story = {
  render: (args) => {
    const appearance = appearanceProps(args);

    return (
      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          width: "min(52rem, 90vw)",
          padding: "1rem",
        }}
      >
        <Section title="Playground">
          <DropdownMenu {...args} />
        </Section>

        <Section title="States">
          <DropdownMenu
            {...args}
            trigger={makeTrigger("Closed", appearance)}
          >
            {shortMenu}
          </DropdownMenu>
          <DropdownMenu
            {...args}
            trigger={makeTrigger("Disabled item", appearance)}
          >
            <DropdownMenu.Item>Available action</DropdownMenu.Item>
            <DropdownMenu.Item disabled>Disabled action</DropdownMenu.Item>
          </DropdownMenu>
          <DropdownMenu
            {...args}
            trigger={makeTrigger("All disabled", appearance)}
          >
            <DropdownMenu.Item disabled>First action</DropdownMenu.Item>
            <DropdownMenu.Item disabled>Second action</DropdownMenu.Item>
          </DropdownMenu>
        </Section>

        <Section title="Variants">
          {VARIANTS.map((variant) => (
            <DropdownMenu
              key={variant}
              {...args}
              variant={variant}
              trigger={makeTrigger(variant, { ...appearance, variant })}
            >
              {shortMenu}
            </DropdownMenu>
          ))}
        </Section>

        <Section title="Fills">
          {FILLS.map((fill) => (
            <DropdownMenu
              key={fill}
              {...args}
              fill={fill}
              trigger={makeTrigger(fill, { ...appearance, fill })}
            >
              {shortMenu}
            </DropdownMenu>
          ))}
        </Section>

        <Section title="Sizes">
          {SIZES.map((size) => (
            <DropdownMenu
              key={size}
              {...args}
              size={size}
              trigger={makeTrigger(size, { ...appearance, size })}
            >
              {shortMenu}
            </DropdownMenu>
          ))}
        </Section>

        <Section title="Shapes">
          {SHAPES.map((shape) => (
            <DropdownMenu
              key={shape}
              {...args}
              shape={shape}
              trigger={makeTrigger(shape, { ...appearance, shape })}
            >
              {shortMenu}
            </DropdownMenu>
          ))}
        </Section>

        <section style={{ display: "grid", gap: "1.25rem" }}>
          <h2 style={{ margin: 0, fontSize: "1rem" }}>Misc</h2>

          <MiscGroup title="Content primitives">
            <DropdownMenu
              {...args}
              trigger={makeTrigger("Content examples", appearance)}
            >
              <DropdownMenu.Label>Workspace</DropdownMenu.Label>
              <DropdownMenu.Item>
                <Pencil size={16} aria-hidden="true" />
                Edit details
              </DropdownMenu.Item>
              <DropdownMenu.Item centered>
                <Check size={16} aria-hidden="true" />
                Centered item
              </DropdownMenu.Item>
              <DropdownMenu.Item disabled>Disabled item</DropdownMenu.Item>
              <DropdownMenu.Divider />
              <DropdownMenu.Link>
                <a href="https://example.com" target="_blank" rel="noreferrer">
                  External link
                </a>
                <ExternalLink size={14} aria-hidden="true" />
              </DropdownMenu.Link>
            </DropdownMenu>
          </MiscGroup>

          <MiscGroup title="Placements">
            {POSITIONS.map((position) => (
              <DropdownMenu
                key={position}
                {...args}
                position={position}
                trigger={makeTrigger(position, appearance)}
              >
                {shortMenu}
              </DropdownMenu>
            ))}
          </MiscGroup>

          <MiscGroup title="Cursor anchored">
            <DropdownMenu
              {...args}
              anchorToCursor
              trigger={(toggle, referenceProps) => (
                <div
                  {...referenceProps}
                  onContextMenu={(event: React.MouseEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    toggle(event);
                    referenceProps?.onContextMenu?.(event);
                  }}
                  style={{
                    display: "grid",
                    flex: 1,
                    minHeight: "10rem",
                    placeItems: "center",
                    border: "1px dashed var(--border-default)",
                    borderRadius: "var(--control-radius-md)",
                    color: "var(--text-muted)",
                    userSelect: "none",
                  }}
                >
                  Right-click in this area
                </div>
              )}
            >
              <DropdownMenu.Item>Cut</DropdownMenu.Item>
              <DropdownMenu.Item>Copy</DropdownMenu.Item>
              <DropdownMenu.Item>Paste</DropdownMenu.Item>
            </DropdownMenu>
          </MiscGroup>
        </section>
      </div>
    );
  },
};
