import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validateFields } from './formValidation';
import { Input } from '@/components/ui/input';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PersonalDetails = ({ formData, setFormData, errors, setErrors }) => {

    const handleFieldChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
        const fieldValidation = validateFields({ ...formData, [fieldName]: value }, [fieldName]);
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (!fieldValidation[fieldName]) {
                delete newErrors[fieldName];
            } else {
                newErrors[fieldName] = fieldValidation[fieldName];
            }
            return newErrors;
        });
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Box 1: Personal Details */}
                <FormSection title="Personal Information" description="Basic details of the applicant.">
                    <FormField label="Loan Amount" error={errors?.loan_amount} required>
                        <Input
                            id="loan_amount"
                            type="number"
                            onChange={(e) => handleFieldChange("loan_amount", e.target.value)}
                            value={formData?.loan_amount}
                            placeholder="Enter loan amount"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Connector ID" error={errors?.id_of_connector} required>
                        <Input
                            id="id_of_connector"
                            onChange={(e) => handleFieldChange("id_of_connector", e.target.value)}
                            value={formData?.id_of_connector}
                            placeholder="Enter connector ID"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="DSA Name" error={errors?.name_of_connector} required className="md:col-span-2">
                        <Input
                            id="name_of_connector"
                            onChange={(e) => handleFieldChange("name_of_connector", e.target.value)}
                            value={formData?.name_of_connector}
                            placeholder="Enter DSA name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Applicant Name" error={errors?.applicant_name} required>
                        <Input
                            id="applicant_name"
                            onChange={(e) => handleFieldChange("applicant_name", e.target.value)}
                            value={formData?.applicant_name}
                            placeholder="Enter full name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Father's Name" error={errors?.fathers_name} required>
                        <Input
                            id="fathers_name"
                            onChange={(e) => handleFieldChange("fathers_name", e.target.value)}
                            value={formData?.fathers_name}
                            placeholder="Enter father's name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Mother's Name" error={errors?.mothers_name} required>
                        <Input
                            id="mothers_name"
                            onChange={(e) => handleFieldChange("mothers_name", e.target.value)}
                            value={formData?.mothers_name}
                            placeholder="Enter mother's name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Phone Number" error={errors?.phone_no} required>
                        <Input
                            id="phone_no"
                            type="tel"
                            onChange={(e) => handleFieldChange("phone_no", e.target.value)}
                            value={formData?.phone_no}
                            placeholder="Enter phone number"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Date of Birth" error={errors?.dob} required>
                        <Input
                            id="dob"
                            type="date"
                            onChange={(e) => handleFieldChange("dob", e.target.value)}
                            value={formData?.dob}
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="PAN Number" error={errors?.pan} required>
                        <Input
                            id="pan"
                            onChange={(e) => handleFieldChange("pan", e.target.value)}
                            value={formData?.pan}
                            placeholder="ABCDE1234F"
                            className="h-11 rounded-xl border-none uppercase"
                        />
                    </FormField>

                    <FormField label="Marital Status" error={errors?.marital_status} required>
                        <RadioGroup
                            value={formData?.marital_status}
                            onValueChange={(value) => handleFieldChange("marital_status", value)}
                            className="flex gap-4 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Married" id="married" />
                                <Label htmlFor="married" className="cursor-pointer">Married</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Unmarried" id="unmarried" />
                                <Label htmlFor="unmarried" className="cursor-pointer">Unmarried</Label>
                            </div>
                        </RadioGroup>
                    </FormField>

                    {formData.marital_status === "Married" && (
                        <FormField label="Spouse Name" error={errors?.spouse_name} required className="md:col-span-2">
                            <Input
                                id="spouse_name"
                                onChange={(e) => handleFieldChange("spouse_name", e.target.value)}
                                value={formData?.spouse_name}
                                placeholder="Enter spouse name"
                                className="h-11 rounded-xl border-none"
                            />
                        </FormField>
                    )}
                </FormSection>

                {/* Box 2: Permanent Address */}
                <FormSection title="Permanent Address" description="Address provided in your legal documents.">
                    <FormField label="Building/House Name" error={errors?.permanent_building_name} required>
                        <Input
                            id="permanent_building_name"
                            onChange={(e) => handleFieldChange("permanent_building_name", e.target.value)}
                            value={formData?.permanent_building_name}
                            placeholder="Enter building name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Street/Road Name" error={errors?.permanent_street_name} required>
                        <Input
                            id="permanent_street_name"
                            onChange={(e) => handleFieldChange("permanent_street_name", e.target.value)}
                            value={formData?.permanent_street_name}
                            placeholder="Enter street name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Landmark" error={errors?.permanent_landmark} required>
                        <Input
                            id="permanent_landmark"
                            onChange={(e) => handleFieldChange("permanent_landmark", e.target.value)}
                            value={formData?.permanent_landmark}
                            placeholder="Enter landmark"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="City" error={errors?.permanent_city} required>
                        <Input
                            id="permanent_city"
                            onChange={(e) => handleFieldChange("permanent_city", e.target.value)}
                            value={formData?.permanent_city}
                            placeholder="Enter city"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="District" error={errors?.permanent_district} required>
                        <Input
                            id="permanent_district"
                            onChange={(e) => handleFieldChange("permanent_district", e.target.value)}
                            value={formData?.permanent_district}
                            placeholder="Enter district"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="State" error={errors?.permanent_state} required>
                        <Input
                            id="permanent_state"
                            onChange={(e) => handleFieldChange("permanent_state", e.target.value)}
                            value={formData?.permanent_state}
                            placeholder="Enter state"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Pincode" error={errors?.permanent_pincode} required>
                        <Input
                            id="permanent_pincode"
                            onChange={(e) => handleFieldChange("permanent_pincode", e.target.value)}
                            value={formData?.permanent_pincode}
                            placeholder="Enter pincode"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                </FormSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Box 3: Present Address */}
                <FormSection title="Present Address" description="Address where you are staying currently.">
                    <div className="col-span-full mb-4">
                        <div className="flex items-center space-x-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100 w-full shadow-sm">
                            <Checkbox
                                id="same_as_permanent_address"
                                checked={formData.same_as_permanent_address}
                                onCheckedChange={(checked) => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        same_as_permanent_address: checked,
                                        ...(checked && {
                                            present_building_name: prev.permanent_building_name,
                                            present_street_name: prev.permanent_street_name,
                                            present_landmark: prev.permanent_landmark,
                                            present_city: prev.permanent_city,
                                            present_district: prev.permanent_district,
                                            present_state: prev.permanent_state,
                                            present_pincode: prev.permanent_pincode,
                                        }),
                                    }));
                                    if (checked) {
                                        setErrors((prevErrors) => {
                                            const newErrors = { ...prevErrors };
                                            [
                                                "present_building_name",
                                                "present_street_name",
                                                "present_landmark",
                                                "present_city",
                                                "present_district",
                                                "present_state",
                                                "present_pincode",
                                            ].forEach((field) => delete newErrors[field]);
                                            return newErrors;
                                        });
                                    }
                                }}
                            />
                            <Label htmlFor="same_as_permanent_address" className="text-sm font-semibold text-blue-700 cursor-pointer">
                                Present address is same as permanent
                            </Label>
                        </div>
                    </div>

                    {!formData.same_as_permanent_address && (
                        <>
                            <FormField label="Building/House Name" error={errors?.present_building_name} required>
                                <Input
                                    id="present_building_name"
                                    onChange={(e) => handleFieldChange("present_building_name", e.target.value)}
                                    value={formData?.present_building_name}
                                    placeholder="Enter building name"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Street/Road Name" error={errors?.present_street_name} required>
                                <Input
                                    id="present_street_name"
                                    onChange={(e) => handleFieldChange("present_street_name", e.target.value)}
                                    value={formData?.present_street_name}
                                    placeholder="Enter street name"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Landmark" error={errors?.present_landmark} required>
                                <Input
                                    id="present_landmark"
                                    onChange={(e) => handleFieldChange("present_landmark", e.target.value)}
                                    value={formData?.present_landmark}
                                    placeholder="Enter landmark"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="City" error={errors?.present_city} required>
                                <Input
                                    id="present_city"
                                    onChange={(e) => handleFieldChange("present_city", e.target.value)}
                                    value={formData?.present_city}
                                    placeholder="Enter city"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="District" error={errors?.present_district} required>
                                <Input
                                    id="present_district"
                                    onChange={(e) => handleFieldChange("present_district", e.target.value)}
                                    value={formData?.present_district}
                                    placeholder="Enter district"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="State" error={errors?.present_state} required>
                                <Input
                                    id="present_state"
                                    onChange={(e) => handleFieldChange("present_state", e.target.value)}
                                    value={formData?.present_state}
                                    placeholder="Enter state"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Pincode" error={errors?.present_pincode} required>
                                <Input
                                    id="present_pincode"
                                    onChange={(e) => handleFieldChange("present_pincode", e.target.value)}
                                    value={formData?.present_pincode}
                                    placeholder="Enter pincode"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                        </>
                    )}
                </FormSection>
            </div>
        </div>
    );
};

export default PersonalDetails;
