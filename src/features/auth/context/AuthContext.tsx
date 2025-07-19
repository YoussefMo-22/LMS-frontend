import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types/auth';
import { axiosInstance } from '../../../api/axiosInstance';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Secure token storage utilities
const TOKEN_KEY = 'lms_auth_token';
const USER_KEY = 'lms_user_data';

const secureStorage = {
  // Store token in sessionStorage (cleared when browser closes)
  setToken: (token: string) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
      // Also set in axios headers
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  },

  // Get token from sessionStorage
  getToken: (): string | null => {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  },

  // Remove token from sessionStorage
  removeToken: () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      delete axiosInstance.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  },

  // Store user data in sessionStorage (cleared when browser closes)
  setUser: (user: User) => {
    try {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  },

  // Get user data from sessionStorage
  getUser: (): User | null => {
    try {
      const userData = sessionStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  },

  // Remove user data from sessionStorage
  removeUser: () => {
    try {
      sessionStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  },

  // Clear all auth data
  clearAll: () => {
    secureStorage.removeToken();
    secureStorage.removeUser();
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const checkAuth = async () => {
      try {
        const token = secureStorage.getToken();
        const storedUser = secureStorage.getUser();

        if (token && storedUser) {
          // Set the token in axios headers
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Validate token by checking if it's not expired (basic check)
          try {
            // Decode JWT token to check expiration (basic implementation)
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (tokenPayload.exp && tokenPayload.exp > currentTime) {
              // Token is valid, set user
              setUser(storedUser);
            } else {
              // Token expired, clear everything
              console.log('Token expired, clearing auth data');
              secureStorage.clearAll();
            }
          } catch (tokenError) {
            // Invalid token format, clear everything
            console.error('Invalid token format:', tokenError);
            secureStorage.clearAll();
          }
        } else if (token && !storedUser) {
          // Token exists but no user data, clear token
          secureStorage.removeToken();
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        secureStorage.clearAll();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Store user data securely
    secureStorage.setUser(userData);
    
    // Set the token in axios headers if it exists
    const token = secureStorage.getToken();
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const logout = () => {
    setUser(null);
    secureStorage.clearAll();
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    secureStorage.setUser(userData);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 