import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, MinusIcon, History, FileText, Landmark, CreditCard } from 'lucide-react';
import { validateFields } from './formValidation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Button } from '@/components/ui/button';

const Employment = ({ formData, setFormData, errors, setErrors, loanHistory, setLoanhistory, handleAddEntry, handleRemoveEntry, loanHistoryHandleChange }) => {

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
        setFormData(prev => {
            const currentValues = prev[id] || [];
            let newValues;
            if (isChecked) {
                newValues = [...currentValues, optionValue];
            } else {
                newValues = currentValues.filter(val => val !== optionValue);
            }
            return {
                ...prev,
                [id]: newValues
            };
        });
    };

    return (
        <div className="space-y-12">
            {/* Business & Banking Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Business Profile" description="Information about your company and registration status.">
                    <FormField label="Company / Firm Name" error={errors?.company_name} required>
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
                                <SelectValue placeholder="How old is your business?" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { label: "0-1 years", value: "0-1 years" },
                                    { label: "1-3 years", value: "1-3 years" },
                                    { label: "3-5 years", value: "3-5 years" },
                                    { label: "more than 5 years", value: "more than 5 years" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    <div className="col-span-full bg-[#f8f9fc] p-6 rounded-2xl border-none mt-2">
                        <Label className="text-sm font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Business Registration <span className='text-red-500'>*</span>
                        </Label>
                        <div className="grid grid-cols-1 gap-3">
                            {['GST registration', 'UDYOG AAdhar registration', 'Form-3 or trade licence', 'any other', "I don't have any registration"].map(optionLabel => (
                                <div key={optionLabel} className="flex items-center space-x-3 bg-white p-3 rounded-xl border-none hover:bg-white/80 transition-colors cursor-pointer group shadow-sm">
                                    <Checkbox
                                        id={`registration_paper_${optionLabel.replace(/\s+/g, '_').replace(/[\(\)]/g, '')}`}
                                        checked={formData.registration_paper?.includes(optionLabel) || false}
                                        onCheckedChange={(checked) => handleMultiOptionChange('registration_paper', optionLabel, checked)}
                                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                    <Label
                                        htmlFor={`registration_paper_${optionLabel.replace(/\s+/g, '_').replace(/[\(\)]/g, '')}`}
                                        className="text-sm font-medium text-zinc-700 cursor-pointer flex-1"
                                    >
                                        {optionLabel}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.registration_paper && <p className="text-red-500 text-xs font-medium mt-3">{errors.registration_paper}</p>}
                    </div>
                </FormSection>

                <FormSection title="Current Account" description="Details of your business current account.">
                    <FormField label="Current Account?" error={errors?.have_current_account}>
                        <RadioGroup
                            value={formData?.have_current_account}
                            onValueChange={(value) => handleFieldChange('have_current_account', value)}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="cur_acc_yes" />
                                <Label htmlFor="cur_acc_yes" className="cursor-pointer font-medium">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="cur_acc_no" />
                                <Label htmlFor="cur_acc_no" className="cursor-pointer font-medium">No</Label>
                            </div>
                        </RadioGroup>
                    </FormField>

                    {formData.have_current_account === 'Yes' && (
                        <>
                            <FormField label="Bank & Account Name" required>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        id={`current_account_bank_name`}
                                        onChange={(e) => handleFieldChange('current_account_bank_name', e.target.value)}
                                        value={formData?.current_account_bank_name}
                                        placeholder="Bank Name"
                                        className="h-11 rounded-xl border-none"
                                    />
                                    <Select
                                        value={formData?.name_in_current_account}
                                        onValueChange={(value) => handleFieldChange('name_in_current_account', value)}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-none">
                                            <SelectValue placeholder="Account holder" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { label: "My business", value: "My business" },
                                                { label: "Myself", value: "Myself" },
                                            ].map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormField>

                            <FormField label="Account Profile" required>
                                <div className="grid grid-cols-1 gap-4">
                                    <Select
                                        value={formData?.current_account_age}
                                        onValueChange={(value) => handleFieldChange('current_account_age', value)}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-none">
                                            <SelectValue placeholder="Account Age" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { label: "Less than 1 year", value: "Less than 1 year" },
                                                { label: "1-3 years", value: "1-3 years" },
                                                { label: "3-5 years", value: "3-5 years" },
                                                { label: "more than 5 years", value: "more than 5 years" },
                                            ].map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={formData?.current_account_turnover}
                                        onValueChange={(value) => handleFieldChange('current_account_turnover', value)}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-none">
                                            <SelectValue placeholder="Annual turnover" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { label: "Below 10 lakhs", value: "Below 10 lakhs" },
                                                { label: "10-20 lakhs", value: "10-20 lakhs" },
                                                { label: "20-30 lakhs", value: "20-30 lakhs" },
                                                { label: "30-50 lakhs", value: "30-50 lakhs" },
                                                { label: "50-70 lakhs", value: "50-70 lakhs" },
                                                { label: "70-1 crore", value: "70-1 crore" },
                                                { label: "above 1 crore", value: "above 1 crore" },
                                            ].map((opt) => (
                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormField>
                        </>
                    )}
                    <div className="hidden md:block h-[120px]" />
                </FormSection>
            </div>

            {/* Savings & Tax Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Saving Account" description="Information about your primary savings account.">
                    <FormField label="Bank Name" error={errors?.saving_account_bank_name} required>
                        <Input
                            id={`saving_account_bank_name`}
                            onChange={(e) => handleFieldChange('saving_account_bank_name', e.target.value)}
                            value={formData?.saving_account_bank_name}
                            placeholder="Bank Name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Savings Turnover" error={errors?.saving_account_turnover} required>
                        <Select
                            value={formData?.saving_account_turnover}
                            onValueChange={(value) => handleFieldChange('saving_account_turnover', value)}
                        >
                            <SelectTrigger className="h-11 rounded-xl border-none">
                                <SelectValue placeholder="Select annual turnover" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { label: "Less than 10 lakhs", value: "Less than 10 lakhs" },
                                    { label: "10-20 lakhs", value: "10-20 lakhs" },
                                    { label: "20-50 lakhs", value: "20-50 lakhs" },
                                    { label: "50-1 crore", value: "50-1 crore" },
                                    { label: "above 1 crore", value: "above 1 crore" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                    <div className="hidden md:block h-[40px]" />
                </FormSection>

                <FormSection title="Tax Information" description="Questions about your income tax filing status.">
                    <FormField label="Do you file income tax?" error={errors?.file_income_tax} required>
                        <RadioGroup
                            value={formData?.file_income_tax}
                            onValueChange={(value) => handleFieldChange('file_income_tax', value)}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="itr_filing_yes" />
                                <Label htmlFor="itr_filing_yes" className="cursor-pointer font-medium">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="itr_filing_no" />
                                <Label htmlFor="itr_filing_no" className="cursor-pointer font-medium">No</Label>
                            </div>
                        </RadioGroup>
                    </FormField>

                    <FormField label="Family member files tax?" error={errors?.is_family_files_income_tax} required>
                        <RadioGroup
                            value={formData?.is_family_files_income_tax}
                            onValueChange={(value) => handleFieldChange('is_family_files_income_tax', value)}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="fam_itr_yes" />
                                <Label htmlFor="fam_itr_yes" className="cursor-pointer font-medium">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="fam_itr_no" />
                                <Label htmlFor="fam_itr_no" className="cursor-pointer font-medium">No</Label>
                            </div>
                        </RadioGroup>
                    </FormField>
                </FormSection>
            </div>

            {/* Asset Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Asset Information" description="Details about property for mortgage or land holding.">
                    <FormField label="Property Location & Owner" required>
                        <div className="grid grid-cols-1 gap-4">
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

                            <Select
                                value={formData?.who_own_property}
                                onValueChange={(value) => handleFieldChange('who_own_property', value)}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-none">
                                    <SelectValue placeholder="Property Owner" />
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
                        </div>
                    </FormField>

                    <FormField label="Have 17 Khata Agri Land?" error={errors?.have_17_kahta_agri_land}>
                        <RadioGroup
                            value={formData?.have_17_kahta_agri_land}
                            onValueChange={(value) => handleFieldChange('have_17_kahta_agri_land', value)}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="land_17_yes" />
                                <Label htmlFor="land_17_yes" className="cursor-pointer font-medium">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="No" id="land_17_no" />
                                <Label htmlFor="land_17_no" className="cursor-pointer font-medium">No</Label>
                            </div>
                        </RadioGroup>
                    </FormField>
                </FormSection>

                <FormSection title="Property Documentation" description="Available documents for the property.">
                    <div className="grid grid-cols-1 gap-3">
                        {['Khatiyan', 'Sale deed', 'LPC certificate', 'Current rashid'].map(optionLabel => (
                            <div key={optionLabel} className="flex items-center space-x-3 bg-[#f8f9fc] p-4 rounded-xl border-none hover:bg-zinc-100 transition-colors cursor-pointer group shadow-sm">
                                <Checkbox
                                    id={`needs_of_documents_${optionLabel.replace(/\s+/g, '_')}`}
                                    checked={formData.needs_of_documents?.includes(optionLabel) || false}
                                    onCheckedChange={(checked) => handleMultiOptionChange('needs_of_documents', optionLabel, checked)}
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label
                                    htmlFor={`needs_of_documents_${optionLabel.replace(/\s+/g, '_')}`}
                                    className="text-sm font-semibold text-zinc-700 cursor-pointer flex-1"
                                >
                                    {optionLabel}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {errors.needs_of_documents && <p className="text-red-500 text-xs font-medium mt-3">{errors.needs_of_documents}</p>}
                </FormSection>
            </div>

            {/* Previous Loan History Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-800 tracking-tight flex items-center gap-2">
                            <History className="w-5 h-5 text-blue-600" />
                            Previous Loan History
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 italic">
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
                                <FormField label="Bank Name">
                                    <Input
                                        id={`loan_provider_bank_${index}`}
                                        name="loan_provider_bank"
                                        onChange={(e) => loanHistoryHandleChange(index, e)}
                                        value={entry.loan_provider_bank}
                                        placeholder="Bank Name"
                                        className="h-11 rounded-xl bg-white border-none"
                                    />
                                </FormField>

                                <FormField label="Loan Amount">
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
                                    <FormField label="Current EMI">
                                        <Input
                                            id={`current_emi_${index}`}
                                            name="current_emi"
                                            type="number"
                                            onChange={(e) => loanHistoryHandleChange(index, e)}
                                            value={entry?.current_emi}
                                            placeholder="EMI"
                                            className="h-11 rounded-xl bg-white border-none"
                                        />
                                    </FormField>

                                    <FormField label="Remaining">
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
