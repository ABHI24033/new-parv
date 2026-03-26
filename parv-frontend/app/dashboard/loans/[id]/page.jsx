"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import api from "@/api/api";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { FileText, ExternalLink, CalendarDays, CircleDollarSign, UserCircle2 } from "lucide-react";

const getStatusVariant = (st) => {
  switch (String(st || "").toLowerCase()) {
    case "application received":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "in progress at parv":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "applied to bank":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
    case "pendency":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "sanctioned":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "disbursed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    // Legacy backward compatible statuses
    case "pending":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "approved":
      return "bg-violet-100 text-violet-800 border-violet-200";
    default:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }
};

const labelize = (key) =>
  String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const isUrl = (value) => typeof value === "string" && /^https?:\/\//i.test(value);

const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString();
};

const formatINR = (value) => {
  if (value === null || value === undefined) return "-";
  const asString = String(value).trim();
  if (!asString) return "-";
  const n = typeof value === "number" ? value : Number(asString.replace(/,/g, ""));
  if (!Number.isFinite(n)) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
};

const STATUS_OPTIONS = [
  "Application Received",
  "In Progress at PARV",
  "Applied to Bank",
  "Pendency",
  "Sanctioned",
  "Disbursed",
  "Rejected",
];

const FieldGrid = ({ items }) => {
  if (!items?.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(({ label, value }) => (
        <div key={label} className="rounded-lg border border-gray-100 p-3">
          <div className="text-xs text-gray-500">{label}</div>
          <div className="text-sm font-medium text-gray-900 break-words">
            {value ?? "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

const pickFields = (data, keys) =>
  keys
    .filter((k) => data?.[k] !== undefined && data?.[k] !== null && data?.[k] !== "")
    .map((k) => {
      const raw = data[k];
      const key = String(k || "").toLowerCase();
      const looksLikeMoney =
        key.includes("amount") ||
        key.includes("emi") ||
        key.includes("cost") ||
        key.includes("loan_you_need");
      return {
        label: labelize(k),
        value: looksLikeMoney ? formatINR(raw) : String(raw),
      };
    });

export default function LoanDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [loanType, setLoanType] = useState("");
  const [loanKey, setLoanKey] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/loans/${id}`);
        if (!cancelled && res.data?.success) {
          setLoanType(res.data.loanType || "");
          setLoanKey(res.data.loanKey || "");
          setData(res.data.data || null);
          setSelectedStatus(res.data?.data?.status || "Application Received");
        }
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || "Failed to load loan details");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (id) fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const sections = useMemo(() => {
    if (!data) return null;

    const personal = pickFields(data, [
      "applicant_name",
      "fathers_name",
      "mothers_name",
      "phone_no",
      "alt_phone_no",
      "email",
      "pan",
      "aadhar",
      "dob",
      "marital_status",
      "spouse_name",
    ]);

    const group = pickFields(data, [
      "group_name",
      "group_size",
      "nearest_branch",
      "group_village",
      "group_post",
      "group_police_station",
      "group_district",
      "group_pincode",
    ]);

    const connector = pickFields(data, ["id_of_connector", "name_of_connector", "folderName"]);

    const loanInfo = pickFields(data, [
      "loan_amount",
      "purpose_of_loan",
      "loan_type",
      "which_vehicle",
      "when_purchase",
      "estimated_cost",
      "loan_you_need",
      "profession",
    ]);

    const addresses = [
      ...pickFields(data, [
        "permanent_building_name",
        "permanent_street_name",
        "permanent_landmark",
        "permanent_city",
        "permanent_district",
        "permanent_state",
        "permanent_pincode",
      ]),
      ...pickFields(data, [
        "present_building_name",
        "present_street_name",
        "present_landmark",
        "present_city",
        "present_district",
        "present_state",
        "present_pincode",
        "same_as_permanent_address",
      ]),
    ];

    const employment = pickFields(data, [
      "current_company_name",
      "designation",
      "company_name",
      "company_age",
      "salary_account_bank",
      "savings_account_bank",
      "saving_account_bank_name",
      "saving_account_turnover",
      "job_tenure",
      "job_experience",
      "monthly_income",
      "current_account_bank_name",
      "current_account_turnover",
      "file_income_tax",
    ]);

    return { personal, group, connector, loanInfo, addresses, employment };
  }, [data]);

  const documents = useMemo(() => {
    if (!data) return [];
    const links = [];
    for (const [key, value] of Object.entries(data)) {
      if (isUrl(value)) {
        links.push({ label: labelize(key), url: value });
      } else if (Array.isArray(value)) {
        value.forEach((v, idx) => {
          if (isUrl(v)) links.push({ label: `${labelize(key)} #${idx + 1}`, url: v });
        });
      } else if (value && typeof value === "object") {
        // skip nested docs; group members handled separately
      }
    }
    return links;
  }, [data]);

  const canUpdateStatus = useMemo(() => {
    const role = String(user?.role || "").toLowerCase();
    return role === "admin" || role === "rm";
  }, [user?.role]);

  const handleStatusUpdate = async () => {
    if (!selectedStatus || !data?._id) return;
    setUpdatingStatus(true);
    try {
      const res = await api.put(`/loans/${data._id}/status`, { status: selectedStatus });
      if (res.data?.success) {
        setData((prev) => (prev ? { ...prev, status: selectedStatus } : prev));
        toast.success("Loan status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-red-600">{error}</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
              <Button asChild>
                <Link href="/dashboard/loans">All Loans</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">No data found.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 via-white to-blue-50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">Loan Details</div>
              <div className="text-2xl font-bold text-gray-900">
                {data.applicant_name || data.group_name || loanType || "Loan Details"}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-indigo-500" />
                  Created: {formatDateTime(data.createdAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-sky-500" />
                  Updated: {formatDateTime(data.updatedAt)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={getStatusVariant(data.status)}>
                {data.status || "Application Received"}
              </Badge>
              <Button asChild variant="outline">
                <Link href="/dashboard/loans">Back to Loans</Link>
              </Button>
              {loanKey ? (
                <Button asChild>
                  <Link
                    href={`/dashboard/forms/${loanKey.includes("_loan") ? loanKey : `${loanKey}_loan`}?edit=${data._id}`}
                  >
                    Edit
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>

      {canUpdateStatus ? (
        <Card className="border-indigo-100">
          <CardHeader>
            <CardTitle className="text-base">Update Loan Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[320px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate} disabled={updatingStatus || !selectedStatus}>
                {updatingStatus ? "Updating..." : "Update Loan Status"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGrid
            items={[
              { label: "Loan ID", value: String(data._id) },
              { label: "Loan Type", value: data.loanType || loanType },
              { label: "Loan Amount", value: formatINR(data.loan_amount || data.amount || data.loanAmount || "-") },
              { label: "Connector Name", value: data.name_of_connector || "-" },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="text-xs uppercase text-blue-600 font-semibold">Applicant</div>
              <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gray-800">
                <UserCircle2 className="h-4 w-4 text-blue-500" />
                {data.applicant_name || data.group_name || "-"}
              </div>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="text-xs uppercase text-emerald-700 font-semibold">Amount</div>
              <div className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gray-800">
                <CircleDollarSign className="h-4 w-4 text-emerald-600" />
                {formatINR(data.loan_amount || data.amount || data.loanAmount || "-")}
              </div>
            </div>
            <div className="rounded-xl border border-violet-100 bg-violet-50/70 p-4">
              <div className="text-xs uppercase text-violet-700 font-semibold">Status</div>
              <div className="mt-1 text-sm font-medium text-gray-800">{data.status || "Application Received"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {sections?.loanInfo?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Loan Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid items={sections.loanInfo} />
          </CardContent>
        </Card>
      ) : null}

      {sections?.personal?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid items={sections.personal} />
          </CardContent>
        </Card>
      ) : null}

      {sections?.group?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Group Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGrid items={sections.group} />

            {Array.isArray(data.members) && data.members.length ? (
              <>
                <Separator />
                <div className="text-sm font-semibold text-gray-800">Members</div>
                <div className="space-y-3">
                  {data.members.map((m, idx) => (
                    <Card key={idx} className="border-gray-100">
                      <CardHeader className="py-3">
                        <CardTitle className="text-base">
                          {m?.name || `Member ${idx + 1}`}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <FieldGrid
                          items={Object.entries(m || {})
                            .filter(([k, v]) => k !== "documents" && v)
                            .map(([k, v]) => {
                              const key = String(k || "").toLowerCase();
                              const looksLikeMoney =
                                key.includes("amount") || key.includes("emi") || key.includes("cost");
                              return {
                                label: labelize(k),
                                value: looksLikeMoney ? formatINR(v) : String(v),
                              };
                            })}
                        />
                        {m?.documents ? (
                          <>
                            <Separator />
                            <div className="text-sm font-semibold text-gray-800">Documents</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {Object.entries(m.documents)
                                .filter(([, v]) => isUrl(v))
                                .map(([k, v]) => (
                                  <div
                                    key={k}
                                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 flex items-start justify-between gap-3"
                                  >
                                    <div className="min-w-0">
                                      <div className="text-sm font-semibold text-slate-800 truncate">
                                        {labelize(k)}
                                      </div>
                                      <div className="text-xs text-slate-500 mt-1 break-all">
                                        {v}
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                      <a
                                        href={v}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                      >
                                        Preview
                                      </a>
                                      <a
                                        href={v}
                                        download
                                        className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm font-medium"
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      {sections?.addresses?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid items={sections.addresses} />
          </CardContent>
        </Card>
      ) : null}

      {sections?.employment?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Employment / Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid items={sections.employment} />
          </CardContent>
        </Card>
      ) : null}

      {Array.isArray(data.loanHistory) && data.loanHistory.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Loan History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.loanHistory.map((h, idx) => (
              <Card key={idx} className="border-gray-100">
                <CardContent className="pt-6">
                  <FieldGrid
                    items={Object.entries(h || {})
                      .filter(([, v]) => v)
                      .map(([k, v]) => {
                        const key = String(k || "").toLowerCase();
                        const looksLikeMoney =
                          key.includes("amount") || key.includes("emi") || key.includes("cost");
                        return {
                          label: labelize(k),
                          value: looksLikeMoney ? formatINR(v) : String(v),
                        };
                      })}
                  />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {sections?.connector?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Connector Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGrid items={sections.connector} />
          </CardContent>
        </Card>
      ) : null}

      {documents.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
          </CardHeader>
          {/* <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {documents.map((d) => (
              <div
                key={`${d.label}-${d.url}`}
                className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-100 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {d.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      Document file
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Preview
                  </a>

                  <a
                    href={d.url}
                    download
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </CardContent> */}


          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {documents.map((d) => {
              // 👉 Detect file type from URL
              const getFileType = (url) => {
                if (!url) return "File";
                const ext = url.split(".").pop().toLowerCase();

                if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "Image";
                if (["pdf"].includes(ext)) return "PDF";
                if (["doc", "docx"].includes(ext)) return "Document";
                if (["xls", "xlsx"].includes(ext)) return "Excel";
                return ext.toUpperCase();
              };

              const fileType = getFileType(d.url);

              return (
                <div
                  key={`${d.label}-${d.url}`}
                  className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center justify-between gap-4"
                >
                  {/* Left Content */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-100 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {d.label}
                      </p>

                      {/* ✅ File Type Badge */}
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {fileType}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Preview
                    </a>

                    <a
                      href={d.url}
                      download
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
