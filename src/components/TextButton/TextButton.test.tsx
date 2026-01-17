import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextButton } from "./TextButton";

describe("TextButton", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with text and arrow icon", () => {
    render(<TextButton text="Show all" />);

    const button = screen.getByRole("button", { name: /show all/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Show all")).toBeInTheDocument();
  });

  it("calls onClick when button is clicked", async () => {
    const user = userEvent.setup();
    render(<TextButton text="Show all" onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: /show all/i });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("uses custom aria-label when provided", () => {
    render(<TextButton text="Show all" ariaLabel="View all products" />);

    const button = screen.getByRole("button", { name: /view all products/i });
    expect(button).toBeInTheDocument();
  });

  it("uses text as aria-label when ariaLabel is not provided", () => {
    render(<TextButton text="Show all" />);

    const button = screen.getByRole("button", { name: /show all/i });
    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <TextButton text="Show all" className="custom-class" />
    );

    const button = container.firstChild;
    expect(button).toHaveClass("text-button", "custom-class");
  });

  it("renders with empty className when not provided", () => {
    const { container } = render(<TextButton text="Show all" />);

    const button = container.firstChild;
    expect(button).toHaveClass("text-button");
  });

  it("renders arrow icon", () => {
    render(<TextButton text="Show all" />);

    const icon = document.querySelector(".text-button__icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
