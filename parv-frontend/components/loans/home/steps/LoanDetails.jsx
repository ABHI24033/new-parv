import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LoanDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Loan & Property Details"
            description="Current loans and property information."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Have any current loan?</Label>
                    <RadioGroup
                        value={formData.has_current_loan}
                        onValueChange={(v) => handleFieldChange("has_current_loan", v)}
                        className="flex gap-4 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="curr_yes" />
                            <Label htmlFor="curr_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="curr_no" />
                            <Label htmlFor="curr_no">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                {formData.has_current_loan === "Yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full pt-4 border-t border-zinc-100">
                        <FormInput
                            required
                            label="Total Loan Amount"
                            id="total_loan_amount"
                            value={formData.total_loan_amount || ""}
                            onChange={(e) => handleFieldChange("total_loan_amount", e.target.value)}
                            error={errors?.total_loan_amount}
                        />
                        <FormInput
                            required
                            label="Loan Provider Bank"
                            id="loan_provider_bank"
                            value={formData.loan_provider_bank || ""}
                            onChange={(e) => handleFieldChange("loan_provider_bank", e.target.value)}
                            error={errors?.loan_provider_bank}
                        />
                        <FormInput
                            required
                            type="number"
                            label="Monthly EMI"
                            id="monthly_emi"
                            value={formData.monthly_emi || ""}
                            onChange={(e) => handleFieldChange("monthly_emi", e.target.value)}
                            error={errors?.monthly_emi}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Property for mortgage? <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.have_property_for_mortage}
                        onValueChange={(v) => handleFieldChange("have_property_for_mortage", v)}
                        className="flex gap-4 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="prop_yes" />
                            <Label htmlFor="prop_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="prop_no" />
                            <Label htmlFor="prop_no">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                <FormInput
                    required
                    label="Property Location"
                    id="property_location"
                    value={formData.property_location || ""}
                    onChange={(e) => handleFieldChange("property_location", e.target.value)}
                    error={errors?.property_location}
                />
                <FormInput
                    required
                    label="Property Owner"
                    id="who_own_property"
                    value={formData.who_own_property || ""}
                    onChange={(e) => handleFieldChange("who_own_property", e.target.value)}
                    error={errors?.who_own_property}
                />
            </div>
        </FormSectionCard>
    );
}
