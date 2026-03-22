import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";

export function EmploymentDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Profession Details"
            description="Current job or business details."
        >
            {formData.profession === "Job" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormInput
                        label="Company Name"
                        id="current_company_name"
                        value={formData.current_company_name || ""}
                        onChange={(e) => handleFieldChange("current_company_name", e.target.value)}
                        error={errors?.current_company_name}
                    />
                    <FormInput
                        label="Salary Account Bank"
                        id="salary_account_bank"
                        value={formData.salary_account_bank || ""}
                        onChange={(e) => handleFieldChange("salary_account_bank", e.target.value)}
                        error={errors?.salary_account_bank}
                    />
                    <FormInput
                        label="Savings Account Bank"
                        id="savings_account_bank"
                        value={formData.savings_account_bank || ""}
                        onChange={(e) => handleFieldChange("savings_account_bank", e.target.value)}
                        error={errors?.savings_account_bank}
                    />
                    <FormSelect
                        label="Job Tenure"
                        id="job_tenure"
                        value={formData.job_tenure || ""}
                        onChange={(v) => handleFieldChange("job_tenure", v)}
                        error={errors?.job_tenure}
                        options={[
                            { value: '0-12 months', label: '0-12 months' },
                            { value: '12-24 months', label: '12-24 months' },
                            { value: '24-60 months', label: '24-60 months' },
                            { value: 'more than 60 months', label: 'more than 60 months' },
                        ]}
                    />
                    <FormSelect
                        label="Total Experience"
                        id="job_experience"
                        value={formData.job_experience || ""}
                        onChange={(v) => handleFieldChange("job_experience", v)}
                        error={errors?.job_experience}
                        options={[
                            { value: 'less than 1 year', label: '< 1 year' },
                            { value: '1-2 years', label: '1-2 years' },
                            { value: '2-3 years', label: '2-3 years' },
                            { value: '3-5 years', label: '3-5 years' },
                            { value: 'more than 5 years', label: '> 5 years' },
                        ]}
                    />
                    <FormSelect
                        label="Monthly Income"
                        id="monthly_income"
                        value={formData.monthly_income || ""}
                        onChange={(v) => handleFieldChange("monthly_income", v)}
                        error={errors?.monthly_income}
                        options={[
                            { value: 'less than 12,000', label: 'less than 12,000' },
                            { value: '15,000 - 20,000', label: '15,000 - 20,000' },
                            { value: '20,000 - 25,000', label: '20,000 - 25,000' },
                            { value: '25-000 - 30,000', label: '25-000 - 30,000' },
                            { value: '30,000 - 35,000', label: '30,000 - 35,000' },
                            { value: '35,000 - 45,000', label: '35,000 - 45,000' },
                            { value: 'above 45,000', label: 'above 45,000' },
                        ]}
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Business Name"
                            id="company_name"
                            value={formData.company_name || ""}
                            onChange={(e) => handleFieldChange("company_name", e.target.value)}
                            error={errors?.company_name}
                        />
                        <FormSelect
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
                    </div>
                    <div className="bg-[#f8f9fc] p-6 rounded-2xl">
                        <Label className="text-sm font-semibold text-zinc-800 flex items-center gap-2 mb-4">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Business Registration <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                "GST registration",
                                "UDYOG Aadhar registration",
                                "Form-3 or trade licence",
                                "any other",
                                "I don't have any registration",
                            ].map((optionLabel) => (
                                <div key={optionLabel} className="flex items-center space-x-3 bg-white p-3 rounded-xl hover:bg-white/80 transition-colors cursor-pointer group shadow-sm">
                                    <Checkbox
                                        id={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                                        checked={formData.registration_paper?.includes(optionLabel) || false}
                                        onCheckedChange={(checked) => {
                                            const currentVals = formData.registration_paper || [];
                                            const newVals = checked 
                                                ? [...currentVals, optionLabel]
                                                : currentVals.filter(v => v !== optionLabel);
                                            handleFieldChange("registration_paper", newVals);
                                        }}
                                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                    />
                                    <Label
                                        htmlFor={`registration_paper_${optionLabel.replace(/\s+/g, "_").replace(/[\(\)]/g, "")}`}
                                        className="text-sm font-medium text-zinc-700 cursor-pointer flex-1"
                                    >
                                        {optionLabel}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors?.registration_paper && <p className="text-red-500 text-xs font-medium mt-3">{errors.registration_paper}</p>}
                    </div>
                </div>
            )}
        </FormSectionCard>
    );
}
