"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const GoldLoanPage = () => {
    const loanProps = useLoans("gold");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Gold Loan Management"
                loanType="gold"
                {...loanProps}
            />
        </div>
    );
};

export default GoldLoanPage;
