"use client";

import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Search,
  Filter,
} from "lucide-react";

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
  title?: string;
  description?: string;
  technologies?: string[];
  status?: "completed" | "in-progress" | "planned";
  slug?: string;
  featured?: boolean;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      
      if (response.ok) {
        const data = await response.json();
        
        // Map _id to id for MongoDB compatibility
        const projectsArray: BackendProject[] = Array.isArray(data) ? data : [];
        
        const mappedProjects: Project[] = projectsArray.map((project: BackendProject) => {
          const mappedId = project._id || project.id || "";
          console.log(`Mapping project: ${project.title}, _id: ${project._id}, id: ${project.id}, mapped: ${mappedId}`);
          
          return {
            id: mappedId,
            // Ensure all required fields have defaults
            title: project.title || "Untitled Project",
            description: project.description || "",
            technologies: Array.isArray(project.technologies) ? project.technologies : [],
            status: project.status || "planned",
            slug: project.slug || project.title?.toLowerCase().replace(/\s+/g, "-") || "",
            featured: project.featured || false,
            images: Array.isArray(project.images) ? project.images : [],
            githubUrl: project.githubUrl || "",
            liveUrl: project.liveUrl || "",
            createdAt: project.createdAt || new Date().toISOString(),
            updatedAt: project.updatedAt || new Date().toISOString(),
          };
        });
        setProjects(mappedProjects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        alert("Project deleted successfully");
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "planned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="text-white">Loading projects...</div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Projects Management</h1>
              <p className="text-gray-400">Manage your portfolio projects</p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">No projects found</div>
                <Link
                  href="/admin/projects/new"
                  className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Link>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 mb-3">{project.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-400 text-black text-xs rounded-full">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {project.status.replace("-", " ").toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                          >
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center text-sm text-gray-400 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Updated: {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        title="View Project"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/20 rounded transition-colors"
                        title="Edit Project"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/20 rounded transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}