"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api from "@/api/api";
import ModernProfile from "@/components/profile/ModernProfile";
import Spinner from "@/components/common/Spinners";
import { useRMDetails } from "@/hooks/rm/useRMData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "pending", label: "Request" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "inactive", label: "Inactive" },
];

export default function Profile() {
  const searchParam = useSearchParams();
  const userId = searchParam.get("userId") || searchParam.get("username");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, isError } = useRMDetails(userId);
  const user = data?.data;

  useEffect(() => {
    if (user?.status) {
      setSelectedStatus(user.status);
    }
  }, [user?.status]);

  const handleStatusUpdate = async () => {
    if (!user?._id || !selectedStatus) return;

    try {
      setIsSaving(true);
      const res = await api.patch(`/users/${user._id}/status`, {
        status: selectedStatus,
      });
      toast.success(res?.data?.message || "Status updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Spinner /></div>;
  if (isError || !user) return <div className="p-10 text-center text-red-500 font-bold">Failed to load profile.</div>;

  const headerActions = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">Status</span>
        <Badge variant="outline" className="capitalize">
          {user.status || "pending"}
        </Badge>
      </div>

      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-full min-w-[180px] bg-white sm:w-[200px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={handleStatusUpdate}
        disabled={isSaving || selectedStatus === user.status}
        className="min-w-[140px]"
      >
        {isSaving ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-4">
      <ModernProfile data={user} isOwnProfile={false} headerActions={headerActions} />
      <Toaster position="top-right" />
    </div>
  );
}
