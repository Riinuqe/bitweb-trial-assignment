import React from "react";
import "./Dots.scss";
import arrowLeftIcon from "@/assets/arrow_left.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";

export interface DotsProps {
  total: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export const Dots: React.FC<DotsProps> = ({
  total,
  activeIndex,
  onDotClick,
  onPrevious,
  onNext,
  className = "",
}) => {
  const hasArrows = onPrevious !== undefined && onNext !== undefined;

  return (
    <div className={`dots ${className}`}>
      {hasArrows && (
        <button
          className="dots__arrow"
          onClick={onPrevious}
          aria-label="Previous cards"
        >
          <img src={arrowLeftIcon} alt="Previous cards" />
        </button>
      )}
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={`dot-${index}`}
          className={`dots__dot ${
            index === activeIndex ? "dots__dot--active" : ""
          }`}
          onClick={() => onDotClick?.(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? "true" : "false"}
        />
      ))}
      {hasArrows && (
        <button
          className="dots__arrow"
          onClick={onNext}
          aria-label="Next cards"
        >
          <img src={arrowRightIcon} alt="Next cards" />
        </button>
      )}
    </div>
  );
};
