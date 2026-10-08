"use client";

import RevealText from "./RevealText";

/** Convenience wrapper for character / word reveals */
export default function SplitTextReveal({
  children,
  mode = "chars",
  className = "",
  as = "div",
}) {
  return (
    <RevealText as={as} type={mode} className={className}>
      {children}
    </RevealText>
  );
}
