import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { ConnectorSelector } from "@/components/forms/reusable/ConnectorSelector";

export function PersonalDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Personal Details"
            description="Vehicle choice and basic information."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormSelect
                    required
                    label="Which Vehicle?"
                    id="which_vehicle"
                    value={formData.which_vehicle || ""}
                    onChange={(v) => handleFieldChange("which_vehicle", v)}
                    error={errors?.which_vehicle}
                    options={[
                        { value: 'two_wheeler_loan', label: 'Two wheeler loan' },
                        { value: 'new_car_loan', label: 'New car loan' },
                        { value: 'light_commercial_vehicle_loan', label: 'Light commercial vehicle loan' },
                        { value: 'heavy_commercial_vehicle_loan', label: 'Heavy commercial vehicle loan' },
                        { value: 'tractor_loan', label: 'Tractor Loan' },
                        { value: 'old_vehicle_purchase', label: 'Old vehicle purchase' },
                        { value: 'vehicle_refinance', label: 'Vehicle Refinance' },
                    ]}
                />
                <FormSelect
                    required
                    label="When to Purchase?"
                    id="when_purchase"
                    value={formData.when_purchase || ""}
                    onChange={(v) => handleFieldChange("when_purchase", v)}
                    error={errors?.when_purchase}
                    options={[
                        { label: "Immediately", value: "Immediately" },
                        { label: "Within 1 month", value: "Within 1 month" },
                        { label: "1-3 months", value: "1-3 months" },
                    ]}
                />
                <FormSelect
                    required
                    label="Estimated Cost"
                    id="estimated_cost"
                    value={formData.estimated_cost || ""}
                    onChange={(v) => handleFieldChange("estimated_cost", v)}
                    error={errors?.estimated_cost}
                    options={[
                        { value: '50 thousand-1 lakh', label: '50 thousand-1 lakh' },
                        { value: '1-5 lakhs', label: '1-5 lakhs' },
                        { value: '5-10 lakhs', label: '5-10 lakhs' },
                        { value: '10-15 lakhs', label: '10-15 lakhs' },
                        { value: '15-20 lakhs', label: '15-20 lakhs' },
                        { value: '20-30 lakhs', label: '20-30 lakhs' },
                        { value: '30-50 lakhs', label: '30-50 lakhs' },
                        { value: 'more than 50 lakhs', label: 'more than 50 lakhs' },
                    ]}
                />
                <FormSelect
                    required
                    label="Loan Required"
                    id="loan_you_need"
                    value={formData.loan_you_need || ""}
                    onChange={(v) => handleFieldChange("loan_you_need", v)}
                    error={errors?.loan_you_need}
                    options={[
                        { value: '20 thousand-1 lakh', label: '20 thousand-1 lakh' },
                        { value: '1-3 lakhs', label: '1-3 lakhs' },
                        { value: '3-5 lakhs', label: '3-5 lakhs' },
                        { value: '5-10 lakhs', label: '5-10 lakhs' },
                        { value: '10-12 lakhs', label: '10-12 lakhs' },
                        { value: '12-20 lakhs', label: '12-20 lakhs' },
                        { value: '20-30 lakhs', label: '20-30 lakhs' },
                        { value: '30-50 lakhs', label: '30-50 lakhs' },
                        { value: 'more than 50 lakhs', label: 'more than 50 lakhs' },
                    ]}
                />
                <FormSelect
                    required
                    label="Profession"
                    id="profession"
                    value={formData.profession || ""}
                    onChange={(v) => handleFieldChange("profession", v)}
                    error={errors?.profession}
                    options={[
                        { label: "Job", value: "Job" },
                        { label: "Business", value: "Business" },
                    ]}
                />
                <FormInput
                    required
                    label="Applicant Name"
                    id="applicant_name"
                    value={formData.applicant_name || ""}
                    onChange={(e) => handleFieldChange("applicant_name", e.target.value)}
                    error={errors?.applicant_name}
                />
                <FormInput
                    required
                    label="Father's Name"
                    id="fathers_name"
                    value={formData.fathers_name || ""}
                    onChange={(e) => handleFieldChange("fathers_name", e.target.value)}
                    error={errors?.fathers_name}
                />
                <FormInput
                    required
                    label="Mother's Name"
                    id="mothers_name"
                    value={formData.mothers_name || ""}
                    onChange={(e) => handleFieldChange("mothers_name", e.target.value)}
                    error={errors?.mothers_name}
                />
                <FormInput
                    required
                    label="Phone"
                    type="tel"
                    id="phone_no"
                    value={formData.phone_no || ""}
                    onChange={(e) => handleFieldChange("phone_no", e.target.value)}
                    error={errors?.phone_no}
                />
                <FormInput
                    required
                    label="PAN"
                    id="pan"
                    className="uppercase"
                    value={formData.pan || ""}
                    onChange={(e) => handleFieldChange("pan", e.target.value.toUpperCase())}
                    error={errors?.pan}
                />
                <FormInput
                    required
                    label="Aadhar"
                    type="number"
                    id="aadhar"
                    value={formData.aadhar || ""}
                    onChange={(e) => handleFieldChange("aadhar", e.target.value)}
                    error={errors?.aadhar}
                />
                <FormInput
                    required
                    label="DOB"
                    type="date"
                    id="dob"
                    value={formData.dob || ""}
                    onChange={(e) => handleFieldChange("dob", e.target.value)}
                    error={errors?.dob}
                />
                <FormInput
                    label="Email Address"
                    type="email"
                    id="email"
                    value={formData.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    error={errors?.email}
                />
                <FormInput
                    label="Alt Phone"
                    type="tel"
                    id="alt_phone_no"
                    value={formData.alt_phone_no || ""}
                    onChange={(e) => handleFieldChange("alt_phone_no", e.target.value)}
                    error={errors?.alt_phone_no}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                <FormInput
                    required
                    label="Loan Amount"
                    type="number"
                    id="loan_amount"
                    value={formData.loan_amount || ""}
                    onChange={(e) => handleFieldChange("loan_amount", e.target.value)}
                    error={errors?.loan_amount}
                />
                <ConnectorSelector 
                    formData={formData} 
                    handleFieldChange={handleFieldChange} 
                    errors={errors} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                <div className="space-y-2">
                    <label className="font-semibold text-zinc-700 text-sm">Marital Status <span className="text-red-500">*</span></label>
                    <div className="flex gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="marital_status"
                                value="Married"
                                checked={formData.marital_status === "Married"}
                                onChange={(e) => handleFieldChange("marital_status", e.target.value)}
                                className="w-4 h-4 text-primary"
                            />
                            <span className="text-sm">Married</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="marital_status"
                                value="Unmarried"
                                checked={formData.marital_status === "Unmarried"}
                                onChange={(e) => handleFieldChange("marital_status", e.target.value)}
                                className="w-4 h-4 text-primary"
                            />
                            <span className="text-sm">Unmarried</span>
                        </label>
                    </div>
                </div>

                {formData.marital_status === "Married" && (
                    <FormInput
                        required
                        label="Spouse Name"
                        id="spouse_name"
                        value={formData.spouse_name || ""}
                        onChange={(e) => handleFieldChange("spouse_name", e.target.value)}
                        error={errors?.spouse_name}
                    />
                )}
            </div>
        </FormSectionCard>
    );
}
