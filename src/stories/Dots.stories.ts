import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import React from "react";
import { Dots } from "@/components";

const meta = {
  title: "Components/Dots",
  component: Dots,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    total: {
      control: { type: "number", min: 1, max: 10 },
      description: "Total number of dots to display",
    },
    activeIndex: {
      control: { type: "number", min: 0 },
      description: "Index of the currently active dot (0-based)",
    },
    onDotClick: {
      action: "dot clicked",
      description: "Callback function when a dot is clicked",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
  args: {
    onDotClick: fn(),
  },
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 3,
    activeIndex: 0,
  },
};

export const AllStates: Story = {
  args: {
    total: 4,
    activeIndex: 0,
  },
  render: () =>
    React.createElement(
      "div",
      { className: "dots" },
      React.createElement("button", {
        className: "dots__dot dots__dot--active",
        "aria-label": "Go to slide 1",
        "aria-current": "true",
      }),
      React.createElement("button", {
        className: "dots__dot dots__dot--hover",
        "aria-label": "Go to slide 2",
      }),
      React.createElement("button", {
        className: "dots__dot dots__dot--active-state",
        "aria-label": "Go to slide 3",
      }),
      React.createElement("button", {
        className: "dots__dot dots__dot--focused",
        "aria-label": "Go to slide 4",
      })
    ),
};
