"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveApplicationData } from "@/lib/actions/loan";
import toast from "react-hot-toast";

export default function ConnectorIncomeModal({
  connectorId,
  token,
  open,
  setOpen,
  loanId
}) {
  const [income, setIncome] = useState("");
  const [paid, setPaid] = useState("");
  const [unpaid, setUnpaid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await saveApplicationData(token, {
      connectorId,
      income,
      paid,
      unpaid,
      loanId,
    });

    if (result?.success) {
      toast.success("Income data submitted successfully");
      setOpen(false);
    } else {
      toast.error(result?.message || "Failed to submit data");
    }

    setLoading(false);
};

return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>DSA's income form</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label>Connector ID</Label>
          <Input value={connectorId} disabled />
        </div>

        <div className="space-y-2">
          <Label>Income Generated (₹)</Label>
          <Input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter income"
          />
        </div>

        <div className="space-y-2">
          <Label>Paid (₹)</Label>
          <Input
            type="number"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            placeholder="Enter paid amount"
          />
        </div>

        <div className="space-y-2">
          <Label>Unpaid (₹)</Label>
          <Input
            type="number"
            value={unpaid}
            onChange={(e) => setUnpaid(e.target.value)}
            placeholder="Enter unpaid amount"
          />
        </div>
      </div>

      <DialogFooter>
        <Button onClick={handleSubmit}>{loading?"Submitting...":"Submit"}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
}
