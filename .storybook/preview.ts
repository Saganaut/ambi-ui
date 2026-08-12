import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";
import "../src/styles/tokens.css";
import "./preview.css";

const preview = {
  globalTypes: {
    appearance: {
      description: "UI appearance",
      defaultValue: "light",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) =>
      createElement(
        "div",
        {
          "data-appearance": context.globals.appearance,
          style: {
            minHeight: "100vh",
            padding: "1rem",
            background: "var(--bg-canvas)",
            color: "var(--text-primary)",
          },
        },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
} satisfies Preview;

export default preview;
