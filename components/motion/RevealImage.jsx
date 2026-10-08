"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * variant: curtainY | curtainX | polygon | scale | circle | wipeLeft
 */
export default function RevealImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  imgClassName = "",
  variant = "curtainY",
  fill = false,
}) {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    if (reduced) {
      gsap.set(el, { clearProps: "clipPath,opacity,scale" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const from = {
        curtainY: { clipPath: "inset(100% 0 0 0)" },
        curtainX: { clipPath: "inset(0 100% 0 0)" },
        wipeLeft: { clipPath: "inset(0 0 0 100%)" },
        polygon: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        scale: { opacity: 0, scale: 0.95 },
        circle: { clipPath: "circle(0% at 50% 50%)" },
      }[variant] || { clipPath: "inset(100% 0 0 0)" };

      const to = {
        curtainY: { clipPath: "inset(0% 0 0 0)" },
        curtainX: { clipPath: "inset(0 0% 0 0)" },
        wipeLeft: { clipPath: "inset(0 0 0 0%)" },
        polygon: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        scale: { opacity: 1, scale: 1 },
        circle: { clipPath: "circle(75% at 50% 50%)" },
      }[variant] || { clipPath: "inset(0% 0 0 0)" };

      gsap.fromTo(el, from, {
        ...to,
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, reduced]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`img-editorial object-cover ${imgClassName}`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={`img-editorial h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
