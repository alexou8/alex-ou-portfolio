"use client";

import { ReactNode } from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { FloatingObjects } from "@/app/components/FloatingObjects";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#1a1d23] text-[#b8b8b8] font-mono">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Floating Background Objects */}
      <FloatingObjects />

      {/* App container */}
      <div className="relative mx-auto max-w-md sm:max-w-6xl px-4 sm:px-6">
        <Header />
        
        {/* Content */}
        <div className="pb-24 sm:pb-16">
          {children}
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileNav />
    </main>
  );
}
