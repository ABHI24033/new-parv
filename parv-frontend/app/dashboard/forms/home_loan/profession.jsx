import React from "react";
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
import { validateFields } from "./formValidation";
import { PlusIcon, MinusIcon, Briefcase, History, FileText } from "lucide-react";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Button } from '@/components/ui/button';

const Profession = ({ formData, setFormData, errors, setErrors, handleAddEntry, handleRemoveEntry, loanHistoryHandleChange, loanHistory }) => {

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
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Your Profession" description="Select your current primary source of income.">
          <div className="col-span-full">
            <FormField label="Profession Type" error={errors?.profession} required>
              <RadioGroup
                value={formData?.profession || "Business"}
                onValueChange={(value) => handleFieldChange('profession', value)}
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Business" id="prof_business" />
                  <Label htmlFor="prof_business" className="cursor-pointer">Business</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Job" id="prof_job" />
                  <Label htmlFor="prof_job" className="cursor-pointer">Job</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>
        </FormSection>

        {formData?.profession === 'Job' ? (
          <FormSection title="Job Details" description="Information about your current employment.">
            <FormField label="Current Company Name" error={errors.current_company_name} required>
              <Input
                id="current_company_name"
                value={formData.current_company_name}
                onChange={(e) => handleFieldChange("current_company_name", e.target.value)}
                placeholder="Full company name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>

            <FormField label="Salary Account Bank" error={errors.salary_account_bank} required>
              <Input
                id="salary_account_bank"
                value={formData.salary_account_bank}
                onChange={(e) => handleFieldChange("salary_account_bank", e.target.value)}
                placeholder="Bank where salary is credited"
                className="h-11 rounded-xl border-none"
              />
            </FormField>

            <FormField label="Savings Account Bank" error={errors.savings_account_bank} required>
              <Input
                id="savings_account_bank"
                value={formData.savings_account_bank}
                onChange={(e) => handleFieldChange("savings_account_bank", e.target.value)}
                placeholder="eg. SBI, Patna"
                className="h-11 rounded-xl border-none"
              />
            </FormField>

            <FormField label="Tenure in Current Company" error={errors.job_tenure} required>
              <Select
                value={formData.job_tenure}
                onValueChange={(val) => handleFieldChange("job_tenure", val)}
              >
                <SelectTrigger className="h-11 rounded-xl border-none">
                  <SelectValue placeholder="Select tenure" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { label: "0-12 months", value: "0-12 months" },
                    { label: "12-24 months", value: "12-24 months" },
                    { label: "24-60 months", value: "24-60 months" },
                    { label: "more than 60 months", value: "more than 60 months" },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Total Experience" error={errors.job_experience} required>
              <Select
                value={formData.job_experience}
                onValueChange={(val) => handleFieldChange("job_experience", val)}
              >
                <SelectTrigger className="h-11 rounded-xl border-none">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { label: "less than 1 year", value: "less than 1 year" },
                    { label: "1-2 years", value: "1-2 years" },
                    { label: "2-3 years", value: "2-3 years" },
                    { label: "3-5 years", value: "3-5 years" },
                    { label: "more than 5 years", value: "more than 5 years" },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Monthly Income" error={errors.monthly_income} required>
              <Select
                value={formData.monthly_income}
                onValueChange={(val) => handleFieldChange("monthly_income", val)}
              >
                <SelectTrigger className="h-11 rounded-xl border-none">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { label: "less than 12,000", value: "less than 12,000" },
                    { label: "15,000 - 20,000", value: "15,000 - 20,000" },
                    { label: "20,000 - 25,000", value: "20,000 - 25,000" },
                    { label: "25,000 - 30,000", value: "25-000 - 30,000" },
                    { label: "30,000 - 35,000", value: "30,000 - 35,000" },
                    { label: "35,000 - 45,000", value: "35,000 - 45,000" },
                    { label: "above 45,000", value: "above 45,000" },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        ) : (
          <FormSection title="Business Details" description="Information about your current business operations.">
            <FormField label="Company Name" error={errors?.company_name} required>
              <Input
                id={`company_name`}
                onChange={(e) => handleFieldChange('company_name', e.target.value)}
                value={formData?.company_name}
                placeholder="Registered business name"
                className="h-11 rounded-xl border-none"
              />
            </FormField>

            <FormField label="Business Vintage" error={errors?.company_age} required>
              <Select
                value={formData?.company_age}
                onValueChange={(value) => handleFieldChange('company_age', value)}
              >
                <SelectTrigger className="h-11 rounded-xl border-none">
                  <SelectValue placeholder="Select business age" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    { value: '0-1 years', label: '0-1 years' },
                    { value: '1-3 years', label: '1-3 years' },
                    { value: '3-5 years', label: '3-5 years' },
                    { value: 'more than 5 years', label: 'more than 5 years' },
                  ].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="col-span-full md:col-span-2 bg-white/50 p-6 rounded-2xl border border-zinc-100 mt-2">
              <Label className="text-sm font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-blue-600" />
                Business Documents <span className='text-red-500'>*</span>
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "GST registration",
                  "UDYOG AAdhar registration",
                  "Form-3 or trade licence",
                  "any other",
                  "I don't have any registartion",
                ].map((optionLabel) => (
                  <div key={optionLabel} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-zinc-200 hover:border-blue-200 transition-colors cursor-pointer group">
                    <Checkbox
                      id={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                      checked={formData.registration_paper?.includes(optionLabel) || false}
                      onCheckedChange={(checked) => handleMultiOptionChange("registration_paper", optionLabel, checked)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                      className="text-sm font-medium text-zinc-700 cursor-pointer flex-1"
                    >
                      {optionLabel}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.registration_paper && (
                <p className="text-red-500 text-xs font-medium mt-3">
                  {errors.registration_paper}
                </p>
              )}
            </div>
          </FormSection>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Property Details" description="Details about the property being financed or mortgaged.">
          <FormField label="Property Location" error={errors?.property_location} required>
            <Select
              value={formData?.property_location}
              onValueChange={(value) => handleFieldChange('property_location', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Gram panchayat", value: "Gram panchayat" },
                  { label: "Nagar panchayat", value: "Nagar panchayat" },
                  { label: "Nagar Parishad", value: "Nagar Parishad" },
                  { label: "Nagar Nigam", value: "Nagar Nigam" },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Property Owner" error={errors?.who_own_property} required>
            <Select
              value={formData?.who_own_property}
              onValueChange={(value) => handleFieldChange('who_own_property', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { label: "Myself", value: "Myself" },
                  { label: "Father", value: "Father" },
                  { label: "Mother", value: "Mother" },
                  { label: "Spouse", value: "Spouse" },
                  { label: "Grand father", value: "Grand father" },
                  { label: "Grand mother", value: "Grand mother" },
                  { label: "Other", value: "Other" },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Have Agri Land?" error={errors?.have_17_kahta_agri_land} className="col-span-full">
            <RadioGroup
              value={formData?.have_17_kahta_agri_land}
              onValueChange={(value) => handleFieldChange('have_17_kahta_agri_land', value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="agri_yes" />
                <Label htmlFor="agri_yes" className="cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="agri_no" />
                <Label htmlFor="agri_no" className="cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <div className="col-span-full md:col-span-2 bg-white/50 p-6 rounded-2xl border border-zinc-100 mt-2">
            <Label className="text-sm font-semibold text-zinc-800 flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-green-600" />
              Property Documents
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Khatiyan (In case of inherited property)",
                "Sale deed (If you have purchase property)",
                "LPC certificate",
                "Current rashid of property",
              ].map((optionLabel) => (
                <div key={optionLabel} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-zinc-200 hover:border-green-200 transition-colors cursor-pointer">
                  <Checkbox
                    id={`needs_of_documents_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                    checked={formData.needs_of_documents?.includes(optionLabel) || false}
                    onCheckedChange={(checked) => handleMultiOptionChange("needs_of_documents", optionLabel, checked)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label
                    htmlFor={`needs_of_documents_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                    className="text-sm font-medium text-zinc-700 cursor-pointer flex-1"
                  >
                    {optionLabel}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </FormSection>

        <FormSection title="Past Loans" description="Details of your existing loan history.">
          <div className="col-span-full flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-zinc-500 font-medium italic">
                Add any active or past loans.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddEntry}
                className="rounded-xl border-blue-100 text-blue-600 h-8 text-[10px] font-bold uppercase tracking-wider"
              >
                <PlusIcon className="w-3 h-3 mr-1.5" />
                Add Loan
              </Button>
            </div>

            {loanHistory?.map((entry, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 relative pt-7">
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[9px] font-bold uppercase">
                  Loan #{index + 1}
                </div>
                {loanHistory.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEntry(index)}
                    className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Bank" className="col-span-1">
                    <Input
                      name="loan_provider_bank"
                      onChange={(e) => loanHistoryHandleChange(index, e)}
                      value={entry.loan_provider_bank}
                      placeholder="Eg. SBI"
                      className="h-9 text-xs border-none"
                    />
                  </FormField>
                  <FormField label="Sanctioned" className="col-span-1">
                    <Input
                      name="total_loan_amount"
                      type="number"
                      onChange={(e) => loanHistoryHandleChange(index, e)}
                      value={entry.total_loan_amount}
                      placeholder="Amount"
                      className="h-9 text-xs border-none"
                    />
                  </FormField>
                  <FormField label="Current EMI" className="col-span-1">
                    <Input
                      name="current_emi"
                      type="number"
                      onChange={(e) => loanHistoryHandleChange(index, e)}
                      value={entry.current_emi}
                      placeholder="EMI"
                      className="h-9 text-xs border-none"
                    />
                  </FormField>
                  <FormField label="Balance" className="col-span-1">
                    <Input
                      name="remaining_amount"
                      type="number"
                      onChange={(e) => loanHistoryHandleChange(index, e)}
                      value={entry.remaining_amount}
                      placeholder="Amount"
                      className="h-9 text-xs border-none"
                    />
                  </FormField>
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      </div>

      {formData?.profession === 'Job' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <FormSection title="Job Eligibility" description="Quick check for mandatory job documents.">
            <FormField label="Offer Letter?" error={errors?.have_offer_letter} required>
              <RadioGroup
                value={formData?.have_offer_letter}
                onValueChange={(value) => handleFieldChange('have_offer_letter', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="offer_yes" />
                  <Label htmlFor="offer_yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="offer_no" />
                  <Label htmlFor="offer_no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Form-16 / TAN?" error={errors?.have_tan_no} required>
              <RadioGroup
                value={formData?.have_tan_no}
                onValueChange={(value) => handleFieldChange('have_tan_no', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="tan_yes" />
                  <Label htmlFor="tan_yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="tan_no" />
                  <Label htmlFor="tan_no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Net Banking?" error={errors?.has_bank_statement} required>
              <RadioGroup
                value={formData?.has_bank_statement}
                onValueChange={(value) => handleFieldChange('has_bank_statement', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="stmt_yes" />
                  <Label htmlFor="stmt_yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="stmt_no" />
                  <Label htmlFor="stmt_no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Salary Slips?" error={errors?.has_salary_slip} required>
              <RadioGroup
                value={formData?.has_salary_slip}
                onValueChange={(value) => handleFieldChange('has_salary_slip', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="slip_yes" />
                  <Label htmlFor="slip_yes" className="cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="slip_no" />
                  <Label htmlFor="slip_no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </FormSection>
        </div>
      )}
    </div>
  );
};

export default Profession;
