"use client";

// ============================================================
// AnimatedSection - Reusable entrance animation component
// Handles fade + y-slide with Framer Motion
// ============================================================

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
