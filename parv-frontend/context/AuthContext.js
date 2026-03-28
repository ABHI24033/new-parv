"use client";

import api from "@/api/api";
import { useUserState } from "@/app/dashboard/store";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dashboardStore = useUserState();
  // Prevent stale /auth/me results from overwriting a successful login.
  const authRequestId = useRef(0);

  // Load current user on page reload
  const loadUser = async () => {
    const requestId = ++authRequestId.current;
    try {
      const res = await api.get("/auth/me");
      const currentUser = res.data.data;
      setUser(currentUser);
      dashboardStore.setProfile(currentUser || {});
      dashboardStore.setUser(
        currentUser ? { role: currentUser.role, username: currentUser.username } : {}
      );
    } catch {
      setUser(null);
      dashboardStore.setProfile({});
      dashboardStore.setUser({});
    } finally {
      if (requestId === authRequestId.current) setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    const requestId = ++authRequestId.current;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });

      if (typeof window !== "undefined" && res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      setUser(res.data.data.user);
      dashboardStore.setProfile(res.data.data.user || {});
      dashboardStore.setUser({
        role: res.data.data.user?.role,
        username: res.data.data.user?.username,
      });
      return { success: true, user: res.data.data.user };
    } catch (err) {
      setUser(null);
      dashboardStore.setProfile({});
      dashboardStore.setUser({});
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      };
    } finally {
      if (requestId === authRequestId.current) setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    const requestId = ++authRequestId.current;
    setLoading(true);
    await api.post("/auth/logout");
    setUser(null);
    dashboardStore.setProfile({});
    dashboardStore.setUser({});
    if (typeof window !== "undefined") localStorage.removeItem("token");
    if (requestId === authRequestId.current) setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
