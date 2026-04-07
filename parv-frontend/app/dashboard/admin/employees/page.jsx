"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmployeeManagement from "@/components/Dashboard/EmployeeManagement";

export default function EmployeesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4 sm:p-6">
            {/* Back button */}
            <Link href="/dashboard">
                <Button variant="outline" size="sm" className="mb-6 flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Dashboard
                </Button>
            </Link>

            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employee Management</h1>
                <p className="text-gray-500 text-sm mt-0.5">Manage DSA, RM, and Field Staff members</p>
            </div>

            {/* Employee Management Component */}
            <EmployeeManagement />
        </div>
    );
}
