"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/lib/data";

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
      <div className="rounded border border-[#3a3f4b] bg-[#24272f] shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
        <nav className="flex items-center justify-between px-5 py-3.5 font-mono">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded px-4 py-2.5 text-sm font-bold text-[#b8b8b8] transition-all duration-300 hover:text-[#f0f0f0]"
          >
            <span className="text-[#b8b8b8]">$</span>
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
                      ? "active bg-[#3a3f4b] text-[#f0f0f0] border-[#b8b8b8]" 
                      : "bg-transparent text-[#858585] hover:bg-[#24272f] hover:text-[#b8b8b8] border-transparent hover:border-[#3a3f4b]",
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
