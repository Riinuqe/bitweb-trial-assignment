import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { ArrowButtons } from "@/components";

const meta = {
  title: "Components/ArrowButtons",
  component: ArrowButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onPrevious: {
      action: "previous clicked",
      description: "Callback function when previous button is clicked",
    },
    onNext: {
      action: "next clicked",
      description: "Callback function when next button is clicked",
    },
    canGoPrevious: {
      control: "boolean",
      description: "Whether the previous button should be enabled",
    },
    canGoNext: {
      control: "boolean",
      description: "Whether the next button should be enabled",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
  args: {
    onPrevious: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof ArrowButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    canGoPrevious: true,
    canGoNext: true,
  },
};
