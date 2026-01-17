import { render, screen } from "@testing-library/react";
import { Carousel, type Product } from "./Carousel";
import type { ProductCardProps } from "@/components/ProductCard/ProductCard";
import type { ArrowButtonsProps } from "@/components/ArrowButtons/ArrowButtons";
import type { TextButtonProps } from "@/components/TextButton/TextButton";

jest.mock("@/hooks/useCarousel", () => ({
  useCarousel: jest.fn(() => ({
    carouselRef: { current: null },
    cardRef: { current: null },
    currentIndex: 0,
    maxIndex: 0,
    cardWidth: 0,
    actualCardWidth: 0,
    handlePrevious: jest.fn(),
    handleNext: jest.fn(),
    handleGoToIndex: jest.fn(),
    trackStyle: { transform: "translateX(0px)" },
  })),
}));

jest.mock("@/hooks/useMediaQuery", () => ({
  useMediaQuery: jest.fn(() => false),
}));

jest.mock("@/components", () => ({
  ProductCard: ({ content, imageUrl }: ProductCardProps) => (
    <div data-testid="product-card">
      <div>{content.title}</div>
      <img src={imageUrl} alt="Product" />
    </div>
  ),
  ArrowButtons: ({ onPrevious, onNext }: ArrowButtonsProps) => (
    <div data-testid="arrow-buttons">
      <button onClick={onPrevious} aria-label="Previous cards">
        Previous
      </button>
      <button onClick={onNext} aria-label="Next cards">
        Next
      </button>
    </div>
  ),
  Dots: () => <div data-testid="dots" />,
  PageNumbers: () => <div data-testid="page-numbers" />,
  TextButton: ({ text, onClick }: TextButtonProps) => (
    <button onClick={onClick} data-testid="text-button">
      {text}
    </button>
  ),
}));

describe("Carousel", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      content: {
        title: "Product 1",
        subtitle: "Subtitle 1",
        text: "Description 1",
      },
      imageUrl: "https://example.com/image1.jpg",
    },
    {
      id: "2",
      content: {
        title: "Product 2",
        subtitle: "Subtitle 2",
        text: "Description 2",
      },
      imageUrl: "https://example.com/image2.jpg",
    },
    {
      id: "3",
      content: {
        title: "Product 3",
      },
      imageUrl: "https://example.com/image3.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the carousel title", () => {
    render(<Carousel title="Featured Products" products={mockProducts} />);

    expect(
      screen.getByRole("heading", { name: /featured products/i })
    ).toBeInTheDocument();
  });

  it("renders all products", () => {
    render(<Carousel title="Test" products={mockProducts} />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(3);
  });

  it("renders ArrowButtons component", () => {
    render(<Carousel title="Test" products={mockProducts} />);

    expect(screen.getByTestId("arrow-buttons")).toBeInTheDocument();
  });

  it("passes correct props to ProductCard components", () => {
    render(<Carousel title="Test" products={mockProducts} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Product 3")).toBeInTheDocument();
  });

  it("uses product id as key for each card", () => {
    const { container } = render(
      <Carousel title="Test" products={mockProducts} />
    );

    const cards = container.querySelectorAll(".carousel__card");
    expect(cards).toHaveLength(3);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Carousel title="Test" products={mockProducts} className="custom-class" />
    );

    const carousel = container.firstChild;
    expect(carousel).toHaveClass("carousel", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const { container } = render(
      <Carousel title="Test" products={mockProducts} />
    );

    const carousel = container.firstChild;
    expect(carousel).toHaveClass("carousel");
  });

  it("handles empty products array", () => {
    render(<Carousel title="Test" products={[]} />);

    expect(screen.getByRole("heading", { name: /test/i })).toBeInTheDocument();
    expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
  });

  it("handles products with numeric ids", () => {
    const productsWithNumericIds: Product[] = [
      {
        id: 1,
        content: { title: "Product 1" },
        imageUrl: "https://example.com/image1.jpg",
      },
      {
        id: 2,
        content: { title: "Product 2" },
        imageUrl: "https://example.com/image2.jpg",
      },
    ];

    render(<Carousel title="Test" products={productsWithNumericIds} />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(2);
  });

  it("renders carousel structure correctly", () => {
    const { container } = render(
      <Carousel title="Test" products={mockProducts} />
    );

    expect(container.querySelector(".carousel")).toBeInTheDocument();
    expect(container.querySelector(".carousel__header")).toBeInTheDocument();
    expect(container.querySelector(".carousel__container")).toBeInTheDocument();
    expect(container.querySelector(".carousel__track")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Carousel
        title="Test"
        description="Test description"
        products={mockProducts}
      />
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    render(<Carousel title="Test" products={mockProducts} />);

    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it("renders TextButton when onShowAllClick is provided", () => {
    const mockOnShowAllClick = jest.fn();
    render(
      <Carousel
        title="Test"
        products={mockProducts}
        onShowAllClick={mockOnShowAllClick}
      />
    );

    expect(screen.getByTestId("text-button")).toBeInTheDocument();
    expect(screen.getByText("Show all")).toBeInTheDocument();
  });

  it("uses custom showAllText when provided", () => {
    const mockOnShowAllClick = jest.fn();
    render(
      <Carousel
        title="Test"
        products={mockProducts}
        onShowAllClick={mockOnShowAllClick}
        showAllText="View all products"
      />
    );

    expect(screen.getByText("View all products")).toBeInTheDocument();
  });
});
