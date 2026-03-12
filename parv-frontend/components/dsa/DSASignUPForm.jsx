"use client";

import { SuccessModal, UserSuccessModal } from "@/components/common/Modals";
import { Button } from "@/components/ui/button";
import useSignUpDSA from "@/hooks/dsa/useDSASignup";
import FormInput from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import { FormFileUpload } from "../common/FormFile";
import FormTextarea from "../common/FormTextArea";

export default function DSARegistrationPage() {
    const {
        form,
        errors,
        uploadingFields,
        openSuccess,
        isSubmitting,
        handleChange,
        handleSelectChange,
        handleFileChange,
        submitForm,
        setOpenSuccess,
        handleRemoveFile,
        handleReset,
    } = useSignUpDSA();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">DSA Registration Form</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h3 className="pl-2 mb-1 text-muted-foreground font-semibold">Personal Details</h3>
                    <div className="bg-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 border rounded-lg">
                        <FormInput
                            label={"Full Name"}
                            id={'full_name'}
                            name={"full_name"}
                            onChange={handleChange}
                            value={form?.full_name}
                            error={errors?.full_name}
                            required={true}
                            placeholder={"Enter your full name"}
                        />
                        <FormInput
                            label={"Guardian Name"}
                            id={'guardian_name'}
                            name={"guardian_name"}
                            onChange={handleChange}
                            value={form?.guardian_name}
                            error={errors?.guardian_name}
                            required={true}
                            placeholder={"Enter your guardian name"}
                        />
                        <FormInput
                            label={"Date of Birth"}
                            id={'dob'}
                            name={"dob"}
                            type="date"
                            onChange={handleChange}
                            value={form?.dob}
                            error={errors?.dob}
                            required={true}
                            placeholder={"Date of birth"}
                        />

                        <FormSelect
                            label={"Gender"}
                            name={"gender"}
                            id={"gender"}
                            placeholder={"Gender"}
                            onChange={(value) => handleSelectChange("gender", value)}
                            value={form?.gender}
                            error={errors?.gender}
                            required={true}
                            options={[
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                                { label: "Others", value: "Others" },
                            ]}
                        />

                        <FormSelect
                            label={"Marital status"}
                            name={"marital_status"}
                            id={"marital_status"}
                            placeholder={"Marital status"}
                            onChange={(value) => handleSelectChange("marital_status", value)}
                            value={form?.marital_status}
                            error={errors?.marital_status}
                            required={true}
                            options={[
                                { label: "Married", value: "Married" },
                                { label: "Unmarried", value: "Unmarried" },
                            ]}
                        />
                        <FormInput
                            label={"Phone Number"}
                            id={'phone_no'}
                            name={"phone_no"}
                            onChange={handleChange}
                            value={form?.phone_no}
                            error={errors?.phone_no}
                            required={true}
                            placeholder={"Enter your phone number"}
                        />
                        <FormInput
                            label={"Alternate Phone Number"}
                            id={'alt_phone_no'}
                            name={"alt_phone_no"}
                            onChange={handleChange}
                            value={form?.alt_phone_no}
                            error={errors?.alt_phone_no}
                            required={false}
                            placeholder={"Enter your other phone number"}
                        />
                        <FormInput
                            label={"Email"}
                            id={'email'}
                            name={"email"}
                            onChange={handleChange}
                            value={form?.email}
                            error={errors?.email}
                            required={true}
                            placeholder={"eg. test@example.com"}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="pl-2 mb-1 text-muted-foreground font-semibold">Address </h3>
                    <div className="bg-gray-100 p-5 grid grid-cols-1 gap-5 border rounded-lg">

                        <FormTextarea
                            label={"Permanent address"}
                            id={'permanent_address'}
                            name={"permanent_address"}
                            onChange={handleChange}
                            value={form?.permanent_address}
                            error={errors?.permanent_address}
                            required={true}
                            placeholder={"Local Address, Street, City, District, State, PIN"}
                            className={"h-26"}
                        />
                        <FormTextarea
                            label={"Present address"}
                            id={'present_address'}
                            name={"present_address"}
                            onChange={handleChange}
                            value={form?.present_address}
                            error={errors?.present_address}
                            required={true}
                            placeholder={"Local Address, Street, City, District, State, PIN"}
                            className={"h-26"}
                        />
                    </div>
                </div>
                {/* Others details */}
                <div>
                    <h3 className="pl-2 mb-1 text-muted-foreground font-semibold">Other Details </h3>
                    <div className="bg-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 border rounded-lg">
                        <FormInput
                            label={"Aadhar Number"}
                            id={'aadhar_no'}
                            name={"aadhar_no"}
                            onChange={handleChange}
                            value={form?.aadhar_no}
                            error={errors?.aadhar_no}
                            required={true}
                            placeholder={"eg. xxxx xxxx xxxx"}
                        />
                        <FormInput
                            label={"Pan Number"}
                            id={'pan_no'}
                            name={"pan_no"}
                            onChange={handleChange}
                            value={form?.pan_no}
                            error={errors?.pan_no}
                            required={true}
                            placeholder={""}
                        />
                        <FormInput
                            label={"Work Location"}
                            id={'work_location'}
                            name={"work_location"}
                            onChange={handleChange}
                            value={form?.work_location}
                            error={errors?.work_location}
                            required={true}
                            placeholder={"Work location"}
                        />
                        <FormInput
                            label={"Bank Account Number"}
                            id={'bank_account_no'}
                            name={"bank_account_no"}
                            onChange={handleChange}
                            value={form?.bank_account_no}
                            error={errors?.bank_account_no}
                            required={true}
                            placeholder={"Bank account"}
                        />
                        <FormInput
                            label={"Branch Name"}
                            id={'bank_branch'}
                            name={"bank_branch"}
                            onChange={handleChange}
                            value={form?.bank_branch}
                            error={errors?.bank_branch}
                            required={true}
                            placeholder={"Branch name"}
                        />
                    </div>
                </div>

                {/* Documents Upload */}
                <div>
                    <h3 className="pl-2 mb-1 text-muted-foreground font-semibold">Upload Documents </h3>
                    <div className="bg-gray-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 border rounded-lg">
                        <FormFileUpload
                            label={"Aadhar Card"}
                            id={'aadhar'}
                            name={"aadhar"}
                            onChange={(e) => handleFileChange(e, "aadhar")}
                            value={form?.aadhar}
                            error={errors?.aadhar}
                            required={true}
                            isUploading={uploadingFields?.['aadhar']}
                            handleRemoveDocsFromCloudaniry={handleRemoveFile}
                        />
                        <FormFileUpload
                            label={"Pan Card"}
                            id={'pan'}
                            name={"pan"}
                            onChange={(e) => handleFileChange(e, "pan")}
                            value={form?.pan}
                            error={errors?.pan}
                            required={true}
                            isUploading={uploadingFields?.['pan']}
                            handleRemoveDocsFromCloudaniry={handleRemoveFile}
                        />
                        <FormFileUpload
                            label={"Photo"}
                            id={'photo'}
                            name={"photo"}
                            onChange={(e) => handleFileChange(e, "photo")}
                            value={form?.photo}
                            error={errors?.photo}
                            required={true}
                            isUploading={uploadingFields?.['photo']}
                            handleRemoveDocsFromCloudaniry={handleRemoveFile}
                        />
                        <FormFileUpload
                            label={"Bank Passbook"}
                            id={'bank_doc'}
                            name={"bank_doc"}
                            onChange={(e) => handleFileChange(e, "bank_doc")}
                            value={form?.bank_doc}
                            error={errors?.bank_doc}
                            required={false}
                            isUploading={uploadingFields?.['bank_doc']}
                            handleRemoveDocsFromCloudaniry={handleRemoveFile}
                        />
                        <FormFileUpload
                            label={"Education certificate"}
                            id={'education_certificate'}
                            name={"education_certificate"}
                            onChange={(e) => handleFileChange(e, "education_certificate")}
                            value={form?.education_certificate}
                            error={errors?.education_certificate}
                            required={false}
                            isUploading={uploadingFields?.['education_certificate']}
                            handleRemoveDocsFromCloudaniry={handleRemoveFile}
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-end">
                <Button
                    variant="outline"
                    className="mt-6 mr-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleReset}
                    disabled={isSubmitting}
                >
                    Reset Form
                </Button>
                <Button
                    className=" mt-6"
                    onClick={submitForm}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Apply For DSA"}
                </Button>
            </div>

            {/* Success Modal */}
            <UserSuccessModal
                open={openSuccess}
                onOpenChange={setOpenSuccess}
                title="Form Submitted!"
                message="Your DSA registration was successfully submitted."
            />
        </div>
    );
}
