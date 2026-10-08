"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/sistersOfPearl";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INFO_CARDS = [
  {
    id: "location",
    label: "Glen Waverley",
    title: business.address.street,
    text: "Conveniently located in the heart of Glen Waverley.",
    icon: "pin",
  },
  {
    id: "hours",
    label: "Lunch · Dinner",
    title: "Split service days",
    text: "Join us for lunch or dinner, we're here to serve you.",
    icon: "clock",
  },
  {
    id: "dining",
    label: "Family · Friends · Colleagues",
    title: "Shared dining",
    text: "Thoughtfully crafted dishes made for every occasion.",
    icon: "people",
  },
];

function InfoIcon({ type }) {
  if (type === "pin") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
        <path
          d="M12 21s-6-5.4-6-10.2A6 6 0 0 1 12 4.8a6 6 0 0 1 6 6C18 15.6 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="10.8" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M12 8.5V12l2.4 1.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
      <circle cx="8.2" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15.8" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="8.2" r="2.35" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4.5 17.5c.7-2.2 2.4-3.4 4.5-3.4M19.5 17.5c-.7-2.2-2.4-3.4-4.5-3.4M8.8 14.2c.9-.6 2-.9 3.2-.9s2.3.3 3.2.9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrushRing() {
  return (
    <svg
      className="intro-brush-ring"
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden
      data-intro-brush
    >
      <defs>
        <filter id="introBrushTexture" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>
      <path
        data-brush-path
        d="M112 78c-34 28-58 74-58 128 0 86 62 156 148 168 72 10 142-22 176-78 18-30 28-66 24-102"
        stroke="rgba(42,36,28,0.88)"
        strokeWidth="28"
        strokeLinecap="round"
        filter="url(#introBrushTexture)"
        pathLength="1"
      />
      <path
        data-brush-path
        d="M205 54c54 0 108 26 138 74 32 50 34 116 2 166-30 48-88 84-150 88-66 4-132-28-164-82-30-50-28-116 8-162C67 90 141 54 205 54Z"
        stroke="rgba(52,44,34,0.55)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#introBrushTexture)"
        pathLength="1"
      />
      <path
        data-brush-path-soft
        d="M238 62c42 8 84 34 106 72 20 36 24 84 6 122"
        stroke="rgba(90,72,48,0.28)"
        strokeWidth="10"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  );
}

