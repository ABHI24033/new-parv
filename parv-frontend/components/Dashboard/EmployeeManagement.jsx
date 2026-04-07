'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DSAListPage from '@/app/dashboard/list/dsa/page';
import RMListPage from '@/app/dashboard/list/rm/page';
import FieldStaffListPage from '@/app/dashboard/list/field-staff/page';
import TelecallerListPage from '@/app/dashboard/list/telecaller/page';

export default function EmployeeManagement() {
    const [activeTab, setActiveTab] = useState('dsa');

    return (
        <Card className="col-span-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Team Management</CardTitle>
                        <CardDescription>Manage DSA, Relationship Managers, and Staff locally</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-4">
                        <TabsTrigger value="dsa">DSA</TabsTrigger>
                        <TabsTrigger value="rm">Relationship Managers</TabsTrigger>
                        <TabsTrigger value="field_staff">Field Staff</TabsTrigger>
                        <TabsTrigger value="telecaller">Telecallers</TabsTrigger>
                        <TabsTrigger value="add" onClick={() => (window.location.href='/dashboard/admin/signup')}>+ Add New</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dsa" className="mt-0">
                        <DSAListPage />
                    </TabsContent>

                    <TabsContent value="rm" className="mt-0">
                        <RMListPage />
                    </TabsContent>

                    <TabsContent value="field_staff" className="mt-0">
                        <FieldStaffListPage />
                    </TabsContent>

                    <TabsContent value="telecaller" className="mt-0">
                        <TelecallerListPage />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
