import api from "@/api/api";

export const personalLoanApi = {
    create: (data) => api.post("/loans/personal", data),
    getAll: (params) => api.get("/loans/personal", { params }),
    getById: (id) => api.get(`/loans/personal/${id}`),
    update: (id, data) => api.put(`/loans/personal/${id}`, data),
    delete: (id) => api.delete(`/loans/personal/${id}`),
    hardDelete: (id) => api.delete(`/loans/personal/hard/${id}`),
};

