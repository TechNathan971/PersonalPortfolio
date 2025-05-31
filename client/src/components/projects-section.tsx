import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Project } from "@shared/schema";

export function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filters = [
    { id: "all", label: "All", color: "bg-accent" },
    { id: "react", label: "React", color: "bg-primary" },
    { id: "threejs", label: "Three.js", color: "bg-secondary" },
    { id: "fullstack", label: "Full-Stack", color: "bg-green-500" },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         project.technologies.some(tech => 
                           tech.toLowerCase().includes(selectedFilter.toLowerCase())
                         );
    
    return matchesSearch && matchesFilter;
  });

  const handleCardFlip = (projectId: number) => {
    setFlippedCard(flippedCard === projectId ? null : projectId);
  };

  const handleForkProject = (githubUrl: string | null) => {
    if (githubUrl) {
      // Create beam effect animation
      const beam = document.createElement('div');
      beam.className = 'fixed top-4 right-4 w-1 h-1 bg-primary rounded-full z-50';
      beam.style.boxShadow = '0 0 20px currentColor';
      document.body.appendChild(beam);
      
      setTimeout(() => {
        beam.remove();
        window.open(githubUrl, '_blank');
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen px-6 py-20 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-orbitron font-bold text-primary neon-glow text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        
        {/* Filter Bar */}
        <motion.div 
          className="holo-card p-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-background border-primary/50 text-white placeholder-muted-foreground focus:border-primary"
            />
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`${selectedFilter === filter.id ? filter.color : 'border-primary/50'} hover:scale-105 transition-transform`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative perspective-1000"
              >
                <Card 
                  className="holo-card cursor-pointer h-full transform-style-preserve-3d transition-transform duration-500"
                  style={{
                    transform: flippedCard === project.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                  onClick={() => handleCardFlip(project.id)}
                >
                  {/* Front of card */}
                  <CardContent className="p-6 backface-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded mb-4 flex items-center justify-center overflow-hidden">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-code text-4xl text-primary" />
                      )}
                    </div>
                    <h3 className="text-xl font-orbitron font-bold text-primary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Back of card */}
                  <CardContent className="absolute inset-0 p-6 backface-hidden rotate-y-180 bg-card/95 backdrop-blur">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-orbitron font-bold text-primary">
                        {project.title}
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCard(null);
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-3">
                      {project.githubUrl && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleForkProject(project.githubUrl);
                          }}
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                        >
                          <i className="fab fa-github mr-2" />
                          Fork on GitHub
                        </Button>
                      )}
                      
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.liveUrl, '_blank');
                          }}
                          className="w-full border-primary hover:bg-primary/20"
                        >
                          <i className="fas fa-external-link-alt mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Conveyor Belt Carousel for Additional Projects */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-orbitron font-bold text-accent mb-6 text-center">
            More Projects
          </h3>
          <div className="flex space-x-6 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-48 h-32 holo-card rounded-lg relative group cursor-pointer"
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                  <i className="fas fa-folder text-2xl text-primary group-hover:text-secondary transition-colors" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <Button size="sm" className="bg-primary hover:bg-secondary">
                    Fork ↗
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && !isLoading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="fas fa-search text-4xl text-muted-foreground mb-4" />
            <h3 className="text-xl font-orbitron text-muted-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
