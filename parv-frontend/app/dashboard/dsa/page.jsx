"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinners";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, CreditCard, FileText, TrendingUp } from "lucide-react";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-IN");
};

export default function DSADashboardPage() {
  const { user, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [commissionData, setCommissionData] = useState({ data: [], stats: { totalEarnings: 0, totalPaid: 0, totalPending: 0 } });
  const [recentLoans, setRecentLoans] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDashboard = async () => {
      if (!user?.username) return;

      try {
        setPageLoading(true);
        setError("");

        const [dashboardRes, commissionRes, loansRes] = await Promise.all([
          api.get(`/users/dashboard/${user.username}`),
          api.get("/users/commissions/history"),
          api.get("/users/loans", { params: { pageSize: 5 } }),
        ]);

        if (cancelled) return;

        setDashboardData(dashboardRes.data?.data || null);
        setCommissionData(
          commissionRes.data || { data: [], stats: { totalEarnings: 0, totalPaid: 0, totalPending: 0 } }
        );
        setRecentLoans(loansRes.data?.data || []);
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError?.response?.data?.message || "Failed to load dashboard");
        }
      } finally {
        if (!cancelled) setPageLoading(false);
      }
    };

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, [user?.username]);

  const monthlyIncome = useMemo(() => {
    return dashboardData?.chartData?.slice(-6) || [];
  }, [dashboardData]);

  if (loading || pageLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div className="p-10 text-center text-slate-500 font-bold">Please log in to view your dashboard.</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 space-y-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">DSA Dashboard</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {user.full_name || user.username}
          </h1>
          <p className="text-slate-500 mt-2">Track your applications, commission status, and payout progress.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="bg-white">
            <Link href="/dashboard/dsa/applied-loans">View Applied Loans</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/commissions">Open Income</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500">Total Applications</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">{dashboardData?.totalApplications || 0}</div>
              <p className="text-sm text-slate-500 mt-1">Applications linked to your DSA ID</p>
            </div>
            <FileText className="h-10 w-10 text-blue-600" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500">Disbursed Loans</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">{dashboardData?.approvedApplications || 0}</div>
              <p className="text-sm text-slate-500 mt-1">Loans completed and eligible for payout</p>
            </div>
            <CreditCard className="h-10 w-10 text-emerald-600" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500">Paid Commission</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">
                {formatMoney(commissionData?.stats?.totalPaid)}
              </div>
              <p className="text-sm text-slate-500 mt-1">Already paid by admin</p>
            </div>
            <CircleDollarSign className="h-10 w-10 text-green-600" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-slate-500">Pending Commission</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">
                {formatMoney(commissionData?.stats?.totalPending)}
              </div>
              <p className="text-sm text-slate-500 mt-1">Assigned but not paid yet</p>
            </div>
            <TrendingUp className="h-10 w-10 text-amber-600" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black text-slate-900">Recent Applications</CardTitle>
            <Button asChild variant="ghost" className="text-blue-600">
              <Link href="/dashboard/dsa/applied-loans">See all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentLoans.length === 0 ? (
              <div className="py-10 text-center text-slate-400 font-medium">No applications found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="py-3 pr-4 font-semibold">Loan ID</th>
                      <th className="py-3 pr-4 font-semibold">Applicant</th>
                      <th className="py-3 pr-4 font-semibold">Type</th>
                      <th className="py-3 pr-4 font-semibold">Status</th>
                      <th className="py-3 font-semibold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLoans.map((loan) => (
                      <tr key={loan.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-4 pr-4 font-mono text-blue-600">{loan.loanId || "-"}</td>
                        <td className="py-4 pr-4 font-medium text-slate-900">{loan.applicantName || "-"}</td>
                        <td className="py-4 pr-4 text-slate-600">{loan.loanType || "-"}</td>
                        <td className="py-4 pr-4">
                          <Badge variant="outline">{loan.status || "-"}</Badge>
                        </td>
                        <td className="py-4 text-slate-600">{formatDate(loan.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-black text-slate-900">Monthly Income Trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyIncome.length === 0 ? (
              <div className="py-10 text-center text-slate-400 font-medium">No income trend data yet.</div>
            ) : (
              monthlyIncome.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className="text-slate-500">{formatMoney(item.income)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${Math.max(
                          8,
                          (Number(item.income || 0) / Math.max(...monthlyIncome.map((x) => Number(x.income || 0)), 1)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
