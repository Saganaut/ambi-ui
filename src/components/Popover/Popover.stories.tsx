import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Link, Underline } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import type { BaseShapes } from "../Base.types";
import { Popover } from "./Popover";
import { PopoverNavContext } from "./PopoverNavContext";
import { PopoverWrapper } from "./PopoverWrapper";

const triggerStyle = {
  padding: "0.5rem 0.75rem",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--control-radius-sm)",
  background: "var(--bg-canvas)",
  color: "var(--text-primary)",
  cursor: "pointer",
} as const;

const SHAPES: BaseShapes[] = ["default", "pill", "squircle"];

const meta = {
  title: "Common/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Popover provides the visual surface and composable content primitives for floating toolbars, menus, and dialogs.

Pair it with \`PopoverWrapper\`, which owns positioning, open state, focus management, dismissal, and optional list navigation. Compose content with \`Popover.row\`, \`Popover.Button\`, \`Popover.divider\`, and \`Popover.groupLabel\`.

### How to use

~~~tsx
import { Popover, PopoverWrapper } from "@saganaut/ambi-ui";

<PopoverWrapper renderTrigger={(props) => <button {...props}>Format</button>}>
  {({ ctx }) => (
    <Popover role="toolbar" ariaLabel="Formatting" style={ctx.styles}>
      <Popover.Button aria-label="Bold"><Bold /></Popover.Button>
    </Popover>
  )}
</PopoverWrapper>
~~~

### Types and styles

The surface uses \`PopoverProps\`; positioning and interaction use \`PopoverWrapperProps\`. Use \`shape\` for the supported surface form and the wrapper for position styles. Scoped custom properties include \`--popover-bg-color\`, \`--popover-radius\`, \`--popover-shadow\`, \`--popover-btn-color\`, and \`--popover-btn-hover-bg-color\`.

### Accessibility

- Choose \`role="dialog"\`, \`"toolbar"\`, or \`"menu"\` to match the interaction.
- Supply \`ariaLabel\` unless the surface is labelled by visible content.
- Enable \`listNavigation\` on PopoverWrapper for arrow-key navigation through menu items.
- PopoverWrapper restores focus to its trigger after dismissal by default.
        `,
      },
    },
  },
  args: {
    role: "menu",
    ariaLabel: "Text formatting",
    children: null,
  },
  argTypes: {
    role: {
      control: "inline-radio",
      options: ["dialog", "toolbar", "menu"],
      description: "ARIA role describing the floating surface.",
    },
    ariaLabel: { description: "Accessible name for the floating surface." },
    shape: { control: "select", options: SHAPES },
    children: {
      control: false,
      description: "Popover content and compound primitives.",
    },
    className: { control: false },
    style: {
      control: false,
      description: "Usually receives positioning styles from PopoverWrapper.",
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Popover composition, roles, shapes, navigation, and short or long action content. */
export const Overview: Story = {
  render: (args) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "start",
      }}
    >
      <PopoverWrapper
        placement="bottom-start"
        listNavigation
        renderTrigger={(triggerProps) => (
          <button
            style={triggerStyle}
            {...(triggerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
          >
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
      <PopoverWrapper
        placement="bottom"
        listNavigation
        renderTrigger={(triggerProps) => (
          <button
            style={triggerStyle}
            {...(triggerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
          >
            Open actions
          </button>
        )}
      >
        {({ ctx }) => (
          <PopoverNavContext.Provider value={ctx.listNav ?? null}>
            <Popover {...args} ariaLabel="Document actions" style={ctx.styles}>
              <Popover.groupLabel>Document</Popover.groupLabel>
              <Popover.Button>Rename</Popover.Button>
              <Popover.Button>Duplicate</Popover.Button>
              <Popover.Button>A deliberately long action label</Popover.Button>
              <Popover.Button onClick={ctx.close}>Close menu</Popover.Button>
            </Popover>
          </PopoverNavContext.Provider>
        )}
      </PopoverWrapper>
    </div>
  ),
};
