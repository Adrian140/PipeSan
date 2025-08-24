import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase.jsx';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        
        // Auto logout on every site entry
        console.log('Auto logout: Clearing any existing session...');
        setUser(null);
        
        // Check if we're in demo mode
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl === 'https://demo.supabase.co') {
          console.log('Demo mode: Using mock authentication');
          // Start with no user - require manual login
          setUser(null);
          setLoading(false);
          return;
        }
        
        const currentUser = await auth.getCurrentUser();
        console.log('Current user result:', currentUser);
        // Always start logged out
        setUser(null);
        console.log('Auto logout completed - user must login manually');
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
 }, []);

  const login = async (email, password) => {
     try {
      console.log('Attempting login for:', email);
      
      // Demo mode login
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === 'https://demo.supabase.co') {
        console.log('Demo mode: Mock login successful');
        // Admin credentials check
        if (email === 'contact@pipesan.eu' && password === 'Pipesan2022') {
          const mockUser = {
            id: 'admin-user',
          };
          setUser(mockUser);
          return mockUser;
        }
        
        // Regular demo user
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: email,
          name: 'Demo User',
          role: 'customer',
          account_type: 'individual',
          country: 'FR',
          phone: ''
        };
        setUser(mockUser);
        return mockUser;
      }
      
      const result = await auth.signIn(email, password);
      console.log('Login result:', result);
      const authUser = result?.user;
      
      if (authUser) {
        const profile = await db.getUser(authUser.id);
        console.log('User profile:', profile);
        setUser(profile);
        return profile;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
 };

  const register = async (userData) => {
     try {
      console.log('Attempting registration for:', userData.email);
      
      // Demo mode registration
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === 'https://demo.supabase.co') {
        console.log('Demo mode: Mock registration successful');
        const mockUser = {
          id: 'demo-user-' + Date.now(),
          email: userData.email,
          name: userData.name,
          role: 'customer',
          account_type: userData.accountType || 'individual',
          country: userData.country || 'FR',
          phone: userData.phone
        };
        setUser(mockUser);
        return mockUser;
      }
      
      const { email, password, ...profileData } = userData;
      
      const result = await auth.signUp(email, password, {
        ...profileData,
        role: 'customer',
        country: profileData.country || 'FR'
      });
      setUser(null);
      
      console.log('Registration result:', result);
      const authUser = result?.user;
      if (authUser) {
        const profile = await db.getUser(authUser.id);
        if (profile) {
          setUser(profile);
        }
        return profile;
      }
      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
 };

  const logout = () => {
     console.log('Logging out...');
     auth.signOut();
    setUser(null);
 };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
     isAdmin: user?.role === 'admin'
 };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;