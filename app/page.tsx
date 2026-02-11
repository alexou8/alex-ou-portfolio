"use client";

import { useState, useEffect } from "react";
import { TypewriterHeadline } from "./components/TypewriterHeadline";
import { PageLayout } from "./components/shared/PageLayout";
import { aboutMe, contactLinks } from "./lib/data";

/* =========================
   UI Components
========================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded border border-[#3a3f4b] bg-[#24272f] px-4 py-1.5 text-xs text-[#b8b8b8] font-mono transition-all duration-300 hover:border-[#b8b8b8] hover:shadow-[0_0_10px_rgba(184,184,184,0.3)]">
      <span className="text-[#b8b8b8]">›</span>
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded border border-[#3a3f4b] bg-[#24272f]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 hover:border-[#b8b8b8] hover:shadow-[0_0_15px_rgba(184,184,184,0.2)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={[
        "group relative inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-bold font-mono overflow-hidden",
        "bg-[#b8b8b8] border border-[#b8b8b8]",
        "text-[#1a1d23] shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
        "transition-all duration-300 hover:bg-[#f0f0f0] hover:shadow-[0_6px_20px_rgba(184,184,184,0.5)]",
        "hover:-translate-y-0.5",
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
    </a>
  );
}

function SecondaryButton({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={[
        "group inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-bold font-mono",
        "border border-[#3a3f4b] bg-transparent text-[#b8b8b8]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 hover:bg-[#24272f] hover:border-[#b8b8b8] hover:shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
        "hover:-translate-y-0.5",
      ].join(" ")}
    >
      {children}
      <span className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">↗</span>
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-5 group terminal-border transition-transform duration-300 hover:-translate-y-1">
      <div className="text-xs text-[#858585] group-hover:text-[#b8b8b8] transition-colors duration-300 font-mono">{label}</div>
      <div className="mt-2 text-lg font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300 font-mono">{value}</div>
    </GlassCard>
  );
}

/* =========================
   Page
========================= */
export default function Home() {
  const [showPills, setShowPills] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Staged reveal sequence
    const timer1 = setTimeout(() => setShowPills(true), 100);
    const timer2 = setTimeout(() => setShowTypewriter(true), 200);
    const timer3 = setTimeout(() => setShowTitle(true), 300);
    const timer4 = setTimeout(() => setShowDescription(true), 450);
    const timer5 = setTimeout(() => setShowButtons(true), 600);
    const timer6 = setTimeout(() => setShowStats(true), 750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  return (
    <PageLayout showLoading={true}>
      <section className="pt-6 sm:pt-10">
        <GlassCard className="relative overflow-hidden group terminal-border">
          <div className="p-7 sm:p-12">
            {/* Pills with staged reveal */}
            <div
              className="flex flex-wrap gap-3 transition-all duration-500"
              style={{
                opacity: showPills ? 1 : 0,
                transform: showPills ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              <Pill>{aboutMe.tagline}</Pill>
              <Pill>{aboutMe.location}</Pill>
              <Pill>Wilfrid Laurier University</Pill>
            </div>

            <div className="mt-8">
              {/* Command prompt */}
              <div
                className="text-[#858585] text-sm font-mono mb-2 transition-all duration-500"
                style={{
                  opacity: showTypewriter ? 1 : 0,
                  transform: showTypewriter ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                $ whoami
              </div>
              
              {/* Typewriter rotating headline */}
              <div
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f0f0] mb-4 transition-all duration-500"
                style={{
                  opacity: showTypewriter ? 1 : 0,
                  transform: showTypewriter ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                <TypewriterHeadline headlines={aboutMe.rotatingHeadlines} />
              </div>
              
              {/* Main title */}
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-[#b8b8b8] leading-tight font-mono transition-all duration-500"
                style={{
                  opacity: showTitle ? 1 : 0,
                  transform: showTitle ? "translateY(0)" : "translateY(-10px)",
                }}
              >
                {aboutMe.headline}
              </h1>
            </div>

            {/* Description */}
            <p
              className="mt-6 text-base sm:text-lg text-[#b8b8b8] leading-relaxed max-w-3xl font-mono transition-all duration-500"
              style={{
                opacity: showDescription ? 1 : 0,
                transform: showDescription ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              {aboutMe.summary}
            </p>

            {/* Buttons with stagger */}
            <div
              className="mt-8 flex flex-wrap gap-4 transition-all duration-500"
              style={{
                opacity: showButtons ? 1 : 0,
                transform: showButtons ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              <PrimaryButton href={contactLinks.github} ariaLabel="Open GitHub">
                GitHub
              </PrimaryButton>
              <SecondaryButton href={contactLinks.linkedin} ariaLabel="Open LinkedIn">
                LinkedIn
              </SecondaryButton>
              <SecondaryButton href={`mailto:${contactLinks.email}`} ariaLabel="Email Alex">
                Email
              </SecondaryButton>
            </div>

            {/* Stats cards */}
            <div
              className="mt-10 grid grid-cols-3 gap-4 transition-all duration-500"
              style={{
                opacity: showStats ? 1 : 0,
                transform: showStats ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              <StatCard label="Production scale" value="1,000+ devices" />
              <StatCard label="Automation impact" value="~25% less setup" />
              <StatCard label="Focus" value="Reliable systems" />
            </div>
          </div>
        </GlassCard>
      </section>

      <style>{`
        .terminal-border {
          position: relative;
          background: #24272f;
          border: 1px solid #3a3f4b;
        }
        
        .terminal-border:hover {
          border-color: #b8b8b8;
          animation: terminalGlow 2s ease-in-out infinite;
        }

        @keyframes terminalGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(184, 184, 184, 0.1); }
          50% { box-shadow: 0 0 15px rgba(184, 184, 184, 0.2); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </PageLayout>
  );
}
