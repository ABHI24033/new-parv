"use client";

import api from "@/api/api";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// Fetch job applications list
async function fetchJobApplications(params = {}) {
  const { page = 1, limit = 15, status, position, search, sortBy, sortOrder } = params;
  
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);
  if (status) queryParams.append('status', status);
  if (position) queryParams.append('position', position);
  if (search) queryParams.append('search', search);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const res = await api.get(`/job-applications?${queryParams.toString()}`);
  return res.data;
}

// Fetch job application stats
async function fetchJobApplicationStats() {
  const res = await api.get('/job-applications/stats');
  return res.data;
}

// Delete job application (soft delete)
async function deleteJobApplication(id) {
  const res = await api.delete(`/job-applications/${id}`);
  return res.data;
}

// Hard delete job application
async function hardDeleteJobApplication(id) {
  const res = await api.delete(`/job-applications/${id}/permanent`);
  return res.data;
}

// Update job application status
async function updateJobApplicationStatus({ id, status }) {
  const res = await api.patch(`/job-applications/${id}/status`, { status });
  return res.data;
}

// Hook: Get job applications list
export function useJobApplications(params = {}) {
  return useQuery({
    queryKey: ["job-applications", params],
    queryFn: () => fetchJobApplications(params),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook: Get job application stats
export function useJobApplicationStats() {
  return useQuery({
    queryKey: ["job-application-stats"],
    queryFn: fetchJobApplicationStats,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook: Delete job application
export function useDeleteJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-application-stats"] });
    },
  });
}

// Hook: Hard delete job application
export function useHardDeleteJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hardDeleteJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-application-stats"] });
    },
  });
}

// Hook: Update job application status
export function useUpdateJobApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJobApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-application-stats"] });
    },
  });
}
