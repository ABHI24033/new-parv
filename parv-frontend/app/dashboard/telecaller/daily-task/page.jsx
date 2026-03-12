'use client'
import React from 'react'
import { useUserState } from '../../store'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

const DailyTask = () => {
  const { profile } = useUserState();
  console.log(profile);
  

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-xl font-semibold mb-4">📅 Daily Tasks</h1>

      <Table className="border rounded-lg">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="text-left p-3">📅 Date</TableHead>
            <TableHead className="text-left p-3">📌 Assignment</TableHead>
            <TableHead className="text-left p-3">🔗 Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {profile?.assignments?.length > 0 ? (
            profile.assignments.map((item, index) => (
              <TableRow key={index} className="border-b hover:bg-gray-100">
                <TableCell className="p-3">{item?.date}</TableCell>
                <TableCell className="p-3">{item?.assignment}</TableCell>
                <TableCell className="p-3">
                  <a target='_blank' href={item?.assignment}>
                    <Button className="text-blue-500 underline" size="sm" variant="link">
                      View
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center p-4 text-gray-500">
                No tasks assigned yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DailyTask;
