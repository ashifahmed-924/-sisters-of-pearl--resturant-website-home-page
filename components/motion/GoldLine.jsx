"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GoldLine({
  className = "",
  vertical = false,
  delay = 0,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el, { scaleX: 1, scaleY: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          scaleX: vertical ? 1 : 0,
          scaleY: vertical ? 0 : 1,
          transformOrigin: vertical ? "top center" : "left center",
        },
        {
          scaleX: 1,
          scaleY: 1,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, reduced, vertical]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={`block bg-[linear-gradient(110deg,#9B793E,#D8C18A,#A98446)] ${
        vertical ? "h-full w-px" : "h-px w-full"
      } ${className}`}
    />
  );
}
