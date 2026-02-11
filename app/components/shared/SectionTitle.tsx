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
      <p 
        className="text-[11px] font-bold tracking-[0.28em] uppercase terminal-reveal"
        style={{ color: 'var(--terminal-text-dim)' }}
      >
        <span className="inline-block">$ {eyebrow}</span>
      </p>
      <h2 
        className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight terminal-reveal" 
        style={{ 
          animationDelay: '0.1s',
          color: 'var(--terminal-text-bright)'
        }}
      >
        {title}
      </h2>
      {desc ? (
        <p 
          className="mt-4 text-sm sm:text-base leading-relaxed terminal-reveal" 
          style={{ 
            animationDelay: '0.2s',
            color: 'var(--terminal-text)'
          }}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}
