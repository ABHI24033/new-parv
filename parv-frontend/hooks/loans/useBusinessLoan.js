import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { businessLoanApi } from "@/lib/api/loans/businessLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["businessLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreateBusinessLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => businessLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Business loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create business loan");
        },
    });
};

export const useGetBusinessLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => businessLoanApi.getAll(params),
    });
};

export const useGetBusinessLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => businessLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdateBusinessLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => businessLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update business loan");
        },
    });
};

export const useDeleteBusinessLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => businessLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Business loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete business loan");
        },
    });
};

