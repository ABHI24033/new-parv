"use client";

import { useState } from "react";
import {
  useJobApplications,
  useJobApplicationStats,
  useDeleteJobApplication,
  useHardDeleteJobApplication,
  useUpdateJobApplicationStatus,
} from "@/hooks/useJobApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Trash,
  Briefcase,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { DateFormatter } from "@/lib/utils";
import toast from "react-hot-toast";

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "reviewing", label: "Reviewing", color: "bg-blue-100 text-blue-800" },
  { value: "shortlisted", label: "Shortlisted", color: "bg-purple-100 text-purple-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  { value: "hired", label: "Hired", color: "bg-green-100 text-green-800" },
];

const positionOptions = [
  "Loan Officer",
  "DSA Manager",
  "Field Executive",
  "Customer Service Representative",
  "Marketing Specialist",
  "Operations Manager",
  "Other",
];

export default function JobApplicationsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hardDeleteDialogOpen, setHardDeleteDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const limit = 15;

  const { data, isLoading, error } = useJobApplications({
    page,
    limit,
    status: statusFilter,
    position: positionFilter,
    search: search || undefined,
  });

  const { data: statsData } = useJobApplicationStats();

  const deleteMutation = useDeleteJobApplication();
  const hardDeleteMutation = useHardDeleteJobApplication();
  const updateStatusMutation = useUpdateJobApplicationStatus();

  const applications = data?.data || [];
  const pagination = data?.pagination || {};
  const stats = statsData?.data || {};

  const handleDelete = async () => {
    if (!selectedApplication) return;
    try {
      await deleteMutation.mutateAsync(selectedApplication._id);
      toast.success("Application deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const handleHardDelete = async () => {
    if (!selectedApplication) return;
    try {
      await hardDeleteMutation.mutateAsync(selectedApplication._id);
      toast.success("Application permanently deleted");
      setHardDeleteDialogOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      toast.error("Failed to permanently delete application");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return (
      <Badge className={option?.color || "bg-gray-100 text-gray-800"}>
        {option?.label || status}
      </Badge>
    );
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPositionFilter("");
    setPage(1);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Applications</h1>
        <p className="text-slate-600">Manage and review job applications from candidates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-2xl font-bold">{stats.total || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending || 0}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Reviewing</p>
                <p className="text-2xl font-bold">{stats.reviewing || 0}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Hired</p>
                <p className="text-2xl font-bold">{stats.hired || 0}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected || 0}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter || "all"} onValueChange={(val) => setStatusFilter(val === "all" ? "" : val)}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={positionFilter || "all"} onValueChange={(val) => setPositionFilter(val === "all" ? "" : val)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {positionOptions.map((pos) => (
                  <SelectItem key={pos} value={pos}>
                    {pos}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Failed to load applications
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No applications found
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.fullName}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {app.city}, {app.state}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {app.email}
                          </p>
                          <p className="flex items-center gap-1 text-slate-500">
                            <Phone className="h-3 w-3" />
                            {app.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{app.position}</TableCell>
                      <TableCell>{app.experience} years</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell>
                        {DateFormatter(app.createdAt)}
                      </TableCell>
                      <TableCell>
                        {app.resumeUrl ? (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                          >
                            <FileText className="h-4 w-4" />
                            View Resume
                          </a>
                        ) : (
                          <span className="text-slate-400 text-sm">No resume</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedApplication(app);
                                setViewDialogOpen(true);
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-semibold text-slate-700">
                              Change Status
                            </DropdownMenuItem>
                            {statusOptions.map((opt) => (
                              <DropdownMenuItem
                                key={opt.value}
                                onClick={() => handleStatusChange(app._id, opt.value)}
                                disabled={app.status === opt.value}
                                className={
                                  app.status === opt.value ? "bg-slate-100" : ""
                                }
                              >
                                <div className={`w-2 h-2 rounded-full mr-2 ${opt.color.split(' ')[0].replace('bg-', 'bg-').replace('100', '500')}`} />
                                {opt.label}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedApplication(app);
                                setDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedApplication(app);
                                setHardDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Permanent Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-slate-600">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, pagination.totalCount || 0)} of{" "}
                  {pagination.totalCount || 0} applications
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {page} of {pagination.totalPages || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages || 1, p + 1))
                    }
                    disabled={page >= (pagination.totalPages || 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Full Name</p>
                  <p className="font-medium">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="font-medium">
                    {selectedApplication.city}, {selectedApplication.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Position</p>
                  <p className="font-medium">{selectedApplication.position}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Experience</p>
                  <p className="font-medium">{selectedApplication.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Applied On</p>
                  <p className="font-medium">
                    {DateFormatter(selectedApplication.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Resume</p>
                  {selectedApplication.resumeUrl ? (
                    <a
                      href={selectedApplication.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <FileText className="h-5 w-5" />
                      View/Download Resume
                    </a>
                  ) : (
                    <p className="text-slate-400">No resume uploaded</p>
                  )}
                </div>
              </div>
              {selectedApplication.message && (
                <div>
                  <p className="text-sm text-slate-600">Message</p>
                  <p className="text-sm bg-slate-50 p-3 rounded-lg mt-1">
                    {selectedApplication.message}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Soft Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application? This action can be
              undone by an admin.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hard Delete Confirmation */}
      <Dialog open={hardDeleteDialogOpen} onOpenChange={setHardDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permanently Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this application? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHardDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleHardDelete}
              disabled={hardDeleteMutation.isPending}
            >
              {hardDeleteMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
