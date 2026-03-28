// "use client";

// import { ChevronRight } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuAction,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarMenuSub,
//   SidebarMenuSubButton,
//   SidebarMenuSubItem,
// } from "@/components/ui/sidebar";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export function NavMain({ items }) {
//   const pathname = usePathname();
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items?.map((item) => (
//           <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild tooltip={item.title}>
//                 <a href={item.url}>
//                   <item.icon />
//                   <span>{item.title}</span>
//                 </a>
//               </SidebarMenuButton>
//               {item.items?.length ? (
//                 <>
//                   <CollapsibleTrigger asChild>
//                     <SidebarMenuAction className="data-[state=open]:rotate-90">
//                       <ChevronRight />
//                       <span className="sr-only">Toggle</span>
//                     </SidebarMenuAction>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items?.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton
//                             asChild
//                             isActive={pathname == subItem.url}
//                             className={pathname==subItem.url?"bg-blue-500":""}
//                           >
//                             <Link href={subItem.url} >
//                               <span>{subItem.title}</span>
//                             </Link>
//                           </SidebarMenuSubButton>
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </>
//               ) : null}
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }









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
      <SidebarGroupLabel className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        Main Menu
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {items?.map((item) => {
          const isActive = item.url === pathname || item.items?.some((s) => s.url === pathname);
          const hasChildren = item.items?.length > 0;

          return (
          <Collapsible key={item.title} asChild className="group/collapsible" defaultOpen={item.items?.some((s) => s.url === pathname)}>
            <SidebarMenuItem>
              {hasChildren ? (
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50/80 font-semibold text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.icon && (
                      <item.icon className={`size-[18px] ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                    )}
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50/80 font-semibold text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <item.icon className={`size-[18px] ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                    )}
                    <span className="flex-1 text-left">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
              {hasChildren && (
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-4 mt-1 border-l border-slate-100 pl-2 space-y-1">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={`w-full rounded-md px-3 py-2 text-sm transition-colors ${
                            subItem.url === pathname
                              ? "bg-blue-600 text-white font-medium shadow-sm shadow-blue-200 border-l-4 border-blue-800 -ml-[13px] pl-[9px]"
                              : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        )})}
      </SidebarMenu>
    </SidebarGroup>
  );
}
