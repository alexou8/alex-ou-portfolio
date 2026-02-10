"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { experiences } from "@/app/lib/data";

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
            {experiences.map((x) => (
              <GlassCard key={`${x.company}-${x.role}`} className="p-7 group terminal-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300 font-mono">
                      {x.role}
                    </h3>
                    <p className="mt-2 text-sm text-[#b8b8b8] font-mono">{x.company}</p>
                    <p className="mt-1.5 text-xs text-[#858585] font-mono">
                      {x.time} • {x.location}
                    </p>
                  </div>
                  <span className="rounded bg-[#3a3f4b] border border-[#b8b8b8] px-3.5 py-1.5 text-xs font-bold text-[#b8b8b8] font-mono">
                    Internship
                  </span>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-[#b8b8b8] font-mono">
                  {x.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[7px] text-[#b8b8b8]">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <style>{`
        .terminal-border {
          position: relative;
          background: #24272f;
          border: 1px solid #3a3f4b;
        }
        
        .terminal-border:hover {
          border-color: #b8b8b8;
          animation: terminalGlow 2s ease-in-out infinite;
        }

        @keyframes terminalGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(184, 184, 184, 0.1); }
          50% { box-shadow: 0 0 15px rgba(184, 184, 184, 0.2); }
        }

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
