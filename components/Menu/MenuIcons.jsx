export function CategoryIcon({ type, className = "" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    className,
  };

  switch (type) {
    case "all":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "appetisers":
      return (
        <svg {...common}>
          <path
            d="M5 16.5c1.8-3.2 4.2-5.2 7-5.2s5.2 2 7 5.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M8 11.2c.6-1.8 1.9-3.2 4-3.2s3.4 1.4 4 3.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="12" cy="6.2" r="1.1" fill="currentColor" />
        </svg>
      );
    case "soup":
      return (
        <svg {...common}>
          <path
            d="M5 12.5h14c-.5 3.6-3.4 6-7 6s-6.5-2.4-7-6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M9 8.2c.3-1.2 1.3-2 3-2s2.7.8 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M12 4.5v1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "seafood":
      return (
        <svg {...common}>
          <path
            d="M4.5 12.5c3.2-4.2 7.2-5.8 11.2-4.2 1.6.6 2.8 1.6 3.8 3-.8 1.2-2 2.2-3.5 2.8-4.2 1.6-8.5.2-11.5-1.6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="8.2" cy="11.2" r="0.9" fill="currentColor" />
          <path d="M16.5 9.2c1.2-.8 2.4-1 3.5-.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "poultry":
      return (
        <svg {...common}>
          <path
            d="M8.5 14.5c-1.6-1-2.4-2.8-1.8-4.6.7-2.1 2.8-3.4 5-3.2 1.8.2 3.2 1.2 4 2.6 1.4.2 2.8 1.4 2.8 3.2 0 1.8-1.4 3.2-3.2 3.2H11c-1.1 0-2-.4-2.5-1.2Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M10.5 17.5v1.5M13.5 17.5v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "noodles":
      return (
        <svg {...common}>
          <path
            d="M5 8.5c2.5 1.8 4.5 1.8 7 0s4.5-1.8 7 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5 12c2.5 1.8 4.5 1.8 7 0s4.5-1.8 7 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M5 15.5c2.5 1.8 4.5 1.8 7 0s4.5-1.8 7 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export function PagodaMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 96"
      fill="none"
      aria-hidden
    >
      <path
        d="M40 8 L54 22 H26 L40 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M28 22 H52 V28 H28Z" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M40 28 L62 42 H18 L40 28Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M24 42 H56 V50 H24Z" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M40 50 L68 66 H12 L40 50Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M22 66 H58 V78 H22Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 78 H64" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M34 78 V88 M46 78 V88" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 88 H52" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
