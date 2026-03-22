"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAddLead, useUpdateLead } from "@/hooks/useLead";
import toast, { Toaster } from "react-hot-toast";
import { formSchema } from "./LeadFormValidation";
import { AlertModal } from "../common/Modals";
import { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, RefreshCw, Save } from "lucide-react";
import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";

export default function LeadForm({ setOpen, defaultValues, onSuccess }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
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
        <div className="bg-white/50 w-full h-full flex flex-col">
            <form
                onSubmit={handleSubmit(onSubmit)}
                id="leadForm"
                className="w-full mx-auto space-y-6 flex-grow"
            >
                <Toaster />
                
                <FormSectionCard title="Lead Information" description="Basic details regarding the lead entry.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            type="date"
                            label="Entry Date"
                            id="date"
                            error={errors?.date?.message}
                            required
                            {...register("date")}
                        />
                        <FormInput
                            type="month"
                            label="Month & Year"
                            id="monthYear"
                            error={errors?.monthYear?.message}
                            required
                            {...register("monthYear")}
                        />
                        <FormInput
                            label="Lead Name"
                            id="leadName"
                            placeholder="Full Name"
                            error={errors?.leadName?.message}
                            required
                            {...register("leadName")}
                        />
                        <FormSelect
                            label="Profession"
                            id="profession"
                            value={watch("profession") || ""}
                            onChange={(value) => setValue("profession", value)}
                            error={errors?.profession?.message}
                            required
                            options={[
                                { value: "salaried", label: "Salaried" },
                                { value: "self-employed ", label: "Self-employed" },
                                { value: "businessMan", label: "Businessman" },
                                { value: "unemployed", label: "Unemployed" },
                                { value: "SENP", label: "SENP" },
                            ]}
                        />
                    </div>
                </FormSectionCard>

                <FormSectionCard title="Contact Details" description="Communication and location info.">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormInput
                            label="Contact No"
                            id="contactNo"
                            placeholder="10-digit number"
                            error={errors?.contactNo?.message}
                            required
                            {...register("contactNo")}
                        />
                        <FormInput
                            label="WhatsApp No"
                            id="whatsappNo"
                            placeholder="10-digit number"
                            error={errors?.whatsappNo?.message}
                            required
                            {...register("whatsappNo")}
                        />
                        <FormInput
                            type="email"
                            label="Email Address"
                            id="email"
                            placeholder="Email address"
                            error={errors?.email?.message}
                            {...register("email")}
                        />
                        <FormInput
                            label="State"
                            id="state"
                            placeholder="State"
                            error={errors?.state?.message}
                            required
                            {...register("state")}
                        />
                        <FormInput
                            label="Town/City"
                            id="city"
                            placeholder="Town/City"
                            error={errors?.city?.message}
                            required
                            {...register("city")}
                        />
                        <FormInput
                            label="Pincode"
                            id="pincode"
                            placeholder="6-digit pincode"
                            error={errors?.pincode?.message}
                            required
                            {...register("pincode")}
                        />
                    </div>
                </FormSectionCard>

                <FormSectionCard title="Tracking & Status" description="Lead sourcing and follow-up tracking.">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <FormSelect
                            label="Lead Source"
                            id="leadSource"
                            value={watch("leadSource") || ""}
                            onChange={(value) => setValue("leadSource", value)}
                            error={errors?.leadSource?.message}
                            required
                            options={[
                                { value: "Facebook campaign", label: "Facebook campaign" },
                                { value: "existing customer", label: "Existing customer" },
                                { value: "self-sourced", label: "Self-sourced" },
                                { value: "connector/DSA", label: "Connector/DSA" },
                                { value: "direct customer", label: "Direct customer" },
                                { value: "referred by customer", label: "Referred by customer" },
                                { value: "website", label: "Website" },
                                { value: "Online (Google/similar)", label: "Online (Google/similar)" },
                                { value: "Just dial enquiry", label: "Just dial enquiry" },
                                { value: "n/a", label: "N/A" },
                            ]}
                        />
                        <FormSelect
                            label="Loan Product"
                            id="loanProduct"
                            value={watch("loanProduct") || ""}
                            onChange={(value) => setValue("loanProduct", value)}
                            error={errors?.loanProduct?.message}
                            required
                            options={[
                                { value: "personal loan", label: "Personal Loan" },
                                { value: "business", label: "Business Loan" },
                                { value: "term", label: "Term Loan" },
                                { value: "ODICON/Individual/CC", label: "ODICON/Individual/CC" },
                                { value: "home", label: "Home Loan" },
                                { value: "gold", label: "Gold Loan" },
                                { value: "group", label: "Group Loan" },
                                { value: "LAP", label: "LAP Loan" },
                                { value: "plot/flat purchase", label: "Plot/Flat Purchase Loan" },
                                { value: "bike loan", label: "Bike Loan" },
                                { value: "car loan", label: "Car Loan" },
                                { value: "refinance", label: "Refinance" },
                                { value: "micro loan", label: "Micro Loan" },
                            ]}
                        />
                        <FormSelect
                            label="Lead Status"
                            id="leadStatus"
                            value={watch("leadStatus") || ""}
                            onChange={(value) => setValue("leadStatus", value)}
                            error={errors?.leadStatus?.message}
                            required
                            options={[
                                { value: "new", label: "New" },
                                { value: "call not connected", label: "Call Not Connected" },
                                { value: "unqualified lead", label: "Unqualified Lead" },
                                { value: "rejected", label: "Rejected" },
                                { value: "qualified lead", label: "Qualified Lead" },
                                { value: "customer denied", label: "Customer Denied" },
                                { value: "documents pending", label: "Documents pending" },
                                { value: "move to application", label: "Move to Application" },
                            ]}
                        />
                        <FormInput
                            type="date"
                            label="Calling Date"
                            id="callingDate"
                            error={errors?.callingDate?.message}
                            required
                            {...register("callingDate")}
                        />
                        <FormInput
                            type="date"
                            label="Next Follow-up Date"
                            id="followupDate"
                            error={errors?.followupDate?.message}
                            required
                            {...register("followupDate")}
                        />
                    </div>
                </FormSectionCard>

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-zinc-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="w-full sm:w-auto min-w-[120px] rounded-xl font-semibold border-zinc-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="flex w-full sm:w-auto items-center gap-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => reset()}
                            className="w-full sm:w-auto min-w-[120px] rounded-xl font-semibold bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto min-w-[140px] rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isLoading ? "Saving..." : defaultValues?.id ? "Update Lead" : "Submit"}
                        </Button>
                    </div>
                </div>
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
