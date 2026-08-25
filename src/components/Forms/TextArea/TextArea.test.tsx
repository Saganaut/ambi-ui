import variantStyles from "@styles/variants.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { TextArea } from "./TextArea";
import styles from "./TextArea.module.css";

const rootClassList = (markup: string): string[] => {
  const match = /^<div[^>]*\sclass="([^"]*)"/.exec(markup);
  return match?.[1]?.split(" ") ?? [];
};

describe("TextArea", () => {
  it("puts the shared variant, size, shape, and fill modifiers on the root", () => {
    const markup = renderToStaticMarkup(
      <TextArea
        label="Notes"
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
      <TextArea value="" onChange={() => undefined} fill="bordered" shape="squircle" />,
    );

    expect(markup).not.toContain("data-fill");
    expect(rootClassList(markup)).toContain(variantStyles.bordered);
    expect(rootClassList(markup)).toContain(variantStyles.squircle);
  });

  it("switches auto-grow with fullWidth", () => {
    const fixedMarkup = renderToStaticMarkup(<TextArea value="" onChange={() => undefined} />);
    const growingMarkup = renderToStaticMarkup(
      <TextArea value="" onChange={() => undefined} fullWidth />,
    );

    expect(fixedMarkup).toContain('data-auto-grow="false"');
    expect(fixedMarkup).toContain(styles.noAutoGrow);
    expect(growingMarkup).toContain('data-auto-grow="true"');
    expect(growingMarkup).not.toContain(styles.noAutoGrow);
  });

  it("reflects the invalid state on the textarea and the root", () => {
    const markup = renderToStaticMarkup(
      <TextArea value="" onChange={() => undefined} errorMessage="Required" rows={2} />,
    );

    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain('data-status="invalid"');
    expect(rootClassList(markup)).toContain(variantStyles.error);
  });
});
