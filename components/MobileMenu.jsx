"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { business } from "@/data/sistersOfPearl";
import useReducedMotion from "@/hooks/useReducedMotion";

const links = [
  { href: "#top", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
  { href: "#hours", label: "Hours" },
  { href: "#reserve", label: "Book / Contact" },
];

export default function MobileMenu({ open, onClose }) {
  const sheetRef = useRef(null);
  const lineRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const sheet = sheetRef.current;
    const line = lineRef.current;
    const items = sheet?.querySelectorAll("[data-mobile-link]");
    if (!sheet) return undefined;

    document.body.classList.add("menu-sheet-open");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(sheet, { autoAlpha: 1 });
        gsap.set(items, { opacity: 1, y: 0 });
        gsap.set(line, { scaleY: 1 });
        return;
      }

      gsap.set(sheet, { autoAlpha: 1 });
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          delay: 0.25,
          ease: "power3.out",
        }
      );
    }, sheet);

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("menu-sheet-open");
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [open, onClose, reduced]);

  if (!open) return null;

  return (
    <div
      ref={sheetRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[90] bg-pearl"
    >
      <div className="flex h-full flex-col px-6 pb-10 pt-24">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[color:var(--border-gold)] text-[10px] uppercase tracking-[0.2em]"
          aria-label="Close menu"
        >
          Close
        </button>

        <div className="relative flex flex-1 items-start gap-8">
          <span
            ref={lineRef}
            aria-hidden
            className="mt-2 h-[55vh] w-px bg-[linear-gradient(180deg,#9B793E,#D8C18A,#A98446)]"
          />
          <nav className="flex flex-col gap-6 pt-2" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-mobile-link
                onClick={onClose}
                className="font-[family-name:var(--font-display)] text-4xl tracking-[0.04em] text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-2 font-[family-name:var(--font-micro)] text-[11px] uppercase tracking-[0.18em] text-muted">
          <p>{business.address.full}</p>
          <a href={business.phoneTel} className="block text-ink">
            {business.phone}
          </a>
          <a href={business.instagram} target="_blank" rel="noopener noreferrer">
            {business.instagramHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
