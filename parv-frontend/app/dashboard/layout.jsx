// "use client";
// import { useGetUserDataByToken } from "@/hooks/useUser";
// import { useUserState } from "./store/index";
// import { Suspense, useEffect } from "react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Separator } from "@/components/ui/separator";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { AppSidebar } from "@/components/common/app-sidebar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";
// import Spinner from "@/components/common/Spinners";
// import { Bell } from "lucide-react";
// import Link from "next/link";
// import { HomeIcon } from "lucide-react";
// import { useLogout } from "@/hooks/useAuth";
// import { User2 } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";


// const Layout = ({ children }) => {
//   const router = useRouter();
//   let userState = useUserState();
//   const { login, loading, user } = useAuth();
// console.log(user);

//   const logoutMutation = useLogout();
//   const { data: userData, isLoading, error } = useGetUserDataByToken();

//   const handleLogout = () => {
//     logoutMutation.mutate();
//   };

//   const [segments, setSegments] = useState([]);

//   useEffect(() => {
//     const path = window.location.pathname;
//     const parts = path.split("/").filter(Boolean);
//     setSegments(parts);
//   }, []);

//   return (
//     <div className="flex flex-row">
//       <SidebarProvider>
//         <AppSidebar />
//         <SidebarInset>
//           <header className="flex h-16 border-b shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//             <div className="flex  items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1" />
//               <Separator
//                 orientation="vertical"
//                 className="mr-2 data-[orientation=vertical]:h-4"
//               />
//               <Breadcrumb className="hidden md:flex">
//                 <BreadcrumbList>
//                   {segments.map((segment, idx) => {
//                     const href = "/" + segments.slice(0, idx + 1).join("/");
//                     const isLast = idx === segments.length - 1;
//                     return (
//                       <div key={idx} className="flex items-center">
//                         {idx > 0 && <BreadcrumbSeparator />}
//                         {isLast ? (
//                           <BreadcrumbPage>
//                             {segment.charAt(0).toUpperCase() + segment.slice(1)}
//                           </BreadcrumbPage>
//                         ) : (
//                           <BreadcrumbItem>
//                             <BreadcrumbLink href={href}>
//                               {segment.charAt(0).toUpperCase() + segment.slice(1)}
//                             </BreadcrumbLink>
//                           </BreadcrumbItem>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </BreadcrumbList>
//               </Breadcrumb>
//             </div>

//             <div className=" flex items-center gap-4 px-6">
//               <div className="cursor-pointer">
//                 <Bell />
//               </div>
//               <Popover>
//                 <PopoverTrigger>
//                   <Avatar className={'w-10 h-10 cursor-pointer bg-gray-800'}>
//                     <AvatarImage />
//                     <AvatarFallback className={' text-sm bg-gray-700 text-white'}>{userState?.profile?.full_name?.split(" ").map(word => word[0]).join("")}</AvatarFallback>
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent className={'space-y-1.5'}>
//                   <div className="flex items-center gap-2 border-b py-2">
//                     <Avatar className={'w-10 h-10'}>
//                       <AvatarImage />
//                       <AvatarFallback className={'text-sm uppercase'}>
//                         {userState?.profile?.full_name?.split(" ").map((word, index) => index === 0 || index === 1 ? word[0] : '').join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="leading-4">{userState?.profile?.full_name}</p>
//                       <p className="text-xs font-light text-gray-600">{userState?.profile?.username}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 py-2 px-3 cursor-pointer rounded-md hover:bg-gray-100">
//                     <Link href="/" className="flex gap-2 items-center">
//                       <HomeIcon size={16} /> Home
//                     </Link>
//                   </div>
//                   <div className="flex items-center gap-2 py-2 px-3 cursor-pointer rounded-md hover:bg-gray-100">
//                     <Link href="/" className="flex gap-2 items-center">
//                       <User2 size={16} /> Profile
//                     </Link>
//                   </div>
//                   <div>
//                     <Button
//                       onClick={handleLogout}
//                       disabled={logoutMutation.isPending}
//                       className={'flex items-center gap-2 w-full'}
//                     >
//                       <LogOut />
//                       {logoutMutation.isPending ? "Logging out..." : "Log out"}
//                     </Button>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           </header>

//           <Suspense>
//             {isLoading ? <Spinner /> : children}
//           </Suspense>
//         </SidebarInset>
//       </SidebarProvider>
//     </div>
//   );
// };

// export default Layout;


















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
