"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/sistersOfPearl";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SocialIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: "h-[15px] w-[15px]",
  };

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="4.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg {...common}>
        <path
          d="M14.5 8.5H16V5.8c-.3 0-.9-.1-1.6-.1-1.9 0-3.2 1.2-3.2 3.4V11H9v2.8h2.2V21h2.8v-7.2H16l.4-2.8h-2.7V9.5c0-.8.2-1 1.3-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M12 21s-6-5.4-6-10.2A6 6 0 0 1 12 4.8a6 6 0 0 1 6 6C18 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10.8" r="2.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: business.instagram,
    icon: "instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: business.facebook,
    icon: "facebook",
  },
  {
    id: "maps",
    label: "Google Maps",
    href: business.mapsUrl,
    icon: "maps",
  },
];

const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#hours", label: "Hours" },
  { href: "#visit", label: "Visit" },
  { href: "#reserve", label: "Reserve" },
];

export default function Footer() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const bits = root.querySelectorAll("[data-footer-reveal]");
    const line = root.querySelector("[data-footer-line]");
    const socials = root.querySelectorAll("[data-footer-social]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([bits, socials], { clearProps: "all", opacity: 1, y: 0 });
        if (line) gsap.set(line, { scaleX: 1 });
        return;
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 92%", once: true },
          }
        );
      }

      gsap.fromTo(
        bits,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 92%", once: true },
        }
      );

      gsap.fromTo(
        socials,
        { opacity: 0, scale: 0.85, y: 8 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 90%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer ref={rootRef} className="site-footer relative overflow-hidden">
      <span
        data-footer-line
        className="site-footer__rule"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-8 md:px-8 md:py-9 lg:px-12 xl:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
          <div data-footer-reveal className="max-w-[16rem]">
            <p className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.28em] text-[color:var(--hero-gold)]">
              Sisters of Pearl
            </p>
            <p className="mt-1.5 font-[family-name:var(--font-display)] text-[1.3rem] font-semibold leading-tight tracking-[0.04em] text-ink">
              Glen Waverley
            </p>
            <p className="mt-2 text-[0.95rem] font-medium leading-relaxed text-[color:var(--hero-ink-soft)]">
              {business.address.street}, {business.address.suburb} VIC{" "}
              {business.address.postcode}
            </p>
          </div>

          <div data-footer-reveal className="flex flex-col gap-1.5">
            <p className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.24em] text-[color:var(--hero-gold)]">
              Contact
            </p>
            <a
              href={business.phoneTel}
              className="site-footer__link text-[1rem] font-medium text-ink"
            >
              {business.phone}
            </a>
            <a
              href={business.emailMailto}
              className="site-footer__link break-all text-[0.95rem] font-medium text-[color:var(--hero-ink-soft)]"
            >
              {business.email}
            </a>
          </div>

          <nav
            data-footer-reveal
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Footer"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="site-footer__nav font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--hero-ink-soft)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div data-footer-reveal>
            <p className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.24em] text-[color:var(--hero-gold)]">
              Follow
            </p>
            <ul className="mt-2.5 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-footer-social
                    data-cursor="Open"
                    className="site-footer__social"
                    aria-label={social.label}
                  >
                    <SocialIcon type={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-footer-reveal
          className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(90,61,39,0.12)] pt-4"
        >
          <p className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.2em] text-[color:var(--hero-ink-soft)]">
            © 2026 Sisters of Pearl
          </p>
          <p className="font-[family-name:var(--font-script)] text-[1.05rem] text-[color:var(--hero-gold-script)]">
            Good food brighter days
          </p>
        </div>
      </div>
    </footer>
  );
}
