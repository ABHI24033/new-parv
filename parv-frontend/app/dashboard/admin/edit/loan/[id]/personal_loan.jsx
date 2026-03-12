"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, get_upload_promises } from "@/lib/utils"; 
import { useUserState } from "@/app/dashboard/store";
import { setLoanByID } from "@/lib/actions/loan";
import { validateAllFields } from "@/app/dashboard/forms/personal_loan/formValidation";
import FormInput from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { FormFileUpload } from "@/components/common/FormFile";
import { LoadingModal, UserSuccessModal } from "@/components/common/Modals";

const PersonalLoan = ({ id, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const userState = useUserState();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev };
      if (type === "checkbox") {
        updatedData[id] = checked;
        if (id === "same_as_permanent_address" && checked) {
          updatedData.present_building_name =
            prev.permanent_building_name || "";
          updatedData.present_street_name = prev.permanent_street_name || "";
          updatedData.present_landmark = prev.permanent_landmark || "";
          updatedData.present_city = prev.permanent_city || "";
          updatedData.present_district = prev.permanent_district || "";
          updatedData.present_state = prev.permanent_state || "";
          updatedData.present_pincode = prev.permanent_pincode || "";
        } else if (id === "same_as_permanent_address" && !checked) {
          updatedData.present_building_name = "";
          updatedData.present_street_name = "";
          updatedData.present_landmark = "";
          updatedData.present_city = "";
          updatedData.present_district = "";
          updatedData.present_state = "";
          updatedData.present_pincode = "";
        }
      } else {
        updatedData[id] = value;
      }
      return updatedData;
    });

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files[0],
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleCloseSuccessModel = () => {
    setIsSuccess(false);
  }

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    const allFormErrors = validateAllFields(formData);

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsSubmitting(false);
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      alert("Please fix the errors in the form before updating.");
      return;
    }

    setErrors({});

    const dataToSubmit = { ...formData };

    const fileFields = [
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "Personal_pan",
      "coapplicant_aadhar_front",
      "coapplicant_aadhar_back",
      "coapplicant_pan",
      "salary_slip_1",
      "salary_slip_2",
      "salary_slip_3",
      "offer_letter",
      "other_doc1",
      "other_doc2",
      "other_doc3",
    ];

    try {
      const uploadPromises = get_upload_promises(
        fileFields,
        formData,
        dataToSubmit
      );
      await Promise.all(uploadPromises);

      const token = await userState.user.getIdToken();
      userState.setShowLoader(true);

      dataToSubmit.loanId = "PERSONAL_LOAN_ID_FROM_ROUTE_OR_PROPS"; // IMPORTANT: Replace with actual loan ID

      const res = await setLoanByID(token, id, dataToSubmit);

      if (res && res.msg) {
        setIsSuccess(true);
      } else {
        alert("Personal Loan update failed. Please check console for details.");
      }
    } catch (error) {
      console.error("Personal Loan update failed:", error);
      alert(
        `An error occurred during update: ${error.message || "Unknown error"}`
      );
    } finally {
      userState.setShowLoader(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto ">
      <Card className="max-w-full mx-auto my-8 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-start">
            Edit Personal Loan Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateSubmit();
            }}
            className="space-y-8"
          >
            {/* Personal Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Personal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="loan_amount"
                  label="Loan Amount"
                  value={formData?.loan_amount || ""}
                  onChange={handleChange}
                  error={errors?.loan_amount}
                  required
                />
                <FormInput
                  id="id_of_connector"
                  label="ID of Connector"
                  value={formData?.id_of_connector || ""}
                  onChange={handleChange}
                  error={errors?.id_of_connector}
                  required
                />
                <FormInput
                  id="name_of_connector"
                  label="Name of Connector"
                  value={formData?.name_of_connector || ""}
                  onChange={handleChange}
                  error={errors?.name_of_connector}
                  required
                />

                <FormSelect
                  id="purpose_of_loan"
                  label="Purpose of Loan"
                  required
                  value={formData?.purpose_of_loan}
                  onChange={handleChange}
                  error={errors?.purpose_of_loan}
                  placeholder="Purpose of Loan"
                  options={[
                    { value: "To purchase property", label: "To purchase property" },
                    { value: "For marriage at home", label: "For marriage at home" },
                    { value: "For Education", label: "For Education" },
                    { value: "To pay credit card bill", label: "To pay credit card bill" },
                    { value: "To repay other loan", label: "To repay other loan" },
                    { value: "To construct home", label: "To construct home" },
                    { value: "For other Personal reason", label: "For other Personal reason" },
                  ]}
                />

                <FormInput
                  id="applicant_name"
                  label="Applicant Name"
                  value={formData?.applicant_name || ""}
                  onChange={handleChange}
                  error={errors?.applicant_name}
                  required
                />
                <FormInput
                  id="fathers_name"
                  label="Father's Name"
                  value={formData?.fathers_name || ""}
                  onChange={handleChange}
                  error={errors?.fathers_name}
                  required
                />
                <FormInput
                  id="mothers_name"
                  label="Mother's Name"
                  value={formData?.mothers_name || ""}
                  onChange={handleChange}
                  error={errors?.mothers_name}
                  required
                />

                <FormInput
                  id="phone_no"
                  label="Phone Number"
                  value={formData?.phone_no || ""}
                  onChange={handleChange}
                  error={errors?.phone_no}
                  required
                  type="tel"
                />
                <FormInput
                  id="alt_phone_no"
                  label="Alternate Phone Number"
                  value={formData?.alt_phone_no || ""}
                  onChange={handleChange}
                  error={errors?.alt_phone_no}
                  required
                  type="tel"
                />
                {/* <FormInput
                  id="email"
                  label="Email"
                  value={formData?.email || ""}
                  onChange={handleChange}
                  error={errors?.email}
                  required
                  type="email"
                /> */}
                <FormInput
                  id="aadhar"
                  label="Aadhar Number"
                  value={formData?.aadhar || ""}
                  onChange={handleChange}
                  error={errors?.aadhar}
                  required
                />
                <FormInput
                  id="pan"
                  label="PAN"
                  value={formData?.pan || ""}
                  onChange={handleChange}
                  error={errors?.pan}
                  required
                />
                <FormInput
                  id="dob"
                  label="Date of Birth"
                  value={formData?.dob || ""}
                  onChange={handleChange}
                  error={errors?.dob}
                  required
                  type="date"
                />
                <div className="space-y-2">
                  <Label htmlFor="marital_status">
                    Marital Status<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("marital_status", value)
                    }
                    value={formData.marital_status || "Unmarried"}
                  >
                    <SelectTrigger
                      id="marital_status"
                      className={cn(
                        "w-full",
                        errors.marital_status &&
                        "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Marital Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Unmarried">Unmarried</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.marital_status && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.marital_status}
                    </p>
                  )}
                </div>
                {formData.marital_status === "Married" && (
                  <FormInput
                    id="spouse_name"
                    label="Spouse Name"
                    value={formData?.spouse_name || ""}
                    onChange={handleChange}
                    error={errors?.spouse_name}
                    required
                  />
                )}
              </div>
            </div>

            {/* Co-applicant Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Co-Applicant Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="co_applicant_name"
                  label="Co-Applicant Name"
                  value={formData?.co_applicant_name || ""}
                  onChange={handleChange}
                  error={errors?.co_applicant_name}
                  required
                />
                <FormInput
                  id="co_applicant_dob"
                  label="Co-Applicant Date of Birth"
                  value={formData?.co_applicant_dob || ""}
                  onChange={handleChange}
                  error={errors?.co_applicant_dob}
                  required
                />
                <FormSelect
                  id="co_occupation"
                  label="Occupation"
                  required
                  value={formData?.co_occupation}
                  onChange={handleChange}
                  error={errors?.co_occupation}
                  placeholder="Select profession"
                  options={[
                    { value: "Job", label: "Job" },
                    { value: "Business", label: "Business" },
                    { value: "Others", label: "Others" },
                  ]}
                />

                <FormSelect
                  id="relation_with_applicant"
                  label="Relation with Applicant"
                  required
                  value={formData?.relation_with_applicant}
                  onChange={handleChange}
                  error={errors?.relation_with_applicant}
                  placeholder="Select profession"
                  options={[
                    { value: "Mother", label: "Mother" },
                    { value: "Father", label: "Father" },
                    { value: "Spouse", label: "Spouse" },
                    { value: "Brother", label: "Brother" },
                  ]}
                />

              </div>
            </div>

            {/* Permanent Address Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Permanent Address (as on Aadhar)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormInput
                  id="permanent_building_name"
                  label="Building/House Name"
                  value={formData?.permanent_building_name || ""}
                  onChange={handleChange}
                  error={errors?.permanent_building_name}
                  required
                />
                <FormInput
                  id="permanent_street_name"
                  label="Street/Road Name"
                  value={formData?.permanent_street_name || ""}
                  onChange={handleChange}
                  error={errors?.permanent_street_name}
                  required
                />
                <FormInput
                  id="permanent_landmark"
                  label="Landmark"
                  value={formData?.permanent_landmark || ""}
                  onChange={handleChange}
                  error={errors?.permanent_landmark}
                  required
                />
                <FormInput
                  id="permanent_city"
                  label="City"
                  value={formData?.permanent_city || ""}
                  onChange={handleChange}
                  error={errors?.permanent_city}
                  required
                />
                <FormInput
                  id="permanent_district"
                  label="District"
                  value={formData?.permanent_district || ""}
                  onChange={handleChange}
                  error={errors?.permanent_district}
                  required
                />
                <FormInput
                  id="permanent_state"
                  label="State"
                  value={formData?.permanent_state || ""}
                  onChange={handleChange}
                  error={errors?.permanent_state}
                  required
                />
                <FormInput
                  id="permanent_pincode"
                  label="Pincode"
                  value={formData?.permanent_pincode || ""}
                  onChange={handleChange}
                  error={errors?.permanent_pincode}
                  required
                />

                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="same_as_permanent_address"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="same_as_permanent_address"
                      checked={formData.same_as_permanent_address}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "same_as_permanent_address",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Same as Permanent Address</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Present Address Section (Conditional) */}
            {!formData.same_as_permanent_address && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-medium tracking-tight mb-4">
                  Present Address (Current Staying Address)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    id="present_building_name"
                    label="Building/House Name"
                    value={formData?.present_building_name || ""}
                    onChange={handleChange}
                    error={errors?.present_building_name}
                    required
                  />
                  <FormInput
                    id="present_street_name"
                    label="Street/Road Name"
                    value={formData?.present_street_name || ""}
                    onChange={handleChange}
                    error={errors?.present_street_name}
                    required
                  />
                  <FormInput
                    id="present_landmark"
                    label="Landmark"
                    value={formData?.present_landmark || ""}
                    onChange={handleChange}
                    error={errors?.present_landmark}
                    required
                  />
                  <FormInput
                    id="present_city"
                    label="City"
                    value={formData?.present_city || ""}
                    onChange={handleChange}
                    error={errors?.present_city}
                    required
                  />
                  <FormInput
                    id="present_district"
                    label="District"
                    value={formData?.present_district || ""}
                    onChange={handleChange}
                    error={errors?.present_district}
                    required
                  />
                  <FormInput
                    id="present_state"
                    label="State"
                    value={formData?.present_state || ""}
                    onChange={handleChange}
                    error={errors?.present_state}
                    required
                  />
                  <FormInput
                    id="present_pincode"
                    label="Pincode"
                    value={formData?.present_pincode || ""}
                    onChange={handleChange}
                    error={errors?.present_pincode}
                    required
                  />
                </div>
              </div>
            )}

            {/* Employment Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Employment Details (Job Specific)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="current_company_name"
                  label="Current Company Name"
                  // required={true}
                  value={formData.current_company_name}
                  onChange={handleChange}
                  error={errors.current_company_name}
                />
                <FormInput
                  id="designation"
                  label="Your designation"
                  // required={false}
                  value={formData.designation}
                  onChange={handleChange}
                  error={errors.designation}
                />
                <FormInput
                  id="salary_account_bank"
                  label="Salary Account Bank Name"
                  required={true}
                  value={formData.salary_account_bank}
                  onChange={handleChange}
                  error={errors.salary_account_bank}
                />
                <FormInput
                  id="savings_account_bank"
                  label="Savings Account Bank Name"
                  required={true}
                  value={formData.savings_account_bank}
                  onChange={handleChange}
                  error={errors.savings_account_bank}
                  placeholder={"eg. SBI, Patna"}
                />
                <FormSelect
                  id="job_tenure"
                  label="Job tenure in current company"
                  required
                  value={formData.job_tenure}
                  onChange={handleChange}
                  error={errors.job_tenure}
                  options={[
                    { label: "0-12 months", value: "0-12 months" },
                    { label: "12-24 months", value: "12-24 months" },
                    { label: "24-60 months", value: "24-60 months" },
                    { label: "more than 60 months", value: "more than 60 months" },
                  ]}
                />
                <FormSelect
                  id="job_experience"
                  label="Experience"
                  required
                  value={formData?.job_experience}
                  onChange={handleChange}
                  error={errors?.job_experience}
                  placeholder="Select experience"
                  options={[
                    { label: "less than 1 year", value: "less than 1 year" },
                    { label: "1-2 years", value: "1-2 years" },
                    { label: "2-3 years", value: "2-3 years" },
                    { label: "3-5 years", value: "3-5 years" },
                    { label: "more than 5 years", value: "more than 5 years" },
                  ]}
                />

                <FormSelect
                  id="monthly_income"
                  label="Your Monthly Income"
                  required
                  value={formData.monthly_income}
                  onChange={handleChange}
                  error={errors.monthly_income}
                  placeholder="Select income"
                  options={[
                    { label: "less than 12,000", value: "less than 12,000" },
                    { label: "15,000 - 20,000", value: "15,000 - 20,000" },
                    { label: "20,000 - 25,000", value: "20,000 - 25,000" },
                    { label: "25,000 - 30,000", value: "25-000 - 30,000" },
                    { label: "30,000 - 35,000", value: "30,000 - 35,000" },
                    { label: "35,000 - 45,000", value: "35,000 - 45,000" },
                    { label: "above 45,000", value: "above 45,000" },
                  ]}
                />

                <FormInput
                  id="office_building_name"
                  label="Building/House Name"
                  required
                  value={formData?.office_building_name}
                  onChange={handleChange}
                  error={errors?.office_building_name}
                />
                <FormInput
                  id="office_street_name"
                  label="Street/Road Name"
                  required
                  value={formData?.office_street_name}
                  onChange={handleChange}
                  error={errors?.office_street_name}
                />
                <FormInput
                  id="office_landmark"
                  label="Landmark"
                  value={formData?.office_landmark}
                  onChange={handleChange}
                  error={errors?.office_landmark}
                />
                <FormInput
                  id="office_city"
                  label="City"
                  required
                  value={formData?.office_city}
                  onChange={handleChange}
                  error={errors?.office_city}
                />
                <FormInput
                  id="office_district"
                  label="District"
                  required
                  value={formData?.office_district}
                  onChange={handleChange}
                  error={errors?.office_district}
                />
                <FormInput
                  id="office_state"
                  label="State"
                  required
                  value={formData?.office_state}
                  onChange={handleChange}
                  error={errors?.office_state}
                />
                <FormInput
                  id="office_pincode"
                  label="Pincode"
                  required
                  value={formData?.office_pincode}
                  onChange={handleChange}
                  error={errors?.office_pincode}
                />

              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-8 pb-6">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FormFileUpload
                  id="applicant_selfie"
                  label="Upload Applicant Selfie"
                  required
                  value={formData?.applicant_selfie}
                  onChange={handleFileChange}
                  error={errors?.applicant_selfie}
                />
                <FormFileUpload
                  id="aadhar_front"
                  label="Aadhar Front"
                  required
                  value={formData?.aadhar_front}
                  onChange={handleFileChange}
                  error={errors?.aadhar_front}
                />

                <FormFileUpload
                  id="aadhar_back"
                  label="Aadhar Back"
                  required
                  value={formData?.aadhar_back}
                  onChange={handleFileChange}
                  error={errors?.aadhar_back}
                />

                <FormFileUpload
                  id="Personal_pan"
                  label="Personal PAN"
                  required
                  value={formData?.Personal_pan}
                  onChange={handleFileChange}
                  error={errors?.Personal_pan}
                />

                {/* co applicant docs */}
                <FormFileUpload
                  id="coapplicant_aadhar_front"
                  label="Co-Applicant Aadhar Front"
                  required
                  value={formData?.coapplicant_aadhar_front}
                  onChange={handleFileChange}
                  error={errors?.coapplicant_aadhar_front}
                />
                <FormFileUpload
                  id="coapplicant_aadhar_back"
                  label="Co-Applicant Aadhar Back"
                  required
                  value={formData?.coapplicant_aadhar_back}
                  onChange={handleFileChange}
                  error={errors?.coapplicant_aadhar_back}
                />
                <FormFileUpload
                  id="coapplicant_pan"
                  label="Co-Applicant PAN"
                  required
                  value={formData?.coapplicant_pan}
                  onChange={handleFileChange}
                  error={errors?.coapplicant_pan}
                />

                <FormFileUpload
                  id="salary_slip_1"
                  label="Salary slip-1"
                  required
                  value={formData?.salary_slip_1}
                  onChange={handleFileChange}
                  error={errors?.salary_slip_1}
                />
                <FormFileUpload
                  id="salary_slip_2"
                  label="Salary slip-2"
                  required
                  value={formData?.salary_slip_2}
                  onChange={handleFileChange}
                  error={errors?.salary_slip_2}
                />
                <FormFileUpload
                  id="salary_slip_3"
                  label="Salary slip-3"
                  required
                  value={formData.salary_slip_3}
                  onChange={handleFileChange}
                  error={errors.salary_slip_3}
                />
                <FormFileUpload
                  id="offer_letter"
                  label="Upload your offer letter"
                  required
                  value={formData?.offer_letter}
                  onChange={handleFileChange}
                  error={errors?.offer_letter}
                />
                <FormFileUpload
                  id="other_doc1"
                  label=" other documents-1"
                  required
                  value={formData.other_doc1}
                  onChange={handleFileChange}
                  error={errors.other_doc1}
                />
                <FormFileUpload
                  id="other_doc2"
                  label="Other documents-2"
                  required
                  value={formData.other_doc2}
                  onChange={handleFileChange}
                  error={errors.other_doc2}
                />
                <FormFileUpload
                  id="other_doc3"
                  label="Other documents-3"
                  required
                  value={formData.other_doc3}
                  onChange={handleFileChange}
                  error={errors.other_doc3}
                />

              </div>
            </div>

            <div className="flex w-full items-center justify-end ">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-md font-semibold transition-colors duration-200"
              >
                {isSubmitting
                  ? "Updating..."
                  : "Update Personal Loan Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {isSubmitting && (
        <LoadingModal
          open={isSubmitting}
        />
      )}

      <UserSuccessModal
        onOpenChange={handleCloseSuccessModel}
        open={isSuccess}
        message="Updated Successfully!"
        redirectTo={"/dashboard/view/loans"}
        buttonText={"View Loans"}
      />
    </div>
  );
};

export default PersonalLoan;
