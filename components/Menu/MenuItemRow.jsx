"use client";

import { formatPrice } from "@/data/sistersOfPearl";

export default function MenuItemRow({
  item,
  onEnter,
  onLeave,
  onTap,
  active = false,
}) {
  const priceLabel = formatPrice(item.price);

  return (
    <button
      type="button"
      data-cursor="Taste"
      onMouseEnter={(e) => onEnter?.(item, e.currentTarget)}
      onMouseLeave={() => onLeave?.()}
      onClick={() => onTap?.(item)}
      className="group w-full border-b border-[color:var(--border-gold)] py-5 text-left transition-colors"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-[0.01em] text-ink transition-transform duration-300 group-hover:translate-x-3 md:text-[1.75rem]">
            {item.name}
          </p>
          {item.description && (
            <p className="mt-2 max-w-md text-[1.02rem] font-medium leading-relaxed text-charcoal">
              {item.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="font-[family-name:var(--font-micro)] text-[10px] uppercase tracking-[0.2em] text-antique">
            {priceLabel}
          </span>
          <span
            aria-hidden
            className={`h-px w-10 origin-left bg-champagne transition-transform duration-300 ${
              active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </div>
      </div>
    </button>
  );
}
