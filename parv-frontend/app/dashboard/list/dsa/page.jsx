"use client";

import { useState } from "react";
import DSATable from "@/components/dsa/DSATable";
import {
  useDSAList,
  useHardDeleteDSA,
  useSoftDeleteDSA,
} from "@/hooks/dsa/useDSADataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import toast from "react-hot-toast";


export default function DSAListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);
console.log(selectedId);

  const { dsaData, isLoading } = useDSAList(search);

  const softDeleteMutation = useSoftDeleteDSA();
  const hardDeleteMutation = useHardDeleteDSA();

  /* ─────────────────────────────
     HANDLERS
  ────────────────────────────── */

  const handleSoftDeleteConfirm = () => {
    if (!selectedId) return;

    softDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Removed !");
        setOpenSoft(false);
        setSelectedId(null);
      },
    });
  };

  const handleHardDeleteConfirm = () => {
    if (!selectedId) return;

    hardDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Deleted Successfully");
        setOpenHard(false);
        setSelectedId(null);
      },
    });
  };

  return (
    <>
      <DSATable
        data={dsaData}
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
