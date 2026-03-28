import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import toast from "react-hot-toast";

/**
 * Hook to add/create a lead
 */
export function useAddLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/leads", data);
      return res.data;
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
 * Hook to get leads with pagination and filters
 */
export function useGetLeads({ 
  pageSize = 10, 
  currentPage = 1, 
  month = null, 
  year = null,
  search = "",
  loanProduct = "all",
  leadStatus = "all"
}) {
  return useQuery({
    queryKey: ["leads", "list", pageSize, currentPage, month, year, search, loanProduct, leadStatus],
    queryFn: async () => {
      const params = { pageSize, currentPage };
      if (month) params.month = month;
      if (year) params.year = year;
      if (search) params.search = search;
      if (loanProduct && loanProduct !== "all") params.loanProduct = loanProduct;
      if (leadStatus && leadStatus !== "all") params.leadStatus = leadStatus;
      
      const res = await api.get("/leads", { params });
      return res.data;
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
      const res = await api.get("/leads/all");
      return res.data;
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
      const res = await api.put(`/leads/${id}`, data);
      return res.data;
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
      const res = await api.patch(`/leads/${id}/status`, { status: newStatus });
      return res.data;
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
      const res = await api.delete(`/leads/${id}`);
      return res.data;
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
      const res = await api.post(`/leads/${leadId}/remarks`, remarkData);
      return res.data;
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

