"use client";

import React, { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCommission } from "@/hooks/useCommission";
import { useDSAList } from "@/hooks/dsa/useDSADataTable";
import { toast } from "react-hot-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Wallet, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Download,
  IndianRupee,
  MoreVertical,
  Banknote,
  Navigation
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import Spinner from "@/components/common/Spinners";

const formatDisplayDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function CommissionPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  
  const [activeTab, setActiveTab] = useState(isAdmin ? "manage" : "history");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDSA, setSelectedDSA] = useState("all");
  
  // Commission Logic
  const { useDisbursedLoans, useCommissionHistory, assignCommission, updatePaymentStatus } = useCommission();
  
  const filters = {
    status: statusFilter === "all" ? "" : statusFilter,
    connectorId: selectedDSA === "all" ? "" : selectedDSA,
  };

  const { data: disbursedLoans = [], isLoading: loadingDisbursed } = useDisbursedLoans(selectedDSA === "all" ? "" : selectedDSA);
  const { data: historyData, isLoading: loadingHistory } = useCommissionHistory(filters);
  const { dsaData: dsaList = [] } = useDSAList();

  const history = historyData?.data || [];
  const stats = historyData?.stats || { totalEarnings: 0, totalPaid: 0, totalPending: 0 };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredDisbursedLoans = useMemo(() => {
    return disbursedLoans.filter((loan) => {
      const matchesSearch =
        !normalizedSearch ||
        String(loan.loanId || "").toLowerCase().includes(normalizedSearch) ||
        String(loan.applicantName || "").toLowerCase().includes(normalizedSearch) ||
        String(loan.connectorId || "").toLowerCase().includes(normalizedSearch) ||
        String(loan.connectorName || "").toLowerCase().includes(normalizedSearch);

      const commissionStatus = loan.commission?.status || "unassigned";
      const matchesStatus = statusFilter === "all" || commissionStatus.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [disbursedLoans, normalizedSearch, statusFilter]);

  const filteredHistory = useMemo(() => {
    return history.filter((record) => {
      return (
        !normalizedSearch ||
        String(record.loanId || "").toLowerCase().includes(normalizedSearch) ||
        String(record.applicantName || "").toLowerCase().includes(normalizedSearch) ||
        String(record.connectorId || "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [history, normalizedSearch]);

  // Assignment Modal State
  const [assignModal, setAssignModal] = useState({ open: false, loan: null, amount: "" });
  const [paymentModal, setPaymentModal] = useState({ open: false, commission: null, mode: "UPI" });

  const handleAssign = () => {
    if (!assignModal.loan?.connectorId) {
      toast.error("Commission can only be assigned to loans linked with a DSA/connector");
      return;
    }

    if (!assignModal.amount || isNaN(assignModal.amount)) return;
    assignCommission.mutate({
      loanId: assignModal.loan.loanId,
      connectorId: assignModal.loan.connectorId,
      applicantName: assignModal.loan.applicantName,
      loanType: assignModal.loan.loanType,
      loanAmount: assignModal.loan.loanAmount,
      income: Number(assignModal.amount)
    }, {
      onSuccess: () => setAssignModal({ open: false, loan: null, amount: "" })
    });
  };

  const handleMarkPaid = () => {
    updatePaymentStatus.mutate({
      id: paymentModal.commission._id,
      status: "Paid",
      paymentMode: paymentModal.mode,
      paymentDate: new Date()
    }, {
      onSuccess: () => setPaymentModal({ open: false, commission: null, mode: "UPI" })
    });
  };

  const handleMarkPending = (commission) => {
    updatePaymentStatus.mutate({
      id: commission._id,
      status: "Pending",
      paymentMode: null,
      paymentDate: null
    });
  };

  if (loadingHistory && activeTab === "history") return <Spinner />;

  return (
    <div className="p-6 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Income Management</h1>
          <p className="text-slate-500 mt-1">Track and manage DSA commissions and payouts efficiently.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-white shadow-sm border-slate-200 hover:bg-slate-50 transition-all active:scale-95">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-blue-500 shadow-lg shadow-blue-500/5 bg-white/80 backdrop-blur-sm group hover:translate-y-[-2px] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Earnings</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Wallet className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹{stats.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
              <Navigation className="w-3 h-3 rotate-180" /> Lifetime revenue generated
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-green-500 shadow-lg shadow-green-500/5 bg-white/80 backdrop-blur-sm group hover:translate-y-[-2px] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Paid Commission</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹{stats.totalPaid.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
              Successfully disbursed and paid
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-amber-500 shadow-lg shadow-amber-500/5 bg-white/80 backdrop-blur-sm group hover:translate-y-[-2px] transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Payouts</CardTitle>
            <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">₹{stats.totalPending.toLocaleString()}</div>
            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
              Action required from Admin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card className="border-none shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white/50 space-y-4 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit self-start">
              {isAdmin && (
                <button 
                  onClick={() => setActiveTab("manage")}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "manage" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Manage Commissions
                </button>
              )}
              <button 
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "history" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {isAdmin ? "Payment History" : "My Income History"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Search customer..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-64 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
                />
              </div>

              {isAdmin && (
                <Select value={selectedDSA} onValueChange={setSelectedDSA}>
                  <SelectTrigger className="w-48 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20">
                    <div className="flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <SelectValue placeholder="All DSAs" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                    <SelectItem value="all">All DSAs</SelectItem>
                    {dsaList.map((dsa) => (
                      <SelectItem key={dsa._id} value={dsa.username}>{dsa.full_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20">
                   <div className="flex items-center gap-2">
                    <Banknote className="w-3.5 h-3.5 text-slate-400" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  {activeTab === "manage" && <SelectItem value="unassigned">Unassigned</SelectItem>}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-600 pl-6 h-12">Loan ID</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Customer Name</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Loan Details</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">DSA Details</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12 text-right">Commission</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12 text-center">Status</TableHead>
                {isAdmin && <TableHead className="font-semibold text-slate-600 h-12 text-right pr-6">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTab === "manage" ? (
                loadingDisbursed ? <TableRow><TableCell colSpan={7} className="h-32 text-center"><Spinner /></TableCell></TableRow> :
                filteredDisbursedLoans.length === 0 ? <TableRow><TableCell colSpan={7} className="h-32 text-center text-slate-400 font-medium">No disbursed loans found.</TableCell></TableRow> :
                filteredDisbursedLoans.map((loan) => (
                  <TableRow key={loan.loanId} className="group hover:bg-blue-50/30 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold text-blue-600 pl-6">{loan.loanId}</TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{loan.applicantName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-semibold text-slate-700">₹{Number(loan.loanAmount).toLocaleString()}</div>
                      <div className="text-xs text-slate-400">{loan.loanType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-700">{loan.connectorId || "Direct"}</div>
                      {loan.connectorName ? (
                        <div className="text-xs text-slate-400">{loan.connectorName}</div>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      {loan.commission ? (
                        <div className="font-bold text-slate-900">₹{loan.commission.income.toLocaleString()}</div>
                      ) : (
                        <span className="text-slate-300 italic text-sm">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {loan.commission ? (
                        <Badge className={`rounded-lg px-2.5 py-0.5 border-none ${loan.commission.status === "Paid" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}`}>
                          {loan.commission.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-400 border-slate-200">Unassigned</Badge>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right pr-6">
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled={!loan.connectorId}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100 rounded-lg h-8 gap-1.5 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200"
                            onClick={() => setAssignModal({ open: true, loan, amount: loan.commission?.income || "" })}
                          >
                            <IndianRupee className="w-3.5 h-3.5" /> 
                            {!loan.connectorId ? "No DSA" : loan.commission ? "Edit" : "Assign"}
                          </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                filteredHistory.length === 0 ? <TableRow><TableCell colSpan={7} className="h-32 text-center text-slate-400 font-medium">No payment records found.</TableCell></TableRow> :
                filteredHistory.map((record) => (
                  <TableRow key={record._id} className="group hover:bg-blue-50/30 transition-colors">
                    <TableCell className="font-mono text-xs font-semibold text-blue-600 pl-6">{record.loanId}</TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{record.applicantName}</div>
                      <div className="text-[10px] text-slate-400">{formatDisplayDate(record.createdAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-bold text-slate-700">₹{record.loanAmount?.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">{record.loanType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-700">{record.connectorId}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-slate-900 text-base">₹{record.income.toLocaleString()}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`rounded-lg px-3 py-1 border-none shadow-sm ${record.status === "Paid" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
                        {record.status}
                      </Badge>
                      {record.status === "Paid" && record.paymentMode && (
                        <div className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{record.paymentMode}</div>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right pr-6">
                        {record.status === "Pending" ? (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20 rounded-lg h-8 gap-1.5"
                            onClick={() => setPaymentModal({ open: true, commission: record, mode: "UPI" })}
                          >
                            Mark Paid
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg h-8"
                            onClick={() => handleMarkPending(record)}
                          >
                            Mark Pending
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assign Commission Modal */}
      <Dialog open={assignModal.open} onOpenChange={(val) => !val && setAssignModal({ open: false, loan: null, amount: "" })}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Assign Commission</DialogTitle>
            <DialogDescription>
              Assign or edit commission amount for loan <strong>{assignModal.loan?.loanId}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-blue-500" /> Commission Amount (INR)
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={assignModal.amount} 
                  onChange={(e) => setAssignModal({ ...assignModal, amount: e.target.value })}
                  placeholder="Enter amount (e.g. 5000)"
                  className="pl-4 h-12 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500/20 text-lg font-bold transition-all rounded-xl"
                  autoFocus
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 px-1 italic">
                 Note: Only disbursed loans are eligible for commission assignment.
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAssignModal({ open: false, loan: null, amount: "" })} className="rounded-xl px-6 border-slate-200">Cancel</Button>
            <Button 
              onClick={handleAssign} 
              disabled={assignCommission.isPending || !assignModal.amount}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl shadow-lg shadow-blue-600/20"
            >
              {assignCommission.isPending ? "Saving..." : "Save Commission"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModal.open} onOpenChange={(val) => !val && setPaymentModal({ open: false, commission: null, mode: "UPI" })}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Record Commission Payment</DialogTitle>
            <DialogDescription>
              Marking commission of <strong>₹{paymentModal.commission?.income.toLocaleString()}</strong> as Paid.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">Payment Mode</label>
              <Select value={paymentModal.mode} onValueChange={(val) => setPaymentModal({ ...paymentModal, mode: val })}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                  <SelectItem value="UPI">UPI (PhonePe / GooglePay)</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer (NEFT/IMPS)</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setPaymentModal({ open: false, commission: null, mode: "UPI" })} className="rounded-xl px-6 border-slate-200">Cancel</Button>
            <Button 
              onClick={handleMarkPaid} 
              disabled={updatePaymentStatus.isPending}
              className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-xl shadow-lg shadow-green-600/20"
            >
              {updatePaymentStatus.isPending ? "Processing..." : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
