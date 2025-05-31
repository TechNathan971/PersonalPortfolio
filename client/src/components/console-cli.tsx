import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsoleCommand {
  command: string;
  output: string[];
  timestamp: Date;
}

export function ConsoleCLI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ConsoleCommand[]>([
    {
      command: "welcome",
      output: [
        "Welcome to ZenithTech Console v2.0",
        "Type 'help' for available commands",
        "---"
      ],
      timestamp: new Date()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: [
      "Available commands:",
      "• list projects - Show all projects",
      "• contact - Display contact information", 
      "• about - Show information about Nathanael",
      "• skills - List technical skills",
      "• clear - Clear console output",
      "• exit - Close console"
    ],
    "list projects": [
      "📂 Portfolio Projects:",
      "• WebGL Portfolio - Interactive 3D experience (React, Three.js)",
      "• Neural Viz Engine - Real-time neural network visualization (Python, TensorFlow)",
      "• Quantum State Manager - Advanced React state management (TypeScript)",
      "• E-commerce Platform - Full-stack marketplace (Node.js, React)",
      "• AI Chat Interface - Natural language processing (Python, OpenAI)"
    ],
    contact: [
      "📧 Contact Information:",
      "• Email: nathanael@zenithtech.dev",
      "• GitHub: github.com/nathanael",
      "• LinkedIn: linkedin.com/in/nathanael", 
      "• Twitter: @nathanael_dev",
      "• Discord: nathanael#dev"
    ],
    about: [
      "👨‍💻 Nathanael - ZenithTech Founder",
      "• PhD Candidate in Computer Science",
      "• Full-Stack Developer specializing in 3D web experiences",
      "• Expertise: React, Three.js, Node.js, Python, AI/ML",
      "• Passionate about pushing web technology boundaries",
      "• Building the future of interactive digital experiences"
    ],
    skills: [
      "🛠️ Technical Skills:",
      "Frontend: React, Three.js, TypeScript, Next.js, GSAP",
      "Backend: Node.js, Python, PostgreSQL, GraphQL, REST APIs",
      "3D/Graphics: WebGL, Three.js, Blender, Shaders",
      "AI/ML: TensorFlow, PyTorch, OpenAI, Computer Vision",
      "Tools: Git, Docker, AWS, Vercel, Figma"
    ],
    clear: [],
    exit: ["Goodbye! 👋"]
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    const timestamp = new Date();
    
    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    if (command === 'clear') {
      setHistory([]);
      return;
    }
    
    if (command === 'exit') {
      setHistory(prev => [...prev, {
        command: cmd,
        output: commands.exit,
        timestamp
      }]);
      setTimeout(() => setIsOpen(false), 1000);
      return;
    }
    
    const output = commands[command as keyof typeof commands] || [
      `Command not found: ${cmd}`,
      "Type 'help' for available commands"
    ];
    
    setHistory(prev => [...prev, {
      command: cmd,
      output,
      timestamp
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
      setInput("");
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] || "");
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <>
      {/* Console Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-card/80 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 z-30 neon-border"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle console interface"
      >
        <motion.i 
          className={`fas ${isOpen ? 'fa-times' : 'fa-terminal'} text-primary`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Console Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full max-w-4xl h-full max-h-[80vh] bg-card/95 backdrop-blur-lg rounded-lg border border-primary/50 flex flex-col overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-primary/20">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-terminal text-primary" />
                  <span className="font-orbitron font-bold text-primary">ZenithTech Console v2.0</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Close console"
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              {/* Output Area */}
              <div 
                ref={outputRef}
                className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black/50"
                style={{ scrollbarWidth: 'thin' }}
              >
                {history.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-4"
                  >
                    {entry.command !== 'welcome' && (
                      <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                        <span className="text-xs">[{formatTime(entry.timestamp)}]</span>
                        <span className="text-primary">nathanael@zenithtech:~$</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                    )}
                    <div className="ml-4 space-y-1">
                      {entry.output.map((line, lineIndex) => (
                        <motion.div
                          key={lineIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.05) + (lineIndex * 0.02) }}
                          className={`${
                            line.startsWith('•') || line.startsWith('📂') || line.startsWith('📧') || line.startsWith('👨‍💻') || line.startsWith('🛠️')
                              ? 'text-accent' 
                              : line.startsWith('Command not found') 
                              ? 'text-destructive' 
                              : line === '---' 
                              ? 'text-primary border-b border-primary/30 pb-1' 
                              : 'text-secondary'
                          }`}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                {/* Current Input Line */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span className="text-xs">[{formatTime(new Date())}]</span>
                  <span className="text-primary">nathanael@zenithtech:~$</span>
                  <span className="text-white">{input}</span>
                  <motion.span
                    className="w-2 h-4 bg-primary"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-primary/20">
                <div className="flex items-center space-x-2">
                  <span className="text-primary font-mono">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-muted-foreground"
                    placeholder="Enter command..."
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
                <div className="mt-2 text-xs text-muted-foreground font-mono">
                  Use ↑/↓ for command history • ESC to close • TAB for autocomplete
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
