import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "@/components";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "object",
      description: "Product content with title, subtitle, and text",
    },
    imageUrl: {
      control: "text",
      description: "URL or path to the product image",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: {
      text: "With short product description",
    },
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
};

export const WithLongText: Story = {
  args: {
    content: {
      text: "With longer product description that wraps across multiple lines to see how the card handles it. Random text to fill the space.",
    },
    imageUrl: "https://picsum.photos/300/200?random=2",
  },
};

export const WithEmptyImage: Story = {
  args: {
    content: {
      text: "Product with empty image URL (will show empty state icon)",
    },
    imageUrl: "",
  },
};

export const WithTitleAndText: Story = {
  args: {
    content: {
      title: "Product Title",
      text: "Product description text goes here",
    },
    imageUrl: "https://picsum.photos/300/200?random=3",
  },
};

export const WithTitleSubtitleAndText: Story = {
  args: {
    content: {
      title: "Product Title",
      subtitle: "Product Subtitle",
      text: "Product description text goes here",
    },
    imageUrl: "https://picsum.photos/300/200?random=4",
  },
};

export const WithTitleOnly: Story = {
  args: {
    content: {
      title: "Product with only title",
    },
    imageUrl: "https://picsum.photos/300/200?random=5",
  },
};
