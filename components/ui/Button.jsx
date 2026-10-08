"use client";

import Link from "next/link";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  onClick,
  type = "button",
  ariaLabel,
}) {
  const base =
    "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden px-6 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300";

  const styles = {
    primary:
      "border border-[color:var(--border-gold)] bg-pure text-ink hover:text-ink",
    secondary:
      "border-0 bg-transparent px-0 text-ink after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-champagne after:transition-transform after:duration-300 hover:after:scale-x-100",
    ghost:
      "border border-transparent bg-transparent text-charcoal hover:text-ink",
  };

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(110deg,#9B793E,#D8C18A,#A98446)] transition-transform duration-400 ease-out group-hover:scale-x-100"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "primary" && (
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    const shared = {
      className: `${base} ${styles[variant] || styles.primary} ${className}`,
      "aria-label": ariaLabel,
      onClick,
    };

    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          {...shared}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${base} ${styles[variant] || styles.primary} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
