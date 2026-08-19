import userAvatar from "@assets/user-avatar.svg";
import { Btn } from "@components/Buttons/Btn";
import type { BtnSize, BtnVariant } from "@components/Buttons/Btn.types";
import { SplitBtn } from "@components/Buttons/SplitBtn";
import { DropdownMenu } from "@components/DropdownMenu/DropdownMenu";
import { Pagination } from "@components/Pagination/Pagination";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, PlusIcon } from "lucide-react";
import { referenceDocs } from "./storybookDocs";

const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];
const VARIANTS: BtnVariant[] = [
  "primary",
  "secondary",
  "brand",
  "info",
  "error",
  "success",
  "warning",
];

const COMPONENT_LABELS = [
  "Icon button",
  "Avatar",
  "Button",
  "Split button",
  "Dropdown",
  "Pagination",
];

const menuItems = (
  <>
    <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
    <DropdownMenu.Item>Archive</DropdownMenu.Item>
  </>
);

const columnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "8rem",
} as const;

const meta = {
  title: "Comparisons/Buttons and navigation",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component: referenceDocs({
          summary:
            "Shared button-like component sizes and semantic variants displayed side by side.",
          usage:
            "Use these canvases to verify that adjacent actions share a `size` and that a semantic `variant` communicates the same intent across Button, SplitBtn, DropdownMenu, and Pagination.",
          styles:
            "The sizing story compares `BtnSize`; the variant story compares `BtnVariant`. Each component page documents additional fills, shapes, states, CSS custom properties, and its public props type.",
        }),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {
  name: "Sizing comparisons",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3rem repeat(6, minmax(8rem, max-content))",
        alignItems: "center",
        gap: "1.5rem 1rem",
        width: "max-content",
      }}
    >
      <span aria-hidden="true" />
      {COMPONENT_LABELS.map((label) => (
        <strong key={label} style={columnStyle}>
          {label}
        </strong>
      ))}

      {SIZES.map((size) => (
        <div key={size} style={{ display: "contents" }}>
          <strong>{size}</strong>
          <div style={columnStyle}>
            <Btn icon={<PlusIcon />} size={size} aria-label={`Add (${size})`} />
          </div>
          <div style={columnStyle}>
            <Btn
              icon={<img src={userAvatar} alt="" />}
              size={size}
              shape="avatar"
              aria-label={`User profile (${size})`}
            />
          </div>
          <div style={columnStyle}>
            <Btn size={size}>Button</Btn>
          </div>
          <div style={columnStyle}>
            <SplitBtn
              size={size}
              menuAriaLabel={`More options (${size})`}
              menuItems={menuItems}
            >
              Button
            </SplitBtn>
          </div>
          <div style={columnStyle}>
            <DropdownMenu
              size={size}
              trigger={(toggle, referenceProps) => (
                <Btn
                  {...referenceProps}
                  size={size}
                  icon={<ChevronDown />}
                  iconPosition="right"
                  onClick={toggle}
                >
                  Menu
                </Btn>
              )}
            >
              {menuItems}
            </DropdownMenu>
          </div>
          <div style={columnStyle}>
            <Pagination
              page={1}
              pageCount={3}
              size={size}
              onPageChange={() => undefined}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const VariantsComparison: Story = {
  name: "Variants comparison",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "5rem repeat(6, minmax(8rem, max-content))",
        alignItems: "center",
        gap: "1.5rem 1rem",
        width: "max-content",
      }}
    >
      <span aria-hidden="true" />
      {COMPONENT_LABELS.map((label) => (
        <strong key={label} style={columnStyle}>
          {label}
        </strong>
      ))}

      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "contents" }}>
          <strong>{variant}</strong>
          <div style={columnStyle}>
            <Btn
              icon={<PlusIcon />}
              variant={variant}
              aria-label={`Add (${variant})`}
            />
          </div>
          <div style={columnStyle}>
            <Btn
              icon={<img src={userAvatar} alt="" />}
              variant={variant}
              shape="avatar"
              aria-label={`User profile (${variant})`}
            />
          </div>
          <div style={columnStyle}>
            <Btn variant={variant}>Button</Btn>
          </div>
          <div style={columnStyle}>
            <SplitBtn
              variant={variant}
              menuAriaLabel={`More options (${variant})`}
              menuItems={menuItems}
            >
              Button
            </SplitBtn>
          </div>
          <div style={columnStyle}>
            <DropdownMenu
              variant={variant}
              trigger={(toggle, referenceProps) => (
                <Btn
                  {...referenceProps}
                  variant={variant}
                  icon={<ChevronDown />}
                  iconPosition="right"
                  onClick={toggle}
                >
                  Menu
                </Btn>
              )}
            >
              {menuItems}
            </DropdownMenu>
          </div>
          <div style={columnStyle}>
            <Pagination
              page={1}
              pageCount={3}
              variant={variant}
              onPageChange={() => undefined}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
