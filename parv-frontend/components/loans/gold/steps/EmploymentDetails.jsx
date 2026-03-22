import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";

export function EmploymentDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Employment Details"
            description="Current job and workplace details."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    required
                    label="Saving Account Bank"
                    id="saving_account_bank_name"
                    value={formData.saving_account_bank_name || ""}
                    onChange={(e) => handleFieldChange("saving_account_bank_name", e.target.value)}
                    error={errors?.saving_account_bank_name}
                />
                <FormInput
                    required
                    label="Saving Account Turnover"
                    id="saving_account_turnover"
                    value={formData.saving_account_turnover || ""}
                    onChange={(e) => handleFieldChange("saving_account_turnover", e.target.value)}
                    error={errors?.saving_account_turnover}
                />
            </div>
        </FormSectionCard>
    );
}
