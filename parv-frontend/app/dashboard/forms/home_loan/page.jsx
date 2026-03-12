"use client";

import React, { useState } from "react";
import PersonalDetails from "./personal_details.jsx";
import Profession from "./profession";
import Documents from "./documents.jsx";
import { Button } from "@/components/ui/button";
import {
  validateFields,
  validateAllFields,
  stepFields,
} from "./formValidation";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { useCreateHomeLoan } from "@/hooks/loans/useHomeLoan";
import { LoadingModal, PreviewModal, SuccessModal } from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";
import FormInstructions from "@/components/common/FormInstructions.jsx";
import FormLayout from "@/components/common/ModernFormLayout.jsx";
import { Home } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

const App = () => {
  const createLoanMutation = useCreateHomeLoan();

  const [loanHistory, setLoanHistory] = useState([{
    loan_provider_bank: "",
    total_loan_amount: "",
    current_emi: "",
    remaining_amount: "",
  }]);

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "personal_details", title: "Personal Details" },
    { id: "profession", title: "Profession" },
    { id: "documents", title: "Documents" },
  ];

  const initialData = {
    folderName: "",
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    purpose_of_loan: "To purchase property",
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
    same_as_permanent_address: false,
    profession: "Business",
    have_coapplicant: "No",
    co_applicant_dob: "",
    co_applicant_name: "",
    co_occupation: "",
    current_company_name: "",
    salary_account_bank: "",
    savings_account_bank: "",
    job_tenure: "0-12 months",
    job_experience: "less than 1 year",
    monthly_income: "less than 12,000",
    company_name: "",
    company_age: "",
    registration_paper: [],
    have_offer_letter: "No",
    have_tan_no: "No",
    has_salary_slip: "No",
    has_bank_statement: "No",
    has_current_loan: "No",
    total_loan_amount: "less than 50,000",
    loan_start_date: "0-12 months before",
    loan_provider_bank: "",
    monthly_emi: "",
    have_property_for_mortage: "No",
    property_location: "",
    who_own_property: "",
    have_17_kahta_agri_land: "No",
    needs_of_documents: [],
    applicant_selfie: undefined,
    aadhar_front: undefined,
    aadhar_back: undefined,
    personal_pan_upload: undefined,
    company_image: undefined,
    coapplicant_aadhar_front: undefined,
    coapplicant_aadhar_back: undefined,
    coapplicant_pan: undefined,
    salary_slip_1: undefined,
    salary_slip_2: undefined,
    salary_slip_3: undefined,
    other_doc: undefined,
    gst_certificate: undefined,
    udyam_registration: undefined,
    form_3: undefined,
    itr_1: undefined,
    itr_2: undefined,
    bank_statement: undefined,
    shop_front: undefined,
    house_electricity: undefined,
    lpc: undefined,
    rashid: undefined,
    mutation: undefined,
    sale_deed: undefined,
    property_pic: undefined,
    property_map: undefined,
    chain_deed: undefined,
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

  const handleHomeSubmit = () => {
    handleFinalSubmit({ ...formData, loanHistory });
  };

  return (
    <FormLayout
      title="Home Loan Application"
      description="Apply for a home loan to fulfill your dream of owning a house with easy documentation and competitive rates."
      icon={Home}
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
            case "profession":
              return (
                <Profession
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
                  isRemoving={isRemoving}
                  isUploading={isUploading}
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
        handleFinalSubmit={handleHomeSubmit}
        isSubmitting={isSubmitting}
      />
      <LoadingModal open={isSubmitting || createLoanMutation.isPending} />
      <SuccessModal open={openSuccess} onOpenChange={setOpenSuccess} />
    </FormLayout>
  );
};

export default App;
