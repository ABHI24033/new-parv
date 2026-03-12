"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAddLead, useUpdateLead } from "@/hooks/useLead";
import toast, { Toaster } from "react-hot-toast";
import { formSchema } from "./LeadFormValidation";
import { AlertModal } from "../common/Modals";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function LeadForm({ setOpen, defaultValues,onSuccess }) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {}, // ✅ preload form values if editing
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const addLeadMutation = useAddLead();
    const updateLeadMutation = useUpdateLead();

    // ✅ Pre-fill Selects when editing
    useEffect(() => {
        if (defaultValues) {
            Object.entries(defaultValues).forEach(([key, value]) => {
                setValue(key, value || "");
            });
        }
    }, [defaultValues, setValue]);

    const onSubmit = async (data) => {
        if (defaultValues?.id) {
            // ✅ Editing
            updateLeadMutation.mutate(
                { id: defaultValues.id, data },
                {
                    onSuccess: (res) => {
                        if (res.success) {
                            toast.success(res.message || "Success!");
                            if (onSuccess) {
                                onSuccess();
                            }
                            setOpen(false);
                        }
                    },
                }
            );
        } else {
            // ✅ Creating new
            addLeadMutation.mutate(data, {
                onSuccess: (res) => {
                    if (res.success) {
                        toast.success(res.message || "Success!");
                        if (onSuccess) {
                            onSuccess();
                        }
                        setIsModalOpen(true); // show modal only when adding new
                    }
                },
            });
        }
    };

    const isLoading = addLeadMutation.isPending || updateLeadMutation.isPending;

    function handleConfirm() {
        reset();
        ["profession", "leadSource", "loanProduct", "leadStatus"].forEach((field) =>
            setValue(field, "")
        );
        setIsModalOpen(false);
    }

    function onClose() {
        setIsModalOpen(false);
        setOpen(false);
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                id="leadForm"
                className="space-y-4 w-full mx-auto p-4"
            >
                <Toaster />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {/* Date */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Date</label>
                        <Input type="date" {...register("date")} />
                        {errors?.date && (
                            <p className="text-red-500 text-sm">{errors?.date?.message}</p>
                        )}
                    </div>

                    {/* Month and Year */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Month and Year</label>
                        <Input type="month" {...register("monthYear")} />
                        {errors?.monthYear && (
                            <p className="text-red-500 text-sm">
                                {errors?.monthYear?.message}
                            </p>
                        )}
                    </div>

                    {/* Lead Name */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Lead Name</label>
                        <Input placeholder="Lead Name" {...register("leadName")} />
                        {errors?.leadName && (
                            <p className="text-red-500 text-sm">
                                {errors?.leadName?.message}
                            </p>
                        )}
                    </div>

                    {/* Profession */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Profession</label>
                        <Select
                            onValueChange={(value) => setValue("profession", value)}
                            defaultValue={defaultValues?.profession || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Profession" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="salaried">Salaried</SelectItem>
                                <SelectItem value="self-employed ">
                                    Self-employed
                                </SelectItem>
                                <SelectItem value="businessMan">Businessman</SelectItem>
                                <SelectItem value="unemployed">Unemployed</SelectItem>
                                <SelectItem value="SENP">
                                    SENP
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors?.profession && (
                            <p className="text-red-500 text-sm">
                                {errors?.profession?.message}
                            </p>
                        )}
                    </div>

                    {/* Contact No */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Contact No</label>
                        <Input placeholder="Contact No" {...register("contactNo")} />
                        {errors?.contactNo && (
                            <p className="text-red-500 text-sm">
                                {errors?.contactNo?.message}
                            </p>
                        )}
                    </div>

                    {/* WhatsApp No */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">WhatsApp No</label>
                        <Input placeholder="WhatsApp No" {...register("whatsappNo")} />
                        {errors?.whatsappNo && <p className="text-red-500 text-sm">{errors?.whatsappNo?.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="Email" {...register("email")} />
                        {errors?.email && <p className="text-red-500 text-sm">{errors?.email?.message}</p>}
                    </div>

                    {/* Lead Source */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Lead Source</label>
                        <Select onValueChange={(value) => setValue("leadSource", value)}
                            defaultValue={defaultValues?.leadSource || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Lead Source" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Facebook campaign">Facebook campaign</SelectItem>
                                <SelectItem value="existing customer">Existing customer</SelectItem>
                                <SelectItem value="self-sourced">Self-sourced</SelectItem>
                                <SelectItem value="connector/DSA">Connector/DSA</SelectItem>
                                <SelectItem value="direct customer">Direct customer</SelectItem>
                                <SelectItem value="referred by customer">Referred by customer</SelectItem>
                                <SelectItem value="website">Website</SelectItem>
                                <SelectItem value="Online (Google/similar)">Online (Google/similar)</SelectItem>
                                <SelectItem value="Just dial enquiry">Just dial enquiry</SelectItem>
                                <SelectItem value="n/a">N/A </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors?.leadSource && <p className="text-red-500 text-sm">{errors?.leadSource?.message}</p>}
                    </div>

                    {/* Loan Product */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Loan Product</label>
                        <Select onValueChange={(value) => setValue("loanProduct", value)}
                            defaultValue={defaultValues?.loanProduct || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Loan Product" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="personal loan">Personal Loan</SelectItem>
                                <SelectItem value="business">Business Loan</SelectItem>
                                <SelectItem value="term">Term Loan</SelectItem>
                                <SelectItem value="ODICON/Individual/CC">ODICON/Individual/CC</SelectItem>
                                <SelectItem value="home">Home Loan</SelectItem>
                                <SelectItem value="gold">Gold Loan</SelectItem>
                                <SelectItem value="group">Group Loan</SelectItem>
                                <SelectItem value="LAP">LAP Loan</SelectItem>
                                <SelectItem value="plot/flat purchase">Plot/Flat Purchase Loan</SelectItem>
                                <SelectItem value="bike loan">Bike Loan</SelectItem>
                                <SelectItem value="car loan">Car Loan</SelectItem>
                                <SelectItem value="refinance">Refinance</SelectItem>
                                <SelectItem value="micro loan">Micro Loan</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors?.loanProduct && <p className="text-red-500 text-sm">{errors?.loanProduct?.message}</p>}
                    </div>

                    {/* Lead Status */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Lead Status</label>
                        <Select onValueChange={(value) => setValue("leadStatus", value)}
                            defaultValue={defaultValues?.leadStatus || ""}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Lead Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="call not connected">Call Not Connected</SelectItem>
                                <SelectItem value="unqualified lead">Unqualified Lead</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="qualified lead">Qualified Lead</SelectItem>
                                <SelectItem value="customer denied">Customer Denied</SelectItem>
                                <SelectItem value="documents pending">Documents Pending</SelectItem>
                                <SelectItem value="move to application">Move to Application</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors?.leadStatus && <p className="text-red-500 text-sm">{errors?.leadStatus?.message}</p>}
                    </div>

                    {/* Calling Date */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Calling Date</label>
                        <Input type="date" {...register("callingDate")} />
                        {errors?.callingDate && <p className="text-red-500 text-sm">{errors?.callingDate?.message}</p>}
                    </div>

                    {/* Next Follow-up Date */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Next Follow-up Date</label>
                        <Input type="date" {...register("followupDate")} />
                        {errors?.followupDate && <p className="text-red-500 text-sm">{errors?.followupDate?.message}</p>}
                    </div>

                    {/* State */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">State</label>
                        <Input placeholder="State" {...register("state")} />
                        {errors?.state && <p className="text-red-500 text-sm">{errors?.state?.message}</p>}
                    </div>

                    {/* City */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Town/City</label>
                        <Input placeholder="Town/City" {...register("city")} />
                        {errors?.city && <p className="text-red-500 text-sm">{errors?.city?.message}</p>}
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm font-medium">Pincode</label>
                        <Input placeholder="Pincode" {...register("pincode")} />
                        {errors?.pincode && <p className="text-red-500 text-sm">{errors?.pincode?.message}</p>}
                    </div>

                    {/* Remarks / Notes */}
                    {/* <div className="flex flex-col space-y-1 md:col-span-2">
                        <label className="text-sm font-medium">Remarks / Notes</label>
                        <Textarea placeholder="Remarks / Notes" {...register("remarks")} />
                        {errors?.remarks && <p className="text-red-500 text-sm">{errors?.remarks?.message}</p>}
                    </div> */}

                </div>

                <Button type="submit" className="w-fit mt-4 float-end">
                    {isLoading
                        ? "Saving..."
                        : defaultValues?.id
                            ? "Update Lead"
                            : "Submit"}
                </Button>
            </form>

            {/* Success Modal only for create */}
            {!defaultValues?.id && (
                <AlertModal
                    open={isModalOpen}
                    onClose={onClose}
                    onConfirm={handleConfirm}
                    isLoading={isLoading}
                    heading="Lead Created Successfully 🎉"
                    message="Do you want to add another lead?"
                    btnText="Add More"
                    icon={<CheckCircle className="w-12 h-12 text-green-500" />}
                />
            )}
        </div>
    );
}
