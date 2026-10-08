"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const ref = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduced) return undefined;
    const fine = window.matchMedia("(pointer: fine)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(fine.matches && !coarse.matches);
    update();
    fine.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, [reduced]);

  useEffect(() => {
    if (!enabled || reduced) {
      document.body.classList.remove("has-custom-cursor");
      return undefined;
    }

    const cursor = ref.current;
    const label = labelRef.current;
    if (!cursor) return undefined;

    document.body.classList.add("has-custom-cursor");

    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      const text = target.getAttribute("data-cursor") || "";
      cursor.classList.add("is-expanded");
      if (label) label.textContent = text;
    };

    const onOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      cursor.classList.remove("is-expanded");
      if (label) label.textContent = "";
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <div ref={ref} className="custom-cursor" aria-hidden>
      <span ref={labelRef} />
    </div>
  );
}
