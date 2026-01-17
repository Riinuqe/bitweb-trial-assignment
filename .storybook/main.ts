import type { StorybookConfig } from "@storybook/react-vite";
import type { UserConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(configDir, "../src");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-viewport",
    "@storybook/addon-controls",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config: UserConfig) {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@": srcPath,
      };
    } else {
      config.resolve = {
        alias: {
          "@": srcPath,
        },
      };
    }

    return config;
  },
};
export default config;
