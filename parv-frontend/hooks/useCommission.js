"use client";

import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

/**
 * Hook for managing commissions and disbursed loans
 */
export function useCommission() {
  const queryClient = useQueryClient();

  // 1. Fetch Disbursed Loans (for Admin to assign commissions)
  const useDisbursedLoans = (connectorId = "") => {
    return useQuery({
      queryKey: ["disbursed-loans", connectorId],
      queryFn: async () => {
        const res = await api.get("/users/commissions/disbursed", {
          params: { connectorId },
        });
        return res.data?.data || [];
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // 2. Fetch Commission History / Income (for Admin/DSA)
  const useCommissionHistory = (filters = {}) => {
    return useQuery({
      queryKey: ["commission-history", filters],
      queryFn: async () => {
        const res = await api.get("/users/commissions/history", {
          params: filters,
        });
        return res.data || { data: [], stats: { totalEarnings: 0, totalPaid: 0, totalPending: 0 } };
      },
      staleTime: 1000 * 60 * 5,
    });
  };

  // 3. Assign Commission Mutation
  const assignCommission = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/users/commissions/assign", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disbursed-loans"] });
      queryClient.invalidateQueries({ queryKey: ["commission-history"] });
      toast.success("Commission assigned successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to assign commission");
    },
  });

  // 4. Update Payment Status Mutation
  const updatePaymentStatus = useMutation({
    mutationFn: async ({ id, status, paymentDate, paymentMode }) => {
      const res = await api.patch(`/users/commissions/${id}/status`, {
        status,
        paymentDate,
        paymentMode,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commission-history"] });
      queryClient.invalidateQueries({ queryKey: ["disbursed-loans"] });
      toast.success("Payment status updated");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });

  return {
    useDisbursedLoans,
    useCommissionHistory,
    assignCommission,
    updatePaymentStatus,
  };
}
