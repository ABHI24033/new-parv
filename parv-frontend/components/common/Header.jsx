"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { LogOut, HomeIcon, User2, Search, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function Header() {
  const { user, logout } = useAuth();
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    // Remove 'dashboard' if it's the first segment for cleaner display
    const filteredParts = parts[0] === "dashboard" ? parts.slice(1) : parts;
    setSegments(filteredParts);
  }, []);

  const initials =
    user?.full_name
      ?.split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("") || "U";

  const getPageTitle = () => {
    if (segments.length === 0) return "Dashboard";
    const lastSegment = segments[segments.length - 1];
    return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between border-b bg-white/80 px-4 py-2 backdrop-blur-md transition-all duration-300 md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-9 w-9 text-slate-500 hover:bg-slate-100 transition-colors" />
        <Separator orientation="vertical" className="h-6 bg-slate-200" />

        <div className="flex flex-col">
          <h1 className="hidden text-lg font-bold text-slate-900 sm:block md:text-xl">
            {getPageTitle()}
          </h1>
          <Breadcrumb className="hidden lg:flex">
            <BreadcrumbList>
              {segments.map((segment, idx) => (
                <div key={idx} className="flex items-center">
                  {idx > 0 && <BreadcrumbSeparator className="mx-1" />}
                  <BreadcrumbPage className="text-xs font-medium capitalize text-slate-500 xl:text-sm">
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbPage>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Input - Desktop */}
        <div className="relative hidden md:flex items-center group">
          <Search className="absolute left-3 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder="Search..." 
            className="h-10 w-72 rounded-full border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 md:gap-2">
           <NotificationBell />
           <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 rounded-full hover:bg-slate-100 hidden sm:flex">
             <Settings className="h-5 w-5" />
           </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-slate-200 mx-1 hidden sm:block" />

        {/* User Profile Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer p-1 pr-2 rounded-full hover:bg-slate-50 transition-colors group">
              <Avatar className="w-8 h-8 md:w-9 md:h-9 border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:ring-blue-100 transition-all">
                {user?.photo ? (
                  <AvatarImage src={user.photo} alt={user.full_name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-sm font-semibold leading-none text-slate-900">{user?.full_name}</span>
                <span className="mt-1 text-xs uppercase leading-none tracking-wider text-slate-500">{user?.role || 'User'}</span>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-56 p-2 mt-2" align="end shadow-xl border-slate-100">
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.full_name}</p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.username}</p>
            </div>

            <div className="space-y-0.5">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <User2 size={16} /> View Profile
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <HomeIcon size={16} /> Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <Settings size={16} /> Settings
              </Link>
            </div>

            <Separator className="my-1.5" />

            <Button
              onClick={logout}
              variant="ghost"
              className="w-full flex items-center justify-start gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
            >
              <LogOut size={16} /> Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
