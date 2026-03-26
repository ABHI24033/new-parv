"use client";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
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

export const useUnifiedLoans = () => {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loanType, setLoanType] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // desc=newest first

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        status,
        loanType,
        sortOrder,
        ...(search ? { search } : {}),
      };

      const response = await api.get("/loans", { params });
      if (response.data?.success) {
        setData(response.data.data || []);
        setTotalCount(response.data.totalCount || response.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching unified loans:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, loanType, sortOrder]);

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
    loanType,
    setLoanType,
    sortOrder,
    setSortOrder,
    refreshData,
  };
};

