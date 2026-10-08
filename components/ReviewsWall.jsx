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

const THEME_IMAGES = [
  business.gallery[0]?.src || business.images.seafoodWide,
  business.gallery[3]?.src || business.images.heroPlate,
  business.gallery[5]?.src || business.images.interior,
  business.gallery[2]?.src || business.images.cta,
];

export default function ReviewsWall() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-review-reveal]");
    const keywords = root.querySelectorAll("[data-keyword]");
    const themes = root.querySelectorAll("[data-theme]");
    const photos = root.querySelectorAll("[data-review-photo]");
    const curtains = root.querySelectorAll("[data-review-curtain]");
    const decor = root.querySelectorAll("[data-review-decor]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, keywords, themes, decor], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
        });
        gsap.set(photos, { scale: 1 });
        gsap.set(curtains, { yPercent: -101 });
        return;
      }

      gsap.fromTo(
        decor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.15,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        }
      );

      gsap.fromTo(
        keywords,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      themes.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            delay: 0.05 * i,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      curtains.forEach((curtain) => {
        gsap.fromTo(
          curtain,
          { yPercent: 0 },
          {
            yPercent: -101,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: curtain.parentElement,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      photos.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img.closest("[data-review-frame]"),
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="reviews"
      className="reviews-editorial relative overflow-x-clip"
      aria-labelledby="reviews-heading"
    >
      <div
        data-review-decor
        className="pointer-events-none absolute -right-10 top-4 z-[1] w-[min(34vw,180px)] rotate-[16deg] opacity-40 md:w-[210px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="reviews-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-review-decor
        className="pointer-events-none absolute -bottom-6 -left-12 z-[1] w-[min(36vw,190px)] -rotate-[10deg] opacity-35 md:w-[220px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="reviews-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 xl:px-14">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12 md:gap-8 lg:gap-10">
          <header className="md:col-span-5 xl:pr-4">
            <p
              data-review-reveal
              className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
            >
              10 — Public customer feedback
            </p>
            <h2
              id="reviews-heading"
              data-review-reveal
              className="reviews-headline mt-2.5 md:mt-3"
            >
              What guests{" "}
              <em className="reviews-headline__accent">notice</em>
            </h2>
            <p
              data-review-reveal
              className="mt-3 max-w-[26rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.65] text-charcoal md:text-[1.15rem]"
            >
              Themes that surface again and again in public reviews — seafood,
              sharing, presentation and service.
            </p>

            <div
              data-review-reveal
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5"
            >
              {business.reviewThemes.map((theme) => (
                <span
                  key={theme.id}
                  className="overflow-hidden font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.24em] text-antique"
                >
                  <span data-keyword className="inline-block">
                    {theme.keyword}
                  </span>
                </span>
              ))}
            </div>

            {business.google?.rating && (
              <p
                data-review-reveal
                className="mt-5 font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.2em] text-charcoal"
              >
                Google rating listed at research:{" "}
                {business.google.rating.toFixed(1)} · figures can change
              </p>
            )}
          </header>

          <div className="md:col-span-7">
            <div className="reviews-photos mb-4 grid grid-cols-2 gap-2 sm:gap-2.5 md:mb-5 md:grid-cols-4">
              {THEME_IMAGES.map((src, i) => (
                <div
                  key={src + i}
                  data-review-frame
                  data-cursor="View"
                  className={`reviews-photo relative overflow-hidden ${
                    i === 0 ? "aspect-[4/5] sm:aspect-square" : "aspect-square"
                  } ${i > 1 ? "hidden md:block" : ""}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width:768px) 45vw, 160px"
                    className="object-cover"
                    data-review-photo
                  />
                  <span
                    data-review-curtain
                    className="reviews-photo__curtain"
                    aria-hidden
                  />
                </div>
              ))}
            </div>

            <ul className="reviews-list space-y-0">
              {business.reviewThemes.map((theme, index) => (
                <li
                  key={theme.id}
                  data-theme
                  className="reviews-theme"
                >
                  <span className="reviews-theme__num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.22em] text-[color:var(--hero-gold-script)]">
                      {theme.keyword}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-[1.05rem] font-medium leading-relaxed text-charcoal md:text-[1.12rem]">
                      {theme.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
