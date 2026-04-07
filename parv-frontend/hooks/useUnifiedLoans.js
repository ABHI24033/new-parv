"use client";

import { useCallback, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import api from "@/api/api";

export const LOAN_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "home", label: "Home" },
  { value: "vehicle", label: "Vehicle" },
  { value: "gold", label: "Gold" },
  { value: "group", label: "Group" },
];

export const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "Application Received", label: "Application Received" },
  { value: "In Progress at PARV", label: "In Progress at PARV" },
  { value: "Applied to Bank", label: "Applied to Bank" },
  { value: "Pendency", label: "Pendency" },
  { value: "Sanctioned", label: "Sanctioned" },
  { value: "Disbursed", label: "Disbursed" },
  { value: "Rejected", label: "Rejected" },
];
import { useSearchParams } from "next/navigation";

export const useUnifiedLoans = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [loanIdFilter, setLoanIdFilter] = useState("");
  const [connectorFilter, setConnectorFilter] = useState(searchParams?.get("connector") || "");
  const [status, setStatus] = useState("all");
  const [loanType, setLoanType] = useState("all");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [sortOrder, setSortOrder] = useState("desc");

  // Build params for the query key & fetch
  const queryParams = useMemo(() => {
    const params = {
      page,
      limit,
      status,
      loanType,
      sortOrder,
      ...(search ? { search } : {}),
      ...(loanIdFilter ? { loanId: loanIdFilter } : {}),
      ...(connectorFilter ? { connector: connectorFilter } : {}),
    };

    if (month && year) {
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0);
      endDate.setHours(23, 59, 59, 999);
      params.startDate = startDate.toISOString();
      params.endDate = endDate.toISOString();
    }

    return params;
  }, [page, limit, search, status, loanType, month, year, sortOrder, loanIdFilter, connectorFilter]);

  const { data: queryData, isLoading: loading, refetch } = useQuery({
    queryKey: ["unified-loans", queryParams],
    queryFn: async () => {
      const response = await api.get("/loans", { params: queryParams });
      return response.data;
    },
    staleTime: 2 * 60 * 1000,    // remain fresh for 2 min
    gcTime: 5 * 60 * 1000,       // cache for 5 min
    keepPreviousData: true,       // show old data while fetching new page
    placeholderData: (prev) => prev,
  });

  const data = queryData?.success ? (queryData.data || []) : [];
  const totalCount = queryData?.totalCount || queryData?.total || 0;

  const handleMonthChange = useCallback((value, selectedYear) => {
    setMonth(value === "all" ? "" : value || "");
    if (selectedYear) setYear(String(selectedYear));
    setPage(1);
  }, []);

  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setPage(1);
    }, 500),
    []
  );

  const handleLoanIdChange = useCallback((value) => {
    setLoanIdFilter(value);
    setPage(1);
  }, []);

  const handleConnectorChange = useCallback((value) => {
    setConnectorFilter(value);
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setLoanIdFilter("");
    setConnectorFilter("");
    setStatus("all");
    setLoanType("all");
    setMonth("");
    setYear(String(new Date().getFullYear()));
    setPage(1);
  }, []);

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
    loanIdFilter,
    handleLoanIdChange,
    connectorFilter,
    handleConnectorChange,
    status,
    setStatus,
    loanType,
    setLoanType,
    sortOrder,
    setSortOrder,
    month,
    year,
    handleMonthChange,
    resetFilters,
    refreshData,
  };
};
