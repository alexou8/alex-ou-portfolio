"use client";

// ============================================================
// HeyTea-Inspired Mobile App Portfolio
// Next.js App Router + Tailwind
// - App shell header + optional bottom tabs
// - Stacked glass cards
// - Press feedback + micro interactions
// - Swipeable project carousel (scroll-snap)
// - Floating gradient blobs (CSS keyframes)
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
   Content (kept from your current file)
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
   Small helpers
========================= */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
   Active section hook (for bottom tabs)
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
    <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur transition-transform active:scale-[0.98]">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
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
      <p className="text-[11px] font-semibold tracking-[0.26em] text-emerald-700/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
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
        "rounded-[28px] border border-black/5 bg-white/75 backdrop-blur",
        "shadow-[0_10px_30px_rgba(15,23,42,0.06)]",
        "transition-transform duration-200 active:scale-[0.985]",
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
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
        "bg-slate-900 text-white",
        "shadow-[0_10px_18px_rgba(15,23,42,0.22)]",
        "transition-transform duration-200 active:scale-[0.97]",
      ].join(" ")}
    >
      {children}
      <span className="opacity-80">→</span>
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
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
        "border border-black/10 bg-white/70 text-slate-900 backdrop-blur",
        "shadow-[0_8px_16px_rgba(15,23,42,0.06)]",
        "transition-transform duration-200 active:scale-[0.97]",
      ].join(" ")}
    >
      {children}
      <span className="opacity-60">↗</span>
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-4">
      <div className="text-xs text-slate-600">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </GlassCard>
  );
}

function SkillChip({ text }: { text: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs",
        "bg-black/5 text-slate-700 border border-black/5",
        "transition-transform duration-200 active:scale-[0.97]",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className={[
        "snap-center min-w-[86%] sm:min-w-[460px]",
        "rounded-[28px] border border-black/5 bg-white/80 backdrop-blur",
        "shadow-[0_14px_34px_rgba(15,23,42,0.08)]",
        "p-6",
        "transition-transform duration-200 active:scale-[0.985]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{p.subtitle}</p>
        </div>
        <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-800">
          Featured
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-700 leading-relaxed">{p.impact}</p>

      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {p.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400/80" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-black/5 bg-black/5 px-3 py-1 text-xs text-slate-700"
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
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
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

  // For subtle parallax on blobs (optional, very light)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tiltRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Desktop only, keep very subtle
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const nx = clamp(x, -1, 1);
      const ny = clamp(y, -1, 1);

      if (tiltRef.current) {
        window.cancelAnimationFrame(tiltRef.current);
      }
      tiltRef.current = window.requestAnimationFrame(() => {
        setTilt({ x: nx, y: ny });
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-slate-900">
      {/* Global keyframes */}
      <style jsx global>{`
        .reveal-init {
          opacity: 0;
          transform: translateY(10px);
        }
        .reveal-show {
          opacity: 1;
          transform: translateY(0px);
          transition: opacity 520ms ease, transform 520ms ease;
        }

        @keyframes blobFloatA {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(12px, -18px, 0) scale(1.04);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes blobFloatB {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-14px, 14px, 0) scale(1.05);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes sheen {
          0% {
            transform: translateX(-60%);
            opacity: 0.0;
          }
          40% {
            opacity: 0.08;
          }
          100% {
            transform: translateX(60%);
            opacity: 0.0;
          }
        }

        /* nicer scroll on iOS */
        .scroll-smooth-ios {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.55), rgba(251,191,36,0.35), rgba(244,114,182,0.18))",
            animation: "blobFloatA 14s ease-in-out infinite",
            transform: `translate3d(${tilt.x * 8}px, ${tilt.y * 6}px, 0)`,
          }}
        />
        <div
          className="absolute top-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(244,114,182,0.35), rgba(34,197,94,0.22), rgba(59,130,246,0.12))",
            animation: "blobFloatB 16s ease-in-out infinite",
            transform: `translate3d(${tilt.x * -10}px, ${tilt.y * 8}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[-140px] left-[25%] h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(251,191,36,0.42), rgba(16,
