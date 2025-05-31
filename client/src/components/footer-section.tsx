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
      platform: "whatsapp",
      url: "https://wa.me/message/6OOCUSNRJ34ZF1",
      icon: "fab fa-whatsapp",
      color: "#25D366",
      handle: "Message Me"
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/WinathanBliss",
      icon: "fab fa-facebook",
      color: "#1877F2",
      handle: "WinathanBliss"
    },
    {
      platform: "github",
      url: "https://github.com/TechNathan971",
      icon: "fab fa-github",
      color: "#333333",
      handle: "TechNathan971"
    },
    {
      platform: "twitter",
      url: "https://x.com/winathan971?t=GN2mA57j3J5t6JTWakkfsw&s=09",
      icon: "fab fa-twitter",
      color: "#1DA1F2",
      handle: "@winathan971"
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/nathanael-nwana-924928360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: "fab fa-linkedin",
      color: "#0A66C2",
      handle: "Nathanael Nwana"
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
      <div className="w-full max-w-6xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's Connect
        </motion.h2>
        
        {/* Modern Social Links Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setHoveredOrb(link.platform)}
              onHoverEnd={() => setHoveredOrb(null)}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300"
                style={{ 
                  backgroundColor: hoveredOrb === link.platform ? link.color : '#f3f4f6',
                  color: hoveredOrb === link.platform ? 'white' : link.color
                }}
              >
                <i className={`${link.icon} text-2xl`} />
              </motion.div>
              
              <h4 className="font-medium text-gray-900 mb-1 capitalize">{link.platform}</h4>
              <p className="text-sm text-gray-600 text-center leading-tight">{link.handle}</p>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Contact Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="glass-card p-6 rounded-2xl text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            </div>
            <h4 className="font-orbitron font-bold mb-2 text-gray-900">Location</h4>
            <p className="text-gray-600">Global Remote</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-2xl text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10b981"/>
                <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="font-orbitron font-bold mb-2 text-gray-900">Availability</h4>
            <p className="text-gray-600">Open to Opportunities</p>
          </motion.div>
          
          <motion.div 
            className="glass-card p-6 rounded-2xl text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#8b5cf6"/>
                <circle cx="12" cy="11" r="1" fill="white"/>
                <circle cx="8" cy="11" r="1" fill="white"/>
                <circle cx="16" cy="11" r="1" fill="white"/>
              </svg>
            </div>
            <h4 className="font-orbitron font-bold mb-2 text-gray-900">Let's Chat</h4>
            <p className="text-gray-600">Always up for collaboration</p>
          </motion.div>
        </motion.div>

        {/* Footer Copyright */}
        <motion.div 
          className="border-t border-gray-200 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-600 text-center">
            © 2025 Nathanael Nwana. Built with React, Three.js, and modern web technologies.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
