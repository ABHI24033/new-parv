"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/hooks/useAuth";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  const initials = user?.full_name?.split(" ").slice(0, 2).map(n => n[0]).join("") || "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-3 px-2 rounded-xl transition-all hover:bg-slate-50 data-[state=open]:bg-slate-50"
            >
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm shadow-slate-200">
                {user?.photo ? (
                  <AvatarImage src={user.photo} alt={user.full_name} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-[10px] font-bold">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-bold text-slate-900">
                  {user?.full_name || "User"}
                </span>
                <span className="truncate text-xs text-slate-500 font-medium">
                  {user?.username || "username"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-2 shadow-xl border-slate-100"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <Link href="/dashboard/profile" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <Avatar className="h-10 w-10 border border-slate-100">
                  {user?.photo ? (
                    <AvatarImage src={user.photo} alt={user.full_name} />
                  ) : (
                    <AvatarFallback className="bg-slate-100 text-blue-600 text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-slate-900">{user?.full_name}</span>
                  <span className="truncate text-xs text-slate-500">{user?.username}</span>
                </div>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 rounded-lg focus:bg-red-50 focus:text-red-700 cursor-pointer transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
