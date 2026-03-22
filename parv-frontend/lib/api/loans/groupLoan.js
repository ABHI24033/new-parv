import api from "@/api/api";

export const groupLoanApi = {
    create: (data) => api.post("/loans", { ...data, loanType: "Group" }),
    getAll: (params) => api.get("/loans/type/group", { params }),
    getById: (id) => api.get(`/loans/${id}`),
    update: (id, data) => api.put(`/loans/${id}`, data),
    delete: (id) => api.delete(`/loans/${id}`),
    hardDelete: (id) => api.delete(`/loans/${id}`),
};

