"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { GlassCard } from "@/app/components/shared/GlassCard";
import { SectionTitle } from "@/app/components/shared/SectionTitle";
import { skillCategories } from "@/app/lib/data";

/* =========================
   UI Components
========================= */
function SkillChip({ text }: { text: string }) {
  return (
    <span 
      className="inline-flex items-center rounded px-3.5 py-1.5 text-xs font-medium font-mono transition-all duration-300 hover:shadow-[0_0_8px_rgba(184,184,184,0.2)] hover:-translate-y-0.5"
      style={{
        backgroundColor: 'var(--terminal-bg-light)',
        color: 'var(--terminal-text)',
        border: '1px solid var(--terminal-border)'
      }}
    >
      {text}
    </span>
  );
}

/* =========================
   Page
========================= */
export default function SkillsPage() {
  return (
    <PageLayout>
      <AnimatedSection delay={0.15}>
        <section className="mt-10 sm:mt-14">
          <SectionTitle
            eyebrow="SKILLS"
            title="Core tools I ship with."
            desc="Grouped for quick scanning, with chip-style tags and app-like cards."
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillCategories.map((item, index) => (
              <AnimatedSection key={item.category} delay={0.2 + index * 0.1} direction="up">
                <GlassCard className="p-7 group transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <h4 
                      className="text-base font-bold group-hover:transition-all duration-300"
                      style={{ color: 'var(--terminal-text-bright)' }}
                    >
                      {item.category}
                    </h4>
                    <span 
                      className="text-xs group-hover:transition-colors duration-300"
                      style={{ color: 'var(--terminal-text-dim)' }}
                    >
                      {item.skills.length} items
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {item.skills.map((s) => (
                      <SkillChip key={s} text={s} />
                    ))}
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </PageLayout>
  );
}
