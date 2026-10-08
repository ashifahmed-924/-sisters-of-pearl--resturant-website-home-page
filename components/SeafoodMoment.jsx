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

function TideStroke({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 160"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        data-sea-tide
        d="M20 98c80-42 160-62 248-52 92 10 168 48 260 52 98 4 186-28 278-46 78-16 158-22 234-6 52 10 102 34 140 54"
        stroke="rgba(90,61,39,0.22)"
        strokeWidth="1.4"
        strokeLinecap="round"
        pathLength="1"
      />
      <path
        data-sea-tide
        d="M48 118c92-36 178-54 268-42 96 12 174 44 268 46 102 2 194-30 286-48 70-14 142-20 210-4"
        stroke="rgba(166,137,83,0.35)"
        strokeWidth="1.1"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  );
}

export default function SeafoodMoment() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const sea = business.seaMoment;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-sea-reveal]");
    const wordEls = root.querySelectorAll("[data-sea-word]");
    const pearls = root.querySelectorAll("[data-sea-pearl]");
    const decor = root.querySelectorAll("[data-sea-decor]");
    const scriptEl = root.querySelector("[data-sea-script]");
    const tidePaths = root.querySelectorAll("[data-sea-tide]");
    const captions = root.querySelectorAll("[data-sea-caption]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, wordEls, pearls, decor, scriptEl, captions], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          clipPath: "none",
        });
        gsap.set(tidePaths, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      gsap.set(revealEls, { opacity: 0, y: 24 });
      gsap.set(wordEls, { opacity: 0, y: 36 });
      gsap.set(pearls, {
        opacity: 0,
        scale: 0.88,
        clipPath: "circle(0% at 50% 50%)",
      });
      gsap.set(decor, { opacity: 0 });
      gsap.set(captions, { opacity: 0, y: 10 });
      if (scriptEl) gsap.set(scriptEl, { opacity: 0, y: 12 });
      gsap.set(tidePaths, {
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

      tl.to(decor, { opacity: 1, duration: 1.1, stagger: 0.1 }, 0)
        .to(revealEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.08)
        .to(
          wordEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.18
        )
        .to(
          tidePaths,
          {
            strokeDashoffset: 0,
            duration: 1.35,
            stagger: 0.12,
            ease: "power2.inOut",
          },
          0.28
        )
        .to(
          pearls,
          {
            opacity: 1,
            scale: 1,
            clipPath: "circle(72% at 50% 50%)",
            duration: 1.05,
            stagger: 0.14,
            ease: "power4.out",
          },
          0.32
        )
        .to(scriptEl, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to(
          captions,
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.85
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
          const tide = root.querySelector("[data-parallax-tide]");
          if (main) gsap.set(main, { yPercent: -7 * p });
          side.forEach((el, i) => {
            gsap.set(el, {
              yPercent: -(10 + i * 4) * p,
              xPercent: (i % 2 === 0 ? 3 : -2.5) * p,
            });
          });
          blossom.forEach((el, i) => {
            gsap.set(el, { yPercent: (i === 0 ? -6 : 8) * p });
          });
          if (tide) gsap.set(tide, { xPercent: 4 * p });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const mainPearl = sea.pearls.find((p) => p.size === "main");
  const midPearl = sea.pearls.find((p) => p.size === "mid");
  const smallPearl = sea.pearls.find((p) => p.size === "small");

  return (
    <section
      id="from-the-sea"
      ref={rootRef}
      className="sea-editorial relative overflow-x-clip"
      aria-labelledby="sea-heading"
    >
      <div
        data-sea-decor
        data-parallax-blossom
        className="pointer-events-none absolute -right-8 top-4 z-[1] w-[min(30vw,150px)] rotate-[18deg] opacity-40 sm:w-[170px] md:top-6 md:w-[190px] lg:w-[210px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="sea-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-sea-decor
        data-parallax-blossom
        className="pointer-events-none absolute -bottom-2 -left-10 z-[1] w-[min(34vw,160px)] -rotate-[12deg] opacity-35 sm:w-[180px] md:bottom-0 md:w-[200px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="sea-blossom h-auto w-full object-contain"
        />
      </div>

      <aside
        className="absolute left-2 top-[42%] z-20 hidden -translate-y-1/2 flex-col items-center gap-3 xl:left-5 xl:flex"
        aria-hidden
      >
        <span
          data-sea-reveal
          className="origin-center rotate-180 font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.34em] text-[color:var(--hero-ink-soft)]"
          style={{ writingMode: "vertical-rl" }}
        >
          {sea.vertical}
        </span>
        <span className="h-10 w-px bg-[rgba(90,61,39,0.2)]" />
      </aside>

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col px-5 py-7 md:px-8 md:py-8 lg:px-12 lg:py-9 xl:px-14">
        <header className="sea-header relative z-20 max-w-[30rem]">
          <p
            data-sea-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            {sea.label}
          </p>

          <h2 id="sea-heading" className="sea-headline mt-1.5 md:mt-2">
            <span data-sea-word className="sea-headline__line">
              {sea.title[0]}
            </span>
            <span data-sea-word className="sea-headline__line">
              <em className="sea-headline__accent">{sea.accentWord}</em>
              {sea.title[1].replace(sea.accentWord, "")}
            </span>
          </h2>

          <p
            data-sea-reveal
            className="mt-2.5 max-w-[26rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.65] text-charcoal md:mt-3 md:text-[1.15rem]"
          >
            {sea.copy}
          </p>

          <div data-sea-reveal className="mt-3.5 md:mt-4">
            <a
              href={sea.cta.href}
              className="sea-btn"
              data-cursor="Menu"
            >
              {sea.cta.label}
              <span aria-hidden>→</span>
            </a>
          </div>
        </header>

        <div className="sea-tide relative mt-4 w-full md:mt-5 lg:mt-5">
          <div
            className="sea-ink-wash pointer-events-none absolute inset-[6%_4%] z-[1]"
            aria-hidden
          />

          <div
            data-sea-decor
            data-parallax-tide
            className="pointer-events-none absolute inset-x-0 bottom-[12%] z-[2] h-[clamp(2.25rem,6vw,3.5rem)]"
            aria-hidden
          >
            <TideStroke className="h-full w-full" />
          </div>

          <div className="sea-constellation relative z-10 mx-auto aspect-[2/1] w-full max-w-[920px] md:aspect-[21/9] md:max-w-[1040px] lg:max-w-[1120px]">
            {mainPearl && (
              <div
                data-sea-pearl
                data-parallax-main
                data-cursor="View"
                className="sea-pearl sea-pearl--main absolute left-[14%] top-[4%] z-10 aspect-square w-[52%] shadow-[0_22px_55px_rgba(40,30,20,0.15)] transition-transform duration-500 hover:scale-[1.015] md:left-[18%] md:top-[2%] md:w-[48%]"
              >
                <Image
                  src={mainPearl.image}
                  alt={mainPearl.alt}
                  fill
                  sizes="(max-width: 768px) 75vw, 560px"
                  className="object-cover"
                />
              </div>
            )}

            {smallPearl && (
              <div className="absolute right-[1%] top-0 z-20 w-[28%] md:right-[2%] md:w-[24%]">
                <div
                  data-sea-pearl
                  data-parallax-side
                  data-cursor="View"
                  className="sea-pearl sea-pearl--organic relative aspect-square w-full shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105"
                >
                  <Image
                    src={smallPearl.image}
                    alt={smallPearl.alt}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                {smallPearl.caption && (
                  <p
                    data-sea-caption
                    className="mt-1.5 whitespace-nowrap text-center font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.22em] text-[color:var(--hero-ink-soft)]"
                  >
                    {smallPearl.caption}
                  </p>
                )}
              </div>
            )}

            {midPearl && (
              <div className="absolute bottom-[6%] left-0 z-20 w-[30%] md:bottom-[8%] md:left-[1%] md:w-[26%]">
                <div
                  data-sea-pearl
                  data-parallax-side
                  data-cursor="View"
                  className="sea-pearl sea-pearl--organic-alt relative aspect-square w-full shadow-[0_14px_36px_rgba(40,30,20,0.16)] transition-transform duration-500 hover:scale-105"
                >
                  <Image
                    src={midPearl.image}
                    alt={midPearl.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                {midPearl.caption && (
                  <p
                    data-sea-caption
                    className="mt-1.5 whitespace-nowrap text-center font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.22em] text-[color:var(--hero-ink-soft)]"
                  >
                    {midPearl.caption}
                  </p>
                )}
              </div>
            )}

            <p
              data-sea-script
              className="sea-script pointer-events-none absolute bottom-[18%] right-[1%] z-30 hidden max-w-[8rem] text-right font-[family-name:var(--font-script)] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.25] text-[color:var(--hero-gold-script)] lg:block"
            >
              {sea.script}
            </p>

            <p
              data-sea-reveal
              className="pointer-events-none absolute -bottom-1 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center font-[family-name:var(--font-script)] text-[1.1rem] leading-none text-[color:var(--hero-gold-script)] lg:hidden"
            >
              {sea.script}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
