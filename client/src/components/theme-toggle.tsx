import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    // Theme switching animation
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 pointer-events-none';
    overlay.style.background = isDarkMode 
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #0F0F19 0%, #1A1A1F 100%)';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      // Apply theme changes
      document.documentElement.classList.toggle('dark', !isDarkMode);
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 500);
    }, 250);
  };

  // This would typically be triggered by a long press on the logo
  // For demo purposes, it's always available
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-20 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={toggleTheme}
            className="w-12 h-12 bg-card/80 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 neon-border"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle day/night theme"
          >
            <motion.i
              className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-primary`}
              animate={{ 
                rotate: isDarkMode ? 0 : 180,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