export default function PearlIntro() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-intro-reveal]");
    const wordEls = root.querySelectorAll("[data-intro-word]");
    const circles = root.querySelectorAll("[data-intro-circle]");
    const decor = root.querySelectorAll("[data-intro-decor]");
    const scriptEl = root.querySelector("[data-intro-script]");
    const brushPaths = root.querySelectorAll(
      "[data-brush-path], [data-brush-path-soft]"
    );
    const infoCards = root.querySelectorAll("[data-intro-info]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, wordEls, circles, decor, scriptEl, infoCards], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          clipPath: "none",
        });
        gsap.set(brushPaths, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      gsap.set(revealEls, { opacity: 0, y: 26 });
      gsap.set(wordEls, { opacity: 0, y: 32 });
      gsap.set(circles, {
        opacity: 0,
        scale: 0.9,
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(decor, { opacity: 0 });
      gsap.set(infoCards, { opacity: 0, y: 20 });
      if (scriptEl) gsap.set(scriptEl, { opacity: 0, x: -8 });
      gsap.set(brushPaths, {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: 0.95,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(decor, { opacity: 1, duration: 1.1, stagger: 0.12 }, 0)
        .to(revealEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.1)
        .to(
          wordEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.2
        )
        .to(
          brushPaths,
          {
            strokeDashoffset: 0,
            duration: 1.4,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          0.25
        )
        .to(
          circles,
          {
            opacity: 1,
            scale: 1,
            clipPath: "circle(72% at 50% 50%)",
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.35
        )
        .to(scriptEl, { opacity: 1, x: 0, duration: 0.85 }, 0.7)
        .to(
          infoCards,
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 },
          0.8
        );

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const main = root.querySelector("[data-parallax-main]");
          const side = root.querySelectorAll("[data-parallax-side]");
          const blossom = root.querySelectorAll("[data-parallax-blossom]");
          const brush = root.querySelector("[data-parallax-brush]");
          if (main) gsap.set(main, { yPercent: -6 * p });
          side.forEach((el, i) => {
            gsap.set(el, {
              yPercent: -(8 + i * 4) * p,
              xPercent: (i % 2 === 0 ? 2.5 : -2) * p,
            });
          });
          blossom.forEach((el, i) => {
            gsap.set(el, { yPercent: (i === 0 ? -5 : 7) * p });
          });
          if (brush) gsap.set(brush, { rotate: 3 * p, yPercent: 5 * p });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="story"
      ref={rootRef}
      className="intro-editorial relative overflow-x-clip overflow-y-visible"
    >
      <div
        data-intro-decor
        data-parallax-blossom
        className="pointer-events-none absolute -left-12 top-8 z-[1] w-[min(34vw,170px)] opacity-45 sm:-left-8 sm:w-[200px] sm:opacity-50 md:top-10 md:w-[240px] lg:w-[270px] lg:opacity-55"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="intro-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-intro-decor
        data-parallax-blossom
        className="pointer-events-none absolute -bottom-2 -right-10 z-[1] w-[min(42vw,210px)] rotate-[155deg] opacity-45 sm:w-[230px] md:bottom-6 md:w-[260px] lg:w-[300px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="intro-blossom h-auto w-full object-contain"
        />
      </div>

      <aside
        className="absolute right-2 top-[38%] z-20 hidden -translate-y-1/2 flex-col items-center gap-3 xl:right-5 xl:flex"
        aria-hidden
      >
        <span
          data-intro-reveal
          className="origin-center rotate-180 font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.34em] text-[color:var(--hero-ink-soft)]"
          style={{ writingMode: "vertical-rl" }}
        >
          A Taste of Tradition
        </span>
        <svg
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 text-[color:var(--hero-gold-script)]"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5c.4 2.8 2.2 4.6 5 5-2.8.4-4.6 2.2-5 5-.4-2.8-2.2-4.6-5-5 2.8-.4 4.6-2.2 5-5Z" />
        </svg>
        <span className="h-14 w-px bg-[rgba(90,61,39,0.2)]" />
      </aside>

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col px-5 pb-0 pt-14 md:px-8 md:pt-16 lg:px-12 lg:pt-20 xl:px-14">
        <div className="grid flex-1 grid-cols-1 items-center gap-5 py-3 md:gap-7 md:py-5 lg:grid-cols-12 lg:gap-8 lg:py-6">
          <div className="relative z-20 lg:col-span-5 xl:pr-2">
            <p
              data-intro-reveal
              className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
            >
              01 — Sisters of Pearl
            </p>

            <h2 className="intro-headline mt-3 md:mt-4">
              <span data-intro-word className="intro-headline__line">
                Made for the
              </span>
              <span data-intro-word className="intro-headline__line">
                centre of the{" "}
                <em className="intro-headline__accent">table.</em>
              </span>
            </h2>

            <p
              data-intro-reveal
              className="mt-4 max-w-[26rem] font-[family-name:var(--font-display)] text-[1.1rem] font-medium leading-[1.7] text-charcoal md:mt-5 md:text-[1.2rem]"
            >
              {business.description}
            </p>

            <div
              data-intro-reveal
              className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5 md:mt-7"
            >
              <a href="#menu" className="intro-btn-primary" data-cursor="Menu">
                Explore Our Menu
                <span aria-hidden>→</span>
              </a>

              <a
                href="#reserve"
                data-cursor="Play"
                className="intro-watch group inline-flex items-center gap-3"
                aria-label="Watch our story"
              >
                <span className="intro-watch__orb">
                  <span
                    aria-hidden
                    className="ml-0.5 border-y-[5px] border-l-[8px] border-y-transparent border-l-[color:var(--hero-umber)]"
                  />
                </span>
                <span className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--hero-ink-soft)] transition-colors duration-300 group-hover:text-ink">
                  Watch Our Story
                </span>
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[540px] lg:col-span-7 lg:mx-0 lg:max-w-none">
            <div className="intro-stage relative mx-auto mb-6 aspect-square w-full max-w-[420px] sm:max-w-[460px] lg:mb-0 lg:ml-auto lg:mr-8 lg:max-w-[520px] xl:mr-14">
              <div className="intro-ink-wash pointer-events-none absolute inset-[8%] z-[1]" aria-hidden />

              <p
                data-intro-script
                className="intro-script pointer-events-none absolute -left-1 top-[14%] z-30 hidden font-[family-name:var(--font-script)] text-[clamp(1.2rem,2.1vw,1.6rem)] leading-[1.4] text-[color:var(--hero-gold-script)] lg:-left-2 lg:block"
                style={{ writingMode: "vertical-rl" }}
              >
                Good Food Brings People Together
              </p>

              <div
                className="pointer-events-none absolute inset-0 z-[6]"
                data-parallax-brush
                aria-hidden
              >
                <BrushRing />
              </div>

              <div
                data-intro-circle
                data-parallax-main
                data-cursor="View"
                className="intro-circle absolute left-[9%] top-[12%] z-10 aspect-square w-[70%] shadow-[0_22px_55px_rgba(40,30,20,0.15)] transition-transform duration-500 hover:scale-[1.015] lg:left-[11%] lg:top-[11%] lg:w-[68%]"
              >
                <Image
                  src={business.images.heroNoodles}
                  alt="Seafood noodle bowl at Sisters of Pearl"
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div
                data-intro-circle
                data-parallax-side
                data-cursor="View"
                className="intro-circle absolute right-[1%] top-[3%] z-20 aspect-square w-[29%] shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105 lg:right-0 lg:w-[27%]"
              >
                <Image
                  src={business.images.heroMain}
                  alt="Steamed dumplings in a bamboo steamer"
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>

              <div
                data-intro-circle
                data-parallax-side
                data-cursor="View"
                className="intro-circle absolute bottom-[7%] right-[3%] z-20 aspect-square w-[25%] shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105 lg:bottom-[9%] lg:right-[1%] lg:w-[24%]"
              >
                <Image
                  src={business.images.heroPlate}
                  alt="Shared plate detail"
                  fill
                  sizes="130px"
                  className="object-cover"
                />
              </div>

              <p
                data-intro-reveal
                className="pointer-events-none absolute -bottom-1 left-1/2 z-30 w-[92%] -translate-x-1/2 text-center font-[family-name:var(--font-script)] text-[1.3rem] leading-none text-[color:var(--hero-gold-script)] lg:hidden"
              >
                Good Food Brings People Together
              </p>
            </div>
          </div>
        </div>

        <div className="intro-info-bar relative z-20 mt-8 md:mt-10">
          <div className="intro-info-bar__grid">
            {INFO_CARDS.map((card) => (
              <article key={card.id} data-intro-info className="intro-info-card">
                <span className="intro-info-card__icon" aria-hidden>
                  <InfoIcon type={card.icon} />
                </span>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--hero-gold-script)] sm:text-[12px]">
                    {card.label}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold leading-tight text-ink sm:mt-1.5 sm:text-[1.4rem]">
                    {card.title}
                  </h3>
                  <p className="mt-1 max-w-[22rem] text-[0.95rem] font-medium leading-relaxed text-charcoal sm:mt-1.5 sm:text-[1.02rem]">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
