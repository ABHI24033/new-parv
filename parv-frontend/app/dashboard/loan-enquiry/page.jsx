// "use client";

// import { useEffect, useState, useTransition } from "react";
// // import { deleteEnquiryById, getPaginatedEnquiries } from "@/lib/actions/enquiry";
// import { useUserState } from "@/app/dashboard/store";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
// import Pagination from "@/components/common/Pagination";
// import { Button } from "@/components/ui/button";
// import { AlertModal } from "@/components/common/Modals";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MoreVertical } from "lucide-react";
// import { Eye } from "lucide-react";
// import { Trash } from "lucide-react";

// const EnquiryTable = ({ enquiries, confirmDelete }) => {
//   const [selected, setSelected] = useState(null)
//   const [open, setOpen] = useState(false)

//   return (
//     <div className="overflow-x-auto rounded-lg shadow-md">
//       <table className="min-w-full text-sm border border-gray-200">
//         <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
//           <tr>
//             <th className="py-2 px-3 border-b">Loan Product</th>
//             <th className="py-2 px-3 border-b">Loan Amount</th>
//             <th className="py-2 px-3 border-b">Profession</th>
//             <th className="py-2 px-3 border-b">Full Name</th>
//             <th className="py-2 px-3 border-b">Phone</th>
//             <th className="py-2 px-3 border-b">City</th>
//             <th className="py-2 px-3 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {enquiries?.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="py-1 px-2 text-center">{item?.loanProduct || "-"}</td>
//               <td className="py-1 px-2 text-center">{item?.loanAmount || "-"}</td>
//               <td className="py-1 px-2 text-center">{item?.profession || "-"}</td>
//               <td className="py-1 px-2 text-center">{item?.fullName || "-"}</td>
//               <td className="py-1 px-2 text-center">{item?.phone || "-"}</td>
//               <td className="py-1 px-2 text-center">{item?.city || "-"}</td>
//               <td className="py-1 px-2 text-center">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreVertical className="w-5 h-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem
//                       onClick={() => {
//                         setSelected(item)
//                         setOpen(true)
//                       }}
//                       className={"cursor-pointer"}
//                     >
//                       <Eye/>View
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => confirmDelete(item?.id)} className={"cursor-pointer hover:text-red-400 hover:bg-red-50"}>
//                       <Trash/> Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog for Viewing Details */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Enquiry Details</DialogTitle>
//           </DialogHeader>
//           {selected && (
//             <div className="space-y-2 text-sm">
//               <p><strong>DSA ID:</strong> {selected?.DSAID || "-"}</p>
//               <p><strong>DSA Name:</strong> {selected?.DSAName || "-"}</p>
//               <p><strong>Loan Product:</strong> {selected?.loanProduct || "-"}</p>
//               <p><strong>Loan Amount:</strong> {selected?.loanAmount || "-"}</p>
//               <p><strong>Profession:</strong> {selected?.profession || "-"}</p>
//               <p><strong>Full Name:</strong> {selected?.fullName || "-"}</p>
//               <p><strong>Phone:</strong> {selected?.phone || "-"}</p>
//               <p><strong>WhatsApp:</strong> {selected?.whatsappNo || "-"}</p>
//               <p><strong>Email:</strong> {selected?.email || "-"}</p>
//               <p><strong>City:</strong> {selected?.city || "-"}</p>
//               <p><strong>Pincode:</strong> {selected?.pincode || "-"}</p>
//               <p><strong>Source:</strong> {selected?.source || "-"}</p>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


// const Page = () => {
//     const userState = useUserState();
//     const [enquiries, setEnquiries] = useState([]);
//     const [pagination, setPagination] = useState({
//         currentPage: 1,
//         totalPages: 0,
//         lastDocIds: [null],
//     });
//     console.log(enquiries);

//     const [isPending, startTransition] = useTransition();
//     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);

//     const pageSize = Number(10);
//     const fetchPage = async (pageNumber) => {
//         const startAfterId = pagination.lastDocIds[pageNumber - 1] || null;
//         // const res = await getPaginatedEnquiries(pageSize, startAfterId, pageNumber);

//         if (res?.data) {
//             setEnquiries(res.data);

//             setPagination((prev) => {
//                 const newLastDocIds = [...prev.lastDocIds];
//                 if (res.lastDocId && pageNumber >= prev.lastDocIds.length) {
//                     newLastDocIds[pageNumber] = res.lastDocId;
//                 }
//                 return {
//                     ...prev,
//                     currentPage: pageNumber,
//                     totalPages: res.totalPages,
//                     lastDocIds: newLastDocIds,
//                 };
//             });
//         } else {
//             toast.error("Failed to load enquiries.");
//         }
//     };


//     useEffect(() => {
//         fetchPage(pagination.currentPage);
//     }, [pagination.currentPage]);

//     const handlePageChange = (page) => {
//         setPagination((prev) => ({ ...prev, currentPage: page }));
//     };

//     const confirmDelete = (id) => {
//         console.log("Confirm delete for ID:", id);

//         setSelectedEnquiryId(id);
//         setDeleteModalOpen(true);
//     };

//     const handleConfirmDelete = () => {
//         startTransition(async () => {
//             // const res = await deleteEnquiryById(selectedEnquiryId);
//             // if (res?.success) {
//             //     toast.success("Enquiry deleted successfully");
//             // } else {
//             //     toast.error(res?.message || "Failed to delete enquiry.");
//             // }
//             setDeleteModalOpen(false);
//             setSelectedEnquiryId(null);
//             fetchPage(pagination.currentPage);
//         });
//     };

//     return (
//         <div>
//             <div className="px-5">
//                 <Toaster />
//                 <h3 className='text-xl font-semibold px-5 py-4'>Loan Enquiry Data</h3>

//                 <EnquiryTable enquiries={enquiries} confirmDelete={confirmDelete}/>

//                 <div className="flex justify-center mt-6">
//                     <Pagination
//                         currentPage={pagination?.currentPage}
//                         totalPages={pagination?.totalPages}
//                         onPageChange={handlePageChange}
//                         dataLength={enquiries.length}
//                     />
//                 </div>

//             </div>
//             <AlertModal
//                 open={deleteModalOpen}
//                 onClose={() => setDeleteModalOpen(false)}
//                 onConfirm={handleConfirmDelete}
//                 isLoading={isPending}
//             // title="Delete Enquiry"
//             // description="Are you sure you want to delete this enquiry?"
//             />
//         </div>
//     );
// };

// export default Page;

export default function LoanEnquiry() {
    return (
        <div>
            <h1>Loan Enquiry</h1>
        </div>
    );
}
