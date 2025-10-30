"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X, Upload, FileText, Image as ImageIcon, Video } from "lucide-react";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    longDescription: "",
    technologies: [] as string[],
    status: "planned" as "completed" | "in-progress" | "planned",
    slug: "",
    featured: false,
    githubUrl: "",
    liveUrl: "",
    images: [] as string[],
    videos: [] as string[],
    documents: [] as string[],
  });
  const [currentTech, setCurrentTech] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

    // Auto-generate slug from title
    if (name === "title") {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      }));
    }
  };

  const addTechnology = () => {
    if (currentTech.trim() && !formData.technologies.includes(currentTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, currentTech.trim()],
      });
      setCurrentTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos' | 'documents') => {
    const files = Array.from(e.target.files || []);
    
    if (type === 'images') {
      setSelectedImages(prev => [...prev, ...files]);
    } else if (type === 'videos') {
      setSelectedVideos(prev => [...prev, ...files]);
    } else if (type === 'documents') {
      setSelectedDocuments(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number, type: 'images' | 'videos' | 'documents') => {
    if (type === 'images') {
      setSelectedImages(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'videos') {
      setSelectedVideos(prev => prev.filter((_, i) => i !== index));
    } else if (type === 'documents') {
      setSelectedDocuments(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Note: File uploads will need to be handled by the backend
      // For now, we're sending the project data without files
      // The backend developer will need to implement file upload endpoints
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images: formData.images || [],
          videos: formData.videos || [],
          documents: formData.documents || [],
        }),
      });

      if (response.ok) {
        alert("Project created successfully! Note: File uploads will be implemented by backend.");
        router.push("/admin/projects");
      } else {
        const error = await response.json();
        alert(`Failed to create project: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Create New Project</h1>
              <p className="text-gray-400">Add a new project to your portfolio</p>
            </div>
            <Link
              href="/admin/projects"
              className="inline-flex items-center px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="e.g., TB scRNA-seq Immunogenetic Analysis"
                  />
                </div>

                {/* URL Slug */}
                <div className="md:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                    URL Slug * <span className="text-gray-500 text-xs">(This creates your project page URL)</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="tb-scrna-seq-analysis"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Your project will be available at: <span className="text-yellow-400">www.oshi-omics.com/{formData.slug || 'your-slug'}</span>
                  </p>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description * <span className="text-gray-500 text-xs">(One-line summary for project card)</span>
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    required
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="e.g., Leading single-cell RNA sequencing analysis of TB case-control cohort"
                  />
                </div>

                {/* Description (keeping for backward compatibility) */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Brief Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="A brief overview of the project (2-3 sentences)"
                  />
                </div>

                {/* Long Description */}
                <div className="md:col-span-2">
                  <label htmlFor="longDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Detailed Project Overview <span className="text-gray-500 text-xs">(Full description shown on project page)</span>
                  </label>
                  <textarea
                    id="longDescription"
                    name="longDescription"
                    rows={6}
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Provide a comprehensive description including research objectives, methodology, and key findings..."
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-300">
                    Featured Project <span className="text-gray-500 text-xs">(Show prominently on homepage)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Skills & Technologies Used</h2>
              <p className="text-sm text-gray-400 mb-4">Add the tools, programming languages, and techniques used in this project</p>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="e.g., Python, scRNA-seq, Random Forest, Variant Analysis, UMAP, etc."
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {formData.technologies.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Added skills & technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm border border-gray-600"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Project Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Repository URL <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    Live Demo / Project URL <span className="text-gray-500 text-xs">(Optional - Link to live version)</span>
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://your-project.com or https://caapaweb.org"
                  />
                  <p className="text-xs text-gray-400 mt-1">Link to where people can view/use your project online</p>
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Project Files & Media</h2>
              <p className="text-sm text-gray-400 mb-6">Upload images, videos, and documents for your project</p>
              
              <div className="space-y-6">
                {/* Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-2" />
                    Research Visualizations / Images <span className="text-gray-500 text-xs">(PNG, JPG, WEBP)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileSelect(e, 'images')}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">Click to upload images or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Charts, graphs, UMAP plots, heatmaps, etc.</p>
                    </label>
                  </div>
                  {selectedImages.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-400">{selectedImages.length} image(s) selected:</p>
                      {selectedImages.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded text-sm">
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'images')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Videos Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Video className="w-4 h-4 inline mr-2" />
                    Demonstration Videos <span className="text-gray-500 text-xs">(MP4, MOV, WEBM)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors">
                    <input
                      type="file"
                      id="videos"
                      accept="video/*"
                      multiple
                      onChange={(e) => handleFileSelect(e, 'videos')}
                      className="hidden"
                    />
                    <label htmlFor="videos" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">Click to upload videos or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Project demos, walkthroughs, presentations</p>
                    </label>
                  </div>
                  {selectedVideos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-400">{selectedVideos.length} video(s) selected:</p>
                      {selectedVideos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded text-sm">
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'videos')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Documents Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Documents & Papers <span className="text-gray-500 text-xs">(PDF, DOC, DOCX)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-400/50 transition-colors">
                    <input
                      type="file"
                      id="documents"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={(e) => handleFileSelect(e, 'documents')}
                      className="hidden"
                    />
                    <label htmlFor="documents" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-300">Click to upload documents or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">Research papers, posters, supplementary materials</p>
                    </label>
                  </div>
                  {selectedDocuments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-400">{selectedDocuments.length} document(s) selected:</p>
                      {selectedDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded text-sm">
                          <span className="text-gray-300 truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, 'documents')}
                            className="text-red-400 hover:text-red-300 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> Files will be stored on the backend server. Make sure your backend developer has configured file upload handling.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/projects"
                className="px-6 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}