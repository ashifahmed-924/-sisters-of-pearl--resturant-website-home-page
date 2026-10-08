"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, getVerifiedMenu } from "@/data/sistersOfPearl";
import useReducedMotion from "@/hooks/useReducedMotion";
import MenuCategoryNav from "./MenuCategoryNav";
import MenuCarousel, { CarouselArrows } from "./MenuCarousel";
import { PagodaMark } from "./MenuIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MenuGroup({ category, reduced }) {
  const carouselRef = useRef(null);
  const groupRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [edges, setEdges] = useState({ canPrev: false, canNext: true });

  const onEdgeChange = useCallback((next) => setEdges(next), []);

  useEffect(() => {
    const root = groupRef.current;
    if (!root || reduced) return undefined;

    const cards = root.querySelectorAll("[data-menu-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced, category.id, expanded]);

  return (
    <div
      ref={groupRef}
      id={`menu-${category.id}`}
      data-menu-group={category.id}
      className="menu-group"
    >
      <div className="menu-group__header">
        <div className="menu-group__title-row">
          <h3 className="menu-group__title">{category.label}</h3>
          <span className="menu-group__rule" aria-hidden />
          {category.tagline && (
            <p className="menu-group__tagline">{category.tagline}</p>
          )}
        </div>
        <div className="menu-group__actions">
          <button
            type="button"
            className="menu-group__view-all"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "View all"}
            <span aria-hidden>{expanded ? " ↑" : " →"}</span>
          </button>
          {!expanded && (
            <CarouselArrows
              canPrev={edges.canPrev}
              canNext={edges.canNext}
              onPrev={() => carouselRef.current?.prev()}
              onNext={() => carouselRef.current?.next()}
            />
          )}
        </div>
      </div>

      <MenuCarousel
        ref={carouselRef}
        items={category.items}
        expanded={expanded}
        onEdgeChange={onEdgeChange}
      />
    </div>
  );
}

export default function MenuSection() {
  const categories = useMemo(() => getVerifiedMenu(), []);
  const [activeId, setActiveId] = useState("all");
  const sectionRef = useRef(null);
  const mainRef = useRef(null);
  const pendingScrollRef = useRef(null);
  const reduced = useReducedMotion();

  const visibleCategories = useMemo(() => {
    if (activeId === "all") return categories;
    return categories.filter((c) => c.id === activeId);
  }, [activeId, categories]);

  const selectCategory = (id) => {
    pendingScrollRef.current = id;
    setActiveId(id);
  };

  useEffect(() => {
    const id = pendingScrollRef.current;
    if (!id) return;
    pendingScrollRef.current = null;

    const target =
      id === "all"
        ? mainRef.current
        : document.getElementById(`menu-${id}`);
    if (!target) return;

    const offset = id === "all" ? 90 : 110;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, [activeId, visibleCategories]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    const ctx = gsap.context(() => {
      const asideMedia = section.querySelector("[data-menu-aside-media]");
      const asideText = section.querySelectorAll("[data-menu-aside-reveal]");
      const pagoda = section.querySelector("[data-menu-pagoda]");
      const blossom = section.querySelector("[data-menu-blossom]");
      const mainHead = section.querySelectorAll("[data-menu-main-reveal]");

      if (asideMedia) {
        gsap.fromTo(
          asideMedia,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          }
        );

        gsap.to(asideMedia, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (asideText.length) {
        gsap.fromTo(
          asideText,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          }
        );
      }

      if (pagoda) {
        gsap.fromTo(
          pagoda,
          { opacity: 0, y: 18 },
          {
            opacity: 0.85,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 65%", once: true },
          }
        );
        gsap.to(pagoda, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (blossom) {
        gsap.fromTo(
          blossom,
          { opacity: 0, x: 40, rotate: -4 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 72%", once: true },
          }
        );
        gsap.to(blossom, {
          y: 28,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (mainHead.length) {
        gsap.fromTo(
          mainHead,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: mainRef.current, start: "top 78%", once: true },
          }
        );
      }
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, [reduced, categories]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="menu-editorial"
      aria-labelledby="menu-heading"
    >
      <div className="menu-editorial__layout">
        <aside className="menu-editorial__aside">
          <div className="menu-editorial__aside-media" data-menu-aside-media>
            <Image
              src={business.images.heroMain}
              alt="Steamed dumplings lifted from a bamboo basket"
              fill
              sizes="(max-width: 1023px) 100vw, 36vw"
              className="menu-editorial__aside-image"
              priority={false}
            />
            <div className="menu-editorial__aside-shade" aria-hidden />
          </div>

          <div className="menu-editorial__aside-content">
            <p className="menu-editorial__aside-label" data-menu-aside-reveal>
              Our Menu
            </p>
            <p
              className="menu-editorial__aside-title"
              data-menu-aside-reveal
            >
              An editorial tasting of the table.
            </p>
            <p className="menu-editorial__aside-copy" data-menu-aside-reveal>
              A refined selection of Cantonese classics, fresh seafood and
              seasonal ingredients, crafted for sharing and unforgettable
              moments.
            </p>
            <p
              className="menu-editorial__aside-script"
              data-menu-aside-reveal
            >
              Good Food Brings People Together.
            </p>

            <div className="menu-editorial__aside-foot" data-menu-aside-reveal>
              <span data-menu-pagoda className="menu-editorial__pagoda-wrap">
                <PagodaMark className="menu-editorial__pagoda" />
              </span>
              <p className="menu-editorial__aside-place">
                {business.address.suburb} / Melbourne
              </p>
            </div>
          </div>
        </aside>

        <div ref={mainRef} className="menu-editorial__main">
          <div
            className="menu-editorial__blossom"
            data-menu-blossom
            aria-hidden
          >
            <Image
              src={business.images.heroCherry}
              alt=""
              fill
              sizes="280px"
              className="menu-editorial__blossom-image"
            />
          </div>

          <header className="menu-editorial__header">
            <p className="menu-editorial__kicker" data-menu-main-reveal>
              03 / The Menu
            </p>
            <div className="menu-editorial__header-row">
              <div>
                <h2
                  id="menu-heading"
                  className="menu-editorial__title"
                  data-menu-main-reveal
                >
                  Our Menu
                </h2>
                <p
                  className="menu-editorial__subtitle"
                  data-menu-main-reveal
                >
                  Traditional flavours · Modern experiences
                </p>
              </div>
              <p className="menu-editorial__intro" data-menu-main-reveal>
                Dishes are made for sharing, using the freshest ingredients and
                time-honoured Cantonese techniques. Current prices — please
                enquire when booking.
              </p>
            </div>
          </header>

          <div data-menu-main-reveal>
            <MenuCategoryNav
              categories={categories}
              activeId={activeId}
              onSelect={selectCategory}
            />
          </div>

          <div className="menu-editorial__groups">
            {visibleCategories.map((cat) => (
              <MenuGroup key={cat.id} category={cat} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
