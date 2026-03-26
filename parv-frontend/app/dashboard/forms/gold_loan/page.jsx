"use client";

import { LoanFormPageClient } from "@/components/loans/LoanFormPageClient";
import { GoldLoanForm } from "@/components/loans/gold/GoldLoanForm";

export default function GoldLoanPage() {
  return <LoanFormPageClient expectedLoanKey="gold" FormComponent={GoldLoanForm} />;
}
