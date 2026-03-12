"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import {
  TrendingUp,
  Bell,
} from 'lucide-react';
import { LoanApplicationsTable } from '@/components/Dashboard/LoanApplicationTable';
import { StatsCards } from '@/components/Dashboard/StatsCard';
// import { NotificationPanel } from '@/components/Dashboard/Notification';
import { useUserState } from './store';
// import { useGetDashboardStats } from '@/hooks/useLoan';
import LeadsDashboard from '@/components/Dashboard/Lead';

// Mock data - replace with actual API calls
// const mockStats = {
//   totalDisbursed: 15750000,
//   totalApplications: 342,
//   pendingApplications: 28,
//   monthlyGrowth: 12.5
// };

const mockMonthlyData = [
  { month: 'Jan', amount: 1200000, applications: 25 },
  { month: 'Feb', amount: 1450000, applications: 32 },
  { month: 'Mar', amount: 1320000, applications: 28 },
  { month: 'Apr', amount: 1680000, applications: 35 },
  { month: 'May', amount: 1890000, applications: 42 },
  { month: 'Jun', amount: 2100000, applications: 38 },
  { month: 'Jul', amount: 1750000, applications: 31 },
  { month: 'Aug', amount: 2250000, applications: 45 },
  { month: 'Sep', amount: 2000000, applications: 39 },
  { month: 'Oct', amount: 2400000, applications: 48 },
  { month: 'Nov', amount: 2150000, applications: 41 },
  { month: 'Dec', amount: 2300000, applications: 43 }
];

const mockApplications = [
  {
    id: '1',
    applicantName: 'Rajesh Kumar',
    amount: 500000,
    loanType: 'Personal Loan',
    status: 'pending',
    date: '2024-01-15',
    email: 'rajesh.kumar@email.com',
    phone: '+91 9876543210'
  },
  {
    id: '2',
    applicantName: 'Priya Sharma',
    amount: 750000,
    loanType: 'Home Loan',
    status: 'approved',
    date: '2024-01-14',
    email: 'priya.sharma@email.com',
    phone: '+91 9876543211'
  },
  {
    id: '3',
    applicantName: 'Amit Patel',
    amount: 200000,
    loanType: 'Business Loan',
    status: 'rejected',
    date: '2024-01-13',
    email: 'amit.patel@email.com',
    phone: '+91 9876543212'
  },
  {
    id: '4',
    applicantName: 'Sunita Gupta',
    amount: 300000,
    loanType: 'Personal Loan',
    status: 'processing',
    date: '2024-01-12',
    email: 'sunita.gupta@email.com',
    phone: '+91 9876543213'
  },
  {
    id: '5',
    applicantName: 'Vikram Singh',
    amount: 1200000,
    loanType: 'Home Loan',
    status: 'pending',
    date: '2024-01-11',
    email: 'vikram.singh@email.com',
    phone: '+91 9876543214'
  }
];

const mockNotifications = [
  {
    id: '1',
    type: 'pending',
    message: '5 new loan applications require review',
    time: '2 hours ago'
  },
  {
    id: '2',
    type: 'rejected',
    message: 'Loan application #LA-2024-001 was rejected',
    time: '4 hours ago'
  },
  {
    id: '3',
    type: 'approved',
    message: 'Loan disbursement of ₹750,000 completed',
    time: '6 hours ago'
  }
];

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState('');
  const [loanTypeFilter, setLoanTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState(mockApplications);
  const [dashboardData, setDashboardData] = useState({});
  console.log("Hello abhishek", dashboardData);

  let userState = useUserState();

  useEffect(() => {
    let filtered = mockApplications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (loanTypeFilter) {
      filtered = filtered.filter(app => app.loanType === loanTypeFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= filterDate;
      });
    }

    setFilteredApplications(filtered);
  }, [searchTerm, loanTypeFilter, dateFilter]);


  // const { data: dashboardStats, isLoading: statsLoading } = useGetDashboardStats();

  useEffect(() => {
    // Use static data
    const staticData = {
      monthly: mockMonthlyData,
      recentApplications: mockApplications,
      totalDisbursed: 15750000,
      totalApplications: 342,
      pendingApplications: 28,
      monthlyGrowth: 12.5
    };
    setDashboardData(staticData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Parv Financial Services</h1>
            <p className="text-gray-600 mt-1">Admin Dashboard</p>
          </div>
          {/* <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <NotificationPanel notifications={mockNotifications} />
          </div> */}
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={dashboardData} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Disbursed Loan Graph */}
        <Card className="lg:col-span-1.5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Monthly Loan Disbursement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData?.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                <Tooltip
                  formatter={(value) => [`₹${(value / 100000).toFixed(2)}L`, 'Amount']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Applications Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width={'100%'} height={300}>
              <BarChart data={dashboardData?.monthly}>
                <CartesianGrid strokeDasharray="3 1" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Loan Applications Table */}
      <LoanApplicationsTable applications={dashboardData?.recentApplications} />
      <LeadsDashboard />
    </div>
  );
};

export default Dashboard;
