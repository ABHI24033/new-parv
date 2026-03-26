import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { goldLoanApi } from "@/lib/api/loans/goldLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["goldLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreateGoldLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => goldLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Gold loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create gold loan");
        },
    });
};

export const useGetGoldLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => goldLoanApi.getAll(params),
    });
};

export const useGetGoldLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => goldLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdateGoldLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => goldLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update gold loan");
        },
    });
};

export const useDeleteGoldLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => goldLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Gold loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete gold loan");
        },
    });
};

