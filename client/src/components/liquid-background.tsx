import { useEffect, useRef } from "react";
import { useParticleEffects } from "@/hooks/use-particle-effects";

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createRipple } = useParticleEffects();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse interaction for ripples
    const handleMouseMove = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Liquid animation simulation
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create liquid-like gradient that changes over time
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, `hsla(180, 100%, 50%, ${0.05 + Math.sin(time) * 0.02})`);
      gradient.addColorStop(0.5, `hsla(300, 100%, 50%, ${0.03 + Math.cos(time * 1.5) * 0.02})`);
      gradient.addColorStop(1, `hsla(270, 91%, 65%, ${0.02 + Math.sin(time * 0.5) * 0.01})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [createRipple]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full liquid-bg particle-bg pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
