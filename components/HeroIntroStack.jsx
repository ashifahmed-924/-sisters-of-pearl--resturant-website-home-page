"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pins the hero while the intro section scrolls up and covers it.
 */
export default function HeroIntroStack({ children }) {
  const stackRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const hero = stack.querySelector(".hero-editorial");
    const intro = stack.querySelector(".intro-editorial");
    if (!hero || !intro) return undefined;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(hero, { transformOrigin: "50% 40%" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: intro,
            start: "top bottom",
            end: "top top",
            scrub: 0.65,
          },
        })
        .fromTo(
          hero,
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
    <div ref={stackRef} className="hero-intro-stack">
      {children}
    </div>
  );
}
