// "use client";
// import FieldStaffTable from "@/components/employee/FieldStaffTable";
// import { useFieldStaffList } from "@/hooks/fieldStaff/useFieldStaffDataTable";
// // import FieldStaffTable from "@/components/employee/FieldStaffTable";
// // import { useFieldStaffList } from "@/hooks/FieldStaff/useFieldStaffData";
// import { useState } from "react";

// export default function FieldStaffListPage() {
//     const [search, setSearch] = useState("");
//     const {FieldStaffData,isLoading,isFetchingNext,}=useFieldStaffList(search);
//     return (
//         <FieldStaffTable
//             data={FieldStaffData}
//             isLoading={isLoading}
//             setSearch={setSearch}
//             search={search}

//         />
//     )
// }














"use client";

import { useState } from "react";
import FieldStaffTable from "@/components/employee/FieldStaffTable";
import {
  useFieldStaffList,
  useSoftDeleteFieldStaff,
  useHardDeleteFieldStaff,
} from "@/hooks/fieldStaff/useFieldStaffDataTable";
import SoftDeleteDialog from "@/components/common/SofftDeleteModal";
import HardDeleteDialog from "@/components/common/HardDeleteModal";
import toast from "react-hot-toast";

export default function FieldStaffListPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [openSoft, setOpenSoft] = useState(false);
  const [openHard, setOpenHard] = useState(false);

  const { FieldStaffData, isLoading } = useFieldStaffList(search);

  const softDeleteMutation = useSoftDeleteFieldStaff();
  const hardDeleteMutation = useHardDeleteFieldStaff();

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

  return (
    <>
      <FieldStaffTable
        data={FieldStaffData}
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
