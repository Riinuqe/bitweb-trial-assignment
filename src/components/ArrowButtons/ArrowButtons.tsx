import React from "react";
import "./ArrowButtons.scss";
import arrowLeftIcon from "@/assets/arrow_left.svg";
import arrowRightIcon from "@/assets/arrow_right.svg";

export interface ArrowButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

export const ArrowButtons: React.FC<ArrowButtonsProps> = ({
  onPrevious,
  onNext,
  className = "",
}) => {
  return (
    <div className={`arrow-buttons ${className}`}>
      <button
        className="arrow-button"
        onClick={onPrevious}
        aria-label="Previous cards"
      >
        <img src={arrowLeftIcon} alt="Previous cards" />
      </button>
      <button className="arrow-button" onClick={onNext} aria-label="Next cards">
        <img src={arrowRightIcon} alt="Next cards" />
      </button>
    </div>
  );
};
