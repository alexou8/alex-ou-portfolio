"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/lib/data";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function MobileNav() {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      {/* Theme toggle floating above nav bar */}
      <div className="absolute -top-16 right-4">
        <ThemeToggle />
      </div>
      
      <div className="mx-auto max-w-md px-4 pb-4">
        <div 
          className="rounded shadow-[0_-4px_12px_rgba(0,0,0,0.3)]"
          style={{
            border: '1px solid var(--terminal-border)',
            backgroundColor: 'var(--terminal-bg-light)'
          }}
        >
          <div className="grid grid-cols-5 px-2 py-2">
            {navigation.map((n) => {
              const isActive = active === n.id;
              const href = n.id === "home" ? "/" : `/${n.id}`;
              return (
                <Link
                  key={n.id}
                  href={href}
                  className={[
                    "flex flex-col items-center justify-center gap-1.5 rounded px-2 py-3 font-mono",
                    "transition-all duration-300",
                    isActive 
                      ? "border" 
                      : "bg-transparent",
                  ].join(" ")}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--terminal-border)',
                          borderColor: 'var(--terminal-accent)',
                          color: 'var(--terminal-text)'
                        }
                      : {
                          color: 'var(--terminal-text-dim)'
                        }
                  }
                >
                  <span className="text-lg">{n.emoji}</span>
                  <span className="text-[10px] font-bold">
                    {n.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
