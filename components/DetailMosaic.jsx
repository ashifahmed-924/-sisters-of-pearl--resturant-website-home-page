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

export default function DetailMosaic() {
  const rootRef = useRef(null);
  const panelsRef = useRef([]);
  const reduced = useReducedMotion();
  const [openId, setOpenId] = useState(business.mosaic[0]?.id ?? null);
  const items = business.mosaic;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-mosaic-reveal]");
    const panels = root.querySelectorAll("[data-mosaic-panel]");
    const curtains = root.querySelectorAll("[data-mosaic-curtain]");
    const decor = root.querySelectorAll("[data-mosaic-decor]");
    const imgs = root.querySelectorAll("[data-mosaic-img]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, panels, decor], {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        gsap.set(curtains, { yPercent: -101 });
        gsap.set(imgs, { scale: 1 });
        return;
      }

      gsap.fromTo(
        decor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        revealEls,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        }
      );

      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.08 * i,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%", once: true },
          }
        );
      });

      curtains.forEach((curtain) => {
        gsap.fromTo(
          curtain,
          { yPercent: 0 },
          {
            yPercent: -101,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: curtain.parentElement,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img.closest("[data-mosaic-panel]"),
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced) return undefined;

    const panels = panelsRef.current.filter(Boolean);
    if (!panels.length) return undefined;

    const desktop = window.matchMedia("(min-width: 768px)").matches;

    panels.forEach((panel) => {
      const isOpen = panel.dataset.mosaicId === openId;
      const img = panel.querySelector("[data-mosaic-img]");
      const caption = panel.querySelector("[data-mosaic-caption]");
      const hint = panel.querySelector("[data-mosaic-hint]");

      if (desktop) {
        gsap.to(panel, {
          flexGrow: isOpen ? 2.35 : 0.72,
          duration: 0.85,
          ease: "power3.inOut",
        });
      } else {
        gsap.to(panel, {
          height: isOpen ? 280 : 148,
          duration: 0.75,
          ease: "power3.inOut",
        });
      }

      if (img) {
        gsap.to(img, {
          scale: isOpen ? 1.04 : 1,
          duration: 0.9,
          ease: "power2.out",
        });
      }

      if (caption) {
        gsap.to(caption, {
          opacity: isOpen ? 1 : 0.72,
          y: isOpen ? 0 : 6,
          duration: 0.45,
          ease: "power2.out",
        });
      }

      if (hint) {
        gsap.to(hint, {
          opacity: isOpen ? 0 : 1,
          duration: 0.35,
        });
      }
    });

    return undefined;
  }, [openId, reduced]);

  const togglePanel = (id) => {
    setOpenId((prev) => (prev === id ? prev : id));
  };

  return (
    <section
      ref={rootRef}
      id="details"
      className="mosaic-editorial relative overflow-x-clip"
      aria-labelledby="mosaic-heading"
    >
      <div
        data-mosaic-decor
        className="pointer-events-none absolute -right-8 top-6 z-[1] w-[min(32vw,170px)] rotate-[18deg] opacity-40 md:w-[200px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="mosaic-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-mosaic-decor
        className="pointer-events-none absolute -bottom-3 -left-10 z-[1] w-[min(38vw,190px)] -rotate-[8deg] opacity-35 md:w-[220px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="mosaic-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-14">
        <header className="max-w-[34rem]">
          <p
            data-mosaic-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            09 — Details
          </p>
          <h2
            id="mosaic-heading"
            data-mosaic-reveal
            className="mosaic-headline mt-2.5 md:mt-3"
          >
            Texture at the{" "}
            <em className="mosaic-headline__accent">rim</em>
          </h2>
          <p
            data-mosaic-reveal
            className="mt-3 max-w-[28rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.65] text-charcoal md:text-[1.15rem]"
          >
            Sauce, steam, crisp edges and tableware — the quiet details of
            dining.
          </p>
          <p
            data-mosaic-reveal
            className="mt-3 font-[family-name:var(--font-micro)] text-[9px] uppercase tracking-[0.22em] text-[color:var(--hero-ink-soft)]"
          >
            Tap a panel to open
          </p>
        </header>

        <div
          className="mosaic-accord mt-8 flex flex-col gap-3 md:mt-10 md:flex-row md:gap-4"
          role="list"
        >
          {items.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                data-mosaic-panel
                data-mosaic-id={item.id}
                data-cursor="View"
                aria-expanded={isOpen}
                aria-label={`${item.label}. ${isOpen ? "Open" : "Closed"} panel`}
                ref={(el) => {
                  panelsRef.current[index] = el;
                }}
                onClick={() => togglePanel(item.id)}
                className={`mosaic-panel group relative overflow-hidden text-left ${
                  isOpen ? "mosaic-panel--open" : "mosaic-panel--closed"
                }`}
                style={{ flexGrow: isOpen ? 2.35 : 0.72 }}
              >
                <div className="mosaic-panel__media">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width:768px) 40vw, 100vw"
                    className="object-cover"
                    data-mosaic-img
                  />
                  <span
                    data-mosaic-curtain
                    className="mosaic-panel__curtain"
                    aria-hidden
                  />
                  <span className="mosaic-panel__veil" aria-hidden />
                </div>

                <div
                  data-mosaic-caption
                  className="mosaic-panel__caption"
                >
                  <span className="mosaic-panel__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mosaic-panel__label">{item.label}</span>
                </div>

                <span
                  data-mosaic-hint
                  className="mosaic-panel__hint"
                  aria-hidden
                >
                  Open
                </span>
              </button>
            );
          })}
        </div>

        <p
          data-mosaic-reveal
          className="mt-6 hidden font-[family-name:var(--font-script)] text-[1.2rem] text-[color:var(--hero-gold-script)] md:block"
        >
          Quiet details, shared moments
        </p>
      </div>
    </section>
  );
}
