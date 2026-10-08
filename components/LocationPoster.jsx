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

export default function LocationPoster() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-loc-reveal]");
    const glen = root.querySelector("[data-glen]");
    const waverley = root.querySelector("[data-waverley]");
    const panel = root.querySelector("[data-loc-panel]");
    const photo = root.querySelector("[data-loc-photo]");
    const curtain = root.querySelector("[data-loc-curtain]");
    const paths = root.querySelectorAll("[data-map-path]");
    const decor = root.querySelectorAll("[data-loc-decor]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, glen, waverley, panel, decor], {
          clearProps: "all",
          opacity: 1,
          xPercent: 0,
          y: 0,
        });
        if (photo) gsap.set(photo, { scale: 1 });
        if (curtain) gsap.set(curtain, { yPercent: -101 });
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
        { opacity: 0, y: 18 },
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
        glen,
        { xPercent: -10, opacity: 0.4 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        waverley,
        { xPercent: 10, opacity: 0.4 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        panel,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        }
      );

      if (curtain) {
        gsap.fromTo(
          curtain,
          { yPercent: 0 },
          {
            yPercent: -101,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: root, start: "top 74%", once: true },
          }
        );
      }

      if (photo) {
        gsap.fromTo(
          photo,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 74%", once: true },
          }
        );
      }

      paths.forEach((path) => {
        const len = path.getTotalLength?.() || 400;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="visit"
      ref={rootRef}
      className="location-editorial relative overflow-x-clip"
      aria-labelledby="location-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
      >
        <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
          <path
            data-map-path
            d="M80 100 H1120 M80 220 H1120 M80 340 H1120 M80 460 H1120 M80 580 H1120"
            stroke="rgba(167,139,83,0.28)"
            strokeWidth="1"
          />
          <path
            data-map-path
            d="M180 30 V670 M360 30 V670 M540 30 V670 M720 30 V670 M900 30 V670 M1080 30 V670"
            stroke="rgba(167,139,83,0.16)"
            strokeWidth="1"
          />
          <path
            data-map-path
            d="M120 620 C320 460, 520 560, 780 320 S1080 180, 1140 130"
            stroke="rgba(167,139,83,0.5)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div
        data-loc-decor
        className="pointer-events-none absolute -right-8 top-6 z-[1] w-[min(30vw,160px)] rotate-[18deg] opacity-40 md:w-[190px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="location-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14 xl:px-14">
        <header className="max-w-[34rem]">
          <p
            data-loc-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            11 — Location
          </p>
          <h2
            id="location-heading"
            data-loc-reveal
            className="sr-only"
          >
            Location — Glen Waverley
          </h2>
        </header>

        <div className="mt-3 grid grid-cols-1 items-center gap-6 md:mt-4 md:grid-cols-12 md:gap-7 lg:gap-8">
          <div className="relative text-center md:col-span-6 md:text-left lg:col-span-7">
            <p
              data-glen
              className="location-place leading-[0.82] tracking-[0.04em] text-ink/90"
            >
              GLEN
            </p>
            <p
              data-waverley
              className="location-place location-place--sub mt-0.5 leading-[0.82] tracking-[0.05em] text-ink/80"
            >
              WAVERLEY
            </p>
            <p
              data-loc-reveal
              className="mx-auto mt-2.5 max-w-md font-[family-name:var(--font-display)] text-[1.1rem] font-medium leading-relaxed text-charcoal md:mx-0"
            >
              Kerrie Road Shops — a short stop for shared seafood and Chinese
              dining in Melbourne&apos;s east.
            </p>
          </div>

          <div className="relative md:col-span-6 lg:col-span-5">
            <div
              data-cursor="View"
              className="location-photo relative mb-3 aspect-[16/10] overflow-hidden md:mb-4"
            >
              <Image
                src={
                  business.gallery[4]?.src ||
                  business.images.interior ||
                  business.images.cta
                }
                alt="Dining atmosphere at Sisters of Pearl, Glen Waverley"
                fill
                sizes="(max-width:1024px) 92vw, 40vw"
                className="object-cover"
                data-loc-photo
              />
              <span
                data-loc-curtain
                className="location-photo__curtain"
                aria-hidden
              />
            </div>

            <div
              data-loc-panel
              data-cursor="Go"
              className="location-panel"
            >
              <p className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.26em] text-[color:var(--hero-gold)]">
                Sisters of Pearl
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold leading-snug text-ink md:text-[1.4rem]">
                {business.address.street}
                <br />
                {business.address.suburb} {business.address.state}{" "}
                {business.address.postcode}
              </p>
              <a
                href={business.phoneTel}
                className="mt-2 block text-[1rem] font-medium tracking-wide text-charcoal transition-colors hover:text-ink"
              >
                {business.phone}
              </a>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={business.mapsUrl}
                  className="location-btn"
                  data-cursor="Go"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={business.phoneTel}
                  className="location-btn-ghost"
                  data-cursor="Call"
                >
                  Call
                </a>
                <a
                  href={business.emailMailto}
                  className="location-btn-ghost"
                  data-cursor="Email"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
