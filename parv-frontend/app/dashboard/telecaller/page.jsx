'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchDashboardData } from "@/lib/actions/telecaller";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Dashboard() {
  const [fetchedReportData, setFetchedReportData] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [open, setOpen] = useState(false);
  const [totals,setTotals] = useState( );
  const [graphData, setGraphData] = useState([]);

  console.log(totals, graphData);
  

  useEffect(() => {
    async function loadData() {
      const data = await fetchDashboardData();
      console.log("Fetched data:", data);
      if (data?.success) {
        setFetchedReportData(data);
        setTotals(data?.totals );
        setGraphData(data?.graphData);
      }
    }
    loadData();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Telecaller Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">Total Calls</p>
            <p className="text-2xl">{totals?.totalCalls}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">Total Customers</p>
            <p className="text-2xl">{totals?.totalCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">Cases Closed</p>
            <p className="text-2xl">{totals?.totalCasesClosed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="font-semibold">Cases Running</p>
            <p className="text-2xl">{totals?.totalCasesRunning}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Bar Chart */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Monthly Report Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalCalls" fill="#4f46e5" name="Total Calls" />
              <Bar dataKey="totalCustomers" fill="#16a34a" name="Customers" />
              <Bar dataKey="casesClosed" fill="#dc2626" name="Closed" />
              <Bar dataKey="casesRunning" fill="#facc15" name="Running" />
              {/* Optional: Add goal as a line */}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Daily Reports */}
      {/* <div className="space-y-2">
        <h3 className="text-lg font-semibold">Daily Reports</h3>
        {fetchedReportData?.map((report, i) => (
          <Card key={i} className="p-4 cursor-pointer hover:bg-muted" onClick={() => { setSelectedReport(report); setOpen(true); }}>
            <p className="font-medium">{report.telecallerName} ({report.username})</p>
            <p className="text-sm text-muted-foreground">Date: {formatDate(report.formSubmitDate)}</p>
          </Card>
        ))}
      </div> */}

      {/* Report Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Telecaller Report Detail</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {selectedReport?.formSubmitDate ? formatDate(selectedReport.formSubmitDate) : ""}
            </p>
          </DialogHeader>
          <Separator className="my-2" />
          <div className="space-y-2 text-sm">
            <p><strong>Telecaller Name:</strong> {selectedReport?.telecallerName || "N/A"}</p>
            <p><strong>Username:</strong> {selectedReport?.username || "N/A"}</p>
            <p><strong>Total Calls:</strong> {selectedReport?.totalCalls ?? 0}</p>
            <p><strong>Total Customers:</strong> {selectedReport?.totalCustomers ?? 0}</p>
            <p><strong>Cases Closed:</strong> {selectedReport?.casesClosed ?? 0}</p>
            <p><strong>Cases Running:</strong> {selectedReport?.casesRunning ?? 0}</p>
            <p><strong>Notes:</strong> {selectedReport?.notes || "No notes added."}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
