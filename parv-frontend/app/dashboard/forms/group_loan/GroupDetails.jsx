import React from 'react'
import { groupLoanSchema } from './formValidation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const GroupDetails = ({ formData, setFormData, errors, setErrors }) => {

    const handleFieldChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
        // validate only this field (safe + no blocking)
        const result = groupLoanSchema.pick({ [fieldName]: true }).safeParse({ [fieldName]: value });

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!result.success) {
                newErrors[fieldName] = result.error.errors[0].message;
            } else {
                delete newErrors[fieldName];
            }
            return newErrors;
        });
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Loan Information" description="Basic details about the group loan requirement.">
                    <FormField label="Loan Amount" error={errors?.loan_amount} required>
                        <Input
                            id="loan_amount"
                            type="number"
                            onChange={(e) => handleFieldChange("loan_amount", e.target.value)}
                            value={formData?.loan_amount}
                            placeholder="Enter amount"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="DSA & Connector" required>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                id="id_of_connector"
                                onChange={(e) => handleFieldChange("id_of_connector", e.target.value)}
                                value={formData?.id_of_connector}
                                placeholder="ID"
                                className="h-11 rounded-xl border-none"
                            />
                            <Input
                                id="name_of_connector"
                                onChange={(e) => handleFieldChange("name_of_connector", e.target.value)}
                                value={formData?.name_of_connector}
                                placeholder="Name"
                                className="h-11 rounded-xl border-none"
                            />
                        </div>
                    </FormField>

                    <FormField label="Nearest Branch" error={errors?.nearest_branch} required>
                        <Select
                            value={formData?.nearest_branch}
                            onValueChange={(value) => handleFieldChange('nearest_branch', value)}
                        >
                            <SelectTrigger className="h-11 rounded-xl border-none">
                                <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "Bikramganj", label: "Bikramganj" },
                                    { value: "Sasaram", label: "Sasaram" },
                                    { value: "Dehri", label: "Dehri" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Group Name" error={errors?.group_name} required>
                            <Input
                                id="group_name"
                                onChange={(e) => handleFieldChange("group_name", e.target.value)}
                                value={formData?.group_name}
                                placeholder="Enter name"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>

                        <FormField label="Group Size" error={errors?.group_size} required>
                            <Select
                                value={formData?.group_size}
                                onValueChange={(val) => handleFieldChange("group_size", val)}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-none text-zinc-500">
                                    <SelectValue placeholder="Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 15 }, (_, i) => (i + 1).toString()).map((val) => (
                                        <SelectItem key={val} value={val}>{val}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>
                </FormSection>

                <FormSection title="Group Address" description="The primary location for group meetings and operations.">
                    <FormField label="Village / Area" error={errors?.group_village} required>
                        <Input
                            id="group_village"
                            onChange={(e) => handleFieldChange("group_village", e.target.value)}
                            value={formData?.group_village}
                            placeholder="Village name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="Post Office" error={errors?.group_post} required>
                            <Input
                                id="group_post"
                                onChange={(e) => handleFieldChange("group_post", e.target.value)}
                                value={formData?.group_post}
                                placeholder="Enter post"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>
                        <FormField label="Police Station" error={errors?.group_police_station} required>
                            <Input
                                id="group_police_station"
                                onChange={(e) => handleFieldChange("group_police_station", e.target.value)}
                                value={formData?.group_police_station}
                                placeholder="Enter station"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField label="District" error={errors?.group_district} required>
                            <Input
                                id="group_district"
                                onChange={(e) => handleFieldChange("group_district", e.target.value)}
                                value={formData?.group_district}
                                placeholder="District"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>
                        <FormField label="Pincode" error={errors?.group_pincode} required>
                            <Input
                                id="group_pincode"
                                onChange={(e) => handleFieldChange("group_pincode", e.target.value)}
                                value={formData?.group_pincode}
                                placeholder="6-digit"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>
                    </div>
                </FormSection>
            </div>
        </div>
    )
}

export default GroupDetails;