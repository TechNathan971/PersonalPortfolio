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
    }, 800);
  };

  const handleNameLeave = () => {
    setNameHovered(false);
    if (hoverInterval.current) {
      clearInterval(hoverInterval.current);
    }
    setTimeout(() => {
      setCurrentNameVariant("Nath");
      nameIndex.current = 0;
    }, 100);
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
            className="fixed inset-0 bg-white/95 backdrop-blur-xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBioOpen(false)}
          >
            <motion.div
              className="glass-card rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBioOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-2"
                aria-label="Close bio panel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              
              <div className="mt-4">
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 gradient-text rounded-full flex items-center justify-center text-4xl font-orbitron font-bold border-2 border-gray-200"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  N
                </motion.div>
                
                <h3 className="text-3xl font-orbitron font-bold gradient-text mb-6 text-center">About Nathanael</h3>
                
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong className="text-gray-900">Full Name:</strong> Nathanael Nwana
                  </p>
                  <p>
                    <strong className="text-gray-900">Education:</strong> Computer Engineering Degree Student
                  </p>
                  <p>
                    <strong className="text-gray-900">Role:</strong> Full-Stack Developer & AI Researcher
                  </p>
                  <p>
                    <strong className="text-gray-900">Location:</strong> Global Remote
                  </p>
                  <p>
                    <strong className="text-gray-900">Specialties:</strong> Modern Web Development, AI Integration, User Experience Design, WebGL/Three.js
                  </p>
                  <p>
                    <strong className="text-gray-900">Mission:</strong> Creating innovative digital solutions that bridge technology and human experience, with a focus on clean, efficient, and impactful design.
                  </p>
                  <p>
                    <strong className="text-gray-900">Current Focus:</strong> Building next-generation web applications with advanced 3D graphics, AI-powered features, and seamless user interactions.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
