"use client";

import React, { useState } from "react";
import VehicleDetails from "./vehicle_details";
import PersonalDetails from "./personal_details";
import Employment from "./employment";
import { Button } from "@/components/ui/button";
import {
  validateFields,
  validateAllFields,
  stepFields,
} from "./formValidation";
import FormStepIndicator from "@/components/common/form_step_indicator";
import { useCreateVehicleLoan } from "@/hooks/loans/useVehicleLoan";
import Documents from "./documents";
import { LoadingModal, PreviewModal, SuccessModal } from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";
import FormInstructions from "@/components/common/FormInstructions";
import FormLayout from "@/components/common/ModernFormLayout";
import { Car } from "lucide-react";
import { useLoanForm } from "@/hooks/loans/useLoanForm";

const App = () => {
  const createLoanMutation = useCreateVehicleLoan();

  const [loanHistory, setLoanHistory] = useState([{
    loan_provider_bank: "",
    total_loan_amount: "",
    current_emi: "",
    remaining_amount: "",
  }]);

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "vehicle_details", title: "Vehicle Details" },
    { id: "personal_details", title: "Personal Details" },
    { id: "employment", title: "Employment & Loans" },
    { id: "documents", title: "Documents" },
  ];

  const initialData = {
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

  const handleVehicleSubmit = () => {
    handleFinalSubmit({ ...formData, loanHistory });
  };

  return (
    <FormLayout
      title="Vehicle Loan Application"
      description="Apply for a vehicle loan with competitive interest rates and flexible repayment options for your dream car or bike."
      icon={Car}
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
            case "vehicle_details":
              return (
                <VehicleDetails
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                />
              );
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
                  handleUpload={handleUpload}
                  isUploading={isUploading}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                  isRemoving={isRemoving}
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
        handleFinalSubmit={handleVehicleSubmit}
        isSubmitting={isSubmitting}
      />
      <LoadingModal open={isSubmitting || createLoanMutation.isPending} />
      <SuccessModal open={openSuccess} onOpenChange={setOpenSuccess} />
    </FormLayout>
  );
};

export default App;
