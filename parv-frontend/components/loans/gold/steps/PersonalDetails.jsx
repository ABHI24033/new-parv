import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";

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
                    label="PAN"
                    id="pan"
                    className="uppercase"
                    value={formData.pan || ""}
                    onChange={(e) => handleFieldChange("pan", e.target.value.toUpperCase())}
                    error={errors?.pan}
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
        </FormSectionCard>
    );
}
