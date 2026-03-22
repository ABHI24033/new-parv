import api from "@/api/api";

export const homeLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Home" }),
    getAll: (params) => api.get("/loans/type/home", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

