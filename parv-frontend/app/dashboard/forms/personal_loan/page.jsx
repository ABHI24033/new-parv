"use client";

import React, { useState } from "react";
import PersonalDetails from "./personal_details";
import Employment from "./employment";
import Documents from "./documents";
import { Button } from "@/components/ui/button";
import FormStepIndicator from "@/components/common/form_step_indicator";
import {
  validateFields,
  validateAllFields,
  stepFields,
} from "./formValidation";
import { useCreatePersonalLoan } from "@/hooks/loans/usePersonalLoan";
import { Toaster } from "react-hot-toast";
import { LoadingModal, PreviewModal, SuccessModal } from "@/components/common/Modals";
import FormInstructions from "@/components/common/FormInstructions";
import { User } from "lucide-react";
import FormLayout from "@/components/common/ModernFormLayout";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

const LoanApplicationForm = () => {
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
    { id: "employment", title: "Employment & Loans" },
    { id: "documents", title: "Documents" },
  ];

  const initialData = {
    folderName: '',
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    purpose_of_loan: "",
    applicant_name: "",
    fathers_name: "",
    mothers_name: "",
    phone_no: "",
    alt_phone_no: "",
    email: "",
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
    have_coapplicant: "No",
    co_applicant_dob: "",
    co_applicant_name: "",
    co_occupation: "",
    current_company_name: "",
    designation: "",
    salary_account_bank: "",
    job_tenure: "",
    savings_account_bank: "",
    saving_account_turnover: "",
    file_income_tax: "No",
    job_experience: "less than 1 year",
    monthly_income: "less than 12,000",
    office_building_name: "",
    office_street_name: "",
    office_landmark: "",
    office_city: "",
    office_district: "",
    office_state: "",
    office_pincode: "",
    applicant_selfie: undefined,
    aadhar_front: undefined,
    aadhar_back: undefined,
    Personal_pan: undefined,
    salary_slip_1: undefined,
    salary_slip_2: undefined,
    salary_slip_3: undefined,
    offer_letter: undefined,
    other_doc1: undefined,
    other_doc2: undefined,
    other_doc3: undefined,
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
    persistenceKey: "personalLoanForm",
    folderPrefix: "personalloan",
    fileFields: [
      "applicant_selfie", "aadhar_front", "aadhar_back", "Personal_pan",
      "salary_slip_1", "salary_slip_2", "salary_slip_3",
      "other_doc1", "other_doc2", "other_doc3", "offer_letter"
    ],
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

  const handlePersonalSubmit = () => {
    handleFinalSubmit({ ...formData, loanHistory });
  };

  return (
    <FormLayout
      title="Personal Loan Application"
      description="Apply for a personal loan with minimal documentation and quick processing for all your immediate financial needs."
      icon={User}
    >
      <Toaster />
      <FormStepIndicator
        keys={formSteps.map((s) => s.title)}
        step={step}
      />

      <div className="mt-8 mb-10">
        {(() => {
          switch (step) {
            case 0:
              return <FormInstructions />;
            case 1:
              return <PersonalDetails
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />;
            case 2:
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
            case 3:
              return <Documents
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                handleUpload={handleUpload}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                isRemoving={isRemoving}
                isUploading={isUploading}
              />;
            default:
              return <div>Step not found</div>;
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
        handleFinalSubmit={handlePersonalSubmit}
        isSubmitting={isSubmitting}
      />
      <LoadingModal open={isSubmitting || createLoanMutation.isPending} />
      <SuccessModal open={openSuccess} onOpenChange={setOpenSuccess} />
    </FormLayout>
  );
};

export default LoanApplicationForm;
