/* oxlint-disable react-hooks/rules-of-hooks, no-console */
/* oxlint-disable react-x/rules-of-hooks, no-console */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
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

const meta = {
  title: "Common/Pagination/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    page: 0,
    pageCount: 12,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ display: "grid", gap: "0.75rem" }}>
    <h2 style={{ margin: 0, fontSize: "1rem" }}>{title}</h2>
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
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
    </div>
  ),
};
