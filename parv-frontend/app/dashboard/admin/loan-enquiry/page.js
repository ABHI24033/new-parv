"use client";

import React, { useEffect, useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";
import { loanEnquiryApi } from "@/lib/api/loanEnquiry";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common/Modals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Trash } from "lucide-react";
import { formatDateToString } from "@/lib/dateformate";

const statusOptions = ["pending", "approved", "rejected"];

const EnquiryDetails = ({ enquiry }) => {
  if (!enquiry) return null;

  return (
    <div className="space-y-2 text-sm">
      <p>
        <strong>DSA ID:</strong> {enquiry?.DSAID || "-"}
      </p>
      <p>
        <strong>DSA Name:</strong> {enquiry?.DSAName || "-"}
      </p>
      <p>
        <strong>Loan Product:</strong> {enquiry?.loanProduct || "-"}
      </p>
      <p>
        <strong>Loan Amount:</strong> {enquiry?.loanAmount || "-"}
      </p>
      <p>
        <strong>Profession:</strong> {enquiry?.profession || "-"}
      </p>
      <p>
        <strong>Full Name:</strong> {enquiry?.fullName || "-"}
      </p>
      <p>
        <strong>Phone:</strong> {enquiry?.phone || "-"}
      </p>
      <p>
        <strong>WhatsApp:</strong> {enquiry?.whatsappNo || "-"}
      </p>
      <p>
        <strong>Email:</strong> {enquiry?.email || "-"}
      </p>
      <p>
        <strong>City:</strong> {enquiry?.city || "-"}
      </p>
      <p>
        <strong>Pincode:</strong> {enquiry?.pincode || "-"}
      </p>
      <p>
        <strong>Source:</strong> {enquiry?.source || "-"}
      </p>
      <p>
        <strong>Status:</strong> {enquiry?.status || "-"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {enquiry?.createdAt ? formatDateToString(enquiry.createdAt) : "-"}
      </p>
    </div>
  );
};

const LoanEnquiryAdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [isPending, startTransition] = useTransition();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await loanEnquiryApi.getAll();
      setEnquiries(res?.data?.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load enquiries.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleOpenDetails = (enquiry) => {
    setSelected(enquiry);
    setDetailsOpen(true);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await loanEnquiryApi.updateStatus(id, status);
      const updated = res?.data?.data;

      setEnquiries((prev) =>
        prev.map((e) => (e?._id === id ? updated || { ...e, status } : e)),
      );
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status.");
    }
  };

  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        await loanEnquiryApi.delete(selectedDeleteId);
        setEnquiries((prev) => prev.filter((e) => e?._id !== selectedDeleteId));
        toast.success("Enquiry deleted successfully");
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to delete enquiry.",
        );
      } finally {
        setDeleteModalOpen(false);
        setSelectedDeleteId(null);
      }
    });
  };

  return (
    <div className="p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Loan Enquiries</h1>

      {loading ? (
        <p className="text-gray-500">Loading enquiries...</p>
      ) : enquiries?.length === 0 ? (
        <p className="text-gray-500 text-sm">No enquiries found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Loan Product
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Loan Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  City
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created At
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries?.map((item) => (
                <tr key={item?._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.loanProduct || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.loanAmount || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.fullName || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.phone || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.city || "-"}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {item?.createdAt ? formatDateToString(item.createdAt) : "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleOpenDetails(item)}
                          className="cursor-pointer flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View details
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => confirmDelete(item?._id)}
                          className="cursor-pointer flex items-center text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          <EnquiryDetails enquiry={selected} />
        </DialogContent>
      </Dialog>

      <AlertModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isPending}
      />
    </div>
  );
};

export default LoanEnquiryAdminPage;
