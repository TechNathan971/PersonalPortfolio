import { useEffect, useRef } from "react";

export function useScrollEffects() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for scroll-triggered animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('animate-out');
            
            // Trigger specific animations based on section
            const sectionId = entry.target.id;
            switch (sectionId) {
              case 'about':
                triggerAboutAnimations(entry.target);
                break;
              case 'projects':
                triggerProjectsAnimations(entry.target);
                break;
              case 'media':
                triggerMediaAnimations(entry.target);
                break;
              case 'contact':
                triggerContactAnimations(entry.target);
                break;
            }
          } else {
            entry.target.classList.remove('animate-in');
            entry.target.classList.add('animate-out');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();

    // Setup scroll-based parallax effects
    setupParallaxEffects();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      cleanupScrollListeners();
    };
  }, []);

  const triggerAboutAnimations = (section: Element) => {
    const cards = section.querySelectorAll('.holo-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('slide-in-left');
      }, index * 200);
    });
  };

  const triggerProjectsAnimations = (section: Element) => {
    const projectCards = section.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('scale-in');
      }, index * 100);
    });
  };

  const triggerMediaAnimations = (section: Element) => {
    const videoPlanes = section.querySelectorAll('.video-overlay');
    videoPlanes.forEach((plane, index) => {
      setTimeout(() => {
        plane.classList.add('fade-in-up');
      }, index * 150);
    });
  };

  const triggerContactAnimations = (section: Element) => {
    const socialOrbs = section.querySelectorAll('[class*="absolute"]');
    socialOrbs.forEach((orb, index) => {
      setTimeout(() => {
        orb.classList.add('bounce-in');
      }, index * 100);
    });
  };

  const setupSmoothScrolling = () => {
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          // Custom easing function for smooth scroll
          const start = window.pageYOffset;
          const targetPosition = targetElement.offsetTop - 80; // Account for header
          const distance = targetPosition - start;
          const duration = 1200;
          let startTime: number;

          const easeInOutCubic = (t: number): number => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          };

          const animateScroll = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, start + distance * ease);
            
            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Store reference for cleanup
    (window as any).handleAnchorClick = handleAnchorClick;
  };

  const setupParallaxEffects = () => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const rate = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const yPos = -(scrolled * rate);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    
    // Store reference for cleanup
    (window as any).parallaxScrollHandler = requestTick;
  };

  const cleanupScrollListeners = () => {
    if ((window as any).handleAnchorClick) {
      document.removeEventListener('click', (window as any).handleAnchorClick);
    }
    if ((window as any).parallaxScrollHandler) {
      window.removeEventListener('scroll', (window as any).parallaxScrollHandler);
    }
  };

  // Return utility functions for manual triggering
  return {
    scrollToSection: (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    triggerSectionAnimation: (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.classList.add('animate-in');
      }
    }
  };
}
