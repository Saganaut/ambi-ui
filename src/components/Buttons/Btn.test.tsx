import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { Btn } from "./Btn";

describe("Btn", () => {
  it("renders its label with the default button attributes", () => {
    const markup = renderToStaticMarkup(<Btn>Save</Btn>);

    expect(markup).toContain('type="button"');
    expect(markup).toContain(">Save</span>");
    expect(markup).toContain("primary");
    expect(markup).toContain("md");
    expect(markup).not.toContain("data-fill");
  });

  it("applies variant, fill, size, shape, and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Btn variant="error" fill="ghost" size="lg" shape="pill" className="custom-btn">
        Delete
      </Btn>,
    );

    expect(markup).toContain("error");
    expect(markup).toContain('data-fill="ghost"');
    expect(markup).toContain("lg");
    expect(markup).toContain("pill");
    expect(markup).toContain("custom-btn");
  });

  it("renders an icon in either position", () => {
    const leftMarkup = renderToStaticMarkup(<Btn icon={<svg aria-hidden="true" />}>Add</Btn>);
    const rightMarkup = renderToStaticMarkup(
      <Btn icon={<svg aria-hidden="true" />} iconPosition="right">
        Add
      </Btn>,
    );

    expect(leftMarkup).toContain('data-icon-position="left"');
    expect(rightMarkup).toContain('data-icon-position="right"');
    expect(rightMarkup).toContain("<svg");
  });

  it("uses icon-button styling when there is no label", () => {
    const markup = renderToStaticMarkup(<Btn icon={<svg />} aria-label="Add" />);

    expect(markup).toContain("iconBtn");
    expect(markup).toContain('aria-label="Add"');
  });

  it("is disabled for disabled and loading states", () => {
    const disabledMarkup = renderToStaticMarkup(<Btn isDisabled>Disabled</Btn>);
    const loadingMarkup = renderToStaticMarkup(<Btn isLoading>Loading</Btn>);

    expect(disabledMarkup).toContain("disabled");
    expect(loadingMarkup).toContain("disabled");
  });

  it("forwards native button attributes", () => {
    const markup = renderToStaticMarkup(
      <Btn type="submit" name="action" value="save" data-testid="save-button">
        Save
      </Btn>,
    );

    expect(markup).toContain('type="submit"');
    expect(markup).toContain('name="action"');
    expect(markup).toContain('value="save"');
    expect(markup).toContain('data-testid="save-button"');
  });
});
