"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HardDeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  loading,
}) {
  const [confirmText, setConfirmText] = useState("");

  const isValid = confirmText === "DELETE";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-red-200">
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Permanently Delete DSA
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. All records will be removed permanently.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <label className="text-sm font-medium">
            Type <span className="text-red-600 font-bold">DELETE</span> to confirm
          </label>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            className={"mt-2"}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={!isValid || loading}
            onClick={() => {
              onConfirm();
              setConfirmText("");
              onOpenChange(false);
            }}
          >
            {loading?"loading...":"Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
