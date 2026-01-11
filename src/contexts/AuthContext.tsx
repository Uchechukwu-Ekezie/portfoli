"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authAPI } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Get token from cookie
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };
      
      const token = typeof window !== 'undefined' ? getCookie('authToken') : null;
      
      console.log('🔍 Checking auth on mount...');
      console.log('📝 Token found:', token ? 'Yes' : 'No');
      console.log('🍪 All cookies:', document.cookie);
      
      if (token) {
        try {
          // Decode JWT to get user info (basic decode, not verification)
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          
          console.log('🎫 Token payload:', tokenPayload);
          
          // Check if token is expired
          if (tokenPayload.exp && tokenPayload.exp * 1000 < Date.now()) {
            // Token expired, clear it
            console.log('⏰ Token expired');
            document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            try {
              localStorage.removeItem('userEmail');
            } catch {
              // localStorage unavailable (private/incognito mode)
              console.warn('⚠️ localStorage unavailable during cleanup');
            }
            setUser(null);
          } else {
            // Token valid, set user
            const userId = tokenPayload.user?.id || tokenPayload.id || tokenPayload.userId;
            // Get email from localStorage (with fallback for private mode)
            let userEmail = 'admin@portfolio.com';
            try {
              userEmail = localStorage.getItem('userEmail') || 'admin@portfolio.com';
            } catch {
              // localStorage unavailable (private/incognito mode)
              console.warn('⚠️ localStorage unavailable, using default email');
            }
            
            const userData = {
              id: userId || '',
              email: userEmail,
              name: userEmail.split('@')[0],
              role: 'admin',
            };
            
            console.log('✅ Setting user:', userData);
            setUser(userData);
          }
        } catch (error) {
          // Invalid token
          console.error('❌ Error decoding token:', error);
          document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          try {
            localStorage.removeItem('userEmail');
          } catch {
            // localStorage unavailable (private/incognito mode)
            console.warn('⚠️ localStorage unavailable during cleanup');
          }
          setUser(null);
        }
      } else {
        console.log('⚠️ No token found in cookies');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    const result = await authAPI.login({ email, password });
    
    console.log('🔐 Login result:', result);
    
    if (result.success && result.data?.token) {
      console.log('💾 Storing token in cookie...');
      
      // Determine if we're on HTTPS (production) or HTTP (localhost)
      const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
      const secureFlag = isSecure ? '; Secure' : '';
      
      // Store token in cookie for server-side middleware
      document.cookie = `authToken=${result.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax${secureFlag}`;
      
      // Store email in localStorage (with error handling for private/incognito mode)
      try {
        localStorage.setItem('userEmail', email);
      } catch {
        // localStorage unavailable (private/incognito mode)
        console.warn('⚠️ localStorage unavailable (private mode?), using session only');
      }
      
      console.log('🍪 Cookie after storing:', document.cookie);
      
      // Decode token to get user info
      try {
        const tokenPayload = JSON.parse(atob(result.data.token.split('.')[1]));
        const userId = tokenPayload.user?.id || tokenPayload.id || tokenPayload.userId;
        
        const userData = {
          id: userId || '',
          email: email,
          name: email.split('@')[0],
          role: 'admin',
        };
        
        console.log('👤 User data:', userData);
        setUser(userData);
        
        setIsLoading(false);
        return { success: true };
      } catch (error) {
        console.error('❌ Error processing login:', error);
        setIsLoading(false);
        return { success: false, error: 'Failed to process login response' };
      }
    }
    
    setIsLoading(false);
    return { success: false, error: result.error || 'Login failed' };
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      // Remove cookie and localStorage
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      try {
        localStorage.removeItem('userEmail');
      } catch {
        // localStorage unavailable (private/incognito mode)
        console.warn('⚠️ localStorage unavailable during sign out');
      }
    }
    setUser(null);
  };

  const refreshUser = async () => {
    // Re-check token validity
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };
    
    const token = typeof window !== 'undefined' ? getCookie('authToken') : null;
    
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        
        if (tokenPayload.exp && tokenPayload.exp * 1000 < Date.now()) {
          handleSignOut();
        }
      } catch {
        // Invalid token
        handleSignOut();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
