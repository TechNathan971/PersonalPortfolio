import { motion } from "framer-motion";
import { useState } from "react";

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
  handle: string;
}

export function FooterSection() {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);

  const socialLinks: SocialLink[] = [
    {
      platform: "github",
      url: "https://github.com/nathanael",
      icon: "fab fa-github",
      color: "hsl(var(--primary))",
      handle: "@nathanael"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/nathanael",
      icon: "fab fa-linkedin",
      color: "hsl(var(--secondary))",
      handle: "/nathanael"
    },
    {
      platform: "twitter",
      url: "https://twitter.com/nathanael",
      icon: "fab fa-twitter",
      color: "hsl(var(--accent))",
      handle: "@nathanael_dev"
    },
    {
      platform: "email",
      url: "mailto:nathanael@zenithtech.dev",
      icon: "fas fa-envelope",
      color: "hsl(var(--neon-pink))",
      handle: "contact@zenith"
    },
    {
      platform: "discord",
      url: "https://discord.gg/nathanael",
      icon: "fab fa-discord",
      color: "hsl(var(--neon-purple))",
      handle: "nathanael#dev"
    }
  ];

  const handleSocialClick = (link: SocialLink) => {
    // Create particle swirl effect
    const particles = document.createElement('div');
    particles.className = 'fixed inset-0 pointer-events-none z-50';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full';
      particle.style.background = link.color;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.animation = `particle-swirl-${i} 1s ease-out forwards`;
      particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
    
    // Add dynamic particle animations
    const style = document.createElement('style');
    let keyframes = '';
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * 360;
      const distance = 100 + Math.random() * 100;
      keyframes += `
        @keyframes particle-swirl-${i} {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(${angle}deg) translateX(${distance}px) scale(0);
            opacity: 0;
          }
        }
      `;
    }
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    setTimeout(() => {
      particles.remove();
      style.remove();
      window.open(link.url, '_blank');
    }, 1000);
  };

  return (
    <footer id="contact" className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative">
      <div className="w-full max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-primary neon-glow mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Connect
        </motion.h2>
        
        {/* 3D Base Station Platform */}
        <motion.div 
          className="relative h-80 mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Central Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(var(--primary))",
                  "0 0 40px hsl(var(--secondary))",
                  "0 0 20px hsl(var(--primary))"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl font-orbitron font-bold text-black">Z</span>
            </motion.div>
          </div>
          
          {/* Orbiting Social Icons */}
          {socialLinks.map((link, index) => {
            const angle = (index / socialLinks.length) * 360;
            const delay = index * 2;
            
            return (
              <motion.div
                key={link.platform}
                className="absolute w-16 h-16 flex items-center justify-center"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '50% 50%',
                }}
                animate={{
                  rotate: [0, 360],
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 120 - 32,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 120 - 32
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 120 - 32,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 120 - 32
                  ]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: delay
                }}
              >
                <motion.button
                  className="w-full h-full bg-card/80 backdrop-blur-lg rounded-full flex items-center justify-center group relative overflow-hidden"
                  style={{ borderColor: link.color }}
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: link.color.replace(')', ', 0.2)').replace('hsl(', 'hsla('),
                  }}
                  onHoverStart={() => setHoveredOrb(link.platform)}
                  onHoverEnd={() => setHoveredOrb(null)}
                  onClick={() => handleSocialClick(link)}
                  aria-label={`Visit ${link.platform} profile: ${link.handle}`}
                >
                  <motion.i 
                    className={`${link.icon} text-xl text-white group-hover:text-black transition-colors`}
                    style={{ color: hoveredOrb === link.platform ? link.color : undefined }}
                    animate={{
                      scale: hoveredOrb === link.platform ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Neon connector line */}
                  <motion.div
                    className="absolute w-20 h-0.5 bg-current opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ 
                      backgroundColor: link.color,
                      transformOrigin: '0 50%',
                      transform: `rotate(${-angle}deg)`,
                      left: '50%',
                      top: '50%'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredOrb === link.platform ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Handle label */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono whitespace-nowrap"
                    style={{ color: link.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredOrb === link.platform ? 1 : 0,
                      y: hoveredOrb === link.platform ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.handle}
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Neon Ticker */}
        <motion.div 
          className="overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div className="holo-card p-4">
            <motion.p 
              className="text-sm font-mono text-primary neon-glow"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 3 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              © 2025 Nathanael | Built with Three.js, GSAP, React, and love 💙
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Additional Contact Info */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="holo-card p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-map-marker-alt text-2xl text-primary mb-2" />
            <h4 className="font-orbitron font-bold mb-1">Location</h4>
            <p className="text-sm text-muted-foreground">Global Remote</p>
          </motion.div>
          
          <motion.div 
            className="holo-card p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-clock text-2xl text-secondary mb-2" />
            <h4 className="font-orbitron font-bold mb-1">Availability</h4>
            <p className="text-sm text-muted-foreground">Open to Opportunities</p>
          </motion.div>
          
          <motion.div 
            className="holo-card p-4"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-coffee text-2xl text-accent mb-2" />
            <h4 className="font-orbitron font-bold mb-1">Let's Chat</h4>
            <p className="text-sm text-muted-foreground">Always up for collaboration</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
