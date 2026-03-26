"use client";

import { LoanFormPageClient } from "@/components/loans/LoanFormPageClient";
import { BusinessLoanForm } from "@/components/loans/business/BusinessLoanForm";

export default function BusinessLoanPage() {
  return <LoanFormPageClient expectedLoanKey="business" FormComponent={BusinessLoanForm} />;
}
