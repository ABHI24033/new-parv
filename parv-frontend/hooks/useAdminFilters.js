import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useFilteredEnquiries = () => {
    const [filters, setFilters] = useState({
        month: null,
        year: null,
        search: '',
    });

    const queryParams = useMemo(() => {
        const params = {};
        if (filters.month) params.month = filters.month;
        if (filters.year) params.year = filters.year;
        if (filters.search) params.search = filters.search;
        return params;
    }, [filters]);

    const { data: queryData, isLoading, error: queryError } = useQuery({
        queryKey: ['filtered-enquiries', queryParams],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(queryParams).forEach(([k, v]) => {
                if (v) params.append(k, String(v));
            });
            const response = await fetch(`/api/admin/enquiries/filtered?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json();
        },
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    });

    const data = queryData?.data || [];
    const error = queryError?.message || null;

    const handleMonthChange = useCallback((month, year) => {
        setFilters(prev => ({ ...prev, month, year }));
    }, []);

    const handleSearch = useCallback((search) => {
        setFilters(prev => ({ ...prev, search }));
    }, []);

    const handleReset = useCallback(() => {
        setFilters({ month: null, year: null, search: '' });
    }, []);

    return {
        data,
        isLoading,
        error,
        filters,
        handleMonthChange,
        handleSearch,
        handleReset,
    };
};

export const useFilteredLeads = () => {
    const [filters, setFilters] = useState({
        month: null,
        year: null,
        search: '',
    });

    const queryParams = useMemo(() => {
        const params = {};
        if (filters.month) params.month = filters.month;
        if (filters.year) params.year = filters.year;
        if (filters.search) params.search = filters.search;
        return params;
    }, [filters]);

    const { data: queryData, isLoading, error: queryError } = useQuery({
        queryKey: ['filtered-leads', queryParams],
        queryFn: async () => {
            const params = new URLSearchParams();
            Object.entries(queryParams).forEach(([k, v]) => {
                if (v) params.append(k, String(v));
            });
            const response = await fetch(`/api/admin/leads/filtered?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            return response.json();
        },
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        placeholderData: (prev) => prev,
    });

    const data = queryData?.data || [];
    const error = queryError?.message || null;

    const handleMonthChange = useCallback((month, year) => {
        setFilters(prev => ({ ...prev, month, year }));
    }, []);

    const handleSearch = useCallback((search) => {
        setFilters(prev => ({ ...prev, search }));
    }, []);

    const handleReset = useCallback(() => {
        setFilters({ month: null, year: null, search: '' });
    }, []);

    return {
        data,
        isLoading,
        error,
        filters,
        handleMonthChange,
        handleSearch,
        handleReset,
    };
};
