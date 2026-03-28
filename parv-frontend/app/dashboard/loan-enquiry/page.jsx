"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { LoanEnquiryTable } from "@/components/loan-enquiry/LoanEnquiryTable";

export default function LoanEnquiryPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Toaster position="top-right" />
      <LoanEnquiryTable />
    </div>
  );
}
