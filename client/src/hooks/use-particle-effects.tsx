import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'normal' | 'ripple' | 'trail';
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

export function useParticleEffects() {
  const particlesRef = useRef<Particle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Find or create particle canvas
    let canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.className = 'fixed inset-0 pointer-events-none z-5';
      canvas.style.zIndex = '5';
      document.body.appendChild(canvas);
    }

    canvasRef.current = canvas;
    contextRef.current = canvas.getContext('2d');

    if (!contextRef.current) return;

    // Setup canvas
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create trailing particles on mouse move
      if (Math.random() < 0.3) {
        createTrailParticle(e.clientX, e.clientY);
      }
    };

    // Mouse click for extra effects
    const handleMouseClick = (e: MouseEvent) => {
      createBurstEffect(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseClick);

    // Start animation loop
    startAnimation();

    // Create initial ambient particles
    createAmbientParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseClick);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  const createParticle = useCallback((x: number, y: number, type: Particle['type'] = 'normal'): Particle => {
    const colors = [
      'hsl(180, 100%, 50%)', // Electric cyan
      'hsl(300, 100%, 50%)', // Neon magenta
      'hsl(270, 91%, 65%)',  // Neon purple
      'hsl(140, 100%, 50%)', // Neon green
      'hsl(320, 100%, 50%)'  // Neon pink
    ];

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 60 + Math.random() * 120,
      size: 1 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      type
    };
  }, []);

  const createRipple = useCallback((x: number, y: number) => {
    const ripple: Ripple = {
      x,
      y,
      radius: 0,
      maxRadius: 100 + Math.random() * 100,
      life: 1,
      maxLife: 30
    };

    ripplesRef.current.push(ripple);

    // Create DOM ripple effect for instant feedback
    const rippleElement = document.createElement('div');
    rippleElement.className = 'fixed pointer-events-none z-10 rounded-full border-2 border-primary/50';
    rippleElement.style.left = (x - 25) + 'px';
    rippleElement.style.top = (y - 25) + 'px';
    rippleElement.style.width = '50px';
    rippleElement.style.height = '50px';
    rippleElement.style.animation = 'ripple-expand 1s ease-out forwards';
    
    document.body.appendChild(rippleElement);
    
    setTimeout(() => {
      if (rippleElement.parentNode) {
        rippleElement.parentNode.removeChild(rippleElement);
      }
    }, 1000);
  }, []);

  const createTrailParticle = useCallback((x: number, y: number) => {
    const particle = createParticle(x, y, 'trail');
    particle.vx *= 0.5;
    particle.vy *= 0.5;
    particle.size *= 0.7;
    particle.maxLife *= 0.5;
    particlesRef.current.push(particle);
  }, [createParticle]);

  const createBurstEffect = useCallback((x: number, y: number) => {
    // Create multiple particles in a burst pattern
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      const particle = createParticle(x, y);
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      particle.size *= 1.5;
      particlesRef.current.push(particle);
    }
  }, [createParticle]);

  const createAmbientParticles = useCallback(() => {
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    
    for (let i = 0; i < particleCount; i++) {
      const particle = createParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      particle.vx *= 0.3;
      particle.vy *= 0.3;
      particle.maxLife *= 2;
      particlesRef.current.push(particle);
    }
  }, [createParticle]);

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply gravity and friction
      particle.vy += 0.02;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Update life
      particle.life -= 1;
      
      // Boundary wrapping for ambient particles
      if (particle.type === 'normal') {
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
      }
      
      return particle.life > 0;
    });
  }, []);

  const updateRipples = useCallback(() => {
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      ripple.radius += (ripple.maxRadius - ripple.radius) * 0.1;
      ripple.life -= 1;
      return ripple.life > 0;
    });
  }, []);

  const render = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx || !canvasRef.current) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Render ripples
    ripplesRef.current.forEach(ripple => {
      const alpha = ripple.life / ripple.maxLife;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(180, 100%, 50%, ${alpha * 0.3})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Render particles
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      const size = particle.size * alpha;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      
      // Add glow effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 3
      );
      gradient.addColorStop(0, particle.color.replace(')', `, ${alpha})`).replace('hsl(', 'hsla('));
      gradient.addColorStop(1, particle.color.replace(')', `, 0)`).replace('hsl(', 'hsla('));
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Core particle
      ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('hsl(', 'hsla(');
      ctx.fill();
    });

    // Draw mouse interaction glow
    const mouseGradient = ctx.createRadialGradient(
      mouseRef.current.x, mouseRef.current.y, 0,
      mouseRef.current.x, mouseRef.current.y, 50
    );
    mouseGradient.addColorStop(0, 'hsla(180, 100%, 50%, 0.1)');
    mouseGradient.addColorStop(1, 'hsla(180, 100%, 50%, 0)');
    
    ctx.fillStyle = mouseGradient;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const startAnimation = useCallback(() => {
    const animate = () => {
      updateParticles();
      updateRipples();
      render();
      
      // Occasionally add new ambient particles
      if (Math.random() < 0.02 && particlesRef.current.length < 100) {
        const particle = createParticle(
          Math.random() * window.innerWidth,
          -10
        );
        particle.vy = Math.random() * 0.5 + 0.2;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.maxLife *= 3;
        particlesRef.current.push(particle);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
  }, [updateParticles, updateRipples, render, createParticle]);

  // Section-specific particle effects
  const createSectionEffect = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    switch (sectionId) {
      case 'about':
        // Spiral effect
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const angle = (i / 20) * Math.PI * 4;
            const radius = i * 5;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            createBurstEffect(x, y);
          }, i * 50);
        }
        break;
        
      case 'projects':
        // Grid effect
        for (let x = 0; x < 5; x++) {
          for (let y = 0; y < 3; y++) {
            setTimeout(() => {
              const px = rect.left + (x / 4) * rect.width;
              const py = rect.top + (y / 2) * rect.height;
              createBurstEffect(px, py);
            }, (x + y) * 100);
          }
        }
        break;
        
      case 'contact':
        // Orbital effect
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const angle = (i / 12) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * 100;
            const y = centerY + Math.sin(angle) * 100;
            createBurstEffect(x, y);
          }, i * 100);
        }
        break;
    }
  }, [createBurstEffect]);

  return {
    createRipple,
    createBurstEffect,
    createSectionEffect,
    createTrailParticle
  };
}
