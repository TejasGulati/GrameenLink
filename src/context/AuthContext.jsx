import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check auth status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error parsing user data:", error);
            await clearAuthData();
          }
        } else {
          await clearAuthData();
        }
      } catch (error) {
        console.error("Auth status check error:", error);
        await clearAuthData();
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // Clear all authentication data
  const clearAuthData = async () => {
    try {
      // List of all possible auth-related storage keys
      const authItems = [
        'token',
        'user',
        'refreshToken',
        'authState',
        'sessionId',
        'auth_token',
        'user_data',
        'access_token'
      ];
      
      // Clear localStorage items
      authItems.forEach(item => {
        try {
          localStorage.removeItem(item);
        } catch (error) {
          console.error(`Error removing ${item} from localStorage:`, error);
        }
      });
      
      // Clear sessionStorage items
      authItems.forEach(item => {
        try {
          sessionStorage.removeItem(item);
        } catch (error) {
          console.error(`Error removing ${item} from sessionStorage:`, error);
        }
      });
      
      // Clear cookies more thoroughly
      try {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          
          // Clear with various options to ensure complete removal
          const domains = [
            window.location.hostname,
            `.${window.location.hostname}`,
            window.location.hostname.split('.').slice(-2).join('.')
          ];
          
          const paths = ['/', '', '/; path=/'];
          
          domains.forEach(domain => {
            paths.forEach(path => {
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=${path}`;
            });
          });
        }
      } catch (error) {
        console.error('Cookie clearing error:', error);
      }
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      return true;
    } catch (error) {
      console.error("Error clearing auth data:", error);
      // Force state reset even if storage clearing fails
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // Login function
  const login = async (token, userData) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      await clearAuthData();
      return false;
    }
  };

  // Registration function
  const register = async (token, userData) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      await clearAuthData();
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // First clear all client-side data
      const cleared = await clearAuthData();
      
      // If you have a server-side logout endpoint, call it here
      // Example:
      // try {
      //   await fetch('/api/auth/logout', {
      //     method: 'POST',
      //     credentials: 'include'
      //   });
      // } catch (serverError) {
      //   console.error('Server logout error:', serverError);
      // }
      
      return cleared;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      register, 
      logout,
      clearAuthData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};