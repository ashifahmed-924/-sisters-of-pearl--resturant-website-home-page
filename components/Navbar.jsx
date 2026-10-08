"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrandMark from "./BrandMark";
import MobileMenu from "./MobileMenu";
import useReducedMotion from "@/hooks/useReducedMotion";

const LEFT_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#menu", label: "Menu" },
];

const RIGHT_LINKS = [
  { href: "#reserve", label: "Reservation" },
  { href: "#visit", label: "Visit" },
  { href: "#reserve", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const markRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const mark = markRef.current;
    if (!nav || reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(nav, {
        backgroundColor: scrolled
          ? "rgba(245,241,233,0.88)"
          : "rgba(245,241,233,0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottomColor: scrolled
          ? "rgba(107,74,47,0.16)"
          : "rgba(107,74,47,0)",
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(mark, {
        scale: scrolled ? 0.94 : 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }, nav);

    return () => ctx.revert();
  }, [scrolled, reduced]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <div className="mx-auto grid h-[68px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 md:h-[72px] md:px-8 lg:gap-3 lg:px-10 xl:px-14">
          <nav
            className="hidden min-w-0 items-center gap-4 xl:gap-6 2xl:gap-7 lg:flex"
            aria-label="Primary left"
          >
            {LEFT_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative shrink-0 font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal xl:text-[12px] xl:tracking-[0.24em]"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--hero-umber)] transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          <a
            href="#top"
            ref={markRef}
            className="justify-self-center"
            aria-label="Sisters of Pearl home"
          >
            <BrandMark
              compact={scrolled}
              className="tracking-[0.2em] xl:tracking-[0.22em]"
            />
          </a>

          <div className="hidden min-w-0 items-center justify-self-end gap-3 lg:flex xl:gap-5">
            <nav
              className="flex items-center gap-3 xl:gap-5"
              aria-label="Primary right"
            >
              {RIGHT_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative shrink-0 font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal xl:text-[12px] xl:tracking-[0.24em]"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--hero-umber)] transition-transform duration-300 group-hover:scale-x-100"
                  />
                </a>
              ))}
            </nav>
            <a href="#reserve" className="hero-nav-pill shrink-0 whitespace-nowrap">
              Book a Table
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="justify-self-end flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(90,61,39,0.35)] lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </button>
        </div>
        <span
          data-nav-line
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[linear-gradient(110deg,#6b4a2f,#b08d4a,#6b4a2f)]"
        />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
