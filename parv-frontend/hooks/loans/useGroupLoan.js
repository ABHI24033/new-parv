import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupLoanApi } from "@/lib/api/loans/groupLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["groupLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreateGroupLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => groupLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Group loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create group loan");
        },
    });
};

export const useGetGroupLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => groupLoanApi.getAll(params),
    });
};

export const useGetGroupLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => groupLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdateGroupLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => groupLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update group loan");
        },
    });
};

export const useDeleteGroupLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => groupLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Group loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete group loan");
        },
    });
};

