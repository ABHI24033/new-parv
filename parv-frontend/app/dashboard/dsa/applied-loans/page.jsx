"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getLoanDataByType } from "@/lib/actions/dsa";
import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinners";

const PAGE_SIZE = 10;

const LoanTable = () => {
    const { user, loading } = useAuth();
    const [loans, setLoans] = useState([]);
    const [lastDocId, setLastDocId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const fetchLoans = useCallback(async (page, docId) => {
        if (!user?.username) return;

        setIsFetching(true);
        try {
            const res = await getLoanDataByType(null, user.username, PAGE_SIZE, docId, page);

            if (res.success) {
                if (page === 1) {
                    setLoans(res.data);
                } else {
                    setLoans((prev) => [...prev, ...res.data]);
                }
                setLastDocId(res.lastDocId);
                setHasMore(res.hasMore);
            }
        } catch (error) {
            console.error("Fetch loans error:", error);
        } finally {
            setIsFetching(false);
        }
    }, [user?.username]);

    useEffect(() => {
        if (!loading && user) {
            fetchLoans(1, null);
            setCurrentPage(1);
        }
    }, [user, loading, fetchLoans]);

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchLoans(nextPage, lastDocId);
    };

    if (loading) return <Spinner />;
    if (!user) return <div className="p-8 text-center text-red-500">Please log in to view your applications.</div>;

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Applied Loans</h2>
                <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-100">
                    DSA: {user.username}
                </Badge>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Sr.no</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Date</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Applicant's Name</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Phone</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Loan ID</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Loan Amount</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Loan Type</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {loans.length > 0 ? (
                            loans.map((loan, index) => (
                                <tr key={loan.id ?? index} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">
                                        {loan.createdAt ? new Date(loan.createdAt).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{loan.applicantName || "-"}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{loan.phone || "-"}</td>
                                    <td className="px-4 py-4 text-sm font-mono text-slate-500 whitespace-nowrap">{loan.loanId || "-"}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
                                        {loan.loanAmount ? `Rs. ${Number(loan.loanAmount).toLocaleString()}` : "-"}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">
                                        <Badge variant="secondary" className="font-normal">
                                            {loan.loanType || "-"}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <Badge
                                            className={`font-semibold ${
                                                loan?.status === "Disbursed" ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" :
                                                loan?.status === "Rejected" ? "bg-red-100 text-red-700 hover:bg-red-200 border-red-200" :
                                                "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200"
                                            }`}
                                        >
                                            {loan?.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <Link
                                            href={`/dashboard/loans/${loan.id}`}
                                            className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-4 py-12 text-center text-slate-400 font-medium bg-slate-50/30">
                                    {isFetching ? "Syncing data..." : "No loan applications found for your account."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {hasMore && (
                    <div className="py-6 flex justify-center bg-slate-50/50 border-t border-slate-100">
                        <button
                            onClick={handleLoadMore}
                            disabled={isFetching}
                            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 active:scale-95"
                        >
                            {isFetching ? "Loading..." : "Load More Applications"}
                        </button>
                    </div>
                )}
            </div>
            {/* Pagination component is optional here since we use Load More, but kept for UI consistency if needed */}
            {/* <Pagination /> */}
        </div>
    );
};

export default LoanTable;
