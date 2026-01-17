import type { Preview } from "@storybook/react-vite";
import React from "react";
import "@/styles/main.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      defaultViewport: "mobile1",
    },
    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story) => {
      return React.createElement(
        "div",
        {
          style: {
            width: "100%",
          },
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
