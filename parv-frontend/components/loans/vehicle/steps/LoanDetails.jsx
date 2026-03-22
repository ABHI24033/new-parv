import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, MinusIcon, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoanDetails({ formData, setFormData, handleFieldChange, errors, loanHistory, handleAddEntry, handleRemoveEntry, loanHistoryHandleChange }) {
    
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
        <FormSectionCard
            title="Financial Details"
            description="Current accounts and bank information."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label className="font-semibold text-zinc-700">Have current account?</Label>
                    <RadioGroup
                        value={formData.have_current_account}
                        onValueChange={(v) => handleFieldChange("have_current_account", v)}
                        className="flex gap-4 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="curr_yes" />
                            <Label htmlFor="curr_yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="curr_no" />
                            <Label htmlFor="curr_no" className="cursor-pointer">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                {formData.have_current_account === "Yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full">
                        <FormInput
                            label="Bank Name"
                            id="current_account_bank_name"
                            value={formData.current_account_bank_name || ""}
                            onChange={(e) => handleFieldChange("current_account_bank_name", e.target.value)}
                            error={errors?.current_account_bank_name}
                        />
                        <FormInput
                            label="Turnover"
                            id="current_account_turnover"
                            value={formData.current_account_turnover || ""}
                            onChange={(e) => handleFieldChange("current_account_turnover", e.target.value)}
                            error={errors?.current_account_turnover}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full pt-4 border-t border-zinc-100">
                    <FormInput
                        required
                        label="Saving Account Bank"
                        id="saving_account_bank_name"
                        value={formData.saving_account_bank_name || ""}
                        onChange={(e) => handleFieldChange("saving_account_bank_name", e.target.value)}
                        error={errors?.saving_account_bank_name}
                    />
                    <FormSelect
                        label="Savings Turnover"
                        id="saving_account_turnover"
                        value={formData.saving_account_turnover || ""}
                        onChange={(v) => handleFieldChange("saving_account_turnover", v)}
                        error={errors?.saving_account_turnover}
                        options={[
                            { label: "Less than 10 lakhs", value: "Less than 10 lakhs" },
                            { label: "10-20 lakhs", value: "10-20 lakhs" },
                            { label: "20-50 lakhs", value: "20-50 lakhs" },
                            { label: "50-1 crore", value: "50-1 crore" },
                            { label: "above 1 crore", value: "above 1 crore" },
                        ]}
                    />
                </div>
            </div>
            
            <div className="mt-8 border-t border-zinc-100 pt-8" />
            <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-800 tracking-tight">Asset Information</h3>
                <p className="text-sm text-zinc-500 mt-1">Details about property for mortgage or land holding.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label className="font-semibold text-zinc-700">Mortgage Property?</Label>
                    <RadioGroup
                        value={formData.have_property_for_mortage}
                        onValueChange={(v) => handleFieldChange("have_property_for_mortage", v)}
                        className="flex gap-4 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="prop_mort_yes" />
                            <Label htmlFor="prop_mort_yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="prop_mort_no" />
                            <Label htmlFor="prop_mort_no" className="cursor-pointer">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                
                <div>
                    <Label className="font-semibold text-zinc-700">Hectare Agri Land?</Label>
                    <RadioGroup
                        value={formData.have_17_kahta_agri_land}
                        onValueChange={(v) => handleFieldChange("have_17_kahta_agri_land", v)}
                        className="flex gap-4 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="v_land_17_yes" />
                            <Label htmlFor="v_land_17_yes" className="cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="v_land_17_no" />
                            <Label htmlFor="v_land_17_no" className="cursor-pointer">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
                    <FormSelect
                        label="Location"
                        id="property_location"
                        value={formData.property_location || ""}
                        onChange={(v) => handleFieldChange("property_location", v)}
                        error={errors?.property_location}
                        options={[
                            { label: "Gram panchayat", value: "Gram panchayat" },
                            { label: "Nagar panchayat", value: "Nagar panchayat" },
                            { label: "Nagar Parishad", value: "Nagar Parishad" },
                            { label: "Nagar Nigam", value: "Nagar Nigam" },
                        ]}
                    />
                    <FormSelect
                        label="Property Owner"
                        id="who_own_property"
                        value={formData.who_own_property || ""}
                        onChange={(v) => handleFieldChange("who_own_property", v)}
                        error={errors?.who_own_property}
                        options={[
                            { label: "Myself", value: "Myself" },
                            { label: "Father", value: "Father" },
                            { label: "Mother", value: "Mother" },
                            { label: "Spouse", value: "Spouse" },
                            { label: "Grand father", value: "Grand father" },
                            { label: "Grand mother", value: "Grand mother" },
                            { label: "Other", value: "Other" },
                        ]}
                    />
                </div>

                <div className="col-span-full">
                    <Label className="font-semibold text-zinc-700">Available documents for the property</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {['Khatiyan', 'Sale deed', 'LPC certificate', 'Current rashid'].map(optionLabel => (
                            <div key={optionLabel} className="flex items-center space-x-3 bg-[#f8f9fc] p-4 rounded-xl shadow-sm border border-zinc-100 cursor-pointer">
                                <Checkbox
                                    id={`v_needs_of_documents_${optionLabel.replace(/\s+/g, '_')}`}
                                    checked={formData.needs_of_documents?.includes(optionLabel) || false}
                                    onCheckedChange={(checked) => handleMultiOptionChange("needs_of_documents", optionLabel, checked)}
                                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor={`v_needs_of_documents_${optionLabel.replace(/\s+/g, '_')}`} className="text-sm font-semibold text-zinc-700 cursor-pointer flex-1">
                                    {optionLabel}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-zinc-100 pt-8" />
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-zinc-800 tracking-tight flex items-center gap-2">
                            <History className="w-5 h-5 text-blue-600" />
                            Previous Loan History
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 italic">Provide details of any past loans, if applicable.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={handleAddEntry} className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50">
                            <PlusIcon className="w-4 h-4 mr-2" /> Add Entry
                        </Button>
                        {loanHistory?.length > 1 && (
                            <Button type="button" variant="outline" size="sm" onClick={() => handleRemoveEntry(loanHistory.length - 1)} className="rounded-xl border-red-200 text-red-600 hover:bg-red-50">
                                <MinusIcon className="w-4 h-4 mr-2" /> Remove
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {loanHistory?.map((entry, index) => (
                        <div key={index} className="bg-[#f8f9fc] p-6 border border-zinc-100 rounded-2xl relative">
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-md">
                                {index + 1}
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormInput
                                    label="Bank Name"
                                    id={`loan_provider_bank_${index}`}
                                    name="loan_provider_bank"
                                    value={entry.loan_provider_bank}
                                    onChange={(e) => loanHistoryHandleChange(index, e)}
                                    placeholder="Bank Name"
                                />
                                <FormInput
                                    label="Loan Amount"
                                    id={`total_loan_amount_${index}`}
                                    name="total_loan_amount"
                                    type="number"
                                    value={entry.total_loan_amount}
                                    onChange={(e) => loanHistoryHandleChange(index, e)}
                                    placeholder="Sanctioned amount"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Current EMI"
                                        id={`current_emi_${index}`}
                                        name="current_emi"
                                        type="number"
                                        value={entry.current_emi}
                                        onChange={(e) => loanHistoryHandleChange(index, e)}
                                        placeholder="EMI"
                                    />
                                    <FormInput
                                        label="Remaining"
                                        id={`remaining_amount_${index}`}
                                        name="remaining_amount"
                                        type="number"
                                        value={entry.remaining_amount}
                                        onChange={(e) => loanHistoryHandleChange(index, e)}
                                        placeholder="Balance"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FormSectionCard>
    );
}
