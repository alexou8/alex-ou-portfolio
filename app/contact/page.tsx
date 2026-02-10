"use client";

import { AnimatedSection } from "@/app/components/AnimatedSection";
import { PageLayout } from "@/app/components/shared/PageLayout";
import { contactLinks, aboutMe } from "@/app/lib/data";

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
        "bg-[#b8b8b8] border border-[#b8b8b8]",
        "text-[#1a1d23] shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
        "transition-all duration-300 hover:bg-[#f0f0f0] hover:shadow-[0_6px_20px_rgba(184,184,184,0.5)]",
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
        "border border-[#3a3f4b] bg-transparent text-[#b8b8b8]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.2)]",
        "transition-all duration-300 hover:bg-[#24272f] hover:border-[#b8b8b8] hover:shadow-[0_4px_12px_rgba(184,184,184,0.3)]",
      ].join(" ")}
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
            <GlassCard className="p-7 group">
              <div className="text-xs text-[#858585] group-hover:text-[#b8b8b8] transition-colors duration-300">Email</div>
              <a
                href={`mailto:${contactLinks.email}`}
                className="mt-3 block text-sm font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300"
              >
                {contactLinks.email}
              </a>
              <p className="mt-3 text-xs text-[#858585]">Best for quick coordination.</p>
            </GlassCard>

            <GlassCard className="p-7 group">
              <div className="text-xs text-[#858585] group-hover:text-[#b8b8b8] transition-colors duration-300">LinkedIn</div>
              <a
                href={contactLinks.linkedin}
                className="mt-3 block text-sm font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300"
              >
                alexou8
              </a>
              <p className="mt-3 text-xs text-[#858585]">Professional updates and messaging.</p>
            </GlassCard>

            <GlassCard className="p-7 group">
              <div className="text-xs text-[#858585] group-hover:text-[#b8b8b8] transition-colors duration-300">GitHub</div>
              <a
                href={contactLinks.github}
                className="mt-3 block text-sm font-bold text-[#f0f0f0] group-hover:text-[#b8b8b8] transition-all duration-300"
              >
                github.com/alexou8
              </a>
              <p className="mt-3 text-xs text-[#858585]">Projects, code, and experiments.</p>
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

          <p className="mt-10 text-xs text-[#858585] font-mono">
            © {new Date().getFullYear()} {aboutMe.name}. Built with Next.js and Tailwind.
          </p>
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
