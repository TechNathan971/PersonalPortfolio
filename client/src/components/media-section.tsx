import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { MediaItem } from "@shared/schema";

export function MediaSection() {
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);
  const [hoveredCube, setHoveredCube] = useState<number | null>(null);

  const { data: mediaItems = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ["/api/media"],
  });

  const videos = mediaItems.filter(item => item.type === 'video');
  const demos = mediaItems.filter(item => item.type === 'demo');

  const handleVideoClick = (video: MediaItem) => {
    setSelectedVideo(video);
  };

  const handleVideoClose = () => {
    setSelectedVideo(null);
  };

  const holoCubes = [
    { icon: "fas fa-cube", color: "from-primary to-secondary", label: "Demo" },
    { icon: "fas fa-play", color: "from-secondary to-accent", label: "Tutorial" },
    { icon: "fas fa-images", color: "from-accent to-primary", label: "Gallery" },
  ];

  if (isLoading) {
    return (
      <section className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-muted-foreground">Loading media content...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-primary neon-glow text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Media Showcase
        </motion.h2>
        
        {/* 3D Video Planes */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {videos.length > 0 ? (
            videos.slice(0, 4).map((video, index) => (
              <motion.div
                key={video.id}
                className="relative holo-card p-4 group cursor-pointer"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleVideoClick(video)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={video.thumbnailUrl || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button 
                      className="text-4xl text-primary hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-play-circle" />
                    </motion.button>
                  </div>
                  
                  {/* Interactive Hotspots */}
                  <motion.div 
                    className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    title="See code snippet"
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 w-4 h-4 bg-secondary rounded-full opacity-0 group-hover:opacity-100"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    title="Live Demo"
                  />
                  
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-accent px-2 py-1 rounded text-xs font-semibold">
                      {video.tags?.[0] || 'Video'}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-orbitron font-bold text-primary mt-4 group-hover:text-secondary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {video.description}
                </p>
              </motion.div>
            ))
          ) : (
            // Placeholder videos when no data
            [...Array(2)].map((_, index) => (
              <motion.div
                key={index}
                className="relative holo-card p-4 group cursor-pointer"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={index === 0 
                      ? "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                      : "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                    }
                    alt={index === 0 ? "Web Development Tutorial" : "Live Coding Session"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button 
                      className="text-4xl text-primary hover:scale-110 transition-transform"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-play-circle" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-accent px-2 py-1 rounded text-xs font-semibold">
                      {index === 0 ? 'Tutorial' : 'Live Stream'}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-orbitron font-bold text-primary mt-4 group-hover:text-secondary transition-colors">
                  {index === 0 ? 'Interactive Demo' : 'Dev Process'}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {index === 0 
                    ? 'Real-time web development with modern tools'
                    : 'Behind-the-scenes development workflow'
                  }
                </p>
              </motion.div>
            ))
          )}
        </motion.div>
        
        {/* Spinning Holo-Cubes */}
        <motion.div 
          className="flex justify-center space-x-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {holoCubes.map((cube, index) => (
            <motion.div
              key={index}
              className={`w-32 h-32 bg-gradient-to-br ${cube.color} rounded-lg cursor-pointer flex items-center justify-center relative overflow-hidden`}
              whileHover={{ 
                scale: 1.1, 
                rotateY: 180,
                rotateX: 15 
              }}
              animate={{ 
                y: [0, -10, 0],
                rotateZ: hoveredCube === index ? [0, 360] : 0
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity, delay: index * 0.5 },
                rotateZ: { duration: 1 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.6 },
                rotateX: { duration: 0.6 }
              }}
              onHoverStart={() => setHoveredCube(index)}
              onHoverEnd={() => setHoveredCube(null)}
              onClick={() => {
                // Handle cube click - could open specific media type
                console.log(`Clicked ${cube.label} cube`);
              }}
            >
              <motion.i 
                className={`${cube.icon} text-3xl text-white`}
                animate={{ 
                  scale: hoveredCube === index ? [1, 1.2, 1] : 1,
                  color: hoveredCube === index ? ["#ffffff", "#000000", "#ffffff"] : "#ffffff"
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Cube label */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-orbitron text-primary opacity-0"
                animate={{ 
                  opacity: hoveredCube === index ? 1 : 0,
                  y: hoveredCube === index ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                {cube.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fullscreen Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleVideoClose}
            >
              <motion.div
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleVideoClose}
                  className="absolute -top-12 right-0 text-white hover:text-primary text-2xl z-10"
                >
                  <i className="fas fa-times" />
                </button>
                
                <div className="bg-card rounded-lg p-6">
                  <h3 className="text-2xl font-orbitron font-bold text-primary mb-4">
                    {selectedVideo.title}
                  </h3>
                  
                  {/* Video placeholder */}
                  <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <i className="fas fa-play-circle text-6xl text-primary mb-4" />
                      <p className="text-muted-foreground">Video player would be implemented here</p>
                      <p className="text-sm text-muted-foreground mt-2">URL: {selectedVideo.url}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {selectedVideo.description}
                  </p>
                  
                  {selectedVideo.tags && (
                    <div className="flex gap-2 mt-4">
                      {selectedVideo.tags.map((tag) => (
                        <span key={tag} className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {videos.length === 0 && !isLoading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <i className="fas fa-video text-4xl text-muted-foreground mb-4" />
            <h3 className="text-xl font-orbitron text-muted-foreground mb-2">No media content yet</h3>
            <p className="text-muted-foreground">Check back soon for demos and tutorials</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
