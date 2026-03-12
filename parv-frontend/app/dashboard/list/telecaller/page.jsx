// "use client";
// import TelecallerTable from "@/components/employee/TeleCallerTable";
// import { useTelecallerList } from "@/hooks/telecaller/useTelecallerDataTable";
// import { useState } from "react";

// export default function TelecallerListPage() {
//     const [search, setSearch] = useState("");
//     const {TelecallerData,isLoading,isFetchingNext,}=useTelecallerList(search);
//     return (
//         <TelecallerTable
//             data={TelecallerData}
//             isLoading={isLoading}
//             setSearch={setSearch}
//             search={search}

//         />
//     )
// }










"use client";

import { useState } from "react";
import TelecallerTable from "@/components/employee/TeleCallerTable";
import {
  useTelecallerList,
  useSoftDeleteTelecaller,
  useHardDeleteTelecaller,
} from "@/hooks/telecaller/useTelecallerDataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import toast from "react-hot-toast";

export default function TelecallerListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);

  const { TelecallerData, isLoading } = useTelecallerList(search);

  const softDeleteMutation = useSoftDeleteTelecaller();
  const hardDeleteMutation = useHardDeleteTelecaller();

  /* ─────────────────────────────
     HANDLERS
  ────────────────────────────── */

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

  return (
    <>
      <TelecallerTable
        data={TelecallerData}
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
