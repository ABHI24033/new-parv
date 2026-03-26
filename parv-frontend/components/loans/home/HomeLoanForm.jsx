"use client";

import React, { useEffect, useMemo, useState } from "react";
import { del } from "idb-keyval";
import { useRouter } from "next/navigation";
import { useCreateHomeLoan, useUpdateHomeLoan } from "@/hooks/loans/useHomeLoan";
import FormInstructions from "@/components/common/FormInstructions";
import { LoanWizardFrame } from "@/components/forms/loans/LoanWizardFrame";
import { Briefcase, Building2, CheckCircle2, FileText, Home, Upload, UserRound, Users as UsersIcon } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

// Validations
import { validateFields, validateAllFields, stepFields } from "@/app/dashboard/forms/home_loan/formValidation";

// Steps Components
import { PersonalDetails } from "./steps/PersonalDetails";
import { AddressDetails } from "./steps/AddressDetails";
import { EmploymentDetails } from "./steps/EmploymentDetails";
import { LoanDetails } from "./steps/LoanDetails";
import { ReferenceDetails } from "./steps/ReferenceDetails";
import { DocumentsUpload } from "./steps/DocumentsUpload";
import { ReviewSubmit } from "./steps/ReviewSubmit";

export function HomeLoanForm({ mode = "create", loanId = null, initialValues = null }) {
    const router = useRouter();
    const createLoanMutation = useCreateHomeLoan();
    const updateLoanMutation = useUpdateHomeLoan();
    const isEditMode = mode === "edit" && Boolean(loanId);

    const defaultLoanHistory = [{
        loan_provider_bank: "",
        total_loan_amount: "",
        current_emi: "",
        remaining_amount: "",
    }];
    const initialLoanHistory = useMemo(() => (
        initialValues?.loanHistory?.length ? initialValues.loanHistory : defaultLoanHistory
    ), [initialValues]);
    const [loanHistory, setLoanHistory] = useState(initialLoanHistory);

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

    const baseInitialData = {
        folderName: "",
        loan_amount: "",
        id_of_connector: "",
        name_of_connector: "",
        // purpose_of_loan: "To purchase property",
        loan_type: "",
        applicant_name: "",
        fathers_name: "",
        mothers_name: "",
        phone_no: "",
        email: "",
        alt_phone_no: "",
        pan: "",
        aadhar: "",
        dob: "",
        marital_status: "Unmarried",
        spouse_name: "",
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
        same_as_permanent_address: false, profession: "Business", have_coapplicant: "No", co_applicant_dob: "",
        co_applicant_name: "", co_occupation: "", relation_with_applicant: "", current_company_name: "",
        salary_account_bank: "", savings_account_bank: "", job_tenure: "0-12 months", job_experience: "less than 1 year",
        monthly_income: "less than 12,000", company_name: "", company_age: "", registration_paper: [],
        have_offer_letter: "No", have_tan_no: "No", has_salary_slip: "No", has_bank_statement: "No", has_current_loan: "No",
        total_loan_amount: "less than 50,000", loan_start_date: "0-12 months before", loan_provider_bank: "",
        monthly_emi: "", have_property_for_mortage: "No", property_location: "", who_own_property: "",
        have_17_kahta_agri_land: "No", needs_of_documents: [], applicant_selfie: undefined, aadhar_front: undefined,
        aadhar_back: undefined, personal_pan_upload: undefined, company_image: undefined, coapplicant_aadhar_front: undefined,
        coapplicant_aadhar_back: undefined, coapplicant_pan: undefined, salary_slip_1: undefined, salary_slip_2: undefined,
        salary_slip_3: undefined, other_doc: undefined, gst_certificate: undefined, udyam_registration: undefined,
        form_3: undefined, itr_1: undefined, itr_2: undefined, bank_statement: undefined, shop_front: undefined,
        house_electricity: undefined, lpc: undefined, rashid: undefined, mutation: undefined, sale_deed: undefined,
        property_pic: undefined, property_map: undefined, chain_deed: undefined, other_doc1: undefined,
        other_doc2: undefined, other_doc3: undefined, references: [
            { name: "", relation: "", phone: "", village: "", street: "", district: "", pincode: "", profession: "" },
        ],
    };
    const mergedInitialData = useMemo(() => ({ ...baseInitialData, ...(initialValues || {}) }), [initialValues]);
    const activeMutation = isEditMode
        ? {
            ...updateLoanMutation,
            mutate: (data, options) => updateLoanMutation.mutate({ id: loanId, data }, options),
        }
        : createLoanMutation;

    const {
        step, setStep, formData, setFormData, errors, setErrors, isSubmitting, openSuccess, setOpenSuccess,
        isUploading, isRemoving, handleRemoveDocsFromCloudaniry, handleNext, handlePrevious, handleFinalSubmit,
        handleFileChange,
    } = useLoanForm({
        initialData: mergedInitialData,
        validateFields,
        validateAllFields,
        stepFields,
        mutation: activeMutation,
        persistenceKey: "homeLoanForm",
        folderPrefix: "homeloan",
        fileFields: [
            "applicant_selfie", "aadhar_front", "aadhar_back", "personal_pan_upload",
            "company_image", "coapplicant_aadhar_front", "coapplicant_aadhar_back",
            "coapplicant_pan", "salary_slip_1", "salary_slip_2", "salary_slip_3",
            "other_doc", "gst_certificate", "udyam_registration", "form_3", "itr_1",
            "itr_2", "bank_statement", "shop_front", "house_electricity", "lpc",
            "rashid", "mutation", "sale_deed", "property_pic", "property_map",
            "chain_deed", "other_doc1", "other_doc2", "other_doc3"
        ],
        formSteps,
        extraPersistenceData: { loanHistory, setLoanHistory },
        persistenceEnabled: !isEditMode,
        onSuccess: () => {
            if (isEditMode) {
                router.push(`/dashboard/loans/${loanId}`);
            }
        },
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

    const handleHomeSubmit = () => {
        handleFinalSubmit({ ...formData, loanHistory });
    };

    const currentStepErrors = useMemo(() => {
        const fields = stepFields[step] || [];
        if (!fields.length) return {};
        return validateFields(formData, fields);
    }, [step, formData]);

    const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;

    const resetWholeForm = async () => {
        await del("homeLoanForm");
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("homeLoanForm");
        }
        setFormData(mergedInitialData);
        setLoanHistory(initialLoanHistory);
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
                return <LoanDetails formData={formData} handleFieldChange={handleFieldChange} errors={errors} />;
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
            title="Home Loan Application"
            description="Quick and reliable home loans to bring your dreams to life. Complete your application easily."
            icon={Home}
            steps={formSteps}
            stepIcons={stepIcons}
            stepIndex={step}
            onBack={handlePrevious}
            onNext={handleNext}
            onReset={resetWholeForm}
            onSubmit={handleHomeSubmit}
            isLastStep={step === formSteps.length - 1}
            nextDisabled={!isCurrentStepValid}
            submitDisabled={isSubmitting || activeMutation.isPending}
            navDisabled={isSubmitting || activeMutation.isPending}
            submitLabel={activeMutation.isPending ? (isEditMode ? "Updating..." : "Submitting...") : (isEditMode ? "Update Loan" : "Submit Application")}
            loadingOpen={isSubmitting || activeMutation.isPending}
            successOpen={openSuccess}
            onSuccessOpenChange={setOpenSuccess}
        >
            {renderStepContent()}
        </LoanWizardFrame>
    );
}
