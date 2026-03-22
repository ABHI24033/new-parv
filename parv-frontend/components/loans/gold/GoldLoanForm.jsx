"use client";

import React, { useEffect, useMemo, useState } from "react";
import { del } from "idb-keyval";
import { useCreateGoldLoan } from "@/hooks/loans/useGoldLoan";
import FormInstructions from "@/components/common/FormInstructions";
import { LoanWizardFrame } from "@/components/forms/loans/LoanWizardFrame";
import { Briefcase, Building2, CheckCircle2, Coins, FileText, Home, Upload, UserRound, Users as UsersIcon } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

// Validations
import { validateFields, validateAllFields, stepFields } from "@/app/dashboard/forms/gold_loan/formValidation";

// Steps Components
import { PersonalDetails } from "./steps/PersonalDetails";
import { AddressDetails } from "./steps/AddressDetails";
import { EmploymentDetails } from "./steps/EmploymentDetails";
import { LoanDetails } from "./steps/LoanDetails";
import { ReferenceDetails } from "./steps/ReferenceDetails";
import { DocumentsUpload } from "./steps/DocumentsUpload";
import { ReviewSubmit } from "./steps/ReviewSubmit";

export function GoldLoanForm() {
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
        { id: "address_details", title: "Address Details" },
        { id: "employment_details", title: "Employment / Business" },
        { id: "loan_details", title: "Loan Details" },
        { id: "reference_details", title: "Reference Details" },
        { id: "documents", title: "Documents" },
        { id: "review_submit", title: "Review & Submit" },
    ];

    const initialData = {
        folderName: "", loan_amount: "", id_of_connector: "", name_of_connector: "", applicant_name: "", fathers_name: "", mothers_name: "",
        phone_no: "", alt_phone_no: "", pan: "", dob: "", present_building_name: "", present_street_name: "", present_landmark: "",
        present_city: "", present_district: "", present_state: "", present_pincode: "", permanent_building_name: "",
        permanent_street_name: "", permanent_landmark: "", permanent_city: "", permanent_district: "", permanent_state: "",
        permanent_pincode: "", same_as_permanent_address: false, saving_account_bank_name: "", saving_account_turnover: "",
        applicant_selfie: undefined, aadhar_front: undefined, aadhar_back: undefined, personal_pan_upload: undefined,
        house_electricity: undefined, references: [
            { name: "", relation: "", phone: "", village: "", street: "", district: "", pincode: "", profession: "" },
        ],
    };

    const {
        step, setStep, formData, setFormData, errors, setErrors, isSubmitting, openSuccess, setOpenSuccess,
        isUploading, isRemoving, handleRemoveDocsFromCloudaniry, handleNext, handlePrevious, handleFinalSubmit,
        handleFileChange,
    } = useLoanForm({
        initialData,
        validateFields,
        validateAllFields,
        stepFields,
        mutation: createLoanMutation,
        persistenceKey: "goldLoanForm",
        folderPrefix: "goldloan",
        fileFields: ["applicant_selfie", "aadhar_front", "aadhar_back", "personal_pan_upload", "house_electricity"],
        formSteps,
        extraPersistenceData: { loanHistory, setLoanHistory },
    });

    const handleFieldChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
        const fieldValidation = validateFields({ ...formData, [fieldName]: value }, [fieldName]);
        setErrors((prevErrors) => {
            const nextErrors = { ...prevErrors };
            if (!fieldValidation[fieldName]) delete nextErrors[fieldName];
            else nextErrors[fieldName] = fieldValidation[fieldName];
            return nextErrors;
        });
    };

    const handleAddressSync = (checked) => {
        setFormData((prev) => {
            const next = { ...prev, same_as_permanent_address: checked };
            if (checked) {
                next.present_building_name = prev.permanent_building_name || "";
                next.present_street_name = prev.permanent_street_name || "";
                next.present_landmark = prev.permanent_landmark || "";
                next.present_city = prev.permanent_city || "";
                next.present_district = prev.permanent_district || "";
                next.present_state = prev.permanent_state || "";
                next.present_pincode = prev.permanent_pincode || "";
            }
            return next;
        });
    };

    const handleGoldSubmit = () => {
        handleFinalSubmit({ ...formData, loanHistory });
    };

    const currentStepErrors = useMemo(() => {
        const fields = stepFields[step] || [];
        if (!fields.length) return {};
        return validateFields(formData, fields);
    }, [step, formData]);

    const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;

    const resetWholeForm = async () => {
        await del("goldLoanForm");
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("goldLoanForm");
        }
        setFormData(initialData);
        setLoanHistory([{ loan_provider_bank: "", total_loan_amount: "", current_emi: "", remaining_amount: "" }]);
        setErrors({});
        setStep(0);
    };

    const stepIcons = [FileText, UserRound, Home, Building2, Briefcase, UsersIcon, Upload, CheckCircle2];

    const renderStepContent = () => {
        switch (formSteps[step].id) {
            case "instructions":
                return <FormInstructions />;
            case "personal_details":
                return <PersonalDetails formData={formData} handleFieldChange={handleFieldChange} errors={errors} />;
            case "address_details":
                return <AddressDetails formData={formData} handleFieldChange={handleFieldChange} handleAddressSync={handleAddressSync} errors={errors} />;
            case "employment_details":
                return <EmploymentDetails formData={formData} handleFieldChange={handleFieldChange} errors={errors} />;
            case "loan_details":
                return <LoanDetails loanHistory={loanHistory} setLoanHistory={setLoanHistory} />;
            case "reference_details":
                return <ReferenceDetails formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} validateFields={validateFields} />;
            case "documents":
                return <DocumentsUpload formData={formData} errors={errors} handleFileChange={handleFileChange} isUploading={isUploading} isRemoving={isRemoving} handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry} />;
            case "review_submit":
                return <ReviewSubmit formData={formData} setStep={setStep} loanHistory={loanHistory} />;
            default:
                return <div>Form Section Not Found</div>;
        }
    };

    return (
        <LoanWizardFrame
            title="Gold Loan Application"
            description="Apply for a gold loan with minimal documentation and instant approval to meet your immediate financial needs."
            icon={Coins}
            steps={formSteps}
            stepIcons={stepIcons}
            stepIndex={step}
            onBack={handlePrevious}
            onNext={handleNext}
            onReset={resetWholeForm}
            onSubmit={handleGoldSubmit}
            isLastStep={step === formSteps.length - 1}
            nextDisabled={!isCurrentStepValid}
            submitDisabled={isSubmitting || createLoanMutation.isPending}
            navDisabled={isSubmitting || createLoanMutation.isPending}
            submitLabel={createLoanMutation.isPending ? "Submitting..." : "Submit Application"}
            loadingOpen={isSubmitting || createLoanMutation.isPending}
            successOpen={openSuccess}
            onSuccessOpenChange={setOpenSuccess}
        >
            {renderStepContent()}
        </LoanWizardFrame>
    );
}
