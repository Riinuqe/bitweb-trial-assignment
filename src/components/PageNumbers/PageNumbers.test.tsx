import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageNumbers } from "./PageNumbers";

describe("PageNumbers", () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the page numbers text correctly", () => {
    render(<PageNumbers currentPage={2} totalPages={5} />);

    const pageText = screen.getByText("2/5");
    expect(pageText).toBeInTheDocument();
  });

  it("renders previous arrow when onPrevious is provided", () => {
    render(
      <PageNumbers currentPage={2} totalPages={5} onPrevious={mockOnPrevious} />
    );

    const previousButton = screen.getByRole("button", {
      name: /previous page/i,
    });
    expect(previousButton).toBeInTheDocument();
  });

  it("renders next arrow when onNext is provided", () => {
    render(<PageNumbers currentPage={2} totalPages={5} onNext={mockOnNext} />);

    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeInTheDocument();
  });

  it("renders both arrows when both handlers are provided", () => {
    render(
      <PageNumbers
        currentPage={2}
        totalPages={5}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: /previous page/i,
    });
    const nextButton = screen.getByRole("button", { name: /next page/i });

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("does not render previous arrow when onPrevious is not provided", () => {
    render(<PageNumbers currentPage={2} totalPages={5} onNext={mockOnNext} />);

    const previousButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    expect(previousButton).not.toBeInTheDocument();
  });

  it("does not render next arrow when onNext is not provided", () => {
    render(
      <PageNumbers currentPage={2} totalPages={5} onPrevious={mockOnPrevious} />
    );

    const nextButton = screen.queryByRole("button", { name: /next page/i });
    expect(nextButton).not.toBeInTheDocument();
  });

  it("does not render any arrows when handlers are not provided", () => {
    render(<PageNumbers currentPage={2} totalPages={5} />);

    const previousButton = screen.queryByRole("button", {
      name: /previous page/i,
    });
    const nextButton = screen.queryByRole("button", { name: /next page/i });

    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("calls onPrevious when previous button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PageNumbers
        currentPage={2}
        totalPages={5}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: /previous page/i,
    });
    await user.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it("calls onNext when next button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PageNumbers
        currentPage={2}
        totalPages={5}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next page/i });
    await user.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it("displays correct page numbers for different values", () => {
    const { rerender } = render(
      <PageNumbers currentPage={1} totalPages={10} />
    );

    expect(screen.getByText("1/10")).toBeInTheDocument();

    rerender(<PageNumbers currentPage={5} totalPages={10} />);
    expect(screen.getByText("5/10")).toBeInTheDocument();

    rerender(<PageNumbers currentPage={10} totalPages={10} />);
    expect(screen.getByText("10/10")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageNumbers currentPage={2} totalPages={5} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("page-numbers", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const { container } = render(
      <PageNumbers currentPage={2} totalPages={5} />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("page-numbers");
  });
});
