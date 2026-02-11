"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { GlassCard } from "@/app/components/shared/GlassCard";
import { SectionTitle } from "@/app/components/shared/SectionTitle";
import { contactLinks, aboutMe } from "@/app/lib/data";

/* =========================
   UI Components
========================= */
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
        "shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
        "transition-all duration-300 hover:shadow-[0_6px_20px_rgba(184,184,184,0.5)]",
        "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        backgroundColor: 'var(--terminal-accent)',
        border: '1px solid var(--terminal-accent)',
        color: 'var(--terminal-bg)'
      }}
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
        "bg-transparent",
        "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 hover:shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
        "hover:-translate-y-0.5",
      ].join(" ")}
      style={{
        border: '1px solid var(--terminal-border)',
        color: 'var(--terminal-text)'
      }}
    >
      {children}
      <span className="opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300">↗</span>
    </a>
  );
}

/* =========================
   Page
========================= */
export default function ContactPage() {
  return (
    <PageLayout>
      <AnimatedSection delay={0.2}>
        <section className="mt-10 sm:mt-14">
          <SectionTitle
            eyebrow="CONTACT"
            title="Let's connect."
            desc="If you want to chat about internships, projects, or building reliable systems, reach out."
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <AnimatedSection delay={0.3} direction="up">
              <GlassCard className="p-7 group transition-transform duration-300 hover:-translate-y-1">
                <div 
                  className="text-xs group-hover:transition-colors duration-300"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  Email
                </div>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="mt-3 block text-sm font-bold group-hover:transition-all duration-300"
                  style={{ color: 'var(--terminal-text-bright)' }}
                >
                  {contactLinks.email}
                </a>
                <p 
                  className="mt-3 text-xs"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  Best for quick coordination.
                </p>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4} direction="up">
              <GlassCard className="p-7 group transition-transform duration-300 hover:-translate-y-1">
                <div 
                  className="text-xs group-hover:transition-colors duration-300"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  LinkedIn
                </div>
                <a
                  href={contactLinks.linkedin}
                  className="mt-3 block text-sm font-bold group-hover:transition-all duration-300"
                  style={{ color: 'var(--terminal-text-bright)' }}
                >
                  alexou8
                </a>
                <p 
                  className="mt-3 text-xs"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  Professional updates and messaging.
                </p>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.5} direction="up">
              <GlassCard className="p-7 group transition-transform duration-300 hover:-translate-y-1">
                <div 
                  className="text-xs group-hover:transition-colors duration-300"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  GitHub
                </div>
                <a
                  href={contactLinks.github}
                  className="mt-3 block text-sm font-bold group-hover:transition-all duration-300"
                  style={{ color: 'var(--terminal-text-bright)' }}
                >
                  github.com/alexou8
                </a>
                <p 
                  className="mt-3 text-xs"
                  style={{ color: 'var(--terminal-text-dim)' }}
                >
                  Projects, code, and experiments.
                </p>
              </GlassCard>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.6} direction="up">
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
          </AnimatedSection>

          <AnimatedSection delay={0.7} direction="up">
            <p 
              className="mt-10 text-xs font-mono"
              style={{ color: 'var(--terminal-text-dim)' }}
            >
              © {new Date().getFullYear()} {aboutMe.name}. Built with Next.js and Tailwind.
            </p>
          </AnimatedSection>
        </section>
      </AnimatedSection>
    </PageLayout>
  );
}
