'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
// import { fetchTelleCallerDailyReport } from '@/api/file_action';
import { useEffect } from 'react';
import { useUserState } from '@/app/dashboard/store';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { fetchTelleCallerDailyReport } from '@/lib/actions/file_action';

const TelecallerDailyReport = () => {
    const userState = useUserState();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchDailyReports() {
        const token = await userState.user.getIdToken();
        const currentDate = new Date().toLocaleString();
        try {
            const res = await fetchTelleCallerDailyReport(token);
            console.log(res);
            if (res?.success) {
                setReports(res?.reports);
            }
        } catch (error) {
            console.log("Error :", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDailyReports();
    }, [])

    return (
        <div className="p-6 bg-white rounded-lg">
            <h1 className="text-xl font-semibold mb-4">📞 Telecaller Daily Report</h1>

            <Table className="border rounded-lg">
                {/* Table Header */}
                <TableHeader>
                    <TableRow className="bg-gray-200">
                        <TableHead className="text-left p-3">📅 Date</TableHead>
                        <TableHead className="text-left p-3">📞 Caller Name</TableHead>
                        <TableHead className="text-left p-3">📞 Call Summary</TableHead>
                        <TableHead className="text-left p-3">🔗 Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {
                        reports?.length > 0 ? (
                            reports?.map((item, index) => (
                                <TableRow key={index} className="border-b hover:bg-gray-100">
                                    <TableCell className="p-3">{item?.date}</TableCell>
                                    <TableCell className="p-3">{item?.callerName}</TableCell>
                                    <TableCell className="p-3">{item?.callSummary}</TableCell>
                                    <TableCell className="p-3">
                                        <a target='_blank' href={item?.detailsLink}>
                                            <Button className="text-blue-500 underline" size="sm" variant="link">
                                                View Details
                                            </Button>
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center p-4 text-gray-500">
                                    No call reports available.
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </div>
    );
};

export default TelecallerDailyReport;
