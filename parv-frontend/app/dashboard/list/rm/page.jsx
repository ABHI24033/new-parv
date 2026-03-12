"use client";

import { useState } from "react";
import RMTable from "@/components/employee/RMTable";
// import {
//   useRMList,
//   useSoftDeleteRM,
//   useHardDeleteRM,
// } from "@/hooks/rm/useRMData";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import toast from "react-hot-toast";
import { useHardDeleteRM, useRMList, useSoftDeleteRM } from "@/hooks/rm/useRMData";

export default function RMListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);

  const { RMData, isLoading } = useRMList(search);

  const softDeleteMutation = useSoftDeleteRM();
  const hardDeleteMutation = useHardDeleteRM();

  /* ─────────────────────────────
     HANDLERS
  ────────────────────────────── */

  const handleSoftDeleteConfirm = () => {
    if (!selectedId) return;

    softDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("RM removed successfully");
        setOpenSoft(false);
        setSelectedId(null);
      },
    });
  };

  const handleHardDeleteConfirm = () => {
    if (!selectedId) return;

    hardDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("RM deleted permanently");
        setOpenHard(false);
        setSelectedId(null);
      },
    });
  };

  return (
    <>
      <RMTable
        data={RMData}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        onSoftDelete={(id) => {
          setSelectedId(id);
          setOpenSoft(true);
        }}
        onHardDelete={(id) => {
          setSelectedId(id);
          setOpenHard(true);
        }}
      />

      {/* ───────── SOFT DELETE MODAL ───────── */}
      <SoftDeleteDialog
        open={openSoft}
        onOpenChange={setOpenSoft}
        loading={softDeleteMutation.isPending}
        onConfirm={handleSoftDeleteConfirm}
      />

      {/* ───────── HARD DELETE MODAL ───────── */}
      <HardDeleteDialog
        open={openHard}
        onOpenChange={setOpenHard}
        loading={hardDeleteMutation.isPending}
        onConfirm={handleHardDeleteConfirm}
      />
    </>
  );
}
