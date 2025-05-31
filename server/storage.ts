import { users, projects, mediaItems, type User, type InsertUser, type Project, type InsertProject, type MediaItem, type InsertMediaItem } from "@shared/schema";

// GitHub API types
interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getAllMediaItems(): Promise<MediaItem[]>;
  createMediaItem(mediaItem: InsertMediaItem): Promise<MediaItem>;
  
  getGitHubRepos(): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private mediaItems: Map<number, MediaItem>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentMediaItemId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.mediaItems = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentMediaItemId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample projects
    const sampleProjects: Project[] = [
      {
        id: this.currentProjectId++,
        title: "WebGL Portfolio",
        description: "Next-generation interactive 3D portfolio built with Three.js, React, and advanced shader programming",
        technologies: ["Three.js", "React", "TypeScript", "GSAP", "WebGL"],
        githubUrl: "https://github.com/nathanael/webgl-portfolio",
        liveUrl: "https://portfolio.zenithtech.dev",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        featured: true,
        createdAt: new Date()
      },
      {
        id: this.currentProjectId++,
        title: "Neural Visualization Engine",
        description: "Real-time neural network visualization platform with interactive node exploration and data flow analysis",
        technologies: ["Python", "TensorFlow", "D3.js", "WebSocket", "React"],
        githubUrl: "https://github.com/nathanael/neural-viz-engine",
        liveUrl: "https://neuralviz.zenithtech.dev",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        featured: true,
        createdAt: new Date()
      },
      {
        id: this.currentProjectId++,
        title: "Quantum State Manager",
        description: "Advanced state management library for complex React applications with time-travel debugging",
        technologies: ["TypeScript", "React", "Redux", "Immutable.js"],
        githubUrl: "https://github.com/nathanael/quantum-state-manager",
        liveUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        featured: false,
        createdAt: new Date()
      },
      {
        id: this.currentProjectId++,
        title: "AI-Powered Code Assistant",
        description: "Intelligent code completion and optimization tool powered by machine learning algorithms",
        technologies: ["Python", "OpenAI", "VSCode API", "Node.js"],
        githubUrl: "https://github.com/nathanael/ai-code-assistant",
        liveUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        featured: false,
        createdAt: new Date()
      },
      {
        id: this.currentProjectId++,
        title: "Blockchain Analytics Dashboard",
        description: "Real-time cryptocurrency and blockchain data visualization with predictive analytics",
        technologies: ["React", "Node.js", "Web3.js", "Chart.js", "PostgreSQL"],
        githubUrl: "https://github.com/nathanael/blockchain-analytics",
        liveUrl: "https://blockchain.zenithtech.dev",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450",
        featured: true,
        createdAt: new Date()
      }
    ];

    // Sample media items
    const sampleMediaItems: MediaItem[] = [
      {
        id: this.currentMediaItemId++,
        title: "WebGL Development Tutorial",
        type: "video",
        url: "https://youtube.com/watch?v=example1",
        thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        description: "Complete guide to building interactive 3D experiences with WebGL and Three.js",
        tags: ["tutorial", "webgl", "threejs", "javascript"],
        createdAt: new Date()
      },
      {
        id: this.currentMediaItemId++,
        title: "Live Coding Session: React Hooks",
        type: "video",
        url: "https://youtube.com/watch?v=example2",
        thumbnailUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        description: "Real-time development session exploring advanced React Hooks patterns",
        tags: ["live-coding", "react", "hooks", "frontend"],
        createdAt: new Date()
      },
      {
        id: this.currentMediaItemId++,
        title: "Neural Network Visualization Demo",
        type: "demo",
        url: "https://demo.zenithtech.dev/neural-viz",
        thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        description: "Interactive demonstration of real-time neural network training visualization",
        tags: ["demo", "ai", "machine-learning", "visualization"],
        createdAt: new Date()
      },
      {
        id: this.currentMediaItemId++,
        title: "Full-Stack Development Masterclass",
        type: "video",
        url: "https://youtube.com/watch?v=example4",
        thumbnailUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        description: "Comprehensive course covering modern full-stack development practices",
        tags: ["masterclass", "fullstack", "nodejs", "react"],
        createdAt: new Date()
      }
    ];

    // Populate storage
    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
    });

    sampleMediaItems.forEach(mediaItem => {
      this.mediaItems.set(mediaItem.id, mediaItem);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getAllMediaItems(): Promise<MediaItem[]> {
    return Array.from(this.mediaItems.values()).sort(
      (a, b) => b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async createMediaItem(insertMediaItem: InsertMediaItem): Promise<MediaItem> {
    const id = this.currentMediaItemId++;
    const mediaItem: MediaItem = { 
      ...insertMediaItem, 
      id,
      createdAt: new Date()
    };
    this.mediaItems.set(id, mediaItem);
    return mediaItem;
  }

  async getGitHubRepos(): Promise<any[]> {
    try {
      // Try to fetch from GitHub API
      const response = await fetch('https://api.github.com/users/nathanael/repos?sort=updated&per_page=10', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ZenithTech-Portfolio'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      return repos.map(repo => ({
        name: repo.name,
        description: repo.description || 'No description available',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url
      }));
    } catch (error) {
      console.error('Failed to fetch GitHub repos:', error);
      
      // Return fallback data
      return [
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
        },
        {
          name: "ai-code-assistant",
          description: "Intelligent code completion and optimization tool powered by machine learning",
          language: "Python",
          stars: 35,
          forks: 7,
          url: "https://github.com/nathanael/ai-code-assistant"
        },
        {
          name: "blockchain-analytics",
          description: "Real-time cryptocurrency and blockchain data visualization with predictive analytics",
          language: "JavaScript",
          stars: 52,
          forks: 14,
          url: "https://github.com/nathanael/blockchain-analytics"
        }
      ];
    }
  }
}

export const storage = new MemStorage();
