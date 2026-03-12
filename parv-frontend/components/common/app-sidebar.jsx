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
import { AdminSidebar } from "@/lib/Sidebarconfig";
// import { AdminSidebar, DSASidebar, FieldStaffSidebar, RMSidebar, TelecallerSidebar } from "@/lib/Sidebarconfig";
import Link from "next/link";

export function AppSidebar({ ...props }) {
  const userState = useUserState();
  const pathname = usePathname();
  let roleData = {};

  // switch (userState.profile?.role) {
  //   case "Admin":
  roleData = AdminSidebar;
  //     break;
  //   case "RM":
  //     roleData = RMSidebar;
  //     break;
  //   case "DSA":
  //     roleData = DSASidebar;
  //     break;
  //   case "Telecaller":
  //     roleData = TelecallerSidebar;
  //     break;
  //   case "Field Staff":
  //     roleData = FieldStaffSidebar;
  //     break;
  // }

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="w-full flex flex-row items-center justify-start p-2">
        <Link href={'/'}>
          <div className="gap-2 flex flex-row justify-start items-center overflow-hidden w-fit">
            <img src="/logo/PAR2.png" alt="Logo" className="w-10 aspect-square" />
            <h2 className="min-w-max">Parv Financial Service</h2>
          </div>
        </Link>
      </div>
      <SidebarContent>
        <NavProjects projects={roleData?.projects} pathname={pathname} />
        <NavMain items={roleData?.navMain} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userState?.profile} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
