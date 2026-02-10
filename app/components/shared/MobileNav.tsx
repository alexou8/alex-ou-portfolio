"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/app/lib/data";

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
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="rounded border border-[#3a3f4b] bg-[#24272f] shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
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
                      ? "bg-[#3a3f4b] border border-[#b8b8b8]" 
                      : "bg-transparent hover:bg-[#24272f]",
                  ].join(" ")}
                >
                  <span className="text-lg">{n.emoji}</span>
                  <span
                    className={[
                      "text-[10px] font-bold",
                      isActive ? "text-[#b8b8b8]" : "text-[#858585]",
                    ].join(" ")}
                  >
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
