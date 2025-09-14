"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Award, Dna, Microscope, FlaskConical } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BioAnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Enhanced Animated Section Component
const BioAnimatedSection: React.FC<BioAnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
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

// Image Gallery Component
const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "/two.jpg",
      title: "RNA marker gene expression across annotated immune populations",
      description: "Heatmap displaying significantly differentially expressed genes between TB cases and controls"
    },
    {
      src: "/three.jpg",
      title: "Immune Cell Trajectory",
      description: "Pseudotime analysis revealing developmental trajectories of immune cells in TB progression"
    },
    {
      src: "/four.jpg",
      title: "Pathway Enrichment Analysis",
      description: "Gene set enrichment analysis highlighting key biological pathways associated with TB susceptibility"
    },
    {
      src: "/five.jpg",
      title: "Cell-Cell Communication",
      description: "Network analysis showing intercellular communication patterns in the TB immune microenvironment"
    },
    {
      src: "/six.jpg",
      title: "Genetic Variant Association",
      description: "Manhattan plot displaying genetic variants significantly associated with TB progression"
    },
    {
      src: "/seven.jpg",
      title: "Multi-omic Integration",
      description: "Integrated analysis combining scRNA-seq data with genomic and clinical information"
    }
  ];

  const images2 = [
    {
      src: "/eight.jpg",
      title: "Additional Analysis 1",
      description: "Supplementary analysis results"
    },
    {
      src: "/nine.jpg",
      title: "Additional Analysis 2", 
      description: "Supplementary analysis results"
    },
    {
      src: "/ten.jpg",
      title: "Additional Analysis 3",
      description: "Supplementary analysis results"
    }
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">Research Visualizations</h3>
      
      {/* UMAP Visualization Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-yellow-300 mb-4">UMAP of PBMCs from TB case–control CITE-seq</h4>
        <div 
          className="relative group cursor-pointer transition-all duration-300 hover:scale-105 max-w-2xl"
          onClick={() => setSelectedImage(-1)}
        >
          <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
            <Image
              src="/one.jpg"
              alt="UMAP of PBMCs from TB case–control CITE-seq"
              width={800}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h5 className="text-sm font-semibold text-yellow-400 mb-1">UMAP of PBMCs from TB case–control CITE-seq</h5>
                <p className="text-xs text-gray-300">Single-cell RNA sequencing analysis showing distinct cell populations in tuberculosis patients and controls</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
       {/* RNA marker gene expression across annotated immune populations */}
       <div className="mb-8">
         <h4 className="text-xl font-semibold text-yellow-300 mb-4">RNA marker gene expression across annotated immune populations</h4>
         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           <div 
             className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
             onClick={() => setSelectedImage(0)}
           >
             <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
               <Image
                 src="/two.jpg"
                 alt="RNA marker gene expression across annotated immune populations"
                 width={400}
                 height={300}
                 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
               />
             </div>
           </div>
           <div 
             className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
             onClick={() => setSelectedImage(1)}
           >
             <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
               <Image
                 src="/three.jpg"
                 alt="Immune cell trajectory analysis"
                 width={400}
                 height={300}
                 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
               />
             </div>
           </div>
           <div 
             className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
             onClick={() => setSelectedImage(2)}
           >
             <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
               <Image
                 src="/four.jpg"
                 alt="Pathway enrichment analysis"
                 width={400}
                 height={300}
                 className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
               />
             </div>
           </div>
         </div> */}
        </div>
      {/* Grid of Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
              <Image
                src={image.src}
                alt={image.title}
                width={400}
                height={192}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-sm font-semibold text-yellow-400 mb-1">{image.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Protein expression of validation on  PBMC subsets */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-yellow-300 mb-4">Protein expression of validation on  PBMC subsets</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images2.map((image, index) => (
            <div key={index} className="relative group cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => setSelectedImage(index)}>
              <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm group-hover:border-yellow-400/30">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Full Image View */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <Image
              src={selectedImage === -1 ? "/one.jpg" : images[selectedImage].src}
              alt={selectedImage === -1 ? "UMAP of PBMCs from TB case–control CITE-seq" : images[selectedImage].title}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 text-white bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg">
              <h4 className="text-xl font-bold text-yellow-400 mb-2">
                {selectedImage === -1 ? "UMAP of PBMCs from TB case–control CITE-seq" : images[selectedImage].title}
              </h4>
              <p className="text-gray-300">
                {selectedImage === -1 ? "Single-cell RNA sequencing analysis showing distinct cell populations in tuberculosis patients and controls" : images[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function TBScRNAPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen pt-24 overflow-hidden text-white bg-black">
      {/* Background Effects */}
      <DNAStrand />

      {/* Mouse follower */}
      {isClient && (
        <div
          className="fixed z-50 w-3 h-3 transition-all duration-300 bg-yellow-400 rounded-full pointer-events-none opacity-30"
          style={{
            left: mousePosition.x - 6,
            top: mousePosition.y - 6,
            transform: `scale(${1 + Math.sin(Date.now() * 0.005) * 0.3})`,
          }}
        />
      )}

      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Back Button */}
        <BioAnimatedSection className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-yellow-400 transition-all duration-300 border border-yellow-400/30 rounded-full hover:text-black hover:bg-yellow-400 hover:border-yellow-400 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </BioAnimatedSection>

        {/* Header */}
        <BioAnimatedSection className="mb-16 text-center">
          <div className="relative">
            <h1 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
              TB scRNA-seq Immunogenetic Analysis
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <div className="flex space-x-2">
                {[Dna, Microscope, FlaskConical].map((Icon, i) => (
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
              Leading the first-ever single-cell RNA sequencing analysis of a TB case-control cohort using 10X Genomics. 
              Profiling gene expression and cell surface protein markers in PBMCs to identify novel genetic variants 
              and immune mechanisms driving TB progression.
            </p>
          </div>
        </BioAnimatedSection>

        {/* Project Details */}
        <BioAnimatedSection delay={200} className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Project Overview */}
            <div className="p-8 border rounded-lg bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
              <h3 className="flex items-center gap-4 mb-6 text-2xl font-bold text-yellow-400">
                <div className="p-3 rounded-full bg-yellow-400/20">
                  <Award className="animate-pulse" size={24} />
                </div>
                Project Overview
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  This groundbreaking research represents the first comprehensive single-cell RNA sequencing 
                  analysis of tuberculosis patients and controls. Using cutting-edge 10X Genomics technology, 
                  we&apos;re profiling gene expression patterns in peripheral blood mononuclear cells (PBMCs) to 
                  uncover the molecular mechanisms underlying TB susceptibility.
                </p>
                <p>
                  Our multi-omic approach combines scRNA-seq data with genetic variant information, clinical 
                  phenotypes, and immune cell surface protein markers to build a comprehensive picture of 
                  TB immunogenetics in genetically diverse populations.
                </p>
              </div>
            </div>

            {/* Technologies & Methods */}
            <div className="p-8 border rounded-lg bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
              <h3 className="flex items-center gap-4 mb-6 text-2xl font-bold text-yellow-400">
                <div className="p-3 rounded-full bg-yellow-400/20">
                  <Microscope className="animate-pulse" size={24} />
                </div>
                Technologies & Methods
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {["scRNA-seq", "10X Genomics", "Python", "R", "Immunogenetics", "Single Cell"].map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm text-gray-300 bg-gray-800 rounded-full border border-gray-700 hover:bg-yellow-400/20 hover:text-yellow-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-yellow-300 mb-2">Analysis Pipeline</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Cell quality control and filtering</li>
                    <li>• Dimensionality reduction (UMAP/t-SNE)</li>
                    <li>• Cell type identification and annotation</li>
                    <li>• Differential gene expression analysis</li>
                    <li>• Pathway enrichment and functional analysis</li>
                    <li>• Integration with genomic data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </BioAnimatedSection>

        {/* Image Gallery */}
        <BioAnimatedSection delay={400}>
          <ImageGallery />
        </BioAnimatedSection>

        {/* Research Impact */}
        <BioAnimatedSection delay={600} className="mt-16">
          <div className="p-8 border rounded-lg bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 border-yellow-400/30 backdrop-blur-sm">
            <h3 className="flex items-center gap-4 mb-6 text-3xl font-bold text-yellow-400">
              <div className="p-3 rounded-full bg-yellow-400/20">
                <Award className="animate-pulse" size={32} />
              </div>
              Research Impact & Future Directions
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-gray-300">
              <p>
                This research has the potential to revolutionize our understanding of tuberculosis immunogenetics. 
                By identifying cell-type-specific gene expression patterns and genetic variants associated with 
                TB susceptibility, we aim to develop more effective diagnostic tools and personalized treatment 
                strategies.
              </p>
              <p>
                The findings from this study will contribute to the broader field of precision medicine, 
                particularly for infectious diseases affecting underrepresented populations. Our multi-omic 
                approach provides a template for future research in complex disease genetics and immune system 
                function.
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
