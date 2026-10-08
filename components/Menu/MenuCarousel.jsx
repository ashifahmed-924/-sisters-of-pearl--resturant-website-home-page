"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import MenuItemCard from "./MenuItemCard";

const MenuCarousel = forwardRef(function MenuCarousel(
  { items, expanded = false, onEdgeChange },
  ref
) {
  const trackRef = useRef(null);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el || expanded) {
      onEdgeChange?.({ canPrev: false, canNext: false });
      return;
    }
    const max = el.scrollWidth - el.clientWidth;
    onEdgeChange?.({
      canPrev: el.scrollLeft > 8,
      canNext: max > 8 && el.scrollLeft < max - 8,
    });
  }, [expanded, onEdgeChange]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || expanded) {
      updateEdges();
      return undefined;
    }
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [expanded, updateEdges, items]);

  useImperativeHandle(
    ref,
    () => ({
      prev() {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector(".menu-card");
        const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
        el.scrollBy({ left: -step, behavior: "smooth" });
      },
      next() {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector(".menu-card");
        const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
        el.scrollBy({ left: step, behavior: "smooth" });
      },
    }),
    []
  );

  if (expanded) {
    return (
      <div className="menu-carousel menu-carousel--expanded">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div ref={trackRef} className="menu-carousel" data-menu-carousel>
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
});

export default MenuCarousel;

export function CarouselArrows({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  className = "",
}) {
  return (
    <div className={`menu-carousel__arrows ${className}`}>
      <button
        type="button"
        className="menu-carousel__arrow"
        aria-label="Previous dishes"
        disabled={!canPrev}
        onClick={onPrev}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.5 6.5 9 12l5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="menu-carousel__arrow"
        aria-label="Next dishes"
        disabled={!canNext}
        onClick={onNext}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9.5 6.5 15 12l-5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
