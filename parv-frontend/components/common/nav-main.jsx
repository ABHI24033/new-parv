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
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
              >
                <Link href={item.url} className="flex items-center w-full">
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto absolute right-2">
                  <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </Button>
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
