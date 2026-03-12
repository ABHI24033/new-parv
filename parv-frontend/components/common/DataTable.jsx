// "use client";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getFilteredRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { makeSelectableState } from "@/lib/utils";
// import { FilterIcon } from "lucide-react";
// import Filter from "@/components/common/Filter";
// import Pagination from "./Pagination";

// // function Filter({ column, filter, setFilter }) {
// //   return (
// //     <div className="relative overflow-visible filter-element">
// //       <label className="relative h-fit w-fit" htmlFor={filter[column.id].value}>
// //         <input
// //           type="checkbox"
// //           id={filter[column.id].value}
// //           className="peer hidden"
// //         />
// //         <FilterIcon className="relative h-[15px] w-[15px]" />
// //         {/* <Ellipsis className="relative h-fit w-fit" /> */}

// //         <div className="peer-checked:flex hidden absolute left-0 items-stretch  bg-white flex-col  border rounded-sm">
// //           {filter[column.id] &&
// //             filter[column.id].map((elem, ind) => (
// //               <Label
// //                 key={elem.value}
// //                 className="flex items-center hover:bg-gray-300 px-4 py-2 gap-2"
// //               >
// //                 <input
// //                   type="checkbox"
// //                   checked={elem.isChecked}
// //                   onChange={(e) => {
// //                     if (e.target.checked) {
// //                       if (column.getFilterValue() !== undefined) {
// //                         let val = column.getFilterValue();
// //                         column.setFilterValue([...val, elem.value]);
// //                       } else {
// //                         column.setFilterValue([elem.value]);
// //                       }

// //                       setFilter((state) => {
// //                         state[column.id][ind].isChecked = true;
// //                         return state;
// //                       });
// //                     } else {
// //                       if (column.getFilterValue() !== undefined) {
// //                         let val = column.getFilterValue();
// //                         val.splice(val.indexOf(elem.value), 1);
// //                         column.setFilterValue([...val]);
// //                       } else {
// //                         // column.setFilterValue([val]);
// //                       }

// //                       setFilter((state) => {
// //                         state[column.id][ind].isChecked = false;
// //                         return state;
// //                       });
// //                     }
// //                   }}
// //                 />
// //                 <p className="min-w-max">{elem.value}</p>
// //               </Label>
// //             ))}
// //         </div>
// //       </label>
// //     </div>
// //   );
// // }

// export function DataTable({ columns, data, filter, filterData, pagination, setPagination }) {

//   console.log(data);
//   // state responsible for column filtering
//   const [columnFilters, setColumnFilters] = useState(filterData);

//   // state associated with filter elements UI
//   const [filterState, setFilterState] = useState([]);
//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       columnFilters,
//     },
//     enableColumnFilters: true,
//     // onColumnFiltersChange: setColumnFilters,
//     // getCoreRowModel: getCoreRowModel(),
//     // getFilteredRowModel: getFilteredRowModel(), //client side filtering
//     // getSortedRowModel: getSortedRowModel(),
//     // getPaginationRowModel: getPaginationRowModel(),
//     // debugTable: true,
//     // debugHeaders: true,
//     // debugColumns: false,
//   });
//   console.log(table);


//   useState(() => {
//     let selectableState = makeSelectableState(filter);
//     console.log(filter, selectableState, columnFilters);
//     setFilterState(selectableState);
//   }, []);
//   return (
//     <>
//       <div className="flex flex-row flex-wrap gap-4 p-4">
//         {Object.keys(filterState).map((filterItem, index) => {
//           console.log(filterItem, table.getHeaderGroups()[0]);
//           return (
//             <Filter
//               arr={filterState[filterItem]}
//               id={filterItem}
//               label={filterItem}
//               setValue={setFilterState}
//               column={
//                 table
//                   .getHeaderGroups()[0]
//                   .headers.filter((e) => e.id == filterItem)[0].column
//               }
//               key={index}
//             />
//           );
//         })}
//       </div>
//       <div className="rounded-md border">
//         {/* <div>
//         {table
//           .getHeaderGroups()
//           .map((headerGroup) => headerGroup.headers.map((header) => {
//             return <Filter arr={} id={} label={} setValue={} key={} />
//           }))}
//       </div> */}

//         <Table id="myTable">
//           <TableHeader>
//             {table?.getHeaderGroups()?.map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       <div className="flex flex-row items-center gap-2">
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                         {/* {header.column.getCanFilter() ? (
//                         <Filter
//                           column={header.column}
//                           filter={filterState}
//                           setFilter={setFilterState}
//                         />
//                       ) : null} */}
//                       </div>
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table?.getRowModel()?.rows?.length ? (
//               table?.getRowModel()?.rows?.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <Pagination
//         // onPageChange={}
//         currentPage={pagination.currentPage}
//         totalPages={pagination.totalPages}
//         dataLength={data.length}
//         onPageChange={(page) => {
//           setPagination((prev) => ({
//             ...prev,
//             currentPage: page,
//           }));
//         }}
//       />
//     </>
//   );
// }
















"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { makeSelectableState } from "@/lib/utils";
import Filter from "@/components/common/Filter";
import Pagination from "./Pagination";

export function DataTable({
  columns,
  data,
  filter,
  filterData,
  pagination,
  setPagination,
}) {
  // column filter state
  const [columnFilters, setColumnFilters] = useState(filterData);

  // filter UI state
  const [filterState, setFilterState] = useState({});

  // Create selectable state on load
  useEffect(() => {
    const selectableState = makeSelectableState(filter);
    setFilterState(selectableState);
  }, [filter]);

  // Initialize react table engine
  // const table = useReactTable({
  //   data,
  //   columns,
  //   state: {
  //     columnFilters,
  //   },
  //   onColumnFiltersChange: setColumnFilters,
  //   enableColumnFilters: true,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  // });


  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(data);

  console.log(table);
  console.log(table?.getRowModel?.());


  return (
    <>
      {/* FILTER BAR */}
      <div className="flex flex-row flex-wrap gap-4 p-4">
        {Object.keys(filterState).map((filterItem, index) => {
          const column = table
            .getAllColumns()
            .find((c) => c.id === filterItem);

          if (!column) return null;

          return (
            <Filter
              key={index}
              arr={filterState[filterItem]}
              id={filterItem}
              label={filterItem}
              setValue={setFilterState}
              column={column}
            />
          );
        })}
      </div>

      {/* TABLE */}
      <div className="rounded-md border">
        <Table id="myTable">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div className="flex flex-row items-center gap-2">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table?.getRowModel?.().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        dataLength={data.length}
        onPageChange={(page) =>
          setPagination((prev) => ({ ...prev, currentPage: page }))
        }
      />
    </>
  );
}
