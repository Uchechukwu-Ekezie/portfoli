// API utility functions for authentication and data fetching

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfoliobackend-83lp.onrender.com';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface ProjectData {
  id?: string;
  title: string;
  shortDescription?: string;
  briefDescription?: string;
  description: string;
  detailedProjectOverview?: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  slug: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  images?: string[];
  // New rich content fields
  overview?: string;
  methods?: string;
  impact?: string;
  imageGalleryTitle?: string;
  imageGallerySubtitle?: string;
}

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  skills: string[];
  education: Array<Record<string, string>>;
  experience: Array<Record<string, string>>;
  social: Record<string, string>;
}

// Helper function to get auth token from session
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Get token from cookie
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const token = parts.pop()?.split(';').shift();
      return token || null;
    }
    return null;
  };
  
  return getCookie('authToken');
};

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Backend returns { token: "..." }
      if (data.token) {
        // Store token for future API calls
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('authToken', data.token);
        }
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  },

  register: async (userData: RegisterData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Backend returns { token: "..." }
      if (data.token) {
        // Store token for future API calls
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('authToken', data.token);
        }
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('authToken');
    }
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
      };
    }
  },

  getById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/id/${id}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch project',
      };
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/slug/${slug}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch project');
      }
      
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch project',
      };
    }
  },

  create: async (projectData: ProjectData | FormData) => {
    try {
      const token = getAuthToken();
      
      // Check if projectData is FormData
      const isFormData = projectData instanceof FormData;
      
      const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          // Don't set Content-Type for FormData - browser will set it with boundary
          ...(!isFormData && { 'Content-Type': 'application/json' }),
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: isFormData ? projectData : JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create project',
      };
    }
  },

  update: async (id: string, projectData: Partial<ProjectData>) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update project');
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update project',
      };
    }
  },

  delete: async (id: string) => {
    try {
      const token = getAuthToken();
      const deleteUrl = `${API_BASE_URL}/api/projects/${id}`;
      
      console.log('🗑️ Deleting project:', id);
      console.log('🔗 Delete URL:', deleteUrl);
      console.log('🔑 Token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      console.log('📡 Delete response status:', response.status);
      console.log('📡 Delete response statusText:', response.statusText);

      // Try to get response body for more info
      const responseText = await response.text();
      console.log('📄 Response body:', responseText);

      if (!response.ok) {
        let errorData;
        try {
          errorData = responseText ? JSON.parse(responseText) : {};
        } catch {
          errorData = { error: responseText || 'Failed to delete project' };
        }
        console.error('❌ Delete failed:', errorData);
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('✅ Project deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Delete error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete project',
      };
    }
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch profile',
      };
    }
  },

  update: async (profileData: Partial<ProfileData>) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile',
      };
    }
  },
};

// Contact API
export const contactAPI = {
  send: async (formData: { from_name: string; from_email: string; subject: string; message: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      };
    }
  },
};

const apiClient = {
  authAPI,
  projectsAPI,
  profileAPI,
  contactAPI,
};

export default apiClient;
