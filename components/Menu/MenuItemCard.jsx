"use client";

import Image from "next/image";
import { formatPrice } from "@/data/sistersOfPearl";

export default function MenuItemCard({ item }) {
  const priceLabel = formatPrice(item.price);
  const imageSrc = item.image || "/images/sisters-of-pearl/table-detail.jpg";

  return (
    <article className="menu-card" data-menu-card data-cursor="Taste">
      <div className="menu-card__media">
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 72vw, (max-width: 1200px) 34vw, 240px"
          className="menu-card__image"
        />
        {item.badge && (
          <span className="menu-card__badge">{item.badge}</span>
        )}
      </div>
      <div className="menu-card__body">
        <h4 className="menu-card__title">{item.name}</h4>
        {item.chineseName && (
          <p className="menu-card__chinese">{item.chineseName}</p>
        )}
        {item.description && (
          <p className="menu-card__desc">{item.description}</p>
        )}
        <p className="menu-card__price">{priceLabel}</p>
      </div>
    </article>
  );
}
