"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  HomeIcon,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User2,
} from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

function DashboardHeader() {
  const { user, logout } = useAuth();
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
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
        <SidebarTrigger className="h-9 w-9 text-slate-500 transition-colors hover:bg-slate-100" />
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
        <div className="group relative hidden items-center md:flex">
          <Search className="absolute left-3 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
          <Input
            placeholder="Search..."
            className="h-10 w-72 rounded-full border-slate-200 bg-slate-50 pl-9 text-sm focus-visible:border-blue-500 focus-visible:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <NotificationBell />
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 sm:flex"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 hidden h-6 bg-slate-200 sm:block" />

        <Popover>
          <PopoverTrigger asChild>
            <div className="group flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-slate-50">
              <Avatar className="h-8 w-8 border-2 border-white shadow-sm ring-1 ring-slate-100 transition-all group-hover:ring-blue-100 md:h-9 md:w-9">
                {user?.photo ? (
                  <AvatarImage src={user.photo} alt={user.full_name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden text-left lg:flex lg:flex-col">
                <span className="text-sm font-semibold leading-none text-slate-900">{user?.full_name}</span>
                <span className="mt-1 text-xs uppercase leading-none tracking-wider text-slate-500">
                  {user?.role || "User"}
                </span>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="mt-2 w-56 border-slate-100 p-2 shadow-xl" align="end">
            <div className="mb-1 border-b border-slate-100 px-3 py-2">
              <p className="truncate text-sm font-semibold text-slate-900">{user?.full_name}</p>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">{user?.username}</p>
            </div>

            <div className="space-y-0.5">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
              >
                <User2 size={16} /> View Profile
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
              >
                <HomeIcon size={16} /> Dashboard
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
              >
                <Settings size={16} /> Settings
              </Link>
            </div>

            <Separator className="my-1.5" />

            <Button
              onClick={logout}
              variant="ghost"
              className="flex w-full items-center justify-start gap-2.5 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={16} /> Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

function PublicHeroHeader({ title, subTitle }) {
  return (
    <section className="relative overflow-hidden border-b border-blue-100/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_26%),linear-gradient(135deg,#eff6ff_0%,#ffffff_48%,#ecfeff_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-60" />
      <div className="relative mx-auto grid max-w-7xl justify-center gap-8 px-4 py-10 text-center sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Parv Financial Services
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subTitle ? (
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {subTitle}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/loan-enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
            >
              Apply For A Loan
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-700"
            >
              EMI Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Header(props) {
  if (props?.title || props?.subTitle) {
    return <PublicHeroHeader {...props} />;
  }

  return <DashboardHeader />;
}

export default Header;
