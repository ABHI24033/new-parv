import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function PersonalDetails({ formData, handleFieldChange, errors }) {
    return (
        <FormSectionCard
            title="Personal Details"
            description="Basic applicant information."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                    required
                    label="Loan Amount"
                    type="number"
                    id="loan_amount"
                    value={formData.loan_amount || ""}
                    onChange={(e) => handleFieldChange("loan_amount", e.target.value)}
                    error={errors?.loan_amount}
                />
                <FormInput
                    required
                    label="Connector ID"
                    id="id_of_connector"
                    value={formData.id_of_connector || ""}
                    onChange={(e) => handleFieldChange("id_of_connector", e.target.value)}
                    error={errors?.id_of_connector}
                />
                <FormInput
                    required
                    label="DSA Name"
                    id="name_of_connector"
                    value={formData.name_of_connector || ""}
                    onChange={(e) => handleFieldChange("name_of_connector", e.target.value)}
                    error={errors?.name_of_connector}
                />
                <FormSelect
                    required
                    label="Loan Type"
                    id="loan_type"
                    value={formData.loan_type || ""}
                    onChange={(v) => handleFieldChange("loan_type", v)}
                    error={errors?.loan_type}
                    options={[
                        { label: "Purchase", value: "Purchase" },
                        { label: "Construction", value: "Construction" },
                        { label: "Renovation", value: "Renovation" },
                        { label: "Land Purchase", value: "Land Purchase" },
                    ]}
                />
                {/* <FormSelect
                    required
                    label="Purpose"
                    id="purpose_of_loan"
                    value={formData.purpose_of_loan || ""}
                    onChange={(v) => handleFieldChange("purpose_of_loan", v)}
                    error={errors?.purpose_of_loan}
                    options={[
                        "To purchase property", "For marrage at home", "For Education",
                        "To pay credit card bill", "To repay other loan", "To construct home",
                        "For other Personal reason"
                    ].map(p => ({ label: p, value: p }))}
                /> */}
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
                    label="Alt Phone"
                    type="tel"
                    id="alt_phone_no"
                    value={formData.alt_phone_no || ""}
                    onChange={(e) => handleFieldChange("alt_phone_no", e.target.value)}
                    error={errors?.alt_phone_no}
                />
                <FormInput
                    required
                    label="Email"
                    type="email"
                    id="email"
                    value={formData.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    error={errors?.email}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Marital Status <span className="text-red-500">*</span></Label>
                    <RadioGroup
                        value={formData.marital_status}
                        onValueChange={(v) => handleFieldChange("marital_status", v)}
                        className="mt-2 flex gap-6"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Married" id="married" />
                            <Label htmlFor="married">Married</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Unmarried" id="unmarried" />
                            <Label htmlFor="unmarried">Unmarried</Label>
                        </div>
                    </RadioGroup>
                    {errors?.marital_status && <p className="text-xs text-red-500 font-medium mt-1">{errors.marital_status}</p>}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Add Co-applicant?</Label>
                    <RadioGroup
                        value={formData.have_coapplicant}
                        onValueChange={(v) => handleFieldChange("have_coapplicant", v)}
                        className="mt-2 flex gap-6"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="co_yes" />
                            <Label htmlFor="co_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="co_no" />
                            <Label htmlFor="co_no">No</Label>
                        </div>
                    </RadioGroup>
                </div>

                {formData.have_coapplicant === "Yes" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-1 md:col-span-2 mt-4 p-4 rounded-xl border border-blue-50 bg-blue-50/20">
                        <FormInput
                            label="Co-applicant Name"
                            id="co_applicant_name"
                            value={formData.co_applicant_name || ""}
                            onChange={(e) => handleFieldChange("co_applicant_name", e.target.value)}
                            error={errors?.co_applicant_name}
                        />
                        <FormInput
                            label="Co-applicant DOB"
                            type="date"
                            id="co_applicant_dob"
                            value={formData.co_applicant_dob || ""}
                            onChange={(e) => handleFieldChange("co_applicant_dob", e.target.value)}
                            error={errors?.co_applicant_dob}
                        />
                        <FormSelect
                            label="Occupation"
                            id="co_occupation"
                            value={formData.co_occupation || ""}
                            onChange={(v) => handleFieldChange("co_occupation", v)}
                            error={errors?.co_occupation}
                            options={[
                                { label: "Job", value: "Job" },
                                { label: "Business", value: "Business" },
                                { label: "Others", value: "Others" },
                            ]}
                        />
                        <FormSelect
                            label="Relation"
                            id="relation_with_applicant"
                            value={formData.relation_with_applicant || ""}
                            onChange={(v) => handleFieldChange("relation_with_applicant", v)}
                            error={errors?.relation_with_applicant}
                            options={[
                                { label: "Mother", value: "Mother" },
                                { label: "Father", value: "Father" },
                                { label: "Spouse", value: "Spouse" },
                                { label: "Brother", value: "Brother" },
                            ]}
                        />
                    </div>
                )}
            </div>
        </FormSectionCard>
    );
}
