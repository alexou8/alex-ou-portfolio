"use client";

import { ReactNode, useState, useMemo } from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { FloatingObjects } from "@/app/components/FloatingObjects";
import { LoadingScreen } from "@/app/components/LoadingScreen";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

type PageLayoutProps = {
  children: ReactNode;
  showLoading?: boolean;
};

export function PageLayout({ children, showLoading = false }: PageLayoutProps) {
  const [isLoading, setIsLoading] = useState(showLoading);
  const [showContent, setShowContent] = useState(!showLoading);

  const handleLoadingComplete = useMemo(() => {
    return () => {
      setIsLoading(false);
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 100);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <main 
        className="min-h-screen font-mono transition-opacity duration-700"
        style={{ 
          opacity: showContent ? 1 : 0,
          backgroundColor: 'var(--terminal-bg)',
          color: 'var(--terminal-text)'
        }}
      >
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
    </>
  );
}
