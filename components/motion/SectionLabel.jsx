"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionLabel({ number, label, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const num = el.querySelector("[data-num]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        num,
        { rotate: 6, opacity: 0 },
        {
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal ${className}`}
    >
      {number && (
        <span data-num className="text-antique">
          {number}
        </span>
      )}
      {number && label && <span aria-hidden className="text-champagne">/</span>}
      {label && <span>{label}</span>}
    </div>
  );
}
