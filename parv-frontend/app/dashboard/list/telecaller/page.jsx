"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TelecallerTable from "@/components/employee/TeleCallerTable";
import {
  useTelecallerList,
  useSoftDeleteTelecaller,
  useHardDeleteTelecaller,
  useToggleTelecallerStatus,
} from "@/hooks/telecaller/useTelecallerDataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import UserLoansModal from "@/components/Dashboard/UserLoansModal";
import toast from "react-hot-toast";

export default function TelecallerListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);
  const [openLoans, setOpenLoans] = useState(false);

  const { TelecallerData, isLoading, loadMore, hasNextPage, isFetchingNext } = useTelecallerList(search);

  const softDeleteMutation = useSoftDeleteTelecaller();
  const hardDeleteMutation = useHardDeleteTelecaller();
  const toggleStatusMutation = useToggleTelecallerStatus();

  /* ─────────────────────────────
     HANDLERS
  ────────────────────────────── */

  const router = useRouter();

  const handleSoftDeleteConfirm = () => {
    if (!selectedId) return;
    softDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Telecaller deactivated successfully");
        setOpenSoft(false);
        setSelectedId(null);
      },
    });
  };

  const handleHardDeleteConfirm = () => {
    if (!selectedId) return;
    hardDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Telecaller deleted permanently");
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

  const handleViewLoans = (username) => {
    router.push(`/dashboard/loans?connector=${username}`);
  };

  return (
    <>
      <TelecallerTable
        data={TelecallerData}
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

      <SoftDeleteDialog
        open={openSoft}
        onOpenChange={setOpenSoft}
        loading={softDeleteMutation.isPending}
        onConfirm={handleSoftDeleteConfirm}
      />

      <HardDeleteDialog
        open={openHard}
        onOpenChange={setOpenHard}
        loading={hardDeleteMutation.isPending}
        onConfirm={handleHardDeleteConfirm}
      />

    </>
  );
}
