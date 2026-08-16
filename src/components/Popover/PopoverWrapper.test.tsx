import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { PopoverWrapper } from "./PopoverWrapper";

const floating = vi.hoisted(() => ({
  parentId: null as string | null,
  isMounted: true,
  middleware: [] as unknown[],
  useClick: vi.fn(() => ({ name: "click" })),
  useHover: vi.fn(() => ({ name: "hover" })),
  useFocus: vi.fn(() => ({ name: "focus" })),
  useListNavigation: vi.fn(() => ({ name: "list" })),
  useFloating: vi.fn(),
}));

vi.mock("@floating-ui/react", () => {
  const PassThrough = ({ children }: { children: ReactNode }) => <>{children}</>;
  return {
    arrow: vi.fn((options) => ({ name: "arrow", options })),
    autoUpdate: vi.fn(),
    flip: vi.fn((options) => ({ name: "flip", options })),
    FloatingArrow: ({ className }: { className?: string }) => (
      <svg data-floating-arrow="true" className={className} />
    ),
    FloatingFocusManager: PassThrough,
    FloatingList: PassThrough,
    FloatingNode: PassThrough,
    FloatingPortal: PassThrough,
    FloatingTree: ({ children }: { children: ReactNode }) => (
      <section data-floating-tree="true">{children}</section>
    ),
    offset: vi.fn((amount) => ({ name: "offset", amount })),
    safePolygon: vi.fn(() => "safe-polygon"),
    shift: vi.fn((options) => ({ name: "shift", options })),
    useClick: floating.useClick,
    useDismiss: vi.fn(() => ({ name: "dismiss" })),
    useFloating: floating.useFloating,
    useFloatingNodeId: vi.fn(() => "node-id"),
    useFloatingParentNodeId: vi.fn(() => floating.parentId),
    useFocus: floating.useFocus,
    useHover: floating.useHover,
    useInteractions: vi.fn(() => ({
      getReferenceProps: (props = {}) => ({
        ...props,
        "data-reference": "true",
      }),
      getFloatingProps: (props = {}) => ({ ...props, "data-floating": "true" }),
      getItemProps: (props = {}) => props,
    })),
    useListNavigation: floating.useListNavigation,
    useRole: vi.fn(() => ({ name: "role" })),
    useTransitionStyles: vi.fn(() => ({
      isMounted: floating.isMounted,
      styles: { opacity: 0.5 },
    })),
  };
});

describe("PopoverWrapper", () => {
  const renderTrigger = () => <button>Open</button>;

  beforeEach(() => {
    floating.parentId = null;
    floating.isMounted = true;
    floating.middleware = [];
    vi.clearAllMocks();
    floating.useFloating.mockImplementation((options) => {
      floating.middleware = options.middleware;
      return {
        refs: { setReference: vi.fn(), setFloating: vi.fn() },
        floatingStyles: { position: "absolute", left: 12 },
        context: { open: options.open },
      };
    });
  });

  it("wraps an outermost popover in a floating tree", () => {
    const markup = renderToStaticMarkup(
      <PopoverWrapper renderTrigger={renderTrigger}>Content</PopoverWrapper>,
    );

    expect(markup).toContain('data-floating-tree="true"');
  });

  it("joins an existing floating tree when nested", () => {
    floating.parentId = "parent-node";
    const markup = renderToStaticMarkup(
      <PopoverWrapper renderTrigger={renderTrigger}>Content</PopoverWrapper>,
    );

    expect(markup).not.toContain('data-floating-tree="true"');
  });

  it("does not mount floating content while closed", () => {
    floating.isMounted = false;
    const markup = renderToStaticMarkup(
      <PopoverWrapper renderTrigger={renderTrigger}>Hidden content</PopoverWrapper>,
    );

    expect(markup).toContain("Open");
    expect(markup).not.toContain("Hidden content");
  });

  it("applies floating semantics, labels, positioning, and z-index", () => {
    let triggerProps: unknown;
    const markup = renderToStaticMarkup(
      <PopoverWrapper
        open
        zIndex={42}
        aria-label="Formatting options"
        renderTrigger={(props) => {
          triggerProps = props;
          return <button>Open</button>;
        }}
      >
        Content
      </PopoverWrapper>,
    );

    expect(triggerProps).toEqual(expect.objectContaining({ "data-reference": "true" }));
    expect(markup).toContain('data-floating="true"');
    expect(markup).toContain('aria-label="Formatting options"');
    expect(markup).toContain("z-index:42");
    expect(markup).toContain("Content");
  });

  it("configures click and hover interactions for hover activation", () => {
    renderToStaticMarkup(
      <PopoverWrapper openOn="hover" renderTrigger={renderTrigger}>
        Content
      </PopoverWrapper>,
    );

    expect(floating.useClick).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        enabled: true,
        ignoreMouse: true,
        toggle: false,
      }),
    );
    expect(floating.useHover).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ enabled: true, mouseOnly: true }),
    );
    expect(floating.useFocus).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ enabled: true }),
    );
  });

  it("exposes transition styles and optional list-navigation handles to children", () => {
    let receivedContext: Record<string, unknown> | undefined;
    renderToStaticMarkup(
      <PopoverWrapper open listNavigation renderTrigger={renderTrigger}>
        {({ ctx }) => {
          receivedContext = ctx;
          return <div>Items</div>;
        }}
      </PopoverWrapper>,
    );

    expect(receivedContext?.styles).toEqual({ opacity: 0.5 });
    expect(receivedContext?.listNav).toEqual(
      expect.objectContaining({
        activeIndex: null,
        getItemProps: expect.any(Function),
      }),
    );
    expect(floating.useListNavigation).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        enabled: true,
        focusItemOnOpen: false,
        loop: true,
      }),
    );
  });

  it("only adds arrow middleware and markup when requested", () => {
    const markup = renderToStaticMarkup(
      <PopoverWrapper
        showArrow
        arrowClassName="callout"
        offsetAmount={14}
        renderTrigger={renderTrigger}
      >
        Content
      </PopoverWrapper>,
    );

    expect(floating.middleware).toHaveLength(4);
    expect(floating.middleware).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "offset", amount: 14 })]),
    );
    expect(markup).toContain('data-floating-arrow="true"');
    expect(markup).toContain("callout");
  });
});
