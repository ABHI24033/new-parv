"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  MapPin, 
  FileText, 
  Calendar,
  IndianRupee,
  Clock,
  ExternalLink
} from "lucide-react";
import { formatDateToString } from "@/lib/dateformate";

export function LoanEnquiryDetailModal({ open, onOpenChange, enquiry }) {
  if (!enquiry) return null;

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "success";
      case "rejected": return "destructive";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-2xl font-bold">Loan Enquiry Detail</DialogTitle>
            <Badge className="capitalize px-3 py-1 text-xs">
              {enquiry.status || "Pending"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="font-medium text-slate-900">{enquiry.fullName || "-"}</p>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</p>
                  <p className="font-medium text-slate-900">{enquiry.phone || "-"}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium text-slate-900">{enquiry.whatsappNo || "-"}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</p>
                <p className="font-medium text-slate-900 truncate">{enquiry.email || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Briefcase className="h-3 w-3" /> Profession</p>
                <p className="font-medium text-slate-900">{enquiry.profession || "-"}</p>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              < IndianRupee className="h-4 w-4" /> Loan Details
            </h3>
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs text-muted-foreground">Required Loan Type</p>
                <p className="font-bold text-blue-700 text-lg uppercase">{enquiry.loanProduct || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requested Amount</p>
                <p className="font-bold text-slate-900 text-xl flex items-center">
                  ₹ {enquiry.loanAmount || "0"}
                </p>
              </div>
              <Separator className="bg-slate-200" />
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Submitted</p>
                  <p className="text-xs font-medium">{formatDateToString(enquiry.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-xs font-medium capitalize">{enquiry.source || "Direct"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Address & Documents */}
        <div className="space-y-6 py-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Address Information
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border">
              {enquiry.address || `${enquiry.city || ""}, ${enquiry.pincode || ""}`.trim() || "No address provided."}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-4 w-4" /> Uploaded Documents
            </h3>
            {enquiry.documents && enquiry.documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enquiry.documents.map((doc, idx) => (
                  <a 
                    key={idx} 
                    href={doc.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium truncate max-w-[150px]">{doc.name || `Document ${idx + 1}`}</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No documents uploaded.</p>
            )}
          </div>
        </div>
        
        {/* DSA Info */}
        {(enquiry.DSAName || enquiry.DSAID) && (
          <div className="mt-4 pt-4 border-t text-[10px] text-muted-foreground flex justify-between italic">
            <span>DSA Name: {enquiry.DSAName || "N/A"}</span>
            <span>DSA ID: {enquiry.DSAID || "N/A"}</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
