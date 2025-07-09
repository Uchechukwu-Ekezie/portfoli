"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Dna,
  // Atom,
  // Brain,
  // Heart,
  Microscope,
  FlaskConical,
  // Leaf,
  // Bug,
  // Fish,
  // TreePine,
  Sparkles,
  Star,
  Circle,
  Target,
  Telescope,
  TestTube,
  Beaker,
  Activity,
  Zap,
  Eye,
  // BookOpen,
  Search,
  Globe,
  Users,
  Award,
  LucideIcon,
} from "lucide-react";
import show from "../../../public/daviduncle.jpg";

// Types
// interface BioParticle {
//   id: number;
//   x: number;
//   y: number;
//   icon: LucideIcon;
//   size: number;
//   duration: number;
//   delay: number;
// }

interface BioAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface FloatingIcon {
  component: LucideIcon;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Floating Background Particles
const FloatingBioParticles: React.FC = () => {
  // const [particles, setParticles] = useState<BioParticle[]>([]);

  useEffect(() => {
    // const biologicalIcons: LucideIcon[] = [
    //   Dna,
    //   Atom,
    //   Brain,
    //   Heart,
    //   Microscope,
    //   FlaskConical,
    //   Leaf,
    //   Bug,
    //   Fish,
    //   TreePine,
    //   Sparkles,
    //   Star,
    //   Circle,
    //   Target,
    //   Telescope,
    //   TestTube,
    //   Beaker,
    //   Activity,
    //   Zap,
    //   Eye,
    // ];

    // const newParticles: BioParticle[] = Array.from({ length: 15 }).map(
    //   (_, i) => ({
    //     id: i,
    //     x: Math.random() * 100,
    //     y: Math.random() * 100,
    //     icon: biologicalIcons[
    //       Math.floor(Math.random() * biologicalIcons.length)
    //     ],
    //     size: Math.random() * 8 + 16,
    //     duration: Math.random() * 10 + 8,
    //     delay: Math.random() * 5,
    //   })
    // );
    // setParticles(newParticles);
  }, []);

  return (
    // <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
    //   {particles.map((particle) => {
    //     const IconComponent = particle.icon;
    //     return (
    //       <div
    //         key={particle.id}
    //         className="absolute text-yellow-400 animate-float"
    //         style={{
    //           left: `${particle.x}%`,
    //           top: `${particle.y}%`,
    //           animationDuration: `${particle.duration}s`,
    //           animationDelay: `${particle.delay}s`,
    //         }}
    //       >
    //         <IconComponent size={particle.size} />
    //       </div>
    //     );
    //   })}
    // </div>
    <div></div>
  );
};

// DNA Strand Background
const DNAStrand: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-8">
      <svg className="w-full h-full" viewBox="0 0 200 800">
        <defs>
          <linearGradient
            id="dnaStrandGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {Array.from({ length: 30 }).map((_, i) => {
          const y = i * 25;
          const angle = time + i * 0.3;
          const leftX = 100 + Math.cos(angle) * 30;
          const rightX = 100 - Math.cos(angle) * 30;

