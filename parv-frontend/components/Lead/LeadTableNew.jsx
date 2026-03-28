"use client";

import React, { useState, useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
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
  Pencil,
  MessageSquare,
  IndianRupee,
  FileText
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
import { useGetLeads, useDeleteLead } from "@/hooks/useLead";
import { formatDateToString } from "@/lib/dateformate";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import LeadForm from "./LeadForm";
import RemarksModal from "../common/RemarksModal";
import { useUserState } from "@/app/dashboard/store";
import { LeadDialog } from "./LeadModels";

export default function LeadTableNew() {
  const [filters, setFilters] = useState({
    search: "",
    loanProduct: "all",
    leadStatus: "all",
    currentPage: 1,
    pageSize: 10
  });

  const [deleteId, setDeleteId] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: leadsData, isLoading, refetch } = useGetLeads({
    pageSize: filters.pageSize,
    currentPage: filters.currentPage,
    search: filters.search,
    loanProduct: filters.loanProduct,
    leadStatus: filters.leadStatus
  });

  const deleteLeadMutation = useDeleteLead();
  const user = useUserState();

  const leads = leadsData?.data || [];
  const pagination = leadsData?.pagination || {
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    limit: 10
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    deleteLeadMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Lead deleted successfully");
        setDeleteId(null);
        setIsDeleting(false);
      },
      onError: () => {
        setIsDeleting(false);
      }
    });
  };

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s?.includes("positive") || s?.includes("won") || s?.includes("interested")) 
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 capitalize">{status}</Badge>;
    if (s?.includes("negative") || s?.includes("lost") || s?.includes("rejected")) 
      return <Badge variant="destructive" className="capitalize">{status}</Badge>;
    if (s?.includes("warm") || s?.includes("pending") || s?.includes("follow")) 
      return <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 capitalize">{status}</Badge>;
    return <Badge variant="secondary" className="capitalize">{status}</Badge>;
  };

  const handleExport = () => {
    // Basic CSV export logic
    if (leads.length === 0) return;
    const headers = ["Lead Name", "Contact", "Loan Product", "Profession", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...leads.map(l => [
        l.leadName,
        l.contactNo,
        l.loanProduct,
        l.profession,
        l.leadStatus,
        l.date
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-10 h-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, currentPage: 1 }))}
              />
            </div>
            <Select 
              value={filters.loanProduct} 
              onValueChange={(val) => setFilters(prev => ({ ...prev, loanProduct: val, currentPage: 1 }))}
            >
              <SelectTrigger className="h-10 bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Loan Product" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                <SelectItem value="Business Loan">Business Loan</SelectItem>
                <SelectItem value="Home Loan">Home Loan</SelectItem>
                <SelectItem value="Mortgage Loan">Mortgage Loan</SelectItem>
              </SelectContent>
            </Select>
            <Select 
               value={filters.leadStatus} 
               onValueChange={(val) => setFilters(prev => ({ ...prev, leadStatus: val, currentPage: 1 }))}
            >
              <SelectTrigger className="h-10 bg-slate-50 border-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Interested">Interested</SelectItem>
                <SelectItem value="Follow Up">Follow Up</SelectItem>
                <SelectItem value="Won">Won</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport} className="flex-1 h-10 gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button variant="secondary" onClick={() => setFilters({search: "", loanProduct: "all", leadStatus: "all", currentPage: 1, pageSize: 10})} className="h-10">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Area */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700">Lead Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                <TableHead className="font-semibold text-slate-700">Loan Product</TableHead>
                <TableHead className="font-semibold text-slate-700">Profession</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                <TableHead className="text-right font-semibold text-slate-700 pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center text-muted-foreground italic">
                    No leads found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead._id} className="hover:bg-slate-50/80 transition-colors group">
                    <TableCell className="font-medium text-slate-900 py-4">{lead.leadName}</TableCell>
                    <TableCell className="text-slate-600">{lead.contactNo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        {lead.loanProduct}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{lead.profession}</TableCell>
                    <TableCell>{getStatusBadge(lead.leadStatus)}</TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {lead.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <LeadDialog lead={lead} />
                        <RemarksModal
                          leadId={lead?._id}
                          remarks={lead?.remarks}
                          user={user?.profile}
                          fetchLeads={refetch}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditLead(lead)} className="cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setDeleteId(lead._id)} className="cursor-pointer text-red-600 focus:text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden p-4 space-y-4 bg-slate-50">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-sm border-slate-200">
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : leads.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground italic bg-white rounded-lg border">
              No leads found.
            </div>
          ) : (
            leads.map((lead) => (
              <Card key={lead._id} className="shadow-sm border-slate-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{lead.leadName}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {lead.contactNo}
                      </p>
                    </div>
                    {getStatusBadge(lead.leadStatus)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 mb-3">
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold">Product</p>
                      <p className="text-xs font-medium">{lead.loanProduct}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground font-semibold">Date</p>
                      <p className="text-xs font-medium">{lead.date}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400">ID: {lead._id.slice(-6)}</span>
                    <div className="flex gap-2">
                       <LeadDialog lead={lead} />
                       <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setEditLead(lead)}>
                         <Pencil className="h-3.5 w-3.5" />
                       </Button>
                       <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 border-red-50" onClick={() => setDeleteId(lead._id)}>
                         <Trash2 className="h-3.5 w-3.5" />
                       </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && leads.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <p className="text-sm text-slate-500 order-2 sm:order-1">
            Showing <span className="font-medium text-slate-900">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to{" "}
            <span className="font-medium text-slate-900">
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalCount)}
            </span> of <span className="font-medium text-slate-900">{pagination.totalCount}</span> leads
          </p>
          <div className="flex items-center gap-2 order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage === 1}
              onClick={() => setFilters(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
              className="h-9 px-3"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="flex items-center gap-1 mx-2">
               {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.currentPage) <= 1)
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx-1] !== p - 1 && <span className="text-slate-300">...</span>}
                    <Button
                      variant={pagination.currentPage === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, currentPage: p }))}
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
              onClick={() => setFilters(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
              className="h-9 px-3"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Edit Form Dialog */}
      {editLead && (
        <Dialog open={!!editLead} onOpenChange={(o) => !o && setEditLead(null)}>
          <DialogContent className="max-h-[90vh] w-full md:max-w-5xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Lead: {editLead.leadName}</DialogTitle>
            </DialogHeader>
            <LeadForm
              setOpen={() => setEditLead(null)}
              defaultValues={editLead}
              onSuccess={refetch}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Modal */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lead? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button 
               onClick={handleDelete} 
               disabled={isDeleting}
               className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
