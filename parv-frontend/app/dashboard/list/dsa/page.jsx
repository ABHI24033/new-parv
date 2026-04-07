"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DSATable from "@/components/dsa/DSATable";
import {
  useDSAList,
  useHardDeleteDSA,
  useSoftDeleteDSA,
  useToggleDSAStatus,
} from "@/hooks/dsa/useDSADataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import UserLoansModal from "@/components/Dashboard/UserLoansModal";
import toast from "react-hot-toast";

export default function DSAListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);
  const [openLoans, setOpenLoans] = useState(false);

  const { dsaData, isLoading, loadMore, hasNextPage, isFetchingNext } = useDSAList(search);

  const softDeleteMutation = useSoftDeleteDSA();
  const hardDeleteMutation = useHardDeleteDSA();
  const toggleStatusMutation = useToggleDSAStatus();

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

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'inactive' : 'approved';
    toggleStatusMutation.mutate({ id, status: newStatus }, {
      onSuccess: () => {
        toast.success(`User marked as ${newStatus}`);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to update status");
      }
    });
  };

  const router = useRouter();

  const handleViewLoans = (username) => {
    router.push(`/dashboard/loans?connector=${username}`);
  };

  return (
    <>
      <DSATable
        data={dsaData}
        isLoading={isLoading}
        search={search}
        setSearch={setSearch}
        loadMore={loadMore}
        hasNextPage={hasNextPage}
        isFetchingNext={isFetchingNext}
        onSoftDelete={(id) => {
          setSelectedId(id);
          setOpenSoft(true);
        }}
        onHardDelete={(id) => {
          setSelectedId(id);
          setOpenHard(true);
        }}
        onToggleStatus={handleToggleStatus}
        onViewLoans={handleViewLoans}
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
