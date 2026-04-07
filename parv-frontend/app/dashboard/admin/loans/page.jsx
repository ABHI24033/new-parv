'use client'

import React, { useState } from 'react';
import { useFilteredLoans } from '@/hooks/useFilteredLoans';
import FilteredDataTable from '@/components/dashboard/FilteredDataTable';
import EmployeeManagement from '@/components/dashboard/EmployeeManagement';

export default function AdminDashboard() {
    const {
        data,
        isLoading,
        filters,
        handleMonthChange,
        handleStatusChange,
        handleSearch,
    } = useFilteredLoans();

    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);

    const handleMonthChangeWrapper = (month, year) => {
        setCurrentMonth(month);
        setCurrentYear(year);
        handleMonthChange(month, year);
    };

    const handleStatusChangeWrapper = (status) => {
        setCurrentStatus(status);
        handleStatusChange(status);
    };

    const appliedLoansColumns = [
        { key: 'loanId', label: 'Loan ID' },
        { key: 'applicantName', label: 'Applicant Name' },
        { key: 'loanType', label: 'Loan Type' },
        { key: 'loanAmount', label: 'Amount', type: 'currency', align: 'right' },
        { key: 'status', label: 'Status', type: 'badge' },
        { key: 'assignedTo', label: 'Assigned To' },
        { key: 'createdAt', label: 'Created Date', type: 'date' },
    ];

    const statusOptions = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Rejected', label: 'Rejected' },
        { value: 'Disbursed', label: 'Disbursed' },
    ];

    return (
        <div className="space-y-6 p-6">
            {/* Applied Loans Table */}
            <FilteredDataTable
                title="Applied Loans"
                description="View and manage all loan applications"
                columns={appliedLoansColumns}
                data={data}
                isLoading={isLoading}
                onMonthChange={handleMonthChangeWrapper}
                onStatusChange={handleStatusChangeWrapper}
                onSearch={handleSearch}
                exportEndpoint="admin/export/applied-loans"
                exportFileName={`applied_loans_${currentMonth || 'all'}_${currentYear || 'all'}.xlsx`}
                currentMonth={currentMonth}
                currentYear={currentYear}
                currentStatus={currentStatus}
                filters={{
                    month: currentMonth,
                    year: currentYear,
                    status: currentStatus,
                }}
                hasMonthFilter={true}
                hasStatusFilter={true}
                statusOptions={statusOptions}
            />

            {/* Employee Management Section */}
            <EmployeeManagement />
        </div>
    );
}
