import api from "@/api/api";

export const businessLoanApi = {
    create: (data) => api.post("/loans/business", data),
    getAll: (params) => api.get("/loans/business", { params }),
    getById: (id) => api.get(`/loans/business/${id}`),
    update: (id, data) => api.put(`/loans/business/${id}`, data),
    delete: (id) => api.delete(`/loans/business/${id}`),
    hardDelete: (id) => api.delete(`/loans/business/hard/${id}`),
};

