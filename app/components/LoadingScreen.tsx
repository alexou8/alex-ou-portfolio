"use client";

// ============================================================
// LoadingScreen - Initial loading state with staged reveal
// Shows a terminal-style loading animation before content appears
// ============================================================

import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster progress at start, slower near end for natural feel
        const increment = prev < 70 ? 15 : prev < 90 ? 5 : 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Call onComplete after a delay for smooth transition
      const timer = setTimeout(onComplete, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const isComplete = progress === 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1d23] transition-opacity duration-500"
      style={{ opacity: isComplete ? 0 : 1, pointerEvents: isComplete ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-6 font-mono">
        {/* Terminal-style loading indicator */}
        <div className="flex items-center gap-3 text-[#b8b8b8]">
          <span className="text-sm">$</span>
          <span className="text-sm">loading portfolio</span>
          <span className="terminal-cursor" />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-[#24272f] border border-[#3a3f4b] rounded overflow-hidden">
          <div
            className="h-full bg-[#b8b8b8] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-xs text-[#858585] font-mono">{progress}%</div>
      </div>
    </div>
  );
}
