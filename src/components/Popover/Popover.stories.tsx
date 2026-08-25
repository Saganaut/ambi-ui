import { Btn } from "@components/Buttons/Btn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Link, Underline } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { BaseFills, BaseShapes, BaseSizes, BaseVariants } from "../Base.types";
import { Popover } from "./Popover";
import type { PopoverProps } from "./Popover.types";
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

const VARIANTS: BaseVariants[] = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
];
const FILLS: BaseFills[] = ["default", "bordered", "ghost"];
const SIZES: Exclude<BaseSizes, "xl">[] = ["xs", "sm", "md", "lg"];
const SHAPES: BaseShapes[] = ["default", "pill", "squircle"];

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section style={{ display: "grid", gap: "0.75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      {children}
    </div>
  </section>
);

type SurfaceSampleProps = Omit<PopoverProps, "children" | "ariaLabel"> & {
  label: string;
  children?: ReactNode;
};

/**
 * The gallery stories render the surface on its own: PopoverWrapper only
 * supplies positioning styles, so a bare Popover shows the same chrome while
 * staying comparable side by side.
 */
const SurfaceSample = ({ label, children, ...props }: SurfaceSampleProps) => (
  <Popover {...props} ariaLabel={label}>
    {children ?? (
      <>
        <Popover.groupLabel>{label}</Popover.groupLabel>
        <Popover.row>
          <Popover.Button aria-label={`Bold — ${label}`}>
            <Bold />
          </Popover.Button>
          <Popover.Button aria-label={`Italic — ${label}`}>
            <Italic />
          </Popover.Button>
          <Popover.Button aria-label={`Underline — ${label}`}>
            <Underline />
          </Popover.Button>
          <Popover.divider />
          <Popover.Button aria-label={`Add link — ${label}`}>
            <Link />
          </Popover.Button>
        </Popover.row>
      </>
    )}
  </Popover>
);

const galleryStyle = {
  display: "grid",
  gap: "2.25rem",
  width: "min(76rem, 92vw)",
} as const;

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

The surface uses \`PopoverProps\`; positioning and interaction use \`PopoverWrapperProps\`. Use the wrapper for position styles.

\`variant\`, \`fill\`, \`size\`, and \`shape\` apply the shared modifier classes from \`variants.module.css\`, which set the \`--control-*\` custom properties. The popover reads those into its own scoped properties — \`--popover-bg-color\`, \`--popover-color\`, \`--popover-radius\`, \`--popover-gap\`, \`--popover-padding\`, \`--popover-shadow\` — and its nested primitives derive from the surface in turn (\`--popover-btn-size\`, \`--popover-btn-color\`, \`--popover-btn-hover-bg-color\`). Override any of them on \`className\` or \`style\` for one-off surfaces.

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
    variant: { control: "select", options: VARIANTS },
    fill: { control: "select", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
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
          <Btn
            style={triggerStyle}
            {...(triggerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
          >
            Format text
          </Btn>
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
          <Btn
            style={triggerStyle}
            {...(triggerProps as ButtonHTMLAttributes<HTMLButtonElement>)}
            type="button"
          >
            Open actions
          </Btn>
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

/** Every semantic variant on the default fill. */
export const Variants: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={galleryStyle}>
      <Section title="Variants">
        {VARIANTS.map((variant) => (
          <SurfaceSample {...args} key={variant} variant={variant} label={variant} />
        ))}
      </Section>
    </div>
  ),
};

/** Each fill across every variant, so surface, border, and ghost chrome compare directly. */
export const Fills: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={galleryStyle}>
      {FILLS.map((fill) => (
        <Section key={fill} title={`Fill: ${fill}`}>
          {VARIANTS.map((variant) => (
            <SurfaceSample
              {...args}
              key={`${fill}-${variant}`}
              fill={fill}
              variant={variant}
              label={variant}
            />
          ))}
        </Section>
      ))}
    </div>
  ),
};

/** Sizes drive padding, gap, font size, and the nested button height. */
export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={galleryStyle}>
      <Section title="Sizes">
        {SIZES.map((size) => (
          <SurfaceSample {...args} key={size} size={size} label={size} />
        ))}
      </Section>
      <Section title="Sizes with text actions">
        {SIZES.map((size) => (
          <SurfaceSample {...args} key={`text-${size}`} size={size} label={size}>
            <Popover.groupLabel>Document ({size})</Popover.groupLabel>
            <Popover.Button>Rename</Popover.Button>
            <Popover.Button>Duplicate</Popover.Button>
            <Popover.Button disabled>Delete</Popover.Button>
          </SurfaceSample>
        ))}
      </Section>
    </div>
  ),
};

/** Shapes set the corner radius and corner shape on the surface and its buttons. */
export const Shapes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={galleryStyle}>
      <Section title="Shapes">
        {SHAPES.map((shape) => (
          <SurfaceSample {...args} key={shape} shape={shape} label={shape} />
        ))}
      </Section>
      {SHAPES.map((shape) => (
        <Section key={`${shape}-sizes`} title={`Shape: ${shape} across sizes`}>
          {SIZES.map((size) => (
            <SurfaceSample
              {...args}
              key={`${shape}-${size}`}
              shape={shape}
              size={size}
              label={size}
            />
          ))}
        </Section>
      ))}
    </div>
  ),
};

/** Fill and shape combined per variant — the full surface matrix at one size. */
export const SurfaceMatrix: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div style={galleryStyle}>
      {VARIANTS.map((variant) => (
        <Section key={variant} title={`Variant: ${variant}`}>
          {FILLS.flatMap((fill) =>
            SHAPES.map((shape) => (
              <SurfaceSample
                {...args}
                key={`${variant}-${fill}-${shape}`}
                variant={variant}
                fill={fill}
                shape={shape}
                label={`${fill} · ${shape}`}
              />
            )),
          )}
        </Section>
      ))}
    </div>
  ),
};
