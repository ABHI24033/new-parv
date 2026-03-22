"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useGetLeads, useDeleteLead } from "@/hooks/useLead";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreVertical } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

import { AlertModal } from "../common/Modals";
import { LeadDialog } from "./LeadModels";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import LeadForm from "./LeadForm";
import RemarksModal from "../common/RemarksModal";
import { useUserState } from "@/app/dashboard/store";
import { Toaster } from "react-hot-toast";
import { downloadLeadExcel } from "@/lib/functions/Lead";

export default function LeadsTable() {
    const [pagination, setPagination] = useState({
        lastDocId: null,
        currentPage: 1,
        totalPages: 1,
    });
    const [deleteModal, setDeleteModal] = useState({ open: false, leadId: null });
    const [editLead, setEditLead] = useState(null);

    const { data: leadsData, isLoading, refetch } = useGetLeads(
        10,
        pagination.lastDocId,
        pagination.currentPage
    );

    const deleteLeadMutation = useDeleteLead();

    const leads = leadsData?.data || [];
    const paginationData = {
        lastDocId: leadsData?.lastDocId || null,
        currentPage: leadsData?.currentPage || 1,
        totalPages: leadsData?.totalPages || 1,
    };

    const user = useUserState();

    function handleDelete(id) {
        deleteLeadMutation.mutate(id, {
            onSuccess: () => {
                toast.success("Lead deleted");
                refetch();
                setDeleteModal({ open: false, leadId: null });
            },
        });
    }

    function handlePageChange(newPage, newLastDocId) {
        setPagination({
            ...pagination,
            currentPage: newPage,
            lastDocId: newLastDocId,
        });
    }


    return (
        <div className="mt-6 border rounded-lg shadow overflow-x-auto">
            <Toaster />
            <div className="flex justify-end py-4 px-2">
                <Button onClick={downloadLeadExcel}>Download data</Button>
            </div>
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Lead Name</th>
                        <th className="p-2">Profession</th>
                        <th className="p-2">Contact</th>
                        <th className="p-2">Loan Product</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads?.length > 0 &&
                        leads?.map((lead) => (
                            <tr key={lead?._id} className="border-t">
                                <td className="p-2">{lead?.date}</td>
                                <td className="p-2">{lead?.leadName}</td>
                                <td className="p-2">{lead?.profession}</td>
                                <td className="p-2">{lead?.contactNo}</td>
                                <td className="p-2">{lead?.loanProduct}</td>
                                <td className="p-2">{lead?.leadStatus}</td>
                                <td className="p-2 space-x-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2">
                                            <div className="flex flex-col gap-1">
                                                <LeadDialog lead={lead} />
                                                <RemarksModal
                                                    leadId={lead?._id}
                                                    remarks={lead?.remarks}
                                                    user={user?.profile}
                                                    fetchLeads={refetch}
                                                />
                                                <button
                                                    onClick={() => setEditLead(lead)}
                                                    className="flex items-center gap-1 px-2 cursor-pointer py-1 rounded-md hover:bg-gray-100 transition-colors"
                                                >
                                                    <Pencil className="h-4 w-4 text-gray-600" />
                                                    <span className="text-sm font-medium">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDeleteModal({ open: true, leadId: lead?._id })
                                                    }
                                                    className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-red-100 text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="text-sm font-medium">Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    {leads.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center p-4 text-gray-500">
                                No leads found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* delete model */}
            <AlertModal
                onClose={() => setDeleteModal({ open: false, leadId: null })}
                open={deleteModal.open}
                onConfirm={() => handleDelete(deleteModal.leadId)}
                // isLoading={deleteLeadMutation.isPending}
                heading="Are you sure?"
                message="This action cannot be undone. Are you sure you want to permanently delete this lead?"
                btnText="Delete"
            />

            {/* Edit Dialog */}
            {editLead && (
                <Dialog open={!!editLead} onOpenChange={(o) => !o && setEditLead(null)}>
                    <DialogContent className="max-h-[90vh] w-full md:max-w-5xl overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Lead</DialogTitle>
                        </DialogHeader>
                        <LeadForm
                            setOpen={() => setEditLead(null)}
                            defaultValues={editLead} // 👈 pre-fills form
                            onSuccess={refetch}
                        />
                    </DialogContent>
                </Dialog>
            )}

            {/* Pagination controls */}
            <div className="flex items-center justify-between p-4">
                <Button
                    size="sm"
                    variant="outline"
                    disabled={pagination.currentPage <= 1}
                    onClick={() => handlePageChange(pagination.currentPage - 1, null)}
                >
                    Previous
                </Button>
                <span>
                    Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={pagination.currentPage >= pagination.totalPages}
                    onClick={() => handlePageChange(pagination.currentPage + 1, paginationData.lastDocId)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
