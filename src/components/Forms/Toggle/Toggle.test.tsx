import variantStyles from "@styles/variants.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("applies the shared variant, size, shape, and fill modifier classes", () => {
    const markup = renderToStaticMarkup(
      <Toggle
        label="Notifications"
        variant="error"
        fieldSize="lg"
        shape="squircle"
        fill="ghost"
        className="custom-toggle"
        readOnly
      />,
    );

    expect(markup).toContain(variantStyles.error);
    expect(markup).toContain(variantStyles.lg);
    expect(markup).toContain(variantStyles.squircle);
    expect(markup).toContain(variantStyles.ghost);
    expect(markup).toContain("custom-toggle");
  });

  it("does not emit a data-fill attribute", () => {
    const markup = renderToStaticMarkup(<Toggle label="Notifications" fill="ghost" readOnly />);

    expect(markup).not.toContain("data-fill");
  });

  it("defaults to the primary, md, pill modifier classes", () => {
    const markup = renderToStaticMarkup(<Toggle label="Notifications" readOnly />);

    expect(markup).toContain(variantStyles.primary);
    expect(markup).toContain(variantStyles.md);
    expect(markup).toContain(variantStyles.pill);
  });

  it("renders a labelled checkbox input", () => {
    const markup = renderToStaticMarkup(
      <Toggle id="notify" label="Notifications" checked disabled readOnly />,
    );

    expect(markup).toContain('type="checkbox"');
    expect(markup).toContain('id="notify"');
    expect(markup).toContain('for="notify"');
    expect(markup).toContain("Notifications");
    expect(markup).toContain("checked");
    expect(markup).toContain("disabled");
  });

  it("reports an error message and invalid state", () => {
    const markup = renderToStaticMarkup(
      <Toggle label="Notifications" errorMessage="Required" readOnly />,
    );

    expect(markup).toContain("Required");
    expect(markup).toContain('aria-invalid="true"');
    expect(markup).toContain(variantStyles.error);
  });
});
