"use client";

// app/page.tsx
// ============================================================
// Wealthsimple-inspired Portfolio (Next.js App Router + Tailwind)
// + Smooth animations (hero stagger + scroll reveal + hover lift)
// ============================================================
//
// IMPORTANT (1-time):
// This file expects the CSS helpers to exist in app/globals.css:
//
//   .reveal / .reveal.show
//   .hero-in (and optional [data-delay] variants)
//   prefers-reduced-motion guard
//
// If you haven't added them yet, paste the CSS snippet I gave earlier into app/globals.css.
// ============================================================

import { useEffect } from "react";

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

const LINKS = {
  // EDIT HERE
  github: "https://github.com/alexou8",
  linkedin: "https://www.linkedin.com/in/alexou8/",
  email: "oualex8@gmail.com",
};

const PROFILE = {
  // EDIT HERE (balanced for SWE / AI-ML / IT / Data)
  name: "Alex Ou",
  location: "Richmond Hill, ON",
  tagline: "Software • Data • AI • Systems",
  headline: "Building reliable software systems that turn data into decisions.",
  summary:
    "Senior Computer Science student with experience across software engineering, data workflows, and applied AI. I’ve supported production IoT systems operating across 1,000+ devices, built backend services with FastAPI and PostgreSQL, and developed data pipelines and ML-driven insights to support real-world decision-making.",
};

