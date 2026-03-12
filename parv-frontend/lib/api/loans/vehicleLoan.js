import api from "@/api/api";

export const vehicleLoanApi = {
    create: (data) => api.post("/loans/vehicle", data),
    getAll: (params) => api.get("/loans/vehicle", { params }),
    getById: (id) => api.get(`/loans/vehicle/${id}`),
    update: (id, data) => api.put(`/loans/vehicle/${id}`, data),
    delete: (id) => api.delete(`/loans/vehicle/${id}`),
    hardDelete: (id) => api.delete(`/loans/vehicle/hard/${id}`),
};

