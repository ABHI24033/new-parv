"use client";

import { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, ArrowUpDown, User, Trash, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function TelecallerTable({
    data = [],
    isLoading,
    isFetchingNext,
    loadMore,
    hasNextPage,
    search,
    setSearch,
}) {

    const [sortKey, setSortKey] = useState("full_name");
    const [sortOrder, setSortOrder] = useState("asc");

    // Local sorting (only sorts current loaded data)
    const sortedData = useMemo(() => {
        let temp = [...data];

        temp.sort((a, b) => {
            const x = a[sortKey] ?? "";
            const y = b[sortKey] ?? "";

            if (typeof x === "string") {
                return sortOrder === "asc"
                    ? x.localeCompare(y)
                    : y.localeCompare(x);
            }
            return sortOrder === "asc" ? x - y : y - x;
        });

        return temp;
    }, [data, sortKey, sortOrder]);


    const toggleSort = (key) => {
        if (key === sortKey) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    return (
        <div className="w-full p-6 space-y-6">

            {/* Search */}
            <div className="flex justify-between items-center">
                <Input
                    placeholder="Search user data..."
                    className="w-72"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="rounded-xl border shadow-md overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-gray-100">
                        <TableRow>
                            <TableHead>Username</TableHead>

                            <TableHead
                                onClick={() => toggleSort("full_name")}
                                className="cursor-pointer"
                            >
                                <div className="flex items-center gap-1">
                                    Full Name <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </TableHead>

                            <TableHead>Phone</TableHead>

                            <TableHead
                                onClick={() => toggleSort("gender")}
                                className="cursor-pointer"
                            >
                                <div className="flex items-center gap-1">
                                    Gender <ArrowUpDown className="h-4 w-4" />
                                </div>
                            </TableHead>

                            <TableHead>Email</TableHead>
                            <TableHead>Address</TableHead>

                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-6">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : sortedData.length ? (
                            sortedData.map((user, index) => (
                                <TableRow
                                    key={user._id || index}
                                    className="hover:bg-gray-50"
                                >
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell className="font-medium">
                                        {user.full_name}
                                    </TableCell>
                                    <TableCell>{user?.phone_no}</TableCell>
                                    <TableCell>{user?.gender}</TableCell>
                                    <TableCell>{user?.email}</TableCell>
                                    <TableCell>{user?.present_address}</TableCell>

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5 cursor-pointer" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Link href={`/dashboard/telecaller/profile?userId=${user._id}`} className="flex items-center gap-2">
                                                        <User />
                                                        View
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem>
                                                    <Link href={`/dashboard/admin/edit/profile/${user._id}`} className="flex items-center gap-2">
                                                        <Edit2 />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => onSoftDelete(user?._id)}
                                                    className="text-red-500 hover:bg-red-100 flex items-center gap-2 hover:text-gray-800 cursor-pointer">
                                                    <Trash className="text-red-500 hover:bg-red-100 hover:text-gray-800" />
                                                    Remove
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => onHardDelete(user?._id)}
                                                    className="text-red-600 hover:bg-red-100 flex items-center gap-2 hover:text-gray-800 cursor-pointer">
                                                    <Trash2 className="text-red-600 hover:bg-red-100 hover:text-gray-800" />
                                                    Permanently Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No results found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Load More Button (Infinite Pagination) */}
            {hasNextPage && (
                <div className="flex justify-center pt-3">
                    <Button
                        variant="outline"
                        onClick={loadMore}
                        disabled={isFetchingNext}
                    >
                        {isFetchingNext ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
}