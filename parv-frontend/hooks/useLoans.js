"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import api from "@/api/api";

export const useLoans = (loanType) => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const queryParams = useMemo(() => ({
        page,
        limit,
        ...(search && { search }),
        ...(status !== "all" && { status }),
    }), [page, limit, search, status]);

    const { data: queryData, isLoading: loading, refetch } = useQuery({
        queryKey: ["loans", loanType, queryParams],
        queryFn: async () => {
            const params = new URLSearchParams(queryParams);
            const response = await api.get(`/loans/type/${loanType}?${params.toString()}`);
            return response.data;
        },
        enabled: !!loanType,
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    });

    const data = queryData?.success ? (queryData.data || []) : [];
    const totalCount = queryData?.totalCount || queryData?.total || 0;

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
            setPage(1);
        }, 500),
        []
    );

    const refreshData = () => refetch();

    return {
        data,
        totalCount,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        search,
        handleSearch,
        status,
        setStatus,
        refreshData
    };
};
