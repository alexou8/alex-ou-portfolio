"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/lib/data";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  
  // Determine active page based on pathname
  const getActiveId = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/work")) return "work";
    if (pathname.startsWith("/projects")) return "projects";
    if (pathname.startsWith("/skills")) return "skills";
    if (pathname.startsWith("/contact")) return "contact";
    return "home";
  };
  
  const active = getActiveId();

  return (
    <header className="sticky top-0 z-40 pt-4">
      <div 
        className="rounded shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        style={{
          border: '1px solid var(--terminal-border)',
          backgroundColor: 'var(--terminal-bg-light)'
        }}
      >
        <nav className="flex items-center justify-between px-5 py-3.5 font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded px-4 py-2.5 text-sm font-bold transition-all duration-300"
            style={{ color: 'var(--terminal-text)' }}
          >
            <span style={{ color: 'var(--terminal-text)' }}>$</span>
            Alex Ou
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            {navigation.slice(1).map((n) => {
              const href = n.id === "home" ? "/" : `/${n.id}`;
              return (
                <Link
                  key={n.id}
                  href={href}
                  className={[
                    "nav-link rounded px-5 py-2.5 text-sm font-bold transition-all duration-300",
                    "border",
                    active === n.id 
                      ? "active" 
                      : "bg-transparent border-transparent",
                  ].join(" ")}
                  style={
                    active === n.id
                      ? {
                          backgroundColor: 'var(--terminal-border)',
                          color: 'var(--terminal-text-bright)',
                          borderColor: 'var(--terminal-accent)'
                        }
                      : {
                          color: 'var(--terminal-text-dim)'
                        }
                  }
                >
                  {n.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
