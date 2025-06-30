"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dna,
  Atom,
  Brain,
  Heart,
  Microscope,
  FlaskConical,
  Leaf,
  Bug,
  Fish,
  TreePine,
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
  Globe,
  Users,
  Award,
  LucideIcon,
  Database,
  BarChart3,
  TrendingUp,
} from "lucide-react";

// Types
interface BioParticle {
  id: number;
  x: number;
  y: number;
  icon: LucideIcon;
  size: number;
  duration: number;
  delay: number;
}

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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  status: string;
}

// Floating Background Particles
const FloatingBioParticles: React.FC = () => {
  const [particles, setParticles] = useState<BioParticle[]>([]);

  useEffect(() => {
    const biologicalIcons: LucideIcon[] = [
      Dna,
      Atom,
      Brain,
      Heart,
      Microscope,
      FlaskConical,
      Leaf,
      Bug,
      Fish,
      TreePine,
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
    ];

    const newParticles: BioParticle[] = Array.from({ length: 15 }).map(
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: biologicalIcons[
          Math.floor(Math.random() * biologicalIcons.length)
        ],
        size: Math.random() * 8 + 16,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
      })
    );
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-10">
      {particles.map((particle) => {
        const IconComponent = particle.icon;
        return (
          <div
            key={particle.id}
            className="absolute text-yellow-400 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            <IconComponent size={particle.size} />
          </div>
        );
      })}
    </div>
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

// Enhanced Project Card Component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
}) => {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-900 text-green-300 border-green-400/30";
      case "Published":
        return "bg-blue-900 text-blue-300 border-blue-400/30";
      case "In Development":
        return "bg-orange-900 text-orange-300 border-orange-400/30";
      default:
        return "bg-gray-700 text-gray-300 border-gray-400/30";
    }
  };

  return (
    <div className="relative transition-all duration-500 border border-gray-700 rounded-lg group bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/70 hover:border-yellow-400/30 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/10">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 transition-opacity duration-500 opacity-0 group-hover:opacity-20"
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 0.2}s`,
              transform: `rotate(${rotation + i * 90}deg)`,
            }}
          >
            {[Dna, Atom, FlaskConical, Microscope][i] &&
              React.createElement([Dna, Atom, FlaskConical, Microscope][i], {
                size: 16,
                className: "animate-pulse",
              })}
          </div>
        ))}
      </div>

      {/* Orbital ring effect */}
      <div
        className="absolute inset-0 transition-opacity duration-500 border border-yellow-400 rounded-lg opacity-0 group-hover:opacity-10"
        style={{
          margin: "10px",
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-yellow-400 transition-colors group-hover:text-yellow-300">
            {project.title}
          </h3>
          <span
            className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-300 transition-colors group-hover:text-gray-200">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="relative px-2 py-1 text-xs text-gray-300 transition-all duration-200 bg-gray-800 rounded cursor-default hover:bg-yellow-400/20 hover:text-yellow-300"
              onMouseEnter={() => setHoveredTech(techIndex)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {tech}
              {hoveredTech === techIndex && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles
                    size={10}
                    className="text-yellow-400 animate-ping"
                  />
                </div>
              )}
            </span>
          ))}
        </div>

        {/* <div className="flex gap-4">
          {project.status !== "Proprietary" && (
            <a 
              href={project.github} 
              className="relative flex items-center gap-2 px-4 py-2 text-sm text-yellow-400 transition-all duration-300 border rounded-full border-yellow-400/30 hover:text-black hover:bg-yellow-400 hover:border-yellow-400 group/btn"
            >
              <Github size={16} className="transition-transform group-hover/btn:rotate-12" />
              <span>Code</span>
              <div className="absolute inset-0 transition-opacity duration-300 border border-yellow-400 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping" />
            </a>
          )}
          <a 
            href={project.demo} 
            className="relative flex items-center gap-2 px-4 py-2 text-sm text-yellow-400 transition-all duration-300 border rounded-full border-yellow-400/30 hover:text-black hover:bg-yellow-400 hover:border-yellow-400 group/btn"
          >
            <ExternalLink size={16} className="transition-transform group-hover/btn:rotate-12" />
            <span>Demo</span>
            <div className="absolute inset-0 transition-opacity duration-300 border border-yellow-400 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping" />
          </a>
        </div> */}
      </div>

      {/* Corner decorations */}
      {[
        { icon: Target, position: "top-2 right-2" },
        { icon: Zap, position: "bottom-2 left-2" },
      ].map(({ icon: Icon, position }, i) => (
        <div
          key={i}
          className={`absolute ${position} text-yellow-400 opacity-0 group-hover:opacity-60 transition-all duration-500 animate-float`}
          style={{ animationDelay: `${i * 0.5}s`, animationDuration: "3s" }}
        >
          <Icon size={16} />
        </div>
      ))}
    </div>
  );
};

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects: Project[] = [
    {
      title: "TB Epidemiological Risk Assessment",
      description:
        "Built case-control assignment algorithm utilizing clinical, behavioral, and self-report data from over 50 variables. Implemented Random Forest and Logistic Regression models to predict active tuberculosis progression in 1000+ patients from rural South African clinics.",
      technologies: [
        "Python",
        "Random Forest",
        "Logistic Regression",
        "Clinical Data",
        "Epidemiology",
      ],
      github: "#",
      demo: "https://oyageshio.wixsite.com/oshi-omics/projects",
      status: "Active",
    },
    {
      title: "TB scRNA-seq Immunogenetic Analysis",
      description:
        "Leading the first-ever single-cell RNA sequencing analysis of a TB case-control cohort using 10X Genomics. Profiling gene expression and cell surface protein markers in PBMCs to identify novel genetic variants and immune mechanisms driving TB progression.",
      technologies: [
        "scRNA-seq",
        "10X Genomics",
        "Python",
        "R",
        "Immunogenetics",
        "Single Cell",
      ],
      github: "#",
      demo: "https://oyageshio.wixsite.com/oshi-omics/projects",
      status: "Active",
    },
    {
      title: "TB Immune Cell Classification",
      description:
        "Comprehensive immune cell classification and characterization pipeline to uncover disease-specific immune signatures and cell-type-specific responses in tuberculosis patients using advanced computational methods.",
      technologies: [
        "Python",
        "R",
        "Cell Classification",
        "Immunology",
        "Machine Learning",
      ],
      github: "#",
      demo: "https://oyageshio.wixsite.com/oshi-omics/projects",
      status: "Active",
    },
    {
      title: "TB Differential Gene Expression",
      description:
        "Conducting differential gene expression analysis to pinpoint key genes and pathways associated with TB susceptibility and progression, utilizing state-of-the-art bioinformatics approaches.",
      technologies: [
        "R",
        "Python",
        "DESeq2",
        "Pathway Analysis",
        "Genomics",
        "Statistics",
      ],
      github: "#",
      demo: "https://oyageshio.wixsite.com/oshi-omics/projects",
      status: "Active",
    },
    {
      title: "TB eQTL Discovery Pipeline",
      description:
        "Discovering disease- and ancestry-associated quantitative trait expression loci (eQTLs) to uncover genetic variants influencing immune gene regulation in admixed populations affected by tuberculosis.",
      technologies: [
        "Python",
        "R",
        "eQTL Analysis",
        "Population Genetics",
        "GWAS",
        "Genomics",
      ],
      github: "#",
      demo: "https://oyageshio.wixsite.com/oshi-omics/projects",
      status: "Active",
    },
    {
      title: "CAAPA Pathogenic Variant Annotation",
      description:
        "Applying variant effect prediction algorithms to a global genetic dataset of 3000+ individuals from 60 populations. Created consensus ML metric for classifying deleterious genetic variants and identified correlations with evolutionary conservation tools.",
      technologies: [
        "Python",
        "Machine Learning",
        "Variant Analysis",
        "Population Genetics",
        "Bioinformatics",
      ],
      github: "#",
      demo: "#",
      status: "Published",
    },
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

      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <BioAnimatedSection className="mb-16 text-center">
          <div className="relative">
            <h1 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
              Research Projects
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <div className="flex space-x-2">
                {[FlaskConical, Database].map((Icon, i) => (
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
            <p className="max-w-3xl mx-auto text-lg text-gray-400">
              Computational biology and bioinformatics research focused on
              tuberculosis susceptibility, immunogenetics, and population
              genomics at UC Davis
            </p>

            {/* Floating decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { icon: Dna, position: "top-4 left-4", delay: "0s" },
                { icon: Brain, position: "top-4 right-4", delay: "1s" },
                { icon: Heart, position: "bottom-4 left-4", delay: "2s" },
                { icon: Atom, position: "bottom-4 right-4", delay: "1.5s" },
              ].map(({ icon: Icon, position, delay }, i) => (
                <div
                  key={i}
                  className={`absolute ${position} text-yellow-400 opacity-20 animate-float`}
                  style={{ animationDelay: delay, animationDuration: "6s" }}
                >
                  <Icon size={24} />
                </div>
              ))}
            </div>
          </div>
        </BioAnimatedSection>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <BioAnimatedSection key={index} delay={200 + index * 100}>
              <ProjectCard project={project} index={index} />
            </BioAnimatedSection>
          ))}
        </div>

        {/* Research Impact Section */}
        <BioAnimatedSection delay={1000} className="mt-16">
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
                  {[BarChart3, TrendingUp, Globe, Users, Award, Target][i] &&
                    React.createElement(
                      [BarChart3, TrendingUp, Globe, Users, Award, Target][i],
                      { size: 24 }
                    )}
                </div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="flex items-center gap-4 mb-6 text-3xl font-bold text-yellow-400">
                <div className="p-3 rounded-full bg-yellow-400/20">
                  <Award className="animate-pulse" size={32} />
                </div>
                Research Impact & Goals
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
