'use client'

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import api from '@/api/api';

export default function ExcelExportButton({ 
    endpoint, 
    fileName, 
    filters = {},
    disabled = false 
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleExport = async () => {
        setIsLoading(true);
        try {
            if (!endpoint) {
                throw new Error('Export endpoint is required');
            }

            const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
            const response = await api.get(normalizedEndpoint, {
                params: filters,
                responseType: 'blob',
            });

            const blob = response.data;

            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName || 'export.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export data. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleExport}
            disabled={isLoading || disabled}
            variant="outline"
            className="gap-2"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Exporting...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4" />
                    Download Excel
                </>
            )}
        </Button>
    );
}
