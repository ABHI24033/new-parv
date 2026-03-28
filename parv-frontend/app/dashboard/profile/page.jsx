"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import ModernProfile from "@/components/profile/ModernProfile";
import Spinner from "@/components/common/Spinners";

export default function CurrentUserProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-96 items-center justify-center"><Spinner /></div>;
  if (!user) return <div className="p-10 text-center text-slate-500 font-bold">Please log in to view your profile.</div>;

  return (
    <div className="bg-slate-50 min-h-screen pt-4">
      <ModernProfile data={user} isOwnProfile={true} />
    </div>
  );
}
