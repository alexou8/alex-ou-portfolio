// app/page.tsx
// ============================================================
// Wealthsimple-inspired Portfolio (Next.js App Router + Tailwind)
// - Dark, minimal, crisp spacing, rounded cards, subtle gradients
// - EDIT HERE comments show what to change quickly
// ============================================================

const LINKS = {
  // EDIT HERE
  github: "https://github.com/alexou8",
  linkedin: "https://www.linkedin.com/in/alexou",
  email: "alex.ou@wlu.ca",
};

const PROFILE = {
  // EDIT HERE
  name: "Alex Ou",
  location: "Richmond Hill, ON",
  tagline: "Backend • Data • Automation",
  headline: "Building reliable systems that turn raw data into real decisions.",
  summary:
    "Senior Computer Science student focused on backend development, data pipelines, and automation. I’ve supported production IoT smart-lighting software operating across 1,000+ devices and built FastAPI + PostgreSQL systems for analytics and reporting.",
};

const EXPERIENCE = [
  {
    // EDIT HERE
    role: "IoT Software Developer Intern",
    company: "Guangzhou Mingliang Energy Saving Technology Co., Ltd.",
    time: "Summer 2024",
    location: "Guangdong, China",
    bullets: [
      "Contributed to development and testing of IoT smart-lighting software using embedded sensor modules and NB-IoT communication to manage 1,000+ devices.",
      "Automated device setup using configuration templates (grouping, brightness profiles, timing rules), reducing manual technician intervention by ~25%.",
      "Built Python monitoring/diagnostic scripts to analyze telemetry and logs from 1,000+ devices to improve reliability and issue detection.",
      "Implemented automated device-health checks (uptime, responsiveness, power usage) to reduce downtime and maintenance requests.",
    ],
  },
];

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

const PROJECTS: Project[] = [
  {
    // EDIT HERE
    name: "DiaLog",
    subtitle: "AI-Powered Health Tracking & Automation Platform",
    impact:
      "Automated diabetes tracking into a structured workflow; ROC-AUC 0.72–0.78 for glucose spike detection.",
    bullets: [
      "Designed an end-to-end automated system to transform manual diabetes tracking (medication, food intake, glucose levels) into a structured workflow.",
      "Built ingestion/preprocessing pipelines to normalize user health data for ML analysis; achieved ROC-AUC 0.72–0.78.",
      "Implemented pattern detection and automated insight generation using Generative AI concepts (Copilot-style agents) for summarization/reporting.",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "FastAPI", "PostgreSQL"],
    links: [
      // EDIT HERE (optional)
      // { label: "GitHub", href: "https://github.com/..." },
      // { label: "Demo", href: "https://..." },
    ],
  },
  {
    name: "FareShare",
    subtitle: "Ride-Sharing Platform (Backend + Data)",
    impact:
      "FastAPI + PostgreSQL backend for ingestion, analytics, and reporting; built for future ML optimization.",
    bullets: [
      "Developed backend services to automate trip data ingestion, processing, analytics, and reporting.",
      "Designed REST APIs and optimized relational schemas to support scalable, maintainable workflows.",
      "Generated structured datasets for future ML-driven demand prediction and route optimization.",
    ],
    stack: ["FastAPI", "PostgreSQL", "Python", "SQLAlchemy", "REST"],
    links: [
      // EDIT HERE (optional)
      // { label: "GitHub", href: "https://github.com/..." },
      // { label: "Demo", href: "https://..." },
    ],
  },
  {
    name: "Client–Server Networking Application",
    subtitle: "Concurrent Sessions + Lifecycle Tracking",
    impact:
      "Multithreaded Python server with connection limits, validation, logging, and robust error handling.",
    bullets: [
      "Built a multithreaded server to automate session handling and manage client lifecycle tracking (connect, activity, disconnect).",
      "Enforced connection limits and implemented validation + structured logging to improve stability under edge cases.",
    ],
    stack: ["Python", "TCP Sockets", "Multithreading", "Logging"],
    links: [
      // EDIT HERE (optional)
      // { label: "GitHub", href: "https://github.com/..." },
    ],
  },
];

