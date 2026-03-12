import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateFields } from "./formValidation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, MinusIcon, History, Building2, Briefcase } from "lucide-react";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Button } from '@/components/ui/button';

const Employment = ({ formData, setFormData, errors, setErrors, handleAddEntry, handleRemoveEntry, loanHistoryHandleChange, loanHistory }) => {

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

    const handleSelectChange = (id, value) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
        const fieldValidation = validateFields({ ...formData, [id]: value }, [id]);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!fieldValidation[id]) {
                delete newErrors[id];
            } else {
                newErrors[id] = fieldValidation[id];
            }
            return newErrors;
        });
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Income Details" description="Information about your current employment and earnings.">
                    <FormField label="Current Company Name" error={errors.current_company_name} required>
                        <Input
                            id="current_company_name"
                            value={formData.current_company_name}
                            onChange={(e) => handleFieldChange("current_company_name", e.target.value)}
                            placeholder="Full company name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Designation" error={errors.designation}>
                        <Input
                            id="designation"
                            value={formData.designation}
                            onChange={(e) => handleFieldChange("designation", e.target.value)}
                            placeholder="Your job role"
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

                    <FormField label="Tenure in Current Job" error={errors.job_tenure} required>
                        <Select
                            value={formData.job_tenure}
                            onValueChange={(val) => handleSelectChange("job_tenure", val)}
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
                            onValueChange={(val) => handleSelectChange("job_experience", val)}
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
                            onValueChange={(val) => handleSelectChange("monthly_income", val)}
                        >
                            <SelectTrigger className="h-11 rounded-xl border-none">
                                <SelectValue placeholder="Select income range" />
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

                <FormSection title="Office Address" description="The location of your current workplace.">
                    <FormField label="Building/House Name" error={errors.office_building_name} required>
                        <Input
                            id="office_building_name"
                            value={formData.office_building_name}
                            onChange={(e) => handleFieldChange("office_building_name", e.target.value)}
                            placeholder="House/Building No."
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Street/Road Name" error={errors.office_street_name} required>
                        <Input
                            id="office_street_name"
                            value={formData.office_street_name}
                            onChange={(e) => handleFieldChange("office_street_name", e.target.value)}
                            placeholder="Street or Area"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Landmark" error={errors.office_landmark}>
                        <Input
                            id="office_landmark"
                            value={formData.office_landmark}
                            onChange={(e) => handleFieldChange("office_landmark", e.target.value)}
                            placeholder="Nearby landmark"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="City" error={errors.office_city} required>
                        <Input
                            id="office_city"
                            value={formData.office_city}
                            onChange={(e) => handleFieldChange("office_city", e.target.value)}
                            placeholder="City"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="District" error={errors.office_district} required>
                        <Input
                            id="office_district"
                            value={formData.office_district}
                            onChange={(e) => handleFieldChange("office_district", e.target.value)}
                            placeholder="District"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="State" error={errors.office_state} required>
                        <Input
                            id="office_state"
                            value={formData.office_state}
                            onChange={(e) => handleFieldChange("office_state", e.target.value)}
                            placeholder="State"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Pincode" error={errors.office_pincode} required>
                        <Input
                            id="office_pincode"
                            value={formData.office_pincode}
                            onChange={(e) => handleFieldChange("office_pincode", e.target.value)}
                            placeholder="6-digit Pincode"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                </FormSection>
            </div>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                            <History className="w-5 h-5 text-blue-600" />
                            Previous Loan History
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 italic">
                            Provide details of any past loans, if applicable.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddEntry}
                            className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 shadow-sm transition-all"
                        >
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Entry
                        </Button>
                        {loanHistory.length > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveEntry(loanHistory.length - 1)}
                                className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-all"
                            >
                                <MinusIcon className="w-4 h-4 mr-2" />
                                Remove
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {loanHistory?.map((entry, index) => (
                        <div
                            key={index}
                            className="bg-[#f8f9fc] p-8 border-none rounded-2xl relative group transition-all hover:shadow-md hover:bg-white"
                        >
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                                {index + 1}
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <FormField label="Bank Name" error={errors.loan_provider_bank}>
                                    <Input
                                        id={`loan_provider_bank_${index}`}
                                        name="loan_provider_bank"
                                        onChange={(e) => loanHistoryHandleChange(index, e)}
                                        value={entry.loan_provider_bank}
                                        placeholder="Bank Name"
                                        className="h-11 rounded-xl bg-white border-none"
                                    />
                                </FormField>

                                <FormField label="Loan Amount" error={errors.total_loan_amount}>
                                    <Input
                                        id={`total_loan_amount_${index}`}
                                        name="total_loan_amount"
                                        type="number"
                                        onChange={(e) => loanHistoryHandleChange(index, e)}
                                        value={entry.total_loan_amount}
                                        placeholder="Sanctioned amount"
                                        className="h-11 rounded-xl bg-white border-none"
                                    />
                                </FormField>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField label="Current EMI" error={errors.current_emi}>
                                        <Input
                                            id={`current_emi_${index}`}
                                            name="current_emi"
                                            type="number"
                                            onChange={(e) => loanHistoryHandleChange(index, e)}
                                            value={entry.current_emi}
                                            placeholder="EMI"
                                            className="h-11 rounded-xl bg-white border-none"
                                        />
                                    </FormField>

                                    <FormField label="Remaining" error={errors.remaining_amount}>
                                        <Input
                                            id={`remaining_amount_${index}`}
                                            name="remaining_amount"
                                            type="number"
                                            onChange={(e) => loanHistoryHandleChange(index, e)}
                                            value={entry.remaining_amount}
                                            placeholder="Balance"
                                            className="h-11 rounded-xl bg-white border-none"
                                        />
                                    </FormField>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Employment;
