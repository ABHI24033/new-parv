import React from 'react';
import { validateFields } from './formValidation';
import { PlusIcon, MinusIcon, Landmark, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Account Details" description="Your primary bank details.">
                    <FormField label="Bank Name" error={errors?.saving_account_bank_name} required>
                        <Input
                            id="saving_account_bank_name"
                            onChange={(e) => handleFieldChange("saving_account_bank_name", e.target.value)}
                            value={formData?.saving_account_bank_name}
                            placeholder="Enter bank name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Annual Turnover" error={errors?.saving_account_turnover} required>
                        <Select
                            value={formData?.saving_account_turnover}
                            onValueChange={(value) => handleFieldChange("saving_account_turnover", value)}
                        >
                            <SelectTrigger className="h-11 rounded-xl border-none">
                                <SelectValue placeholder="Select turnover" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "Less than 10 lakhs", label: "Less than 10 lakhs" },
                                    { value: "10-20 lakhs", label: "10-20 lakhs" },
                                    { value: "20-50 lakhs", label: "20-50 lakhs" },
                                    { value: "50-1 crore", label: "50-1 crore" },
                                    { value: "above 1 crore", label: "above 1 crore" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </FormSection>

                <FormSection title="Previous loans" description="Details of past loans.">
                    <div className="col-span-full flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-xs text-gray-500 font-medium italic">
                                Add details of any active or past loans.
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
                            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative pt-6">
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-bold uppercase">
                                    Loan #{index + 1}
                                </div>
                                {loanHistory.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEntry(index)}
                                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
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
                                    <FormField label="Amount" className="col-span-1">
                                        <Input
                                            name="total_loan_amount"
                                            type="number"
                                            onChange={(e) => loanHistoryHandleChange(index, e)}
                                            value={entry.total_loan_amount}
                                            placeholder="Eg. 50000"
                                            className="h-9 text-xs border-none"
                                        />
                                    </FormField>
                                </div>
                            </div>
                        ))}
                    </div>
                </FormSection>
            </div>
        </div>
    );
};

export default Employment;
