"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import api from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const getStatusVariant = (st) => {
  switch (String(st || "").toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "disbursed":
      return "bg-blue-100 text-blue-800 border-blue-200";
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
    .map((k) => ({ label: labelize(k), value: String(data[k]) }));

export default function LoanDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loanType, setLoanType] = useState("");
  const [loanKey, setLoanKey] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/loans/unified/${id}`);
        if (!cancelled && res.data?.success) {
          setLoanType(res.data.loanType || "");
          setLoanKey(res.data.loanKey || "");
          setData(res.data.data || null);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-sm text-gray-500">Loan</div>
          <div className="text-2xl font-bold text-gray-900">
            {data.applicant_name || data.group_name || loanType || "Loan Details"}
          </div>
          <div className="text-sm text-gray-600">
            Created: {formatDateTime(data.createdAt)} • Updated: {formatDateTime(data.updatedAt)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusVariant(data.status)}>
            {data.status || "Pending"}
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

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldGrid
            items={[
              { label: "Loan ID", value: String(data._id) },
              { label: "Loan Type", value: data.loanType || loanType },
              { label: "Loan Amount", value: data.loan_amount || "-" },
              { label: "Connector Name", value: data.name_of_connector || "-" },
            ]}
          />
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
                            .map(([k, v]) => ({ label: labelize(k), value: String(v) }))}
                        />
                        {m?.documents ? (
                          <>
                            <Separator />
                            <div className="text-sm font-semibold text-gray-800">Documents</div>
                            <div className="space-y-2">
                              {Object.entries(m.documents)
                                .filter(([, v]) => isUrl(v))
                                .map(([k, v]) => (
                                  <div key={k} className="text-sm">
                                    <span className="text-gray-600">{labelize(k)}:</span>{" "}
                                    <a
                                      href={v}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-blue-600 hover:underline break-all"
                                    >
                                      Open
                                    </a>
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
                      .map(([k, v]) => ({ label: labelize(k), value: String(v) }))}
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
          <CardContent className="space-y-2">
            {documents.map((d) => (
              <div key={`${d.label}-${d.url}`} className="text-sm">
                <span className="text-gray-600">{d.label}:</span>{" "}
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  Open
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
