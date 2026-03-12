import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Eye, Edit, Trash2, Mail, Phone, FileText } from 'lucide-react';

export const LoanApplicationsTable = ({ applications }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: 'default', color: 'bg-yellow-100 text-yellow-800' },
      approved: { variant: 'default', color: 'bg-green-100 text-green-800' },
      rejected: { variant: 'destructive', color: 'bg-red-100 text-red-800' },
      processing: { variant: 'secondary', color: 'bg-blue-100 text-blue-800' },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <Badge className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Loan Applications</span>
          <Badge variant="secondary">{applications?.length} applications</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications?.map?.((application) => (
                <TableRow key={application?.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {application?.applicantName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {application?.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-1" />
                        {application?.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {application?.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency?.(application?.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{application?.loanType}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge?.(application?.status)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate?.(application?.date)}
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {applications?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No loan applications found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
