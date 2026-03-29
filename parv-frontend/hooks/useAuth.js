import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserState } from "@/app/dashboard/store";
import { useAuth as useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import api from "@/api/api";

/**
 * Hook for user login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userState = useUserState();
  const auth = useAuthContext();

  return useMutation({
    mutationFn: async ({ username, password }) => {
      const result = await auth.login(username, password);
      if (!result?.success) {
        throw new Error(result?.message || "Login failed");
      }
      return result;
    },
    onSuccess: ({ user }) => {
      // Update user state
      userState.setUser({ role: user?.role, username: user?.username });

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success("Login successful!");
      // Redirect based on role
      switch (user?.role) {
        case "Admin":
          router.push("/dashboard/");
          break;
        case "DSA":
          router.push("/dashboard/dsa");
          break;
        case "Telecaller":
          router.push("/dashboard/telecaller");
          break;
        case "Field Staff":
          router.push("/dashboard/field-staff");
          break;
        default:
          router.push("/dashboard/rm");
          break;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userState = useUserState();

  return useMutation({
    mutationFn: async () => {
      return await api.post("/auth/logout");
    },
    onSuccess: () => {
      // Clear token
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
      }

      // Clear user state
      userState.setUser({});
      userState.setProfile({});

      // Clear all queries
      queryClient.clear();

      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      // Even if API call fails, clear local state
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
      }
      userState.setUser({});
      userState.setProfile({});
      queryClient.clear();
      router.push("/login");
    },
  });
}

/**
 * Hook to check authentication status
 */
export function useCheckAuth() {
  return useMutation({
    mutationFn: async (token) => {
      return await api.get("/auth/verify", { token });
    },
  });
}

/**
 * Hook to get current user profile
 */
export function useGetProfile() {
  return useMutation({
    mutationFn: async ({ token, username }) => {
      return await api.get(`/auth/profile`, { token, username });
    },
  });
}

/**
 * Hook for forgot password / OTP
 */
export function useSendOTP() {
  return useMutation({
    mutationFn: async (username) => {
      return await api.post("/auth/send-otp", { username });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("OTP sent to your email");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });
}

/**
 * Hook for verify OTP
 */
export function useVerifyOTP() {
  return useMutation({
    mutationFn: async ({ otp, username }) => {
      return await api.post("/auth/verify-otp", { otp, username });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("OTP verified successfully");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Invalid OTP");
    },
  });
}

/**
 * Hook for change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: async ({ username, password, otp }) => {
      return await api.post("/auth/change-password", { username, password, otp });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Password changed successfully");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to change password");
    },
  });
}

