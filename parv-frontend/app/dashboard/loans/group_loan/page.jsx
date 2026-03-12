"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const GroupLoanPage = () => {
    const loanProps = useLoans("group");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Group Loan Management"
                loanType="group"
                {...loanProps}
            />
        </div>
    );
};

export default GroupLoanPage;
