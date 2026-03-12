import api from "@/api/api";

export const homeLoanApi = {
    create: (data) => api.post("/loans/home", data),
    getAll: (params) => api.get("/loans/home", { params }),
    getById: (id) => api.get(`/loans/home/${id}`),
    update: (id, data) => api.put(`/loans/home/${id}`, data),
    delete: (id) => api.delete(`/loans/home/${id}`),
    hardDelete: (id) => api.delete(`/loans/home/hard/${id}`),
};

