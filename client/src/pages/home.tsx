import { StartupLoader } from "@/components/startup-loader";
import { LiquidBackground } from "@/components/liquid-background";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { MediaSection } from "@/components/media-section";
import { GitHubPanel } from "@/components/github-panel";
import { FooterSection } from "@/components/footer-section";
import { ConsoleCLI } from "@/components/console-cli";
import { ThemeToggle } from "@/components/theme-toggle";
import { useScrollEffects } from "@/hooks/use-scroll-effects";
import { useParticleEffects } from "@/hooks/use-particle-effects";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkip3D, setShowSkip3D] = useState(false);

  useScrollEffects();
  useParticleEffects();

  useEffect(() => {
    // Skip 3D option for accessibility
    const timer = setTimeout(() => {
      setShowSkip3D(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSkip3D = () => {
    document.body.classList.add('static-fallback');
    setShowSkip3D(false);
  };

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      {/* Skip 3D Button for Accessibility */}
      {showSkip3D && (
        <button 
          onClick={handleSkip3D}
          className="fixed top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded z-50 opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Switch to accessible HTML version"
        >
          <i className="fas fa-universal-access mr-2"></i>
          Skip 3D
        </button>
      )}

      {/* Startup Loading Sequence */}
      {isLoading && <StartupLoader onComplete={handleLoadingComplete} />}

      {/* Liquid Background Canvas */}
      <LiquidBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <MediaSection />
          <GitHubPanel />
          <FooterSection />
        </main>
      </div>

      {/* Console CLI Interface */}
      <ConsoleCLI />

      {/* Theme Toggle (Hidden by default) */}
      <ThemeToggle />
    </>
  );
}
