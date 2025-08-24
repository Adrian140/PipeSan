import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase';
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
        
        // Try to get current session from Supabase
        const currentUser = await auth.getCurrentUser();
        console.log('Current user result:', currentUser);
        
        if (currentUser) {
          // Get user profile from database
          const profile = await db.getUser(currentUser.id);
          if (profile) {
            setUser(profile);
            console.log('User session restored:', profile.email);
          }
        }
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
      
      // Real Supabase authentication
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
      // Don't expose detailed error information
      throw new Error('Autentificare eșuată. Verificați email-ul și parola.');
    }
 };

  const register = async (userData) => {
     try {
      console.log('Attempting registration for:', userData.email);
      
      // Real Supabase registration
      const { email, password, ...profileData } = userData;
      
      const result = await auth.signUp(email, password, {
        ...profileData,
        role: 'customer',
        country: profileData.country || 'FR'
      });
      
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
      // Provide user-friendly error messages
      if (error.message.includes('already registered')) {
        throw new Error('Acest email este deja înregistrat');
      } else if (error.message.includes('password')) {
        throw new Error('Parola nu respectă cerințele de securitate');
      } else {
        throw new Error('Înregistrare eșuată. Încercați din nou.');
      }
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