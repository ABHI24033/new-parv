"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MONEY_KEYWORDS = ["amount", "emi", "cost", "turnover", "income", "need", "loan"];

const normalizeFormData = (value, key = "") => {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeFormData(item, key));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((acc, [childKey, childValue]) => {
      acc[childKey] = normalizeFormData(childValue, childKey);
      return acc;
    }, {});
  }

  if (typeof value === "string") {
    const looksLikeMoney = MONEY_KEYWORDS.some((token) =>
      String(key || "").toLowerCase().includes(token)
    );
    return looksLikeMoney ? value.replace(/[^0-9.-]/g, "") : value;
  }

  return value;
};

export function LoanFormPageClient({
  expectedLoanKey,
  FormComponent,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);
  const role = String(user?.role || "").toLowerCase();
  const canManageLoans = role === "admin" || role === "rm";

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState("");
  const [loanData, setLoanData] = useState(null);

  useEffect(() => {
    let ignore = false;

    const loadLoan = async () => {
      if (!editId) return;
      if (!canManageLoans) {
        setError("Only Admin and RM can edit loan applications.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/loans/${editId}`);
        if (!res.data?.success) {
          throw new Error(res.data?.message || "Failed to load loan details");
        }

        const fetchedLoanKey = res.data.loanKey;
        if (fetchedLoanKey && expectedLoanKey && fetchedLoanKey !== expectedLoanKey) {
          router.replace(`/dashboard/forms/${fetchedLoanKey}_loan?edit=${editId}`);
          return;
        }

        if (!ignore) {
          setLoanData(normalizeFormData(res.data.data || {}));
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || err?.message || "Failed to load loan details");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (!authLoading) {
      loadLoan();
    }

    return () => {
      ignore = true;
    };
  }, [authLoading, canManageLoans, editId, expectedLoanKey, router]);

  const content = useMemo(() => {
    if (!isEditMode) {
      return <FormComponent />;
    }

    if (authLoading || loading) {
      return (
        <div className="container mx-auto px-4 py-8 space-y-4">
          <div className="h-10 w-72 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Edit Loan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-red-600">{error}</p>
              <Button variant="outline" onClick={() => router.push("/dashboard/loans")}>
                Back to Loans
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return <FormComponent mode="edit" loanId={editId} initialValues={loanData} />;
  }, [FormComponent, authLoading, editId, error, isEditMode, loading, loanData, router]);

  useEffect(() => {
    if (isEditMode && !authLoading && user && !canManageLoans) {
      toast.error("Only Admin and RM can edit loans");
    }
  }, [authLoading, canManageLoans, isEditMode, user]);

  return content;
}
