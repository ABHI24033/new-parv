"use client";
import { useUserState } from "@/app/dashboard/store";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { NavMain } from "./nav_main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { 
  AdminSidebar, 
  DSASidebar, 
  FieldStaffSidebar, 
  RMSidebar, 
  TelecallerSidebar 
} from "@/lib/Sidebarconfig";
import Link from "next/link";

export function AppSidebar({ ...props }) {
  const userState = useUserState();
  const pathname = usePathname();
  
  const sidebarConfigs = {
    Admin: AdminSidebar,
    DSA: DSASidebar,
    RM: RMSidebar,
    Telecaller: TelecallerSidebar,
    "Field Staff": FieldStaffSidebar,
  };
  
  const role = userState?.user?.role;
  const roleData = sidebarConfigs[role] || AdminSidebar;

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-100 shadow-sm" {...props}>
      <div className="flex h-16 items-center px-4 mb-2">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
            <img src="/logo/PAR2.png" alt="Parv" className="w-7 h-7 object-contain brightness-0 invert" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold text-slate-900 leading-tight">Parv Financial</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Services Pvt Ltd</span>
          </div>
        </Link>
      </div>

      <SidebarContent className="px-2 pb-4 pt-2">
        <NavMain items={roleData?.navMain} pathname={pathname} />
        <NavProjects projects={roleData?.projects} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-slate-50">
        <NavUser user={userState?.profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
