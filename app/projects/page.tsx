"use client";

import Link from "next/link";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { SectionTitle } from "@/app/components/shared/SectionTitle";
import { projects } from "@/app/lib/data";
import type { Project } from "@/app/lib/data";

/* =========================
   UI Components
========================= */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <AnimatedSection delay={index * 0.1} direction="up">
      <div
        className={[
          "rounded shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
          "p-7 font-mono",
          "transition-all duration-300 hover:shadow-[0_6px_20px_rgba(184,184,184,0.2)]",
          "hover:-translate-y-1",
        ].join(" ")}
        style={{
          border: '1px solid var(--terminal-border)',
          backgroundColor: 'var(--terminal-bg-light)'
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 
              className="text-xl font-bold"
              style={{ color: 'var(--terminal-text-bright)' }}
            >
              {p.name}
            </h3>
            <p 
              className="mt-2 text-sm"
              style={{ color: 'var(--terminal-text-dim)' }}
            >
              {p.subtitle}
            </p>
          </div>
          <span 
            className="rounded px-3.5 py-1.5 text-xs font-bold"
            style={{
              backgroundColor: 'var(--terminal-border)',
              border: '1px solid var(--terminal-accent)',
              color: 'var(--terminal-text)'
            }}
          >
            Featured
          </span>
        </div>

        <p 
          className="mt-5 text-sm leading-relaxed"
          style={{ color: 'var(--terminal-text)' }}
        >
          {p.impact}
        </p>

        <ul 
          className="mt-5 space-y-2.5 text-sm"
          style={{ color: 'var(--terminal-text-dim)' }}
        >
          {p.bullets.slice(0, 3).map((b) => (
            <li key={b} className="flex gap-3">
              <span 
                className="mt-[7px]"
                style={{ color: 'var(--terminal-text)' }}
              >
                ›
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded px-3 py-1 text-xs font-medium transition-all duration-300 hover:shadow-[0_0_8px_rgba(184,184,184,0.2)]"
              style={{
                border: '1px solid var(--terminal-border)',
                backgroundColor: 'var(--terminal-bg-light)',
                color: 'var(--terminal-text)'
              }}
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
                className="text-sm font-bold transition-all duration-300"
                style={{ color: 'var(--terminal-text)' }}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </AnimatedSection>
  );
}

/* =========================
   Page
========================= */
export default function ProjectsPage() {
  return (
    <PageLayout>
      <AnimatedSection delay={0.1}>
        <section className="mt-10 sm:mt-14">
          <SectionTitle
            eyebrow="PROJECTS"
            title="Selected work."
            desc="A showcase of projects I've built, from AI-powered health tracking to backend data platforms."
          />

          <div className="mt-8 flex flex-col gap-5">
            <Link 
              href="/contact"
              className="text-sm transition-colors duration-300 font-mono flex items-center gap-2"
              style={{ color: 'var(--terminal-text-dim)' }}
            >
              Interested in working together? <span style={{ color: 'var(--terminal-text)' }}>Contact me →</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            {projects.map((p, index) => (
              <ProjectCard key={p.name} p={p} index={index} />
            ))}
          </div>
        </section>
      </AnimatedSection>
    </PageLayout>
  );
}
