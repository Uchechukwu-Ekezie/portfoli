"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Github, Twitter, Mail, Linkedin, ChevronDown, Download, Microscope, Dna, Atom, FlaskConical, BookOpen, Award, Users, MapPin, Calendar, ExternalLink, Brain, Activity, Zap, Eye, Heart, Leaf, Bug, Fish, TreePine, Flower, Sparkles, Star, Circle, Triangle, Square, Plus, Minus, X, Target,  Globe, Orbit, Waves, Sun, Lightbulb, Search, Telescope, Beaker, TestTube, LucideIcon } from "lucide-react";
import Image from 'next/image';
import osho from "../../public/osho.avif";

// Types
interface MembranePoint {
  x: number;
  y: number;
  phase: number;
}

interface Neuron {
  id: number;
  x: number;
  y: number;
  active: boolean;
  activation: number;
}

interface Connection {
  from: Neuron;
  to: Neuron;
  strength: number;
}

interface BiologicalIcon {
  component: LucideIcon;
  size: number;
  type: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: BiologicalIcon;
  duration: number;
  delay: number;
  direction: number;
  speed: number;
  amplitude: number;
}

interface Orbital {
  id: number;
  radius: number;
  speed: number;
  phase: number;
  inclination: number;
}



interface BioParticle {
  id: number;
  x: number;
  y: number;
  icon: LucideIcon;
}

interface Equipment {
  icon: LucideIcon;
  name: string;
  action: string;
}

interface Level {
  icon: LucideIcon;
  name: string;
  color: string;
}

interface Education {
  years: string;
  degree: string;
  institution: string;
  icon: LucideIcon;
  description: string;
  particles: LucideIcon[];
}

interface Job {
  period: string;
  title: string;
  company: string;
  icon: LucideIcon;
  achievements: string[];
}

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  volume: string;
  pages: string;
}

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  particles: LucideIcon[];
}

interface MousePosition {
  x: number;
  y: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

// Component Props


interface BioAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Standard DNA Double Helix Animation
const DNAHelix = () => {
  const [time, setTime] = useState(0);
  const [geneticCode] = useState(['A-T', 'C-G', 'T-A', 'G-C']);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.05); // Faster animation
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-12">
      <svg className="w-full h-full" viewBox="0 0 400 1200">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="75%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
          <filter id="dnaGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="nucleotideGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <linearGradient id="basePairGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {Array.from({ length: 50 }).map((_, i) => {
          const y = i * 20; // Closer spacing for more detail
          const helixRadius = 50;
          const centerX = 200;
          
          // Calculate positions for classic double helix
          const angle = time + i * 0.4; // Helical twist
          const leftX = centerX + Math.cos(angle) * helixRadius;
          const rightX = centerX - Math.cos(angle) * helixRadius;
          const leftZ = Math.sin(angle) * helixRadius;
          const rightZ = -Math.sin(angle) * helixRadius;
          
          // Next point for smooth curves
          const nextAngle = time + (i + 1) * 0.4;
          const leftX2 = centerX + Math.cos(nextAngle) * helixRadius;
          const rightX2 = centerX - Math.cos(nextAngle) * helixRadius;
          
          // Depth effect (z-axis simulation)
          const leftOpacity = (leftZ + helixRadius) / (2 * helixRadius);
          const rightOpacity = (rightZ + helixRadius) / (2 * helixRadius);
          
