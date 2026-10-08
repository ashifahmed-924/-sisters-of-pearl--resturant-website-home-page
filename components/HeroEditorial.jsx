"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/sistersOfPearl";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = [
  {
    main: business.images.heroMain,
    secondary: business.images.heroDetail,
    tertiary: business.images.heroSecondary,
    alt: "Steaming Cantonese dumplings in a bamboo steamer",
  },
  {
    main: business.images.heroDetail,
    secondary: business.images.heroSecondary,
    tertiary: business.images.heroMain,
    alt: "Pan-fried potstickers with sesame and soy",
  },
  {
    main: business.images.heroSecondary,
    secondary: business.images.heroMain,
    tertiary: business.images.heroDetail,
    alt: "Steamed dumplings with chili oil",
  },
  {
    main: "/images/sisters-of-pearl/dish-01.jpg",
    secondary: business.images.heroMain,
    tertiary: business.images.heroDetail,
    alt: "Shared dumpling dining at Sisters of Pearl",
  },
];

const FEATURES = [
  "Authentic Cantonese",
  "Fresh Ingredients",
  "Memorable Experiences",
];

function PlayOrbitButton({ href = "#story" }) {
  return (
    <a
      href={href}
      data-cursor="Play"
      className="group relative flex h-[4.25rem] w-[4.25rem] items-center justify-center sm:h-[5rem] sm:w-[5rem]"
      aria-label="Watch our story"
    >
      <svg
        viewBox="0 0 100 100"
        className="hero-play-orbit absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <path
            id="heroPlayCircle"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text
          fill="var(--hero-ink-soft)"
          style={{
            fontFamily: "var(--font-micro), sans-serif",
            fontSize: "8.5px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#heroPlayCircle" startOffset="0%">
            WATCH · OUR STORY · WATCH · OUR STORY ·
          </textPath>
        </text>
      </svg>
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(90,61,39,0.35)] bg-[rgba(245,241,233,0.95)] shadow-[0_8px_24px_rgba(40,30,20,0.12)] transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
        <span
          aria-hidden
          className="ml-0.5 border-y-[5px] border-l-[9px] border-y-transparent border-l-[color:var(--hero-umber)]"
        />
      </span>
    </a>
  );
}

export default function HeroEditorial() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];

  const goSlide = (dir) => {
    setSlide((prev) => (prev + dir + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-hero-reveal]");
    const circles = root.querySelectorAll("[data-hero-circle]");
    const decor = root.querySelectorAll("[data-hero-decor]");
    const scriptEl = root.querySelector("[data-hero-script]");
    const navLine = document.querySelector("[data-nav-line]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, circles, decor, scriptEl, navLine], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          clipPath: "none",
        });
        return;
      }

      gsap.set(revealEls, { opacity: 0, y: 24 });
      gsap.set(circles, {
        opacity: 0,
        scale: 0.9,
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(decor, { opacity: 0, y: 16 });
      if (scriptEl) gsap.set(scriptEl, { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (navLine) {
        tl.fromTo(navLine, { scaleX: 0 }, { scaleX: 1, duration: 0.55 }, 0);
      }

      tl.to(revealEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 }, 0.1)
        .to(
          circles,
          {
            opacity: 1,
            scale: 1,
            clipPath: "circle(72% at 50% 50%)",
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.25
        )
        .to(decor, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 }, 0.4)
        .to(scriptEl, { opacity: 1, y: 0, duration: 0.8 }, 0.7);

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const main = root.querySelector("[data-parallax-main]");
          const side = root.querySelectorAll("[data-parallax-side]");
          const pagoda = root.querySelector("[data-parallax-pagoda]");
          const brush = root.querySelector("[data-parallax-brush]");
          const blossom = root.querySelector("[data-parallax-blossom]");
          if (main) gsap.set(main, { yPercent: -6 * p });
          side.forEach((el, i) => {
            gsap.set(el, { yPercent: -(10 + i * 3) * p, xPercent: 3 * p });
          });
          if (pagoda) gsap.set(pagoda, { yPercent: 10 * p });
          if (brush) gsap.set(brush, { yPercent: 14 * p });
          if (blossom) gsap.set(blossom, { yPercent: -5 * p });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    const circles = root.querySelectorAll("[data-hero-circle]");
    gsap.fromTo(
      circles,
      { opacity: 0.6, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, [slide, reduced]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="hero-editorial relative overflow-hidden"
    >
      <span className="hero-brush" data-parallax-brush data-hero-decor aria-hidden />

      {/* Cherry blossom — top center */}
      <div
        data-hero-decor
        data-parallax-blossom
        className="pointer-events-none absolute left-1/2 top-[4.35rem] z-[3] w-[min(52vw,300px)] -translate-x-[30%] md:w-[min(36vw,340px)] md:-translate-x-[18%] lg:w-[360px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          priority
          className="hero-blossom h-auto w-full object-contain"
        />
      </div>

      {/* Far-right pagination */}
      <aside
        className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 xl:right-5 xl:flex"
        aria-label="Hero slides"
      >
        <div className="flex flex-col items-center gap-2 font-[family-name:var(--font-micro)] text-[10px] tracking-[0.2em] text-[color:var(--hero-ink-soft)]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className={`transition-opacity duration-300 ${
                i === slide ? "opacity-100" : "opacity-35 hover:opacity-70"
              }`}
              aria-label={`Show slide ${String(i + 1).padStart(2, "0")}`}
              aria-current={i === slide ? "true" : undefined}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
        <span className="h-14 w-px bg-[rgba(90,61,39,0.25)]" aria-hidden />
        <span
          className="origin-center rotate-180 font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.32em] text-charcoal"
          style={{ writingMode: "vertical-rl" }}
        >
          A Taste of Tradition
        </span>
      </aside>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-6 pt-24 md:px-8 md:pb-8 md:pt-[5.75rem] lg:px-12 xl:px-14">
        <div className="grid flex-1 grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-4 lg:gap-6">
          {/* Copy */}
          <div className="relative z-20 md:col-span-5 lg:col-span-5">
            <p
              data-hero-reveal
              className="font-[family-name:var(--font-micro)] text-[12px] font-medium uppercase tracking-[0.28em] text-charcoal"
            >
              Cantonese Dining — Glen Waverley
            </p>

            <h1
              data-hero-reveal
              className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.85rem,7.2vw,5.6rem)] font-semibold leading-[0.9] tracking-[0.03em] text-ink md:mt-4"
            >
              <span className="block">SISTERS</span>
              <span className="my-0.5 block pl-[0.2em] text-[0.34em] font-semibold tracking-[0.5em] text-[color:var(--hero-umber-deep)] md:pl-[0.4em]">
                OF
              </span>
              <span className="block">PEARL</span>
            </h1>

            <p
              data-hero-reveal
              className="mt-4 max-w-[22rem] font-[family-name:var(--font-display)] text-[clamp(1.15rem,2.2vw,1.45rem)] font-semibold leading-snug text-ink md:mt-5"
            >
              Traditional Flavours / Modern Experiences
            </p>

            <p
              data-hero-reveal
              className="mt-3 max-w-[26rem] text-[1.05rem] font-medium leading-relaxed text-charcoal md:mt-4 md:text-[1.12rem]"
            >
              A refined Cantonese table in Glen Waverley — seafood, shared
              plates, and rooms made for gathering.
            </p>

            <div
              data-hero-reveal
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a href="#menu" className="hero-btn-primary">
                Explore Our Menu
                <span aria-hidden>→</span>
              </a>
              <a href="#reserve" className="hero-btn-ghost">
                Make a Booking
              </a>
            </div>

            <ul
              data-hero-reveal
              className="mt-7 flex max-w-md flex-wrap items-center font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal sm:text-[12px]"
            >
              {FEATURES.map((label, i) => (
                <li key={label} className="flex items-center">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="mx-2.5 h-3 w-px bg-[rgba(90,61,39,0.28)] sm:mx-3"
                    />
                  )}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Imagery stage */}
          <div className="relative z-10 mx-auto w-full max-w-[560px] md:col-span-7 md:mx-0 md:max-w-none lg:col-span-7">
            <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[500px] md:ml-auto md:mr-8 md:max-w-[540px] lg:mr-12 xl:mr-20">
              <div
                className="hero-ink-wash pointer-events-none absolute inset-[6%] rounded-full opacity-90"
                aria-hidden
              />

              {/* Main circle */}
              <div
                data-hero-circle
                data-parallax-main
                data-cursor="View"
                className="hero-circle absolute left-[4%] top-[10%] z-10 aspect-square w-[78%] shadow-[0_22px_55px_rgba(40,30,20,0.18)] transition-transform duration-500 hover:scale-[1.015] md:left-[2%] md:top-[8%] md:w-[76%]"
              >
                <Image
                  key={current.main}
                  src={current.main}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 420px"
                  priority
                  className="object-cover"
                />
                <p
                  data-hero-script
                  className="pointer-events-none absolute left-1/2 top-[40%] z-20 w-[118%] -translate-x-1/2 -rotate-6 text-center font-[family-name:var(--font-script)] text-[clamp(1.4rem,3.6vw,2.4rem)] leading-none text-[color:var(--hero-gold-script)] drop-shadow-[0_2px_10px_rgba(245,241,233,0.55)]"
                >
                  Good Food Brings People Together
                </p>
              </div>

              {/* Secondary top-right */}
              <div
                data-hero-circle
                data-parallax-side
                data-cursor="View"
                className="hero-circle hero-circle--organic absolute right-0 top-[2%] z-20 aspect-square w-[28%] shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105 md:w-[27%]"
              >
                <Image
                  key={current.secondary}
                  src={current.secondary}
                  alt="Signature dish detail"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              {/* Tertiary bottom-right */}
              <div
                data-hero-circle
                data-parallax-side
                data-cursor="View"
                className="hero-circle hero-circle--organic-alt absolute bottom-[8%] right-[2%] z-20 aspect-square w-[24%] shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105 md:bottom-[10%] md:right-0 md:w-[25%]"
              >
                <Image
                  key={current.tertiary}
                  src={current.tertiary}
                  alt="Shared plate detail"
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>

              {/* Play orbit */}
              <div className="absolute bottom-[14%] left-[2%] z-30 md:bottom-[16%] md:left-[4%]">
                <PlayOrbitButton />
              </div>
            </div>
          </div>
        </div>

        {/* Pagoda — bottom left decorative */}
        <div
          data-hero-decor
          data-parallax-pagoda
          className="pointer-events-none absolute bottom-[4.25rem] left-4 z-[1] w-[130px] sm:left-5 sm:w-[150px] md:bottom-[4.75rem] md:left-8 md:w-[180px] lg:left-12 lg:w-[200px] xl:left-14"
        >
          <Image
            src={business.images.heroPagoda}
            alt=""
            width={420}
            height={420}
            className="hero-pagoda h-auto w-full object-contain object-bottom"
          />
        </div>

        {/* Bottom chrome */}
        <div className="relative z-20 mt-4 flex items-end justify-between gap-4 md:mt-2">
          <a
            href="#story"
            data-hero-reveal
            className="group flex items-center gap-2 font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.26em] text-charcoal transition-colors hover:text-ink sm:text-[12px]"
          >
            Scroll to Discover
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-y-1"
            >
              ↓
            </span>
          </a>

          <div className="flex items-center gap-2" data-hero-reveal>
            <button
              type="button"
              onClick={() => goSlide(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(90,61,39,0.35)] text-ink transition-colors hover:border-[color:var(--hero-umber)] hover:bg-[rgba(107,74,47,0.06)]"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => goSlide(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(90,61,39,0.35)] text-ink transition-colors hover:border-[color:var(--hero-umber)] hover:bg-[rgba(107,74,47,0.06)]"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
