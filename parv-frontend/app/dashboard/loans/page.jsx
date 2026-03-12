"use client";

import React from "react";
import UnifiedLoanManagementTable from "@/components/Dashboard/UnifiedLoanManagementTable";
import { useUnifiedLoans } from "@/hooks/useUnifiedLoans";

const LoanManagementPage = () => {
    const loanProps = useUnifiedLoans();

    return (
        <div className="container mx-auto py-8 px-4">
            <UnifiedLoanManagementTable title="Loan Management" {...loanProps} />
        </div>
    );
};

export default LoanManagementPage;
