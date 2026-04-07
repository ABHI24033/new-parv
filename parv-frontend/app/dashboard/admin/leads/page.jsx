'use client'

import React, { useState } from 'react';
import { useFilteredLeads } from '@/hooks/useAdminFilters';
import FilteredDataTable from '@/components/dashboard/FilteredDataTable';

export default function AdminLeadsPage() {
    const {
        data,
        isLoading,
        filters,
        handleMonthChange,
        handleSearch,
    } = useFilteredLeads();

    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);

    const handleMonthChangeWrapper = (month, year) => {
        setCurrentMonth(month);
        setCurrentYear(year);
        handleMonthChange(month, year);
    };

    const leadsColumns = [
        { key: 'leadId', label: 'Lead ID' },
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'createdAt', label: 'Date', type: 'date' },
    ];

    return (
        <div className="space-y-6 p-6">
            <FilteredDataTable
                title="Leads"
                description="Manage all leads and lead data"
                columns={leadsColumns}
                data={data}
                isLoading={isLoading}
                onMonthChange={handleMonthChangeWrapper}
                onSearch={handleSearch}
                exportEndpoint="admin/export/leads"
                exportFileName={`leads_${currentMonth || 'all'}_${currentYear || 'all'}.xlsx`}
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