          return (
            <g key={i}>
              {/* DNA backbone strands - smooth helical curves */}
              <path
                d={`M ${leftX} ${y} Q ${(leftX + leftX2) / 2} ${y + 10} ${leftX2} ${y + 20}`}
                stroke="url(#dnaGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#dnaGlow)"
                opacity={leftOpacity * 0.9 + 0.3}
              />
              <path
                d={`M ${rightX} ${y} Q ${(rightX + rightX2) / 2} ${y + 10} ${rightX2} ${y + 20}`}
                stroke="url(#dnaGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#dnaGlow)"
                opacity={rightOpacity * 0.9 + 0.3}
              />
              
              {/* Base pairs - classic ladder rungs */}
              {i % 2 === 0 && Math.abs(leftZ) < 30 && Math.abs(rightZ) < 30 && (
                <>
                  <line
                    x1={leftX}
                    y1={y}
                    x2={rightX}
                    y2={y}
                    stroke="url(#basePairGradient)"
                    strokeWidth="2"
                    opacity="0.7"
                    className="animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '2s'
                    }}
                    filter="url(#dnaGlow)"
                  />
                  
                  {/* Base pair labels */}
                  <text
                    x={centerX}
                    y={y + 3}
                    fill="#facc15"
                    fontSize="6"
                    textAnchor="middle"
                    opacity="0.8"
                    className="animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: '2s'
                    }}
                  >
                    {geneticCode[i % 4]}
                  </text>
                </>
              )}
              
              {/* Nucleotides on backbone */}
              <circle 
                cx={leftX} 
                cy={y} 
                r="3" 
                fill="url(#nucleotideGradient)" 
                filter="url(#dnaGlow)"
                opacity={leftOpacity * 0.8 + 0.4}
                className="animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
              <circle 
                cx={rightX} 
                cy={y} 
                r="3" 
                fill="url(#nucleotideGradient)" 
                filter="url(#dnaGlow)"
                opacity={rightOpacity * 0.8 + 0.4}
                className="animate-pulse" 
                style={{ 
                  animationDelay: `${i * 0.1 + 1}s`,
                  animationDuration: '3s'
                }}
              />
              
              {/* Sugar-phosphate backbone detail */}
              <circle
                cx={leftX}
                cy={y - 3}
                r="1.5"
                fill="#eab308"
                opacity={leftOpacity * 0.6 + 0.3}
                className="animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: '2.5s'
                }}
              />
              <circle
                cx={rightX}
                cy={y - 3}
                r="1.5"
                fill="#eab308"
                opacity={rightOpacity * 0.6 + 0.3}
                className="animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.08 + 0.5}s`,
                  animationDuration: '2.5s'
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Cellular Membrane Animation
const CellMembrane: React.FC = () => {
  const [membrane, setMembrane] = useState<MembranePoint[]>([]);

  useEffect(() => {
    const points: MembranePoint[] = Array.from({ length: 20 }).map((_, i) => ({
      x: (i / 19) * 100,
      y: 50 + Math.sin(i * 0.5) * 20,
      phase: i * 0.3
    }));
    setMembrane(points);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-32 pointer-events-none opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 30">
        <defs>
          <linearGradient id="membraneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Phospholipid bilayer */}
        <path
          d={`M 0 10 ${membrane.map(p => `L ${p.x} ${10 + Math.sin(Date.now() * 0.001 + p.phase) * 3}`).join(' ')}`}
          stroke="url(#membraneGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d={`M 0 20 ${membrane.map(p => `L ${p.x} ${20 + Math.sin(Date.now() * 0.001 + p.phase + Math.PI) * 3}`).join(' ')}`}
          stroke="url(#membraneGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Protein channels */}
        {Array.from({ length: 5 }).map((_, i) => (
          <ellipse
            key={i}
            cx={i * 20 + 10}
            cy="15"
            rx="3"
            ry="8"
            fill="#facc15"
            opacity="0.6"
            className="animate-ping"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// Neural Network Animation
const NeuralNetwork: React.FC = () => {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const newNeurons: Neuron[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: (i % 5) * 25 + 10,
      y: Math.floor(i / 5) * 30 + 15,
      active: false,
      activation: Math.random()
    }));

    const newConnections: Connection[] = [];
    newNeurons.forEach(neuron => {
      newNeurons.forEach(other => {
        if (neuron.id !== other.id && Math.random() > 0.7) {
          newConnections.push({
            from: neuron,
            to: other,
            strength: Math.random()
          });
        }
      });
    });

    setNeurons(newNeurons);
    setConnections(newConnections);

    // Simulate neural activity
    const interval = setInterval(() => {
      setNeurons(prev => prev.map(neuron => ({
        ...neuron,
        active: Math.random() > 0.7,
        activation: Math.random()
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-32 h-24 opacity-30">
      <svg viewBox="0 0 120 90" className="w-full h-full">
        <defs>
          <filter id="neuralGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Synaptic connections */}
        {connections.map((conn, i) => (
          <line
            key={i}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="#facc15"
            strokeWidth={conn.strength * 2}
            opacity={conn.strength * 0.6}
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        
        {/* Neurons */}
        {neurons.map(neuron => (
          <circle
            key={neuron.id}
            cx={neuron.x}
            cy={neuron.y}
            r={neuron.active ? "4" : "2"}
            fill={neuron.active ? "#facc15" : "#eab308"}
            filter="url(#neuralGlow)"
            className={neuron.active ? "animate-ping" : "animate-pulse"}
            opacity={neuron.activation}
          />
        ))}
      </svg>
    </div>
  );
};

// Protein Folding Animation
const ProteinFolding: React.FC = () => {
  const [foldState, setFoldState] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFoldState(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getPath = (): string => {
    switch(foldState) {
      case 0: return "M 10 20 Q 30 10 50 20 Q 70 30 90 20";
      case 1: return "M 10 20 Q 20 5 30 20 Q 50 35 70 15 Q 80 5 90 20";
      case 2: return "M 10 20 Q 25 35 40 20 Q 55 5 70 20 Q 85 35 90 20";
      case 3: return "M 10 20 Q 30 30 50 15 Q 70 5 90 25";
      default: return "M 10 20 Q 30 10 50 20 Q 70 30 90 20";
    }
  };

  return (
    <div className="w-24 h-12">
      <svg viewBox="0 0 100 40" className="w-full h-full">
        <defs>
          <linearGradient id="proteinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>
        
        <path
          d={getPath()}
          stroke="url(#proteinGradient)"
          strokeWidth="3"
          fill="none"
          className="transition-all duration-1000"
        />
        
        {/* Amino acid residues */}
        {Array.from({ length: 7 }).map((_, i) => (
          <circle
            key={i}
            cx={15 + i * 12}
            cy={20 + Math.sin(foldState + i) * 10}
            r="2"
            fill="#facc15"
            className="transition-all duration-1000 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

// Ecosystem Food Chain Animation
const EcosystemChain: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  
  const levels: Level[] = [
    { icon: Sun, name: "Solar Energy", color: "#facc15" },
    { icon: Leaf, name: "Producers", color: "#22c55e" },
    { icon: Bug, name: "Primary Consumers", color: "#f59e0b" },
    { icon: Fish, name: "Secondary Consumers", color: "#3b82f6" },
    { icon: Activity, name: "Energy Flow", color: "#ef4444" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLevel(prev => (prev + 1) % levels.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      {levels.map((level, index) => {
        const IconComponent = level.icon;
        const isActive = index <= currentLevel;
        
        return (
          <div key={index} className="flex items-center">
            <div
              className={`p-2 rounded-full transition-all duration-500 ${
                isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'
              }`}
              style={{ backgroundColor: isActive ? level.color + '40' : 'transparent' }}
            >
              <IconComponent 
                size={16} 
                style={{ color: level.color }}
                className={isActive ? 'animate-pulse' : ''}
              />
            </div>
            {index < levels.length - 1 && (
              <ChevronDown 
                size={12} 
                className={`transition-all duration-500 ${
                  isActive ? 'text-yellow-400 animate-bounce' : 'text-gray-600'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Advanced Scientific Particle System
const AdvancedParticleSystem: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const biologicalIcons: BiologicalIcon[] = [
      { component: Dna, size: 20, type: 'dna' },
      { component: Atom, size: 18, type: 'atom' },
      { component: Microscope, size: 22, type: 'instrument' },
      { component: FlaskConical, size: 18, type: 'lab' },
      { component: Brain, size: 20, type: 'organ' },
      { component: Heart, size: 18, type: 'organ' },
      { component: Eye, size: 16, type: 'organ' },
      { component: Leaf, size: 18, type: 'plant' },
      { component: Bug, size: 16, type: 'insect' },
      { component: Fish, size: 20, type: 'aquatic' },
      { component: TreePine, size: 22, type: 'plant' },
      { component: Flower, size: 18, type: 'plant' },
      { component: TestTube, size: 16, type: 'lab' },
      { component: Beaker, size: 18, type: 'lab' },
      { component: Telescope, size: 20, type: 'instrument' },
      { component: Target, size: 16, type: 'research' },
      { component: Orbit, size: 20, type: 'molecular' },
      { component: Waves, size: 18, type: 'signal' },
      { component: Zap, size: 16, type: 'energy' },
      { component: Sparkles, size: 14, type: 'reaction' }
    ];

    const newParticles: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: biologicalIcons[Math.floor(Math.random() * biologicalIcons.length)],
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      direction: Math.random() * 360,
      speed: Math.random() * 2 + 1,
      amplitude: Math.random() * 30 + 20
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const IconComponent = particle.icon.component;
        return (
          <div
            key={particle.id}
            className="absolute text-yellow-400 opacity-25 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `rotate(${particle.direction}deg)`,
              '--float-amplitude': `${particle.amplitude}px`
            } as React.CSSProperties}
          >
            <IconComponent size={particle.icon.size} />
          </div>
        );
      })}
    </div>
  );
};

// Enhanced 3D Molecular Sphere with Orbiting Elements
const AdvancedMolecularSphere: React.FC = () => {
  const [rotation, setRotation] = useState<Rotation>({ x: 0, y: 0, z: 0 });
  const [orbitals, setOrbitals] = useState<Orbital[]>([]);

  useEffect(() => {
    // Create orbital elements
    const newOrbitals: Orbital[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      radius: 60 + i * 15,
      speed: 0.5 + i * 0.2,
      phase: i * 30,
      inclination: i * 15
    }));
    setOrbitals(newOrbitals);

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.3,
        y: prev.y + 0.7,
        z: prev.z + 0.2
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-96 h-96 perspective-1000">
      <div 
        className="relative w-full h-full preserve-3d"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` 
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
        >
          <defs>
            <radialGradient id="advancedSphereGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
              <stop offset="30%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#ca8a04" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#854d0e" stopOpacity="0.2" />
            </radialGradient>
            <filter id="advancedSphereGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Complex orbital patterns */}
          {orbitals.map((orbital, i) => (
            <g key={orbital.id}>
              <circle
                cx="100"
                cy="100"
                r={orbital.radius}
                fill="none"
                stroke="url(#orbitalGradient)"
                strokeWidth="1.5"
                strokeDasharray="3,2"
                className="animate-spin"
                style={{ 
                  animationDuration: `${20 + i * 3}s`,
                  animationDirection: i % 2 ? 'reverse' : 'normal'
                }}
              />
              
              {/* Orbital electrons */}
              <circle
                cx={100 + Math.cos(rotation.y * 0.01 + orbital.phase) * orbital.radius}
                cy={100 + Math.sin(rotation.y * 0.01 + orbital.phase) * orbital.radius}
                r="2"
                fill="#facc15"
                filter="url(#advancedSphereGlow)"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
          
          {/* Electron shells */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={`shell-${i}`}
              cx="100"
              cy="100"
              rx="90"
              ry={30 + Math.sin(i * Math.PI / 4) * 40}
              fill="none"
              stroke="url(#advancedSphereGradient)"
              strokeWidth="2"
              transform={`rotate(${i * 22.5} 100 100)`}
              filter="url(#advancedSphereGlow)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          
          {/* Central nucleus with detail */}
          <circle 
            cx="100" 
            cy="100" 
            r="12" 
            fill="url(#advancedSphereGradient)" 
            filter="url(#advancedSphereGlow)"
            className="animate-ping" 
          />
          <circle 
            cx="100" 
            cy="100" 
            r="8" 
            fill="#facc15" 
            className="animate-pulse" 
          />
          
          {/* Quantum field fluctuations */}
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={`quantum-${i}`}
              cx={100 + Math.cos(i * Math.PI / 10) * (80 + Math.sin(rotation.x * 0.01) * 20)}
              cy={100 + Math.sin(i * Math.PI / 10) * (80 + Math.cos(rotation.y * 0.01) * 20)}
              r="1"
              fill="#facc15"
              opacity="0.6"
              className="animate-ping"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Floating biology icons around sphere */}
      <div className="absolute inset-0 pointer-events-none">
        {[Dna, Atom, Brain, Heart, Leaf, Bug].map((Icon, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 opacity-40 animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '6s'
            }}
          >
            <Icon size={20} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Typewriter with Scientific Elements
// const ScientificTypewriter: React.FC<ScientificTypewriterProps> = ({ 
//   text, 
//   className = "", 
//   delay = 0, 
//   speed = 30  // Reduced from 90 to 30ms
// }) => {
//   const [displayText, setDisplayText] = useState<string>('');
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [showCursor, setShowCursor] = useState<boolean>(true);
//   const [particles, setParticles] = useState<TypingParticle[]>([]);

//   useEffect(() => {
//     if (currentIndex >= text.length) return;
    
//     const timer = setTimeout(() => {
//       setDisplayText(text.slice(0, currentIndex + 1)); // More efficient than concatenation
//       setCurrentIndex(prev => prev + 1);
      
//       // Add particle less frequently for better performance
//       if (currentIndex % 2 === 0) { // Only every other letter
//         setParticles(prev => [
//           ...prev.slice(-5), // Keep only last 5 particles
//           {
//             id: currentIndex, // Use index instead of Date.now()
//             x: Math.random() * 100,
//             y: Math.random() * 100
//           }
//         ]);
//       }
//     }, delay + currentIndex * speed);

//     return () => clearTimeout(timer);
//   }, [currentIndex, text, delay, speed]);

//   useEffect(() => {
//     const cursorTimer = setInterval(() => {
//       setShowCursor(prev => !prev);
//     }, 500);
//     return () => clearInterval(cursorTimer);
//   }, []);

//   // More efficient particle cleanup
//   useEffect(() => {
//     if (particles.length > 8) {
//       const cleanup = setTimeout(() => {
//         setParticles(prev => prev.slice(-5));
//       }, 1000);
//       return () => clearTimeout(cleanup);
//     }
//   }, [particles.length]); // Only depend on length, not full particles array

//   return (
//     <div className="relative">
//       <span className={className}>
//         {displayText}
//         {showCursor && <span className="text-yellow-400 animate-blink">|</span>}
//       </span>
      
//       {/* Optimized particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {particles.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping opacity-40"
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               animationDuration: '0.8s'
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// Biology Lab Equipment Animation
const LabEquipment: React.FC = () => {
  const [activeEquipment, setActiveEquipment] = useState<number>(0);
  
  const equipment: Equipment[] = [
    { icon: Microscope, name: "Microscopy", action: "animate-pulse" },
    { icon: FlaskConical, name: "Chemical Analysis", action: "animate-bounce" },
    { icon: TestTube, name: "Sample Testing", action: "animate-spin" },
    { icon: Beaker, name: "Solution Prep", action: "animate-ping" },
    { icon: Telescope, name: "Observation", action: "animate-pulse" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEquipment(prev => (prev + 1) % equipment.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mb-6 space-x-4">
      {equipment.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = index === activeEquipment;
        
        return (
          <div
            key={index}
            className={`p-3 rounded-full transition-all duration-500 ${
              isActive 
                ? 'bg-yellow-400/30 scale-125 text-yellow-400' 
                : 'bg-gray-800 scale-100 text-gray-500'
            }`}
          >
            <IconComponent 
              size={24} 
              className={isActive ? item.action : ''}
            />
          </div>
        );
      })}
    </div>
  );
};

// Biological Process Visualization
const BiologicalProcesses: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="p-4 border rounded-lg bg-gray-800/50 border-yellow-400/20">
        <h4 className="flex items-center gap-2 mb-2 text-sm text-yellow-400">
          <Activity size={16} />
          Neural Activity
        </h4>
        <NeuralNetwork />
      </div>
      
      <div className="p-4 border rounded-lg bg-gray-800/50 border-yellow-400/20">
        <h4 className="flex items-center gap-2 mb-2 text-sm text-yellow-400">
          <Dna size={16} />
          Protein Folding
        </h4>
        <ProteinFolding />
      </div>
      
      <div className="col-span-2 p-4 border rounded-lg bg-gray-800/50 border-yellow-400/20">
        <h4 className="flex items-center gap-2 mb-2 text-sm text-yellow-400">
          <Leaf size={16} />
          Ecosystem Dynamics
        </h4>
        <EcosystemChain />
      </div>
    </div>
  );
};

// Enhanced Animated Section with Bio Effects
const BioAnimatedSection: React.FC<BioAnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [bioParticles, setBioParticles] = useState<BioParticle[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            // Generate bio particles on reveal
            setBioParticles(Array.from({ length: 5 }).map((_, i) => ({
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              icon: [Sparkles, Star, Circle, Atom, Dna][i % 5]
            })));
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={`relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
      } ${className}`}
    >
      {children}
      
      {/* Bio reveal particles */}
      {isVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {bioParticles.map((particle) => {
            const IconComponent = particle.icon;
            return (
              <div
                key={particle.id}
                className="absolute text-yellow-400 opacity-60 animate-float"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.id * 0.3}s`,
                  animationDuration: '3s'
                }}
              >
                <IconComponent size={12} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Main Component
export default function Home() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const educationData: Education[] = [
    {
      years: "2020 - 2026",
      degree: "Ph.D. in Population Biology",
      institution: "University of California Davis, CA",
      icon: Microscope,
      description: "Focus on computational genomics and evolutionary biology",
      particles: [Dna, Atom, Brain]
    },
    {
      years: "2018 - 2020",
      degree: "M.Sc. in Ecology & Evolutionary Biology",
      institution: "University of California Los Angeles, CA",
      icon: Dna,
      description: "Advanced studies in population genetics and bioinformatics",
      particles: [Leaf, Bug, Fish]
    },
    {
      years: "2014 - 2018",
      degree: "B.Sc. in Biochemistry & Molecular Biology",
      institution: "University of Massachusetts Amherst, MA",
      icon: Atom,
      description: "Foundation in molecular mechanisms and biochemical pathways",
      particles: [FlaskConical, TestTube, Beaker]
    }
  ];

  const jobData: Job[] = [
    {
      period: "Jun 2024 – Aug 2024",
      title: "Genomics Data Scientist (PhD Intern)",
      company: "Regeneron Genetics Center, Tarrytown, NY",
      icon: Dna,
      achievements: [
        "Analyzed large-scale multiomic datasets using advanced bioinformatics tools and statistical models",
        "Performed proteomic deconvolution of UK Biobank data to identify immune cell-type signatures in autoimmune diseases",
        "Created custom phenotypes for GWAS meta-analyses by integrating epidemiological and immunological data",
        "Conducted GWAS to explore genetic mechanisms in inflammatory conditions",
        "Presented results to a multidisciplinary team of researchers and clinicians"
      ]
    },
    {
      period: "Sept 2020 – Present",
      title: "Graduate Research Associate",
      company: "University of California Davis",
      icon: Microscope,
      achievements: [
        "Built tuberculosis case-control assignment algorithms from 50+ clinical variables",
        "Applied Random Forest and Logistic Regression to predict TB progression from 1000+ patient samples",
        "Annotated pathogenic variants for the CAAPA Consortium",
        "Performed single-cell RNA-seq on PBMCs from TB cohort"
      ]
    },
    {
      period: "Sept 2023 – Present",
      title: "Teaching Assistant: Computational Genomics",
      company: "University of California Davis",
      icon: BookOpen,
      achievements: [
        "Facilitated advanced genetics course with 25 PhD students",
        "Developed instructional materials and hosted weekly coding sessions"
      ]
    },
    {
      period: "Sept 2022 – Apr 2023",
      title: "Visiting Scholar",
      company: "Stellenbosch University, Cape Town, South Africa",
      icon: Globe,
      achievements: [
        "Led a 2-month fieldwork expedition collecting blood, saliva, and biometric data",
        "Developed data harmonization pipelines for accurate longitudinal tracking"
      ]
    }
  ];

  const publicationData: Publication[] = [
    {
      title: "Strong effect of demographic changes on Tuberculosis susceptibility in South Africa",
      authors: "Oyageshio, O. P., Myrick, J. W., Saayman, J., van der Westhuizen, L., Al-Hindi, D. R., Reynolds, A. W., ... & Henn, B. M.",
      journal: "PLOS Global Public Health",
      year: "2024",
      volume: "4(7)",
      pages: "e0002643"
    },
    {
      title: "Epidemiological correlates of overweight and obesity in the Northern Cape Province, South Africa",
      authors: "Smith, M. H., Myrick, J. W., Oyageshio, O.P., Uren, C., Saayman, J., Boolay, S., ... & Reynolds, A. W.",
      journal: "PeerJ",
      year: "2023",
      volume: "11",
      pages: "e14723"
    }
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/oshiomah1", label: "GitHub", particles: [Star, Circle] },
    { icon: Twitter, href: "#", label: "Twitter", particles: [Sparkles, Triangle] },
    { icon: Mail, href: "mailto:oyageshio@ucdavis.edu", label: "Email", particles: [Plus, Square] },
    { icon: Linkedin, href: "https://www.linkedin.com/in/oshiomah/", label: "LinkedIn", particles: [Minus, X] }
  ];

  const programmingSkills: string[] = ["Python", "Bash", "R", "Markdown", "C++", "Linux Shell Scripting", "UNIX"];
  const expertiseFields: string[] = ["Bioinformatics", "Computational Biology", "Evolutionary Genomics", "Statistical Genetics"];

  return (
    <div className="flex min-h-screen text-white bg-black">
      {/* Advanced Background Effects */}
      <DNAHelix />
      <AdvancedParticleSystem />
      <CellMembrane />
      
      {/* Mouse follower effect */}
      <div 
        className="fixed z-50 w-4 h-4 transition-all duration-1000 bg-yellow-400 rounded-full pointer-events-none opacity-20"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${1 + Math.sin(Date.now() * 0.005)})`
        }}
      />
      
      {/* Left Side - Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative flex items-center px-4 pt-24 pb-16 max-w-[1440px] mx-auto min-h-screen sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto lg:mx-0 lg:ml-8">
            <div className="text-center lg:text-left md:pl-12">
              
              {/* Lab Equipment Animation */}
              <BioAnimatedSection delay={100}>
                <LabEquipment />
              </BioAnimatedSection>

              <BioAnimatedSection delay={200}>
                <div className="relative mb-8 group">
                  <div className="relative mx-auto overflow-hidden border-4 border-yellow-400 rounded-full w-80 h-80 lg:mx-0 bg-gradient-to-br from-yellow-400/20 to-transparent backdrop-blur-sm">
                    {/* Enhanced Profile with Multiple Animations */}
                    <div className="relative flex items-center justify-center w-full h-full text-6xl font-bold text-yellow-400 transition-transform duration-500 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105">
                    <Image
                  src={osho}
                  alt="Jacob West-Roberts"
                  width={350}
                  height={350}
                  className="mx-auto border-4 border-yellow-400 rounded-full lg:mx-0"
                />
                      
                      {/* Cellular structure overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <circle
                              key={i}
                              cx={30 + (i % 3) * 20}
                              cy={30 + Math.floor(i / 3) * 20}
                              r="3"
                              fill="#facc15"
                              className="animate-ping"
                              style={{ animationDelay: `${i * 0.3}s` }}
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                    
                    {/* Multiple orbital rings with different speeds */}
                    <div className="absolute inset-0 rounded-full">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 border border-yellow-400 rounded-full opacity-30"
                          style={{ 
                            margin: `${i * 15}px`,
                            animation: `spin ${8 + i * 3}s linear infinite ${i % 2 ? 'reverse' : 'normal'}`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Enhanced floating scientific symbols */}
                  <div className="absolute text-yellow-400 -top-6 -right-6 animate-float">
                    <Dna size={40} />
                  </div>
                  <div className="absolute text-yellow-400 -bottom-6 -left-6 animate-float" style={{ animationDelay: '1s' }}>
                    <Microscope size={36} />
                  </div>
                  <div className="absolute text-yellow-400 top-1/2 -left-10 animate-float" style={{ animationDelay: '2s' }}>
                    <Atom size={32} />
                  </div>
                  <div className="absolute text-yellow-400 top-1/4 -right-8 animate-float" style={{ animationDelay: '1.5s' }}>
                    <Brain size={28} />
                  </div>
                  <div className="absolute text-yellow-400 bottom-1/4 -left-8 animate-float" style={{ animationDelay: '2.5s' }}>
                    <FlaskConical size={30} />
                  </div>
                  <div className="absolute text-yellow-400 top-3/4 -right-6 animate-float" style={{ animationDelay: '0.5s' }}>
                    <Heart size={26} />
                  </div>
                </div>
              </BioAnimatedSection>

              <BioAnimatedSection delay={600}>
                <h1 className="mb-4 text-4xl font-bold text-yellow-400 lg:text-5xl">
                Hi, I&#39;m Oshiomah P. Oyageshio
                 
                </h1>
              </BioAnimatedSection>

              <BioAnimatedSection delay={1000}>
                <h2 className="flex items-center justify-center gap-4 mb-6 text-xl text-gray-300 lg:text-2xl lg:justify-start">
                  <div className="flex items-center space-x-2">
                    <FlaskConical className="text-yellow-400 animate-pulse" size={28} />
                    <Microscope className="text-yellow-400 animate-bounce" size={28} />
                    <Dna className="text-yellow-400 animate-spin" size={28} style={{ animationDuration: '3s' }} />
                  </div>
                  <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
                    Interdisciplinary Scientist
                  </span>
                  <div className="flex items-center space-x-2">
                    <Brain className="text-yellow-400 animate-pulse" size={28} style={{ animationDelay: '1s' }} />
                    <Atom className="text-yellow-400 animate-ping" size={28} />
                    <TestTube className="text-yellow-400 animate-bounce" size={28} style={{ animationDelay: '0.5s' }} />
                  </div>
                </h2>
              </BioAnimatedSection>

              {/* Biological Processes Visualization */}
              <BioAnimatedSection delay={1100}>
                <BiologicalProcesses />
              </BioAnimatedSection>

              <BioAnimatedSection delay={1200}>
                <div className="relative max-w-lg p-6 mx-auto mb-8 overflow-hidden text-gray-400 border rounded-lg lg:mx-0 bg-gray-900/50 backdrop-blur-sm border-yellow-400/20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent animate-pulse"></div>
                  <p className="relative z-10 flex items-start gap-3">
                    <div className="flex flex-col space-y-2">
                      <BookOpen className="text-yellow-400 animate-pulse" size={20} />
                      <Dna className="text-yellow-400 animate-spin" size={16} style={{ animationDuration: '4s' }} />
                    </div>
                    I am a 3rd Year PhD Candidate at UCDavis in the Population Biology Department supervised by Dr. Brenna Henn.
                  </p>
                  
                  {/* Floating particles in description */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[Sparkles, Star, Circle].map((Icon, i) => (
                      <Icon
                        key={i}
                        size={8}
                        className="absolute text-yellow-400 opacity-40 animate-ping"
                        style={{
                          left: `${20 + i * 25}%`,
                          top: `${30 + i * 20}%`,
                          animationDelay: `${i * 0.8}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </BioAnimatedSection>

              <BioAnimatedSection delay={1400}>
                <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row lg:justify-start">
                  <button className="relative flex items-center gap-2 px-6 py-3 overflow-hidden font-medium text-black transition-all duration-300 bg-yellow-400 rounded-md hover:bg-yellow-500 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 group">
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:opacity-100"></div>
                    <Users className="relative z-10 group-hover:animate-spin" size={20} />
                    <span className="relative z-10">About Me</span>
                    <Sparkles className="relative z-10 group-hover:animate-ping" size={16} />
                  </button>
                  <button className="relative flex items-center gap-2 px-6 py-3 overflow-hidden font-medium text-yellow-400 transition-all duration-300 border border-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black hover:scale-105 group">
                    <div className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-yellow-400 group-hover:scale-x-100"></div>
                    <Mail className="relative z-10 group-hover:animate-bounce" size={20} />
                    <span className="relative z-10">Contact</span>
                    <Zap className="relative z-10 group-hover:animate-pulse" size={16} />
                  </button>
                </div>
              </BioAnimatedSection>

              <BioAnimatedSection delay={1600}>
                <div className="flex justify-center gap-6 mb-8 lg:justify-start">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="relative p-4 overflow-hidden text-yellow-400 transition-all duration-300 bg-gray-800 rounded-full group hover:bg-yellow-400 hover:text-black hover:scale-125 hover:rotate-12"
                      title={social.label}
                    >
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-yellow-400/20 to-transparent group-hover:opacity-100"></div>
                      
                      <social.icon size={24} className="relative z-10" />
                      
                      {/* Particle effects on hover */}
                      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100">
                        {social.particles.map((Particle, i) => (
                          <Particle
                            key={i}
                            size={8}
                            className="absolute text-yellow-400 animate-ping"
                            style={{
                              left: `${20 + i * 40}%`,
                              top: `${20 + i * 40}%`,
                              animationDelay: `${i * 0.3}s`
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="absolute px-3 py-1 text-xs text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 -top-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
                        {social.label}
                      </div>
                    </a>
                  ))}
                </div>
              </BioAnimatedSection>

              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3 p-3 text-yellow-400 rounded-full bg-gray-900/50 backdrop-blur-sm">
                  <ChevronDown
                    className="animate-bounce"
                    size={32}
                    style={{ 
                      transform: `translateY(${Math.sin(scrollY * 0.01) * 5}px)`,
                      animationDuration: '2s'
                    }}
                  />
                  <span className="text-sm animate-pulse">Scroll to explore the journey</span>
                  <Activity className="animate-pulse" size={16} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CV Section - Enhanced with more biology */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Section background effects */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${10 + i * 2}s linear infinite`
                }}
              >
                {[Dna, Atom, Brain, Heart, Leaf, Bug, Fish, TreePine, FlaskConical, Microscope][i] && 
                  React.createElement([Dna, Atom, Brain, Heart, Leaf, Bug, Fish, TreePine, FlaskConical, Microscope][i], { size: 24 })
                }
              </div>
            ))}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <BioAnimatedSection>
              <div className="relative flex flex-col items-center justify-between mb-12 sm:flex-row">
                <h2 className="flex items-center gap-4 mb-4 text-3xl font-bold text-transparent sm:mb-0 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
                  <div className="relative">
                    <Award className="text-yellow-400 animate-pulse" size={32} />
                    <div className="absolute rounded-full -inset-2 bg-yellow-400/20 animate-ping"></div>
                  </div>
                  Curriculum Vitae
                  <div className="flex space-x-2">
                    {[BookOpen, Search, Target].map((Icon, i) => (
                      <Icon
                        key={i}
                        size={20}
                        className="text-yellow-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    ))}
                  </div>
                </h2>
                
                <a
                  href="/cv.pdf"
                  download="Oshiomah_Oyageshio_CV.pdf"
                  className="relative flex items-center px-6 py-3 space-x-2 overflow-hidden font-semibold text-black transition-all duration-300 transform bg-yellow-400 rounded-lg shadow-lg group hover:bg-yellow-500 hover:scale-105 hover:shadow-yellow-400/25"
                >
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-yellow-300 to-yellow-500 group-hover:opacity-100"></div>
                  <Download size={18} className="relative z-10 group-hover:animate-bounce" />
                  <span className="relative z-10">Download CV</span>
                  <Sparkles size={16} className="relative z-10 group-hover:animate-spin" />
                </a>
              </div>
            </BioAnimatedSection>

            <div className="space-y-16">
              {/* Education with enhanced animations */}
              <BioAnimatedSection delay={300}>
                <div className="relative group">
                  <div className="absolute transition-opacity duration-500 rounded-lg opacity-0 -inset-4 bg-gradient-to-r from-yellow-400/10 to-transparent group-hover:opacity-100"></div>
                  
                  <h3 className="relative z-10 flex items-center gap-4 pb-2 mb-8 text-2xl font-bold text-yellow-400 transition-all duration-300 border-b-2 border-yellow-400 group-hover:border-yellow-300">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={28} className="animate-pulse" />
                      <Brain size={24} className="animate-bounce" />
                      <Lightbulb size={20} className="animate-ping" />
                    </div>
                    Education
                    <div className="ml-auto">
                      <ProteinFolding />
                    </div>
                  </h3>

                  <div className="relative z-10 space-y-8">
                    {educationData.map((edu, index) => (
                      <BioAnimatedSection key={index} delay={400 + index * 200}>
                        <div className="relative p-6 overflow-hidden transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:scale-105 hover:shadow-xl hover:border-yellow-400/50 group">
                          {/* Background particle animation */}
                          <div className="absolute inset-0 pointer-events-none opacity-20">
                            {edu.particles.map((Particle, i) => (
                              <Particle
                                key={i}
                                size={16}
                                className="absolute text-yellow-400 transition-opacity duration-500 opacity-0 animate-float group-hover:opacity-100"
                                style={{
                                  left: `${20 + i * 30}%`,
                                  top: `${20 + i * 20}%`,
                                  animationDelay: `${i * 0.5}s`,
                                  animationDuration: '4s'
                                }}
                              />
                            ))}
                          </div>
                          
                          <div className="relative z-10 flex items-start gap-4">
                            <div className="relative p-3 transition-colors duration-300 rounded-full bg-yellow-400/20 group-hover:bg-yellow-400/30">
                              <edu.icon className="text-yellow-400" size={24} />
                              <div className="absolute rounded-full opacity-0 -inset-1 bg-yellow-400/20 animate-ping group-hover:opacity-100"></div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 font-semibold text-yellow-400">
                                <Calendar size={16} className="animate-pulse" />
                                {edu.years}
                                <Sparkles size={12} className="animate-ping" />
                              </div>
                              <h4 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-yellow-400">
                                {edu.degree}
                              </h4>
                              <p className="flex items-center gap-2 mb-2 text-gray-400">
                                <MapPin size={16} className="animate-bounce" />
                                {edu.institution}
                              </p>
                              <p className="text-sm italic text-gray-500">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </BioAnimatedSection>
                    ))}
                  </div>
                </div>
              </BioAnimatedSection>

              {/* Professional Experience */}
              <BioAnimatedSection delay={600}>
                <div>
                  <h3 className="relative z-10 flex items-center gap-4 pb-2 mb-8 text-2xl font-bold text-yellow-400 transition-all duration-300 border-b-2 border-yellow-400 group-hover:border-yellow-300">
                    <div className="flex items-center space-x-2">
                      <FlaskConical size={28} className="animate-pulse" />
                      <Microscope size={24} className="animate-bounce" />
                      <Target size={20} className="animate-ping" />
                    </div>
                    Professional Experience
                  </h3>

                  <div className="space-y-8">
                    {jobData.map((job, index) => (
                      <BioAnimatedSection key={index} delay={700 + index * 300}>
                        <div className="relative p-6 overflow-hidden transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:scale-102 hover:shadow-xl hover:border-yellow-400/30 group">
                          <div className="flex items-start gap-4">
                            <div className="p-3 transition-colors duration-300 rounded-full bg-yellow-400/20 group-hover:bg-yellow-400/30">
                              <job.icon className="text-yellow-400" size={24} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 font-semibold text-yellow-400">
                                <Calendar size={16} className="animate-pulse" />
                                {job.period}
                              </div>
                              <h4 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-yellow-400">
                                {job.title}
                              </h4>
                              <p className="flex items-center gap-2 mb-4 text-gray-400">
                                <MapPin size={16} className="animate-bounce" />
                                {job.company}
                              </p>
                              <ul className="space-y-2 text-sm text-gray-400">
                                {job.achievements.map((achievement, achIndex) => (
                                  <li key={achIndex} className="flex items-start gap-2 transition-colors duration-200 hover:text-gray-300">
                                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-yellow-400 rounded-full"></div>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </BioAnimatedSection>
                    ))}
                  </div>
                </div>
              </BioAnimatedSection>

              {/* Technical Proficiencies */}
              <BioAnimatedSection delay={900}>
                <div>
                  <h3 className="flex items-center gap-4 pb-2 mb-8 text-2xl font-bold text-yellow-400 border-b-2 border-yellow-400">
                    <div className="flex items-center space-x-2">
                      <Atom size={28} className="animate-pulse" />
                      <Zap size={24} className="animate-bounce" />
                      <Brain size={20} className="animate-ping" />
                    </div>
                    Technical Proficiencies
                  </h3>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-6 transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:scale-105 hover:border-yellow-400/30">
                      <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-yellow-400">
                        <FlaskConical size={20} />
                        Programming Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {programmingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 px-3 py-2 text-sm text-yellow-400 transition-all duration-200 rounded-full cursor-default bg-yellow-400/20 hover:bg-yellow-400/30 hover:scale-110"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:scale-105 hover:border-yellow-400/30">
                      <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-yellow-400">
                        <Dna size={20} />
                        Fields of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {expertiseFields.map((field, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1 px-3 py-2 text-sm text-yellow-400 transition-all duration-200 rounded-full cursor-default bg-yellow-400/20 hover:bg-yellow-400/30 hover:scale-110"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}></div>
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </BioAnimatedSection>

              {/* Selected Publications */}
              <BioAnimatedSection delay={1100}>
                <div>
                  <h3 className="flex items-center gap-4 pb-2 mb-8 text-2xl font-bold text-yellow-400 border-b-2 border-yellow-400">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={28} className="animate-pulse" />
                      <Search size={24} className="animate-bounce" />
                      <Award size={20} className="animate-ping" />
                    </div>
                    Selected Publications
                  </h3>

                  <div className="space-y-6">
                    {publicationData.map((publication, index) => (
                      <div key={index} className="p-6 transition-all duration-300 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:scale-102 hover:border-yellow-400/30 group">
                        <div className="flex items-start gap-4">
                          <div className="p-3 transition-colors duration-300 rounded-full bg-yellow-400/20 group-hover:bg-yellow-400/30">
                            <ExternalLink className="text-yellow-400" size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-yellow-400">
                              {publication.title}
                            </h4>
                            <p className="mb-2 text-sm text-gray-400">
                              {publication.authors}
                            </p>
                            <p className="text-sm text-yellow-400">
                              <em>{publication.journal}</em> ({publication.year}), {publication.volume}, {publication.pages}.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BioAnimatedSection>
            </div>
          </div>
        </section>
      </div>

      {/* Right Side - Fixed Enhanced Molecular Sphere */}
      <div className="fixed top-0 right-0 z-0 items-center justify-center hidden h-screen bg-black lg:flex lg:w-1/2 xl:w-2/5">
        <AdvancedMolecularSphere />
        
        {/* Additional floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[Dna, Brain, Heart, Atom, Leaf, Bug, Fish, TreePine].map((Icon, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 opacity-30"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${10 + Math.floor(i / 4) * 25}%`,
                animation: `float ${8 + i}s linear infinite`,
                animationDelay: `${i * 0.8}s`
              }}
            >
              <Icon size={20 + i % 3 * 4} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-20px) rotate(120deg); 
          }
          66% { 
            transform: translateY(-10px) rotate(240deg); 
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(250, 204, 21, 0.5); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(250, 204, 21, 0.8); 
          }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-float {
          animation: float var(--float-duration, 6s) ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #facc15, #eab308);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #eab308, #ca8a04);
        }
      `}</style>
    </div>
  );
}