export default {
  extends: ["stylelint-config-standard"],
  plugins: [
    "stylelint-value-no-unknown-custom-properties",
    "stylelint-declaration-strict-value",
    "stylelint-order",
  ],
  rules: {
    "order/properties-order": [
      "composes",
      "position",
      "inset",
      "display",
      "width",
      "height",
      "margin",
      "padding",
      "background",
      "color",
      "font-size",
    ],
    "csstools/value-no-unknown-custom-properties": [
      true,
      {
        importFrom: [
          "./src/styles/tokens.css",
          "./src/styles/variants.module.css",
          "./src/styles/utilities.module.css",
        ],
      },
    ],
    "scale-unlimited/declaration-strict-value": [
      [
        "/color$/",
        "fill",
        "stroke",
        "/^padding/",
        "/^margin/",
        "/^border-radius/",
        "/-radius$/",
        "gap",
        "row-gap",
        "column-gap",
        "font-size",
      ],
      {
        ignoreValues: [
          "/^var\\(--/",
          "/^clamp\\(/",
          "/^min\\(/",
          "/^max\\(/",
          "/^oklch\\(/",
          "/^rgb\\(/",
          "/^rgba\\(/",
          "0",
          "1px",
          "-1px",
          "auto",
          "none",
          "inherit",
          "initial",
          "unset",
          "transparent",
          "currentcolor",
          "currentColor",
        ],
        ignoreFunctions: false,
        disableFix: true,
        severity: "error",
      },
    ],
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["composes"],
      },
    ],
    "declaration-property-value-disallowed-list": [
      {
        "/^(padding|margin|gap|row-gap|column-gap)/": [/var\(--space-/],
      },
      {
        message:
          "Use semantic spacing tokens (--gap-*, --p-*, --stack-*, --gutter-*) instead of raw --space-* (spacing-hierarchy rule)",
      },
    ],
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      {
        message: "Expected class selector to be lowerCamelCase",
      },
    ],
    "selector-id-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      {
        message: "Expected id selector to be lowerCamelCase",
      },
    ],
  },
};
