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

function ContactIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className: "h-[18px] w-[18px]",
  };

  if (type === "pin") {
    return (
      <svg {...common}>
        <path
          d="M12 21s-6-5.4-6-10.2A6 6 0 0 1 12 4.8a6 6 0 0 1 6 6C18 15.6 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="12" cy="10.8" r="2.1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...common}>
        <path
          d="M8.2 5.6c.4-.9 1.4-1.3 2.3-1l1.3.4c.8.3 1.2 1.1 1 1.9l-.4 1.4a1.6 1.6 0 0 1-.9 1L10.3 10c.7 1.5 1.9 2.7 3.4 3.4l.7-1.2a1.6 1.6 0 0 1 1-.9l1.4-.4c.8-.2 1.6.2 1.9 1l.4 1.3c.3.9-.1 1.9-1 2.3-1.3.6-2.9.7-4.5.2-2.7-.8-5-3.1-5.8-5.8-.5-1.6-.4-3.2.2-4.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HoursSection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [todayIndex, setTodayIndex] = useState(-1);

  useEffect(() => {
    const jsDay = new Date().getDay();
    const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
    setTodayIndex(map[jsDay] ?? -1);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const revealEls = root.querySelectorAll("[data-hours-reveal]");
    const rows = root.querySelectorAll("[data-hour-row]");
    const lines = root.querySelectorAll("[data-hour-line]");
    const contactBits = root.querySelectorAll("[data-hours-contact]");
    const decor = root.querySelectorAll("[data-hours-decor]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([revealEls, rows, contactBits, decor], {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scaleX: 1,
        });
        gsap.set(lines, { scaleX: 1 });
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
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        lines,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        }
      );

      gsap.fromTo(
        rows,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        }
      );

      gsap.fromTo(
        contactBits,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 74%", once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const contactItems = [
    {
      id: "address",
      icon: "pin",
      label: "Visit us",
      title: business.address.street,
      text: `${business.address.suburb} VIC ${business.address.postcode}`,
      href: business.mapsUrl,
      cta: "Get directions",
    },
    {
      id: "phone",
      icon: "phone",
      label: "Call",
      title: business.phone,
      text: "Lunch · Dinner reservations",
      href: business.phoneTel,
      cta: "Call now",
    },
    {
      id: "email",
      icon: "mail",
      label: "Email",
      title: business.email,
      text: "Bookings and enquiries",
      href: business.emailMailto,
      cta: "Send email",
    },
  ];

  return (
    <section
      id="hours"
      ref={rootRef}
      className="hours-editorial relative overflow-x-clip"
      aria-labelledby="hours-heading"
    >
      <div
        data-hours-decor
        className="pointer-events-none absolute -right-10 top-8 z-[1] w-[min(34vw,180px)] rotate-[14deg] opacity-40 md:top-12 md:w-[220px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="hours-blossom h-auto w-full object-contain"
        />
      </div>

      <div
        data-hours-decor
        className="pointer-events-none absolute -bottom-4 -left-12 z-[1] w-[min(40vw,200px)] -rotate-[12deg] opacity-35 md:w-[240px]"
      >
        <Image
          src={business.images.heroCherry}
          alt=""
          width={800}
          height={600}
          className="hours-blossom h-auto w-full object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-14">
        <header className="max-w-[36rem]">
          <p
            data-hours-reveal
            className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--hero-gold)]"
          >
            12 — Opening hours
          </p>
          <h2
            id="hours-heading"
            data-hours-reveal
            className="hours-headline mt-2.5 md:mt-3"
          >
            When we{" "}
            <em className="hours-headline__accent">open</em>
          </h2>
          <p
            data-hours-reveal
            className="mt-3 max-w-[28rem] font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-[1.65] text-charcoal md:text-[1.15rem]"
          >
            {business.hoursNote}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12 md:gap-8 lg:gap-10 xl:gap-12">
          <div className="md:col-span-6 lg:col-span-7">
            <ul className="hours-list">
              {business.hours.map((row, index) => {
                const isToday = index === todayIndex;
                return (
                  <li key={row.day} className="hours-row relative">
                    <span
                      data-hour-line
                      aria-hidden
                      className="hours-row__line"
                    />
                    <div
                      data-hour-row
                      className={`hours-row__inner ${isToday ? "hours-row__inner--today" : ""}`}
                    >
                      <span className="hours-row__day">
                        {isToday && (
                          <span className="hours-row__dot" aria-hidden />
                        )}
                        {row.day}
                        {isToday && (
                          <span className="hours-row__today">Today</span>
                        )}
                      </span>
                      <span
                        className={`hours-row__time ${row.closed ? "hours-row__time--closed" : ""}`}
                      >
                        {row.hours}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="hours-contact md:col-span-6 lg:col-span-5">
            <div className="hours-contact__panel">
              <p
                data-hours-contact
                className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--hero-gold)]"
              >
                Contact us
              </p>
              <h3
                data-hours-contact
                className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.55rem,2.8vw,2.1rem)] font-semibold leading-tight text-ink"
              >
                Reach the table
              </h3>
              <p
                data-hours-contact
                className="mt-2 font-[family-name:var(--font-display)] text-[1.08rem] font-medium leading-relaxed text-charcoal"
              >
                Call, email, or find us at Kerrie Road Shops in Glen Waverley.
              </p>

              <ul className="mt-6 space-y-5">
                {contactItems.map((item) => (
                  <li key={item.id} data-hours-contact className="hours-contact__item">
                    <span className="hours-contact__icon" aria-hidden>
                      <ContactIcon type={item.icon} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-micro)] text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--hero-gold-script)]">
                        {item.label}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold leading-snug text-ink break-words">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[0.98rem] font-medium leading-relaxed text-charcoal">
                        {item.text}
                      </p>
                      <a
                        href={item.href}
                        className="hours-contact__link mt-2 inline-flex"
                        data-cursor="Open"
                        target={item.id === "address" ? "_blank" : undefined}
                        rel={
                          item.id === "address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.cta}
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              <div data-hours-contact className="mt-7 flex flex-wrap gap-3">
                <a href={business.phoneTel} className="hours-btn" data-cursor="Call">
                  Call to reserve
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={business.emailMailto}
                  className="hours-btn-ghost"
                  data-cursor="Email"
                >
                  Email us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
