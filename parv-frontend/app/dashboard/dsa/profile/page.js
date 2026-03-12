"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useDSADetails } from "@/hooks/dsa/useDSADataTable";
import ProfilePage from "@/components/common/ProfilePage";

export default function Profile() {
  const searchParam = useSearchParams();
  const id = searchParam.get("userId");

  const { data, isLoading, isError } = useDSADetails(id);
  const user = data?.data;


  return (
    <div>
      <ProfilePage user={user} isError={isError} isLoading={isLoading} />
    </div>
  );
}
