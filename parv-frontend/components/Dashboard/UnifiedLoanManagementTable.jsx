"use client";

import React from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LOAN_TYPE_OPTIONS, STATUS_OPTIONS } from "@/hooks/useUnifiedLoans";

const getStatusVariant = (st) => {
  switch (String(st || "").toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "disbursed":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
};

const shortId = (id) => (id ? String(id).slice(-8).toUpperCase() : "-");

const formatDate = (dateValue) => {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
};

const UnifiedLoanManagementTable = ({
  title = "Loans",
  data,
  totalCount,
  loading,
  page,
  setPage,
  limit,
  setLimit,
  handleSearch,
  status,
  setStatus,
  loanType,
  setLoanType,
  sortOrder,
  setSortOrder,
}) => {
  const pageCount = Math.max(Math.ceil((totalCount || 0) / (limit || 10)), 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex flex-col lg:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search name or phone..."
              className="pl-10"
              onChange={(e) => handleSearch?.(e.target.value)}
            />
          </div>
          <Select value={loanType} onValueChange={(v) => (setLoanType?.(v), setPage?.(1))}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Loan Type" />
            </SelectTrigger>
            <SelectContent>
              {LOAN_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => (setStatus?.(v), setPage?.(1))}>
            <SelectTrigger className="w-full lg:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="w-full lg:w-auto"
            onClick={() => setSortOrder?.(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "asc" ? "Oldest" : "Newest"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="font-semibold">Loan ID</TableHead>
              <TableHead className="font-semibold">Applicant Name</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Loan Type</TableHead>
              <TableHead className="font-semibold">Loan Amount</TableHead>
              <TableHead className="font-semibold">Connector Name</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell className="py-6">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-8 w-28 bg-gray-200 rounded ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : data?.length ? (
              data.map((loan) => (
                <TableRow key={loan.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-mono text-xs text-gray-600">
                    {/* {shortId(loan.id)} */}
                    {loan.loanId}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {loan.applicantName || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700">{loan.phone || "-"}</TableCell>
                  <TableCell className="text-gray-700">{loan.loanType || "-"}</TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {loan.loanAmount || "-"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {loan.connectorName || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusVariant(loan.status)}>
                      {loan.status || "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{formatDate(loan.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/dashboard/loans/${loan.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                  No loans found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">Total {totalCount || 0} records</div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page</span>
            <Select value={`${limit}`} onValueChange={(v) => (setLimit?.(Number(v)), setPage?.(1))}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={limit} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 50].map((s) => (
                  <SelectItem key={s} value={`${s}`}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage?.(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              Page {page} of {pageCount}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage?.(page + 1)}
              disabled={page >= pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLoanManagementTable;

