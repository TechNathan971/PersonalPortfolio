import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StartupLoaderProps {
  onComplete: () => void;
}

export function StartupLoader({ onComplete }: StartupLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Scanning device capabilities...");

  const statusMessages = [
    "Scanning device capabilities...",
    "Initializing WebGL context...",
    "Loading 3D assets...",
    "Configuring shader programs...",
    "Neural pathways synchronized...",
    "Ready to launch!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        const messageIndex = Math.floor((newProgress / 100) * statusMessages.length);
        setStatusText(statusMessages[Math.min(messageIndex, statusMessages.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Title */}
        <motion.div 
          className="text-2xl font-orbitron text-primary neon-glow mb-8"
          animate={{ 
            textShadow: [
              "0 0 5px currentColor, 0 0 10px currentColor",
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
              "0 0 5px currentColor, 0 0 10px currentColor"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          DEVICE SCAN INITIATED
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-muted rounded overflow-hidden mb-4">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-secondary scan-line"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Status and Percentage */}
        <div className="text-sm text-muted-foreground">
          {statusText} <span className="text-primary font-bold">{Math.floor(progress)}%</span>
        </div>

        {/* Wireframe Grid Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 animate-pulse" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-50 animate-pulse" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-secondary to-transparent opacity-50 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
