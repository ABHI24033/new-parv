"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/Header";
import Spinner from "@/components/common/Spinners";

import { useAuth } from "@/context/AuthContext";

const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <Spinner />;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="bg-slate-50 flex flex-col">
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6">
            <Suspense fallback={<Spinner />}>
              {children}
            </Suspense>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
