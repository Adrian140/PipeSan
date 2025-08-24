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
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser?.profile || null);
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
      const { user: authUser } = await auth.signIn(email, password);
      
      if (authUser) {
        const profile = await db.getUser(authUser.id);
        setUser(profile);
        return profile;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
 };

  const register = async (userData) => {
     try {
      const { email, password, ...profileData } = userData;
      
      const { user: authUser } = await auth.signUp(email, password, {
        ...profileData,
        role: 'customer',
        country: profileData.country || 'FR'
      });
      
      if (authUser) {
        const profile = await db.getUser(authUser.id);
        setUser(profile);
        return profile;
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
 };

  const logout = () => {
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
