"use client";

import React, { useEffect, useState } from "react";
import { 
  Bell, 
  Check, 
  Trash2, 
  MoreVertical, 
  CheckCheck,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { notificationApi } from "@/lib/api/notification";
import toast from "react-hot-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationApi.getAll();
      setNotifications(res.data.data);
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notificationApi.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      toast.error("Failed to update notification");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All marked as read");
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationApi.delete(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-500 font-medium mt-1">Stay updated with your latest activities and important alerts.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleMarkAllRead} 
          className="gap-2 border-slate-200 font-bold rounded-xl h-12 px-6 hover:bg-slate-50 transition-all shadow-sm"
        >
          <CheckCheck className="h-4 w-4 text-blue-600" />
          Mark all as read
        </Button>
      </div>

      <Card className="border-none shadow-xl shadow-slate-100/50 bg-white rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
                  <Bell className="text-white size-5" />
               </div>
               <CardTitle className="text-xl font-black text-slate-800">Recent Alerts</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-black rounded-lg px-3 py-1 border-blue-100">
               {notifications.filter(n => !n.read).length} Unread
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 p-6 border border-slate-50 rounded-[2rem]">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <div className="space-y-3 flex-1 pt-1">
                    <Skeleton className="h-5 w-1/4 rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-50 mx-auto w-fit mb-6 text-slate-200">
                <Bell className="h-16 w-16" strokeWidth={1} />
              </div>
              <p className="text-2xl font-black text-slate-800 tracking-tight">No notifications yet</p>
              <p className="text-slate-400 font-medium mt-2 max-w-[280px] mx-auto">We'll alert you here when new activities or updates occur.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`flex items-start gap-4 md:gap-6 p-5 md:p-6 border rounded-[2rem] transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 group relative ${
                    !n.read ? "bg-blue-50/30 border-blue-100/50" : "bg-white border-transparent hover:border-slate-100"
                  }`}
                >
                  <div className={`mt-1 h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                    !n.read ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105" : "bg-slate-100 text-slate-400"
                  }`}>
                    <Bell className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                      <h3 className={`text-base font-black truncate tracking-tight ${!n.read ? "text-slate-900" : "text-slate-700"}`}>
                        {n.title}
                      </h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={10} />
                        {new Date(n.createdAt).toLocaleDateString()} • {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed mb-3 font-medium ${!n.read ? "text-slate-600" : "text-slate-500"}`}>
                      {n.message}
                    </p>
                    
                    {n.link && (
                      <Button variant="link" className="p-0 h-auto text-[11px] font-black uppercase tracking-[0.15em] text-blue-600 hover:text-blue-700 no-underline hover:underline gap-1.5" asChild>
                         <a href={n.link}>
                            View Details <ChevronRight size={14} className="mb-0.5" />
                         </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {!n.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl"
                        onClick={() => handleMarkRead(n._id)}
                      >
                        <Check className="h-5 w-5" />
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl hover:bg-slate-100">
                          <MoreVertical className="h-5 w-5 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl p-1 shadow-xl border-slate-100">
                        <DropdownMenuItem onClick={() => handleDelete(n._id)} className="text-red-600 font-bold focus:text-red-600 focus:bg-red-50 rounded-lg cursor-pointer">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
