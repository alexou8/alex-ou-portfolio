"use client";

import Link from "next/link";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { projects } from "@/app/lib/data";
import type { Project } from "@/app/lib/data";

/* =========================
   UI Components
========================= */
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
      <p className="text-[11px] font-bold tracking-[0.28em] text-[#858585] uppercase terminal-reveal">
        <span className="inline-block">$ {eyebrow}</span>
      </p>
      <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#f0f0f0] terminal-reveal" style={{ animationDelay: '0.1s' }}>
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-sm sm:text-base text-[#b8b8b8] leading-relaxed terminal-reveal" style={{ animationDelay: '0.2s' }}>
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className={[
        "rounded border border-[#3a3f4b] bg-[#24272f]",
        "shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
        "p-7 font-mono",
        "transition-all duration-300 hover:border-[#b8b8b8] hover:shadow-[0_6px_20px_rgba(184,184,184,0.2)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#f0f0f0]">{p.name}</h3>
          <p className="mt-2 text-sm text-[#858585]">{p.subtitle}</p>
        </div>
        <span className="rounded bg-[#3a3f4b] border border-[#b8b8b8] px-3.5 py-1.5 text-xs font-bold text-[#b8b8b8]">
          Featured
        </span>
      </div>

      <p className="mt-5 text-sm text-[#b8b8b8] leading-relaxed">{p.impact}</p>

      <ul className="mt-5 space-y-2.5 text-sm text-[#858585]">
        {p.bullets.slice(0, 3).map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-[7px] text-[#b8b8b8]">›</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-[#3a3f4b] bg-[#24272f] px-3 py-1 text-xs font-medium text-[#b8b8b8] transition-all duration-300 hover:border-[#b8b8b8]"
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
              className="text-sm font-bold text-[#b8b8b8] hover:text-[#f0f0f0] transition-all duration-300"
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
              className="text-sm text-[#858585] hover:text-[#b8b8b8] transition-colors duration-300 font-mono flex items-center gap-2"
            >
              Interested in working together? <span className="text-[#b8b8b8]">Contact me →</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      <style>{`
        .terminal-reveal {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLayout>
  );
}
