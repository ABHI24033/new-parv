"use client";

import { LoanFormPageClient } from "@/components/loans/LoanFormPageClient";
import { HomeLoanForm } from "@/components/loans/home/HomeLoanForm";

export default function HomeLoanPage() {
  return <LoanFormPageClient expectedLoanKey="home" FormComponent={HomeLoanForm} />;
}
