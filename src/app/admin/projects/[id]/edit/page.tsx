"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { projectsAPI } from "@/lib/api";
import { uploadMultipleToCloudinary } from "@/lib/cloudinary";
import { ArrowLeft, Save, Plus, X, Loader2, Upload, Trash2 } from "lucide-react";

interface Project {
  id: string;
  _id?: string;
  customId?: string;
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
  // New rich content fields
  overview?: string;
  methods?: string;
  impact?: string;
  imageGalleryTitle?: string;
  imageGallerySubtitle?: string;
}

export default function EditProject({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [projectId, setProjectId] = useState<string>("");
  const [customProjectId, setCustomProjectId] = useState<string>(""); // Store custom id for backend
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt' | '_id' | 'customId'>>({
    title: "",
    description: "",
    technologies: [],
    status: "planned",
    slug: "",
    featured: false,
    images: [],
    githubUrl: "",
    liveUrl: "",
    // New rich content fields
    overview: "",
    methods: "",
    impact: "",
    imageGalleryTitle: "",
    imageGallerySubtitle: "",
  });
  const [currentTech, setCurrentTech] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]); // New images to upload
  const [uploadProgress, setUploadProgress] = useState<string>("");

  useEffect(() => {
    const initializeComponent = async () => {
      const resolvedParams = await params;
      setProjectId(resolvedParams.id);
      
      const fetchProjectData = async () => {
        try {
          console.log(`🔍 Fetching project with ID: ${resolvedParams.id}`);
          const result = await projectsAPI.getById(resolvedParams.id);
          console.log(`📡 Result:`, result);
          
          if (result.success) {
            const project = result.data;
            console.log(`✅ Project loaded:`, project);
            
            // Store the custom id field for backend operations
            if (project.id) {
              setCustomProjectId(project.id);
              console.log(`📝 Custom ID for backend: ${project.id}`);
            }
            
            setFormData({
              title: project.title || "",
              description: project.description || "",
              technologies: Array.isArray(project.technologies) ? project.technologies : [],
              status: project.status || "planned",
              slug: project.slug || "",
              featured: project.featured || false,
              images: Array.isArray(project.images) ? project.images : [],
              githubUrl: project.githubUrl || "",
              liveUrl: project.liveUrl || "",
              // Map new rich content fields
              overview: project.overview || "",
              methods: project.methods || "",
              impact: project.impact || "",
              imageGalleryTitle: project.imageGalleryTitle || "",
              imageGallerySubtitle: project.imageGallerySubtitle || "",
            });
          } else {
            console.error(`❌ Failed to fetch project:`, result.error);
            alert("Project not found");
            router.push("/admin/projects");
          }
        } catch (error) {
          console.error("Failed to fetch project:", error);
          alert("Failed to load project");
          router.push("/admin/projects");
        } finally {
          setInitialLoading(false);
        }
      };
      
      fetchProjectData();
    };
    
    initializeComponent();
  }, [params, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
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

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages([...newImages, ...filesArray]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageUrl: string) => {
    setFormData({
      ...formData,
      images: formData.images.filter(img => img !== imageUrl),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress("");

    try {
      // Use custom id if available, otherwise use the display id
      const updateId = customProjectId || projectId;
      
      if (!updateId) {
        alert("Cannot update this project. Missing project ID.");
        setLoading(false);
        return;
      }

      let uploadedImageUrls: string[] = [];

      // Upload new images to Cloudinary if any
      if (newImages.length > 0) {
        setUploadProgress(`Uploading ${newImages.length} new image(s) to Cloudinary...`);
        try {
          uploadedImageUrls = await uploadMultipleToCloudinary(newImages);
          setUploadProgress(`✓ Images uploaded successfully`);
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          alert('Failed to upload new images to Cloudinary. Please try again.');
          setLoading(false);
          setUploadProgress("");
          return;
        }
      }

      // Combine existing images with newly uploaded ones
      const allImages = [...formData.images, ...uploadedImageUrls];
      
      console.log('🔄 Updating project with backend ID:', updateId);
      setUploadProgress("Updating project...");
      const result = await projectsAPI.update(updateId, {
        ...formData,
        images: allImages,
      });

      if (result.success) {
        setUploadProgress("✓ Project updated successfully!");
        alert("Project updated successfully!");
        router.push("/admin/projects");
      } else {
        alert(`Failed to update project: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project");
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  if (initialLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center text-white">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading project...
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Project</h1>
              <p className="text-gray-400">Update project information</p>
            </div>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 text-gray-400 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
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
                    placeholder="Enter project title"
                  />
                </div>

                {/* Slug */}
                <div className="md:col-span-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="project-url-slug"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This will be used in the URL: /projects/{formData.slug}
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Describe your project..."
                  />
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                    Status *
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
                    Featured Project
                  </label>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Technologies</h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Add a technology (e.g., React, Python, etc.)"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
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
              <h2 className="text-lg font-semibold text-white mb-4">Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
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
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://your-project.com"
                  />
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

            {/* Image Management Section */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Project Images</h2>
              <p className="text-sm text-gray-400 mb-4">
                Manage your project images - remove existing ones or upload new images
              </p>

              {/* Existing Images */}
              {formData.images && formData.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(imageUrl)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload New Images (PNG, JPG, WEBP)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    id="newImages"
                    onChange={handleNewImageChange}
                  />
                  <label htmlFor="newImages" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <div className="text-gray-400 mb-2">
                      Click to upload new images or drag and drop
                    </div>
                    <div className="text-xs text-gray-500">
                      These will be uploaded to Cloudinary when you save
                    </div>
                  </label>
                </div>

                {/* Preview New Images */}
                {newImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">
                      New Images to Upload ({newImages.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {newImages.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-lg border border-yellow-400/30"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-gray-400 mt-1 truncate">{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Updating..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}