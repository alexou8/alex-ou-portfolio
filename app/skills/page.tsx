"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { skillCategories } from "@/app/lib/data";

/* =========================
   UI Components
========================= */
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
        "rounded border border-[#3a3f4b] bg-[#24272f]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "transition-all duration-300 hover:border-[#b8b8b8] hover:shadow-[0_0_15px_rgba(184,184,184,0.2)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
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
