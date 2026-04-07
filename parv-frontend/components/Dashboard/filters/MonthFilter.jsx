'use client'

import React from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function MonthFilter({ onMonthChange, selectedMonth, selectedYear }) {
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();
    
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const currentDate = new Date();
    const defaultYear = String(currentDate.getFullYear());
    const monthValue = selectedMonth ?? "all";
    const yearValue = selectedYear ? String(selectedYear) : defaultYear;

    return (
        <div className="flex items-center gap-2">
            <Select 
                value={monthValue}
                onValueChange={(value) => onMonthChange(value === "all" ? "" : value, yearValue || defaultYear)}
            >
                <SelectTrigger className="w-[130px] h-9 bg-white">
                    <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key="all" value="all">
                        All Months
                    </SelectItem>
                    {months.map(month => (
                        <SelectItem key={month.value} value={month.value}>
                            {month.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select 
                value={yearValue}
                onValueChange={(value) => onMonthChange(monthValue, value)}
            >
                <SelectTrigger className="w-[90px] h-9 bg-white">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map(year => (
                        <SelectItem key={year} value={String(year)}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
