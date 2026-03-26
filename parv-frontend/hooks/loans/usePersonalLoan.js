import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { personalLoanApi } from "@/lib/api/loans/personalLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["personalLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreatePersonalLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => personalLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Personal loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create personal loan");
        },
    });
};

export const useGetPersonalLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => personalLoanApi.getAll(params),
    });
};

export const useGetPersonalLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => personalLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdatePersonalLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => personalLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update personal loan");
        },
    });
};

export const useDeletePersonalLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => personalLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Personal loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete personal loan");
        },
    });
};

