import { render, screen } from "@testing-library/react";
import App from "./App";
import type { CarouselProps } from "@/components/Carousel/Carousel";

jest.mock("@/components", () => ({
  Carousel: ({
    title,
    description,
    products,
    onShowAllClick,
  }: CarouselProps) => (
    <div data-testid="carousel">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div data-testid="products-count">{products.length} products</div>
      {onShowAllClick && <button onClick={onShowAllClick}>Show all</button>}
    </div>
  ),
}));

describe("App", () => {
  it("renders the Carousel component", () => {
    render(<App />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("renders the carousel with title", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
  });

  it("renders products in the carousel", () => {
    render(<App />);
    expect(screen.getByText(/6 products/i)).toBeInTheDocument();
  });

  it("renders the carousel with description", () => {
    render(<App />);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders show all button when onShowAllClick is provided", () => {
    render(<App />);
    expect(screen.getByText("Show all")).toBeInTheDocument();
  });
});
