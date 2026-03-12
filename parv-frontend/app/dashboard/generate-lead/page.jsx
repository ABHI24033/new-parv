"use client";

import { useState } from "react";
import LeadForm from "@/components/Lead/LeadForm";
import LeadsTable from "@/components/Lead/LeadTable";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LeadsPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="container mx-auto px-5 py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Leads Management</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Add New Lead
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] w-full md:max-w-5xl overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add New Lead</DialogTitle>
                        </DialogHeader>
                        <LeadForm setOpen={setOpen} />
                    </DialogContent>
                </Dialog>

            </div>
            <LeadsTable />
        </div>
    );
}
