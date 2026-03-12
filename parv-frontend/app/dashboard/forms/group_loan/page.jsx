"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { useCreateGroupLoan } from "@/hooks/loans/useGroupLoan";
import { LoadingModal, PreviewModalWithMembers, SuccessModal } from "@/components/common/Modals";
import MembersDetails from "./MembersDetails";
import GroupDetails from "./GroupDetails";
import { validateAllFields, validateFields } from "./formValidation";
import FormInstructions from "@/components/common/FormInstructions";
import { Toaster } from "react-hot-toast";
import FormLayout from "@/components/common/ModernFormLayout";
import { Users } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";
import { upload_single_file, getPublicIdFromUrl, remove_docs } from "@/lib/utils";
import toast from "react-hot-toast";

const GroupLoan = () => {
    const createLoanMutation = useCreateGroupLoan();

    const formSteps = [
        { id: "instructions", title: "Instructions" },
        { id: "group_info", title: "Group Details" },
        { id: "members", title: "Members Details" },
    ];

    const initialData = {
        folderName: undefined,
        loan_amount: "",
        id_of_connector: "",
        name_of_connector: "",
        group_size: "",
        group_name: "",
        nearest_branch: "",
        group_village: "",
        group_post: "",
        group_police_station: "",
        group_district: "",
        group_pincode: "",
        members: [
            {
                name: "",
                phone: "",
                email: "",
                whatsapp_number: "",
                husband_name: "",
                husband_phone: "",
                husband_profession: "",
                has_own_house: "No",
                have_any_current_loan: "No",
                past_loan_record: "No",
                documents: {
                    aadhar_front: undefined,
                    aadhar_back: undefined,
                    photo: undefined,
                    voter_id: undefined,
                    husband_photo: undefined,
                    husband_aadhar_front: undefined,
                    husband_aadhar_back: undefined,
                    husband_voter_id: undefined,
                    joint_photo: undefined,
                },
            },
        ],
    };

    const {
        step,
        setStep,
        formData,
        setFormData,
        errors,
        setErrors,
        isDialogOpen,
        setIsDialogOpen,
        isSubmitting,
        openSuccess,
        setOpenSuccess,
        handleNext,
        handlePrevious,
        openPreview,
        handleFinalSubmit,
    } = useLoanForm({
        initialData,
        validateFields,
        validateAllFields,
        stepFields: {
            0: [],
            1: [
                "loan_amount", "id_of_connector", "name_of_connector", "nearest_branch",
                "group_name", "group_size", "group_village", "group_post",
                "group_police_station", "group_district", "group_pincode"
            ],
            2: ["members"]
        },
        mutation: createLoanMutation,
        persistenceKey: "groupLoanForm",
        folderPrefix: "grouploan",
        formSteps,
    });

    // Custom handlers for members because of the nesting and index
    const [uploading, setUploading] = useState({});
    const [removing, setRemoving] = useState({});

    const addMember = () => {
        setFormData((prev) => ({
            ...prev,
            members: [
                ...prev.members,
                {
                    name: "",
                    phone: "",
                    email: "",
                    whatsapp_number: "",
                    husband_name: "",
                    husband_phone: "",
                    husband_profession: "",
                    has_own_house: "No",
                    have_any_current_loan: "No",
                    past_loan_record: "No",
                    documents: {
                        aadhar_front: undefined,
                        aadhar_back: undefined,
                        photo: undefined,
                        voter_id: undefined,
                        husband_photo: undefined,
                        husband_aadhar_front: undefined,
                        husband_aadhar_back: undefined,
                        husband_voter_id: undefined,
                        joint_photo: undefined,
                    },
                }
            ],
        }));
    };

    const removeMember = (index) => {
        setFormData((prev) => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index),
        }));
    };

    const handleMemberChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedMembers = [...prev.members];
            updatedMembers[index] = {
                ...updatedMembers[index],
                [field]: value,
            };
            return {
                ...prev,
                members: updatedMembers,
            };
        });
    };

    const handleMemberDocumentChange = async (index, docField, value) => {
        const isFile = value instanceof File;

        const updatedFormData = {
            ...formData,
            members: formData.members.map((member, i) =>
                i === index
                    ? {
                        ...member,
                        documents: {
                            ...member.documents,
                            [docField]: value,
                        },
                    }
                    : member
            ),
        };

        // If it's a file, immediately validate and upload
        if (isFile) {
            const fieldErrors = validateFields(updatedFormData, [`members.${index}.documents.${docField}`]);
            if (Object.keys(fieldErrors).length === 0) {
                setFormData(updatedFormData);
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[`members.${index}.documents.${docField}`];
                    return newErrors;
                });
                // Auto-upload
                await handleMemberUpload(docField, index, value);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    [`members.${index}.documents.${docField}`]: fieldErrors[`members.${index}.documents.${docField}`],
                }));
            }
        } else {
            // For strings (URLs) or removing
            setFormData(updatedFormData);
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[`members.${index}.documents.${docField}`];
                return newErrors;
            });
        }
    };

    const handleMemberUpload = async (id, index, fileOverride) => {
        const file = fileOverride || formData?.members[index]?.documents[id];
        if (!(file instanceof File)) return;
        setUploading((prev) => ({ ...prev, [`${index}-${id}`]: true }));

        try {
            const result = await upload_single_file(id, file, `grouploan/${formData?.folderName}`);
            if (result?.url) {
                setFormData((prev) => {
                    const updatedMembers = [...prev.members];
                    updatedMembers[index] = {
                        ...updatedMembers[index],
                        documents: { ...updatedMembers[index].documents, [id]: result?.url },
                    };
                    return { ...prev, members: updatedMembers };
                });
            } else {
                toast.error(result?.error || "Upload failed");
            }
        } catch (err) {
            console.error(`Upload error for ${id}:`, err);
        } finally {
            setUploading((prev) => ({ ...prev, [`${index}-${id}`]: false }));
        }
    };

    const handleMemberRemoveDocs = async (url, index, id) => {
        try {
            setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: true }));
            const publicId = getPublicIdFromUrl(url);
            const result = await remove_docs(publicId);
            if (result?.success) {
                setFormData((prev) => {
                    const updatedMembers = [...prev.members];
                    updatedMembers[index] = {
                        ...updatedMembers[index],
                        documents: { ...updatedMembers[index].documents, [id]: "" },
                    };
                    return { ...prev, members: updatedMembers };
                });
                toast.success(result?.message || "Document removed");
            } else {
                toast.error(result?.message || "Failed to remove document");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: false }));
        }
    };

    return (
        <FormLayout
            title="Group Loan Application"
            description="Apply for a group loan together. Empower your community with shared financial growth."
            icon={Users}
        >
            <Toaster />
            <FormStepIndicator
                keys={formSteps.map(s => s.title)}
                step={step}
            />

            <div className="mt-8 mb-10">
                {(() => {
                    switch (formSteps[step].id) {
                        case "instructions":
                            return <FormInstructions />;
                        case "group_info":
                            return (
                                <GroupDetails
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            );
                        case "members":
                            return (
                                <MembersDetails
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                    addMember={addMember}
                                    removeMember={removeMember}
                                    handleMemberDocumentChange={handleMemberDocumentChange}
                                    handleMemberChange={handleMemberChange}
                                    handleUpload={handleMemberUpload}
                                    uploading={uploading}
                                    removing={removing}
                                    handleRemoveDocsFromCloudaniry={handleMemberRemoveDocs}
                                />
                            );
                        default:
                            return <div>Form Section Not Found</div>;
                    }
                })()}
            </div>

            <div className="flex w-full items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={step === 0 || isSubmitting || createLoanMutation.isPending}
                    className="px-8 py-2 h-11 rounded-xl font-semibold transition-all"
                >
                    Previous
                </Button>
                {step < formSteps.length - 1 ? (
                    <Button
                        onClick={handleNext}
                        disabled={isSubmitting || createLoanMutation.isPending}
                        className="px-8 py-2 h-11 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        Next Step
                    </Button>
                ) : (
                    <Button
                        onClick={openPreview}
                        disabled={isSubmitting || createLoanMutation.isPending}
                        className="px-8 py-2 h-11 rounded-xl font-semibold bg-green-600 hover:bg-green-700 transition-all shadow-lg shadow-green-200"
                    >
                        {createLoanMutation.isPending ? "Submitting..." : "Review & Submit"}
                    </Button>
                )}
            </div>

            <PreviewModalWithMembers
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                formData={formData}
                handleFinalSubmit={() => handleFinalSubmit()}
                isSubmitting={isSubmitting}
            />
            <LoadingModal open={isSubmitting || createLoanMutation.isPending} />
            <SuccessModal open={openSuccess} onOpenChange={setOpenSuccess} />
        </FormLayout>
    );
};

export default GroupLoan;
