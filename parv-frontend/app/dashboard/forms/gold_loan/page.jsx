"use client";

import React, { useState } from "react";
import PersonalDetails from "./personal_details";
import Employment from "./employment";
import { Button } from "@/components/ui/button";
import {
    validateFields,
    validateAllFields,
    stepFields,
} from "./formValidation";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { useCreateGoldLoan } from "@/hooks/loans/useGoldLoan";
import Documents from "./documents";
import { LoadingModal, PreviewModal, SuccessModal } from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";
import FormInstructions from "@/components/common/FormInstructions";
import FormLayout from "@/components/common/ModernFormLayout";
import { Coins } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

const App = () => {
    const createLoanMutation = useCreateGoldLoan();

    const [loanHistory, setLoanHistory] = useState([{
        loan_provider_bank: "",
        total_loan_amount: "",
        current_emi: "",
        remaining_amount: "",
    }]);

    const formSteps = [
        { id: "instructions", title: "Instruction" },
        { id: "personal_details", title: "Personal Details" },
        { id: "employment", title: "Employment & Loans" },
        { id: "documents", title: "Documents" },
    ];

    const initialData = {
        folderName: "",
        loan_amount: "",
        id_of_connector: "",
        name_of_connector: "",
        applicant_name: "",
        fathers_name: "",
        mothers_name: "",
        phone_no: "",
        alt_phone_no: "",
        pan: "",
        dob: "",
        present_building_name: "",
        present_street_name: "",
        present_landmark: "",
        present_city: "",
        present_district: "",
        present_state: "",
        present_pincode: "",
        permanent_building_name: "",
        permanent_street_name: "",
        permanent_landmark: "",
        permanent_city: "",
        permanent_district: "",
        permanent_state: "",
        permanent_pincode: "",
        same_as_permanent_address: false,
        saving_account_bank_name: "",
        saving_account_turnover: "",
        aadhar_front: undefined,
        aadhar_back: undefined,
        personal_pan_upload: undefined,
        house_electricity: undefined,
    };

    const {
        step,
        formData,
        setFormData,
        errors,
        setErrors,
        isDialogOpen,
        setIsDialogOpen,
        isSubmitting,
        openSuccess,
        setOpenSuccess,
        isUploading,
        isRemoving,
        handleUpload,
        handleRemoveDocsFromCloudaniry,
        handleNext,
        handlePrevious,
        openPreview,
        handleFinalSubmit,
    } = useLoanForm({
        initialData,
        validateFields,
        validateAllFields,
        stepFields,
        mutation: createLoanMutation,
        persistenceKey: "goldLoanForm",
        folderPrefix: "goldloan",
        fileFields: ["aadhar_front", "aadhar_back", "personal_pan_upload", "house_electricity"],
        formSteps,
        extraPersistenceData: { loanHistory, setLoanHistory },
    });

    const handleAddEntry = () => {
        setLoanHistory([...loanHistory, {
            loan_provider_bank: "",
            total_loan_amount: "",
            current_emi: "",
            remaining_amount: "",
        }]);
    };

    const handleRemoveEntry = (index) => {
        const updatedHistory = [...loanHistory];
        updatedHistory.splice(index, 1);
        setLoanHistory(updatedHistory);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedHistory = [...loanHistory];
        updatedHistory[index][name] = value;
        setLoanHistory(updatedHistory);
    };

    const handleGoldSubmit = () => {
        handleFinalSubmit({ ...formData, loanHistory });
    };

    return (
        <FormLayout
            title="Gold Loan Application"
            description="Apply for a gold loan with minimal documentation and instant approval to meet your immediate financial needs."
            icon={Coins}
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
                        case "personal_details":
                            return (
                                <PersonalDetails
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            );
                        case "employment":
                            return (
                                <Employment
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                    loanHistory={loanHistory}
                                    setLoanHistory={setLoanHistory}
                                    handleAddEntry={handleAddEntry}
                                    handleRemoveEntry={handleRemoveEntry}
                                    loanHistoryHandleChange={handleChange}
                                />
                            );
                        case "documents":
                            return (
                                <Documents
                                    formData={formData}
                                    setFormData={setFormData}
                                    errors={errors}
                                    setErrors={setErrors}
                                    isUploading={isUploading}
                                    isRemoving={isRemoving}
                                    handleUpload={handleUpload}
                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
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

            <PreviewModal
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                formData={formData}
                handleFinalSubmit={handleGoldSubmit}
                isSubmitting={isSubmitting}
            />
            <LoadingModal open={isSubmitting || createLoanMutation.isPending} />
            <SuccessModal open={openSuccess} onOpenChange={setOpenSuccess} />
        </FormLayout>
    );
};

export default App;
