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

  const slogan = "Building the Future";

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
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleNameHover = () => {
    setNameHovered(true);
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
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative px-6 py-20">
      {/* Modern Hero Content */}
      <motion.div 
        className="text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-orbitron font-bold mb-6 gradient-text leading-tight"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          {typewriterText}
          <motion.span 
            className="inline-block w-1 h-16 md:h-20 bg-primary ml-2"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          Full-Stack Developer & AI Researcher
        </motion.p>

        {/* Interactive Name Display */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <button
            onMouseEnter={handleNameHover}
            onMouseLeave={handleNameLeave}
            onClick={handleNameClick}
            onDoubleClick={handleNameDoubleClick}
            className="text-4xl md:text-6xl font-orbitron font-bold text-gray-900 hover:text-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-4"
            aria-label="Nathanael, click for bio, double-click for about section"
          >
            <motion.span 
              animate={{ 
                scale: nameHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {currentNameVariant}
            </motion.span>
            <motion.span 
              animate={{ opacity: nameHovered ? 0.7 : 1 }}
              transition={{ duration: 0.3 }}
            >
              anael
            </motion.span>
          </button>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
        >
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          
          <motion.button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
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
