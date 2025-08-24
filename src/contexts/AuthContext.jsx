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
        const currentUser = await auth.getCurrentUser();
        console.log('Current user result:', currentUser);
        if (currentUser?.profile) {
          setUser(currentUser.profile);
          console.log('User set:', currentUser.profile);
        } else {
          setUser(null);
          console.log('No user found');
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