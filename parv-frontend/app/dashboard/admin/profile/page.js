"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import api from "@/api/api";
import ModernProfile from "@/components/profile/ModernProfile";
import Spinner from "@/components/common/Spinners";
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
];

export default function AdminDSAProfilePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [user, setUser] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!username) {
        if (isMounted) {
          setError("Missing username");
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const res = await api.get(`/users/${username}`);
        const profile = res?.data?.data || null;

        if (isMounted) {
          setUser(profile);
          setSelectedStatus(profile?.status || "pending");
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.response?.data?.message || "Failed to load profile");
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const handleStatusUpdate = async () => {
    if (!user?._id || !selectedStatus) return;

    try {
      setIsSaving(true);
      const res = await api.patch(`/users/${user._id}/status`, {
        status: selectedStatus,
      });

      const updatedUser = res?.data?.data;
      setUser(updatedUser);
      setSelectedStatus(updatedUser?.status || selectedStatus);
      toast.success(res?.data?.message || "Status updated successfully");
    } catch (saveError) {
      toast.error(saveError?.response?.data?.message || "Failed to update status");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex h-96 items-center justify-center"><Spinner /></div>;
  }

  if (error || !user) {
    return <div className="p-10 text-center font-bold text-red-500">{error || "Failed to load profile."}</div>;
  }

  const approvalActions = (
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
    <div className="min-h-screen bg-slate-50 pt-4">
      <ModernProfile data={user} isOwnProfile={false} headerActions={approvalActions} />
      <Toaster position="top-right" />
    </div>
  );
}
