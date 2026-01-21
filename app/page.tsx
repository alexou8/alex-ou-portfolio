"use client";

// ============================================================
// Light Theme Portfolio (Wealthsimple-inspired)
// Next.js App Router + Tailwind + Subtle Animations
// ============================================================

import { useEffect } from "react";

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

const SKILLS = {
  "Languages": ["Python", "SQL", "Java", "JavaScript", "C", "TypeScript"],
  "Backend & Data": ["FastAPI", "PostgreSQL", "REST APIs", "Data Pipelines"],
  "AI / ML": ["Scikit-learn", "Applied ML", "Data Analysis"],
  "Tools": ["Git", "Linux", "Postman", "Power Automate"],
};

/* =========================
   Animation Hook
========================= */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* =========================
   UI Helpers
========================= */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-slate-700">
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
      <p className="text-xs font-semibold tracking-[0.22em] text-emerald-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

/* =========================
   Page
========================= */
export default function Home() {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <span className="font-semibold">{PROFILE.name}</span>
          <div className="hidden sm:flex gap-6 text-sm text-slate-600">
            <a href="#work" className="hover:text-slate-900">Work</a>
            <a href="#projects" className="hover:text-slate-900">Projects</a>
            <a href="#skills" className="hover:text-slate-900">Skills</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <div className="hero-in flex flex-wrap gap-2" data-delay="1">
            <Pill>{PROFILE.tagline}</Pill>
            <Pill>{PROFILE.location}</Pill>
            <Pill>Wilfrid Laurier University</Pill>
          </div>

          <h1 className="hero-in mt-6 text-4xl sm:text-5xl font-semibold tracking-tight" data-delay="2">
            {PROFILE.headline}
          </h1>

          <p className="hero-in mt-6 text-base sm:text-lg text-slate-600 leading-relaxed" data-delay="3">
            {PROFILE.summary}
          </p>

          <div className="hero-in mt-8 flex gap-3" data-delay="3">
            <a href={LINKS.github} className="rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold">
              GitHub
            </a>
            <a href={LINKS.linkedin} className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-20 reveal">
        <SectionTitle
          eyebrow="EXPERIENCE"
          title="Building reliable systems in real environments."
        />

        <div className="mt-10 space-y-4">
          {EXPERIENCE.map((x) => (
            <div key={x.role} className="rounded-3xl border border-black/10 p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold">{x.role}</h3>
              <p className="text-sm text-slate-600 mt-1">
                {x.company} • {x.time}
              </p>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 space-y-2">
                {x.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="bg-slate-50 border-y border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20 reveal">
          <SectionTitle
            eyebrow="PROJECTS"
            title="Selected technical projects."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <div key={p.name} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{p.subtitle}</p>
                <p className="mt-3 text-sm text-slate-600">{p.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs bg-black/5 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-20 reveal">
        <SectionTitle eyebrow="SKILLS" title="Core technical skills." />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SKILLS).map(([k, v]) => (
            <div key={k} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <h4 className="font-semibold text-sm">{k}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {v.map((s) => (
                  <span key={s} className="text-xs bg-black/5 px-3 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-6 py-20 reveal">
          <SectionTitle eyebrow="CONTACT" title="Let’s connect." />
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-6 inline-block rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-semibold"
          >
            {LINKS.email}
          </a>
        </div>
      </section>
    </main>
  );
}
