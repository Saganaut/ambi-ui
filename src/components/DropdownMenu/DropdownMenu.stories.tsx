import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronDown, Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Btn } from "../Buttons/Btn";
import type { BtnFill, BtnSize, BtnVariant, MenuPosition } from "../Buttons/Btn.types";
import { DropdownMenu } from "./DropdownMenu";

const POSITIONS: MenuPosition[] = ["top-left", "top-right", "bottom-left", "bottom-right"];
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

const trigger = (toggle: () => void, referenceProps?: Record<string, any>) => (
  <Btn
    icon={<ChevronDown />}
    iconPosition="right"
    {...referenceProps}
    onClick={(event) => {
      toggle();
      referenceProps?.onClick?.(event);
    }}
  >
    Actions
  </Btn>
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
    trigger,
    children: menuContent,
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    position: {
      control: "select",
      options: POSITIONS,
      description: "Panel edge and alignment relative to the trigger.",
    },
    anchorToCursor: {
      control: "boolean",
      description: "Position the menu at the pointer coordinates passed to toggle.",
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ display: "grid", gap: "1rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    {children}
  </section>
);

/** All menu variants and behaviours on a single canvas. */
export const Overview: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gap: "3rem",
        width: "min(52rem, 90vw)",
        padding: "2rem",
      }}
    >
      <Section title="Playground">
        <DropdownMenu {...args} />
      </Section>

      <Section title="Content variants">
        <DropdownMenu
          {...args}
          size={"md"}
          trigger={(toggle, referenceProps) => (
            <Btn
              icon={<ChevronDown />}
              iconPosition="right"
              {...referenceProps}
              onClick={(e) => {
                toggle();
                referenceProps?.onClick?.(e);
              }}
            >
              Content examples
            </Btn>
          )}
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
      </Section>

      <Section title="Placements">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {POSITIONS.map((position) => (
            <DropdownMenu
              key={position}
              {...args}
              position={position}
              trigger={(toggle, referenceProps) => (
                <Btn
                  {...referenceProps}
                  onClick={(event) => {
                    toggle();
                    referenceProps?.onClick?.(event);
                  }}
                >
                  {position}
                </Btn>
              )}
            >
              <DropdownMenu.Item>First action</DropdownMenu.Item>
              <DropdownMenu.Item>Second action</DropdownMenu.Item>
            </DropdownMenu>
          ))}
        </div>
      </Section>

      <Section title="Cursor anchored">
        <DropdownMenu
          {...args}
          anchorToCursor
          trigger={(toggle, referenceProps) => (
            <div
              {...referenceProps}
              onContextMenu={(event) => {
                event.preventDefault();
                toggle(event);
                referenceProps?.onContextMenu?.(event);
              }}
              style={{
                display: "grid",
                minHeight: "10rem",
                placeItems: "center",
                border: "1px dashed var(--border-default)",
                borderRadius: "var(--radius-md)",
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
      </Section>
    </div>
  ),
};
