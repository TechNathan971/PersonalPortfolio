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

    // Subtle animation for modern look
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create subtle gradient that changes very slowly
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      gradient.addColorStop(0, `rgba(99, 102, 241, ${0.03 + Math.sin(time) * 0.01})`);
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.02 + Math.cos(time * 0.8) * 0.005})`);
      gradient.addColorStop(1, `rgba(236, 72, 153, ${0.01 + Math.sin(time * 0.6) * 0.005})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
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
