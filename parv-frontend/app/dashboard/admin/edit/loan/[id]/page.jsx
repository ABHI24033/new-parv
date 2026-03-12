"use client";

import React, { useEffect, useState } from "react";
import { useUserState } from "@/app/dashboard/store";
import { getLoanByID } from "@/lib/actions/loan";
import BusinessLoan from "./business_loan";
import GoldLoan from "./gold_loan";
import HomeLoan from "./home_loan";
import PersonalLoan from "./personal_loan";
import VehicleLoan from "./vehicle_loan";
import { LoadingModal } from "@/components/common/Modals";
import GroupLoan from "./group_loan";

export default function Page({ params }) {
  const { id } = React.use(params);
  const userState = useUserState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(data?.data);
  

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        setLoading(true);
        const token = await userState.user.getIdToken();
        const res = await getLoanByID(token, id);
        setData(res);
      } catch (err) {
        console.error("Error fetching loan data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id, userState.user]);

  if (loading) {
    return <LoadingModal
      open={loading}
    />
  }

  if (data?.data) {
    switch (data?.data?.type) {
      case "Business":
        return <BusinessLoan initialData={data?.data} id={data?.id} />;
      case "Gold":
        return <GoldLoan initialData={data?.data} id={data?.id} />;
      case "Home":
        return <HomeLoan initialData={data?.data} id={data?.id} />;
      case "Personal":
        return <PersonalLoan initialData={data?.data} id={data?.id} />;
      case "Vehicle":
        return <VehicleLoan initialData={data?.data} id={data?.id} />;
      case "Group":
        return <GroupLoan initialData={data?.data} id={data?.id} />;
    }
  }

  return <div className="border mx-auto w-full flex justify-center items-center min-h-60">
    <p className="text-center text-red-500">Something went wrong! please try again or contact to developer!</p>
  </div>;
}
