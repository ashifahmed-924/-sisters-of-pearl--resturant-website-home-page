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

export default function FinalCTA() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-cta-reveal]");
    const join = root.querySelector("[data-cta-join]");
    const table = root.querySelector("[data-cta-table]");
    const oval = root.querySelector("[data-cta-oval]");
    const image = root.querySelector("[data-cta-image]");
    const secondary = root.querySelector("[data-cta-secondary]");
    const decor = root.querySelectorAll("[data-cta-decor]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, join, table, oval, secondary, decor], {
          clearProps: "all",
          opacity: 1,
          xPercent: 0,
          y: 0,
          scaleX: 1,
        });
        if (image) gsap.set(image, { clearProps: "clipPath,opacity", opacity: 1 });
        return;
      }

      gsap.fromTo(
        decor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        }
      );

      gsap.fromTo(
        join,
        { xPercent: -12, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 74%", once: true },
        }
      );

      gsap.fromTo(
        table,
        { xPercent: 12, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 74%", once: true },
        }
      );

      gsap.fromTo(
        oval,
        { scaleX: 0.25, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        secondary,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      gsap.fromTo(
        image,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 70%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const primaryHref = business.reservationUrl || business.phoneTel;
  const primaryLabel = business.reservationUrl
    ? "Reserve a table"
    : "Call to reserve";

  return (
    <section
      id="reserve"
      ref={rootRef}
      className="cta-editorial relative overflow-x-clip"
      aria-labelledby="cta-heading"
    >
      <div
        data-cta-decor
        className="pointer-events-none absolute -left-10 top-8 z-[1] w-[min(32vw,170px)] -rotate-[14deg] opacity-40 md:w-[200px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="cta-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-cta-decor
        className="pointer-events-none absolute -bottom-4 -right-8 z-[1] w-[min(34vw,180px)] rotate-[22deg] opacity-35 md:w-[210px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="cta-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-6 px-5 py-10 md:grid-cols-12 md:gap-7 md:px-8 md:py-12 lg:gap-8 lg:px-12 lg:py-14 xl:px-14">
        <div className="relative z-20 text-center md:col-span-5 md:text-left xl:pr-2">
          <p
            data-cta-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            Book a table
          </p>

          <h2
            id="cta-heading"
            className="cta-headline mt-2 md:mt-2.5"
          >
            <span data-cta-join className="block overflow-hidden">
              Join us
            </span>
            <span
              data-cta-table
              className="mt-0.5 block overflow-hidden"
            >
              at the <em className="cta-headline__accent">table</em>
            </span>
          </h2>

          <p
            data-cta-reveal
            className="mx-auto mt-2.5 max-w-[26rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.6] text-charcoal md:mx-0 md:text-[1.15rem]"
          >
            Reserve for lunch or dinner in Glen Waverley — call, email, or find
            your way to Kerrie Road.
          </p>

          <div className="relative mx-auto mt-5 inline-flex flex-col items-center md:mx-0 md:items-start">
            <span
              data-cta-oval
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] border border-[color:var(--border-gold)] md:left-0 md:translate-x-0"
            />
            <a
              href={primaryHref}
              className="cta-btn relative z-10"
              data-cursor="Book"
            >
              {primaryLabel}
              <span aria-hidden>→</span>
            </a>
          </div>

          <div
            data-cta-secondary
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start"
          >
            <a
              href={business.emailMailto}
              className="cta-link"
              data-cursor="Email"
            >
              Email
            </a>
            <a
              href={business.mapsUrl}
              className="cta-link"
              data-cursor="Go"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </div>
        </div>

        <div className="relative z-10 md:col-span-7">
          <div className="cta-stage relative mx-auto w-full max-w-[520px] md:ml-auto md:mr-0 md:max-w-none">
            <div
              data-cta-image
              data-cursor="View"
              className="cta-photo relative aspect-[16/10] w-full overflow-hidden md:aspect-[5/3]"
            >
              <Image
                src={business.images.cta}
                alt="A place set for dinner at Sisters of Pearl"
                fill
                sizes="(max-width:1024px) 92vw, 55vw"
                className="object-cover"
              />
              <span className="cta-photo__veil" aria-hidden />
            </div>

            <div
              data-cta-reveal
              data-cursor="View"
              className="cta-inset absolute -bottom-3 right-3 z-20 hidden aspect-square w-[28%] overflow-hidden shadow-[0_12px_28px_rgba(40,30,20,0.14)] sm:block md:right-5 md:w-[24%] lg:-bottom-4"
            >
              <Image
                src={business.gallery[2]?.src || business.images.interior}
                alt="Table setting detail"
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
