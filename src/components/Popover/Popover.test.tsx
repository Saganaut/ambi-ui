import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vite-plus/test";
import { Popover } from "./Popover";
import { PopoverNavContext } from "./PopoverNavContext";

const floating = vi.hoisted(() => ({
  useListItem: vi.fn(() => ({ ref: vi.fn(), index: 1 })),
}));

vi.mock("@floating-ui/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@floating-ui/react")>()),
  useListItem: floating.useListItem,
}));

describe("Popover", () => {
  it("renders its default dialog semantics and merges presentation props", () => {
    const markup = renderToStaticMarkup(
      <Popover ariaLabel="Formatting" className="custom" style={{ width: 240 }}>
        Content
      </Popover>,
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-label="Formatting"');
    expect(markup).toContain("custom");
    expect(markup).toContain("width:240px");
    expect(markup).toContain("Content");
  });

  it("accepts alternate supported roles", () => {
    const markup = renderToStaticMarkup(<Popover role="menu">Items</Popover>);

    expect(markup).toContain('role="menu"');
  });

  it("renders row, divider, and group-label primitives", () => {
    const markup = renderToStaticMarkup(
      <Popover>
        <Popover.groupLabel>Actions</Popover.groupLabel>
        <Popover.row className="custom-row">Row content</Popover.row>
        <Popover.divider />
      </Popover>,
    );

    expect(markup).toContain("Actions");
    expect(markup).toContain("custom-row");
    expect(markup).toContain("Row content");
    expect(markup).toContain('aria-hidden="true"');
  });

  it("renders a plain button and forwards native attributes without navigation context", () => {
    const markup = renderToStaticMarkup(
      <Popover.Button type="submit" disabled aria-label="Save changes">
        Save
      </Popover.Button>,
    );

    expect(markup).toContain('type="submit"');
    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-label="Save changes"');
    expect(markup).not.toContain('role="menuitem"');
  });

  it("registers a navigable button and applies roving focus props", () => {
    const getItemProps = vi.fn((props) => ({
      ...props,
      "data-navigable": "yes",
    }));
    const markup = renderToStaticMarkup(
      <PopoverNavContext.Provider value={{ getItemProps, activeIndex: 1 }}>
        <Popover.Button aria-label="Move">Move</Popover.Button>
      </PopoverNavContext.Provider>,
    );

    expect(getItemProps).toHaveBeenCalledWith(expect.objectContaining({ "aria-label": "Move" }));
    expect(markup).toContain('role="menuitem"');
    expect(markup).toContain('tabindex="0"');
    expect(markup).toContain('data-navigable="yes"');
  });

  it("removes a navigable button from the tab order when it is inactive", () => {
    const markup = renderToStaticMarkup(
      <PopoverNavContext.Provider
        value={{ getItemProps: (props = {}) => props, activeIndex: null }}
      >
        <Popover.Button>Move</Popover.Button>
      </PopoverNavContext.Provider>,
    );

    expect(markup).toContain('tabindex="-1"');
  });
});
