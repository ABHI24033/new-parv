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
import { MoreHorizontal, Search, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from "lucide-react";
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

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await api.put(`/loans/${loanType}/${id}`, { status: newStatus });
            if (response.data.success) {
                toast.success(`Status updated to ${newStatus}`);
                refreshFn?.();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this loan?")) return;
        try {
            const response = await api.delete(`/loans/${loanType}/${id}`);
            if (response.data.success) {
                toast.success("Loan removed successfully");
                refreshFn?.();
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    const getStatusVariant = (st) => {
        switch (st?.toLowerCase()) {
            case "approved": return "bg-green-100 text-green-800 border-green-200";
            case "rejected": return "bg-red-100 text-red-800 border-red-200";
            case "disbursed": return "bg-blue-100 text-blue-800 border-blue-200";
            default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
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
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
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
                            <TableHead className="font-semibold">City</TableHead>
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
                                <TableRow key={loan._id}>
                                    <TableCell className="font-medium text-gray-900">{loan.applicant_name}</TableCell>
                                    <TableCell className="text-gray-600">{loan.phone_no}</TableCell>
                                    <TableCell className="font-semibold">₹{parseFloat(loan.loan_amount).toLocaleString()}</TableCell>
                                    <TableCell className="text-gray-600">{loan.present_city || loan.permanent_city || "-"}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusVariant(loan.status)}>
                                            {loan.status || "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                        {new Date(loan.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => window.location.href = `/dashboard/loans/${loan._id}`}>
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => window.location.href = `/dashboard/forms/${formKey}?edit=${loan._id}`}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuLabel className="text-xs font-normal text-gray-400">Update Status</DropdownMenuLabel>
                                                {["Pending", "Approved", "Disbursed", "Rejected"].map((s) => (
                                                    <DropdownMenuItem key={s} onClick={() => handleStatusUpdate(loan._id, s)}>
                                                        {s}
                                                    </DropdownMenuItem>
                                                ))}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => handleDelete(loan._id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
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
