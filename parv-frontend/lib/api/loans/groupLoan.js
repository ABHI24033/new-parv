import api from "@/api/api";

export const groupLoanApi = {
    create: (data) => api.post("/loans/group", data),
    getAll: (params) => api.get("/loans/group", { params }),
    getById: (id) => api.get(`/loans/group/${id}`),
    update: (id, data) => api.put(`/loans/group/${id}`, data),
    delete: (id) => api.delete(`/loans/group/${id}`),
    hardDelete: (id) => api.delete(`/loans/group/hard/${id}`),
};

