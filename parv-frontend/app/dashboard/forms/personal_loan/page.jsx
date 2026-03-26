"use client";

import { LoanFormPageClient } from "@/components/loans/LoanFormPageClient";
import { PersonalLoanForm } from "@/components/loans/personal/PersonalLoanForm";

export default function PersonalLoanPage() {
  return <LoanFormPageClient expectedLoanKey="personal" FormComponent={PersonalLoanForm} />;
}
