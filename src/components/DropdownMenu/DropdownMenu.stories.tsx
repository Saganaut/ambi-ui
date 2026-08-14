import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";
import { Btn } from "../Buttons/Btn";
import type { MenuPosition } from "../Buttons/Btn.types";
import { DropdownMenu } from "./DropdownMenu";

const POSITIONS: MenuPosition[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

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
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    position: "top-left",
    anchorToCursor: false,
    trigger,
    children: menuContent,
  },
  argTypes: {
    position: { control: "select", options: POSITIONS },
    anchorToCursor: { control: "boolean" },
    trigger: { control: false },
    children: { control: false },
    className: { control: false },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
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
