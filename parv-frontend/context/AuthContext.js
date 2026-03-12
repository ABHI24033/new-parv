"use client";

import api from "@/api/api";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user on page reload
  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });

      setUser(res.data.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      };
    }
  };

  // Logout function
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
