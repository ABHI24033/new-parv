"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FieldStaffTable from "@/components/employee/FieldStaffTable";
import {
  useFieldStaffList,
  useSoftDeleteFieldStaff,
  useHardDeleteFieldStaff,
  useToggleFieldStaffStatus,
} from "@/hooks/fieldStaff/useFieldStaffDataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import UserLoansModal from "@/components/Dashboard/UserLoansModal";
import toast from "react-hot-toast";

export default function FieldStaffListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);
  const [openLoans, setOpenLoans] = useState(false);

  const { FieldStaffData, isLoading, loadMore, hasNextPage, isFetchingNext } = useFieldStaffList(search);

  const softDeleteMutation = useSoftDeleteFieldStaff();
  const hardDeleteMutation = useHardDeleteFieldStaff();
  const toggleStatusMutation = useToggleFieldStaffStatus();

  /* ─────────────────────────────
     HANDLERS
  ────────────────────────────── */

  const handleSoftDeleteConfirm = () => {
    if (!selectedId) return;
    softDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Field staff deactivated successfully");
        setOpenSoft(false);
        setSelectedId(null);
      },
    });
  };

  const handleHardDeleteConfirm = () => {
    if (!selectedId) return;
    hardDeleteMutation.mutate(selectedId, {
      onSuccess: () => {
        toast.success("Field staff deleted permanently");
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
      <FieldStaffTable
        data={FieldStaffData}
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
