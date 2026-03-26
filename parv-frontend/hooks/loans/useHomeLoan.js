import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { homeLoanApi } from "@/lib/api/loans/homeLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["homeLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreateHomeLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => homeLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Home loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create home loan");
        },
    });
};

export const useGetHomeLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => homeLoanApi.getAll(params),
    });
};

export const useGetHomeLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => homeLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdateHomeLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => homeLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update home loan");
        },
    });
};

export const useDeleteHomeLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => homeLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Home loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete home loan");
        },
    });
};

