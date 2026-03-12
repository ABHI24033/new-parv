import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import toast from "react-hot-toast";

/**
 * Hook to add/create a lead
 */
export function useAddLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await apiClient.post("/leads", data);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Lead added successfully");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add lead");
    },
  });
}

/**
 * Hook to get leads with pagination
 */
export function useGetLeads(pageSize = 10, startAfterDocId = null, currentPage = 1, month = null, year = null) {
  return useQuery({
    queryKey: ["leads", "list", pageSize, startAfterDocId, currentPage, month, year],
    queryFn: async () => {
      const params = { pageSize, currentPage };
      if (startAfterDocId) params.startAfterDocId = startAfterDocId;
      if (month) params.month = month;
      if (year) params.year = year;
      return await apiClient.get("/leads", params);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook to get all leads
 */
export function useGetAllLeads() {
  return useQuery({
    queryKey: ["leads", "all"],
    queryFn: async () => {
      return await apiClient.get("/leads/all");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to update a lead
 */
export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await apiClient.put(`/leads/${id}`, data);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Lead updated successfully");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update lead");
    },
  });
}

/**
 * Hook to update lead status
 */
export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newStatus }) => {
      return await apiClient.patch(`/leads/${id}/status`, { status: newStatus });
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Lead status updated successfully");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update lead status");
    },
  });
}

/**
 * Hook to delete a lead
 */
export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/leads/${id}`);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Lead deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete lead");
    },
  });
}

/**
 * Hook to add lead remark
 */
export function useAddLeadRemark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, remarkData }) => {
      return await apiClient.post(`/leads/${leadId}/remarks`, remarkData);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Remark added successfully");
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add remark");
    },
  });
}

