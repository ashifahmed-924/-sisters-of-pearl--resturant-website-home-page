"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pins the sea section while lunch/banquet scrolls up and covers it.
 * Same overlap pattern as HeroIntroStack.
 */
export default function SeaLunchStack({ children }) {
  const stackRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const under = stack.querySelector(".sea-editorial");
    const over = stack.querySelector(".lunch-editorial");
    if (!under || !over) return undefined;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(under, { transformOrigin: "50% 40%" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: over,
            start: "top bottom",
            end: "top top",
            scrub: 0.65,
          },
        })
        .fromTo(
          under,
          { scale: 1, opacity: 1 },
          {
            scale: 0.94,
            opacity: 0.62,
            ease: "none",
          },
          0
        );
    }, stack);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={stackRef} className="sea-lunch-stack">
      {children}
    </div>
  );
}
