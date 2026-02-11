"use client";

// ============================================================
// AnimatedSection - Reusable entrance animation component
// Handles fade + slide with Framer Motion and accessibility support
// ============================================================

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
};

const getInitialPosition = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: distance };
  }
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 20,
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...getInitialPosition(direction, distance) };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{
        once: true,
        // Trigger animation 100px before element enters viewport for smoother experience
        margin: "-100px",
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
