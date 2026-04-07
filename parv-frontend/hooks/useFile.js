import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";
import toast from "react-hot-toast";

/**
 * Hook to upload document
 */
export function useUploadDoc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, folder }) => {
      const formData = new FormData();
      formData.append("image", file);
      if (folder) {
        formData.append("folder", folder);
      }
      return await api.post("/upload-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    onSuccess: (response) => {
      if (response.success || response.url) {
        toast.success("File uploaded successfully");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload file");
    },
  });
}

/**
 * Hook to remove/delete document
 */
export function useRemoveDoc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (publicId) => {
      return await api.post("/remove-image", { publicId });
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("File removed successfully");
        queryClient.invalidateQueries({ queryKey: ["files"] });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove file");
    },
  });
}

