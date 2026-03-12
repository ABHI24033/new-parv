"use client";

import { useMutation } from "@tanstack/react-query";
import api from "./api";

export default function useImageUpload() {
  const mutation = useMutation({
    mutationFn: async ({ file, folder }) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folder);

      const res = await api.post(`/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data;
    },
  });

  return mutation;
}

export function useImageRemove() {
  const mutation = useMutation({
    mutationFn: async ({ url, public_id }) => {
      const res = await api.post(`/remove-image`, { url, public_id });
      return res.data;
    },
  });

  return mutation;
}
