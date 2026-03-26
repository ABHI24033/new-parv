import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vehicleLoanApi } from "@/lib/api/loans/vehicleLoan";
import toast from "react-hot-toast";

const QUERY_KEYS = {
    all: ["vehicleLoans"],
    lists: () => [...QUERY_KEYS.all, "list"],
    list: (params) => [...QUERY_KEYS.lists(), params],
    details: () => [...QUERY_KEYS.all, "detail"],
    detail: (id) => [...QUERY_KEYS.details(), id],
};

export const useCreateVehicleLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => vehicleLoanApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Vehicle loan created successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create vehicle loan");
        },
    });
};

export const useGetVehicleLoans = (params) => {
    return useQuery({
        queryKey: QUERY_KEYS.list(params),
        queryFn: () => vehicleLoanApi.getAll(params),
    });
};

export const useGetVehicleLoanById = (id) => {
    return useQuery({
        queryKey: QUERY_KEYS.detail(id),
        queryFn: () => vehicleLoanApi.getById(id),
        enabled: !!id,
    });
};

export const useUpdateVehicleLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => vehicleLoanApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Loan updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update vehicle loan");
        },
    });
};

export const useDeleteVehicleLoan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => vehicleLoanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
            toast.success("Vehicle loan deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete vehicle loan");
        },
    });
};

