"use client";

import React, { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import {
    TrendingUp, Users, FileText, RefreshCw, IndianRupee,
    HandCoins, Briefcase, Home, Car, Landmark, Users2, Target,
    CheckCircle, XCircle, Clock, ArrowUpRight, Activity, BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardStats } from "@/hooks/useDashboard";
import { useUserState } from "./store";

// ─── helpers ────────────────────────────────────────────
const fmt = (v = 0) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency", currency: "INR",
        minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(v);

const STATUS_COLORS = {
    Approved: "#10b981",
    Pending: "#f59e0b",
    Rejected: "#ef4444",
    Processing: "#3b82f6",
    Disbursed: "#8b5cf6",
};

const LOAN_TYPE_CONFIG = [
    { key: "Personal",  icon: Users,      color: "#ef4444", bg: "bg-red-50",     text: "text-red-600" },
    { key: "Business",  icon: Briefcase,  color: "#ec4899", bg: "bg-pink-50",    text: "text-pink-600" },
    { key: "Home",      icon: Home,       color: "#3b82f6", bg: "bg-blue-50",    text: "text-blue-600" },
    { key: "Vehicle",   icon: Car,        color: "#6b7280", bg: "bg-gray-50",    text: "text-gray-600" },
    { key: "Gold",      icon: HandCoins,  color: "#f97316", bg: "bg-orange-50",  text: "text-orange-600" },
    { key: "Group",     icon: Users2,     color: "#8b5cf6", bg: "bg-violet-50",  text: "text-violet-600" },
];

const CHART_COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899"];

// ─── Skeleton loader ─────────────────────────────────────
function StatSkeleton() {
    return (
        <Card>
            <CardContent className="pt-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-7 w-32 mb-2" />
                <Skeleton className="h-3 w-16" />
            </CardContent>
        </Card>
    );
}

// ─── Status badge ─────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        Approved: "bg-emerald-100 text-emerald-700",
        Pending: "bg-amber-100 text-amber-700",
        Rejected: "bg-red-100 text-red-700",
        Processing: "bg-blue-100 text-blue-700",
        Disbursed: "bg-violet-100 text-violet-700",
    };
    return (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] || "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

