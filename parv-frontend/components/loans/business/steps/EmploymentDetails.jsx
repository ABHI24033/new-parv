import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function EmploymentDetails({ formData, handleFieldChange, errors }) {
    const handleRegistrationChange = (item, isChecked) => {
        const current = formData.registration_paper || [];
        const next = isChecked ? [...current, item] : current.filter((x) => x !== item);
        handleFieldChange("registration_paper", next);
    };

    return (
        <FormSectionCard
            title="Employment / Business Details"
            description="Conditional sections based on employment type."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormSelect
                    label="Employment Type"
                    id="employment_type"
                    value={formData.employment_type || ""}
                    onChange={(v) => handleFieldChange("employment_type", v)}
                    error={errors?.employment_type}
                    options={[
                        { label: "Self Employed", value: "Self Employed" },
                        { label: "Salaried", value: "Salaried" },
                    ]}
                />
            </div>

            {formData.employment_type === "Self Employed" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                    <FormInput
                        required
                        label="Company Name"
                        id="company_name"
                        value={formData.company_name || ""}
                        onChange={(e) => handleFieldChange("company_name", e.target.value)}
                        error={errors?.company_name}
                    />
                    <FormSelect
                        required
                        label="Business Vintage"
                        id="company_age"
                        value={formData.company_age || ""}
                        onChange={(v) => handleFieldChange("company_age", v)}
                        error={errors?.company_age}
                        options={[
                            { label: "0-1 years", value: "0-1 years" },
                            { label: "1-3 years", value: "1-3 years" },
                            { label: "3-5 years", value: "3-5 years" },
                            { label: "more than 5 years", value: "more than 5 years" },
                        ]}
                    />
                    <FormInput
                        required
                        label="Saving Account Bank"
                        id="saving_account_bank_name"
                        value={formData.saving_account_bank_name || ""}
                        onChange={(e) => handleFieldChange("saving_account_bank_name", e.target.value)}
                        error={errors?.saving_account_bank_name}
                    />
                    <FormSelect
                        required
                        label="Saving Turnover"
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

                    <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
                        <Label className="font-semibold text-zinc-700">Current Account? <span className="text-red-500">*</span></Label>
                        <RadioGroup
                            value={formData.have_current_account}
                            onValueChange={(v) => handleFieldChange("have_current_account", v)}
                            className="mt-2 flex gap-4"
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

                    {formData.have_current_account === "Yes" && (
                        <FormInput
                            required
                            label="Current Account Bank"
                            id="current_account_bank_name"
                            value={formData.current_account_bank_name || ""}
                            onChange={(e) => handleFieldChange("current_account_bank_name", e.target.value)}
                            error={errors?.current_account_bank_name}
                        />
                    )}
                </div>
            )}

            <div className="pt-4 border-t border-zinc-100">
                <Label className="font-semibold text-zinc-700">
                    Business Registration <span className="text-red-500">*</span>
                </Label>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        "GST registration",
                        "UDYOG AAdhar registration",
                        "Form-3 or trade licence",
                        "any other",
                        "I don't have any registration",
                    ].map((item) => {
                        const checked = formData.registration_paper?.includes(item) || false;
                        return (
                            <label
                                key={item}
                                className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 text-sm cursor-pointer hover:bg-zinc-50 transition-colors"
                            >
                                <Checkbox
                                    checked={checked}
                                    onCheckedChange={(isChecked) => handleRegistrationChange(item, isChecked)}
                                />
                                <span className="font-medium text-zinc-700">{item}</span>
                            </label>
                        );
                    })}
                </div>
                {errors?.registration_paper && (
                    <p className="text-xs text-red-500 font-medium mt-2">{errors.registration_paper}</p>
                )}
            </div>
        </FormSectionCard>
    );
}
