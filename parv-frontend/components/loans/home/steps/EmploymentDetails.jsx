import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function EmploymentDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Profession Details"
            description="Current job or business details."
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Profession Type <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.profession}
                        onValueChange={(v) => handleFieldChange("profession", v)}
                        className="flex gap-6 mt-2"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Job" id="prof_job" />
                            <Label htmlFor="prof_job">Job</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Business" id="prof_biz" />
                            <Label htmlFor="prof_biz">Business</Label>
                        </div>
                    </RadioGroup>
                </div>

                {formData.profession === "Job" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                        <FormInput
                            required
                            label="Business Name"
                            id="company_name"
                            value={formData.company_name || ""}
                            onChange={(e) => handleFieldChange("company_name", e.target.value)}
                            error={errors?.company_name}
                        />
                        <FormInput
                            required
                            label="Business Age"
                            id="company_age"
                            value={formData.company_age || ""}
                            onChange={(e) => handleFieldChange("company_age", e.target.value)}
                            error={errors?.company_age}
                        />
                    </div>
                )}
            </div>
        </FormSectionCard>
    );
}
