import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout>();

  const handleLogoClick = () => {
    // Single click - pulse and return to home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoDoubleClick = () => {
    // Double click - morph to full wordmark
    setLogoExpanded(true);
    setTimeout(() => {
      setLogoExpanded(false);
    }, 3000);
  };

  const handleLogoMouseDown = () => {
    // Long press for theme toggle
    longPressTimer.current = setTimeout(() => {
      setShowThemeToggle(true);
    }, 1000);
  };

  const handleLogoMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-40 p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <nav className="flex justify-between items-center">
        {/* ZenithTech Logo */}
        <div className="logo-container">
          <motion.button
            onClick={handleLogoClick}
            onDoubleClick={handleLogoDoubleClick}
            onMouseDown={handleLogoMouseDown}
            onMouseUp={handleLogoMouseUp}
            onMouseLeave={handleLogoMouseUp}
            className="text-4xl font-orbitron font-bold text-primary neon-glow transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="ZenithTech logo, click to return home, double-click to expand"
          >
            {logoExpanded ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-2xl"
              >
                ZenithTech
              </motion.span>
            ) : (
              "Z"
            )}
          </motion.button>
        </div>

        {/* Navigation Menu Button */}
        <motion.button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-2xl text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle navigation menu"
        >
          <motion.i
            className={isNavOpen ? "fas fa-times" : "fas fa-bars"}
            animate={{ rotate: isNavOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </nav>

      {/* 3D Navigation Panel */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="text-center space-y-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {[
                { href: "#home", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#media", label: "Media" },
                { href: "#contact", label: "Contact" }
              ].map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-3xl font-orbitron text-white hover:text-primary neon-glow transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.nav>

            <button
              onClick={() => setIsNavOpen(false)}
              className="absolute top-6 right-6 text-3xl text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close navigation"
            >
              <i className="fas fa-times" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Toggle (Hidden by default) */}
      <AnimatePresence>
        {showThemeToggle && (
          <motion.div
            className="fixed top-4 left-20 z-40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <button className="w-12 h-12 bg-card border border-primary rounded-full flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
              <i className="fas fa-moon text-primary" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
