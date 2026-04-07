"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, FileText } from "lucide-react";
import api from "@/api/api";

export default function UserLoansModal({ isOpen, onClose, userId, userName }) {
    const [loans, setLoans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && userId) {
            fetchUserLoans();
        }
    }, [isOpen, userId]);

    const fetchUserLoans = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await api.get(`/admin/applied-loans?createdById=${userId}`);
            if (response.data?.success) {
                setLoans(response.data.data);
            } else {
                throw new Error(response.data?.message || "Failed to fetch loans");
            }
        } catch (err) {
            console.error("Error fetching user loans:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const s = String(status).toLowerCase();
        if (s.includes("received")) return "bg-blue-100 text-blue-700 border-blue-200";
        if (s.includes("progress")) return "bg-yellow-100 text-yellow-700 border-yellow-200";
        if (s.includes("sanctioned") || s.includes("approved")) return "bg-green-100 text-green-700 border-green-200";
        if (s.includes("disbursed")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
        if (s.includes("rejected")) return "bg-red-100 text-red-700 border-red-200";
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Loans Applied by {userName}
                    </DialogTitle>
                    <DialogDescription>
                        Showing all loan applications submitted by this user.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                        <p className="text-slate-500 font-medium">Loading loans...</p>
                    </div>
                ) : error ? (
                    <div className="py-10 text-center">
                        <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block border border-red-100">
                            Error: {error}
                        </p>
                    </div>
                ) : loans.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                        <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600">No Loans Found</h3>
                        <p className="text-slate-400">This user hasn't submitted any loan applications yet.</p>
                    </div>
                ) : (
                    <div className="mt-4 border rounded-xl overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="font-bold text-slate-700">Loan ID</TableHead>
                                    <TableHead className="font-bold text-slate-700">Customer Name</TableHead>
                                    <TableHead className="font-bold text-slate-700">Type</TableHead>
                                    <TableHead className="font-bold text-slate-700">Amount</TableHead>
                                    <TableHead className="font-bold text-slate-700">Status</TableHead>
                                    <TableHead className="font-bold text-slate-700">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loans.map((loan) => (
                                    <TableRow key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-blue-700">{loan.loanId}</TableCell>
                                        <TableCell className="font-medium text-slate-900">{loan.applicantName}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-slate-50">{loan.loanType}</Badge>
                                        </TableCell>
                                        <TableCell className="font-semibold text-slate-900">
                                            ₹{Number(loan.loanAmount).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${getStatusColor(loan.status)} border shadow-none font-medium`}>
                                                {loan.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 whitespace-nowrap">
                                            {loan.createdAt ? new Date(loan.createdAt).toLocaleDateString('en-GB', { 
                                                day: '2-digit', 
                                                month: 'short', 
                                                year: 'numeric' 
                                            }) : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
