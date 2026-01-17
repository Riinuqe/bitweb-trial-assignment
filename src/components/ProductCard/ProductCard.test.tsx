import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

describe("ProductCard", () => {
  const mockImageUrl = "https://example.com/image.jpg";

  it("renders product card with image", () => {
    const content = {
      title: "Test Product",
      subtitle: "Test Subtitle",
      text: "Test description",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    const image = screen.getByAltText("Product image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockImageUrl);
  });

  it("renders title when provided", () => {
    const content = {
      title: "Test Product",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Product").tagName).toBe("H3");
  });

  it("renders subtitle when provided", () => {
    const content = {
      subtitle: "Test Subtitle",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  it("renders text/description when provided", () => {
    const content = {
      text: "Test description text",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.getByText("Test description text")).toBeInTheDocument();
  });

  it("renders all content fields when provided", () => {
    const content = {
      title: "Test Product",
      subtitle: "Test Subtitle",
      text: "Test description",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("does not render title when not provided", () => {
    const content = {
      subtitle: "Test Subtitle",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const content = {
      title: "Test Product",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("does not render text when not provided", () => {
    const content = {
      title: "Test Product",
    };

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    const textElements = screen.queryAllByText(/description/i);
    expect(textElements.length).toBe(0);
  });

  it("uses empty state icon when imageUrl is empty", () => {
    const content = {
      title: "Test Product",
    };

    render(<ProductCard content={content} imageUrl="" />);

    const image = screen.getByAltText("Product image");
    expect(image).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const content = {
      title: "Test Product",
    };

    const { container } = render(
      <ProductCard
        content={content}
        imageUrl={mockImageUrl}
        className="custom-class"
      />
    );

    const card = container.firstChild;
    expect(card).toHaveClass("product-card", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const content = {
      title: "Test Product",
    };

    const { container } = render(
      <ProductCard content={content} imageUrl={mockImageUrl} />
    );

    const card = container.firstChild;
    expect(card).toHaveClass("product-card");
  });

  it("handles empty content object", () => {
    const content = {};

    render(<ProductCard content={content} imageUrl={mockImageUrl} />);

    const image = screen.getByAltText("Product image");
    expect(image).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
  });
});
