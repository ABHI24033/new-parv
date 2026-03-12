import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validateFields } from "./formValidation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const PersonalDetails = ({ formData, setFormData, errors, setErrors }) => {

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    const fieldValidation = validateFields({ ...formData, [fieldName]: value }, [fieldName]);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (!fieldValidation[fieldName]) {
        delete newErrors[fieldName];
      } else {
        newErrors[fieldName] = fieldValidation[fieldName];
      }
      return newErrors;
    });
  };

  const handleCheckboxChange = (id, checked) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [id]: checked,
      };

      if (id === "same_as_permanent_address") {
        if (checked) {
          updatedFormData.present_building_name = prev.permanent_building_name || "";
          updatedFormData.present_street_name = prev.permanent_street_name || "";
          updatedFormData.present_landmark = prev.permanent_landmark || "";
          updatedFormData.present_city = prev.permanent_city || "";
          updatedFormData.present_district = prev.permanent_district || "";
          updatedFormData.present_state = prev.permanent_state || "";
          updatedFormData.present_pincode = prev.permanent_pincode || "";
        } else {
          updatedFormData.present_building_name = "";
          updatedFormData.present_street_name = "";
          updatedFormData.present_landmark = "";
          updatedFormData.present_city = "";
          updatedFormData.present_district = "";
          updatedFormData.present_state = "";
          updatedFormData.present_pincode = "";
        }
      }

      return updatedFormData;
    });

    if (id === "same_as_permanent_address" && checked) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        [
          "present_building_name",
          "present_street_name",
          "present_landmark",
          "present_city",
          "present_district",
          "present_state",
          "present_pincode",
        ].forEach((field) => delete newErrors[field]);
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-12">
      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Loan Information" description="Basic details about the loan and its purpose.">
          <FormField label="Loan Amount" error={errors?.loan_amount} required>
            <Input
              id="loan_amount"
              type="number"
              onChange={(e) => handleFieldChange("loan_amount", e.target.value)}
              value={formData?.loan_amount}
              placeholder="Enter loan amount"
              className="h-11 rounded-xl border-none"
            />
          </FormField>

          <FormField label="Connector & DSA" required>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="id_of_connector"
                onChange={(e) => handleFieldChange("id_of_connector", e.target.value)}
                value={formData?.id_of_connector}
                placeholder="ID"
                className="h-11 rounded-xl border-none"
              />
              <Input
                id="name_of_connector"
                onChange={(e) => handleFieldChange("name_of_connector", e.target.value)}
                value={formData?.name_of_connector}
                placeholder="DSA Name"
                className="h-11 rounded-xl border-none"
              />
            </div>
          </FormField>

          <FormField label="Purpose of Loan" error={errors?.purpose_of_loan} required>
            <Select
              value={formData?.purpose_of_loan}
              onValueChange={(value) => handleFieldChange('purpose_of_loan', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'To start a new business', label: 'To start a new business' },
                  { value: 'For the growth of existing business', label: 'For the growth of existing business' },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="hidden md:block h-[40px]" />
        </FormSection>

        <FormSection title="Applicant Details" description="Personal information of the primary business applicant.">
          <FormField label="Full Name" error={errors?.applicant_name} required>
            <Input
              id="applicant_name"
              onChange={(e) => handleFieldChange("applicant_name", e.target.value)}
              value={formData?.applicant_name}
              placeholder="As per PAN card"
              className="h-11 rounded-xl border-none"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Father's Name" error={errors?.fathers_name} required>
              <Input
                id="fathers_name"
                onChange={(e) => handleFieldChange("fathers_name", e.target.value)}
                value={formData?.fathers_name}
                placeholder="Father's name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
            <FormField label="Mother's Name" error={errors?.mothers_name} required>
              <Input
                id="mothers_name"
                onChange={(e) => handleFieldChange("mothers_name", e.target.value)}
                value={formData?.mothers_name}
                placeholder="Mother's name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone Number" error={errors?.phone_no} required>
              <Input
                id="phone_no"
                type="tel"
                onChange={(e) => handleFieldChange("phone_no", e.target.value)}
                value={formData?.phone_no}
                placeholder="Mobile"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
            <FormField label="Date of Birth" error={errors?.dob} required>
              <Input
                id="dob"
                type="date"
                onChange={(e) => handleFieldChange("dob", e.target.value)}
                value={formData?.dob}
                className="h-11 rounded-xl border-none text-zinc-500"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="PAN Number" error={errors?.pan} required>
              <Input
                id="pan"
                onChange={(e) => handleFieldChange("pan", e.target.value)}
                value={formData?.pan}
                placeholder="PAN"
                className="h-11 rounded-xl border-none uppercase"
              />
            </FormField>
            <FormField label="Aadhar Number" error={errors?.aadhar} required>
              <Input
                id="aadhar"
                onChange={(e) => handleFieldChange("aadhar", e.target.value)}
                value={formData?.aadhar}
                placeholder="Aadhar"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          </div>
        </FormSection>
      </div>

      {/* Marital & Co-applicant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Status & Family" description="Marital status and additional applicant information.">
          <FormField label="Marital Status" error={errors?.marital_status} required>
            <RadioGroup
              value={formData?.marital_status}
              onValueChange={(value) => handleFieldChange('marital_status', value)}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Married" id="married" />
                <Label htmlFor="married" className="cursor-pointer font-medium text-zinc-700">Married</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Unmarried" id="unmarried" />
                <Label htmlFor="unmarried" className="cursor-pointer font-medium text-zinc-700">Unmarried</Label>
              </div>
            </RadioGroup>
          </FormField>

          {formData?.marital_status === 'Married' && (
            <FormField label="Spouse Name" error={errors?.spouse_name} required>
              <Input
                id="spouse_name"
                onChange={(e) => handleFieldChange("spouse_name", e.target.value)}
                value={formData?.spouse_name}
                placeholder="Enter spouse name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          )}

          <FormField label="Add co-applicant?" error={errors?.have_coapplicant} required>
            <RadioGroup
              value={formData?.have_coapplicant}
              onValueChange={(value) => handleFieldChange('have_coapplicant', value)}
              className="flex gap-6 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="co_yes" />
                <Label htmlFor="co_yes" className="cursor-pointer font-medium text-zinc-700">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="co_no" />
                <Label htmlFor="co_no" className="cursor-pointer font-medium text-zinc-700">No</Label>
              </div>
            </RadioGroup>
          </FormField>
        </FormSection>

        {formData?.have_coapplicant === "Yes" ? (
          <FormSection title="Co-applicant Details" description="Information about your co-applicant.">
            <FormField label="Co-applicant's Name" error={errors?.co_applicant_name} required>
              <Input
                id="co_applicant_name"
                onChange={(e) => handleFieldChange("co_applicant_name", e.target.value)}
                value={formData?.co_applicant_name}
                placeholder="Full name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="DOB" error={errors?.co_applicant_dob} required>
                <Input
                  id="co_applicant_dob"
                  type="date"
                  onChange={(e) => handleFieldChange("co_applicant_dob", e.target.value)}
                  value={formData?.co_applicant_dob}
                  className="h-11 rounded-xl border-none text-zinc-500"
                />
              </FormField>

              <FormField label="Relation" error={errors?.relation_with_applicant} required>
                <Select
                  value={formData?.relation_with_applicant}
                  onValueChange={(value) => handleFieldChange('relation_with_applicant', value)}
                >
                  <SelectTrigger className="h-11 rounded-xl border-none">
                    <SelectValue placeholder="Relation" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: 'Mother', label: 'Mother' },
                      { value: 'Father', label: 'Father' },
                      { value: 'Spouse', label: 'Spouse' },
                      { value: 'Brother', label: 'Brother' },
                    ].map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <FormField label="Occupation" error={errors?.co_occupation} required>
              <Select
                value={formData?.co_occupation}
                onValueChange={(value) => handleFieldChange('co_occupation', value)}
              >
                <SelectTrigger className="h-11 rounded-xl border-none">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: 'Job', label: 'Job' },
                    { value: 'Business', label: 'Business' },
                    { value: 'Others', label: 'Others' },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        ) : (
          <div className="hidden md:flex items-center justify-center bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
            <p className="text-zinc-400 text-sm italic">Co-applicant details will appear here if selected.</p>
          </div>
        )}
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Permanent Address" description="Address mentioned on your Aadhar card.">
          <FormField label="Flat / Building Name" error={errors?.permanent_building_name} required>
            <Input
              id="permanent_building_name"
              onChange={(e) => handleFieldChange("permanent_building_name", e.target.value)}
              value={formData?.permanent_building_name}
              placeholder="House/Building No."
              className="h-11 rounded-xl border-none"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Street Name" error={errors?.permanent_street_name} required>
              <Input
                id="permanent_street_name"
                onChange={(e) => handleFieldChange("permanent_street_name", e.target.value)}
                value={formData?.permanent_street_name}
                placeholder="Street or Area"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
            <FormField label="Landmark" error={errors?.permanent_landmark}>
              <Input
                id="permanent_landmark"
                onChange={(e) => handleFieldChange("permanent_landmark", e.target.value)}
                value={formData?.permanent_landmark}
                placeholder="Nearby"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="City" error={errors?.permanent_city} required>
              <Input
                id="permanent_city"
                onChange={(e) => handleFieldChange("permanent_city", e.target.value)}
                value={formData?.permanent_city}
                placeholder="City"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
            <FormField label="District" error={errors?.permanent_district} required>
              <Input
                id="permanent_district"
                onChange={(e) => handleFieldChange("permanent_district", e.target.value)}
                value={formData?.permanent_district}
                placeholder="District"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="State" error={errors?.permanent_state} required>
              <Input
                id="permanent_state"
                onChange={(e) => handleFieldChange("permanent_state", e.target.value)}
                value={formData?.permanent_state}
                placeholder="State"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
            <FormField label="Pincode" error={errors?.permanent_pincode} required>
              <Input
                id="permanent_pincode"
                onChange={(e) => handleFieldChange("permanent_pincode", e.target.value)}
                value={formData?.permanent_pincode}
                placeholder="6-digit"
                className="h-11 rounded-xl border-none"
              />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Present Address" description="Address where you are staying currently.">
          <div className="col-span-full mb-4">
            <div className="flex items-center space-x-2 bg-blue-50/50 p-4 rounded-xl border-none w-full">
              <Checkbox
                id="same_as_permanent_address"
                checked={formData.same_as_permanent_address}
                onCheckedChange={(checked) => handleCheckboxChange("same_as_permanent_address", checked)}
              />
              <Label htmlFor="same_as_permanent_address" className="text-sm font-semibold text-blue-700 cursor-pointer">
                Same as Permanent Address
              </Label>
            </div>
          </div>

          {!formData.same_as_permanent_address ? (
            <>
              <FormField label="Flat / Building Name" error={errors?.present_building_name} required>
                <Input
                  id="present_building_name"
                  onChange={(e) => handleFieldChange("present_building_name", e.target.value)}
                  value={formData?.present_building_name}
                  placeholder="House/Building No."
                  className="h-11 rounded-xl border-none"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Street Name" error={errors?.present_street_name} required>
                  <Input
                    id="present_street_name"
                    onChange={(e) => handleFieldChange("present_street_name", e.target.value)}
                    value={formData?.present_street_name}
                    placeholder="Street"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
                <FormField label="Landmark" error={errors?.present_landmark}>
                  <Input
                    id="present_landmark"
                    onChange={(e) => handleFieldChange("present_landmark", e.target.value)}
                    value={formData?.present_landmark}
                    placeholder="Nearby"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="City" error={errors?.present_city} required>
                  <Input
                    id="present_city"
                    onChange={(e) => handleFieldChange("present_city", e.target.value)}
                    value={formData?.present_city}
                    placeholder="City"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
                <FormField label="District" error={errors?.present_district} required>
                  <Input
                    id="present_district"
                    onChange={(e) => handleFieldChange("present_district", e.target.value)}
                    value={formData?.present_district}
                    placeholder="District"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="State" error={errors?.present_state} required>
                  <Input
                    id="present_state"
                    onChange={(e) => handleFieldChange("present_state", e.target.value)}
                    value={formData?.present_state}
                    placeholder="State"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
                <FormField label="Pincode" error={errors?.present_pincode} required>
                  <Input
                    id="present_pincode"
                    onChange={(e) => handleFieldChange("present_pincode", e.target.value)}
                    value={formData?.present_pincode}
                    placeholder="6-digit"
                    className="h-11 rounded-xl border-none"
                  />
                </FormField>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 h-full min-h-[300px]">
              <p className="text-zinc-400 text-sm italic">Same as permanent address selected.</p>
            </div>
          )}
        </FormSection>
      </div>
    </div>
  );
};

export default PersonalDetails;
