"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { projectsAPI } from "@/lib/api";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";
import { ArrowLeft, Save, X, Upload, Loader2 } from "lucide-react";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    briefDescription: "",
    description: "",
    technologies: [] as string[],
    status: "planned" as "completed" | "in-progress" | "planned",
    slug: "",
    featured: false,
    githubUrl: "",
    liveUrl: "",
    images: [] as File[],
    videos: [] as File[],
    documents: [] as File[],
    // Additional rich content fields
    overview: "", // Project Overview section content
    methods: "", // Technologies & Methods section content
    impact: "", // Research Impact section content
    imageGalleryTitle: "", // Main gallery section title
    imageGallerySubtitle: "", // Gallery subtitle/description
  });
  const [currentTech, setCurrentTech] = useState("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'images' | 'videos' | 'documents') => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        [type]: [...formData[type], ...filesArray],
      });
    }
  };

  const removeFile = (type: 'images' | 'videos' | 'documents', index: number) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress("");

    try {
      let imageUrls: string[] = [];

      // Upload images to Cloudinary first
      if (formData.images.length > 0) {
        setUploadProgress(`Uploading ${formData.images.length} image(s) to Cloudinary...`);
        try {
          imageUrls = await uploadMultipleToCloudinary(formData.images);
          setUploadProgress(`✓ Images uploaded successfully`);
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          alert('Failed to upload images to Cloudinary. Please check your Cloudinary configuration in .env.local');
          setLoading(false);
          setUploadProgress("");
          return;
        }
      }

      // Now send data to backend with Cloudinary URLs
      setUploadProgress("Creating project...");
      const result = await projectsAPI.create({
        title: formData.title,
        shortDescription: formData.shortDescription,
        briefDescription: formData.briefDescription,
        description: formData.description,
        technologies: formData.technologies,
        status: formData.status,
        slug: formData.slug,
        featured: formData.featured,
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        images: imageUrls,
        // Additional rich content fields
        overview: formData.overview,
        methods: formData.methods,
        impact: formData.impact,
        imageGalleryTitle: formData.imageGalleryTitle,
        imageGallerySubtitle: formData.imageGallerySubtitle,
      });

      if (result.success) {
        setUploadProgress("✓ Project created successfully!");
        alert("Project created successfully!");
        router.push("/admin/projects");
      } else {
        alert(`Failed to create project: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project");
    } finally {
      setLoading(false);
      setUploadProgress("");
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
              Back
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Slug */}
                <div className="md:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                    URL Slug * (This creates your project page URL)
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
                    Your project will be available at: www.oshi-omics.com/{formData.slug || 'your-slug'}
                  </p>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description * (One-line summary for project card)
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

                {/* Brief Description */}
                <div className="md:col-span-2">
                  <label htmlFor="briefDescription" className="block text-sm font-medium text-gray-300 mb-2">
                    Brief Description *
                  </label>
                  <textarea
                    id="briefDescription"
                    name="briefDescription"
                    required
                    rows={3}
                    value={formData.briefDescription}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="A brief overview of the project (2-3 sentences)"
                  />
                </div>

                {/* Detailed Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Detailed Project Overview (Full description shown on project page)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={8}
                    value={formData.description}
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
                    Featured Project (Show prominently on homepage)
                  </label>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Skills & Technologies Used</h2>
              <p className="text-sm text-gray-400 mb-4">
                Add the tools, programming languages, and techniques used in this project
              </p>
              
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
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
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
            </div>

            {/* Links */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Project Links</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Repository URL (Optional)
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
                    Live Demo / Project URL (Optional - Link to live version)
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
                  <p className="text-xs text-gray-400 mt-1">
                    Link to where people can view/use your project online
                  </p>
                </div>
              </div>
            </div>

            {/* Rich Content Sections - NEW */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Additional Content Sections</h2>
              <p className="text-sm text-gray-400 mb-4">
                These sections will appear on your project&apos;s dedicated page
              </p>
              
              <div className="space-y-6">
                {/* Project Overview */}
                <div>
                  <label htmlFor="overview" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Overview (Optional)
                  </label>
                  <textarea
                    id="overview"
                    name="overview"
                    rows={4}
                    value={formData.overview}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Detailed overview of your project, including objectives, approach, and significance..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Appears in the &quot;Project Overview&quot; section of your project page
                  </p>
                </div>

                {/* Technologies & Methods */}
                <div>
                  <label htmlFor="methods" className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies & Methods (Optional)
                  </label>
                  <textarea
                    id="methods"
                    name="methods"
                    rows={4}
                    value={formData.methods}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Describe the technical approach, tools, and methodologies used in this project..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Appears in the &quot;Technologies & Methods&quot; section
                  </p>
                </div>

                {/* Research Impact */}
                <div>
                  <label htmlFor="impact" className="block text-sm font-medium text-gray-300 mb-2">
                    Research Impact & Future Directions (Optional)
                  </label>
                  <textarea
                    id="impact"
                    name="impact"
                    rows={4}
                    value={formData.impact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Discuss the potential impact of your research and future directions..."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Appears in the &quot;Research Impact & Future Directions&quot; section
                  </p>
                </div>

                {/* Image Gallery Customization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="imageGalleryTitle" className="block text-sm font-medium text-gray-300 mb-2">
                      Image Gallery Title (Optional)
                    </label>
                    <input
                      type="text"
                      id="imageGalleryTitle"
                      name="imageGalleryTitle"
                      value={formData.imageGalleryTitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., Research Visualizations"
                    />
                  </div>
                  <div>
                    <label htmlFor="imageGallerySubtitle" className="block text-sm font-medium text-gray-300 mb-2">
                      Image Gallery Subtitle (Optional)
                    </label>
                    <input
                      type="text"
                      id="imageGallerySubtitle"
                      name="imageGallerySubtitle"
                      value={formData.imageGallerySubtitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., RNA marker gene expression analysis"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Files & Media */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Project Files & Media</h2>
              <p className="text-sm text-gray-400 mb-4">
                Upload images, videos, and documents for your project
              </p>
              
              <div className="space-y-6">
                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Research Visualizations / Images (PNG, JPG, WEBP)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      className="hidden"
                      id="images"
                      onChange={(e) => handleFileChange(e, 'images')}
                    />
                    <label htmlFor="images" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        Click to upload images or drag and drop
                      </div>
                      <div className="text-xs text-gray-500">
                        Charts, graphs, UMAP plots, heatmaps, etc.
                      </div>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile('images', index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-gray-400 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Videos */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Demonstration Videos (MP4, MOV, WEBM)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      accept="video/mp4,video/quicktime,video/webm"
                      multiple
                      className="hidden"
                      id="videos"
                      onChange={(e) => handleFileChange(e, 'videos')}
                    />
                    <label htmlFor="videos" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        Click to upload videos or drag and drop
                      </div>
                      <div className="text-xs text-gray-500">
                        Project demos, walkthroughs, presentations
                      </div>
                    </label>
                  </div>
                  {formData.videos.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.videos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                          <span className="text-gray-300 text-sm truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('videos', index)}
                            className="ml-2 text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Documents & Papers (PDF, DOC, DOCX)
                  </label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      className="hidden"
                      id="documents"
                      onChange={(e) => handleFileChange(e, 'documents')}
                    />
                    <label htmlFor="documents" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        Click to upload documents or drag and drop
                      </div>
                      <div className="text-xs text-gray-500">
                        Research papers, posters, supplementary materials
                      </div>
                    </label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                          <span className="text-gray-300 text-sm truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile('documents', index)}
                            className="ml-2 text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded p-3">
                  <strong>Note:</strong> Images will be uploaded to Cloudinary. Videos and documents are currently for display only.
                </p>
              </div>
            </div>

            {/* Upload Progress */}
            {uploadProgress && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                  <p className="text-blue-400">{uploadProgress}</p>
                </div>
              </div>
            )}

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
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}