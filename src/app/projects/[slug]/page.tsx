"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  slug: string;
  featured: boolean;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BackendProject {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  slug: string;
  featured: boolean;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch all projects and find the one with matching slug
        const response = await fetch("/api/projects");
        
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const projects: BackendProject[] = await response.json();
        const foundProject = projects.find((p: BackendProject) => p.slug === slug);
        
        if (!foundProject) {
          setError("Project not found");
          setLoading(false);
          return;
        }
        
        // Map _id to id for consistency
        setProject({
          id: foundProject._id || foundProject.id || "",
          title: foundProject.title,
          description: foundProject.description,
          technologies: foundProject.technologies || [],
          status: foundProject.status,
          slug: foundProject.slug,
          featured: foundProject.featured,
          images: foundProject.images || [],
          githubUrl: foundProject.githubUrl || "",
          liveUrl: foundProject.liveUrl || "",
          createdAt: foundProject.createdAt,
          updatedAt: foundProject.updatedAt,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl">Loading project...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-gray-400 mb-8">{error || "The project you're looking for doesn't exist."}</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-yellow-400 border border-yellow-400/30 rounded-full hover:text-black hover:bg-yellow-400 hover:border-yellow-400 transition-all group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {project.description}
          </p>
          
          {/* Status Badge */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              project.status === "completed" 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : project.status === "in-progress"
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            }`}>
              {project.status === "completed" ? "Completed" : project.status === "in-progress" ? "In Progress" : "Planned"}
            </span>
            {project.featured && (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Technologies Used</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:bg-yellow-400/20 hover:text-yellow-300 hover:border-yellow-400/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900/50 backdrop-blur-sm hover:border-yellow-400/30 transition-all group"
                >
                  {image.endsWith('.mp4') ? (
                    <video
                      src={image}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Metadata */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
          <p>Last Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