          return (
            <g key={i}>
              <circle
                cx={leftX}
                cy={y}
                r="2"
                fill="url(#dnaStrandGradient)"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <circle
                cx={rightX}
                cy={y}
                r="2"
                fill="url(#dnaStrandGradient)"
                opacity="0.6"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
              />
              {i % 3 === 0 && (
                <line
                  x1={leftX}
                  y1={y}
                  x2={rightX}
                  y2={y}
                  stroke="url(#dnaStrandGradient)"
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// Enhanced Animated Section Component
const BioAnimatedSection: React.FC<BioAnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [revealParticles, setRevealParticles] = useState<FloatingIcon[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            // Generate reveal particles
            setRevealParticles(
              Array.from({ length: 3 }).map((_, i) => ({
                component: [Sparkles, Star, Circle][i],
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 12 + Math.random() * 8,
                duration: 2 + Math.random() * 2,
                delay: i * 0.2,
              }))
            );
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
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      } ${className}`}
    >
      {children}

      {/* Reveal particles */}
      {isVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {revealParticles.map((particle, i) => {
            const IconComponent = particle.component;
            return (
              <div
                key={i}
                className="absolute text-yellow-400 opacity-60 animate-ping"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              >
                <IconComponent size={particle.size} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Enhanced Profile Image with Molecular Orbit
const EnhancedProfileImage: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group">
      <div className="relative mx-auto overflow-hidden rounded-lg w-80 h-80">
        {/* Main image */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
          <Image
            src={show}
            alt="Oshiomah P. Oyageshio"
            width={400}
            height={400}
            className="transition-shadow duration-500 rounded-lg shadow-2xl shadow-yellow-400/20 group-hover:shadow-yellow-400/40"
          />

          {/* Overlay with cellular pattern */}
          <div className="absolute inset-0 transition-opacity duration-500 rounded-lg opacity-0 group-hover:opacity-20 bg-gradient-to-br from-yellow-400/30 to-transparent">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={i}
                  cx={20 + (i % 4) * 20}
                  cy={20 + Math.floor(i / 4) * 20}
                  r="2"
                  fill="#facc15"
                  className="animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Orbital rings */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-yellow-400 rounded-lg opacity-20"
            style={{
              margin: `${i * 10}px`,
              transform: `rotate(${rotation + i * 45}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}

        {/* Floating scientific icons */}
        {/* {[
          { icon: Dna, position: "top-4 right-4", delay: "0s" },
          { icon: Brain, position: "bottom-4 left-4", delay: "1s" },
          { icon: Atom, position: "top-4 left-4", delay: "2s" },
          { icon: Heart, position: "bottom-4 right-4", delay: "1.5s" },
        ].map(({ icon: Icon, position, delay }, i) => (
          <div
            key={i}
            className={`absolute ${position} text-yellow-400 opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-float`}
            style={{ animationDelay: delay, animationDuration: "4s" }}
          >
            <Icon size={24} />
          </div>
        ))} */}
      </div>

      {/* Orbiting particles */}
      {/* {Array.from({ length: 6 }).map((_, i) => {
        const angle = (rotation + i * 60) * (Math.PI / 180);
        const radius = 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={i}
            className="absolute text-yellow-400 top-1/2 left-1/2 opacity-40"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
          >
            {[Microscope, FlaskConical, TestTube, , Target, BookOpen][i] &&
              React.createElement(
                [
                  Microscope,
                  FlaskConical,
                  TestTube,
                  Telescope,
                  Target,
                  BookOpen,
                ][i],
                { size: 20 }
              )}
          </div>
        );
      })} */}
    </div>
  );
};

// Research Interest Card with Hover Effects
const ResearchCard: React.FC<{
  title: string;
  items: string[];
  icon: LucideIcon;
}> = ({ title, items, icon: Icon }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="relative p-6 transition-all duration-300 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 hover:border-yellow-400/30 hover:scale-105 group">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 transition-opacity duration-500 opacity-0 group-hover:opacity-20"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 25}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <Sparkles size={16} className="animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <h3 className="flex items-center gap-3 mb-4 text-xl font-bold text-yellow-400 transition-colors group-hover:text-yellow-300">
          <div className="p-2 transition-colors rounded-full bg-yellow-400/20 group-hover:bg-yellow-400/30">
            <Icon size={24} className="group-hover:animate-pulse" />
          </div>
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-gray-300 transition-all duration-200 cursor-default hover:text-yellow-400"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 transition-all duration-200 ${
                  hoveredItem === index
                    ? "bg-yellow-400 scale-125"
                    : "bg-yellow-400/60"
                }`}
              />
              <span className="relative">
                {item}
                {hoveredItem === index && (
                  <div className="absolute top-0 -right-4">
                    <Zap size={12} className="text-yellow-400 animate-ping" />
                  </div>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const researchInterests = [
    "Computational biology and bioinformatics",
    "Population genetics and genomics",
    "Disease susceptibility and genetic risk factors",
    "Statistical methods for genetic data analysis",
    "Tuberculosis epidemiology and genetics",
    "Multiomic data integration",
  ];

  const currentFocus = [
    "Tuberculosis progression in South African populations",
    "Genetic and transcriptomic biomarker discovery",
    "Machine learning applications in disease prediction",
    "Diverse population genomics methodologies",
    "Global health computational solutions",
  ];

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden text-white bg-black">
      {/* Background Effects */}
      <FloatingBioParticles />
      <DNAStrand />

      {/* Mouse follower */}
      <div
        className="fixed z-50 w-3 h-3 transition-all duration-300 bg-yellow-400 rounded-full pointer-events-none opacity-30"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `scale(${1 + Math.sin(Date.now() * 0.005) * 0.3})`,
        }}
      />

      <div className="relative z-10 max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <BioAnimatedSection className="mb-16 text-center">
          <div className="relative">
            <h1 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
              About Me
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <div className="flex space-x-2">
                {[Dna].map((Icon, i) => (
                  <Icon
                    key={i}
                    size={20}
                    className="text-yellow-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Exploring the intersection of computational biology, genetics, and
              global health
            </p>
          </div>
        </BioAnimatedSection>

        <div className="grid items-start gap-16 mb-16 lg:grid-cols-2">
          {/* Profile Image */}
          <BioAnimatedSection delay={200}>
            <EnhancedProfileImage />
          </BioAnimatedSection>

          {/* Main Content */}
          <div className="space-y-8">
            <BioAnimatedSection delay={400}>
              <div className="relative p-6 border rounded-lg bg-gray-900/50 border-yellow-400/20 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                <h2 className="flex items-center gap-3 mb-6 text-3xl font-bold text-yellow-400">
                  <Users className="animate-pulse" size={32} />
                  My Journey
                  <Activity className="animate-bounce" size={24} />
                </h2>
                <div className="space-y-4 leading-relaxed text-gray-300">
                  <p>
                    I am a 6th year PhD candidate at UC Davis in the Population
                    Biology Department, under the supervision of Dr. Brenna
                    Henn. My research goals are two-fold:
                  </p>
                  <div className="ml-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Target
                        className="flex-shrink-0 mt-1 text-yellow-400"
                        size={16}
                      />
                      <span>
                        Identifying sociodemographic, genetic, and
                        transcriptomic correlates of active tuberculosis
                        progression
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target
                        className="flex-shrink-0 mt-1 text-yellow-400"
                        size={16}
                      />
                      <span>
                        Optimizing statistical methods to analyze genetic data
                        from diverse human populations
                      </span>
                    </div>
                  </div>
                  <p>
                    My work primarily focuses on the South African Coloured
                    (SAC) communities, known for their exceptionally diverse
                    human ancestry and residence in TB-endemic regions. Through
                    this work, I aim to deepen our understanding of how genetic
                    and social factors influence disease outcomes.
                  </p>
                </div>
              </div>
            </BioAnimatedSection>

            <BioAnimatedSection delay={600}>
              <div className="relative p-6 border rounded-lg bg-gray-900/50 border-yellow-400/20 backdrop-blur-sm">
                <h3 className="flex items-center gap-3 mb-4 text-2xl font-bold text-yellow-400">
                  <Globe
                    className="animate-spin"
                    size={28}
                    style={{ animationDuration: "3s" }}
                  />
                  Future Aspirations
                  <Zap className="animate-pulse" size={20} />
                </h3>
                <p className="leading-relaxed text-gray-300">
                  After graduation, I aspire to transition into industry, where
                  I can apply the computational and analytical skills honed
                  during my PhD to advance health therapeutics
                </p>
              </div>
            </BioAnimatedSection>
          </div>
        </div>

        {/* Research Interests Grid */}
        <div className="grid gap-8 mb-16 md:grid-cols-2">
          <BioAnimatedSection delay={800}>
            <ResearchCard
              title="Research Interests"
              items={researchInterests}
              icon={Search}
            />
          </BioAnimatedSection>

          <BioAnimatedSection delay={1000}>
            <ResearchCard
              title="Current Focus"
              items={currentFocus}
              icon={Eye}
            />
          </BioAnimatedSection>
        </div>

        {/* Current Work Section */}
        <BioAnimatedSection delay={1200}>
          <div className="relative p-8 border rounded-lg bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-yellow-400 opacity-10"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 3) * 30}%`,
                    animation: `float ${8 + i}s linear infinite`,
                    animationDelay: `${i * 1.2}s`,
                  }}
                >
                  {[
                    FlaskConical,
                    TestTube,
                    Beaker,
                    Microscope,
                    Telescope,
                    Award,
                  ][i] &&
                    React.createElement(
                      [
                        FlaskConical,
                        TestTube,
                        Beaker,
                        Microscope,
                        Telescope,
                        Award,
                      ][i],
                      { size: 24 }
                    )}
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="flex items-center gap-4 mb-6 text-3xl font-bold text-yellow-400">
                <div className="p-3 rounded-full bg-yellow-400/20">
                  <FlaskConical className="animate-pulse" size={32} />
                </div>
                Current Work & Impact
                <div className="flex space-x-2">
                  {[Sparkles, Star, Circle].map((Icon, i) => (
                    <Icon
                      key={i}
                      size={16}
                      className="text-yellow-400 animate-ping"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
              </h3>
              <p className="text-lg leading-relaxed text-gray-300">
                My research directly contributes to understanding tuberculosis
                susceptibility in genetically diverse populations. By developing
                computational methods and analyzing multiomic datasets, I aim to
                identify biomarkers that could lead to earlier detection and
                more personalized treatment approaches. This work has
                implications not only for TB management but also for advancing
                precision medicine approaches in underrepresented populations
                globally.
              </p>
            </div>
          </div>
        </BioAnimatedSection>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(-8px) rotate(240deg);
          }
        }

        .animate-float {
          animation: float var(--float-duration, 6s) ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
