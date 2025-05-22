"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, ThreeElements } from "@react-three/fiber";
import { useGLTF, Environment, Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";

// Define types for structured data
interface FeatureType {
  title: string;
  icon: string;
  description: string;
}

// Component for 3D logo
function DevPlannerLogo(props: ThreeElements['mesh']) {
  const { viewport } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t / 4) / 4;
      mesh.current.rotation.y = Math.sin(t / 2) / 2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} {...props} scale={[1.8, 1.8, 1.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial 
          color="#00FFFF" 
          envMapIntensity={1.5} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.9}
          distort={0.3}
        />
      </mesh>
    </Float>
  );
}

// Terminal component with enhanced animations
function Terminal({ text }: { text: string }) {
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [text]);
  
  return (
    <div className="w-full max-w-md mx-auto backdrop-blur-md bg-black/70 rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_60px_rgba(0,255,255,0.15)]">
      <div className="flex items-center bg-gray-900/90 px-4 py-2 border-b border-cyan-500/20">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="mx-auto text-sm text-cyan-300 font-mono">terminal@devplanner:~</div>
      </div>
      <div 
        ref={terminalRef} 
        className="p-4 h-72 overflow-auto font-mono text-sm text-cyan-400 whitespace-pre-line bg-gradient-to-b from-slate-950 to-slate-900 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent"
      >
        {text}
      </div>
    </div>
  );
}

