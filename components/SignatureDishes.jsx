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

function FeatureIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: "kitchen-feature__svg",
  };

  if (type === "leaf") {
    return (
      <svg {...common}>
        <path
          d="M5 14c4-1 7-4 9-9 4 6 3 12-1 15-3 2-6 1-8-1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 16c2-3 5-5 9-6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "bowl") {
    return (
      <svg {...common}>
        <path
          d="M4.5 12.5h15c-.4 3.8-3.5 6.5-7.5 6.5s-7.1-2.7-7.5-6.5Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M9 8.5c.4-1.4 1.5-2.5 3-2.5s2.6 1.1 3 2.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M12 4.5v1.2"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "chef") {
    return (
      <svg {...common}>
        <path
          d="M8.5 10.5c-1.4-.2-2.5-1.4-2.5-2.9 0-1.5 1.1-2.7 2.6-2.9C9 3.4 10.4 2.5 12 2.5s3 0.9 3.4 2.2c1.5.2 2.6 1.4 2.6 2.9 0 1.5-1.1 2.7-2.5 2.9"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 10.5v3.2c0 .8.4 1.5 1.1 1.9l.9.5v3.4h3v-3.4l.9-.5c.7-.4 1.1-1.1 1.1-1.9v-3.2"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M12 20s-6.2-3.8-6.2-8.2A3.6 3.6 0 0 1 12 9.2a3.6 3.6 0 0 1 6.2 2.6C18.2 16.2 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PearlAccent() {
  return (
    <div className="kitchen-pearl" aria-hidden data-kitchen-pearl>
      <span className="kitchen-pearl__ring" data-kitchen-pearl-ring />
      <span className="kitchen-pearl__core" data-kitchen-pearl-core />
      <span className="kitchen-pearl__glow" data-kitchen-pearl-glow />
    </div>
  );
}

function DishCard({ dish, flip = false, className = "" }) {
  return (
    <article
      className={`kitchen-card ${flip ? "kitchen-card--flip" : ""} ${className}`}
      data-kitchen-card
      data-cursor="Menu"
    >
      <div className="kitchen-card__media" data-kitchen-media>
        <div className="kitchen-card__img-wrap">
          <Image
            src={dish.image}
            alt={dish.alt}
            fill
            sizes="(min-width:1024px) 280px, (min-width:768px) 40vw, 90vw"
            className="kitchen-card__img object-cover"
            data-kitchen-img
          />
        </div>
        <span className="kitchen-card__curtain" data-kitchen-curtain aria-hidden />
      </div>

      <div className="kitchen-card__body">
        <p className="kitchen-card__number">
          {dish.number}
          <span aria-hidden> —</span>
        </p>
        <h3 className="kitchen-card__title">{dish.name}</h3>
        <p className="kitchen-card__desc">{dish.description}</p>
        <a
          href={dish.href || "#menu"}
          className="kitchen-card__arrow"
          aria-label={`View ${dish.name} on the menu`}
          data-cursor="Menu"
        >
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

export default function SignatureDishes() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const dishes = business.signatureDishes;
  const features = business.kitchenFeatures;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const hoverCleanups = [];

    const ctx = gsap.context(() => {
      const headerBits = root.querySelectorAll("[data-kitchen-header]");
      const cards = root.querySelectorAll("[data-kitchen-card]");
      const featuresEls = root.querySelectorAll("[data-kitchen-feature]");
      const decor = root.querySelectorAll("[data-kitchen-decor]");
      const pearl = root.querySelector("[data-kitchen-pearl]");
      const pearlRing = root.querySelector("[data-kitchen-pearl-ring]");
      const pearlCore = root.querySelector("[data-kitchen-pearl-core]");
      const pearlGlow = root.querySelector("[data-kitchen-pearl-glow]");

      if (reduced) {
        gsap.set(
          [...headerBits, ...cards, ...featuresEls, ...decor, pearl].filter(
            Boolean
          ),
          { clearProps: "all", opacity: 1, y: 0, x: 0, scale: 1 }
        );
        root.querySelectorAll("[data-kitchen-curtain]").forEach((el) => {
          gsap.set(el, { yPercent: -101 });
        });
        return;
      }

      gsap.fromTo(
        headerBits,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      );

      cards.forEach((card, i) => {
        const curtain = card.querySelector("[data-kitchen-curtain]");
        const img = card.querySelector("[data-kitchen-img]");
        const body = card.querySelector(".kitchen-card__body");

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.08 * i,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );

        if (curtain) {
          gsap.fromTo(
            curtain,
            { yPercent: 0 },
            {
              yPercent: -101,
              duration: 1.15,
              ease: "power4.out",
              scrollTrigger: { trigger: card, start: "top 86%", once: true },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.35,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 86%", once: true },
            }
          );

          gsap.to(img, {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (body) {
          gsap.fromTo(
            body.children,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.06,
              delay: 0.18,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 86%", once: true },
            }
          );
        }

        const onEnter = () => {
          if (img) gsap.to(img, { scale: 1.05, duration: 0.7, ease: "power2.out" });
          const arrow = card.querySelector(".kitchen-card__arrow");
          if (arrow) {
            gsap.to(arrow, {
              backgroundColor: "rgba(199,168,107,0.22)",
              borderColor: "rgba(199,168,107,0.7)",
              duration: 0.35,
            });
          }
        };
        const onLeave = () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
          const arrow = card.querySelector(".kitchen-card__arrow");
          if (arrow) {
            gsap.to(arrow, {
              backgroundColor: "transparent",
              borderColor: "rgba(199,168,107,0.45)",
              duration: 0.35,
            });
          }
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        hoverCleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      if (pearl) {
        gsap.fromTo(
          pearl,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: pearl, start: "top 92%", once: true },
          }
        );

        if (pearlRing) {
          gsap.to(pearlRing, {
            scale: 1.35,
            opacity: 0,
            duration: 2.4,
            ease: "power1.out",
            repeat: -1,
          });
        }
        if (pearlCore) {
          gsap.to(pearlCore, {
            scale: 1.08,
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
        if (pearlGlow) {
          gsap.to(pearlGlow, {
            opacity: 0.55,
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      }

      gsap.fromTo(
        decor,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.3,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        featuresEls,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.querySelector("[data-kitchen-features]"),
            start: "top 90%",
            once: true,
          },
        }
      );
    }, root);

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="from-the-kitchen"
      className="kitchen-section"
      aria-labelledby="kitchen-heading"
    >
      <span
        className="kitchen-brush kitchen-brush--top"
        data-kitchen-decor
        aria-hidden
      />
      <span
        className="kitchen-brush kitchen-brush--right"
        data-kitchen-decor
        aria-hidden
      />

      <div className="kitchen-section__inner">
        <header className="kitchen-header">
          <div className="kitchen-header__lead">
            <p className="kitchen-header__label" data-kitchen-header>
              <span>02</span>
              <span aria-hidden>/</span>
              <span>From the kitchen</span>
            </p>
            <h2
              id="kitchen-heading"
              className="kitchen-header__title"
              data-kitchen-header
            >
              A few from the{" "}
              <em className="kitchen-header__accent">kitchen</em>.
            </h2>
            <div className="kitchen-header__actions" data-kitchen-header>
              <a
                href="#menu"
                className="kitchen-header__cta"
                data-cursor="Menu"
              >
                View full menu
                <span aria-hidden>→</span>
              </a>
              <PearlAccent />
            </div>
          </div>

          <p className="kitchen-header__copy" data-kitchen-header>
            Signature plates guests return for — seafood, shared favourites
            and Cantonese-inspired cooking from our Glen Waverley kitchen.
          </p>
        </header>

        <div className="kitchen-gallery" data-kitchen-gallery>
          <DishCard dish={dishes[0]} className="kitchen-card--01" />
          <DishCard dish={dishes[1]} flip className="kitchen-card--02" />
          <DishCard dish={dishes[2]} className="kitchen-card--03" />
        </div>

        <ul className="kitchen-features" data-kitchen-features>
          {features.map((feature) => (
            <li
              key={feature.id}
              className="kitchen-feature"
              data-kitchen-feature
            >
              <span className="kitchen-feature__icon">
                <FeatureIcon type={feature.icon} />
              </span>
              <span className="kitchen-feature__label">{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
