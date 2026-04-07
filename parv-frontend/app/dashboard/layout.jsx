"use client";
import { useEffect, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/Header";
import Spinner from "@/components/common/Spinners";

import { useAuth } from "@/context/AuthContext";

const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, loading, router, pathname]);

  // Only show full-page spinner during initial auth check
  if (loading) return <Spinner />;

  // If not authenticated, show nothing while redirect happens
  if (!user) return null;

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
