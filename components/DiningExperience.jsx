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

export default function DiningExperience() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-exp-reveal]");
    const photo = root.querySelector("[data-exp-photo]");
    const features = root.querySelectorAll("[data-exp-feature]");
    const decor = root.querySelectorAll("[data-exp-decor]");
    const scriptEl = root.querySelector("[data-exp-script]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, features, decor, scriptEl], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          clipPath: "none",
        });
        if (photo) {
          gsap.set(photo, {
            clearProps: "all",
            opacity: 1,
            scale: 1,
            clipPath: "none",
          });
        }
        return;
      }

      gsap.set(photo, {
        opacity: 0,
        scale: 0.9,
        clipPath: "circle(0% at 50% 50%)",
      });

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

      gsap.to(photo, {
        opacity: 1,
        scale: 1,
        clipPath: "circle(72% at 50% 50%)",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });

      gsap.fromTo(
        features,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        }
      );

      if (scriptEl) {
        gsap.fromTo(
          scriptEl,
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 70%", once: true },
          }
        );
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const main = root.querySelector("[data-parallax-main]");
          const blossom = root.querySelectorAll("[data-parallax-blossom]");
          if (main) gsap.set(main, { yPercent: -5 * p });
          blossom.forEach((el, i) => {
            gsap.set(el, { yPercent: (i === 0 ? -4 : 6) * p });
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="at-the-table"
      className="dining-editorial relative overflow-x-clip"
      aria-labelledby="dining-heading"
    >
      <div
        data-exp-decor
        data-parallax-blossom
        className="pointer-events-none absolute -left-10 top-6 z-[1] w-[min(32vw,160px)] opacity-40 md:w-[190px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="dining-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-exp-decor
        data-parallax-blossom
        className="pointer-events-none absolute -bottom-2 -right-8 z-[1] w-[min(36vw,170px)] rotate-[150deg] opacity-35 md:w-[200px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="dining-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-8 px-5 py-12 md:gap-10 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-16 xl:px-14">
        <div className="relative z-20 lg:col-span-5 xl:pr-2">
          <p
            data-exp-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            08 — At the table
          </p>

          <h2
            id="dining-heading"
            data-exp-reveal
            className="dining-headline mt-2.5 md:mt-3"
          >
            Shared rooms,{" "}
            <em className="dining-headline__accent">open tables</em>
          </h2>

          <p
            data-exp-reveal
            className="mt-3 max-w-[26rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.65] text-charcoal md:text-[1.15rem]"
          >
            A Glen Waverley restaurant setting built around shared Chinese
            dining, seafood and dishes designed for the table.
          </p>

          <ul
            data-exp-reveal
            className="dining-features mt-6 flex flex-wrap items-center gap-y-2"
          >
            {business.diningDetails.map((item, i) => (
              <li
                key={item}
                data-exp-feature
                className="dining-features__item flex items-center"
              >
                {i > 0 && <span className="dining-features__rule" aria-hidden />}
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div data-exp-reveal className="mt-6">
            <a href="#reserve" className="dining-btn" data-cursor="Book">
              Reserve a table
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[380px] lg:col-span-7 lg:mx-0 lg:max-w-none">
          <div className="dining-stage relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[380px] lg:ml-auto lg:mr-6 lg:max-w-[440px] xl:mr-10">
            <div className="dining-ink-wash pointer-events-none absolute inset-[10%] z-[1]" aria-hidden />

            <div
              data-exp-photo
              data-parallax-main
              data-cursor="View"
              className="dining-pearl absolute left-[8%] top-[8%] z-10 aspect-square w-[78%] shadow-[0_20px_48px_rgba(40,30,20,0.14)] transition-transform duration-500 hover:scale-[1.015] lg:left-[10%] lg:top-[7%] lg:w-[74%]"
            >
              <Image
                src={business.images.interior}
                alt="Dining room setting for shared Chinese meals"
                fill
                sizes="(max-width: 768px) 70vw, 400px"
                className="object-cover"
              />
            </div>

            <div
              data-exp-decor
              data-cursor="View"
              className="dining-pearl dining-pearl--small absolute bottom-[6%] right-[2%] z-20 aspect-square w-[28%] overflow-hidden shadow-[0_12px_28px_rgba(40,30,20,0.14)] transition-transform duration-500 hover:scale-105 lg:w-[26%]"
            >
              <Image
                src={business.images.heroPlate || business.images.heroMain}
                alt="Shared plate detail"
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>

            <p
              data-exp-script
              className="pointer-events-none absolute left-0 top-[18%] z-30 hidden max-w-[7.5rem] font-[family-name:var(--font-script)] text-[clamp(1.05rem,1.7vw,1.35rem)] leading-[1.3] text-[color:var(--hero-gold-script)] lg:block"
              style={{ writingMode: "vertical-rl" }}
            >
              Good food brighter days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
