import React from "react";
import emptyStateIcon from "@/assets/empty_state.svg";
import "./ProductCard.scss";

export interface ProductContent {
  title?: string;
  subtitle?: string;
  text?: string;
}

export interface ProductCardProps {
  content: ProductContent;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  content,
  imageUrl,
  className = "",
}) => {
  const { title, subtitle, text } = content;

  return (
    <div className={`product-card ${className}`}>
      <div className="product-card__image">
        <img src={imageUrl || emptyStateIcon} alt={"Product image"} />
      </div>
      <div className="product-card__content">
        {title && <h3 className="product-card__title">{title}</h3>}
        {subtitle && <p className="product-card__subtitle">{subtitle}</p>}
        {text && <p className="product-card__description">{text}</p>}
      </div>
    </div>
  );
};
