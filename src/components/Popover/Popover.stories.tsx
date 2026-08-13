import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Link, Underline } from "lucide-react";
import { Popover } from "./Popover";
import { PopoverNavContext } from "./PopoverNavContext";
import { PopoverWrapper } from "./PopoverWrapper";

const triggerStyle = {
  padding: "0.5rem 0.75rem",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-sm)",
  background: "var(--bg-canvas)",
  color: "var(--text-primary)",
  cursor: "pointer",
} as const;

const meta = {
  title: "Common/Popover/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    role: "menu",
    ariaLabel: "Text formatting",
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormattingMenu: Story = {
  render: (args) => (
    <PopoverWrapper
      placement="bottom-start"
      listNavigation
      renderTrigger={(triggerProps) => (
        <button type="button" style={triggerStyle} {...triggerProps}>
          Format text
        </button>
      )}
    >
      {({ ctx }) => (
        <PopoverNavContext.Provider value={ctx.listNav ?? null}>
          <Popover {...args} style={ctx.styles}>
            <Popover.groupLabel>Style</Popover.groupLabel>
            <Popover.row>
              <Popover.Button aria-label="Bold">
                <Bold />
              </Popover.Button>
              <Popover.Button aria-label="Italic">
                <Italic />
              </Popover.Button>
              <Popover.Button aria-label="Underline">
                <Underline />
              </Popover.Button>
              <Popover.divider />
              <Popover.Button aria-label="Add link">
                <Link />
              </Popover.Button>
            </Popover.row>
          </Popover>
        </PopoverNavContext.Provider>
      )}
    </PopoverWrapper>
  ),
};

export const Actions: Story = {
  args: {
    ariaLabel: "Document actions",
  },
  render: (args) => (
    <PopoverWrapper
      placement="bottom"
      listNavigation
      renderTrigger={(triggerProps) => (
        <button type="button" style={triggerStyle} {...triggerProps}>
          Open actions
        </button>
      )}
    >
      {({ ctx }) => (
        <PopoverNavContext.Provider value={ctx.listNav ?? null}>
          <Popover {...args} style={ctx.styles}>
            <Popover.groupLabel>Document</Popover.groupLabel>
            <Popover.Button>Rename</Popover.Button>
            <Popover.Button>Duplicate</Popover.Button>
            <Popover.Button onClick={ctx.close}>Close menu</Popover.Button>
          </Popover>
        </PopoverNavContext.Provider>
      )}
    </PopoverWrapper>
  ),
};
