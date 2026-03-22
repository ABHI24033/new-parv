import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";

export function EmploymentDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Employment Details"
            description="Current job and workplace details."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                    required
                    label="Company Name"
                    id="current_company_name"
                    value={formData.current_company_name || ""}
                    onChange={(e) => handleFieldChange("current_company_name", e.target.value)}
                    error={errors?.current_company_name}
                />
                <FormInput
                    required
                    label="Designation"
                    id="designation"
                    value={formData.designation || ""}
                    onChange={(e) => handleFieldChange("designation", e.target.value)}
                    error={errors?.designation}
                />
                <FormInput
                    required
                    label="Salary Account Bank"
                    id="salary_account_bank"
                    value={formData.salary_account_bank || ""}
                    onChange={(e) => handleFieldChange("salary_account_bank", e.target.value)}
                    error={errors?.salary_account_bank}
                />
                <FormInput
                    required
                    label="Savings Account Bank"
                    id="savings_account_bank"
                    value={formData.savings_account_bank || ""}
                    onChange={(e) => handleFieldChange("savings_account_bank", e.target.value)}
                    error={errors?.savings_account_bank}
                />
                <FormSelect
                    required
                    label="Job Tenure"
                    id="job_tenure"
                    value={formData.job_tenure || ""}
                    onChange={(v) => handleFieldChange("job_tenure", v)}
                    error={errors?.job_tenure}
                    options={[
                        { label: "0-12 months", value: "0-12 months" },
                        { label: "1-3 years", value: "1-3 years" },
                        { label: "3-5 years", value: "3-5 years" },
                        { label: "more than 5 years", value: "more than 5 years" },
                    ]}
                />
                <FormSelect
                    required
                    label="Total Experience"
                    id="job_experience"
                    value={formData.job_experience || ""}
                    onChange={(v) => handleFieldChange("job_experience", v)}
                    error={errors?.job_experience}
                    options={[
                        { label: "less than 1 year", value: "less than 1 year" },
                        { label: "1-3 years", value: "1-3 years" },
                        { label: "3-5 years", value: "3-5 years" },
                        { label: "more than 5 years", value: "more than 5 years" },
                    ]}
                />
                <FormSelect
                    required
                    label="Monthly Income"
                    id="monthly_income"
                    value={formData.monthly_income || ""}
                    onChange={(v) => handleFieldChange("monthly_income", v)}
                    error={errors?.monthly_income}
                    options={[
                        { label: "less than 12,000", value: "less than 12,000" },
                        { label: "12,000-25,000", value: "12,000-25,000" },
                        { label: "25,000-50,000", value: "25,000-50,000" },
                        { label: "50,000-1,00,000", value: "50,000-1,00,000" },
                        { label: "more than 1,00,000", value: "more than 1,00,000" },
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                <FormInput
                    required
                    label="Office Building"
                    id="office_building_name"
                    value={formData.office_building_name || ""}
                    onChange={(e) => handleFieldChange("office_building_name", e.target.value)}
                    error={errors?.office_building_name}
                />
                <FormInput
                    required
                    label="Office Street"
                    id="office_street_name"
                    value={formData.office_street_name || ""}
                    onChange={(e) => handleFieldChange("office_street_name", e.target.value)}
                    error={errors?.office_street_name}
                />
                <FormInput
                    required
                    label="Office City"
                    id="office_city"
                    value={formData.office_city || ""}
                    onChange={(e) => handleFieldChange("office_city", e.target.value)}
                    error={errors?.office_city}
                />
                <FormInput
                    required
                    label="Office District"
                    id="office_district"
                    value={formData.office_district || ""}
                    onChange={(e) => handleFieldChange("office_district", e.target.value)}
                    error={errors?.office_district}
                />
                <FormInput
                    required
                    label="Office State"
                    id="office_state"
                    value={formData.office_state || ""}
                    onChange={(e) => handleFieldChange("office_state", e.target.value)}
                    error={errors?.office_state}
                />
                <FormInput
                    required
                    label="Office Pincode"
                    type="number"
                    id="office_pincode"
                    value={formData.office_pincode || ""}
                    onChange={(e) => handleFieldChange("office_pincode", e.target.value)}
                    error={errors?.office_pincode}
                />
            </div>
        </FormSectionCard>
    );
}
