"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "./useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lightweight section entrance helper.
 * variant: fadeUp | clipUp | slideX | blurIn | scaleIn | lineGrow
 */
export default function useGsapReveal(variant = "fadeUp", options = {}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el, { clearProps: "all", opacity: 1, y: 0, x: 0, filter: "none" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const fromVars = {
        fadeUp: { opacity: 0, y: 36 },
        clipUp: { clipPath: "inset(100% 0 0 0)" },
        slideX: { opacity: 0, x: options.dir === "left" ? -40 : 40 },
        blurIn: { opacity: 0, filter: "blur(5px)" },
        scaleIn: { opacity: 0, scale: 0.94 },
        lineGrow: { scaleX: 0, transformOrigin: "left center" },
      }[variant] || { opacity: 0, y: 28 };

      gsap.fromTo(
        el,
        fromVars,
        {
          ...Object.fromEntries(
            Object.keys(fromVars).map((k) => [
              k,
              k === "clipPath"
                ? "inset(0% 0 0 0)"
                : k === "scaleX"
                  ? 1
                  : k === "filter"
                    ? "blur(0px)"
                    : k === "scale"
                      ? 1
                      : 0,
            ])
          ),
          opacity: 1,
          y: 0,
          x: 0,
          duration: options.duration || 1.05,
          ease: options.ease || "power3.out",
          delay: options.delay || 0,
          scrollTrigger: {
            trigger: el,
            start: options.start || "top 86%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [variant, reduced, options.delay, options.dir, options.duration, options.ease, options.start]);

  return ref;
}
