"use client";

import React, { useEffect, useMemo, useState } from "react";
import { del } from "idb-keyval";
import { useRouter } from "next/navigation";
import { useCreateVehicleLoan, useUpdateVehicleLoan } from "@/hooks/loans/useVehicleLoan";
import FormInstructions from "@/components/common/FormInstructions";
import { LoanWizardFrame } from "@/components/forms/loans/LoanWizardFrame";
import { Briefcase, Building2, CheckCircle2, Car, FileText, Home, Upload, UserRound, Users as UsersIcon } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

// Validations
import { validateFields, validateAllFields, stepFields } from "@/app/dashboard/forms/vehicle_loan/formValidation";

// Steps Components
import { PersonalDetails } from "./steps/PersonalDetails";
import { AddressDetails } from "./steps/AddressDetails";
import { EmploymentDetails } from "./steps/EmploymentDetails";
import { LoanDetails } from "./steps/LoanDetails";
import { ReferenceDetails } from "./steps/ReferenceDetails";
import { DocumentsUpload } from "./steps/DocumentsUpload";
import { ReviewSubmit } from "./steps/ReviewSubmit";

export function VehicleLoanForm({ mode = "create", loanId = null, initialValues = null }) {
    const router = useRouter();
    const createLoanMutation = useCreateVehicleLoan();
    const updateLoanMutation = useUpdateVehicleLoan();
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
        { id: "employment_details", title: "Profession Details" },
        { id: "loan_details", title: "Financial Details" },
        { id: "reference_details", title: "Reference Details" },
        { id: "documents", title: "Documents Upload" },
        { id: "review_submit", title: "Review & Submit" },
    ];

    const baseInitialData = {
        folderName: "",
        which_vehicle: "",
        when_purchase: "",
        estimated_cost: "",
        loan_you_need: "",
        profession: "",
        have_coapplicant: "No",
        co_applicant_dob: "",
        co_applicant_name: "",
        co_occupation: "",
        loan_amount: "",
        id_of_connector: "",
        name_of_connector: "",
        applicant_name: "",
        fathers_name: "",
        mothers_name: "",
        phone_no: "",
        alt_phone_no: "",
        pan: "",
        aadhar: "",
        dob: "",
        marital_status: "Unmarried",
        spouse_name: "",
        permanent_building_name: "",
        permanent_street_name: "",
        permanent_landmark: "",
        permanent_city: "",
        permanent_district: "",
        permanent_state: "",
        permanent_pincode: "",
        same_as_permanent_address: false,
        present_building_name: "",
        present_street_name: "",
        present_landmark: "",
        present_city: "",
        present_district: "",
        present_state: "",
        present_pincode: "",
        company_name: "",
        company_age: "",
        registration_paper: [],
        current_company_name: "",
        salary_account_bank: "",
        savings_account_bank: "",
        job_tenure: "",
        job_experience: "",
        monthly_income: "",
        have_current_account: "No",
        current_account_bank_name: "",
        name_in_current_account: "",
        current_account_age: "",
        current_account_turnover: "",
        saving_account_bank_name: "",
        saving_account_turnover: "",
        have_property_for_mortage: "No",
        property_location: "",
        who_own_property: "",
        have_17_kahta_agri_land: "No",
        needs_of_documents: [],
        applicant_selfie: "",
        aadhar_front: "",
        aadhar_back: "",
        personal_pan: "",
        address_prooof: "",
        coapplicant_aadhar_front: "",
        coapplicant_aadhar_back: "",
        coapplicant_pan: "",
        salary_slip_1: "",
        salary_slip_2: "",
        salary_slip_3: "",
        form_16_itr_1: "",
        form_16_itr_2: "",
        electricity_bill: "",
        business_images: "",
        business_proof: "",
        itr_1: "",
        itr_2: "",
        another_1: "",
        another_2: "",
        another_3: "",
        sale_deed: "",
        mutation: "",
        rashid: "",
        lpc: "",
        property_pic: "",
        property_map: "",
        chain_deed: "",
        guarantor_aadhar_front: "",
        guarantor_aadhar_back: "",
        guarantor_pan: "",
        vehicle_quotation: "",
        owner_book: "",
        references: [
            {
                name: "",
                relation: "",
                phone: "",
                village: "",
                street: "",
                district: "",
                pincode: "",
                profession: "",
            },
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
        persistenceKey: "vehicleLoanForm",
        folderPrefix: "vehicleloan",
        fileFields: [
            "applicant_selfie", "aadhar_front", "aadhar_back", "personal_pan",
            "address_prooof", "coapplicant_aadhar_front", "coapplicant_aadhar_back",
            "coapplicant_pan", "salary_slip_1", "salary_slip_2", "salary_slip_3",
            "form_16_itr_1", "form_16_itr_2", "electricity_bill", "business_images",
            "business_proof", "itr_1", "itr_2", "another_1", "another_2", "another_3",
            "sale_deed", "mutation", "rashid", "lpc", "property_pic", "property_map",
            "chain_deed", "guarantor_aadhar_front", "guarantor_aadhar_back",
            "guarantor_pan", "vehicle_quotation", "owner_book"
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

    const handleAddEntry = () => {
        setLoanHistory([...loanHistory, { loan_provider_bank: "", total_loan_amount: "", current_emi: "", remaining_amount: "" }]);
    };

    const handleRemoveEntry = (index) => {
        setLoanHistory(loanHistory.filter((_, i) => i !== index));
    };

    const loanHistoryHandleChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...loanHistory];
        list[index][name] = value;
        setLoanHistory(list);
    };

    const handleVehicleSubmit = () => {
        handleFinalSubmit({ ...formData, loanHistory });
    };

    const currentStepErrors = useMemo(() => {
        const fields = stepFields[step] || [];
        if (!fields.length) return {};
        return validateFields(formData, fields);
    }, [step, formData]);

    const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;
    console.log(currentStepErrors);
    // console.log(formData);


    const resetWholeForm = async () => {
        await del("vehicleLoanForm");
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("vehicleLoanForm");
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
                return <LoanDetails
                    formData={formData}
                    handleFieldChange={handleFieldChange}
                    errors={errors}
                    setFormData={setFormData}
                    loanHistory={loanHistory}
                    setLoanHistory={setLoanHistory}
                    handleAddEntry={handleAddEntry}
                    handleRemoveEntry={handleRemoveEntry}
                    loanHistoryHandleChange={loanHistoryHandleChange}
                />;
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
            title="Vehicle Loan Application"
            description="Apply for a vehicle loan with quick processing and attractive interest rates to buy your dream car or bike."
            icon={Car}
            steps={formSteps}
            stepIcons={stepIcons}
            stepIndex={step}
            onBack={handlePrevious}
            onNext={handleNext}
            onReset={resetWholeForm}
            onSubmit={handleVehicleSubmit}
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
