import api from "@/api/api";

export const personalLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Personal" }),
    getAll: (params) => api.get("/loans/type/personal", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

