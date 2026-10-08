export default function BrandMark({ className = "", compact = false }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-medium tracking-[0.18em] text-ink uppercase ${
        compact ? "text-sm" : "text-base md:text-lg"
      } ${className}`}
    >
      Sisters of Pearl
    </span>
  );
}
