"use client";

import React from "react";
import LoanManagementTable from "@/components/Dashboard/LoanManagementTable";
import { useLoans } from "@/hooks/useLoans";

const VehicleLoanPage = () => {
    const loanProps = useLoans("vehicle");

    return (
        <div className="container mx-auto py-8 px-4">
            <LoanManagementTable
                title="Vehicle Loan Management"
                loanType="vehicle"
                {...loanProps}
            />
        </div>
    );
};

export default VehicleLoanPage;
