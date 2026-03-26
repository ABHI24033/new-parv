"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Search, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react";
import api from "@/api/api";
import toast from "react-hot-toast";

const LoanManagementTable = ({
    title,
    data,
    totalCount,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    onSearch,
    handleSearch,
    status,
    setStatus,
    loanType,
    onRefresh,
    refreshData
}) => {
    const searchFn = onSearch || handleSearch;
    const refreshFn = onRefresh || refreshData;
    const formKey = loanType?.includes("_loan") ? loanType : `${loanType}_loan`;

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this loan?")) return;
        try {
            const response = await api.delete(`/loans/${id}`);
            if (response.data.success) {
                toast.success("Loan removed successfully");
                refreshFn?.();
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

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
            case "disbursed":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200";
            // Legacy backward compatible statuses
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
        const n =
            typeof value === "number" ? value : Number(asString.replace(/,/g, ""));
        if (!Number.isFinite(n)) return "-";
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(n);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search name or phone..."
                            className="pl-10"
                            onChange={(e) => searchFn?.(e.target.value)}
                        />
                    </div>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Application Received">Application Received</SelectItem>
                            <SelectItem value="In Progress at PARV">In Progress at PARV</SelectItem>
                            <SelectItem value="Applied to Bank">Applied to Bank</SelectItem>
                            <SelectItem value="Pendency">Pendency</SelectItem>
                            <SelectItem value="Sanctioned">Sanctioned</SelectItem>
                            <SelectItem value="Disbursed">Disbursed</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="font-semibold">Applicant</TableHead>
                            <TableHead className="font-semibold">Contact</TableHead>
                            <TableHead className="font-semibold">Amount</TableHead>
                            <TableHead className="font-semibold">Connector</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: limit }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 7 }).map((_, j) => (
                                        <TableCell key={j}><div className="h-4 bg-gray-100 animate-pulse rounded" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                                    No records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell className="font-medium text-gray-900">{loan.applicantName || "-"}</TableCell>
                                    <TableCell className="text-gray-600">{loan.phone || "-"}</TableCell>
                                    <TableCell className="font-semibold">{formatINR(loan.loanAmount || loan.amount || loan.loan_amount)}</TableCell>
                                    <TableCell className="text-gray-600">{loan.connectorName || "-"}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusVariant(loan.status)}>
                                            {loan.status || "Application Received"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                        {loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => window.location.href = `/dashboard/loans/${loan.id}`}>
                                                    <Eye className="mr-2 h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.location.href = `/dashboard/forms/${formKey}?edit=${loan.id}`}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(loan.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-gray-500">
                    Total {totalCount} records
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Rows per page</span>
                        <Select value={`${limit}`} onValueChange={(v) => setLimit(Number(v))}>
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={limit} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 50].map((s) => (
                                    <SelectItem key={s} value={`${s}`}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">Page {page} of {Math.ceil(totalCount / limit) || 1}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= Math.ceil(totalCount / limit)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanManagementTable;
