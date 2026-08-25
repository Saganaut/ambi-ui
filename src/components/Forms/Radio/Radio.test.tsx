import variantStyles from "@styles/variants.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("applies the shared variant, size, shape, and fill modifier classes", () => {
    const markup = renderToStaticMarkup(
      <Radio
        name="plan"
        value="pro"
        label="Pro"
        variant="error"
        fieldSize="lg"
        shape="pill"
        fill="ghost"
        className="custom-radio"
      />,
    );

    expect(markup).toContain(variantStyles.error);
    expect(markup).toContain(variantStyles.lg);
    expect(markup).toContain(variantStyles.pill);
    expect(markup).toContain(variantStyles.ghost);
    expect(markup).toContain("custom-radio");
  });

  it("does not emit a data-fill attribute", () => {
    const markup = renderToStaticMarkup(<Radio name="plan" value="pro" label="Pro" fill="ghost" />);

    expect(markup).not.toContain("data-fill");
  });

  it("uses the default modifier classes when none are given", () => {
    const markup = renderToStaticMarkup(<Radio name="plan" value="pro" />);

    expect(markup).toContain(variantStyles.primary);
    expect(markup).toContain(variantStyles.md);
    expect(markup).toContain(variantStyles.default);
  });

  it("renders a labelled radio input", () => {
    const markup = renderToStaticMarkup(
      <Radio id="planPro" name="plan" value="pro" label="Pro" disabled />,
    );

    expect(markup).toContain('type="radio"');
    expect(markup).toContain('id="planPro"');
    expect(markup).toContain('for="planPro"');
    expect(markup).toContain("Pro");
    expect(markup).toContain("disabled");
  });

  it("reports an error message and invalid state", () => {
    const markup = renderToStaticMarkup(
      <Radio name="plan" value="pro" label="Pro" errorMessage="Pick one" />,
    );

    expect(markup).toContain("Pick one");
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain(variantStyles.error);
  });
});
