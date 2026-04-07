"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RMTable from "@/components/employee/RMTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import UserLoansModal from "@/components/Dashboard/UserLoansModal";
import toast from "react-hot-toast";
import { 
    useHardDeleteRM, 
    useRMList, 
    useSoftDeleteRM, 
    useToggleRMStatus 
} from "@/hooks/rm/useRMData";

export default function RMListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);
  const [openLoans, setOpenLoans] = useState(false);

  const { RMData, isLoading, loadMore, hasNextPage, isFetchingNext } = useRMList(search);

  const softDeleteMutation = useSoftDeleteRM();
  const hardDeleteMutation = useHardDeleteRM();
  const toggleStatusMutation = useToggleRMStatus();

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
      <RMTable
        data={RMData}
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
