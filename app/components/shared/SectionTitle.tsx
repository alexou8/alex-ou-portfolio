export function SectionTitle({
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
