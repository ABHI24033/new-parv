"use client";

import { LoanFormPageClient } from "@/components/loans/LoanFormPageClient";
import { VehicleLoanForm } from "@/components/loans/vehicle/VehicleLoanForm";

export default function VehicleLoanPage() {
  return <LoanFormPageClient expectedLoanKey="vehicle" FormComponent={VehicleLoanForm} />;
}
