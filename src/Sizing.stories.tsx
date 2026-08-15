import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, PlusIcon } from "lucide-react";
import userAvatar from "./assets/user-avatar.svg";
import { Btn } from "./components/Buttons/Btn";
import type { BtnSize } from "./components/Buttons/Btn.types";
import { SplitBtn } from "./components/Buttons/SplitBtn";
import { DropdownMenu } from "./components/DropdownMenu/DropdownMenu";
import { Pagination } from "./components/Pagination/Pagination";

const SIZES: BtnSize[] = ["xs", "sm", "md", "lg"];

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
  title: "Sizing comparison",
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Shared component sizes displayed side by side. Add size-aware components here to keep the system aligned.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllComponents: Story = {
  name: "All components",
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
      {["Icon button", "Avatar", "Button", "Split button", "Dropdown", "Pagination"].map(
        (label) => (
          <strong key={label} style={columnStyle}>
            {label}
          </strong>
        ),
      )}

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
            <SplitBtn size={size} menuAriaLabel={`More options (${size})`} menuItems={menuItems}>
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
            <Pagination page={1} pageCount={3} size={size} onPageChange={() => undefined} />
          </div>
        </div>
      ))}
    </div>
  ),
};
