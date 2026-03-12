"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const BusinessLoanPage = () => {
    const loanProps = useLoans("business");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Business Loan Management"
                loanType="business"
                {...loanProps}
            />
        </div>
    );
};

export default BusinessLoanPage;
