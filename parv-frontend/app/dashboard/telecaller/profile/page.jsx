"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useTelecallerDetails } from "@/hooks/telecaller/useTelecallerDataTable";
import ModernProfile from "@/components/profile/ModernProfile";
import Spinner from "@/components/common/Spinners";

export default function Profile() {
  const searchParam = useSearchParams();
  const id = searchParam.get("userId");

  const { data, isLoading, isError } = useTelecallerDetails(id);
  const user = data?.data;

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Spinner /></div>;
  if (isError || !user) return <div className="p-10 text-center text-red-500 font-bold">Failed to load profile.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pt-4">
      <ModernProfile data={user} isOwnProfile={false} />
    </div>
  );
}
