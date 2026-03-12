import api from "@/api/api";

export const goldLoanApi = {
    create: (data) => api.post("/loans/gold", data),
    getAll: (params) => api.get("/loans/gold", { params }),
    getById: (id) => api.get(`/loans/gold/${id}`),
    update: (id, data) => api.put(`/loans/gold/${id}`, data),
    delete: (id) => api.delete(`/loans/gold/${id}`),
    hardDelete: (id) => api.delete(`/loans/gold/hard/${id}`),
};

