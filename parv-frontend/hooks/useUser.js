import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import apiClient from "@/lib/api/client";
import toast from "react-hot-toast";

/**
 * Hook to get user data by token
 */
export function useGetUserDataByToken() {
  return useQuery({
    queryKey: ["user", "current"],
    queryFn: async () => {
      return await api.get("/auth/me");
    },
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to get user data by username
 */
export function useGetUserData(username) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      return await api.get(`/user/${username}`);
    },
    enabled: !!username,
  });
}

/**
 * Hook to create account
 */
export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await api.post("/user/account", data);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Account created successfully");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create account");
    },
  });
}

/**
 * Hook to update account
 */
export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, data }) => {
      return await api.put(`/user/account/${username}`, data);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Account updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update account");
    },
  });
}

