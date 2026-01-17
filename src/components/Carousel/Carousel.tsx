import React from "react";
import "./Carousel.scss";
import {
  ProductCard,
  type ProductContent,
  ArrowButtons,
  Dots,
  PageNumbers,
  TextButton,
} from "@/components";
import { useCarousel } from "@/hooks/useCarousel";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface Product {
  id: string | number;
  content: ProductContent;
  imageUrl: string;
}

export type CarouselNavigationVariant =
  | "arrows-header"
  | "dots-arrows-bottom-left"
  | "dots-center-arrows-header"
  | "dots-arrows-bottom-center"
  | "page-numbers-arrows-bottom-left"
  | "page-numbers-arrows-bottom-center";

export interface CarouselProps {
  title: string;
  description?: string;
  products: Product[];
  navigationVariant?: CarouselNavigationVariant;
  className?: string;
  onShowAllClick?: () => void;
  showAllText?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  title,
  description,
  products,
  navigationVariant = "arrows-header",
  className = "",
  onShowAllClick,
  showAllText = "Show all",
}) => {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const effectiveVariant: CarouselNavigationVariant = isMobile
    ? navigationVariant.includes("page-numbers")
      ? "page-numbers-arrows-bottom-center"
      : "dots-arrows-bottom-center"
    : onShowAllClick &&
      (navigationVariant === "arrows-header" ||
        navigationVariant === "dots-center-arrows-header")
    ? "dots-arrows-bottom-left"
    : navigationVariant;

  const {
    carouselRef,
    cardRef,
    currentIndex,
    maxIndex,
    actualCardWidth,
    handlePrevious,
    handleNext,
    handleGoToIndex,
    trackStyle,
  } = useCarousel({ totalCards: products.length, isMobile });

  const hasSingleItem = products.length === 1;
  const containerStyle =
    hasSingleItem && actualCardWidth > 0
      ? { width: `${actualCardWidth}px` }
      : {};

  const showDots =
    effectiveVariant !== "arrows-header" &&
    effectiveVariant !== "page-numbers-arrows-bottom-left" &&
    effectiveVariant !== "page-numbers-arrows-bottom-center";

  const showPageNumbers =
    effectiveVariant === "page-numbers-arrows-bottom-left" ||
    effectiveVariant === "page-numbers-arrows-bottom-center";

  const showStandaloneArrows =
    effectiveVariant !== "dots-arrows-bottom-center" &&
    effectiveVariant !== "page-numbers-arrows-bottom-center";

  const arrowsAbove =
    !isMobile &&
    showStandaloneArrows &&
    (effectiveVariant === "arrows-header" ||
      effectiveVariant === "dots-center-arrows-header");

  const dotsCentered =
    effectiveVariant === "dots-center-arrows-header" ||
    effectiveVariant === "dots-arrows-bottom-center";

  const pageNumbersCentered =
    effectiveVariant === "page-numbers-arrows-bottom-center";

  const currentPage = currentIndex + 1;
  const totalPages = maxIndex + 1;
  const totalDots = maxIndex + 1;

  const navigationArrows = (
    <ArrowButtons onPrevious={handlePrevious} onNext={handleNext} />
  );

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__header" style={containerStyle}>
        <div className="carousel__header-left">
          <h2 className="carousel__title">{title}</h2>
          {description && (
            <p className="carousel__description">{description}</p>
          )}
        </div>

        <div className="carousel__header-right">
          {!isMobile && arrowsAbove && showStandaloneArrows && navigationArrows}
          {onShowAllClick && (
            <TextButton text={showAllText} onClick={onShowAllClick} />
          )}
        </div>
      </div>

      <div
        className="carousel__container"
        ref={carouselRef}
        style={containerStyle}
      >
        <div className="carousel__track" style={trackStyle}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="carousel__card"
              ref={index === 0 ? cardRef : null}
            >
              <ProductCard
                content={product.content}
                imageUrl={product.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>

      {showDots && (
        <div
          className={`carousel__controls ${
            dotsCentered ? "carousel__controls--center" : ""
          }`}
          style={containerStyle}
        >
          <Dots
            total={totalDots}
            activeIndex={currentIndex}
            onDotClick={handleGoToIndex}
            onPrevious={
              effectiveVariant === "dots-arrows-bottom-center"
                ? handlePrevious
                : undefined
            }
            onNext={
              effectiveVariant === "dots-arrows-bottom-center"
                ? handleNext
                : undefined
            }
          />
          {!isMobile &&
            !arrowsAbove &&
            showStandaloneArrows &&
            navigationArrows}
        </div>
      )}

      {showPageNumbers && (
        <div
          className={`carousel__controls ${
            pageNumbersCentered ? "carousel__controls--center" : ""
          }`}
          style={containerStyle}
        >
          <PageNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={
              effectiveVariant === "page-numbers-arrows-bottom-center"
                ? handlePrevious
                : undefined
            }
            onNext={
              effectiveVariant === "page-numbers-arrows-bottom-center"
                ? handleNext
                : undefined
            }
          />
          {!arrowsAbove && showStandaloneArrows && navigationArrows}
        </div>
      )}
    </div>
  );
};
