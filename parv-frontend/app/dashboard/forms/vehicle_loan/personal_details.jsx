import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { validateFields } from './formValidation';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

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

    const handleCheckboxChange = (id, checked) => {
        setFormData(prev => {
            const updatedFormData = {
                ...prev,
                [id]: checked
            };

            if (id === 'same_as_permanent_address') {
                if (checked) {
                    updatedFormData.present_building_name = prev.permanent_building_name || '';
                    updatedFormData.present_street_name = prev.permanent_street_name || '';
                    updatedFormData.present_landmark = prev.permanent_landmark || '';
                    updatedFormData.present_city = prev.permanent_city || '';
                    updatedFormData.present_district = prev.permanent_district || '';
                    updatedFormData.present_state = prev.permanent_state || '';
                    updatedFormData.present_pincode = prev.permanent_pincode || '';
                }
            }

            return updatedFormData;
        });

        if (id === 'same_as_permanent_address' && checked) {
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
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Loan Information" description="Basic details about the loan and connector.">
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

                    <FormField label="DSA Name" error={errors?.name_of_connector} required>
                        <Input
                            id="name_of_connector"
                            onChange={(e) => handleFieldChange("name_of_connector", e.target.value)}
                            value={formData?.name_of_connector}
                            placeholder="Enter DSA name"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                </FormSection>

                <FormSection title="Applicant Details" description="Personal information of the loan applicant.">
                    <FormField label="Full Name" error={errors?.applicant_name} required>
                        <Input
                            id="applicant_name"
                            onChange={(e) => handleFieldChange("applicant_name", e.target.value)}
                            value={formData?.applicant_name}
                            placeholder="As per PAN card"
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
                            placeholder="10-digit mobile number"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Alternate Phone" error={errors?.alt_phone_no} required>
                        <Input
                            id="alt_phone_no"
                            type="tel"
                            onChange={(e) => handleFieldChange("alt_phone_no", e.target.value)}
                            value={formData?.alt_phone_no}
                            placeholder="Optional mobile number"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>

                    <FormField label="Email Address" error={errors?.email}>
                        <Input
                            id="email"
                            type="email"
                            onChange={(e) => handleFieldChange("email", e.target.value)}
                            value={formData?.email}
                            placeholder="example@mail.com"
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

                    <FormField label="Aadhar Number" error={errors?.aadhar} required>
                        <Input
                            id="aadhar"
                            onChange={(e) => handleFieldChange("aadhar", e.target.value)}
                            value={formData?.aadhar}
                            placeholder="12-digit Aadhar number"
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

                    <FormField label="Marital Status" error={errors?.marital_status} required>
                        <RadioGroup
                            value={formData?.marital_status}
                            onValueChange={(value) => handleFieldChange('marital_status', value)}
                            className="flex gap-6 mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Married" id="married" />
                                <Label htmlFor="married" className="cursor-pointer font-medium">Married</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Unmarried" id="unmarried" />
                                <Label htmlFor="unmarried" className="cursor-pointer font-medium">Unmarried</Label>
                            </div>
                        </RadioGroup>
                    </FormField>

                    {formData?.marital_status === 'Married' && (
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Permanent Address" description="Address mentioned on your Aadhar card.">
                    <FormField label="Building/House Name" error={errors?.permanent_building_name} required>
                        <Input
                            id="permanent_building_name"
                            onChange={(e) => handleFieldChange("permanent_building_name", e.target.value)}
                            value={formData?.permanent_building_name}
                            placeholder="House/Building No."
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Street/Road Name" error={errors?.permanent_street_name} required>
                        <Input
                            id="permanent_street_name"
                            onChange={(e) => handleFieldChange("permanent_street_name", e.target.value)}
                            value={formData?.permanent_street_name}
                            placeholder="Street or Area"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Landmark" error={errors?.permanent_landmark}>
                        <Input
                            id="permanent_landmark"
                            onChange={(e) => handleFieldChange("permanent_landmark", e.target.value)}
                            value={formData?.permanent_landmark}
                            placeholder="Nearby landmark"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="City" error={errors?.permanent_city} required>
                        <Input
                            id="permanent_city"
                            onChange={(e) => handleFieldChange("permanent_city", e.target.value)}
                            value={formData?.permanent_city}
                            placeholder="City"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="District" error={errors?.permanent_district} required>
                        <Input
                            id="permanent_district"
                            onChange={(e) => handleFieldChange("permanent_district", e.target.value)}
                            value={formData?.permanent_district}
                            placeholder="District"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="State" error={errors?.permanent_state} required>
                        <Input
                            id="permanent_state"
                            onChange={(e) => handleFieldChange("permanent_state", e.target.value)}
                            value={formData?.permanent_state}
                            placeholder="State"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                    <FormField label="Pincode" error={errors?.permanent_pincode} required>
                        <Input
                            id="permanent_pincode"
                            onChange={(e) => handleFieldChange("permanent_pincode", e.target.value)}
                            value={formData?.permanent_pincode}
                            placeholder="6-digit Pincode"
                            className="h-11 rounded-xl border-none"
                        />
                    </FormField>
                </FormSection>

                <FormSection title="Present Address" description="Address where you are staying currently.">
                    <div className="col-span-full mb-4">
                        <div className="flex items-center space-x-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100 w-full shadow-sm">
                            <Checkbox
                                id="same_as_permanent_address"
                                checked={formData.same_as_permanent_address}
                                onCheckedChange={(checked) => handleCheckboxChange("same_as_permanent_address", checked)}
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
                                    placeholder="House/Building No."
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Street/Road Name" error={errors?.present_street_name} required>
                                <Input
                                    id="present_street_name"
                                    onChange={(e) => handleFieldChange("present_street_name", e.target.value)}
                                    value={formData?.present_street_name}
                                    placeholder="Street or Area"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Landmark" error={errors?.present_landmark}>
                                <Input
                                    id="present_landmark"
                                    onChange={(e) => handleFieldChange("present_landmark", e.target.value)}
                                    value={formData?.present_landmark}
                                    placeholder="Nearby landmark"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="City" error={errors?.present_city} required>
                                <Input
                                    id="present_city"
                                    onChange={(e) => handleFieldChange("present_city", e.target.value)}
                                    value={formData?.present_city}
                                    placeholder="City"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="District" error={errors?.present_district} required>
                                <Input
                                    id="present_district"
                                    onChange={(e) => handleFieldChange("present_district", e.target.value)}
                                    value={formData?.present_district}
                                    placeholder="District"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="State" error={errors?.present_state} required>
                                <Input
                                    id="present_state"
                                    onChange={(e) => handleFieldChange("present_state", e.target.value)}
                                    value={formData?.present_state}
                                    placeholder="State"
                                    className="h-11 rounded-xl border-none"
                                />
                            </FormField>
                            <FormField label="Pincode" error={errors?.present_pincode} required>
                                <Input
                                    id="present_pincode"
                                    onChange={(e) => handleFieldChange("present_pincode", e.target.value)}
                                    value={formData?.present_pincode}
                                    placeholder="6-digit Pincode"
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
