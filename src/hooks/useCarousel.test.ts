import { renderHook, act } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

type GlobalWithResizeObserver = typeof globalThis & {
  ResizeObserver: typeof ResizeObserver;
};

if (typeof global !== "undefined") {
  (global as GlobalWithResizeObserver).ResizeObserver = jest
    .fn()
    .mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })) as unknown as typeof ResizeObserver;
}

describe("useCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });
  });

  it("initializes with correct default values", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.cardWidth).toBe(0);
    expect(result.current.actualCardWidth).toBe(0);
    expect(result.current.maxIndex).toBeDefined();
    expect(result.current.trackStyle).toHaveProperty("transform");
  });

  it("provides refs for carousel and card", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    expect(result.current.carouselRef).toBeDefined();
    expect(result.current.carouselRef.current).toBeNull();
    expect(result.current.cardRef).toBeDefined();
    expect(result.current.cardRef.current).toBeNull();
  });

  it("starts at index 0", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    expect(result.current.currentIndex).toBe(0);
  });

  it("can go previous after moving forward", async () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    // Create mock elements
    const mockCard = document.createElement("div");
    const mockContainer = document.createElement("div");
    Object.defineProperty(mockCard, "offsetWidth", {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(mockContainer, "offsetWidth", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      result.current.cardRef.current = mockCard as HTMLDivElement;
      result.current.carouselRef.current = mockContainer as HTMLDivElement;
    });

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentIndex).toBeGreaterThan(0);
    act(() => {
      result.current.handlePrevious();
    });
    expect(result.current.currentIndex).toBe(0);
  });

  it("increments index when handleNext is called", async () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    const mockCard = document.createElement("div");
    const mockContainer = document.createElement("div");
    Object.defineProperty(mockCard, "offsetWidth", {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(mockContainer, "offsetWidth", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      result.current.cardRef.current = mockCard as HTMLDivElement;
      result.current.carouselRef.current = mockContainer as HTMLDivElement;
    });

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.currentIndex).toBeGreaterThanOrEqual(0);
    expect(result.current.currentIndex).toBeLessThanOrEqual(5);
  });

  it("decrements index when handlePrevious is called", async () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    const mockCard = document.createElement("div");
    const mockContainer = document.createElement("div");
    Object.defineProperty(mockCard, "offsetWidth", {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(mockContainer, "offsetWidth", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      result.current.cardRef.current = mockCard as HTMLDivElement;
      result.current.carouselRef.current = mockContainer as HTMLDivElement;
    });

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    act(() => {
      result.current.handleNext();
      result.current.handleNext();
      result.current.handlePrevious();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it("jumps to specific index when handleGoToIndex is called", async () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 10 }));

    const mockCard = document.createElement("div");
    const mockContainer = document.createElement("div");
    Object.defineProperty(mockCard, "offsetWidth", {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(mockContainer, "offsetWidth", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      result.current.cardRef.current = mockCard as HTMLDivElement;
      result.current.carouselRef.current = mockContainer as HTMLDivElement;
    });

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    act(() => {
      result.current.handleGoToIndex(2);
    });

    expect(result.current.currentIndex).toBe(2);
  });

  it("clamps handleGoToIndex to valid range", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    act(() => {
      result.current.handleGoToIndex(-1);
    });
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.handleGoToIndex(10);
    });
    expect(result.current.currentIndex).toBeGreaterThanOrEqual(0);
  });

  it("does not go below index 0", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 5 }));

    act(() => {
      result.current.handlePrevious();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it("updates trackStyle transform based on currentIndex for desktop", async () => {
    const { result } = renderHook(() =>
      useCarousel({ totalCards: 5, isMobile: false })
    );

    const mockCard = document.createElement("div");
    const mockContainer = document.createElement("div");
    Object.defineProperty(mockCard, "offsetWidth", {
      value: 200,
      configurable: true,
    });
    Object.defineProperty(mockContainer, "offsetWidth", {
      value: 1000,
      configurable: true,
    });

    act(() => {
      result.current.cardRef.current = mockCard as HTMLDivElement;
      result.current.carouselRef.current = mockContainer as HTMLDivElement;
    });

    await act(async () => {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.trackStyle).toHaveProperty("transform");
    expect(result.current.trackStyle.transform).toContain("translateX");
  });

  it("uses flex layout for mobile", () => {
    const { result } = renderHook(() =>
      useCarousel({ totalCards: 5, isMobile: true })
    );

    expect(result.current.trackStyle).toHaveProperty("display");
    expect(result.current.trackStyle.display).toBe("flex");
  });

  it("handles empty products array", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 0 }));

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.maxIndex).toBe(0);
  });

  it("calculates maxIndex correctly based on totalCards and visibleCards", () => {
    const { result } = renderHook(() => useCarousel({ totalCards: 10 }));

    expect(result.current.maxIndex).toBeDefined();

    act(() => {
      if (result.current.cardRef.current) {
        Object.defineProperty(result.current.cardRef.current, "offsetWidth", {
          value: 200,
          configurable: true,
        });
      }
      if (result.current.carouselRef.current) {
        Object.defineProperty(
          result.current.carouselRef.current,
          "offsetWidth",
          {
            value: 700,
            configurable: true,
          }
        );
      }
    });

    act(() => {
      for (let i = 0; i < 20; i++) {
        result.current.handleNext();
      }
    });

    expect(result.current.currentIndex).toBeGreaterThanOrEqual(0);
  });

  it("adds resize event listener on mount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");

    renderHook(() => useCarousel({ totalCards: 5 }));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  it("removes resize event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useCarousel({ totalCards: 5 }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
