import api from "@/api/api";

export const businessLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Business" }),
    getAll: (params) => api.get("/loans/type/business", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

