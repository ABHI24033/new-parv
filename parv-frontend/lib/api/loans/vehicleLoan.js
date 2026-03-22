import api from "@/api/api";

export const vehicleLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Vehicle" }),
    getAll: (params) => api.get("/loans/type/vehicle", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

