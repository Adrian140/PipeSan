import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Simulate checking for existing session
    const checkAuth = () => {
      const savedUser = localStorage.getItem("pipesan_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    // Simulate login - replace with actual Supabase auth
    // Admin account validation
    if (email === "contact@pipesan.eu" && password === "Pipesan2022") {
      const adminUser = {
        id: "admin-1",
        email: "contact@pipesan.eu",
        name: "Administrator PipeSan",
        role: "admin",
        company: "PipeSan",
        country: "RO"
      };
      setUser(adminUser);
      localStorage.setItem("pipesan_user", JSON.stringify(adminUser));
      return adminUser;
    }
    
    // Regular user simulation
    const mockUser = {
      id: Date.now().toString(),
      email,
      name: "Test User",
      role: "customer"
    };
    
    setUser(mockUser);
    localStorage.setItem("pipesan_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const register = async (userData) => {
    // Simulate registration - replace with actual Supabase auth
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: "customer",
      country: userData.country || "FR",
      registrationDate: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem("pipesan_user", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pipesan_user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user?.role === "admin"
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
