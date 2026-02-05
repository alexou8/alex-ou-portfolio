"use client";

// ============================================================
// HeyTea-Inspired Mobile App Portfolio (Vercel + TS-safe)
// Next.js App Router + Tailwind
// - App shell header + mobile bottom tabs
// - Stacked glass cards
// - Press feedback + micro interactions
// - Swipeable project carousel (scroll-snap)
// - Floating gradient blobs (CSS keyframes)
// NOTE: Uses plain <style> (no styled-jsx props) to avoid TS error.
// ============================================================

import React, { useEffect, useMemo, useRef, useState } from "react";

/* =========================
   Types
========================= */
type ProjectLink = {
  label: string;
  href: string;
};

type Project = {
  name: string;
  subtitle: string;
  impact: string;
  bullets: string[];
  stack: string[];
  links?: ProjectLink[];
};

type NavItem = {
  id: string;
  label: string;
  emoji: string;
};

/* =========================
   Content
========================= */
const LINKS = {
  github: "https://github.com/alexou8",
  linkedin: "https://www.linkedin.com/in/alexou8/",
  email: "oualex8@gmail.com",
};

const PROFILE = {
  name: "Alex Ou",
  location: "Richmond Hill, ON",
  tagline: "Software • Data • AI • Systems",
  headline: "Building reliable software systems that turn data into decisions.",
  summary:
    "Senior Computer Science student with experience across software engineering, data workflows, and applied AI. I’ve supported production IoT systems operating across 1,000+ devices, built backend services with FastAPI and PostgreSQL, and developed data pipelines and ML-driven insights to support real-world decision-making.",
};

const EXPERIENCE = [
  {
    role: "IoT Software Developer Intern",
    company: "Guangzhou Mingliang Energy Saving Technology Co., Ltd.",
    time: "Summer 2024",
    location: "Guangdong, China",
    bullets: [
      "Developed and tested IoT smart-lighting software supporting 1,000+ active devices in live environments.",
      "Automated device provisioning using configuration templates, reducing manual setup effort by ~25%.",
      "Built Python monitoring and diagnostic scripts to analyze telemetry and logs across large-scale deployments.",
      "Implemented automated device health checks to improve system reliability and reduce downtime.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    name: "DiaLog",
    subtitle: "AI-Powered Diabetes Health Tracking Platform",
    impact:
      "Automated manual health tracking into a structured workflow with ML-driven pattern detection and insight generation.",
    bullets: [
      "Designed ingestion pipelines to convert raw user inputs into validated, analysis-ready datasets.",
      "Implemented trend and anomaly detection to surface meaningful health insights.",
      "Built backend services to support reporting and future optimization.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Pandas", "Scikit-learn"],
    links: [],
  },
  {
    name: "FareShare",
    subtitle: "Ride-Sharing Backend & Data Platform",
    impact:
      "FastAPI and PostgreSQL backend supporting trip ingestion, analytics, and reporting for future optimization use cases.",
    bullets: [
      "Developed REST APIs for automated trip data ingestion and processing.",
      "Designed scalable relational schemas for maintainable backend workflows.",
      "Generated structured datasets to support analytics and forecasting.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Python", "REST"],
    links: [],
  },
  {
    name: "Client–Server Networking Application",
    subtitle: "Concurrent Session Management System",
    impact:
      "Multithreaded Python server handling concurrent clients with robust lifecycle tracking and validation.",
    bullets: [
      "Built a multithreaded server to manage concurrent connections.",
      "Implemented structured logging and validation for fault-tolerant operation.",
    ],
    stack: ["Python", "TCP", "Multithreading", "Logging"],
    links: [],
  },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["Python", "SQL", "Java", "JavaScript", "C", "TypeScript"],
  "Backend & Data": ["FastAPI", "PostgreSQL", "REST APIs", "Data Pipelines"],
  "AI / ML": ["Scikit-learn", "Applied ML", "Data Analysis"],
  Tools: ["Git", "Linux", "Postman", "Power Automate"],
};

/* =========================
   Helpers
========================= */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================
   Reveal hook (subtle)
========================= */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal='true']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-show");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* =========================
   Active section hook (bottom tabs)
========================= */
function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "home");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        threshold: [0.18, 0.25, 0.35],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds.join("|")]);

  return active;
}

