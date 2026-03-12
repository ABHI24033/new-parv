"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const HomeLoanPage = () => {
    const loanProps = useLoans("home");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Home Loan Management"
                loanType="home"
                {...loanProps}
            />
        </div>
    );
};

export default HomeLoanPage;
