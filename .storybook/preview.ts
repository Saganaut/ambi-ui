import type { Preview } from "@storybook/react-vite";
import "../src/styles/tokens.css";
import "./preview.css";

const preview = {
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
