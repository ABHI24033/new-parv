"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/api/api";
import { debounce } from "lodash";

export const useLoans = (loanType) => {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                limit,
                ...(search && { search }),
                ...(status !== "all" && { status })
            });

            const response = await api.get(`/loans/type/${loanType}?${params.toString()}`);
            if (response.data.success) {
                setData(response.data.data);
                setTotalCount(response.data.totalCount || response.data.total);
            }
        } catch (error) {
            console.error(`Error fetching ${loanType} loans:`, error);
        } finally {
            setLoading(false);
        }
    }, [loanType, page, limit, status, search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
            setPage(1);
        }, 500),
        []
    );

    const refreshData = () => fetchData();

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
