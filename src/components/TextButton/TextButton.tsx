import React from "react";
import "./TextButton.scss";
import arrowRightIcon from "@/assets/arrow_right.svg";

export interface TextButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export const TextButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      className={`text-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || text}
    >
      <span className="text-button__text">{text}</span>
      <img
        src={arrowRightIcon}
        alt=""
        className="text-button__icon"
        aria-hidden="true"
      />
    </button>
  );
};
