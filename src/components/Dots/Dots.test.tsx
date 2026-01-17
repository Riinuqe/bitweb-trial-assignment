import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dots } from "./Dots";

describe("Dots", () => {
  const mockOnDotClick = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of dots", () => {
    render(<Dots total={3} activeIndex={0} />);

    const dots = screen.getAllByRole("button");
    expect(dots).toHaveLength(3);
  });

  it("renders arrows when onPrevious and onNext are provided", () => {
    render(
      <Dots
        total={3}
        activeIndex={0}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5); // 2 arrows + 3 dots

    const previousButton = screen.getByRole("button", {
      name: /previous cards/i,
    });
    const nextButton = screen.getByRole("button", { name: /next cards/i });

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("does not render arrows when onPrevious and onNext are not provided", () => {
    render(<Dots total={3} activeIndex={0} />);

    const previousButton = screen.queryByRole("button", {
      name: /previous cards/i,
    });
    const nextButton = screen.queryByRole("button", { name: /next cards/i });

    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("does not render arrows when only onPrevious is provided", () => {
    render(<Dots total={3} activeIndex={0} onPrevious={mockOnPrevious} />);

    const previousButton = screen.queryByRole("button", {
      name: /previous cards/i,
    });
    const nextButton = screen.queryByRole("button", { name: /next cards/i });

    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("does not render arrows when only onNext is provided", () => {
    render(<Dots total={3} activeIndex={0} onNext={mockOnNext} />);

    const previousButton = screen.queryByRole("button", {
      name: /previous cards/i,
    });
    const nextButton = screen.queryByRole("button", { name: /next cards/i });

    expect(previousButton).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
  });

  it("marks the active dot correctly", () => {
    render(<Dots total={3} activeIndex={1} />);

    const dots = screen.getAllByRole("button");
    expect(dots[0]).not.toHaveAttribute("aria-current", "true");
    expect(dots[1]).toHaveAttribute("aria-current", "true");
    expect(dots[2]).not.toHaveAttribute("aria-current", "true");
  });

  it("marks the active dot correctly when arrows are present", () => {
    render(
      <Dots
        total={3}
        activeIndex={1}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: /previous cards/i,
    });
    const dots = screen.getAllByLabelText(/go to slide/i);
    const nextButton = screen.getByRole("button", { name: /next cards/i });

    expect(previousButton).not.toHaveAttribute("aria-current", "true");
    expect(dots[0]).not.toHaveAttribute("aria-current", "true");
    expect(dots[1]).toHaveAttribute("aria-current", "true");
    expect(dots[2]).not.toHaveAttribute("aria-current", "true");
    expect(nextButton).not.toHaveAttribute("aria-current", "true");
  });

  it("calls onDotClick when a dot is clicked", async () => {
    const user = userEvent.setup();
    render(<Dots total={3} activeIndex={0} onDotClick={mockOnDotClick} />);

    const dots = screen.getAllByRole("button");
    await user.click(dots[1]);

    expect(mockOnDotClick).toHaveBeenCalledTimes(1);
    expect(mockOnDotClick).toHaveBeenCalledWith(1);
  });

  it("does not call onDotClick when it is not provided", async () => {
    const user = userEvent.setup();
    render(<Dots total={3} activeIndex={0} />);

    const dots = screen.getAllByRole("button");
    await user.click(dots[1]);

    expect(mockOnDotClick).not.toHaveBeenCalled();
  });

  it("calls onPrevious when previous arrow is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dots
        total={3}
        activeIndex={0}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const previousButton = screen.getByRole("button", {
      name: /previous cards/i,
    });
    await user.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it("calls onNext when next arrow is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dots
        total={3}
        activeIndex={0}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next cards/i });
    await user.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Dots total={3} activeIndex={0} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("dots", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const { container } = render(<Dots total={3} activeIndex={0} />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("dots");
  });

  it("renders correct aria-labels for dots", () => {
    render(<Dots total={3} activeIndex={0} />);

    const dots = screen.getAllByRole("button");
    expect(dots[0]).toHaveAttribute("aria-label", "Go to slide 1");
    expect(dots[1]).toHaveAttribute("aria-label", "Go to slide 2");
    expect(dots[2]).toHaveAttribute("aria-label", "Go to slide 3");
  });

  it("renders correct aria-labels for dots when arrows are present", () => {
    render(
      <Dots
        total={3}
        activeIndex={0}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );

    const dots = screen.getAllByLabelText(/go to slide/i);
    expect(dots[0]).toHaveAttribute("aria-label", "Go to slide 1");
    expect(dots[1]).toHaveAttribute("aria-label", "Go to slide 2");
    expect(dots[2]).toHaveAttribute("aria-label", "Go to slide 3");
  });
});
