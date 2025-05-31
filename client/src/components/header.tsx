import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [logoExpanded, setLogoExpanded] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout>();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoDoubleClick = () => {
    setLogoExpanded(true);
    setTimeout(() => {
      setLogoExpanded(false);
    }, 3000);
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
      transition={{ delay: 0.5 }}
    >
      <nav className="glass-card px-6 py-4 mx-auto max-w-6xl rounded-2xl flex justify-between items-center">
        {/* Modern Logo */}
        <div className="logo-container">
          <motion.button
            onClick={handleLogoClick}
            onDoubleClick={handleLogoDoubleClick}
            className="text-2xl font-orbitron font-bold gradient-text transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Nathanael logo, click to return home"
          >
            {logoExpanded ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xl"
              >
                Nathanael
              </motion.span>
            ) : (
              "N"
            )}
          </motion.button>
        </div>

        {/* Navigation Menu Button */}
        <motion.button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Toggle navigation menu"
        >
          <span>Menu</span>
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: isNavOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d={isNavOpen ? "M6 6l8 8M6 14l8-8" : "M3 7h14M3 12h14M3 17h14"}
            />
          </motion.svg>
        </motion.button>
      </nav>

      {/* Modern Navigation Panel */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="text-center space-y-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
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
                  className="block text-4xl font-orbitron font-medium text-gray-900 hover:text-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.nav>

            <button
              onClick={() => setIsNavOpen(false)}
              className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
              aria-label="Close navigation"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
