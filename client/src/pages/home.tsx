import { StartupLoader } from "@/components/startup-loader";
import { ModernBackground } from "@/components/liquid-background";
import { ThreeScene } from "@/components/three-scene";
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
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useScrollEffects();
  useParticleEffects();

  const handleLoadingComplete = () => {
    setIsLoading(false);
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



      {/* Startup Loading Sequence */}
      {isLoading && <StartupLoader onComplete={handleLoadingComplete} />}

      {/* Modern Background Canvas */}
      <ModernBackground />
      
      {/* 3D Scene */}
      <ThreeScene />

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