const SKILLS = {
  // Pulled from resume — EDIT HERE to reorder or remove
  "Languages & Scripting": ["Python", "SQL", "Java", "JavaScript", "C", "TypeScript", "Lua", "VBA"],
  "Backend & Data": ["FastAPI", "PostgreSQL", "SQLAlchemy", "REST APIs", "Data Pipelines"],
  "AI / ML": ["Scikit-learn", "ML Pipelines", "Generative AI (Copilot Agents)"],
  "Tools": ["Git", "CircuitVerse", "Microsoft Office", "Power Automate (workflow concepts)"],
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold tracking-[0.22em] text-emerald-300/80">{eyebrow}</p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>
      {desc ? <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">{desc}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070A0F] text-white">
      {/* ======================================================
        NAV
        EDIT HERE: Resume link if you add one (e.g., /resume.pdf)
      ======================================================= */}
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

            {/* EDIT HERE: If you host a resume in /public/resume.pdf then set href="/resume.pdf" */}
            <a
              href="#"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* ======================================================
        HERO (Wealthsimple-ish: bold, minimal, gradient accents)
      ======================================================= */}
      <section id="top" className="relative overflow-hidden">
        {/* background accents */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-56 right-[-120px] h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Pill>{PROFILE.tagline}</Pill>
              <Pill>{PROFILE.location}</Pill>
              <Pill>Wilfrid Laurier University • BSc CS</Pill>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              {PROFILE.headline}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">{PROFILE.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
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

            {/* quick metrics */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Production scale</p>
                <p className="mt-1 text-sm font-semibold">1,000+ IoT devices</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">Automation impact</p>
                <p className="mt-1 text-sm font-semibold">~25% less manual setup</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-white/60">ML performance</p>
                <p className="mt-1 text-sm font-semibold">ROC-AUC 0.72–0.78</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
        WORK
      ======================================================= */}
      <section id="work" className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20">
        <SectionTitle
          eyebrow="EXPERIENCE"
          title="Work focused on reliability, automation, and operations."
          desc="I like building software that survives real usage: validation, monitoring, and workflows that reduce manual effort."
        />

        <div className="mt-10 space-y-4">
          {EXPERIENCE.map((x) => (
            <div key={x.role} className="rounded-3xl border border-white/10 bg-white/5 p-6">
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

      {/* ======================================================
        PROJECTS
      ======================================================= */}
      <section id="projects" className="border-y border-white/5 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20">
          <SectionTitle
            eyebrow="PROJECTS"
            title="Projects built to ship features and support analysis."
            desc="Selected work across backend services, data workflows, and practical ML."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {PROJECTS.map((p) => (
              <article key={p.name} className="rounded-3xl border border-white/10 bg-[#070A0F]/40 p-6">
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

                {/* Optional links */}
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
                    {/* EDIT HERE: If you add repo links later, remove this line */}
                    Links available on request (some work is private or in-progress).
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
        SKILLS
      ======================================================= */}
      <section id="skills" className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20">
        <SectionTitle
          eyebrow="SKILLS"
          title="Tools I use to build and ship."
          desc="A practical stack for backend services, data workflows, and automation."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="rounded-3xl border border-white/10 bg-white/5 p-6">
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
          ))}
        </div>
      </section>

      {/* ======================================================
        CONTACT
      ======================================================= */}
      <section id="contact" className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-20">
          <SectionTitle
            eyebrow="CONTACT"
            title="Open to Summer 2026 internships."
            desc="If you’re hiring for backend, data, or automation roles, I’d love to connect."
          />

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
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
            <p>© {new Date().getFullYear()} {PROFILE.name}. Built with Next.js + Tailwind.</p>
            <a href="#top" className="hover:text-white/70 transition">
              Back to top
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
