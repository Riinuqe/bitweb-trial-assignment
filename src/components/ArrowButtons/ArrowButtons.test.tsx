import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArrowButtons } from "./ArrowButtons";

describe("ArrowButtons", () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both arrow buttons", () => {
    render(<ArrowButtons onPrevious={mockOnPrevious} onNext={mockOnNext} />);

    const previousButton = screen.getByRole("button", {
      name: /previous cards/i,
    });
    const nextButton = screen.getByRole("button", { name: /next cards/i });

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("calls onPrevious when previous button is clicked", async () => {
    const user = userEvent.setup();
    render(<ArrowButtons onPrevious={mockOnPrevious} onNext={mockOnNext} />);

    const previousButton = screen.getByRole("button", {
      name: /previous cards/i,
    });
    await user.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it("calls onNext when next button is clicked", async () => {
    const user = userEvent.setup();
    render(<ArrowButtons onPrevious={mockOnPrevious} onNext={mockOnNext} />);

    const nextButton = screen.getByRole("button", { name: /next cards/i });
    await user.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ArrowButtons
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        className="custom-class"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("arrow-buttons", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const { container } = render(
      <ArrowButtons onPrevious={mockOnPrevious} onNext={mockOnNext} />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("arrow-buttons");
  });
});
