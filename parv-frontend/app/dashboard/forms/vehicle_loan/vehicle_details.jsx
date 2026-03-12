import React from "react";
import { validateFields } from "./formValidation";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehicleDetails = ({ formData, setFormData, errors, setErrors }) => {

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

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Purchase Information" description="Details about the vehicle and your timeline.">
          <FormField label="Vehicle Loan Type" error={errors?.which_vehicle} required>
            <Select
              value={formData?.which_vehicle}
              onValueChange={(value) => handleFieldChange('which_vehicle', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'two_wheeler_loan', label: 'Two wheeler loan' },
                  { value: 'new_car_loan', label: 'New car loan' },
                  { value: 'light_commercial_vehicle_loan', label: 'Light commercial vehicle loan' },
                  { value: 'heavy_commercial_vehicle_loan', label: 'Heavy commercial vehicle loan' },
                  { value: 'tractor_loan', label: 'Tractor Loan' },
                  { value: 'old_vehicle_purchase', label: 'Old vehicle purchase' },
                  { value: 'vehicle_refinance', label: 'Vehicle Refinance' },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Purchase Timeline" error={errors?.when_purchase} required>
            <Select
              value={formData?.when_purchase}
              onValueChange={(value) => handleFieldChange('when_purchase', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="When do you plan to buy?" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'within 7 days', label: 'within 7 days' },
                  { value: '10-15 days', label: '10-15 days' },
                  { value: '15-30 days', label: '15-30 days' },
                  { value: '30-90 days', label: '30-90 days' },
                  { value: 'later', label: 'later' },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Profession Type" error={errors?.profession} required>
            <Select
              value={formData?.profession}
              onValueChange={(value) => handleFieldChange('profession', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select your profession" />
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

        <FormSection title="Financial Requirement" description="Estimated cost and the loan amount you need.">
          <FormField label="Estimated Cost" error={errors?.estimated_cost} required>
            <Select
              value={formData?.estimated_cost}
              onValueChange={(value) => handleFieldChange('estimated_cost', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select cost range" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '50 thousand-1 lakh', label: '50 thousand-1 lakh' },
                  { value: '1-5 lakhs', label: '1-5 lakhs' },
                  { value: '5-10 lakhs', label: '5-10 lakhs' },
                  { value: '10-15 lakhs', label: '10-15 lakhs' },
                  { value: '15-20 lakhs', label: '15-20 lakhs' },
                  { value: '20-30 lakhs', label: '20-30 lakhs' },
                  { value: '30-50 lakhs', label: '30-50 lakhs' },
                  { value: 'more than 50 lakhs', label: 'more than 50 lakhs' },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Loan Amount Needed" error={errors?.loan_you_need} required>
            <Select
              value={formData?.loan_you_need}
              onValueChange={(value) => handleFieldChange('loan_you_need', value)}
            >
              <SelectTrigger className="h-11 rounded-xl border-none">
                <SelectValue placeholder="Select loan amount" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: '20 thousand-1 lakh', label: '20 thousand-1 lakh' },
                  { value: '1-3 lakhs', label: '1-3 lakhs' },
                  { value: '3-5 lakhs', label: '3-5 lakhs' },
                  { value: '5-10 lakhs', label: '5-10 lakhs' },
                  { value: '10-12 lakhs', label: '10-12 lakhs' },
                  { value: '12-20 lakhs', label: '12-20 lakhs' },
                  { value: '20-30 lakhs', label: '20-30 lakhs' },
                  { value: '30-50 lakhs', label: '30-50 lakhs' },
                  { value: 'more than 50 lakhs', label: 'more than 50 lakhs' },
                ].map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <div className="hidden md:block h-[76px]" />
        </FormSection>
      </div>
    </div>
  );
};

export default VehicleDetails;
