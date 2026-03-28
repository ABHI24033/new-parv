"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import Link from "next/link";

export function NavProjects({ projects, pathname }) {
  return (
    <SidebarGroup className="mt-4 px-2">
      <SidebarGroupLabel className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        Website Management
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {projects?.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] transition-all duration-200 ${
                item.url === pathname
                  ? "bg-blue-600 text-white font-medium shadow-sm shadow-blue-200 border-l-4 border-blue-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Link href={item.url}>
                <item.icon className={`size-[18px] ${item.url === pathname ? "text-white" : "text-slate-500"}`} />
                <span className="text-[15px]">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
