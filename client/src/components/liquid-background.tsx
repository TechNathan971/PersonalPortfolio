import { useEffect, useRef } from "react";

export function ModernBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Enhanced fluid animation
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.008;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple animated gradients for fluid effect
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.7) * 80,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      
      gradient1.addColorStop(0, `rgba(99, 102, 241, ${0.08 + Math.sin(time) * 0.03})`);
      gradient1.addColorStop(0.6, `rgba(168, 85, 247, ${0.05 + Math.cos(time * 1.2) * 0.02})`);
      gradient1.addColorStop(1, 'rgba(99, 102, 241, 0)');
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Second gradient layer
      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.8) * 120,
        canvas.height * 0.7 + Math.sin(time * 1.1) * 90,
        0,
        canvas.width * 0.6,
        canvas.height * 0.6,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      
      gradient2.addColorStop(0, `rgba(236, 72, 153, ${0.06 + Math.cos(time * 0.9) * 0.025})`);
      gradient2.addColorStop(0.5, `rgba(168, 85, 247, ${0.04 + Math.sin(time * 1.3) * 0.015})`);
      gradient2.addColorStop(1, 'rgba(236, 72, 153, 0)');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full modern-bg pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
