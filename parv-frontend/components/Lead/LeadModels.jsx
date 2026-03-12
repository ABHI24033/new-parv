"use client";
import React, { useState, useTransition } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useUpdateLeadStatus } from "@/hooks/useLead";


const LeadDetailItem = ({ label, value }) => (
  <div className="flex flex-col border-b py-2">
    <span className="text-sm font-semibold text-gray-600">{label}</span>
    <span className="text-base text-gray-900">{value || "—"}</span>
  </div>
);

const LeadDetails = ({ lead }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <LeadDetailItem label="Date" value={lead.date} />
    <LeadDetailItem label="Month & Year" value={lead.monthYear} />
    <LeadDetailItem label="Lead Name" value={lead.leadName} />
    <LeadDetailItem label="Profession" value={lead.profession} />
    <LeadDetailItem label="Contact No" value={lead.contactNo} />
    <LeadDetailItem label="WhatsApp No" value={lead.whatsappNo} />
    <LeadDetailItem label="Email" value={lead.email} />
    <LeadDetailItem label="Lead Source" value={lead.leadSource} />
    <LeadDetailItem label="Loan Product" value={lead.loanProduct} />
    <LeadDetailItem label="Lead Status" value={lead.leadStatus} />
    <LeadDetailItem label="Calling Date" value={lead.callingDate} />
    <LeadDetailItem label="Follow-up Date" value={lead.followupDate} />
    <LeadDetailItem label="State" value={lead.state} />
    <LeadDetailItem label="City" value={lead.city} />
    <LeadDetailItem label="Pincode" value={lead.pincode} />
    <LeadDetailItem label="Remarks" value={lead.remarks} />
  </div>
);

export const LeadDialog = ({ lead }) => {
  const [status, setStatus] = useState(lead.leadStatus || "");
  const [message, setMessage] = useState("");
  const updateStatusMutation = useUpdateLeadStatus();

  const handleSave = () => {
    if (!status) return;
    updateStatusMutation.mutate(
      { id: lead.id, newStatus: status },
      {
        onSuccess: () => {
          setMessage("✅ Status updated successfully!");
        },
        onError: () => {
          setMessage("❌ Failed to update status");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 px-2 cursor-pointer py-1 rounded-md hover:bg-gray-100 transition-colors">
          <Eye className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">View</span>
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Lead Details</DialogTitle>
        </DialogHeader>

        {/* ✅ Change Status Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Change Lead Status</h3>
          <div className="flex gap-4 items-center">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Select Lead Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="call not connected">Call Not Connected</SelectItem>
                <SelectItem value="unqualified lead">Unqualified Lead</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="qualified lead">Qualified Lead</SelectItem>
                <SelectItem value="customer denied">Customer Denied</SelectItem>
                <SelectItem value="documents pending">Documents Pending</SelectItem>
                <SelectItem value="move to application">Move to Application</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSave} disabled={isPending || !status}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
          {message && <p className="text-sm mt-2">{message}</p>}
        </div>

        <hr className="my-4" />
        <LeadDetails lead={lead} />
      </DialogContent>
    </Dialog>
  );
};
