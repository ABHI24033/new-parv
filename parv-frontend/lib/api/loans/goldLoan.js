import api from "@/api/api";

export const goldLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Gold" }),
    getAll: (params) => api.get("/loans/type/gold", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

