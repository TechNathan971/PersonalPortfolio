import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [bioOpen, setBioOpen] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const [currentNameVariant, setCurrentNameVariant] = useState("Nath");
  const [typewriterText, setTypewriterText] = useState("");
  const nameVariants = ["Nath", "Nathie", "Nathan"];
  const nameIndex = useRef(0);
  const hoverInterval = useRef<NodeJS.Timeout>();

  const slogan = "code, thrive, conquer";

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= slogan.length) {
        setTypewriterText(slogan.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const handleNameHover = () => {
    setNameHovered(true);
    // Cycle through name variations
    hoverInterval.current = setInterval(() => {
      nameIndex.current = (nameIndex.current + 1) % nameVariants.length;
      setCurrentNameVariant(nameVariants[nameIndex.current]);
    }, 500);
  };

  const handleNameLeave = () => {
    setNameHovered(false);
    if (hoverInterval.current) {
      clearInterval(hoverInterval.current);
    }
    setCurrentNameVariant("Nath");
    nameIndex.current = 0;
  };

  const handleNameClick = () => {
    setBioOpen(true);
  };

  const handleNameDoubleClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6">
      {/* Slogan with Typewriter Effect */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
          <span className="text-primary neon-glow">
            {typewriterText}
            <span className="typewriter-cursor" />
          </span>
        </h1>
      </motion.div>

      {/* Interactive Name Display */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <button
          onMouseEnter={handleNameHover}
          onMouseLeave={handleNameLeave}
          onClick={handleNameClick}
          onDoubleClick={handleNameDoubleClick}
          className="text-5xl md:text-7xl font-orbitron font-black relative cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-2"
          aria-label="Nathanael, click for bio, double-click for about section"
        >
          <motion.span 
            className="text-primary glitch-text neon-glow"
            data-text={currentNameVariant}
            animate={{ 
              scale: nameHovered ? 1.1 : 1,
              color: nameHovered && nameIndex.current % 2 === 1 ? "hsl(var(--neon-magenta))" : "hsl(var(--primary))"
            }}
            transition={{ duration: 0.3 }}
          >
            {currentNameVariant}
          </motion.span>
          <motion.span 
            className="text-secondary neon-glow"
            animate={{ opacity: nameHovered ? 0.7 : 1 }}
            transition={{ duration: 0.3 }}
          >
            anael
          </motion.span>
          
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300 rounded-lg" />
        </button>
      </motion.div>

      {/* Bio Panel */}
      <AnimatePresence>
        {bioOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-96 max-w-full bg-card/90 backdrop-blur-lg holo-card p-8 z-30"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button
              onClick={() => setBioOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close bio panel"
            >
              <i className="fas fa-times" />
            </button>
            
            <div className="mt-8">
              {/* 3D Avatar placeholder */}
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-2xl text-primary" />
                </div>
              </motion.div>
              
              <h3 className="text-xl font-orbitron font-bold text-primary mb-4 text-center">Nathanael</h3>
              <p className="text-muted-foreground mb-4">
                PhD-in-progress candidate specializing in advanced web technologies and interactive systems.
              </p>
              <p className="text-muted-foreground">
                Full-stack developer with expertise in React, Three.js, GSAP, and modern web architecture.
              </p>
              
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-graduation-cap text-primary" />
                  <span>PhD in Progress</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-code text-secondary" />
                  <span>Full-Stack Developer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-cube text-accent" />
                  <span>3D Web Specialist</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
