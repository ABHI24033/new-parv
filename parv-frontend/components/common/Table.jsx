// // import { DataTable } from "./DataTable";

// // export default function Table({ data, columns, filter, filterData, pagination, setPagination }) {
// //   console.log(data?.data);

// //   return (
// //     <div className="flex flex-col gap-4 w-full">
// //       <DataTable
// //         columns={columns}
// //         data={data?.data}
// //         filter={filter}
// //         filterData={filterData}
// //         pagination={pagination}
// //         setPagination={setPagination}
// //       />
// //     </div>
// //   );
// // }





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
import { ArrowUpDown } from "lucide-react";

const staticData = [
  { id: 1, name: "Amit Sharma", role: "Admin", status: "Active", age: 29 },
  { id: 2, name: "Priya Singh", role: "User", status: "Inactive", age: 32 },
  { id: 3, name: "Rohit Verma", role: "Editor", status: "Active", age: 25 },
  { id: 4, name: "Sneha Gupta", role: "Viewer", status: "Active", age: 28 },
  { id: 5, name: "Rahul Mehta", role: "Admin", status: "Inactive", age: 40 },
  { id: 6, name: "Neha Patel", role: "User", status: "Active", age: 23 },
  { id: 7, name: "Aditya Rao", role: "Editor", status: "Active", age: 31 },
  { id: 8, name: "Karan Singh", role: "Viewer", status: "Inactive", age: 33 },
  { id: 9, name: "Shreya Nair", role: "User", status: "Active", age: 27 },
  { id: 10, name: "Virat Shah", role: "Admin", status: "Active", age: 35 },
];

export default function BeautifulTable() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const filteredData = useMemo(() => {
    let data = [...staticData];

    // Search filter
    if (search) {
      data = data.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Sorting
    data.sort((a, b) => {
      const x = a[sortKey];
      const y = b[sortKey];

      if (typeof x === "string") {
        return sortOrder === "asc"
          ? x.localeCompare(y)
          : y.localeCompare(x);
      }
      return sortOrder === "asc" ? x - y : y - x;
    });

    return data;
  }, [search, sortKey, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full p-6 space-y-6">

      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search users..."
          className="w-72 h-11 rounded-xl border border-gray-300 shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-300 transition-all"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border backdrop-blur bg-white/70 shadow-lg transition-all hover:shadow-xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100/60 text-gray-700 border-b">

              <TableHead className="font-semibold text-sm tracking-wide py-4">
                ID
              </TableHead>

              <TableHead
                className="cursor-pointer font-semibold text-sm tracking-wide py-4"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center gap-2">
                  Name <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer font-semibold text-sm tracking-wide py-4"
                onClick={() => toggleSort("role")}
              >
                <div className="flex items-center gap-2">
                  Role <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer font-semibold text-sm tracking-wide py-4"
                onClick={() => toggleSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer font-semibold text-sm tracking-wide py-4"
                onClick={() => toggleSort("age")}
              >
                <div className="flex items-center gap-2">
                  Age <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>

            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-indigo-50/70 transition-colors rounded-xl cursor-pointer"
                >
                  <TableCell className="py-4 text-gray-700 font-medium">
                    {row.id}
                  </TableCell>

                  <TableCell className="py-4 font-semibold text-gray-900">
                    {row.name}
                  </TableCell>

                  <TableCell className="py-4 text-gray-700">
                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-800 text-xs font-medium shadow-sm">
                      {row.role}
                    </span>
                  </TableCell>

                  <TableCell className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${row.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 text-gray-700 font-medium">
                    {row.age}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="5"
                  className="text-center py-10 text-gray-500 text-sm"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-2">

        <p className="text-sm text-gray-600 font-medium">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            className="rounded-xl px-5 py-2 border-gray-300 shadow-sm hover:bg-gray-100"
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            className="rounded-xl px-5 py-2 border-gray-300 shadow-sm hover:bg-gray-100"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>

      </div>

    </div>
  );

}




