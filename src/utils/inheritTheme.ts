import type { MiddlewareState } from "@floating-ui/react";

export const inheritTheme = (source: Element, target: HTMLElement) => {
  const appearanceScope = source.closest<HTMLElement>("[data-appearance]");
  if (appearanceScope?.dataset.appearance) {
    target.dataset.appearance = appearanceScope.dataset.appearance;
  }

  const ancestors: HTMLElement[] = [];
  for (let node = source.parentElement; node; node = node.parentElement) {
    ancestors.unshift(node);
  }
  for (const ancestor of ancestors) {
    for (const property of ancestor.style) {
      if (property.startsWith("--")) {
        target.style.setProperty(property, ancestor.style.getPropertyValue(property));
      }
    }
  }
};
export const inheritThemeMiddleware = {
  name: "inheritTheme",
  fn({ elements }: MiddlewareState) {
    if (elements.reference instanceof Element) {
      inheritTheme(elements.reference, elements.floating);
    }

    return {};
  },
};
