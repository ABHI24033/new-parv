"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Users, Calendar, DollarSign, Search } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useRMDashboard } from "@/hooks/useRMDashboard";

export default function RMDashboard() {
  const {
    kpiData,
    revenueSeries,
    clients,
    activities,
    todaysMeetings,
    notificationCount,
    searchQuery,
    handleSearchChange,
    note,
    handleNoteChange,
    handleSaveNote,
    handleViewSchedule,
    handleNewClient,
    handleLogPayment,
    handleRaiseEscalation,
    handleNewLead,
    handlePayment,
    handleDocuments,
    handleReports,
    handleNotifications,
    handleClientClick,
  } = useRMDashboard();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Relationship Manager Dashboard</h1>
          <div className="text-sm text-slate-500">Welcome back — Abhishek</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 border rounded-lg px-3 py-1 bg-white">
            <Search className="w-4 h-4 text-slate-400" />
            <Input 
              className="border-0 p-0 focus:ring-0" 
              placeholder="Search clients, loans, IDs..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <Button variant="ghost" className="relative" onClick={handleNotifications}>
            <Bell />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 min-w-[18px] text-center">
                {notificationCount}
              </span>
            )}
          </Button>

          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/avatar.jpg" alt="RM" />
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-sm">
              <div className="font-medium">Abhishek Kumar</div>
              <div className="text-xs text-slate-500">Relationship Manager</div>
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: KPIs + quick actions */}
        <section className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Quick KPIs</CardTitle>
              <CardDescription>Snapshot of your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded shadow-sm">
                  <div className="text-xs text-slate-500">Clients</div>
                  <div className="text-xl font-semibold">{kpiData.clientCount}</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <div className="text-xs text-slate-500">Active Loans</div>
                  <div className="text-xl font-semibold">{kpiData.activeLoans}</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm col-span-2">
                  <div className="text-xs text-slate-500">Portfolio Value</div>
                  <div className="text-lg font-semibold">₹{kpiData.portfolioValue.toLocaleString()}</div>
                </div>
                <div className="bg-white p-3 rounded shadow-sm col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Meetings Today</div>
                    <div className="text-lg font-semibold">{kpiData.meetingsToday}</div>
                  </div>
                  <Button onClick={handleViewSchedule}>View schedule</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5" /> Today's Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {todaysMeetings.length > 0 ? (
                  todaysMeetings.map((meeting, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="text-xs text-slate-500">{meeting.time}</div>
                      <div>
                        <div className="font-medium">{meeting.name}</div>
                        <div className="text-xs text-slate-500">{meeting.purpose} - Office</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-slate-500">No meetings scheduled for today</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="w-5 h-5" /> Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button onClick={handleNewClient}>New Client</Button>
                <Button onClick={handleLogPayment}>Log Payment</Button>
                <Button onClick={handleRaiseEscalation}>Raise Escalation</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Middle column: Revenue chart + client table */}
        <section className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Revenue (Year)</CardTitle>
              <CardDescription>Monthly revenue trend</CardDescription>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clients & Loans</CardTitle>
              <CardDescription>Recent clients and outstanding balances</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Next Meeting</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.length > 0 ? (
                    clients.map((c) => (
                      <TableRow 
                        key={c.id} 
                        className="cursor-pointer hover:bg-slate-50"
                        onClick={() => handleClientClick(c.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{c.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{c.name}</div>
                              <div className="text-xs text-slate-500">{c.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{c.loan}</TableCell>
                        <TableCell>₹{c.outstanding.toLocaleString()}</TableCell>
                        <TableCell>{c.nextMeeting}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            c.status === "Active" 
                              ? "bg-green-100 text-green-800" 
                              : c.status === "Prospect" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {c.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500">
                        No clients found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Right column: Activity feed & notes */}
        <section className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {activities.map((a) => (
                  <li key={a.id} className="flex items-start gap-3">
                    <div className="text-xs text-slate-500 w-12">{a.time}</div>
                    <div>
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-slate-400">{a.type}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                className="w-full h-32 p-3 rounded border focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Write a quick note..." 
                value={note}
                onChange={handleNoteChange}
              />
              <div className="mt-2 flex justify-end">
                <Button onClick={handleSaveNote} disabled={!note.trim()}>
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shortcuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" onClick={handleNewLead}>New Lead</Button>
                <Button size="sm" onClick={handlePayment}>Payment</Button>
                <Button size="sm" onClick={handleDocuments}>Documents</Button>
                <Button size="sm" onClick={handleReports}>Reports</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} FinanceCo — Internal Dashboard
      </footer>
    </div>
  );
}
