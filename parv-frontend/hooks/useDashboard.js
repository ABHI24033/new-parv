import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

/**
 * Hook to get admin dashboard stats with real-time polling every 60 seconds
 */
export function useGetDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const res = await api.get("/loans/dashboard/stats");
      return res.data;
    },
    staleTime: 30 * 1000,          // consider fresh for 30s
    refetchInterval: 60 * 1000,    // auto-refetch every 60s
    refetchIntervalInBackground: false,
  });
}
