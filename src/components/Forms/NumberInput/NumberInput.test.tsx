import variantStyles from "@styles/variants.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { NumberInput } from "./NumberInput";
import styles from "./NumberInput.module.css";

const rootClassList = (markup: string): string[] => {
  const match = /^<div[^>]*\sclass="([^"]*)"/.exec(markup);
  return match?.[1]?.split(" ") ?? [];
};

const noop = () => undefined;

describe("NumberInput", () => {
  it("puts the shared variant, size, shape, and fill modifiers on the root", () => {
    const markup = renderToStaticMarkup(
      <NumberInput
        label="Points"
        value={3}
        onChange={noop}
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
      <NumberInput value={3} onChange={noop} fill="bordered" shape="squircle" />,
    );

    expect(markup).not.toContain("data-fill");
    expect(rootClassList(markup)).toContain(variantStyles.bordered);
    expect(rootClassList(markup)).toContain(variantStyles.squircle);
  });

  it("keeps the stepper controls and compact sizing hooks", () => {
    const markup = renderToStaticMarkup(
      <NumberInput value={3} onChange={noop} compact expectedMaxValue={100} />,
    );

    expect(markup).toContain('aria-label="Increase"');
    expect(markup).toContain('aria-label="Decrease"');
    expect(markup).toContain(styles.compact);
    expect(markup).toContain(styles.valueSizer);
  });

  it("marks disabled and error states with its local styling hooks", () => {
    const disabledMarkup = renderToStaticMarkup(<NumberInput value={3} onChange={noop} disabled />);
    const errorMarkup = renderToStaticMarkup(
      <NumberInput value={3} onChange={noop} errorMessage="Too low" />,
    );

    expect(disabledMarkup).toContain(styles.disabled);
    expect(errorMarkup).toContain(styles.error);
    expect(rootClassList(errorMarkup)).toContain(variantStyles.error);
  });
});
