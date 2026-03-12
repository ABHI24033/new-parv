// components/VehicleLoanEditForm.jsx
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
import { useUserState } from "@/app/dashboard/store";
import { validateAllFields } from "@/app/dashboard/forms/vehicle_loan/formValidation";
import { setLoanByID } from "@/lib/actions/loan";

const VehicleLoan = () => {
  const [formData, setFormData] = useState(mockInitialVehicleLoanData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleUpdateSubmit = async () => {
    setIsSubmitting(true);
    const allFormErrors = validateAllFields(formData);

    if (Object.keys(allFormErrors).length > 0) {
      const formattedErrors = {};
      allFormErrors.error.errors.forEach((err) => {
        if (err.path && err.path.length > 0) {
          formattedErrors[err.path[0]] = err.message;
        }
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      const firstErrorField = Object.keys(formattedErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      alert("Please fix the errors in the form before updating.");
      return;
    }

    setErrors({});

    const dataToSubmit = { ...formData };

    const fileFields = [
      "offer_letter",
      "bank_statement",
      "applicant_selfie",
      "aadhar_front",
      "aadhar_back",
      "personal_pan",
      "address_prooof",
      "coapplicant_aadhar_front",
      "coapplicant_aadhar_back",
      "coapplicant_pan",
      "salary_slip_1",
      "salary_slip_2",
      "salary_slip_3",
      "form_16_itr_1",
      "form_16_itr_2",
      "electricity_bill",
      "business_images",
      "business_proof",
      "itr_1",
      "itr_2",
      "another_1",
      "another_2",
      "another_3",
      "sale_deed",
      "mutation",
      "rashid",
      "lpc",
      "property_pic",
      "property_map",
      "chain_deed",
    ];

    try {
      const uploadPromises = get_upload_promises(
        fileFields,
        formData,
        dataToSubmit
      );
      await Promise.all(uploadPromises);

      console.log(
        "Final form data with uploaded URLs for Vehicle Loan update:",
        dataToSubmit
      );

      const token = await userState.user.getIdToken();
      userState.setShowLoader(true);

      dataToSubmit.loanId = "VEHICLE_LOAN_ID_FROM_ROUTE_OR_PROPS"; // IMPORTANT: Replace with actual loan ID

      const res = await setLoanByID(token, id, dataToSubmit);

      if (res && res.msg) {
        alert(`Vehicle Loan Update successful: ${res.msg}`);
      } else {
        alert("Vehicle Loan update failed. Please check console for details.");
      }
    } catch (error) {
      console.error("Vehicle Loan update failed:", error);
      alert(
        `An error occurred during update: ${error.message || "Unknown error"}`
      );
    } finally {
      userState.setShowLoader(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto my-8 border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Edit Vehicle Loan Application
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
            {/* Vehicle Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Vehicle Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="which_vehicle">
                    Which Vehicle<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("which_vehicle", value)
                    }
                    value={formData.which_vehicle || ""}
                  >
                    <SelectTrigger
                      id="which_vehicle"
                      className={cn(
                        "w-full",
                        errors.which_vehicle &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Two wheeler loan">
                        Two wheeler loan
                      </SelectItem>
                      <SelectItem value="New car loan">New car loan</SelectItem>
                      <SelectItem value="Light commercial vehicle loan">
                        Light commercial vehicle loan
                      </SelectItem>
                      <SelectItem value="Heavy commercial vehicle loan">
                        Heavy commercial vehicle loan
                      </SelectItem>
                      <SelectItem value="Tractor Loan">Tractor Loan</SelectItem>
                      <SelectItem value="Old vehicle purchase">
                        Old vehicle purchase
                      </SelectItem>
                      <SelectItem value="Vehicle Refinance">
                        Vehicle Refinance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.which_vehicle && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.which_vehicle}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="when_purchase">
                    When to Purchase Vehicle
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("when_purchase", value)
                    }
                    value={formData.when_purchase || ""}
                  >
                    <SelectTrigger
                      id="when_purchase"
                      className={cn(
                        "w-full",
                        errors.when_purchase &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="within 7 days">
                        Within 7 days
                      </SelectItem>
                      <SelectItem value="10-15 days">10-15 days</SelectItem>
                      <SelectItem value="15-30 days">15-30 days</SelectItem>
                      <SelectItem value="30-90 days">30-90 days</SelectItem>
                      <SelectItem value="later">Later</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.when_purchase && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.when_purchase}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_cost">
                    Estimated Cost<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("estimated_cost", value)
                    }
                    value={formData.estimated_cost || ""}
                  >
                    <SelectTrigger
                      id="estimated_cost"
                      className={cn(
                        "w-full",
                        errors.estimated_cost &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Estimated Cost" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10 lakhs">5-10 lakhs</SelectItem>
                      <SelectItem value="10-15 lakhs">10-15 lakhs</SelectItem>
                      <SelectItem value="15-20 lakhs">15-20 lakhs</SelectItem>
                      <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                      <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                      <SelectItem value="more than 50 lakhs">
                        More than 50 lakhs
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estimated_cost && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.estimated_cost}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan_you_need">
                    Loan You Need<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("loan_you_need", value)
                    }
                    value={formData.loan_you_need || ""}
                  >
                    <SelectTrigger
                      id="loan_you_need"
                      className={cn(
                        "w-full",
                        errors.loan_you_need &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Loan Amount Needed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-5 lakhs">3-5 lakhs</SelectItem>
                      <SelectItem value="5-10 lakhs">5-10 lakhs</SelectItem>
                      <SelectItem value="10-12 lakhs">10-12 lakhs</SelectItem>
                      <SelectItem value="12-20 lakhs">12-20 lakhs</SelectItem>
                      <SelectItem value="20-30 lakhs">20-30 lakhs</SelectItem>
                      <SelectItem value="30-50 lakhs">30-50 lakhs</SelectItem>
                      <SelectItem value="more than 50 lakhs">
                        More than 50 lakhs
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.loan_you_need && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.loan_you_need}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">
                    Profession<span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("profession", value)
                    }
                    value={formData.profession || ""}
                  >
                    <SelectTrigger
                      id="profession"
                      className={cn(
                        "w-full",
                        errors.profession &&
                          "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Profession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Job">Job</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.profession && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.profession}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Co-applicant Details Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Co-Applicant Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="co_applicant_name">
                    Co-Applicant Name<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="co_applicant_name"
                    value={formData.co_applicant_name || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_applicant_name &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_applicant_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_applicant_name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co_applicant_dob">
                    Co-Applicant Date of Birth
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="co_applicant_dob"
                    value={formData.co_applicant_dob || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_applicant_dob &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_applicant_dob && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_applicant_dob}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co_occupation">
                    Co-Applicant Occupation
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="co_occupation"
                    value={formData.co_occupation || ""}
                    onChange={handleChange}
                    className={cn(
                      errors.co_occupation &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.co_occupation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.co_occupation}
                    </p>
                  )}
                </div>
              </div>
            </div>

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
                    <Label htmlFor="spouse_name">
                      Spouse Name<span className="text-red-500">*</span>
                    </Label>
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
                {/* Profession Specific Fields */}
                {formData.profession === "Job" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="current_company_name">
                        Current Company Name
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="current_company_name"
                        value={formData.current_company_name || ""}
                        onChange={handleChange}
                        className={cn(
                          errors.current_company_name &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.current_company_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.current_company_name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary_account_bank">
                        Salary Account Bank
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="salary_account_bank"
                        value={formData.salary_account_bank || ""}
                        onChange={handleChange}
                        className={cn(
                          errors.salary_account_bank &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.salary_account_bank && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.salary_account_bank}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="savings_account_bank">
                        Savings Account Bank
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="savings_account_bank"
                        value={formData.savings_account_bank || ""}
                        onChange={handleChange}
                        className={cn(
                          errors.savings_account_bank &&
                            "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                      {errors.savings_account_bank && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.savings_account_bank}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job_tenure">
                        Job Tenure<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("job_tenure", value)
                        }
                        value={formData.job_tenure || "0-12 months"}
                      >
                        <SelectTrigger
                          id="job_tenure"
                          className={cn(
                            "w-full",
                            errors.job_tenure &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Job Tenure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-12 months">
                            0-12 months
                          </SelectItem>
                          <SelectItem value="12-24 months">
                            12-24 months
                          </SelectItem>
                          <SelectItem value="24-60 months">
                            24-60 months
                          </SelectItem>
                          <SelectItem value="more than 60 months">
                            More than 60 months
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.job_tenure && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.job_tenure}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job_experience">
                        Job Experience<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("job_experience", value)
                        }
                        value={formData.job_experience || "less than 1 year"}
                      >
                        <SelectTrigger
                          id="job_experience"
                          className={cn(
                            "w-full",
                            errors.job_experience &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Job Experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less than 1 year">
                            Less than 1 year
                          </SelectItem>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="2-3 years">2-3 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="more than 5 years">
                            More than 5 years
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.job_experience && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.job_experience}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly_income">
                        Monthly Income<span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("monthly_income", value)
                        }
                        value={formData.monthly_income || "less than 12,000"}
                      >
                        <SelectTrigger
                          id="monthly_income"
                          className={cn(
                            "w-full",
                            errors.monthly_income &&
                              "border-red-500 focus-visible:ring-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select Monthly Income" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less than 12,000">
                            Less than 12,000
                          </SelectItem>
                          <SelectItem value="15,000 - 20,000">
                            15,000 - 20,000
                          </SelectItem>
                          <SelectItem value="20,000 - 25,000">
                            20,000 - 25,000
                          </SelectItem>
                          <SelectItem value="25-000 - 30,000">
                            25,000 - 30,000
                          </SelectItem>
                          <SelectItem value="30,000 - 35,000">
                            30,000 - 35,000
                          </SelectItem>
                          <SelectItem value="35,000 - 45,000">
                            35,000 - 45,000
                          </SelectItem>
                          <SelectItem value="above 45,000">
                            Above 45,000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.monthly_income && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.monthly_income}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {formData.profession === "Business" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company_name">
                        Company Name<span className="text-red-500">*</span>
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
                        Company Age<span className="text-red-500">*</span>
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
                        Registration Paper (Select all that apply)
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
                          "UDYAM AAdhar registration",
                          "Form-3 or trade licence",
                          "any other",
                          "I don't have any registartion",
                        ].map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`registration_paper_${index}`}
                              checked={formData.registration_paper.includes(
                                option
                              )}
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
                  </>
                )}

                {/* Current Account's */}
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
                      <RadioGroupItem
                        value="Yes"
                        id="have_current_account_yes"
                      />
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
                          <SelectItem value="My business">
                            My business
                          </SelectItem>
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
                          <SelectItem value="10-20 lakhs">
                            10-20 lakhs
                          </SelectItem>
                          <SelectItem value="20-30 lakhs">
                            20-30 lakhs
                          </SelectItem>
                          <SelectItem value="30-50 lakhs">
                            30-50 lakhs
                          </SelectItem>
                          <SelectItem value="50-70 lakhs">
                            50-70 lakhs
                          </SelectItem>
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

                {/* Saving Account */}
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

                {/* Previous Loan History */}
                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="has_current_loan"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="has_current_loan"
                      checked={formData.has_current_loan}
                      onCheckedChange={(checked) =>
                        handleChange({
                          target: {
                            id: "has_current_loan",
                            checked,
                            type: "checkbox",
                          },
                        })
                      }
                    />
                    <span>Do you have any current loan?</span>
                  </Label>
                </div>
                {formData.has_current_loan && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="loan_provider_bank">
                        Previous Loan Provider Bank
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
                      <Label htmlFor="total_loan_amount_prev">
                        Previous Total Loan Amount
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleSelectChange("total_loan_amount_prev", value)
                        }
                        value={
                          formData.total_loan_amount_prev || "less than 50,000"
                        }
                      >
                        <SelectTrigger
                          id="total_loan_amount_prev"
                          className={cn(
                            "w-full",
                            errors.total_loan_amount_prev &&
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
                      {errors.total_loan_amount_prev && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.total_loan_amount_prev}
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
                        Remaining Amount<span className="text-red-500">*</span>
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
                  </>
                )}
              </div>
            </div>

            {/* Property Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Property Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="have_property_for_mortage"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="have_property_for_mortage"
                      checked={formData.have_property_for_mortage === "Yes"}
                      onCheckedChange={(checked) =>
                        handleRadioChange(
                          "have_property_for_mortage",
                          checked ? "Yes" : "No"
                        )
                      }
                    />
                    <span>
                      Do you have any property which you can give for mortgage?
                    </span>
                  </Label>
                  {errors.have_property_for_mortage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.have_property_for_mortage}
                    </p>
                  )}
                </div>
                {formData.have_property_for_mortage === "Yes" && (
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
                          <SelectItem value="Nagar Nigam">
                            Nagar Nigam
                          </SelectItem>
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
                          <SelectItem value="Grand father">
                            Grand father
                          </SelectItem>
                          <SelectItem value="Grand mother">
                            Grand mother
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.who_own_property && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.who_own_property}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 col-span-full">
                      <Label>
                        We need the following documents of property, select
                        which are available?
                        <span className="text-red-500">*</span>
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
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`needs_of_documents_${index}`}
                              checked={formData.needs_of_documents.includes(
                                option
                              )}
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
                  </>
                )}
                <div className="space-y-2 col-span-full">
                  <Label
                    htmlFor="have_17_kahta_agri_land"
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="have_17_kahta_agri_land"
                      checked={formData.have_17_kahta_agri_land === "Yes"}
                      onCheckedChange={(checked) =>
                        handleRadioChange(
                          "have_17_kahta_agri_land",
                          checked ? "Yes" : "No"
                        )
                      }
                    />
                    <span>Do you have 17 khata agriculture land?</span>
                  </Label>
                  {errors.have_17_kahta_agri_land && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.have_17_kahta_agri_land}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-8 pb-6">
              <h3 className="text-xl font-medium tracking-tight mb-4">
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="applicant_selfie">
                    Upload Applicant Selfie
                    <span className="text-red-500">*</span>
                  </Label>
                  {formData.applicant_selfie &&
                    typeof formData.applicant_selfie === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.applicant_selfie}
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
                    id="applicant_selfie"
                    onChange={handleFileChange}
                    className={cn(
                      errors.applicant_selfie &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.applicant_selfie && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.applicant_selfie}
                    </p>
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
                  <Label htmlFor="personal_pan">
                    Personal PAN<span className="text-red-500">*</span>
                  </Label>
                  {formData.personal_pan &&
                    typeof formData.personal_pan === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.personal_pan}
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
                    id="personal_pan"
                    onChange={handleFileChange}
                    className={cn(
                      errors.personal_pan &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.personal_pan && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.personal_pan}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address_prooof">
                    Address Proof<span className="text-red-500">*</span>
                  </Label>
                  {formData.address_prooof &&
                    typeof formData.address_prooof === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.address_prooof}
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
                    id="address_prooof"
                    onChange={handleFileChange}
                    className={cn(
                      errors.address_prooof &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.address_prooof && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address_prooof}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coapplicant_aadhar_front">
                    Co-applicant Aadhar Front
                    <span className="text-red-500">*</span>
                  </Label>
                  {formData.coapplicant_aadhar_front &&
                    typeof formData.coapplicant_aadhar_front === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.coapplicant_aadhar_front}
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
                    id="coapplicant_aadhar_front"
                    onChange={handleFileChange}
                    className={cn(
                      errors.coapplicant_aadhar_front &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.coapplicant_aadhar_front && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.coapplicant_aadhar_front}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coapplicant_aadhar_back">
                    Co-applicant Aadhar Back
                    <span className="text-red-500">*</span>
                  </Label>
                  {formData.coapplicant_aadhar_back &&
                    typeof formData.coapplicant_aadhar_back === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.coapplicant_aadhar_back}
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
                    id="coapplicant_aadhar_back"
                    onChange={handleFileChange}
                    className={cn(
                      errors.coapplicant_aadhar_back &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.coapplicant_aadhar_back && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.coapplicant_aadhar_back}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coapplicant_pan">
                    Co-applicant PAN<span className="text-red-500">*</span>
                  </Label>
                  {formData.coapplicant_pan &&
                    typeof formData.coapplicant_pan === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.coapplicant_pan}
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
                    id="coapplicant_pan"
                    onChange={handleFileChange}
                    className={cn(
                      errors.coapplicant_pan &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.coapplicant_pan && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.coapplicant_pan}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_1">
                    Salary slip-1<span className="text-red-500">*</span>
                  </Label>
                  {formData.salary_slip_1 &&
                    typeof formData.salary_slip_1 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_1}
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
                    id="salary_slip_1"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_1 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_1}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_2">Salary slip-2</Label>
                  {formData.salary_slip_2 &&
                    typeof formData.salary_slip_2 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_2}
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
                    id="salary_slip_2"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_2 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_2}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_slip_3">Salary slip-3</Label>
                  {formData.salary_slip_3 &&
                    typeof formData.salary_slip_3 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.salary_slip_3}
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
                    id="salary_slip_3"
                    onChange={handleFileChange}
                    className={cn(
                      errors.salary_slip_3 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.salary_slip_3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.salary_slip_3}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form_16_itr_1">Form-16 ITR 1</Label>
                  {formData.form_16_itr_1 &&
                    typeof formData.form_16_itr_1 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.form_16_itr_1}
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
                    id="form_16_itr_1"
                    onChange={handleFileChange}
                    className={cn(
                      errors.form_16_itr_1 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.form_16_itr_1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.form_16_itr_1}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form_16_itr_2">Form-16 ITR 2</Label>
                  {formData.form_16_itr_2 &&
                    typeof formData.form_16_itr_2 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.form_16_itr_2}
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
                    id="form_16_itr_2"
                    onChange={handleFileChange}
                    className={cn(
                      errors.form_16_itr_2 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.form_16_itr_2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.form_16_itr_2}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="electricity_bill">Electricity Bill</Label>
                  {formData.electricity_bill &&
                    typeof formData.electricity_bill === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.electricity_bill}
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
                    id="electricity_bill"
                    onChange={handleFileChange}
                    className={cn(
                      errors.electricity_bill &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.electricity_bill && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.electricity_bill}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_images">Business Images</Label>
                  {formData.business_images &&
                    typeof formData.business_images === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.business_images}
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
                    id="business_images"
                    onChange={handleFileChange}
                    className={cn(
                      errors.business_images &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.business_images && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.business_images}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business_proof">Business Proof</Label>
                  {formData.business_proof &&
                    typeof formData.business_proof === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.business_proof}
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
                    id="business_proof"
                    onChange={handleFileChange}
                    className={cn(
                      errors.business_proof &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.business_proof && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.business_proof}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itr_1">ITR 1</Label>
                  {formData.itr_1 && typeof formData.itr_1 === "string" && (
                    <p className="text-sm text-gray-600">
                      Existing:{" "}
                      <a
                        href={formData.itr_1}
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
                    id="itr_1"
                    onChange={handleFileChange}
                    className={cn(
                      errors.itr_1 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.itr_1 && (
                    <p className="text-red-500 text-xs mt-1">{errors.itr_1}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itr_2">ITR 2</Label>
                  {formData.itr_2 && typeof formData.itr_2 === "string" && (
                    <p className="text-sm text-gray-600">
                      Existing:{" "}
                      <a
                        href={formData.itr_2}
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
                    id="itr_2"
                    onChange={handleFileChange}
                    className={cn(
                      errors.itr_2 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.itr_2 && (
                    <p className="text-red-500 text-xs mt-1">{errors.itr_2}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="another_1">Another Document 1</Label>
                  {formData.another_1 &&
                    typeof formData.another_1 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.another_1}
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
                    id="another_1"
                    onChange={handleFileChange}
                    className={cn(
                      errors.another_1 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.another_1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.another_1}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="another_2">Another Document 2</Label>
                  {formData.another_2 &&
                    typeof formData.another_2 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.another_2}
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
                    id="another_2"
                    onChange={handleFileChange}
                    className={cn(
                      errors.another_2 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.another_2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.another_2}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="another_3">Another Document 3</Label>
                  {formData.another_3 &&
                    typeof formData.another_3 === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.another_3}
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
                    id="another_3"
                    onChange={handleFileChange}
                    className={cn(
                      errors.another_3 &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.another_3 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.another_3}
                    </p>
                  )}
                </div>

                {/* Property Documents (if applicable from formData, even if property_for_mortgage is 'No') */}
                <div className="space-y-2">
                  <Label htmlFor="sale_deed">Sale Deed</Label>
                  {formData.sale_deed &&
                    typeof formData.sale_deed === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.sale_deed}
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
                    id="sale_deed"
                    onChange={handleFileChange}
                    className={cn(
                      errors.sale_deed &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.sale_deed && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.sale_deed}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mutation">Mutation</Label>
                  {formData.mutation &&
                    typeof formData.mutation === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.mutation}
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
                    id="mutation"
                    onChange={handleFileChange}
                    className={cn(
                      errors.mutation &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.mutation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.mutation}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rashid">Rashid</Label>
                  {formData.rashid && typeof formData.rashid === "string" && (
                    <p className="text-sm text-gray-600">
                      Existing:{" "}
                      <a
                        href={formData.rashid}
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
                    id="rashid"
                    onChange={handleFileChange}
                    className={cn(
                      errors.rashid &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.rashid && (
                    <p className="text-red-500 text-xs mt-1">{errors.rashid}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lpc">LPC</Label>
                  {formData.lpc && typeof formData.lpc === "string" && (
                    <p className="text-sm text-gray-600">
                      Existing:{" "}
                      <a
                        href={formData.lpc}
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
                    id="lpc"
                    onChange={handleFileChange}
                    className={cn(
                      errors.lpc && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.lpc && (
                    <p className="text-red-500 text-xs mt-1">{errors.lpc}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_pic">Property Picture</Label>
                  {formData.property_pic &&
                    typeof formData.property_pic === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.property_pic}
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
                    id="property_pic"
                    onChange={handleFileChange}
                    className={cn(
                      errors.property_pic &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.property_pic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.property_pic}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_map">Property Map</Label>
                  {formData.property_map &&
                    typeof formData.property_map === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.property_map}
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
                    id="property_map"
                    onChange={handleFileChange}
                    className={cn(
                      errors.property_map &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.property_map && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.property_map}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chain_deed">Chain Deed</Label>
                  {formData.chain_deed &&
                    typeof formData.chain_deed === "string" && (
                      <p className="text-sm text-gray-600">
                        Existing:{" "}
                        <a
                          href={formData.chain_deed}
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
                    id="chain_deed"
                    onChange={handleFileChange}
                    className={cn(
                      errors.chain_deed &&
                        "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  {errors.chain_deed && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.chain_deed}
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
                {isSubmitting
                  ? "Updating..."
                  : "Update Vehicle Loan Application"}
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

export default VehicleLoan;
