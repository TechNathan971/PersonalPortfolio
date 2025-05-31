import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen flex items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-primary neon-glow mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h2>
        
        {/* Floating Dossier */}
        <motion.div 
          className="holo-card p-8 mb-12"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-2xl font-orbitron font-bold text-accent mb-4">Background</h3>
              <p className="text-muted-foreground mb-6">
                Currently pursuing a PhD while building cutting-edge web experiences that push the 
                boundaries of what's possible in the browser. Passionate about creating immersive 
                digital environments that bridge the gap between technology and human interaction.
              </p>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <i className="fas fa-graduation-cap text-primary" />
                  <span>PhD in Computer Science (In Progress)</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <i className="fas fa-code text-secondary" />
                  <span>Full-Stack Developer</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.0 }}
                >
                  <i className="fas fa-cube text-accent" />
                  <span>3D Web Specialist</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1 }}
                >
                  <i className="fas fa-brain text-primary" />
                  <span>AI & Machine Learning Researcher</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {/* Particle effect container */}
              <div className="relative">
                <motion.div 
                  className="w-64 h-64 mx-auto bg-gradient-to-br from-primary via-accent to-secondary rounded-lg opacity-20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="holo-card p-6"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-laptop-code text-3xl text-primary mb-4" />
            <h4 className="font-orbitron font-bold text-lg mb-2">Frontend Mastery</h4>
            <p className="text-sm text-muted-foreground">React, Three.js, TypeScript, Next.js</p>
          </motion.div>
          
          <motion.div 
            className="holo-card p-6"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-server text-3xl text-secondary mb-4" />
            <h4 className="font-orbitron font-bold text-lg mb-2">Backend Systems</h4>
            <p className="text-sm text-muted-foreground">Node.js, Python, PostgreSQL, GraphQL</p>
          </motion.div>
          
          <motion.div 
            className="holo-card p-6"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-rocket text-3xl text-accent mb-4" />
            <h4 className="font-orbitron font-bold text-lg mb-2">Innovation</h4>
            <p className="text-sm text-muted-foreground">WebGL, GSAP, AI Integration, UX Design</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
