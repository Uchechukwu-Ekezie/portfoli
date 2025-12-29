"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Microscope, Code, Database } from "lucide-react";
import { useRouter } from "next/navigation";

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
            className={`relative transition-all duration-1000 ${isVisible
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

export default function CAAPAVariantPage() {
    const router = useRouter();
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
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 text-yellow-400 transition-all duration-300 border border-yellow-400/30 rounded-full hover:text-black hover:bg-yellow-400 hover:border-yellow-400 group"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back</span>
                    </button>
                </BioAnimatedSection>

                {/* Header */}
                <BioAnimatedSection className="mb-16 text-center">
                    <div className="relative">
                        <h1 className="mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
                            CAAPA Pathogenic Variant Annotation
                        </h1>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                            <div className="flex space-x-2">
                                {[Code, Database, Microscope].map((Icon, i) => (
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
                            I am a member of the Consortium on Asthma among African-ancestry Populations in the Americas (CAAPA), a collaborative effort to study genetic variation and its role in health among populations of African descent across the Americas. One of my projects within CAAPA is CAAPAWEB, an interactive platform designed to make allele frequencies, local ancestry, and functional annotations accessible to researchers and students. With CAAPAWEB, you can explore population-specific allele frequencies, ancestry-stratified patterns in admixed groups, and measures of genetic differentiation (FST) through dynamic visualizations.
                        </p>
                    </div>
                </BioAnimatedSection>

                {/* Project Details */}
                

                {/* Key Findings */}
                <BioAnimatedSection delay={400} className="mb-16">
                    <h3 className="flex items-center gap-4 mb-6 text-3xl font-bold text-yellow-400">
                        <div className="p-3 rounded-full bg-yellow-400/20">
                            <Database className="animate-pulse" size={32} />
                        </div>
                        Key Findings & Visualizations
                    </h3>
                    <div className="space-y-8">
                        {/* Video 1 */}
                        <div>
                            <h4 className="text-xl font-semibold text-yellow-300 mb-4">1. SNP search interface</h4>
                            <p className="text-gray-400 mt-3 mb-3">
                                Search for any SNP across the genome and instantly pull up population-level frequencies and functional annotations.
                            </p>
                            <video
                                className="w-full max-w-3xl rounded-lg"
                                controls
                                preload="metadata"
                            >
                                <source src="/video1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>

                        {/* Video 2 */}
                        <div>
                            <h4 className="text-xl font-semibold text-yellow-300 mb-4">2. Allele frequency barplots for populations</h4>
                            <p className="text-gray-400 mt-3 mb-3">
                                Compare allele frequencies across over 60 human populations in one view.
                            </p>
                            <video
                                className="w-full max-w-3xl rounded-lg"
                                controls
                                preload="metadata"
                            >
                                <source src="/video2.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>

                        {/* Video 3 */}
                        <div>
                            <h4 className="text-xl font-semibold text-yellow-300 mb-4">3. FST matrix heatmap</h4>
                            <p className="text-gray-400 mt-3 mb-3">
                                Visualize population differentiation with interactive FST heatmaps.
                            </p>
                            <video
                                className="w-full max-w-3xl rounded-lg"
                                controls
                                preload="metadata"
                            >
                                <source src="/video3.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </BioAnimatedSection>

                {/* Research Impact
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
                                This research contributes significantly to the field of population genetics and precision medicine by
                                providing improved tools for variant annotation and classification. The consensus approach developed
                                here has been adopted by multiple research groups and is being integrated into clinical variant
                                interpretation pipelines.
                            </p>
                            <p>
                                Future work will focus on expanding the analysis to include additional populations and incorporating
                                functional genomics data to further improve variant effect predictions. The long-term goal is to
                                develop population-specific variant effect predictors that can be used in clinical settings for
                                personalized medicine applications.
                            </p>
                        </div>
                    </div>
                </BioAnimatedSection> */}
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
