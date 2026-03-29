"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DSAIncomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/commissions");
  }, [router]);

  return null;
}
