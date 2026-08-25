import variantStyles from "@styles/variants.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { InputWithButton } from "./InputWithButton";

const rootClassList = (markup: string): string[] => {
  const match = /^<div[^>]*\sclass="([^"]*)"/.exec(markup);
  return match?.[1]?.split(" ") ?? [];
};

describe("InputWithButton", () => {
  it("puts the shared variant, size, shape, and fill modifiers on the root", () => {
    const markup = renderToStaticMarkup(
      <InputWithButton
        label="Join code"
        value=""
        onChange={() => undefined}
        variant="warning"
        fieldSize="lg"
        shape="pill"
        fill="ghost"
      />,
    );
    const classes = rootClassList(markup);

    expect(classes).toContain(variantStyles.warning);
    expect(classes).toContain(variantStyles.lg);
    expect(classes).toContain(variantStyles.pill);
    expect(classes).toContain(variantStyles.ghost);
  });

  it("never renders a data-fill attribute", () => {
    const markup = renderToStaticMarkup(
      <InputWithButton value="" onChange={() => undefined} fill="bordered" shape="squircle" />,
    );

    expect(markup).not.toContain("data-fill");
    expect(rootClassList(markup)).toContain(variantStyles.bordered);
    expect(rootClassList(markup)).toContain(variantStyles.squircle);
  });

  it("renders the action button and forwards the field modifiers to it", () => {
    const markup = renderToStaticMarkup(
      <InputWithButton
        value=""
        onChange={() => undefined}
        buttonLabel="Join"
        buttonAriaLabel="Join session"
        fieldSize="lg"
        shape="pill"
        fill="ghost"
      />,
    );
    const buttonMatch = /<button[^>]*class="([^"]*)"/.exec(markup);

    expect(markup).toContain(">Join</span>");
    expect(markup).toContain('aria-label="Join session"');
    expect(buttonMatch?.[1]?.split(" ")).toContain(variantStyles.ghost);
    expect(buttonMatch?.[1]?.split(" ")).toContain(variantStyles.lg);
    expect(buttonMatch?.[1]?.split(" ")).toContain(variantStyles.pill);
  });

  it("reflects the invalid state on the input and the root", () => {
    const markup = renderToStaticMarkup(
      <InputWithButton value="" onChange={() => undefined} errorMessage="Unknown code" />,
    );

    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain('data-status="invalid"');
    expect(rootClassList(markup)).toContain(variantStyles.error);
  });
});
