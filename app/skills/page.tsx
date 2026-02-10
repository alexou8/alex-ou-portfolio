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
    <span className="inline-flex items-center rounded px-3.5 py-1.5 text-xs font-medium font-mono bg-[#24272f] text-[#b8b8b8] border border-[#3a3f4b] transition-all duration-300 hover:border-[#b8b8b8] hover:shadow-[0_0_8px_rgba(184,184,184,0.2)]">
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
            {skillCategories.map((item) => (
              <GlassCard key={item.category} className="p-7 group">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300">
                    {item.category}
                  </h4>
                  <span className="text-xs text-[#858585] group-hover:text-[#b8b8b8] transition-colors duration-300">
                    {item.skills.length} items
                  </span>
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
    </PageLayout>
  );
}
