"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { NotebookPenIcon } from "lucide-react";
import { useAddLeadRemark } from "@/hooks/useLead";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";

export default function RemarksModal({
  remarks = [],
  leadId,
  user,
  triggerLabel = "Remarks",
  fetchLeads,
}) {
  const [open, setOpen] = useState(false);
  const [newRemark, setNewRemark] = useState("");
  const addRemarkMutation = useAddLeadRemark();

  const handleAdd = () => {
    if (!newRemark.trim()) return;
    const remarkData = {
      text: newRemark,
      createdBy: user?.full_name,
      userId: user?.username,
    }
    addRemarkMutation.mutate(
      { leadId, remarkData },
      {
        onSuccess: () => {
          setNewRemark("");
          toast.success("Remarks added successfully !");
          fetchLeads();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 px-2 cursor-pointer py-1 rounded-md hover:bg-gray-100 transition-colors">
          <NotebookPenIcon className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium">{triggerLabel}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Remarks</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a remark..."
              value={newRemark}
              onChange={(e) => setNewRemark(e.target.value)}
              disabled={addRemarkMutation.isPending}
            />
            <Button onClick={handleAdd} disabled={addRemarkMutation.isPending || !newRemark.trim()}>
              {addRemarkMutation.isPending ? "Adding..." : "Add"}
            </Button>
          </div>

          <Separator />

          <ScrollArea className="h-60 pr-2">
            {(remarks?.length === 0 || !Array.isArray(remarks)) ?   (
              <p className="text-sm text-muted-foreground text-center mt-6">
                No remarks yet.
              </p> 
            ) : (
              <ul className="space-y-3">
                {remarks?.length > 0 &&
                  remarks?.map((remark) => (
                    <li
                      key={remark?._id}
                      className="border rounded-lg p-3 flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {remark?.createdBy}({remark?.userId})
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(remark?.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{remark?.text}</p>
                    </li>
                  ))}
              </ul>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
