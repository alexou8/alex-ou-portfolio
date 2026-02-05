"use client";

// ============================================================
// Attack on Titan-Themed Portfolio (Survey Corps Edition)
// Next.js App Router + Tailwind
// - Military-inspired design with Survey Corps aesthetics
// - Glass cards with strategic information display
// - Press feedback + tactical interactions
// - Swipeable mission carousel (scroll-snap)
// - Dystopian gradient atmosphere (CSS keyframes)
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
  tagline: "Survey Corps • Technology Division",
  headline: "Defending humanity's progress through reliable software systems.",
  summary:
    "Senior Computer Science student and member of the Technology Division. I've fortified production IoT systems across 1,000+ devices, constructed backend fortifications with FastAPI and PostgreSQL, and engineered data reconnaissance pipelines to support strategic decision-making in the fight for technological advancement.",
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
    <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs text-slate-700 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur transition-transform active:scale-[0.98]">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-700/80" />
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
      <p className="text-[11px] font-semibold tracking-[0.26em] text-amber-900/80">
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
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-black/5 text-slate-700 border border-black/5 transition-transform duration-200 active:scale-[0.97]">
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
        <span className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-semibold text-amber-900">
          Active Mission
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
              className="text-sm font-semibold text-amber-900 hover:text-amber-900"
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
      { id: "home", label: "Home", emoji: "⚔️" },
      { id: "work", label: "Missions", emoji: "🛡️" },
      { id: "projects", label: "Arsenal", emoji: "⚙️" },
      { id: "skills", label: "Training", emoji: "🎯" },
      { id: "contact", label: "Signal", emoji: "📡" },
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
    <main className="min-h-screen bg-[#E8DCC4] text-slate-900">
      {/* Global keyframes (plain <style> avoids TS styled-jsx typing issue) */}
      <style>{`
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
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12px, -18px, 0) scale(1.04); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloatB {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-14px, 14px, 0) scale(1.05); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes sheen {
          0% { transform: translateX(-60%); opacity: 0; }
          40% { opacity: 0.08; }
          100% { transform: translateX(60%); opacity: 0; }
        }

        .scroll-smooth-ios { -webkit-overflow-scrolling: touch; }
      `}</style>

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(75,85,61,0.45), rgba(101,67,33,0.35), rgba(59,45,33,0.25))`,
            animation: "blobFloatA 14s ease-in-out infinite",
            transform: `translate3d(${tilt.x * 8}px, ${tilt.y * 6}px, 0)`,
          }}
        />
        <div
          className="absolute top-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-35"
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(101,67,33,0.35), rgba(75,85,61,0.28), rgba(60,60,60,0.15))`,
            animation: "blobFloatB 16s ease-in-out infinite",
            transform: `translate3d(${tilt.x * -10}px, ${tilt.y * 8}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[-140px] left-[25%] h-[420px] w-[420px] rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(circle at 40% 40%, rgba(139,119,101,0.38), rgba(75,85,61,0.22), rgba(40,40,40,0.08))`,
            animation: "blobFloatA 18s ease-in-out infinite",
            transform: `translate3d(${tilt.x * 6}px, ${tilt.y * -8}px, 0)`,
          }}
        />
      </div>

      {/* App container */}
      <div className="relative mx-auto max-w-md sm:max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <header className="sticky top-0 z-40 pt-4">
          <div className="rounded-[22px] border border-black/5 bg-white/70 backdrop-blur shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <nav className="flex items-center justify-between px-4 py-3">
              <button
                type="button"
                onClick={() => scrollToId("home")}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition-transform active:scale-[0.98]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-700/10">
                  ⚔️
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
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      "border border-black/5 bg-white/60 backdrop-blur hover:bg-white/80",
                      "active:scale-[0.98]",
                      active === n.id ? "text-amber-900" : "text-slate-700",
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
            <GlassCard className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)`,
                  animation: "sheen 7.5s ease-in-out infinite",
                  opacity: 0.08,
                }}
              />
              <div className="p-6 sm:p-10">
                <div className="flex flex-wrap gap-2">
                  <Pill>{PROFILE.tagline}</Pill>
                  <Pill>{PROFILE.location}</Pill>
                  <Pill>Wilfrid Laurier University • Training Corps</Pill>
                </div>

                <h1 className="mt-6 text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                  {PROFILE.headline}
                </h1>

                <p className="mt-5 text-sm sm:text-lg text-slate-600 leading-relaxed">
                  {PROFILE.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
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

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <StatCard label="Defended devices" value="1,000+ units" />
                  <StatCard label="Efficiency gain" value="~25% deployment" />
                  <StatCard label="Mission" value="Reliable systems" />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* EXPERIENCE */}
          <section id="work" className="mt-10 sm:mt-14 reveal-init" data-reveal="true">
            <SectionTitle
              eyebrow="MISSIONS COMPLETED"
              title="Deployed in real-world conditions."
              desc="Field experience in production-grade IoT systems with reconnaissance, automation, and fortification protocols."
            />

            <div className="mt-6 space-y-4">
              {EXPERIENCE.map((x) => (
                <GlassCard key={`${x.company}-${x.role}`} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        {x.role}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{x.company}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {x.time} • {x.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-semibold text-amber-900">
                      Deployment
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm text-slate-600">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400/80" />
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
              eyebrow="ARSENAL"
              title="Strategic operations overview."
              desc="Tap, skim, and explore completed missions. This section uses tactical reconnaissance scrolling."
            />

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">Tip: swipe to view mission details.</p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="rounded-full border border-black/5 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 backdrop-blur transition-transform active:scale-[0.98]"
                >
                  Contact →
                </button>
              </div>

              <div className="mt-4 flex gap-4 overflow-x-auto scroll-smooth-ios snap-x snap-mandatory pb-2 pr-2">
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
              eyebrow="TRAINING"
              title="Core tactical equipment."
              desc="Arsenal of tools and techniques mastered through continuous training."
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(SKILLS).map(([k, v]) => (
                <GlassCard key={k} className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900">{k}</h4>
                    <span className="text-xs text-slate-500">{v.length} items</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
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
              eyebrow="SIGNAL"
              title="Establish contact."
              desc="If you want to discuss deployments, operations, or building fortified systems, send a signal."
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlassCard className="p-6">
                <div className="text-xs text-slate-600">Email</div>
                <a
                  href={`mailto:${LINKS.email}`}
                  className="mt-2 block text-sm font-semibold text-slate-900 hover:text-amber-900"
                >
                  {LINKS.email}
                </a>
                <p className="mt-2 text-xs text-slate-500">For urgent coordination.</p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="text-xs text-slate-600">LinkedIn</div>
                <a
                  href={LINKS.linkedin}
                  className="mt-2 block text-sm font-semibold text-slate-900 hover:text-amber-900"
                >
                  alexou8
                </a>
                <p className="mt-2 text-xs text-slate-500">Strategic communications hub.</p>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="text-xs text-slate-600">GitHub</div>
                <a
                  href={LINKS.github}
                  className="mt-2 block text-sm font-semibold text-slate-900 hover:text-amber-900"
                >
                  github.com/alexou8
                </a>
                <p className="mt-2 text-xs text-slate-500">Mission archives and experiments.</p>
              </GlassCard>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href={`mailto:${LINKS.email}`} ariaLabel="Email Alex">
                Send Signal
              </PrimaryButton>
              <SecondaryButton href={LINKS.linkedin} ariaLabel="Open LinkedIn">
                LinkedIn
              </SecondaryButton>
              <SecondaryButton href={LINKS.github} ariaLabel="Open GitHub">
                GitHub
              </SecondaryButton>
            </div>

            <p className="mt-8 text-xs text-slate-500">
              © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js and Tailwind.
            </p>
          </section>
        </div>
      </div>

      {/* Bottom Tab Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="mx-auto max-w-md px-4 pb-4">
          <div className="rounded-[22px] border border-black/5 bg-white/75 backdrop-blur shadow-[0_16px_40px_rgba(15,23,42,0.14)]">
            <div className="grid grid-cols-5 px-2 py-2">
              {NAV.map((n) => {
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => scrollToId(n.id)}
                    className={[
                      "flex flex-col items-center justify-center gap-1 rounded-[18px] px-2 py-2",
                      "transition-transform duration-200 active:scale-[0.97]",
                      isActive ? "bg-amber-700/10" : "bg-transparent",
                    ].join(" ")}
                  >
                    <span className="text-base">{n.emoji}</span>
                    <span
                      className={[
                        "text-[10px] font-semibold",
                        isActive ? "text-amber-900" : "text-slate-700",
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
