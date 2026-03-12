"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ items, pathname }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-base font-medium">
        Dashboard
      </SidebarGroupLabel>
      <SidebarMenu>
        { items?.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible" open={true}>
            <SidebarMenuItem >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  // className={`${item?.isActive ? "bg-blue-500 text-white hover:bg-blue-400 hover:text-white" : "hover:bg-zinc-200"}`}
                >
                  {item.icon && <item.icon />}
                  <Link href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item?.items?.map((subItem) => (
                    <SidebarMenuSubItem
                      key={subItem.title}
                      className="flex gap-1 items-center "
                    >
                      {/* {subItem?.icon && <subItem.icon size={17} className="text-sm"/>} */}
                      <SidebarMenuSubButton
                        asChild
                        className={`w-full ${
                          subItem?.url == pathname
                            ? "bg-blue-500 text-white hover:bg-blue-400 hover:text-white"
                            : "hover:bg-zinc-200"
                        }`}
                      >
                        {/* {subItem?.icon && <subItem.icon size={17}/>} */}
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
