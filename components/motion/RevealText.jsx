"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * type: lines | chars | words | opposite | blur | tracking
 */
export default function RevealText({
  as: Tag = "div",
  children,
  type = "lines",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el.querySelectorAll("[data-reveal]"), { clearProps: "all", opacity: 1, y: 0, x: 0, filter: "none", letterSpacing: null });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll("[data-reveal]");

      if (type === "chars" || type === "words") {
        gsap.fromTo(
          targets,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: type === "chars" ? 0.035 : 0.08,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      } else if (type === "opposite") {
        gsap.fromTo(
          targets[0],
          { xPercent: -18, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
        if (targets[1]) {
          gsap.fromTo(
            targets[1],
            { xPercent: 18, opacity: 0 },
            {
              xPercent: 0,
              opacity: 1,
              duration: 1.1,
              delay: delay + 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            }
          );
        }
      } else if (type === "blur") {
        gsap.fromTo(
          targets,
          { opacity: 0, filter: "blur(5px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      } else if (type === "tracking") {
        gsap.fromTo(
          targets,
          { opacity: 0, letterSpacing: "0.15em" },
          {
            opacity: 1,
            letterSpacing: "0.02em",
            duration: 1.15,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      } else {
        gsap.fromTo(
          targets,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.12,
            delay,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [type, delay, reduced]);

  if (type === "chars" && typeof children === "string") {
    return (
      <Tag ref={ref} className={className}>
        <span className="inline-flex overflow-hidden">
          {children.split("").map((ch, i) => (
            <span key={`${ch}-${i}`} data-reveal className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  if (type === "words" && typeof children === "string") {
    return (
      <Tag ref={ref} className={className}>
        <span className="inline-flex flex-wrap gap-x-[0.35em] overflow-hidden">
          {children.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} data-reveal className="inline-block">
              {word}
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  if (Array.isArray(children)) {
    return (
      <Tag ref={ref} className={className}>
        {children.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span data-reveal className="block">
              {line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <span className="block overflow-hidden">
        <span data-reveal className="block">
          {children}
        </span>
      </span>
    </Tag>
  );
}