const EXPERIENCE = [
  {
    // EDIT HERE
    role: "IoT Software Developer Intern",
    company: "Guangzhou Mingliang Energy Saving Technology Co., Ltd.",
    time: "Summer 2024",
    location: "Guangdong, China",
    bullets: [
      "Contributed to development and testing of IoT smart-lighting software using embedded sensor modules and NB-IoT communication to manage 1,000+ devices",
      "Automated device setup using configuration templates (grouping, brightness profiles, timing rules), reducing manual technician intervention by ~25%",
      "Built Python monitoring/diagnostic scripts to analyze telemetry and logs from 1,000+ devices to improve reliability and issue detection",
      "Implemented automated device-health checks (uptime, responsiveness, power usage) to reduce downtime and maintenance requests",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    // EDIT HERE
    name: "DiaLog",
    subtitle: "AI-Powered Diabetes Health Tracking & Automation Platform",
    impact:
      "Automated health tracking into a structured workflow; applied ML-based pattern detection and insight generation for decision support.",
    bullets: [
      "Designed an end-to-end automated system to transform manual health tracking into structured, analysis-ready records.",
      "Built ingestion/preprocessing pipelines with validation checks to normalize data for analytics and model-ready workflows.",
      "Implemented trend/anomaly detection and summarization-style insights for clearer reporting and monitoring.",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "FastAPI", "PostgreSQL"],
    links: [],
  },
  {
    name: "FareShare",
    subtitle: "Ride-Sharing Platform",
    impact:
      "FastAPI + PostgreSQL backend for ingestion, analytics, and reporting—built to support future optimization use cases.",
    bullets: [
      "Developed backend services to automate trip data ingestion, processing, analytics, and reporting.",
      "Designed REST APIs and optimized relational schemas to support scalable, maintainable workflows.",
      "Generated structured datasets to support downstream analysis and future forecasting/optimization.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Python", "SQLAlchemy", "REST"],
    links: [],
  },
  {
    name: "Client–Server Networking Application",
    subtitle: "Concurrent Sessions + Lifecycle Tracking",
    impact:
      "Multithreaded Python server with connection limits, validation, and structured logging for stable operation under edge cases.",
    bullets: [
      "Built a multithreaded server to manage concurrent clients and track session lifecycles (connect, activity, disconnect).",
      "Enforced connection limits and implemented validation + structured logging to improve reliability under edge cases.",
    ],
    stack: ["Python", "TCP Sockets", "Multithreading", "Logging"],
    links: [],
  },
];

const SKILLS = {
  // EDIT HERE (reorder / trim anytime)
  "Languages & Scripting": ["Python", "SQL", "Java", "JavaScript", "C", "TypeScript"],
  "Backend & Data": ["FastAPI", "PostgreSQL", "REST APIs", "Data Pipelines", "Validation & Logging"],
  "AI / ML": ["Scikit-learn", "ML Pipelines", "Applied AI Workflows"],
  Tools: ["Git", "Linux", "Postman", "Microsoft Office"],
};

function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("show");
            io.unobserve(e.target); // reveal once (clean + performant)
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
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
      <p className="text-xs font-semibold tracking-[0.22em] text-emerald-300/80">{eyebrow}</p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>
      {desc ? <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* =========================
          NAV
          EDIT HERE: Resume link if you add one (e.g., /resume.pdf in /public)
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070A0F]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-6 py-4">
          <a href="#top" className="group inline-flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-[#070A0F] text-sm font-bold">
              AO
            </span>
            <span className="text-sm font-semibold tracking-tight group-hover:opacity-80 transition">
              {PROFILE.name}
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-6 text-sm text-white/70">
            <a className="hover:text-white transition" href="#work">
              Work
            </a>
            <a className="hover:text-white transition" href="#projects">
              Projects
            </a>
            <a className="hover:text-white transition" href="#skills">
              Skills
            </a>
            <a className="hover:text-white transition" href="#contact">
              Contact
            </a>

            <a
              href="#"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* =========================
          HERO (stagger load-in)
      ========================== */}
      <section id="top" className="relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <div className="hero-in flex flex-wrap items-center gap-2" data-delay="1">
              <Pill>{PROFILE.tagline}</Pill>
              <Pill>{PROFILE.location}</Pill>
              <Pill>Wilfrid Laurier University • BSc CS</Pill>
            </div>

            <h1
              className="hero-in mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
              data-delay="2"
            >
              {PROFILE.headline}
            </h1>

            <p
              className="hero-in mt-6 text-base sm:text-lg text-white/70 leading-relaxed"
              data-delay="3"
            >
              {PROFILE.summary}
            </p>

            <div className="hero-in mt-8 flex flex-wrap gap-3" data-delay="3">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-300 text-[#070A0F] px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                LinkedIn
              </a>
              <a
                href="#projects"
                className="rounded-full border border-white/10 bg-white/0 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white transition"
              >
                View Projects
              </a>
            </div>

            {/* Quick metrics */}
            <div className="hero-in mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3" data-delay="3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Production scale</p>
                <p className="mt-1 text-sm font-semibold">1,000+ IoT devices</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Automation impact</p>
                <p className="mt-1 text-sm font-semibold">~25% less manual setup</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Focus</p>
                <p className="mt-1 text-sm font-semibold">SWE • Data • AI • IT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WORK (scroll reveal)
      ========================== */}
      <section id="work" className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20 reveal">
        <SectionTitle
          eyebrow="EXPERIENCE"
          title="Work focused on reliability, automation, and operations."
          desc="I like building software that survives real usage: validation, monitoring, and workflows that reduce manual effort."
        />

        <div className="mt-10 space-y-4">
          {EXPERIENCE.map((x, idx) => (
            <div
              key={`${x.role}-${idx}`}
              className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 transition will-change-transform hover:-translate-y-1 hover:bg-white/[0.07]"
              data-delay="1"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{x.role}</h3>
                  <p className="mt-1 text-sm text-white/70">
                    {x.company} • {x.location}
                  </p>
                </div>
                <div className="text-sm text-white/60">{x.time}</div>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-white/70 leading-relaxed list-disc pl-5">
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          PROJECTS (scroll reveal + stagger feel)
      ========================== */}
      <section id="projects" className="border-y border-white/5 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20 reveal">
          <SectionTitle
            eyebrow="PROJECTS"
            title="Projects built to ship features and support analysis."
            desc="Selected work across backend services, data workflows, and practical ML."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {PROJECTS.map((p, i) => {
              const delay = ((i % 3) + 1) as 1 | 2 | 3;
              return (
                <article
                  key={p.name}
                  className="reveal rounded-3xl border border-white/10 bg-[#070A0F]/40 p-6 transition will-change-transform hover:-translate-y-1 hover:bg-white/[0.06]"
                  data-delay={String(delay)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                    </div>
                    <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                      Featured
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-white/70 leading-relaxed">{p.impact}</p>

                  <ul className="mt-5 space-y-2 text-sm text-white/70 leading-relaxed list-disc pl-5">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Optional links (typed) */}
                  {p.links && p.links.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-3 text-sm">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-200 hover:text-emerald-100 transition underline underline-offset-4"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 text-xs text-white/50">
                      Links available on request (some work is private or in-progress).
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          SKILLS (scroll reveal)
      ========================== */}
      <section id="skills" className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20 reveal">
        <SectionTitle
          eyebrow="SKILLS"
          title="Tools I use to build and ship."
          desc="A practical stack for software engineering, data workflows, and applied AI."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SKILLS).map(([group, items], i) => {
            const delay = ((i % 3) + 1) as 1 | 2 | 3;
            return (
              <div
                key={group}
                className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 transition will-change-transform hover:-translate-y-1 hover:bg-white/[0.07]"
                data-delay={String(delay)}
              >
                <h3 className="text-sm font-semibold text-white">{group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((x) => (
                    <span
                      key={x}
                      className="inline-flex items-center rounded-full border border-white/10 bg-[#070A0F]/40 px-3 py-1 text-xs text-white/75"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================
          CONTACT (scroll reveal)
      ========================== */}
      <section id="contact" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20 reveal">
          <SectionTitle
            eyebrow="CONTACT"
            title="Open to Summer 2026 internships."
            desc="If you’re hiring for software, data, AI/ML, or IT roles, I’d love to connect."
          />

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 transition hover:bg-white/[0.07]">
            <div>
              <p className="text-sm text-white/70">Email</p>
              <a
                className="mt-2 inline-block text-lg font-semibold text-white hover:text-emerald-200 transition"
                href={`mailto:${LINKS.email}`}
              >
                {LINKS.email}
              </a>
              <p className="mt-2 text-sm text-white/55">{PROFILE.location}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white text-[#070A0F] px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                GitHub
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <footer className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/45">
            <p>
              © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js + Tailwind.
            </p>
            <a href="#top" className="hover:text-white/70 transition">
              Back to top
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
