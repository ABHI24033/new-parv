"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, get_upload_promises } from "@/lib/utils"; // Assuming cn utility is available
import { validateAllFields } from "@/app/dashboard/forms/business_loan/formValidation";
import { useUserState } from "@/app/dashboard/store";
import { setLoanByID } from "@/lib/actions/loan";

const BusinessLoan = ({ id, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userState = useUserState(); // Use global user state for loader

  // Generic handler for all standard input types (text, date, number, email, tel)
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev };
      if (type === "checkbox") {
        updatedData[id] = checked;
        // Logic for 'same_as_permanent_address' checkbox
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
          // Clear present address fields if checkbox is unchecked
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

    // Clear error for the current field as user types/interacts
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handler for Shadcn Select components
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

  // Handler for RadioGroup components
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

  // Handler for Checkbox (multi-option, e.g., registration_paper, needs_of_documents)
  const handleMultiOptionChange = (id, optionValue, isChecked) => {
    setFormData((prev) => {
      const currentValues = prev[id] || [];
      let newValues;
      if (isChecked) {
        newValues = [...currentValues, optionValue];
      } else {
        newValues = currentValues.filter((val) => val !== optionValue);
      }
      return {
        ...prev,
        [id]: newValues,
      };
    });

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handler for file inputs, storing the File object
  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files[0], // Store the File object
    }));

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    const allFormErrors = validateAllFields(formData); // Use your comprehensive loanApplicationSchema

    if (Object.keys(allFormErrors).length > 0) {
      setErrors(allFormErrors);
      setIsSubmitting(false);
      const firstErrorField = Object.keys(allFormErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      alert("Please fix the errors in the form before updating.");
      return;
    }

    setErrors({}); // Clear all errors if validation passes

    const dataToSubmit = { ...formData }; // Create a mutable copy

    // List all file fields present in your formData structure
    const fileFields = [
      "itr_1_upload",
      "itr_2_upload",
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "company_image",
      "gst_certificate",
      "udyam_registration",
      "form_3",
      "itr_2023_2024",
      "itr_2024_2025",
      "bank_statement",
      "shop_front",
      "house_electricity",
      "other_doc",
    ];

    try {
      // This will only upload new File objects and retain existing URLs for files not changed
      const uploadPromises = get_upload_promises(
        fileFields,
        formData,
        dataToSubmit
      );
      await Promise.all(uploadPromises);

      console.log(
        "Final form data with uploaded URLs for update:",
        dataToSubmit
      );

      const token = await userState.user.getIdToken(); // Get auth token
      userState.setShowLoader(true); // Show global loader

      // In a real application, you would pass the ID of the loan being updated
      dataToSubmit.loanId = "LOAN_ID_FROM_ROUTE_OR_PROPS"; // IMPORTANT: Replace with actual loan ID

      const res = await setLoanByID(token, id, dataToSubmit); // Call your update API

      if (res && res.msg) {
        alert(`Update successful: ${res.msg}`);
        // Optionally, refetch data or navigate away
      } else {
        alert("Loan update failed. Please check console for details.");
      }
    } catch (error) {
      console.error("Loan update failed:", error);
      alert(
        `An error occurred during update: ${error.message || "Unknown error"}`
      );
    } finally {
      userState.setShowLoader(false); // Hide global loader
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-16">
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
            <div className="space-y-2">
              <Label htmlFor="loan_amount">
                Loan Amount<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="loan_amount"
                value={formData.loan_amount || ""}
                onChange={handleChange}
                className={cn(
                  errors.loan_amount &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.loan_amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.loan_amount}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="id_of_connector">
                ID of Connector<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="id_of_connector"
                value={formData.id_of_connector || ""}
                onChange={handleChange}
                className={cn(
                  errors.id_of_connector &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.id_of_connector && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.id_of_connector}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_of_connector">
                Name of Connector<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name_of_connector"
                value={formData.name_of_connector || ""}
                onChange={handleChange}
                className={cn(
                  errors.name_of_connector &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.name_of_connector && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name_of_connector}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose_of_loan">
                Purpose of Loan<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="purpose_of_loan"
                value={formData.purpose_of_loan || ""}
                onChange={handleChange}
                className={cn(
                  errors.purpose_of_loan &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.purpose_of_loan && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purpose_of_loan}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicant_name">
                Applicant Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="applicant_name"
                value={formData.applicant_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.applicant_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.applicant_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.applicant_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fathers_name">
                Father's Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="fathers_name"
                value={formData.fathers_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.fathers_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.fathers_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fathers_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mothers_name">
                Mother's Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="mothers_name"
                value={formData.mothers_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.mothers_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.mothers_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mothers_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone_no">
                Phone Number<span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                id="phone_no"
                value={formData.phone_no || ""}
                onChange={handleChange}
                className={cn(
                  errors.phone_no && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.phone_no && (
                <p className="text-red-500 text-xs mt-1">{errors.phone_no}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt_phone_no">Alternate Phone Number</Label>
              <Input
                type="tel"
                id="alt_phone_no"
                value={formData.alt_phone_no || ""}
                onChange={handleChange}
                className={cn(
                  errors.alt_phone_no &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.alt_phone_no && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.alt_phone_no}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">
                PAN<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="pan"
                value={formData.pan || ""}
                onChange={handleChange}
                className={cn(
                  errors.pan && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.pan && (
                <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">
                Date of Birth<span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                id="dob"
                value={formData.dob || ""}
                onChange={handleChange}
                className={cn(
                  errors.dob && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>
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
              <div className="space-y-2">
                <Label htmlFor="spouse_name">Spouse Name</Label>
                <Input
                  type="text"
                  id="spouse_name"
                  value={formData.spouse_name || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.spouse_name &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.spouse_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.spouse_name}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Permanent Address Section */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Permanent Address (as on Aadhar)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="permanent_building_name">
                Building/House Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_building_name"
                value={formData.permanent_building_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_building_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_building_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_building_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_street_name">
                Street/Road Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_street_name"
                value={formData.permanent_street_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_street_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_street_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_street_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_landmark">Landmark</Label>
              <Input
                type="text"
                id="permanent_landmark"
                value={formData.permanent_landmark || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_city">
                City<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_city"
                value={formData.permanent_city || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_city &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_city}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_district">
                District<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_district"
                value={formData.permanent_district || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_district &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_district && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_district}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_state">
                State<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_state"
                value={formData.permanent_state || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_state &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_state && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_state}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="permanent_pincode">
                Pincode<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="permanent_pincode"
                value={formData.permanent_pincode || ""}
                onChange={handleChange}
                className={cn(
                  errors.permanent_pincode &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.permanent_pincode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permanent_pincode}
                </p>
              )}
            </div>

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
              <div className="space-y-2">
                <Label htmlFor="present_building_name">
                  Building/House Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_building_name"
                  value={formData.present_building_name || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_building_name &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_building_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_building_name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_street_name">
                  Street/Road Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_street_name"
                  value={formData.present_street_name || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_street_name &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_street_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_street_name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_landmark">Landmark</Label>
                <Input
                  type="text"
                  id="present_landmark"
                  value={formData.present_landmark || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_city">
                  City<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_city"
                  value={formData.present_city || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_city &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_city && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_city}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_district">
                  District<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_district"
                  value={formData.present_district || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_district &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_district && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_district}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_state">
                  State<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_state"
                  value={formData.present_state || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_state &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_state && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_state}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="present_pincode">
                  Pincode<span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="present_pincode"
                  value={formData.present_pincode || ""}
                  onChange={handleChange}
                  className={cn(
                    errors.present_pincode &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                {errors.present_pincode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.present_pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Employment & Loans Section */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h3 className="text-xl font-medium tracking-tight mb-4">
            Employment & Loans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">
                Company / firm Name<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="company_name"
                value={formData.company_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.company_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.company_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_age">
                How old your business?<span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("company_age", value)
                }
                value={formData.company_age || ""}
              >
                <SelectTrigger
                  id="company_age"
                  className={cn(
                    "w-full",
                    errors.company_age &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1 years">0-1 years</SelectItem>
                  <SelectItem value="1-3 years">1-3 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="more than 5 years">
                    More than 5 years
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.company_age && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company_age}
                </p>
              )}
            </div>
            <div className="space-y-2 col-span-full">
              <Label>
                Select registration paper you have for your business?
                <span className="text-red-500">*</span>
              </Label>
              <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-2",
                  errors.registration_paper &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                {[
                  "GST registration",
                  "UDYOG AAdhar registration",
                  "Form-3 or trade licence",
                  "any other",
                  "I don't have any registartion",
                ].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`registration_paper_${index}`}
                      checked={formData.registration_paper.includes(option)}
                      onCheckedChange={(checked) =>
                        handleMultiOptionChange(
                          "registration_paper",
                          option,
                          checked
                        )
                      }
                    />
                    <Label htmlFor={`registration_paper_${index}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.registration_paper && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.registration_paper}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-full">
              <Label>
                Do you have current account?
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange("have_current_account", value)
                }
                value={formData.have_current_account || "No"}
                className={cn(
                  "flex items-center space-x-4",
                  errors.have_current_account &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="have_current_account_yes" />
                  <Label htmlFor="have_current_account_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="have_current_account_no" />
                  <Label htmlFor="have_current_account_no">No</Label>
                </div>
              </RadioGroup>
              {errors.have_current_account && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.have_current_account}
                </p>
              )}
            </div>

            {formData.have_current_account === "Yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="current_account_bank_name">
                    Bank name in which your current account.
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="current_account_bank_name"
                    value={formData.current_account_bank_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.current_account_bank_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.current_account_bank_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.current_account_bank_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name_in_current_account">
                    In whose name is the current account?
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("name_in_current_account", value)
                    }
                    value={formData.name_in_current_account || ""}
                  >
                    <SelectTrigger
                      id="name_in_current_account"
                      className={cn(
                        "w-full",
                        errors.name_in_current_account &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="My business">My business</SelectItem>
                      <SelectItem value="Myself">Myself</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.name_in_current_account && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name_in_current_account}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_account_age">
                    How old is your current account?
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("current_account_age", value)
                    }
                    value={formData.current_account_age || ""}
                  >
                    <SelectTrigger
                      id="current_account_age"
                      className={cn(
                        "w-full",
                        errors.current_account_age &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Less than 1 year">
                        Less than 1 year
                      </SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="more than years">
                        More than 5 years
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.current_account_age && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.current_account_age}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_account_turnover">
                    What is the turnover of your current account?
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("current_account_turnover", value)
                    }
                    value={formData.current_account_turnover || ""}
                  >
                    <SelectTrigger
                      id="current_account_turnover"
                      className={cn(
                        "w-full",
                        errors.current_account_turnover &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Turnover" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Below 10 lakhs">
                        Below 10 lakhs
                      </SelectItem>
                      <SelectItem value="10-20 lakhs">10-20 lakhs</SelectItem>
                      <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                      <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                      <SelectItem value="50-70 lakhs">50-70 lakhs</SelectItem>
                      <SelectItem value="70-1 crore">70-1 crore</SelectItem>
                      <SelectItem value="above 1 crore">
                        Above 1 crore
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.current_account_turnover && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.current_account_turnover}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="saving_account_bank_name">
                Bank name in which your saving account.
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="saving_account_bank_name"
                value={formData.saving_account_bank_name || ""}
                onChange={handleChange}
                className={cn(
                  errors.saving_account_bank_name &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.saving_account_bank_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.saving_account_bank_name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="saving_account_turnover">
                Turnover of your saving account
                <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("saving_account_turnover", value)
                }
                value={formData.saving_account_turnover || ""}
              >
                <SelectTrigger
                  id="saving_account_turnover"
                  className={cn(
                    "w-full",
                    errors.saving_account_turnover &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                >
                  <SelectValue placeholder="Select Turnover" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Less than 10 lakhs">
                    Less than 10 lakhs
                  </SelectItem>
                  <SelectItem value="10-20 lakhs">10-20 lakhs</SelectItem>
                  <SelectItem value="20-50 lakhs">20-50 lakhs</SelectItem>
                  <SelectItem value="50-1 crore">50-1 crore</SelectItem>
                  <SelectItem value="above 1 crore">Above 1 crore</SelectItem>
                </SelectContent>
              </Select>
              {errors.saving_account_turnover && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.saving_account_turnover}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan_provider_bank">
                Bank name which provides you loan?
                <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="loan_provider_bank"
                value={formData.loan_provider_bank || ""}
                onChange={handleChange}
                className={cn(
                  errors.loan_provider_bank &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.loan_provider_bank && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.loan_provider_bank}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="total_loan_amount">
                Total loan amount<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="total_loan_amount"
                value={formData.total_loan_amount || ""}
                onChange={handleChange}
                className={cn(
                  errors.total_loan_amount &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.total_loan_amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.total_loan_amount}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="current_emi">
                Current EMI<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="current_emi"
                value={formData.current_emi || ""}
                onChange={handleChange}
                className={cn(
                  errors.current_emi &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.current_emi && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.current_emi}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="remaining_amount">
                Remaining amount<span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="remaining_amount"
                value={formData.remaining_amount || ""}
                onChange={handleChange}
                className={cn(
                  errors.remaining_amount &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.remaining_amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.remaining_amount}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-full">
              <Label>
                Do you file income tax?<span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange("file_income_tax", value)
                }
                value={formData.file_income_tax || "No"}
                className={cn(
                  "flex items-center space-x-4",
                  errors.file_income_tax &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="file_income_tax_yes" />
                  <Label htmlFor="file_income_tax_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="file_income_tax_no" />
                  <Label htmlFor="file_income_tax_no">No</Label>
                </div>
              </RadioGroup>
              {errors.file_income_tax && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.file_income_tax}
                </p>
              )}
            </div>
            {formData.file_income_tax === "Yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="itr_1_upload">ITR-1 Upload</Label>
                  {formData.itr_1_upload &&
                    typeof formData.itr_1_upload === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.itr_1_upload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="itr_1_upload"
                    onChange={handleFileChange}
                    className={cn(
                      errors.itr_1_upload &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.itr_1_upload && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.itr_1_upload}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itr_2_upload">ITR-2 Upload</Label>
                  {formData.itr_2_upload &&
                    typeof formData.itr_2_upload === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.itr_2_upload}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Current
                        </a>
                      </p>
                    )}
                  <Input
                    type="file"
                    id="itr_2_upload"
                    onChange={handleFileChange}
                    className={cn(
                      errors.itr_2_upload &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.itr_2_upload && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.itr_2_upload}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="space-y-2 col-span-full">
              <Label>
                Do your family members file income tax?
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange("is_family_files_income_tax", value)
                }
                value={formData.is_family_files_income_tax || "No"}
                className={cn(
                  "flex items-center space-x-4",
                  errors.is_family_files_income_tax &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Yes"
                    id="is_family_files_income_tax_yes"
                  />
                  <Label htmlFor="is_family_files_income_tax_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="No"
                    id="is_family_files_income_tax_no"
                  />
                  <Label htmlFor="is_family_files_income_tax_no">No</Label>
                </div>
              </RadioGroup>
              {errors.is_family_files_income_tax && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.is_family_files_income_tax}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-full">
              <Label>
                Do you have any property which you can give for mortgage?
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange("have_property_for_mortgage", value)
                }
                value={formData.have_property_for_mortgage || "No"}
                className={cn(
                  "flex items-center space-x-4",
                  errors.have_property_for_mortgage &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Yes"
                    id="have_property_for_mortgage_yes"
                  />
                  <Label htmlFor="have_property_for_mortgage_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="No"
                    id="have_property_for_mortgage_no"
                  />
                  <Label htmlFor="have_property_for_mortgage_no">No</Label>
                </div>
              </RadioGroup>
              {errors.have_property_for_mortgage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.have_property_for_mortgage}
                </p>
              )}
            </div>
            {formData.have_property_for_mortgage === "Yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="property_location">
                    Your property is located in :
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("property_location", value)
                    }
                    value={formData.property_location || ""}
                  >
                    <SelectTrigger
                      id="property_location"
                      className={cn(
                        "w-full",
                        errors.property_location &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gram panchayat">
                        Gram panchayat
                      </SelectItem>
                      <SelectItem value="Nagar panchayat">
                        Nagar panchayat
                      </SelectItem>
                      <SelectItem value="Nagar Parishad">
                        Nagar Parishad
                      </SelectItem>
                      <SelectItem value="Nagar Nigam">Nagar Nigam</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.property_location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.property_location}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="who_own_property">
                    Who is the owner of property?
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("who_own_property", value)
                    }
                    value={formData.who_own_property || ""}
                  >
                    <SelectTrigger
                      id="who_own_property"
                      className={cn(
                        "w-full",
                        errors.who_own_property &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Myself">Myself</SelectItem>
                      <SelectItem value="Father">Father</SelectItem>
                      <SelectItem value="Mother">Mother</SelectItem>
                      <SelectItem value="Spouse">Spouse</SelectItem>
                      <SelectItem value="Grand father">Grand father</SelectItem>
                      <SelectItem value="Grand mother">Grand mother</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.who_own_property && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.who_own_property}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="space-y-2 col-span-full">
              <Label>
                Do you have 17 khata agriculture land?
                <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={(value) =>
                  handleRadioChange("have_17_kahta_agri_land", value)
                }
                value={formData.have_17_kahta_agri_land || "No"}
                className={cn(
                  "flex items-center space-x-4",
                  errors.have_17_kahta_agri_land &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Yes"
                    id="have_17_kahta_agri_land_yes"
                  />
                  <Label htmlFor="have_17_kahta_agri_land_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="have_17_kahta_agri_land_no" />
                  <Label htmlFor="have_17_kahta_agri_land_no">No</Label>
                </div>
              </RadioGroup>
              {errors.have_17_kahta_agri_land && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.have_17_kahta_agri_land}
                </p>
              )}
            </div>
            <div className="space-y-2 col-span-full">
              <Label>
                We need the following documents of property, select which are
                available?<span className="text-red-500">*</span>
              </Label>
              <div
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-2",
                  errors.needs_of_documents &&
                    "border border-red-500 p-2 rounded-md"
                )}
              >
                {[
                  "Khatiyan (In case of inherited property)",
                  "Sale deed (If you have purchase property)",
                  "LPC certificate",
                  "Current rashid of property",
                ].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`needs_of_documents_${index}`}
                      checked={formData.needs_of_documents.includes(option)}
                      onCheckedChange={(checked) =>
                        handleMultiOptionChange(
                          "needs_of_documents",
                          option,
                          checked
                        )
                      }
                    />
                    <Label htmlFor={`needs_of_documents_${index}`}>
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.needs_of_documents && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.needs_of_documents}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8 pb-6">
          <h3 className="text-xl font-medium tracking-tight mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="photo">
                Upload Photo<span className="text-red-500">*</span>
              </Label>

              {formData.photo && typeof formData.photo === "string" && (
                <p className="text-sm text-gray-600">
                  Existing:{" "}
                  <a
                    href={formData.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Current
                  </a>
                </p>
              )}
              <Input
                type="file"
                id="photo"
                onChange={handleFileChange}
                className={cn(
                  errors.photo && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.photo && (
                <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="aadhar_front">
                Aadhar Front<span className="text-red-500">*</span>
              </Label>
              {formData.aadhar_front &&
                typeof formData.aadhar_front === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.aadhar_front}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="aadhar_front"
                onChange={handleFileChange}
                className={cn(
                  errors.aadhar_front &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.aadhar_front && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.aadhar_front}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhar_back">
                Aadhar Back<span className="text-red-500">*</span>
              </Label>
              {formData.aadhar_back &&
                typeof formData.aadhar_back === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.aadhar_back}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="aadhar_back"
                onChange={handleFileChange}
                className={cn(
                  errors.aadhar_back &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.aadhar_back && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.aadhar_back}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="personal_pan_upload">
                Personal PAN Upload<span className="text-red-500">*</span>
              </Label>
              {formData.personal_pan_upload &&
                typeof formData.personal_pan_upload === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.personal_pan_upload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="personal_pan_upload"
                onChange={handleFileChange}
                className={cn(
                  errors.personal_pan_upload &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.personal_pan_upload && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.personal_pan_upload}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_image">Company Image</Label>
              {formData.company_image &&
                typeof formData.company_image === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.company_image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="company_image"
                onChange={handleFileChange}
                className={cn(
                  errors.company_image &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.company_image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company_image}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst_certificate">GST Certificate</Label>
              {formData.gst_certificate &&
                typeof formData.gst_certificate === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.gst_certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="gst_certificate"
                onChange={handleFileChange}
                className={cn(
                  errors.gst_certificate &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.gst_certificate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gst_certificate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="udyam_registration">Udyam Registration</Label>
              {formData.udyam_registration &&
                typeof formData.udyam_registration === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.udyam_registration}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="udyam_registration"
                onChange={handleFileChange}
                className={cn(
                  errors.udyam_registration &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.udyam_registration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.udyam_registration}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="form_3">Form-3</Label>
              {formData.form_3 && typeof formData.form_3 === "string" && (
                <p className="text-sm text-gray-600">
                  Existing:{" "}
                  <a
                    href={formData.form_3}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Current
                  </a>
                </p>
              )}
              <Input
                type="file"
                id="form_3"
                onChange={handleFileChange}
                className={cn(
                  errors.form_3 && "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.form_3 && (
                <p className="text-red-500 text-xs mt-1">{errors.form_3}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="itr_2023_2024">ITR 2023-2024</Label>
              {formData.itr_2023_2024 &&
                typeof formData.itr_2023_2024 === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.itr_2023_2024}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="itr_2023_2024"
                onChange={handleFileChange}
                className={cn(
                  errors.itr_2023_2024 &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.itr_2023_2024 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.itr_2023_2024}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="itr_2024_2025">ITR 2024-2025</Label>
              {formData.itr_2024_2025 &&
                typeof formData.itr_2024_2025 === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.itr_2024_2025}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="itr_2024_2025"
                onChange={handleFileChange}
                className={cn(
                  errors.itr_2024_2025 &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.itr_2024_2025 && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.itr_2024_2025}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank_statement">Bank Statement</Label>
              {formData.bank_statement &&
                typeof formData.bank_statement === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.bank_statement}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="bank_statement"
                onChange={handleFileChange}
                className={cn(
                  errors.bank_statement &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.bank_statement && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bank_statement}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shop_front">Shop Front</Label>
              {formData.shop_front &&
                typeof formData.shop_front === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.shop_front}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="shop_front"
                onChange={handleFileChange}
                className={cn(
                  errors.shop_front &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.shop_front && (
                <p className="text-red-500 text-xs mt-1">{errors.shop_front}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="house_electricity">House Electricity</Label>
              {formData.house_electricity &&
                typeof formData.house_electricity === "string" && (
                  <p className="text-sm text-gray-600">
                    Existing:{" "}
                    <a
                      href={formData.house_electricity}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current
                    </a>
                  </p>
                )}
              <Input
                type="file"
                id="house_electricity"
                onChange={handleFileChange}
                className={cn(
                  errors.house_electricity &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.house_electricity && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.house_electricity}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="other_doc">Other Documents</Label>
              {formData.other_doc && typeof formData.other_doc === "string" && (
                <p className="text-sm text-gray-600">
                  Existing:{" "}
                  <a
                    href={formData.other_doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Current
                  </a>
                </p>
              )}
              <Input
                type="file"
                id="other_doc"
                onChange={handleFileChange}
                className={cn(
                  errors.other_doc &&
                    "border-red-500 focus-visible:ring-red-500"
                )}
              />
              {errors.other_doc && (
                <p className="text-red-500 text-xs mt-1">{errors.other_doc}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Loan Application"}
          </Button>
        </div>
      </form>

      {/* Global Loading Indicator (optional, but good practice) */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-xl">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-lg font-medium text-gray-700">
              Updating your application...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessLoan;
