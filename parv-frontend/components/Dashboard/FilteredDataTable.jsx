'use client'

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RotateCcw } from 'lucide-react';
import MonthFilter from './filters/MonthFilter';
import ExcelExportButton from './filters/ExcelExportButton';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilteredDataTable({
    title,
    description,
    columns,
    data = [],
    isLoading = false,
    onMonthChange,
    onStatusChange,
    onSearch,
    exportEndpoint,
    exportFileName,
    currentMonth,
    currentYear,
    currentStatus,
    searchValue,
    filters = {},
    hasMonthFilter = true,
    hasStatusFilter = false,
    statusOptions = [],
}) {
    const [searchTerm, setSearchTerm] = useState(searchValue || '');

    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
        onSearch?.(value);
    }, [onSearch]);

    const handleReset = () => {
        setSearchTerm('');
        onSearch?.('');
        onMonthChange?.(null, null);
        onStatusChange?.(null);
    };

    const formatCurrency = (value) => {
        if (typeof value === 'number') {
            return '₹' + value.toLocaleString('en-IN');
        }
        return value;
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-IN');
    };

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Sticky Filter Section */}
                <div className="sticky top-0 z-10 bg-white rounded-lg border border-slate-200 p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        {/* Month Filter */}
                        {hasMonthFilter && (
                            <div className="lg:col-span-2">
                                <MonthFilter
                                    onMonthChange={onMonthChange}
                                    selectedMonth={currentMonth}
                                    selectedYear={currentYear}
                                />
                            </div>
                        )}

                        {/* Status Filter */}
                        {hasStatusFilter && statusOptions.length > 0 && (
                            <Select 
                                value={currentStatus || 'all'} 
                                onValueChange={(val) => onStatusChange?.(val === 'all' ? '' : val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    {statusOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Export Button */}
                        {exportEndpoint && (
                            <ExcelExportButton
                                endpoint={exportEndpoint}
                                fileName={exportFileName}
                                filters={filters}
                            />
                        )}

                        {/* Reset Button */}
                        <Button 
                            variant="outline" 
                            onClick={handleReset}
                            className="gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="inline-flex flex-col items-center gap-2">
                                <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                                <p className="text-slate-600">Loading data...</p>
                            </div>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-slate-600">No data found. Try adjusting your filters.</p>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    {columns.map(col => (
                                        <th
                                            key={col.key}
                                            className={`py-3 px-4 font-semibold text-slate-700 text-${col.align || 'left'}`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                                        {columns.map(col => (
                                            <td
                                                key={col.key}
                                                className={`py-3 px-4 text-${col.align || 'left'}`}
                                            >
                                                {col.render ? col.render(row[col.key], row) : (
                                                    col.type === 'currency' ? formatCurrency(row[col.key]) :
                                                    col.type === 'date' ? formatDate(row[col.key]) :
                                                    col.type === 'badge' ? (
                                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                                            row[col.key] === 'Approved' ? 'bg-green-100 text-green-800' :
                                                            row[col.key] === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            row[col.key] === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                            row[col.key] === 'Disbursed' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {row[col.key]}
                                                        </span>
                                                    ) :
                                                    row[col.key]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Summary */}
                {data.length > 0 && (
                    <div className="text-sm text-slate-600 text-center pt-4 border-t">
                        Showing {data.length} records
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
