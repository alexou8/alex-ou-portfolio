"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { GlassCard } from "@/app/components/shared/GlassCard";
import { SectionTitle } from "@/app/components/shared/SectionTitle";
import { experiences } from "@/app/lib/data";

/* =========================
   Page
========================= */
export default function WorkPage() {
  return (
    <PageLayout>
      <AnimatedSection>
        <section className="mt-10 sm:mt-14">
          <SectionTitle
            eyebrow="EXPERIENCE"
            title="Built for real environments."
            desc="Hands-on work in production-style IoT systems with monitoring, automation, and reliability focus."
          />

          <div className="mt-8 space-y-5">
            {experiences.map((x, index) => (
              <AnimatedSection key={`${x.company}-${x.role}`} delay={0.1 + index * 0.1} direction="up">
                <GlassCard className="p-7 group terminal-border transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 
                        className="text-lg sm:text-xl font-bold group-hover:transition-all duration-300 font-mono"
                        style={{ color: 'var(--terminal-text-bright)' }}
                      >
                        {x.role}
                      </h3>
                      <p 
                        className="mt-2 text-sm font-mono"
                        style={{ color: 'var(--terminal-text)' }}
                      >
                        {x.company}
                      </p>
                      <p 
                        className="mt-1.5 text-xs font-mono"
                        style={{ color: 'var(--terminal-text-dim)' }}
                      >
                        {x.time} • {x.location}
                      </p>
                    </div>
                    <span 
                      className="rounded px-3.5 py-1.5 text-xs font-bold font-mono"
                      style={{
                        backgroundColor: 'var(--terminal-border)',
                        border: '1px solid var(--terminal-accent)',
                        color: 'var(--terminal-text)'
                      }}
                    >
                      Internship
                    </span>
                  </div>

                  <ul 
                    className="mt-6 space-y-3 text-sm font-mono"
                    style={{ color: 'var(--terminal-text)' }}
                  >
                    {x.bullets.map((b) => (
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
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </PageLayout>
  );
}
