"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/sistersOfPearl";
import SectionLabel from "./motion/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const aspectClass = {
  portrait: "w-[58vw] md:w-[280px] aspect-[3/4]",
  landscape: "w-[72vw] md:w-[420px] aspect-[16/10]",
  square: "w-[62vw] md:w-[300px] aspect-square",
  wide: "w-[85vw] md:w-[520px] aspect-[21/9]",
};

function FilmTide({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 80"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        data-film-tide
        d="M0 42c90-28 180-40 280-34 110 6 200 34 310 36 120 2 230-28 340-40 90-10 180-8 270 10"
        stroke="rgba(166,137,83,0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
        pathLength="1"
      />
      <path
        data-film-tide
        d="M0 56c100-22 190-32 290-26 105 6 195 28 300 30 115 2 220-24 330-34 85-8 170-4 280 12"
        stroke="rgba(90,61,39,0.18)"
        strokeWidth="1"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  );
}

export default function DiningFilmStrip() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const revealEls = section.querySelectorAll("[data-film-reveal]");
    const decor = section.querySelectorAll("[data-film-decor]");
    const tidePaths = section.querySelectorAll("[data-film-tide]");
    const pearls = section.querySelectorAll("[data-film-pearl]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, decor, pearls], {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        gsap.set(tidePaths, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      gsap.set(tidePaths, {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: 0.95,
      });
      gsap.set(pearls, { opacity: 0, scale: 0.6 });

      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        decor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      gsap.to(tidePaths, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power2.inOut",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      gsap.to(pearls, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 68%", once: true },
      });

      pearls.forEach((pearl, i) => {
        gsap.to(pearl, {
          y: i % 2 === 0 ? -10 : 8,
          duration: 2.4 + i * 0.35,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });
    }, section);

    if (reduced) {
      return () => ctx.revert();
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const amount = () => track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const progress = section.querySelector("[data-film-progress]");
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${amount()}`,
              scrub: 1,
            },
          }
        );
      }

      return () => tween.kill();
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="film-strip relative overflow-hidden"
      aria-labelledby="film-heading"
    >
      <span className="film-strip__wash film-strip__wash--left" aria-hidden />
      <span className="film-strip__wash film-strip__wash--right" aria-hidden />

      <div
        data-film-decor
        className="pointer-events-none absolute -right-8 top-8 z-[1] hidden w-[180px] rotate-[16deg] opacity-40 md:block lg:w-[210px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="film-strip__blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-film-decor
        className="pointer-events-none absolute bottom-[4.5rem] -left-12 z-[1] w-[min(42vw,180px)] -rotate-[10deg] opacity-35 md:bottom-20 md:w-[220px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="film-strip__blossom h-auto w-full object-contain"
        />
      </div>

      <div className="film-strip__footer pointer-events-none absolute inset-x-0 bottom-0 z-[5]" aria-hidden>
        <FilmTide className="film-strip__tide h-12 w-full md:h-14" />
        <div className="film-strip__pearls">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              data-film-pearl
              className="film-strip__pearl"
              style={{ left: `${8 + i * 16}%` }}
            />
          ))}
        </div>
        <div className="film-strip__progress-track">
          <span data-film-progress className="film-strip__progress" />
        </div>
      </div>

      <aside
        className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 xl:right-6 xl:flex"
        aria-hidden
      >
        <span
          data-film-reveal
          className="origin-center rotate-180 font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.34em] text-[color:var(--hero-ink-soft)]"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll · Around the table
        </span>
        <span className="h-12 w-px bg-[rgba(90,61,39,0.2)]" />
      </aside>

      <div className="relative z-10 px-5 pt-14 md:absolute md:left-8 md:top-10 md:z-20 md:max-w-md md:px-0 md:pt-0 lg:left-12">
        <SectionLabel number="06" label="Film strip" />
        <h2
          id="film-heading"
          data-film-reveal
          className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.05rem,4.2vw,3.15rem)] font-semibold leading-[1.05] text-ink md:mt-4"
        >
          Around the{" "}
          <em className="film-strip__accent">table</em>
        </h2>
        <p
          data-film-reveal
          className="mt-3 max-w-sm font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-relaxed text-charcoal"
        >
          Moments from the room — seafood, shared plates, and the quiet details
          of dining in Glen Waverley.
        </p>
        <p
          data-film-reveal
          className="mt-4 hidden font-[family-name:var(--font-script)] text-[1.2rem] text-[color:var(--hero-gold-script)] md:block"
        >
          Good food brighter days
        </p>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-10 md:mt-0 md:h-screen md:items-center md:gap-6 md:overflow-visible md:px-12 md:pb-0 md:pt-16"
      >
        {business.gallery.map((item, index) => (
          <figure
            key={item.id}
            data-cursor="View"
            className={`film-strip__frame relative shrink-0 snap-center overflow-hidden ${aspectClass[item.aspect] || aspectClass.landscape}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="80vw"
              className="object-cover"
            />
            <div className="film-strip__frame-edge" aria-hidden />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[rgba(23,23,20,0.55)] to-transparent px-3 pb-3 pt-8">
              <span className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.22em] text-pearl">
                {item.label}
              </span>
              <span className="font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.2em] text-[rgba(250,249,246,0.65)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
