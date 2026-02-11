import { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "transition-all duration-300",
        className,
      ].join(" ")}
      style={{
        border: '1px solid var(--terminal-border)',
        backgroundColor: 'var(--terminal-bg-light)'
      }}
    >
      {children}
    </div>
  );
}
