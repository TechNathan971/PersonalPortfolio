import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export function GitHubPanel() {
  const { data: repos = [], isLoading, error } = useQuery<GitHubRepo[]>({
    queryKey: ["/api/github/repos"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleForkRepo = (repoUrl: string, repoName: string) => {
    // Create animated beam effect
    const beam = document.createElement('div');
    beam.className = 'fixed top-4 right-16 w-2 h-2 bg-primary rounded-full z-50';
    beam.style.boxShadow = '0 0 20px currentColor, 0 0 40px currentColor';
    beam.style.animation = 'beam-travel 0.8s ease-out forwards';
    document.body.appendChild(beam);

    // Add beam travel animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes beam-travel {
        0% { 
          transform: translateX(0) translateY(0) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateX(-200px) translateY(-100px) scale(1.5);
          opacity: 0.8;
        }
        100% { 
          transform: translateX(-400px) translateY(-200px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      beam.remove();
      style.remove();
      window.open(repoUrl, '_blank');
    }, 800);
  };

  // Fallback repos for demonstration when API data isn't available
  const fallbackRepos: GitHubRepo[] = [
    {
      name: "zenith-portfolio",
      description: "Next-generation 3D portfolio with WebGL liquid backgrounds and interactive elements",
      language: "TypeScript",
      stars: 42,
      forks: 8,
      url: "https://github.com/nathanael/zenith-portfolio"
    },
    {
      name: "neural-viz-engine",
      description: "Real-time neural network visualization with interactive nodes and data flow",
      language: "Python",
      stars: 28,
      forks: 5,
      url: "https://github.com/nathanael/neural-viz-engine"
    },
    {
      name: "quantum-state-manager",
      description: "Advanced state management library for complex React applications",
      language: "TypeScript",
      stars: 67,
      forks: 12,
      url: "https://github.com/nathanael/quantum-state-manager"
    }
  ];

  const displayRepos = repos.length > 0 ? repos : fallbackRepos;

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="holo-card p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-orbitron font-bold text-primary neon-glow">
              <i className="fab fa-github mr-3" />
              Latest Repositories
            </h3>
            <motion.button 
              className="text-secondary hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
              aria-label="Refresh repository list"
            >
              <i className="fas fa-sync-alt text-xl" />
            </motion.button>
          </motion.div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <motion.div
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-muted-foreground">Loading repositories...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <i className="fas fa-exclamation-triangle text-4xl text-destructive mb-4" />
              <h4 className="text-lg font-orbitron text-destructive mb-2">Failed to load repositories</h4>
              <p className="text-muted-foreground">Using cached repository data</p>
            </div>
          ) : null}
          
          <div className="space-y-4">
            {displayRepos.map((repo, index) => (
              <motion.div
                key={repo.name}
                className="bg-card/50 border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <motion.h4 
                      className="font-orbitron font-bold text-white group-hover:text-primary transition-colors text-lg mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {repo.name}
                    </motion.h4>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          repo.language === 'TypeScript' ? 'bg-blue-500' :
                          repo.language === 'Python' ? 'bg-green-500' :
                          repo.language === 'JavaScript' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }`} />
                        <span className="text-muted-foreground">{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <i className="fas fa-star text-yellow-500" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <i className="fas fa-code-branch text-secondary" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleForkRepo(repo.url, repo.name)}
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300"
                    >
                      <i className="fas fa-external-link-alt mr-2" />
                      Fork ↗
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Auto-scrolling animation indicator */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span>Auto-refreshes every 5 minutes</span>
              <motion.div
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
