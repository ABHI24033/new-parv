import api from "@/api/api";

export const loanEnquiryApi = {
  create: (data) => api.post("/loan-enquiry", data),
  getAll: () => api.get("/loan-enquiry"),
  updateStatus: (id, status) => api.patch(`/loan-enquiry/${id}`, { status }),
  delete: (id) => api.delete(`/loan-enquiry/${id}`),
};

