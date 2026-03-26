"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteAlertModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  title = "Delete item",
  description = "This action cannot be undone. Please confirm before deleting.",
  cancelText = "Cancel",
  confirmText = "Confirm Delete",
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !loading && onOpenChange?.(nextOpen)}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md overflow-hidden border-0 bg-white p-0 shadow-2xl sm:rounded-2xl">
        <div className="bg-gradient-to-br from-red-50 via-white to-orange-50 p-6 sm:p-7">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-sm ring-1 ring-red-200">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-600">
              {description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-6 flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-200 text-slate-700 sm:w-auto"
              disabled={loading}
              onClick={() => onOpenChange?.(false)}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full sm:w-auto"
              disabled={loading}
              onClick={onConfirm}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Deleting..." : confirmText}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