// ─── Main Dashboard ───────────────────────────────────────
export default function Dashboard() {
    const userState = useUserState();
    const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useGetDashboardStats();
    const stats = data?.data;

    const lastUpdated = dataUpdatedAt
        ? new Date(dataUpdatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        : null;

    // Build pie data for leads
    const leadPieData = stats?.leads?.byStatus
        ? Object.entries(stats.leads.byStatus).map(([name, value]) => ({ name, value }))
        : [];

    // Role badges
    const roleColors = {
        Admin: "bg-red-100 text-red-700",
        DSA: "bg-blue-100 text-blue-700",
        RM: "bg-green-100 text-green-700",
        Telecaller: "bg-purple-100 text-purple-700",
        Field_staff: "bg-orange-100 text-orange-700",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 sm:p-6">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Parv Financial Services
                    </h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                        Welcome back, <span className="font-semibold text-blue-600">{userState?.profile?.full_name || "Admin"}</span>
                        {lastUpdated && <span className="ml-2 text-gray-400">· Updated {lastUpdated}</span>}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="self-start sm:self-auto flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                    <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                    {isFetching ? "Refreshing…" : "Refresh"}
                </Button>
            </div>

            {/* ── Top KPI row ── */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Total disbursed */}
                {isLoading ? <StatSkeleton /> : (
                    <Card className="border-0 shadow-sm bg-white">
                        <CardContent className="pt-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Amount</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{fmt(stats?.totalAmount)}</p>
                                    <p className="text-xs text-gray-400 mt-1">{stats?.totalApplications?.toLocaleString()} applications</p>
                                </div>
                                <div className="p-2.5 bg-green-50 rounded-xl">
                                    <IndianRupee className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Total Leads */}
                {isLoading ? <StatSkeleton /> : (
                    <Card className="border-0 shadow-sm bg-white">
                        <CardContent className="pt-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Leads</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats?.leads?.total?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {stats?.leads?.byStatus?.new || 0} new this month
                                    </p>
                                </div>
                                <div className="p-2.5 bg-violet-50 rounded-xl">
                                    <Target className="h-5 w-5 text-violet-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Total Users */}
                {isLoading ? <StatSkeleton /> : (
                    <Card className="border-0 shadow-sm bg-white">
                        <CardContent className="pt-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Team Members</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats?.users?.total?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {stats?.users?.byRole?.DSA || 0} DSA · {stats?.users?.byRole?.RM || 0} RM
                                    </p>
                                </div>
                                <div className="p-2.5 bg-blue-50 rounded-xl">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Applications */}
                {isLoading ? <StatSkeleton /> : (
                    <Card className="border-0 shadow-sm bg-white">
                        <CardContent className="pt-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Applications</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats?.totalApplications?.toLocaleString() || 0}</p>
                                    <p className="text-xs text-gray-400 mt-1">Across all loan types</p>
                                </div>
                                <div className="p-2.5 bg-amber-50 rounded-xl">
                                    <FileText className="h-5 w-5 text-amber-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* ── Loan type breakdown ── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {LOAN_TYPE_CONFIG.map(({ key, icon: Icon, bg, text }) =>
                    isLoading ? (
                        <Card key={key} className="border-0 shadow-sm"><CardContent className="pt-4"><Skeleton className="h-4 w-16 mb-2" /><Skeleton className="h-5 w-20" /></CardContent></Card>
                    ) : (
                        <Card key={key} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                            <CardContent className="pt-4 pb-3">
                                <div className={`inline-flex p-2 rounded-lg ${bg} mb-2`}>
                                    <Icon className={`h-4 w-4 ${text}`} />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">{key} Loan</p>
                                <p className="text-sm font-bold text-gray-900">{fmt(stats?.typeWise?.[key]?.amount || 0)}</p>
                                <p className={`text-xs font-semibold ${text}`}>{stats?.typeWise?.[key]?.count || 0} apps</p>
                            </CardContent>
                        </Card>
                    )
                )}
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                {/* Line chart — monthly amounts */}
                <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            Monthly Loan Disbursement
                        </CardTitle>
                        <CardDescription>Last 12 months trend</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-56 w-full rounded-lg" /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={stats?.monthly || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                    <YAxis tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} tick={{ fontSize: 11 }} width={55} />
                                    <Tooltip
                                        formatter={(v) => [`₹${(v / 100000).toFixed(2)}L`, "Amount"]}
                                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                                    />
                                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2.5}
                                        dot={{ fill: "#3b82f6", r: 3 }} activeDot={{ r: 5 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Bar chart — monthly applications */}
                <Card className="border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BarChart3 className="h-4 w-4 text-emerald-600" />
                            Applications / Month
                        </CardTitle>
                        <CardDescription>Count by month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-56 w-full rounded-lg" /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={stats?.monthly || []} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                    <YAxis tick={{ fontSize: 11 }} />
                                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                                    <Bar dataKey="applications" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* ── Bottom row: recent apps + leads pie + user roles ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Recent Applications */}
                <Card className="lg:col-span-2 border-0 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Activity className="h-4 w-4 text-blue-600" />
                            Recent Applications
                        </CardTitle>
                        <CardDescription>Latest 5 loan submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-3">
                                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                                            <th className="pb-2 text-left font-medium">Applicant</th>
                                            <th className="pb-2 text-left font-medium hidden sm:table-cell">Type</th>
                                            <th className="pb-2 text-left font-medium">Amount</th>
                                            <th className="pb-2 text-left font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {(stats?.recentApplications || []).map((app) => (
                                            <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-2.5">
                                                    <p className="font-medium text-gray-800 text-sm">{app.applicantName || "—"}</p>
                                                    <p className="text-xs text-gray-400">{app.loanId}</p>
                                                </td>
                                                <td className="py-2.5 hidden sm:table-cell">
                                                    <Badge variant="outline" className="text-xs">{app.loanType}</Badge>
                                                </td>
                                                <td className="py-2.5 font-semibold text-gray-700 text-sm">
                                                    {app.loanAmount ? fmt(Number(app.loanAmount)) : "—"}
                                                </td>
                                                <td className="py-2.5">
                                                    <StatusBadge status={app.status} />
                                                </td>
                                            </tr>
                                        ))}
                                        {!stats?.recentApplications?.length && (
                                            <tr><td colSpan={4} className="py-8 text-center text-gray-400 text-sm">No applications yet</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right column — Lead status pie + User roles */}
                <div className="flex flex-col gap-4">
                    {/* Lead status pie */}
                    <Card className="border-0 shadow-sm bg-white flex-1">
                        <CardHeader className="pb-1">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Target className="h-4 w-4 text-violet-600" />
                                Leads by Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? <Skeleton className="h-36 w-full rounded-lg" /> : leadPieData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={160}>
                                    <PieChart>
                                        <Pie data={leadPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={64}
                                            dataKey="value" nameKey="name" paddingAngle={3}>
                                            {leadPieData.map((_, i) => (
                                                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 11 }} />
                                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm text-gray-400 text-center py-8">No lead data</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* User roles */}
                    <Card className="border-0 shadow-sm bg-white">
                        <CardHeader className="pb-1">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Users className="h-4 w-4 text-blue-600" />
                                Team Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="space-y-2">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-7 w-full rounded-lg" />)}</div>
                            ) : (
                                <div className="space-y-2">
                                    {Object.entries(stats?.users?.byRole || {}).map(([role, count]) => (
                                        <div key={role} className="flex items-center justify-between py-1">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleColors[role] || "bg-gray-100 text-gray-600"}`}>
                                                {role}
                                            </span>
                                            <span className="text-sm font-bold text-gray-700">{count}</span>
                                        </div>
                                    ))}
                                    {!Object.keys(stats?.users?.byRole || {}).length && (
                                        <p className="text-sm text-gray-400 text-center py-4">No users found</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
