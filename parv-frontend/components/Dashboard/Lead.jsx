"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

// Dummy data - replace with server action data
const monthlyLeads = [
  { month: "Jan", leads: 20 },
  { month: "Feb", leads: 35 },
  { month: "Mar", leads: 28 },
  { month: "Apr", leads: 40 },
  { month: "May", leads: 55 },
];

const leadSources = [
  { name: "Website", value: 45 },
  { name: "Referral", value: 25 },
  { name: "Ads", value: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function LeadsDashboard() {
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    // Calculate total leads from monthly data
    const total = monthlyLeads.reduce((acc, item) => acc + item.leads, 0);
    setTotalLeads(total);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Total Leads */}
      

      {/* Month-wise Leads Chart */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Month-wise Leads</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyLeads}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#0088FE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leadSources}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {leadSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
