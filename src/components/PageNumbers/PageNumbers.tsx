import React from "react";
import "./PageNumbers.scss";
import arrowLeftIcon from "@/assets/arrow_left.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";

export interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
}

export const PageNumbers: React.FC<PageNumbersProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = "",
}) => {
  return (
    <div className={`page-numbers ${className}`}>
      {onPrevious && (
        <button
          className="page-numbers__arrow"
          onClick={onPrevious}
          aria-label="Previous page"
        >
          <img src={arrowLeftIcon} alt="Previous page" />
        </button>
      )}
      <span className="page-numbers__text">
        {currentPage}/{totalPages}
      </span>
      {onNext && (
        <button
          className="page-numbers__arrow"
          onClick={onNext}
          aria-label="Next page"
        >
          <img src={arrowRightIcon} alt="Next page" />
        </button>
      )}
    </div>
  );
};
