import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export function LoanDetails({ formData, handleFieldChange, errors, loanHistory, setLoanHistory, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const handleAddEntry = () => {
        setLoanHistory([...loanHistory, {
            loan_provider_bank: "",
            total_loan_amount: "",
            current_emi: "",
            remaining_amount: "",
        }]);
    };

    const handleRemoveEntry = (index) => {
        const updatedHistory = [...loanHistory];
        updatedHistory.splice(index, 1);
        setLoanHistory(updatedHistory);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedHistory = [...loanHistory];
        updatedHistory[index][name] = value;
        setLoanHistory(updatedHistory);
    };

    return (
        <FormSectionCard
            title="Loan Details"
            description="Tax profile, assets, and previous loan entries."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Family files tax? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.is_family_files_income_tax}
                        onValueChange={(v) => handleFieldChange("is_family_files_income_tax", v)}
                        className="mt-2 flex gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="fam_yes" />
                            <Label htmlFor="fam_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="fam_no" />
                            <Label htmlFor="fam_no">No</Label>
                        </div>
                    </RadioGroup>
                    {errors?.is_family_files_income_tax && <p className="text-xs text-red-500 font-medium mt-1">{errors.is_family_files_income_tax}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Do you file income tax? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.file_income_tax}
                        onValueChange={(v) => handleFieldChange("file_income_tax", v)}
                        className="mt-2 flex gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="itr_yes" />
                            <Label htmlFor="itr_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="itr_no" />
                            <Label htmlFor="itr_no">No</Label>
                        </div>
                    </RadioGroup>
                    {errors?.file_income_tax && <p className="text-xs text-red-500 font-medium mt-1">{errors.file_income_tax}</p>}
                </div>

                <FormSelect
                    label="Property Location"
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
                        { label: "Other", value: "Other" },
                    ]}
                />
            </div>

            {formData.file_income_tax === "Yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                    <div className="space-y-2">
                        <Label className="font-semibold text-zinc-700">ITR Upload 1</Label>
                        <FormFileUpload
                            id="itr_1_upload"
                            label="ITR-1"
                            value={formData.itr_1_upload}
                            error={errors?.itr_1_upload}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            isRemoving={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-semibold text-zinc-700">ITR Upload 2</Label>
                        <FormFileUpload
                            id="itr_2_upload"
                            label="ITR-2"
                            value={formData.itr_2_upload}
                            error={errors?.itr_2_upload}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            isRemoving={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </div>
                </div>
            )}

            <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-zinc-800">Previous Loan History</h4>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddEntry}>+ Add Entry</Button>
                </div>
                {loanHistory?.map((entry, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 relative group">
                        <FormInput
                            placeholder="Bank Name"
                            name="loan_provider_bank"
                            value={entry.loan_provider_bank}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Loan Amount"
                            name="total_loan_amount"
                            value={entry.total_loan_amount}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Current EMI"
                            name="current_emi"
                            value={entry.current_emi}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Remaining"
                            name="remaining_amount"
                            value={entry.remaining_amount}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <div className="flex items-end justify-start lg:justify-end">
                            {(loanHistory?.length || 0) > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleRemoveEntry(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </FormSectionCard>
    );
}
