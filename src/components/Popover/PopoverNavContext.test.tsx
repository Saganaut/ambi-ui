import { useContext } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vite-plus/test";
import { PopoverNavContext } from "./PopoverNavContext";

const ContextValue = () => {
  const value = useContext(PopoverNavContext);
  return <span>{value === null ? "no-navigation" : String(value.activeIndex)}</span>;
};

describe("PopoverNavContext", () => {
  it("defaults to null when no provider is present", () => {
    expect(renderToStaticMarkup(<ContextValue />)).toContain("no-navigation");
  });

  it("makes the supplied navigation value available to descendants", () => {
    const value = { getItemProps: vi.fn((props) => props), activeIndex: 3 };
    const markup = renderToStaticMarkup(
      <PopoverNavContext.Provider value={value}>
        <ContextValue />
      </PopoverNavContext.Provider>,
    );

    expect(markup).toContain(">3<");
  });
});
