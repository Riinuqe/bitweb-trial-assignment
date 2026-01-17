import { useState, useRef, useEffect } from "react";

interface UseCarouselProps {
  totalCards: number;
  isMobile?: boolean;
}

interface UseCarouselReturn {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
  currentIndex: number;
  cardWidth: number;
  actualCardWidth: number;
  maxIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handleGoToIndex: (index: number) => void;
  trackStyle: React.CSSProperties;
}

export const useCarousel = ({
  totalCards,
  isMobile = false,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [actualCardWidth, setActualCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const targetScrollPositionRef = useRef<number | null>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      requestAnimationFrame(() => {
        if (cardRef.current && carouselRef.current) {
          const card = cardRef.current;
          const container = carouselRef.current;

          const gap = 16;
          const actualWidth = card.offsetWidth;
          const width = actualWidth + gap;
          setCardWidth(width);
          setActualCardWidth(actualWidth);

          const containerWidth = container.offsetWidth;
          const cardsThatFit = Math.floor(containerWidth / width);
          setVisibleCards(cardsThatFit);
        }
      });
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    const resizeObserver = new ResizeObserver(() => {
      updateCardWidth();
    });

    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateCardWidth);
      resizeObserver.disconnect();
    };
  }, [isMobile, totalCards]);

  const maxIndex =
    visibleCards >= totalCards || visibleCards === 0
      ? 0
      : Math.max(0, totalCards - visibleCards);

  useEffect(() => {
    if (!isMobile || !carouselRef.current) return;

    const container = carouselRef.current;

    const handleScroll = () => {
      if (!cardWidth || cardWidth === 0) return;

      const scrollLeft = container.scrollLeft;

      if (isScrollingRef.current && targetScrollPositionRef.current !== null) {
        const targetPosition = targetScrollPositionRef.current;
        const distanceToTarget = Math.abs(scrollLeft - targetPosition);

        if (distanceToTarget <= 2) {
          const targetIndex = Math.round(targetPosition / cardWidth);
          const clampedIndex = Math.max(0, Math.min(maxIndex, targetIndex));
          setCurrentIndex(clampedIndex);
          isScrollingRef.current = false;
          targetScrollPositionRef.current = null;
        }
        return;
      }

      const newIndex = Math.round(scrollLeft / cardWidth);
      const clampedIndex = Math.max(0, Math.min(maxIndex, newIndex));
      const expectedScrollPosition = clampedIndex * cardWidth;
      const scrollDifference = Math.abs(scrollLeft - expectedScrollPosition);

      if (scrollDifference <= 5) {
        setCurrentIndex((prev) => {
          if (prev !== clampedIndex) {
            return clampedIndex;
          }
          return prev;
        });
      }

      isScrollingRef.current = false;
      targetScrollPositionRef.current = null;
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, cardWidth, maxIndex]);

  const handlePrevious = () => {
    if (isMobile && carouselRef.current) {
      const newIndex =
        currentIndex <= 0 ? (maxIndex > 0 ? maxIndex : 0) : currentIndex - 1;
      const scrollPosition = newIndex * cardWidth;

      isScrollingRef.current = true;
      targetScrollPositionRef.current = scrollPosition;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      if (isScrollingRef.current) {
        setCurrentIndex(newIndex);
        isScrollingRef.current = false;
        targetScrollPositionRef.current = null;
      }
    } else {
      setCurrentIndex((prev) => {
        if (prev <= 0) {
          return maxIndex > 0 ? maxIndex : 0;
        }
        return prev - 1;
      });
    }
  };

  const handleNext = () => {
    if (isMobile && carouselRef.current) {
      const newIndex =
        currentIndex >= maxIndex || maxIndex === 0 ? 0 : currentIndex + 1;
      const scrollPosition = newIndex * cardWidth;

      isScrollingRef.current = true;
      targetScrollPositionRef.current = scrollPosition;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        if (isScrollingRef.current) {
          setCurrentIndex(newIndex);
          isScrollingRef.current = false;
          targetScrollPositionRef.current = null;
        }
      }, 400);
    } else {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex || maxIndex === 0) {
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const handleGoToIndex = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(maxIndex, index));

    if (isMobile && carouselRef.current) {
      const scrollPosition = clampedIndex * cardWidth;

      isScrollingRef.current = true;
      targetScrollPositionRef.current = scrollPosition;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      if (isScrollingRef.current) {
        setCurrentIndex(clampedIndex);
        isScrollingRef.current = false;
        targetScrollPositionRef.current = null;
      }
    } else {
      setCurrentIndex(clampedIndex);
    }
  };

  const trackStyle: React.CSSProperties = isMobile
    ? {
        display: "flex",
        gap: "16px",
      }
    : {
        transform: `translateX(-${currentIndex * cardWidth}px)`,
        transition: cardWidth > 0 ? "transform 0.3s ease" : "none",
      };

  return {
    carouselRef,
    cardRef,
    currentIndex,
    cardWidth,
    actualCardWidth,
    maxIndex,
    handlePrevious,
    handleNext,
    handleGoToIndex,
    trackStyle,
  };
};