// Feature display with animations
function FeatureCard({ 
  feature, 
  isActive, 
  onClick 
}: { 
  feature: FeatureType; 
  isActive: boolean; 
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-5 rounded-lg transition-all duration-300 flex items-start gap-4 border overflow-hidden relative
        ${isActive 
          ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900/80 border-cyan-500/50 shadow-[0_0_20px_rgba(0,255,255,0.1)]' 
          : 'bg-black/40 border-gray-800/50 hover:bg-slate-900/50 hover:border-cyan-500/30'
        }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500
        ${isActive ? 'from-cyan-500/20 to-blue-500/20' : 'from-cyan-500/10 to-transparent'}`}>
      </div>
      
      <div className={`w-12 h-12 flex items-center justify-center rounded-md text-2xl
        ${isActive 
          ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-white' 
          : 'bg-slate-800/70 text-cyan-200 group-hover:bg-slate-800'
        }`}
      >
        {feature.icon}
      </div>
      
      <div className="flex-1">
        <h3 className={`font-bold text-lg mb-1 transition-colors duration-300
          ${isActive ? 'text-cyan-300' : 'text-gray-200 group-hover:text-cyan-200'}`}
        >
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
          {feature.description}
        </p>
        
        {isActive && (
          <div className="mt-3 pt-3 border-t border-cyan-500/20">
            <span className="text-cyan-400 text-sm flex items-center">
              Explore feature <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </div>
        )}
      </div>
      
      {isActive && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      )}
    </button>
  );
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState<number>(0);
  const [terminalText, setTerminalText] = useState<string>("");
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Enhanced terminal animation
    const terminalMessages = [
      "npm install @devplanner/core",
      "Installing packages...",
      "✓ Productivity engine loaded",
      "✓ Smart scheduling initialized",
      "✓ GitHub integration connected",
      "✓ Authentication module ready",
      "✓ Database synchronized",
      "Starting DevPlanner v0.1.0-alpha...",
      "Welcome to DevPlanner - Your ultimate developer productivity suite",
      "Ready to boost your workflow!"
    ];
    
    let fullText = "";
    let messageIndex = 0;
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (messageIndex < terminalMessages.length) {
        if (charIndex < terminalMessages[messageIndex].length) {
          fullText += terminalMessages[messageIndex][charIndex];
          setTerminalText(fullText);
          charIndex++;
          setTimeout(typeNextChar, Math.random() * 50 + 50);
        } else {
          fullText += "\n$ ";
          setTerminalText(fullText);
          messageIndex++;
          charIndex = 0;
          setTimeout(typeNextChar, 800);
        }
      }
    };
    
    setTimeout(() => {
      fullText = "$ ";
      setTerminalText(fullText);
      typeNextChar();
    }, 1000);
    
    // Feature rotation
    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6);
    }, 3000);
    
    // Enhanced loading animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(featureInterval);
    };
  }, []);
  

  // Features data with enhanced descriptions
  const features: FeatureType[] = [
    {
      title: "Job Tracker",
      icon: "📋",
      description: "Advanced application tracking with smart reminders, status analytics, and interview preparation tools."
    },
    {
      title: "Daily Task Scheduler",
      icon: "⏱️",
      description: "AI-powered task prioritization, Pomodoro integration, and GitHub commit synchronization for seamless dev workflows."
    },
    {
      title: "Content Manager",
      icon: "📱",
      description: "Multi-platform content planning with SEO analysis, audience insights, and automated publishing schedules."
    },
    {
      title: "Freelance CRM",
      icon: "💼",
      description: "End-to-end client management with proposal templates, time tracking, and integrated invoicing systems."
    },
    {
      title: "Goal Planner",
      icon: "🎯",
      description: "OKR-inspired goal tracking with progress visualization, milestone celebrations, and adaptive task generation."
    },
    {
      title: "Streak Alerts",
      icon: "🔥",
      description: "Smart notifications across devices, activity analytics, and customizable achievement badges to maintain motivation."
    }
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden bg-slate-950 text-gray-100 font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Advanced animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 backdrop-blur-[120px] bg-slate-950/30"></div>
          <div className="h-full w-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-soft-light"></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(25,1fr)] opacity-5">
          {Array(40).fill(0).map((_, i) => (
            <div key={`v-${i}`} className="border-r border-cyan-500/20 h-full"></div>
          ))}
          {Array(25).fill(0).map((_, i) => (
            <div key={`h-${i}`} className="border-b border-cyan-500/20 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Loading animation */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950 transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="text-cyan-400 text-2xl font-mono">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4 mx-auto"></div>
          Initializing DevPlanner...
        </div>
      </div>

      <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto">
        {/* Hero section with 3D elements */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-32 min-h-[70vh]">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-sm font-medium">v0.1.0-alpha • Private Beta Launching Soon</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">Developer</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Productivity</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">Reimagined</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Your all-in-one toolkit for supercharging development workflows, crafted with precision for the modern developer ecosystem.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#early-access" className="group relative px-8 py-4 overflow-hidden rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(0,200,255,0.3)] hover:scale-105">
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                Join Private Beta
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </a>
              <a href="https://github.com/deepakkumar55/DevPlanner" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 rounded-md bg-transparent border border-gray-700 text-gray-300 font-semibold transition-all hover:border-cyan-500/30 hover:text-white hover:bg-slate-900/30 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub Repository
              </a>
            </div>
            
            <div className="pt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-950 bg-gradient-to-br ${
                    i === 1 ? 'from-cyan-400 to-blue-500' :
                    i === 2 ? 'from-blue-400 to-indigo-500' :
                    i === 3 ? 'from-indigo-400 to-purple-500' :
                    'from-purple-400 to-pink-500'
                  }`}></div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-white font-medium">235+</span> developers already on the waitlist
              </div>
            </div>
          </div>
          
          <div className="flex-1 relative h-[500px] w-full max-w-md mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <DevPlannerLogo position={[0, 0, 0]} />
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
                
                <Terminal text={terminalText} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature section with interactive elements */}
        <section id="features" className="mb-32 scroll-mt-32">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
            <h2 className="text-4xl font-bold flex items-center gap-3 whitespace-nowrap">
              <span className="text-cyan-400 mr-1">&lt;</span>
              Feature Suite
              <span className="text-cyan-400 ml-1">/&gt;</span>
            </h2>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-cyan-500 to-transparent w-full mb-6"></div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Designed for developers, by developers. Every feature is meticulously crafted to streamline your workflow and boost productivity.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard 
                key={idx}
                feature={feature}
                isActive={activeFeature === idx}
                onClick={() => setActiveFeature(idx)}
              />
            ))}
          </div>
        </section>
        
        {/* Early access section */}
        <section id="early-access" className="mb-32 scroll-mt-32">
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-2xl p-12 overflow-hidden border border-slate-800">
            {/* Enhanced background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-30">
                {Array(20).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                      opacity: Math.random() * 0.5 + 0.3
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Circuit board pattern */}
              <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] bg-repeat opacity-5"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              {/* Enhanced header with animated underline */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-cyan-950/30 rounded-full text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></span>
                  <span>Limited Access Program</span>
                </div>
                
                <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-cyan-300 to-blue-300 leading-tight">
                  Join the DevPlanner Private Beta
                </h3>
                
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
                
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Be among the first developers to experience the future of development workflows and help shape the product.
                </p>
                
                {/* Animated benefit icons */}
                <div className="flex flex-wrap justify-center gap-6 mb-10">
                  {[
                    { icon: "🔑", text: "Early Access" },
                    { icon: "🛠️", text: "Shape Features" },
                    { icon: "🚀", text: "Priority Support" }
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                      <span className="text-lg">{benefit.icon}</span>
                      <span className="text-gray-300 text-sm font-medium">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced signup form with glassmorphism */}
              <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-xl border border-slate-700/50 shadow-[0_0_30px_rgba(0,200,255,0.07)] mb-10 transform hover:scale-[1.01] transition-all">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      Your Developer Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        placeholder="name@developer.com"
                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-gray-200 placeholder-gray-500 transition-all"
                        required
                      />
                      <div className="absolute inset-0 border border-cyan-400/0 rounded-lg pointer-events-none peer-focus:border-cyan-400/50 transition-colors"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-gray-200 placeholder-gray-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Your Role
                      </label>
                      <select
                        id="role"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-gray-200 appearance-none"
                      >
                        <option value="" className="bg-slate-800">Select role</option>
                        <option value="developer" className="bg-slate-800">Developer</option>
                        <option value="designer" className="bg-slate-800">Designer</option>
                        <option value="manager" className="bg-slate-800">Manager</option>
                        <option value="student" className="bg-slate-800">Student</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href="https://github.com/deepakkumar55/DevPlanner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-lg transition-all relative overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Request Early Access
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </form>
                
                <div className="flex items-center justify-center mt-6">
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span>Secure submission • No spam • Privacy protected</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced stats and social proof */}
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <div className="bg-slate-900/30 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">250</div>
                    <div className="text-xs text-gray-400">Limited beta spots</div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">235+</div>
                    <div className="text-xs text-gray-400">Developers on waitlist</div>
                  </div>
                </div>
                
                <div className="bg-slate-900/30 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50 flex items-center gap-4">
                  <div className="relative flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 bg-gradient-to-br ${
                        i === 1 ? 'from-cyan-400 to-blue-500' :
                        i === 2 ? 'from-blue-400 to-indigo-500' :
                        i === 3 ? 'from-indigo-400 to-purple-500' :
                        'from-purple-400 to-pink-500'
                      }`}></div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Join our community</div>
                    <div className="text-xs text-gray-400">Early access, early advantage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open source section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row items-center gap-12 p-8 bg-gradient-to-r from-slate-900/80 to-slate-950/80 rounded-2xl border border-slate-800/70 backdrop-blur-sm">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-cyan-400">
                  Community-Driven Development
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Built with Next.js and open-sourced for the community. Contribute, extend, and help shape the future of developer productivity tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/deepakkumar55/DevPlanner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-cyan-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Star on GitHub
                </a>
                <a
                  href="https://DevPlanner.thecampuscoders.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-cyan-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  Visit Website
                </a>
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500">bash</div>
              </div>
              <pre className="text-sm text-cyan-400 font-mono overflow-x-auto">
{`# Clone the repository
git clone https://github.com/deepakkumar55/DevPlanner.git

# Install dependencies
cd DevPlanner && npm install

# Start development server
npm run dev

# Visit the site
open https://DevPlanner.thecampuscoders.com`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-800 mt-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">D</div>
              <div>
                <div className="text-xl font-bold text-white">DevPlanner</div>
                <div className="text-sm text-gray-400">Productivity for developers</div>
              </div>
            </div>
            
            <div className="flex gap-8 text-gray-400">
              <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#early-access" className="hover:text-cyan-400 transition-colors">Early Access</a>
              <a href="https://github.com/deepakkumar55/DevPlanner" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="https://devplanner.thecampuscoders.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Website</a>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 DevPlanner. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Custom cursor effect */}
      <div 
        className="fixed w-8 h-8 pointer-events-none rounded-full border-2 border-cyan-500/50 mix-blend-difference z-50 hidden md:block transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      ></div>
      
      {/* Floating contact button */}
      <a
        href="mailto:contact@devplanner.thecampuscoders.com"
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-full shadow-lg hover:shadow-cyan-500/20 hover:scale-110 transition-all duration-300"
        title="Contact us"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </a>
    </div>
  );
}
