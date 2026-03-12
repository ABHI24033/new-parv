// components/GoldLoanEditForm.jsx
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, get_upload_promises } from "@/lib/utils";
import { validateAllFields } from "@/app/dashboard/forms/gold_loan/formValidation";
import { setLoanByID } from "@/lib/actions/loan";
import { useUserState } from "@/app/dashboard/store";

const GoldLoan = ({ id, initialData }) => {
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
    const allFormErrors = validateAllFields(formData); // Use Gold Loan specific validation

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

    // List all file fields for Gold Loan
    const fileFields = [
      "aadhar_front",
      "aadhar_back",
      "personal_pan_upload",
      "house_electricity",
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
        "Final form data with uploaded URLs for Gold Loan update:",
        dataToSubmit
      );

      const token = await userState.user.getIdToken(); // Get auth token
      userState.setShowLoader(true); // Show global loader

      // In a real application, you would pass the ID of the loan being updated
      dataToSubmit.loanId = "GOLD_LOAN_ID_FROM_ROUTE_OR_PROPS"; // IMPORTANT: Replace with actual loan ID

      const res = await setLoanByID(token, id, dataToSubmit); // Call your update API

      if (res && res.msg) {
        alert(`Gold Loan Update successful: ${res.msg}`);
        // Optionally, refetch data or navigate away
      } else {
        alert("Gold Loan update failed. Please check console for details.");
      }
    } catch (error) {
      console.error("Gold Loan update failed:", error);
      alert(
        `An error occurred during update: ${error.message || "Unknown error"}`
      );
    } finally {
      userState.setShowLoader(false); // Hide global loader
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto my-8 border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Edit Gold Loan Application
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
                      errors.phone_no &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.phone_no && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone_no}
                    </p>
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

            {/* Employment & Loans (Gold Loan Specific) */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Employment & Loans
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="saving_account_bank_name">
                    Saving Account Bank Name
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
                    Saving Account Turnover
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("saving_account_turnover", value)
                    }
                    value={
                      formData.saving_account_turnover || "Less than 10 lakhs"
                    }
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
                      <SelectItem value="above 1 crore">
                        Above 1 crore
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.saving_account_turnover && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.saving_account_turnover}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_loan_amount">
                    Total Loan Amount<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("total_loan_amount", value)
                    }
                    value={formData.total_loan_amount || "less than 50,000"}
                  >
                    <SelectTrigger
                      id="total_loan_amount"
                      className={cn(
                        "w-full",
                        errors.total_loan_amount &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Loan Amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less than 50,000">
                        Less than 50,000
                      </SelectItem>
                      <SelectItem value="50,000 - 1 lakh">
                        50,000 - 1 Lakh
                      </SelectItem>
                      <SelectItem value="1-3 lakhs">1-3 Lakhs</SelectItem>
                      <SelectItem value="3-5 lakhs">3-5 Lakhs</SelectItem>
                      <SelectItem value="above 5 lakhs">
                        Above 5 Lakhs
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.total_loan_amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.total_loan_amount}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan_start_date">
                    Loan Start Date (Duration Before)
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("loan_start_date", value)
                    }
                    value={formData.loan_start_date || "0-12 months before"}
                  >
                    <SelectTrigger
                      id="loan_start_date"
                      className={cn(
                        "w-full",
                        errors.loan_start_date &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-12 months before">
                        0-12 months before
                      </SelectItem>
                      <SelectItem value="12-24 months before">
                        12-24 months before
                      </SelectItem>
                      <SelectItem value="more than 24 months before">
                        More than 24 months before
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.loan_start_date && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.loan_start_date}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan_provider_bank">
                    Loan Provider Bank<span className="text-red-500">*</span>
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
                  <Label htmlFor="monthly_emi">
                    Monthly EMI<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="monthly_emi"
                    value={formData.monthly_emi || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.monthly_emi &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.monthly_emi && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.monthly_emi}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Section (Gold Loan Specific) */}
            <div className="mb-8 pb-6">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="house_electricity">
                    House Electricity Bill
                    <span className="text-red-500">*</span>
                  </Label>
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
              </div>
            </div>

            <div className="flex w-full items-center justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-md text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                {isSubmitting ? "Updating..." : "Update Gold Loan Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

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

export default GoldLoan;
