"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MoreVertical,
  Eye,
  Trash2,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Phone,
  ArrowUpDown
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loanEnquiryApi } from "@/lib/api/loanEnquiry";
import { formatDateToString } from "@/lib/dateformate";
import { LoanEnquiryDetailModal } from "./LoanEnquiryDetailModal";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function LoanEnquiryTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10
  });

  const [filters, setFilters] = useState({
    search: "",
    loanType: "all",
    status: "all"
  });

  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pagination.limit,
        search: filters.search,
        loanType: filters.loanType === "all" ? "" : filters.loanType,
        status: filters.status === "all" ? "" : filters.status
      };
      const res = await loanEnquiryApi.getAll(params);
      setData(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Failed to load loan enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(1);
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [filters]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    // Optimistic update
    const previousData = [...data];
    setData(data.filter(item => item._id !== deleteId));

    try {
      await loanEnquiryApi.delete(deleteId);
      toast.success("Enquiry deleted successfully");
    } catch (error) {
      setData(previousData); // Rollback
      toast.error("Failed to delete enquiry");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = ["Name", "Phone", "Email", "Loan Type", "Amount", "Date", "Status"];
    const csvData = data.map(item => [
      item.fullName,
      item.phone,
      item.email,
      item.loanProduct,
      item.loanAmount,
      item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
      item.status
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `loan_enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 capitalize">Approved</Badge>;
      case "rejected": return <Badge variant="destructive" className="capitalize">Rejected</Badge>;
      case "pending": return <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 capitalize">Pending</Badge>;
      default: return <Badge variant="secondary" className="capitalize">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Loan Enquiries</h2>
          <p className="text-sm text-muted-foreground font-medium">
            Total {pagination.totalCount} enquiries found
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={exportToCSV} className="gap-2 h-10 shadow-sm">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or phone..."
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <Select
              value={filters.loanType}
              onValueChange={(val) => setFilters(prev => ({ ...prev, loanType: val }))}
            >
              <SelectTrigger className="h-10 bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Loan Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loan Types</SelectItem>
                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                <SelectItem value="Business Loan">Business Loan</SelectItem>
                <SelectItem value="Home Loan">Home Loan</SelectItem>
                <SelectItem value="Mortgage Loan">Mortgage Loan</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status}
              onValueChange={(val) => setFilters(prev => ({ ...prev, status: val }))}
            >
              <SelectTrigger className="h-10 bg-slate-50 border-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" onClick={() => setFilters({ search: "", loanType: "all", status: "all" })} className="h-10">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area - Responsive Table/Cards */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-slate-700">Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Phone</TableHead>
                <TableHead className="font-semibold text-slate-700">Loan Type</TableHead>
                <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center text-muted-foreground italic">
                    No loan enquiries found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item._id} className="hover:bg-slate-50/80 transition-colors group">
                    <TableCell className="font-medium text-slate-900 py-4">{item.fullName}</TableCell>
                    <TableCell className="text-slate-600">{item.phone}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        {item.loanProduct}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-slate-900">₹ {item.loanAmount}</TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDateToString(item.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-100 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => { setSelectedEnquiry(item); setIsModalOpen(true); }} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(item._id)}
                            className="cursor-pointer text-red-600 focus:text-red-600"
                          >
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

        {/* Mobile Stacked Card View */}
        <div className="md:hidden p-4 space-y-4 bg-slate-50">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-sm border-slate-200">
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))
          ) : data.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground italic bg-white rounded-lg border">
              No loan enquiries found.
            </div>
          ) : (
            data.map((item) => (
              <Card key={item._id} className="shadow-sm border-slate-200 relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.fullName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" /> {item.phone}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 mb-3">
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold">Loan Type</p>
                      <p className="text-sm font-medium text-slate-800">{item.loanProduct}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold">Amount</p>
                      <p className="text-sm font-bold text-slate-900">₹ {item.loanAmount}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {formatDateToString(item.createdAt)}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setSelectedEnquiry(item); setIsModalOpen(true); }} className="h-8 py-0 px-2 text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDeleteId(item._id)} className="h-8 py-0 px-2 text-xs text-red-600 border-red-100 hover:bg-red-50">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
            ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {!loading && data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-slate-500 order-2 sm:order-1">
            Showing <span className="font-medium text-slate-900">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{" "}
            <span className="font-medium text-slate-900">
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)}
            </span> of <span className="font-medium text-slate-900">{pagination.totalCount}</span> enquiries
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage === 1}
              onClick={() => fetchData(pagination.currentPage - 1)}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.currentPage) <= 1)
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="text-slate-300">...</span>}
                    <Button
                      variant={pagination.currentPage === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => fetchData(p)}
                      className={`h-9 w-9 p-0 ${pagination.currentPage === p ? "bg-blue-600" : ""}`}
                    >
                      {p}
                    </Button>
                  </React.Fragment>
                ))
              }
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => fetchData(pagination.currentPage + 1)}
              className="h-9 px-3"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <LoanEnquiryDetailModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        enquiry={selectedEnquiry}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the loan enquiry
              for <span className="font-semibold text-slate-900">
                {data.find(i => i._id === deleteId)?.fullName}
              </span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>Cancel</Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete Enquiry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
