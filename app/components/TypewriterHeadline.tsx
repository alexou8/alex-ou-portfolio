"use client";

// ============================================================
// TypewriterHeadline - Rotating headline with typewriter effect
// Uses react-type-animation for smooth typing
// ============================================================

import { TypeAnimation } from "react-type-animation";

type TypewriterHeadlineProps = {
  headlines: string[];
  className?: string;
};

export function TypewriterHeadline({
  headlines,
  className = "",
}: TypewriterHeadlineProps) {
  // Convert headlines array to sequence format for TypeAnimation
  // Format: [text1, pause, text2, pause, ...]
  const sequence = headlines.flatMap((headline) => [headline, 2000]);

  return (
    <div className={className}>
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        cursor={true}
        style={{
          display: "inline-block",
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      />
    </div>
  );
}
