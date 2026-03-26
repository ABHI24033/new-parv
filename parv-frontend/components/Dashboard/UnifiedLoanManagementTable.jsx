"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/api";
import DeleteAlertModal from "@/components/common/DeleteAlertModal";
import { useAuth } from "@/context/AuthContext";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOAN_TYPE_OPTIONS, STATUS_OPTIONS } from "@/hooks/useUnifiedLoans";

const getStatusVariant = (st) => {
  switch (String(st || "").toLowerCase()) {
    case "application received":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "in progress at parv":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "applied to bank":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "pendency":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "sanctioned":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "disbursed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    // Backward-compatible legacy statuses
    case "pending":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "approved":
      return "bg-violet-100 text-violet-800 border-violet-200";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
};

const formatINR = (value) => {
  if (value === null || value === undefined) return "-";
  const asString = String(value).trim();
  if (!asString) return "-";
  const n = typeof value === "number" ? value : Number(String(value || "").replace(/,/g, ""));
  if (!Number.isFinite(n)) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
};

const formatDate = (dateValue) => {
  if (!dateValue) return "-";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString();
};

const toFormKey = (loanType) => {
  const normalized = String(loanType || "").toLowerCase();
  if (!normalized) return "";
  return `${normalized.split(" ")[0]}_loan`;
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
  refreshData,
}) => {
  const { user } = useAuth();
  const [deleteModal, setDeleteModal] = useState({ open: false, loanId: null, applicantName: "" });
  const [isDeleting, setIsDeleting] = useState(false);
  const pageCount = Math.max(Math.ceil((totalCount || 0) / (limit || 10)), 1);
  const role = String(user?.role || "").toLowerCase();
  const canManageLoans = role === "admin" || role === "rm";

  const handleDelete = async (loanId) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/loans/${loanId}`);
      if (response.data?.success) {
        setDeleteModal({ open: false, loanId: null, applicantName: "" });
        toast.success("Deleted successfully");
        refreshData?.();
      } else {
        toast.error(response.data?.message || "Failed to delete loan");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete loan");
    } finally {
      setIsDeleting(false);
    }
  };

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
                    {formatINR(loan.loanAmount)}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {loan.connectorName || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusVariant(loan.status)}>
                      {loan.status || "Application Received"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{formatDate(loan.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Open actions">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/loans/${loan.id}`} className="flex items-center gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        {canManageLoans && (
                          <React.Fragment>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/forms/${toFormKey(loan.loanType)}?edit=${loan.id}`}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Pencil className="h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                              disabled={isDeleting}
                              onClick={() => {
                                setDeleteModal({
                                  open: true,
                                  loanId: loan.id,
                                  applicantName: loan.applicantName || loan.loanId || "this loan",
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </React.Fragment>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      <DeleteAlertModal
        open={deleteModal.open}
        onOpenChange={(open) =>
          !isDeleting && setDeleteModal((prev) => ({ ...prev, open, ...(open ? {} : { loanId: null, applicantName: "" }) }))
        }
        loading={isDeleting}
        title="Delete loan application?"
        description={`This will permanently remove ${deleteModal.applicantName || "this loan"} from the table. Please confirm to continue.`}
        confirmText="Confirm Delete"
        onConfirm={() => deleteModal.loanId && handleDelete(deleteModal.loanId)}
      />
    </div>
  );
};

export default UnifiedLoanManagementTable;
