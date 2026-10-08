"use client";

import Image from "next/image";

export default function MenuHoverImage({ item, visible, top }) {
  if (!item?.image) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute right-0 top-0 z-20 hidden w-[240px] overflow-hidden border border-[color:var(--border-gold)] bg-pearl lg:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translateY(${top}px) scale(${visible ? 1 : 0.92})`,
        transition: "opacity 0.35s ease, transform 0.4s ease",
      }}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
