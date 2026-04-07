'use client'

import React, { useState } from 'react';
import { useFilteredEnquiries } from '@/hooks/useAdminFilters';
import FilteredDataTable from '@/components/dashboard/FilteredDataTable';

export default function AdminEnquiriesPage() {
    const {
        data,
        isLoading,
        filters,
        handleMonthChange,
        handleSearch,
    } = useFilteredEnquiries();

    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);

    const handleMonthChangeWrapper = (month, year) => {
        setCurrentMonth(month);
        setCurrentYear(year);
        handleMonthChange(month, year);
    };

    const enquiryColumns = [
        { key: 'enquiryId', label: 'Enquiry ID' },
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'loanType', label: 'Loan Type' },
        { key: 'amount', label: 'Requested Amount', type: 'currency', align: 'right' },
        { key: 'createdAt', label: 'Date', type: 'date' },
    ];

    return (
        <div className="space-y-6 p-6">
            <FilteredDataTable
                title="Loan Enquiries"
                description="View and manage all loan enquiries received"
                columns={enquiryColumns}
                data={data}
                isLoading={isLoading}
                onMonthChange={handleMonthChangeWrapper}
                onSearch={handleSearch}
                exportEndpoint="admin/export/enquiries"
                exportFileName={`enquiries_${currentMonth || 'all'}_${currentYear || 'all'}.xlsx`}
                currentMonth={currentMonth}
                currentYear={currentYear}
                filters={{
                    month: currentMonth,
                    year: currentYear,
                }}
                hasMonthFilter={true}
                hasStatusFilter={false}
            />
        </div>
    );
}
