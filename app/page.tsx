"use client";

// ============================================================
// Alex Ou Portfolio - Enhanced with Animations & Object-Driven Architecture
// Next.js App Router + Tailwind + Framer Motion + Terminal Aesthetics
// - Framer Motion entrance animations (fade + y-slide)
// - Typewriter/rotating headline
// - Animated nav underlines
// - Object-driven content architecture
// - Floating background objects
// ============================================================

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSection } from "./components/AnimatedSection";
import { TypewriterHeadline } from "./components/TypewriterHeadline";
import { FloatingObjects } from "./components/FloatingObjects";
import { ScrollProgress } from "./components/ScrollProgress";
import {
  aboutMe,
  contactLinks,
  experiences,
  projects,
  skillCategories,
  navigation,
} from "./lib/data";
import type { Project } from "./lib/data";

/* =========================
   Types (now imported from data.ts)
========================= */
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
   Typing Animation Hook
========================= */
function useTypingEffect(text: string, speed = 50) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      let charIndex = 0;
      const timer = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [text, speed, isTyping]);

  return { displayedText, startTyping: () => setIsTyping(true), isTyping };
}

/* =========================
   Terminal Typing Component
========================= */
function TerminalText({ 
  children, 
  delay = 0,
  speed = 30 
}: { 
  children: string; 
  delay?: number;
  speed?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, visible]);

  useEffect(() => {
    if (visible && children) {
      let charIndex = 0;
      const text = children;
      const timer = setInterval(() => {
        if (charIndex <= text.length) {
          setDisplayText(text.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(timer);
        }
      }, speed);
      return () => clearInterval(timer);
    }
  }, [visible, children, speed]);

  return (
    <span ref={ref} className="inline-block">
      {displayText}
      {visible && displayText.length < children.length && (
        <span className="terminal-cursor" />
      )}
    </span>
  );
}

/* =========================
   Reveal hook (terminal style)
========================= */
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal='true']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-show");
            // Add terminal-reveal class to children.
            const terminalElements = e.target.querySelectorAll<HTMLElement>(".terminal-reveal");
            terminalElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("show");
              }, index * 100);
            });
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
    <span className="inline-flex items-center gap-2 rounded border border-[#2a2e38] bg-[#1a1d23] px-4 py-1.5 text-xs text-[#a0a0a0] font-mono transition-all duration-300 hover:border-[#a0a0a0] hover:shadow-[0_0_10px_rgba(160,160,160,0.3)]">
      <span className="text-[#a0a0a0]">›</span>
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
    <div className="max-w-2xl font-mono">
      <p className="text-[11px] font-bold tracking-[0.28em] text-[#6b6b6b] uppercase terminal-reveal">
        <span className="inline-block">$ {eyebrow}</span>
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#e0e0e0] terminal-reveal" style={{ animationDelay: '0.1s' }}>
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-sm sm:text-base text-[#a0a0a0] leading-relaxed terminal-reveal" style={{ animationDelay: '0.2s' }}>
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
        "rounded border border-[#2a2e38] bg-[#1a1d23]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 hover:border-[#a0a0a0] hover:shadow-[0_0_15px_rgba(160,160,160,0.2)]",
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
        "bg-[#a0a0a0] border border-[#a0a0a0]",
        "text-[#0f1115] shadow-[0_4px_12px_rgba(160,160,160,0.3)]",
        "transition-all duration-300 hover:bg-[#e0e0e0] hover:shadow-[0_6px_20px_rgba(160,160,160,0.5)]",
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
        "border border-[#2a2e38] bg-transparent text-[#a0a0a0]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 hover:bg-[#1a1d23] hover:border-[#a0a0a0] hover:shadow-[0_4px_12px_rgba(160,160,160,0.3)]",
      ].join(" ")}
    >
      {children}
      <span className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">↗</span>
    </a>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard className="p-5 group terminal-border">
      <div className="text-xs text-[#6b6b6b] group-hover:text-[#a0a0a0] transition-colors duration-300 font-mono">{label}</div>
      <div className="mt-2 text-lg font-bold text-[#e0e0e0] group-hover:text-[#a0a0a0] transition-all duration-300 font-mono">{value}</div>
    </GlassCard>
  );
}

function SkillChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded px-3.5 py-1.5 text-xs font-medium font-mono bg-[#1a1d23] text-[#a0a0a0] border border-[#2a2e38] transition-all duration-300 hover:border-[#a0a0a0] hover:shadow-[0_0_8px_rgba(160,160,160,0.2)]">
      {text}
    </span>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className={[
        "snap-center min-w-[86%] sm:min-w-[460px]",
        "rounded border border-[#2a2e38] bg-[#1a1d23]",
        "shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        "p-7 font-mono",
        "transition-all duration-300 hover:border-[#a0a0a0] hover:shadow-[0_6px_20px_rgba(160,160,160,0.2)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#e0e0e0]">{p.name}</h3>
          <p className="mt-2 text-sm text-[#6b6b6b]">{p.subtitle}</p>
        </div>
        <span className="rounded bg-[#2a2e38] border border-[#a0a0a0] px-3.5 py-1.5 text-xs font-bold text-[#a0a0a0]">
          Featured
        </span>
      </div>

      <p className="mt-5 text-sm text-[#a0a0a0] leading-relaxed">{p.impact}</p>

      <ul className="mt-5 space-y-2.5 text-sm text-[#6b6b6b]">
        {p.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-[7px] text-[#a0a0a0]">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-[#2a2e38] bg-[#0f1115] px-3 py-1 text-xs font-medium text-[#a0a0a0] transition-all duration-300 hover:bg-[#1a1d23] hover:border-[#a0a0a0]"
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
              className="text-sm font-bold text-[#a0a0a0] hover:text-[#e0e0e0] transition-all duration-300"
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

  const active = useActiveSection(navigation.map((n) => n.id));

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
    <main className="min-h-screen bg-[#0f1115] text-[#a0a0a0] font-mono">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Floating Background Objects */}
      <FloatingObjects />
      
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

        @keyframes terminalGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(212, 165, 116, 0.1); }
          50% { box-shadow: 0 0 15px rgba(212, 165, 116, 0.2); }
        }

        .scroll-smooth-ios { -webkit-overflow-scrolling: touch; }
        
        .terminal-border {
          position: relative;
          background: #1a1d23;
          border: 1px solid #2a2e38;
        }
        
        .terminal-border:hover {
          border-color: #a0a0a0;
          animation: terminalGlow 2s ease-in-out infinite;
        }
      `}</style>

      {/* App container */}
      <div className="relative mx-auto max-w-md sm:max-w-6xl px-4 sm:px-6">
        {/* Header - Terminal style */}
        <header className="sticky top-0 z-40 pt-4">
          <div className="rounded border border-[#2a2e38] bg-[#1a1d23] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <nav className="flex items-center justify-between px-5 py-3.5 font-mono">
              <button
                type="button"
                onClick={() => scrollToId("home")}
                className="inline-flex items-center gap-3 rounded px-4 py-2.5 text-sm font-bold text-[#a0a0a0] transition-all duration-300 hover:text-[#e0e0e0]"
              >
                <span className="text-[#a0a0a0]">$</span>
                {aboutMe.name}
              </button>

              <div className="hidden sm:flex items-center gap-2">
                {navigation.slice(1).map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => scrollToId(n.id)}
                    className={[
                      "nav-link rounded px-5 py-2.5 text-sm font-bold transition-all duration-300",
                      "border",
                      active === n.id 
                        ? "active bg-[#2a2e38] text-[#e0e0e0] border-[#a0a0a0]" 
                        : "bg-transparent text-[#6b6b6b] hover:bg-[#1a1d23] hover:text-[#a0a0a0] border-transparent hover:border-[#2a2e38]",
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
            <GlassCard className="relative overflow-hidden group terminal-border">
              <div className="p-7 sm:p-12">
                <div className="flex flex-wrap gap-3">
                  <Pill>{aboutMe.tagline}</Pill>
                  <Pill>{aboutMe.location}</Pill>
                  <Pill>Wilfrid Laurier University</Pill>
                </div>

                <div className="mt-8">
                  <div className="text-[#6b6b6b] text-sm font-mono mb-2">
                    $ whoami
                  </div>
                  {/* Typewriter rotating headline */}
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#e0e0e0] mb-4">
                    <TypewriterHeadline headlines={aboutMe.rotatingHeadlines} />
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#a0a0a0] leading-tight font-mono">
                    {aboutMe.headline}
                  </h1>
                </div>

                <p className="mt-6 text-base sm:text-lg text-[#a0a0a0] leading-relaxed max-w-3xl font-mono">
                  {aboutMe.summary}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
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

                <div className="mt-10 grid grid-cols-3 gap-4">
                  <StatCard label="Production scale" value="1,000+ devices" />
                  <StatCard label="Automation impact" value="~25% less setup" />
                  <StatCard label="Focus" value="Reliable systems" />
                </div>
              </div>
            </GlassCard>
          </section>

          {/* EXPERIENCE */}
          <AnimatedSection>
            <section id="work" className="mt-10 sm:mt-14">
              <SectionTitle
                eyebrow="EXPERIENCE"
                title="Built for real environments."
                desc="Hands-on work in production-style IoT systems with monitoring, automation, and reliability focus."
              />

              <div className="mt-8 space-y-5">
                {experiences.map((x) => (
                <GlassCard key={`${x.company}-${x.role}`} className="p-7 group terminal-border">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#e0e0e0] group-hover:text-[#a0a0a0] transition-all duration-300 font-mono">
                        {x.role}
                      </h3>
                      <p className="mt-2 text-sm text-[#a0a0a0] font-mono">{x.company}</p>
                      <p className="mt-1.5 text-xs text-[#6b6b6b] font-mono">
                        {x.time} • {x.location}
                      </p>
                    </div>
                    <span className="rounded bg-[#2a2e38] border border-[#a0a0a0] px-3.5 py-1.5 text-xs font-bold text-[#a0a0a0] font-mono">
                      Internship
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-[#a0a0a0] font-mono">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[7px] text-[#a0a0a0]">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
            </section>
          </AnimatedSection>

          {/* PROJECTS */}
          <AnimatedSection delay={0.1}>
            <section id="projects" className="mt-10 sm:mt-14">
              <SectionTitle
                eyebrow="PROJECTS"
                title="Swipe through selected work."
                desc="Tap, skim, and explore. This section is built like a mobile app carousel with snap scrolling."
              />

            <div className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-[#6b6b6b] font-mono">Tip: swipe left and right on mobile.</p>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  className="rounded border border-[#2a2e38] bg-transparent px-5 py-2.5 text-sm font-bold text-[#a0a0a0] font-mono transition-all duration-300 hover:bg-[#1a1d23] hover:border-[#a0a0a0]"
                >
                  Contact →
                </button>
              </div>

              <div className="mt-4 flex gap-5 overflow-x-auto scroll-smooth-ios snap-x snap-mandatory pb-3 pr-3">
                <div className="w-2 shrink-0" />
                {projects.map((p) => (
                  <ProjectCard key={p.name} p={p} />
                ))}
                <div className="w-6 shrink-0" />
              </div>
            </div>
            </section>
          </AnimatedSection>

          {/* SKILLS */}
          <AnimatedSection delay={0.15}>
            <section id="skills" className="mt-10 sm:mt-14">
              <SectionTitle
                eyebrow="SKILLS"
                title="Core tools I ship with."
                desc="Grouped for quick scanning, with chip-style tags and app-like cards."
              />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {skillCategories.map((item) => (
                <GlassCard key={item.category} className="p-7 group">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-teal-300 transition-all duration-300">{item.category}</h4>
                    <span className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">{item.skills.length} items</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {item.skills.map((s) => (
                      <SkillChip key={s} text={s} />
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
          </AnimatedSection>

          {/* CONTACT */}
          <AnimatedSection delay={0.2}>
          <section id="contact" className="mt-10 sm:mt-14">
            <SectionTitle
              eyebrow="CONTACT"
              title="Let’s connect."
              desc="If you want to chat about internships, projects, or building reliable systems, reach out."
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">Email</div>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  {contactLinks.email}
                </a>
                <p className="mt-3 text-xs text-gray-400">Best for quick coordination.</p>
              </GlassCard>

              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">LinkedIn</div>
                <a
                  href={contactLinks.linkedin}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  alexou8
                </a>
                <p className="mt-3 text-xs text-gray-400">Professional updates and messaging.</p>
              </GlassCard>

              <GlassCard className="p-7 group">
                <div className="text-xs text-gray-400 group-hover:text-purple-300 transition-colors duration-300">GitHub</div>
                <a
                  href={contactLinks.github}
                  className="mt-3 block text-sm font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-teal-300 transition-all duration-300"
                >
                  github.com/alexou8
                </a>
                <p className="mt-3 text-xs text-gray-400">Projects, code, and experiments.</p>
              </GlassCard>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <PrimaryButton href={`mailto:${contactLinks.email}`} ariaLabel="Email Alex">
                Email me
              </PrimaryButton>
              <SecondaryButton href={contactLinks.linkedin} ariaLabel="Open LinkedIn">
                LinkedIn
              </SecondaryButton>
              <SecondaryButton href={contactLinks.github} ariaLabel="Open GitHub">
                GitHub
              </SecondaryButton>
            </div>

            <p className="mt-10 text-xs text-[#6b6b6b] font-mono">
              © {new Date().getFullYear()} {aboutMe.name}. Built with Next.js and Tailwind.
            </p>
          </section>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom Tab Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="mx-auto max-w-md px-4 pb-4">
          <div className="rounded border border-[#2a2e38] bg-[#1a1d23] shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-5 px-2 py-2">
              {navigation.map((n) => {
                const isActive = active === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => scrollToId(n.id)}
                    className={[
                      "flex flex-col items-center justify-center gap-1.5 rounded px-2 py-3 font-mono",
                      "transition-all duration-300",
                      isActive 
                        ? "bg-[#2a2e38] border border-[#a0a0a0]" 
                        : "bg-transparent hover:bg-[#0f1115]",
                    ].join(" ")}
                  >
                    <span className="text-lg">{n.emoji}</span>
                    <span
                      className={[
                        "text-[10px] font-bold",
                        isActive ? "text-[#a0a0a0]" : "text-[#6b6b6b]",
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
