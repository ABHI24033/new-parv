"use client";

import React, { useEffect, useMemo, useState } from "react";
import { del } from "idb-keyval";
import { useCreatePersonalLoan } from "@/hooks/loans/usePersonalLoan";
import FormInstructions from "@/components/common/FormInstructions";
import { LoanWizardFrame } from "@/components/forms/loans/LoanWizardFrame";
import { Briefcase, Building2, CheckCircle2, FileText, Home, Upload, UserRound, Users as UsersIcon } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

// Validations (Keep existing validation logic where possible)
import { validateFields, validateAllFields } from "@/app/dashboard/forms/personal_loan/formValidation";

// Steps Components
import { PersonalDetails } from "./steps/PersonalDetails";
import { AddressDetails } from "./steps/AddressDetails";
import { EmploymentDetails } from "./steps/EmploymentDetails";
import { LoanDetails } from "./steps/LoanDetails";
import { ReferenceDetails } from "./steps/ReferenceDetails";
import { DocumentsUpload } from "./steps/DocumentsUpload";
import { ReviewSubmit } from "./steps/ReviewSubmit";

export function PersonalLoanForm() {
    const createLoanMutation = useCreatePersonalLoan();

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
        folderName: "", loan_amount: "", id_of_connector: "", name_of_connector: "", purpose_of_loan: "",
        applicant_name: "", fathers_name: "", mothers_name: "", phone_no: "", alt_phone_no: "", email: "",
        pan: "", aadhar: "", dob: "", marital_status: "Unmarried", spouse_name: "",
        permanent_building_name: "", permanent_street_name: "", permanent_landmark: "", permanent_city: "",
        permanent_district: "", permanent_state: "", permanent_pincode: "", same_as_permanent_address: false,
        present_building_name: "", present_street_name: "", present_landmark: "", present_city: "",
        present_district: "", present_state: "", present_pincode: "", have_coapplicant: "No", co_applicant_dob: "",
        co_applicant_name: "", co_occupation: "", relation_with_applicant: "", current_company_name: "",
        designation: "", salary_account_bank: "", job_tenure: "", savings_account_bank: "", saving_account_turnover: "",
        file_income_tax: "No", job_experience: "less than 1 year", monthly_income: "less than 12,000",
        office_building_name: "", office_street_name: "", office_landmark: "", office_city: "", office_district: "",
        office_state: "", office_pincode: "", applicant_selfie: undefined, aadhar_front: undefined, aadhar_back: undefined,
        Personal_pan: undefined, coapplicant_aadhar_front: undefined, coapplicant_aadhar_back: undefined,
        coapplicant_pan: undefined, salary_slip_1: undefined, salary_slip_2: undefined, salary_slip_3: undefined,
        offer_letter: undefined, other_doc1: undefined, other_doc2: undefined, other_doc3: undefined,
        references: [
            { name: "", relation: "", phone: "", village: "", street: "", district: "", pincode: "", profession: "" },
        ],
    };

    const stepFields = {
        0: [],
        1: ["loan_amount", "id_of_connector", "name_of_connector", "purpose_of_loan", "applicant_name", "fathers_name", "mothers_name", "phone_no", "dob", "pan", "aadhar", "marital_status", "spouse_name", "have_coapplicant", "co_applicant_name", "co_applicant_dob", "co_occupation", "relation_with_applicant", "email"],
        2: ["permanent_building_name", "permanent_street_name", "permanent_city", "permanent_district", "permanent_state", "permanent_pincode", "same_as_permanent_address", "present_building_name", "present_street_name", "present_city", "present_district", "present_state", "present_pincode"],
        3: ["current_company_name", "designation", "salary_account_bank", "job_tenure", "savings_account_bank", "job_experience", "monthly_income", "office_building_name", "office_street_name", "office_city", "office_district", "office_state", "office_pincode"],
        4: ["has_current_loan"],
        5: ["references"],
        6: ["applicant_selfie", "aadhar_front", "aadhar_back", "Personal_pan", "salary_slip_1", "salary_slip_2", "salary_slip_3", "offer_letter"],
        7: [],
    };

    const {
        step,
        setStep,
        formData,
        setFormData,
        errors,
        setErrors,
        isSubmitting,
        openSuccess,
        setOpenSuccess,
        isUploading,
        isRemoving,
        handleRemoveDocsFromCloudaniry,
        handleNext,
        handlePrevious,
        handleFinalSubmit,
        handleFileChange,
    } = useLoanForm({
        initialData,
        validateFields,
        validateAllFields,
        stepFields,
        mutation: createLoanMutation,
        persistenceKey: "personalLoanForm",
        folderPrefix: "personalloan",
        fileFields: [
            "applicant_selfie", "aadhar_front", "aadhar_back", "Personal_pan", "coapplicant_aadhar_front",
            "coapplicant_aadhar_back", "coapplicant_pan", "salary_slip_1", "salary_slip_2", "salary_slip_3",
            "offer_letter", "other_doc1", "other_doc2", "other_doc3"
        ],
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

    const handlePersonalSubmit = () => {
        handleFinalSubmit({ ...formData, loanHistory });
    };

    const currentStepErrors = useMemo(() => {
        const fields = stepFields[step] || [];
        if (!fields.length) return {};
        return validateFields(formData, fields);
    }, [step, formData]);

    const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;

    const resetWholeForm = async () => {
        await del("personalLoanForm");
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("personalLoanForm");
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
                return <LoanDetails formData={formData} handleFieldChange={handleFieldChange} errors={errors} loanHistory={loanHistory} setLoanHistory={setLoanHistory} />;
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
            title="Personal Loan Application"
            description="Quick and hassle-free personal loans to meet your financial needs. Apply in minutes."
            icon={Briefcase}
            steps={formSteps}
            stepIcons={stepIcons}
            stepIndex={step}
            onBack={handlePrevious}
            onNext={handleNext}
            onReset={resetWholeForm}
            onSubmit={handlePersonalSubmit}
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
