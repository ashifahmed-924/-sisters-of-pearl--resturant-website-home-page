"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business } from "@/data/sistersOfPearl";
import Button from "./ui/Button";
import SectionLabel from "./motion/SectionLabel";
import useReducedMotion from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LunchBanquet() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;

    const panels = root.querySelectorAll("[data-panel]");
    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const img = panel.querySelector("[data-panel-img]");
        const letters = panel.querySelectorAll("[data-panel-letter]");

        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          letters,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 80%", once: true },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="lunch-editorial relative bg-porcelain px-5 py-12 md:px-8 md:py-14 lg:px-12"
    >
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel number="05" label="Sets & sharing" />
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[0.01em] text-ink">
          Lunch. Banquet. Together.
        </h2>
        <p className="mt-2.5 max-w-xl text-[1.02rem] font-medium leading-relaxed text-charcoal md:text-[1.1rem]">
          Discover our current lunch and banquet selections. Exact set titles and
          pricing can change — enquire when you book.
        </p>

        <div className="mt-6 space-y-4">
          {business.offers.map((offer) => (
            <article
              key={offer.id}
              data-panel
              className="relative grid min-h-[200px] grid-cols-1 overflow-hidden border border-[color:var(--border-gold)] md:min-h-[220px] md:grid-cols-12"
            >
              <div className="relative col-span-1 overflow-hidden md:col-span-7">
                <div
                  data-panel-img
                  className="relative h-40 w-full md:absolute md:inset-0 md:h-full"
                >
                  <Image
                    src={offer.image}
                    alt={`${offer.title} dining at Sisters of Pearl`}
                    fill
                    sizes="(min-width:768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="col-span-1 flex flex-col justify-between bg-pearl p-5 md:col-span-5 md:p-6">
                <div>
                  <p className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.24em] text-champagne">
                    {offer.eyebrow}
                  </p>
                  <h3 className="mt-2 overflow-hidden font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[0.04em] text-ink md:text-4xl">
                    {offer.title.split("").map((ch, i) => (
                      <span key={i} className="inline-block overflow-hidden">
                        <span data-panel-letter className="inline-block">
                          {ch}
                        </span>
                      </span>
                    ))}
                  </h3>
                  <p className="mt-3 text-[1.02rem] font-medium leading-relaxed text-charcoal">
                    {offer.body}
                  </p>
                </div>
                <div className="mt-5">
                  <Button href={business.emailMailto}>{offer.cta} / Book</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
