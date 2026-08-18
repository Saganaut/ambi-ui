/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import type { BaseShapes } from "../Base.types";
import type { BtnFill, BtnSize, BtnVariant } from "../Buttons/Btn.types";
import { Pagination } from "./Pagination";

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

const meta = {
  title: "Common/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Pagination moves through zero-indexed pages and supports both known and unknown totals.

Use \`pageCount\` for a known total, or omit it and provide \`hasMore\` for an open-ended result set. Set \`compact\` when a known total should use a concise “Page X of Y” label. The shared \`variant\`, \`fill\`, and \`size\` props match Button and Dropdown Menu.

### How to use

~~~tsx
import { Pagination } from "@saganaut/ambi-ui";

<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  ariaLabel="Search results"
/>
~~~

### Types and styles

\`PaginationProps\` is a discriminated union for known totals (\`pageCount\`) and unknown totals (\`hasMore\`). The API table below documents both forms. Use \`variant\`, \`fill\`, \`size\`, and \`shape\` first; scoped custom properties include \`--page-bg-color\`, \`--page-color\`, \`--page-radius\`, \`--page-size\`, and \`--page-gap\`.

### Accessibility

- Renders a labelled \`nav\` landmark; customize it with \`ariaLabel\` when multiple pagers appear on a page.
- Marks the selected page with \`aria-current="page"\`.
- Supports Left, Right, Home, and End keyboard navigation.
- Disables unavailable navigation controls at either boundary.
        `,
      },
    },
  },
  args: {
    page: 0,
    pageCount: 12,
    onPageChange: fn(),
  },
  argTypes: {
    page: { description: "Current zero-indexed page." },
    pageCount: {
      description: "Total page count when the result size is known.",
    },
    hasMore: {
      description: "Whether another page exists when pageCount is unknown.",
    },
    compact: {
      description: "Replace numbered pages with a Page X of Y label.",
    },
    siblingCount: {
      description: "Pages shown on each side of the current page.",
    },
    boundaryCount: {
      description: "Pages kept visible at the beginning and end.",
    },
    disabled: { description: "Disable every pagination action." },
    ariaLabel: { description: "Accessible label for the navigation landmark." },
    variant: { control: "select", options: VARIANTS },
    fill: { control: "inline-radio", options: FILLS },
    size: { control: "inline-radio", options: SIZES },
    shape: { control: "select", options: SHAPES },
    onPageChange: { description: "Called with the next zero-indexed page." },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ display: "grid", gap: "0.75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
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
  </section>
);

// Controlled wrapper so clicking pages actually moves the active page.
const ControlledPagination = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page);
  return (
    <Pagination
      {...args}
      page={page}
      onPageChange={(next) => {
        args.onPageChange(next);
        setPage(next);
      }}
    />
  );
};

const appearanceProps = (args: React.ComponentProps<typeof Pagination>) => ({
  variant: args.variant,
  fill: args.fill,
  size: args.size,
  shape: args.shape,
});

/** Every pagination form and appearance option on one canvas. */
export const Overview: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "2.5rem", padding: "1rem" }}>
      <Row title="Playground">
        <ControlledPagination {...args} />
      </Row>

      <Row title="Pagination modes">
        <ControlledPagination
          {...appearanceProps(args)}
          page={0}
          pageCount={12}
          onPageChange={fn()}
        />
        <ControlledPagination
          {...appearanceProps(args)}
          page={4}
          pageCount={12}
          compact
          onPageChange={fn()}
        />
        <ControlledPagination
          {...appearanceProps(args)}
          page={24}
          pageCount={50}
          onPageChange={fn()}
        />
        <ControlledPagination {...appearanceProps(args)} page={0} hasMore onPageChange={fn()} />
      </Row>

      <Row title="Variants">
        {VARIANTS.map((variant) => (
          <ControlledPagination
            key={variant}
            {...appearanceProps(args)}
            page={0}
            pageCount={5}
            variant={variant}
            onPageChange={fn()}
          />
        ))}
      </Row>

      <Row title="Fills">
        {FILLS.map((fill) => (
          <ControlledPagination
            key={fill}
            {...appearanceProps(args)}
            page={0}
            pageCount={5}
            fill={fill}
            onPageChange={fn()}
          />
        ))}
      </Row>

      <Row title="Sizes">
        {SIZES.map((size) => (
          <ControlledPagination
            key={size}
            {...appearanceProps(args)}
            page={0}
            pageCount={5}
            size={size}
            onPageChange={fn()}
          />
        ))}
      </Row>

      <Row title="States">
        <ControlledPagination
          {...appearanceProps(args)}
          page={1}
          pageCount={5}
          onPageChange={fn()}
        />
        <ControlledPagination
          {...appearanceProps(args)}
          page={1}
          pageCount={5}
          disabled
          onPageChange={fn()}
        />
      </Row>

      <Row title="Shapes">
        {SHAPES.map((shape) => (
          <ControlledPagination
            key={shape}
            {...appearanceProps(args)}
            page={0}
            pageCount={5}
            shape={shape}
            onPageChange={fn()}
          />
        ))}
      </Row>
    </div>
  ),
};