/* =========================
   UI Components
========================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-purple-800/30 backdrop-blur-xl px-4 py-1.5 text-xs text-purple-200 shadow-lg shadow-purple-900/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 animate-pulse" />
      {children}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-bold tracking-[0.28em] text-purple-300 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(255,255,255,0.5)]">
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
          {desc}
        </p>
      ) : null}
    </div>
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
        "rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(95,37,159,0.15),0_0_1px_rgba(139,69,255,0.3)]",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(95,37,159,0.25),0_0_2px_rgba(139,69,255,0.5)]",
        "hover:border-purple-400/30",
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
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold overflow-hidden",
        "bg-gradient-to-r from-purple-600 via-purple-500 to-teal-500",
        "text-white shadow-[0_10px_40px_rgba(139,69,255,0.4)]",
        "transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(139,69,255,0.6)]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-teal-500 before:via-purple-500 before:to-purple-600",
        "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-70",
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 opacity-90 group-hover:translate-x-1 transition-transform duration-300">→</span>
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
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold",
        "border border-purple-500/30 bg-purple-900/20 text-purple-200 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(139,69,255,0.2)]",
        "transition-all duration-500 hover:scale-105 hover:bg-purple-900/40 hover:border-purple-400/50 hover:shadow-[0_12px_48px_rgba(139,69,255,0.35)]",
      ].join(" ")}
    >
      {children}
      <span className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">↗</span>
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-5 group hover:bg-gradient-to-br hover:from-purple-800/30 hover:via-black/50 hover:to-teal-900/20">
      <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">{label}</div>
      <div className="mt-2 text-lg font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-teal-300 transition-all duration-300">{value}</div>
    </GlassCard>
  );
}

function SkillChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium bg-gradient-to-r from-purple-900/40 to-purple-800/30 text-purple-200 border border-purple-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-purple-800/60 hover:to-purple-700/50 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/30">
      {text}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className={[
        "snap-center min-w-[86%] sm:min-w-[460px]",
        "rounded-3xl border border-purple-500/25 bg-gradient-to-br from-purple-900/25 via-black/50 to-purple-900/20 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(95,37,159,0.2),0_0_1px_rgba(139,69,255,0.4)]",
        "p-7",
        "transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_30px_90px_rgba(95,37,159,0.35),0_0_2px_rgba(139,69,255,0.6)]",
        "hover:border-purple-400/40",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">{p.name}</h3>
          <p className="mt-2 text-sm text-gray-300">{p.subtitle}</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-purple-600/30 to-teal-600/30 border border-purple-400/30 px-3.5 py-1.5 text-xs font-bold text-purple-200 backdrop-blur-sm">
          Featured
        </span>
      </div>

      <p className="mt-5 text-sm text-gray-300 leading-relaxed">{p.impact}</p>

      <ul className="mt-5 space-y-2.5 text-sm text-gray-400">
        {p.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-teal-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-purple-500/30 bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-200 backdrop-blur-sm transition-all duration-300 hover:bg-purple-800/40 hover:border-purple-400/50"
          >
            {s}
          </span>
        ))}
      </div>

      {p.links && p.links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-teal-300 transition-all duration-300"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* =========================
   Page
========================= */
export default function Home() {
  useScrollReveal();

  const NAV: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Home", emoji: "🏠" },
      { id: "work", label: "Work", emoji: "🧩" },
      { id: "projects", label: "Projects", emoji: "🧋" },
      { id: "skills", label: "Skills", emoji: "✨" },
      { id: "contact", label: "Contact", emoji: "✉️" },
    ],
    []
  );

  const active = useActiveSection(NAV.map((n) => n.id));

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tiltRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const nx = clamp(x, -1, 1);
      const ny = clamp(y, -1, 1);

      if (tiltRef.current) window.cancelAnimationFrame(tiltRef.current);
      tiltRef.current = window.requestAnimationFrame(() => setTilt({ x: nx, y: ny }));
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#191919] text-white">
      {/* Global keyframes (plain <style> avoids TS styled-jsx typing issue) */}
      <style>{`
        .reveal-init {
          opacity: 0;
          transform: translateY(20px);
        }
        .reveal-show {
          opacity: 1;
          transform: translateY(0px);
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes blobFloatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(20px, -25px, 0) scale(1.08); }
          66% { transform: translate3d(-15px, 15px, 0) scale(0.95); }
        }

        @keyframes blobFloatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          33% { transform: translate3d(-18px, 20px, 0) scale(1.06); }
          66% { transform: translate3d(18px, -12px, 0) scale(0.97); }
        }

        @keyframes blobFloatC {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(10px, 25px, 0) scale(1.1); }
        }

        @keyframes sheen {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .scroll-smooth-ios { -webkit-overflow-scrolling: touch; }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(95, 37, 159, 0.1), rgba(0, 224, 222, 0.08));
          border: 1px solid transparent;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(95, 37, 159, 0.4), rgba(0, 224, 222, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      {/* Background blobs - Wealthsimple purple & HeyTea gradients */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(95, 37, 159, 0.6), rgba(139, 69, 255, 0.4), rgba(0, 224, 222, 0.2))`,
            animation: "blobFloatA 20s ease-in-out infinite",
            transform: `translate3d(${tilt.x * 12}px, ${tilt.y * 8}px, 0)`,
          }}
        />
        <div
          className="absolute top-20 -right-40 h-[500px] w-[500px] rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(circle at 40% 40%, rgba(0, 224, 222, 0.5), rgba(255, 107, 181, 0.35), rgba(95, 37, 159, 0.25))`,
            animation: "blobFloatB 22s ease-in-out infinite",
            transform: `translate3d(${tilt.x * -14}px, ${tilt.y * 10}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[-180px] left-[20%] h-[560px] w-[560px] rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(139, 69, 255, 0.45), rgba(0, 224, 222, 0.3), rgba(95, 37, 159, 0.2))`,
            animation: "blobFloatC 24s ease-in-out infinite",
            transform: `translate3d(${tilt.x * 8}px, ${tilt.y * -12}px, 0)`,
          }}
        />
        <div
          className="absolute top-[60%] right-[15%] h-[400px] w-[400px] rounded-full blur-3xl opacity-15"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255, 107, 181, 0.4), rgba(139, 69, 255, 0.3), rgba(0, 224, 222, 0.2))`,
            animation: "blobFloatA 26s ease-in-out infinite",
            transform: `translate3d(${tilt.x * -8}px, ${tilt.y * 6}px, 0)`,
          }}
        />
      </div>

      {/* App container */}
      <div className="relative mx-auto max-w-md sm:max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <header className="sticky top-0 z-40 pt-4">
          <div className="rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-900/30 via-black/50 to-purple-900/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(95,37,159,0.2)]">
            <nav className="flex items-center justify-between px-5 py-3.5">
              <button
                type="button"
                onClick={() => scrollToId("home")}
                className="inline-flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:scale-105"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-teal-600 shadow-lg shadow-purple-500/30">
                  🧋
                </span>
                {PROFILE.name}
              </button>

              <div className="hidden sm:flex items-center gap-2">
                {NAV.slice(1).map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => scrollToId(n.id)}
                    className={[
                      "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                      "border border-purple-500/20 backdrop-blur-xl",
                      "hover:scale-105",
                      active === n.id 
                        ? "bg-gradient-to-r from-purple-600/40 to-purple-500/40 text-purple-200 border-purple-400/40 shadow-lg shadow-purple-500/20" 
                        : "bg-purple-900/20 text-gray-300 hover:bg-purple-800/30 hover:text-white hover:border-purple-400/30",
                    ].join(" ")}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </header>

        {/* Content */}
        <div className="pb-24 sm:pb-16">
          {/* HOME */}
          <section id="home" className="pt-6 sm:pt-10">
            <GlassCard className="relative overflow-hidden group">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, rgba(139,69,255,0.3) 0%, transparent 50%, rgba(0,224,222,0.3) 100%)`,
                  animation: "sheen 8s ease-in-out infinite",
                }}
              />
              <div className="p-7 sm:p-12">
                <div className="flex flex-wrap gap-3">
                  <Pill>{PROFILE.tagline}</Pill>
                  <Pill>{PROFILE.location}</Pill>
                  <Pill>Wilfrid Laurier University</Pill>
                </div>

                <h1 className="mt-8 text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
                  {PROFILE.headline}
                </h1>

                <p className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
                  {PROFILE.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryButton href={LINKS.github} ariaLabel="Open GitHub">
                    GitHub
                  </PrimaryButton>
                  <SecondaryButton href={LINKS.linkedin} ariaLabel="Open LinkedIn">
                    LinkedIn
                  </SecondaryButton>
                  <SecondaryButton href={`mailto:${LINKS.email}`} ariaLabel="Email Alex">
                    Email
                  </SecondaryButton>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-4">
                  <StatCard label="Production scale" value="1,000+ devices" />
                  <StatCard label="Automation impact" value="~25% less setup" />
                  <StatCard label="Focus" value="Reliable systems" />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* EXPERIENCE */}
          <section id="work" className="mt-10 sm:mt-14 reveal-init" data-reveal="true">
            <SectionTitle
              eyebrow="EXPERIENCE"
              title="Built for real environments."
              desc="Hands-on work in production-style IoT systems with monitoring, automation, and reliability focus."
            />

            <div className="mt-8 space-y-5">
              {EXPERIENCE.map((x) => (
                <GlassCard key={`${x.company}-${x.role}`} className="p-7 group">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-teal-300 transition-all duration-300">
                        {x.role}
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">{x.company}</p>
                      <p className="mt-1.5 text-xs text-gray-400">
                        {x.time} • {x.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-purple-600/30 to-teal-600/30 border border-purple-400/30 px-3.5 py-1.5 text-xs font-bold text-purple-200 backdrop-blur-sm">
                      Internship
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-gray-300">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-teal-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="mt-10 sm:mt-14 reveal-init" data-reveal="true">
            <SectionTitle
              eyebrow="PROJECTS"
              title="Swipe through selected work."
              desc="Tap, skim, and explore. This section is built like a mobile app carousel with snap scrolling."
            />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-400">Tip: swipe left and right on mobile.</p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="rounded-full border border-purple-500/30 bg-purple-900/20 px-5 py-2.5 text-sm font-bold text-purple-200 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-purple-800/30 hover:border-purple-400/50"
                >
                  Contact →
                </button>
              </div>

              <div className="mt-4 flex gap-5 overflow-x-auto scroll-smooth-ios snap-x snap-mandatory pb-3 pr-3">
                <div className="w-2 shrink-0" />
                {PROJECTS.map((p) => (
                  <ProjectCard key={p.name} p={p} />
                ))}
                <div className="w-6 shrink-0" />
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="mt-10 sm:mt-14 reveal-init" data-reveal="true">
            <SectionTitle
              eyebrow="SKILLS"
              title="Core tools I ship with."
              desc="Grouped for quick scanning, with chip-style tags and app-like cards."
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Object.entries(SKILLS).map(([k, v]) => (
                <GlassCard key={k} className="p-7 group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-teal-300 transition-all duration-300">{k}</h4>
                    <span className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">{v.length} items</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {v.map((s) => (
                      <SkillChip key={s} text={s} />
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="mt-10 sm:mt-14 reveal-init" data-reveal="true">
            <SectionTitle
              eyebrow="CONTACT"
              title="Let’s connect."
              desc="If you want to chat about internships, projects, or building reliable systems, reach out."
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">Email</div>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  {LINKS.email}
                </a>
                <p className="mt-3 text-xs text-gray-400">Best for quick coordination.</p>
              </GlassCard>

              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">LinkedIn</div>
                <a
                  href={LINKS.linkedin}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  alexou8
                </a>
                <p className="mt-3 text-xs text-gray-400">Professional updates and messaging.</p>
              </GlassCard>

              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">GitHub</div>
                <a
                  href={LINKS.github}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  github.com/alexou8
                </a>
                <p className="mt-3 text-xs text-gray-400">Projects, code, and experiments.</p>
              </GlassCard>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={`mailto:${LINKS.email}`} ariaLabel="Email Alex">
                Email me
              </PrimaryButton>
              <SecondaryButton href={LINKS.linkedin} ariaLabel="Open LinkedIn">
                LinkedIn
              </SecondaryButton>
              <SecondaryButton href={LINKS.github} ariaLabel="Open GitHub">
                GitHub
              </SecondaryButton>
            </div>

            <p className="mt-10 text-xs text-gray-500">
              © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js and Tailwind.
            </p>
          </section>
        </div>
      </div>

      {/* Bottom Tab Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="mx-auto max-w-md px-4 pb-4">
          <div className="rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-900/40 via-black/60 to-purple-900/40 backdrop-blur-xl shadow-[0_-10px_60px_rgba(95,37,159,0.3)]">
            <div className="grid grid-cols-5 px-2 py-2">
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => scrollToId(n.id)}
                    className={[
                      "flex flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3",
                      "transition-all duration-300",
                      isActive 
                        ? "bg-gradient-to-br from-purple-600/40 to-purple-500/40 shadow-lg shadow-purple-500/20" 
                        : "bg-transparent hover:bg-purple-900/30",
                    ].join(" ")}
                  >
                    <span className="text-lg">{n.emoji}</span>
                    <span
                      className={[
                        "text-[10px] font-bold",
                        isActive ? "text-purple-200" : "text-gray-400",
                      ].join(" ")}
                    >
                      {n.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
