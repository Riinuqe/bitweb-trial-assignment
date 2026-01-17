import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  Carousel,
  type CarouselNavigationVariant,
  type Product,
} from "@/components";

const mockProducts: Product[] = [
  {
    id: 1,
    content: {
      title: "Featured Product",
      subtitle: "New Arrival",
      text: "First product with a description",
    },
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    content: {
      title: "Second Product",
      text: "Second product with longer description text, Random text to fill the space.",
    },
    imageUrl: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 3,
    content: {
      text: "Third product",
    },
    imageUrl: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 4,
    content: {
      title: "Fourth Product",
      subtitle: "Featured Item",
      text: "Fourth product description",
    },
    imageUrl: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    content: {
      text: "Sixth product with a very long description that might wrap across multiple lines",
    },
    imageUrl: "https://picsum.photos/300/200?random=6",
  },
];

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "padding",
  },
  decorators: [
    (Story) =>
      React.createElement(
        "div",
        { style: { maxWidth: "1000px", margin: "0 auto" } },
        React.createElement(Story)
      ),
  ],
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Title displayed in the carousel header",
    },
    description: {
      control: "text",
      description: "Optional description text displayed under the title",
    },
    products: {
      control: "object",
      description: "Array of products to display in the carousel",
    },
    navigationVariant: {
      control: "select",
      options: [
        "arrows-header",
        "dots-arrows-bottom-left",
        "dots-center-arrows-header",
        "dots-arrows-bottom-center",
        "page-numbers-arrows-bottom-left",
        "page-numbers-arrows-bottom-center",
      ] as CarouselNavigationVariant[],
      description: "Navigation variant for the carousel",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowsOnly: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "arrows-header",
  },
};

export const DotsLeftWithArrows: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "dots-arrows-bottom-left",
  },
};

export const DotsCenter: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "dots-center-arrows-header",
  },
};

export const DotsWithArrowsCentered: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "dots-arrows-bottom-center",
  },
};

export const PageNumbersLeftWithArrows: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "page-numbers-arrows-bottom-left",
  },
};

export const PageNumbersCenteredWithArrows: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "page-numbers-arrows-bottom-center",
  },
};

export const HeaderWithDescription: Story = {
  args: {
    title: "Featured Products",
    description: "Discover our handpicked selection of premium products",
    products: mockProducts,
    navigationVariant: "dots-arrows-bottom-left",
  },
};

export const WithShowAllButton: Story = {
  args: {
    title: "Featured Products",
    products: mockProducts,
    navigationVariant: "dots-arrows-bottom-left",
    onShowAllClick: () => console.log("Show all clicked"),
    showAllText: "Show all",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Carousel with 'Show all' button in the header. The button appears when onShowAllClick is provided.",
      },
    },
  },
};

const singleProduct: Product[] = [
  {
    id: 1,
    content: {
      title: "Featured Product",
      subtitle: "Special Offer",
      text: "This is a single product in the carousel",
    },
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
];

export const SingleProductArrowsOnly: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "arrows-header",
  },
};

export const SingleProductDotsLeftWithArrows: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "dots-arrows-bottom-left",
  },
};

export const SingleProductDotsCenter: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "dots-center-arrows-header",
  },
};

export const SingleProductDotsWithArrowsCentered: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "dots-arrows-bottom-center",
  },
};

export const SingleProductPageNumbersLeftWithArrows: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "page-numbers-arrows-bottom-left",
  },
};

export const SingleProductPageNumbersCenteredWithArrows: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "page-numbers-arrows-bottom-center",
  },
};

export const SingleProductWithShowAllButton: Story = {
  args: {
    title: "Special Offer",
    products: singleProduct,
    navigationVariant: "dots-arrows-bottom-left",
    onShowAllClick: () => console.log("Show all clicked"),
    showAllText: "Show all",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single product carousel with 'Show all' button in the header (above product cards) and dots with arrow buttons below the product cards.",
      },
    },
  },
};
