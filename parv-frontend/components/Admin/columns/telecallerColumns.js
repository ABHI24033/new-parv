// columns for Telecaller role
// import { Badge, Button } from "@/components/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { multiValueFilter } from "@/lib/utils";

export const telecallerColumns = [
    {
        accessorKey: "role",
        header: "Type",
        enableColumnFilter: true,
        filterFn: multiValueFilter,
        // cell: ({ row }) => (
        //     <Badge variant="outline" className="capitalize text-sm px-2 py-1">{row.getValue("role")}</Badge>
        // ),
    },
    {
        accessorKey: "username",
        header: "Username",
        enableColumnFilter: false,
        // cell: ({ row }) => (
        //     <span className="text-blue-600 font-medium">{row.getValue("username")}</span>
        // ),
    },
    {
        accessorKey: "full_name",
        header: "Name",
        enableColumnFilter: false,
        // cell: ({ row }) => (
        //     <span className="text-gray-800 font-semibold">{row.getValue("full_name")}</span>
        // ),
    },
    {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: false,
        // cell: ({ row }) => {
        //     const value = row.getValue("status");
        //     const color = value === "approved" ? "green" : value === "pending" ? "yellow" : "red";
        //     return (
        //         <Badge className={`capitalize text-sm px-2 py-1 bg-${color}-100 text-${color}-700`}>{value || "N/A"}</Badge>
        //     );
        // },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/telecaller/profile?username=${row.original.username}&role=Telecaller`} className="flex items-center gap-2"><Eye className="h-4 w-4" /> View</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/admin/profile/edit?username=${row.original.username}&role=Telecaller`} className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
        enableColumnFilter: false,
    },
];
