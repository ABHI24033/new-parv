"use client";

import React from "react";
import { Bell, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notificationApi } from "@/lib/api/notification";
import Link from "next/link";
import toast from "react-hot-toast";

export function NotificationBell() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await notificationApi.getAll();
      return res.data;
    },
    staleTime: 60 * 1000,         // fresh for 60s
    refetchInterval: 60 * 1000,   // poll every 60s
    refetchIntervalInBackground: false,
  });

  const notifications = data?.data || [];
  const unreadCount = data?.unreadCount || 0;

  const markReadMutation = useMutation({
    mutationFn: (id) => notificationApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read");
    },
    onError: () => {
      toast.error("Failed to mark all as read");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto p-0 hover:bg-transparent text-blue-600"
              onClick={() => markAllReadMutation.mutate()}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-4 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n._id}
                className={`flex flex-col items-start p-3 focus:bg-gray-50 cursor-pointer ${
                  !n.read ? "bg-blue-50/50" : ""
                }`}
                onClick={() => n.link && (window.location.href = n.link)}
              >
                <div className="flex w-full justify-between gap-2">
                  <p className={`text-sm font-semibold ${!n.read ? "text-blue-900" : "text-gray-900"}`}>
                    {n.title}
                  </p>
                  {!n.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 h-auto p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        markReadMutation.mutate(n._id);
                      }}
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {n.message}
                </p>
                <p className="text-[10px] text-gray-400 mt-2">
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center text-blue-600 font-medium">
          <Link href="/dashboard/notifications">View all notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
