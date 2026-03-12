"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const PersonalLoanPage = () => {
    const loanProps = useLoans("personal");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Personal Loan Management"
                loanType="personal"
                {...loanProps}
            />
        </div>
    );
};

export default PersonalLoanPage;
