"use client";

import { SuccessModal, UserSuccessModal } from "@/components/common/Modals";
import { Button } from "@/components/ui/button";
import useSignUpDSA from "@/hooks/dsa/useDSASignup";
import FormInput from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import { FormFileUpload } from "../common/FormFile";
import FormTextarea from "../common/FormTextArea";
import { User, MapPin, FileText, Upload, ArrowRight, CheckCircle } from "lucide-react";

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
        <div className="w-full">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-white border-b border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                            <User className="h-3.5 w-3.5" />
                            <span>Partner Application</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                            DSA Registration
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Join our network of financial partners. Complete the form below to start your journey as a Direct Sales Agent.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Content */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Personal Details */}
                            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Personal Details</h2>
                                        <p className="text-sm text-slate-500">Enter your basic information</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                        placeholder={"Select gender"}
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
                                        label={"Marital Status"}
                                        name={"marital_status"}
                                        id={"marital_status"}
                                        placeholder={"Select status"}
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
                                        placeholder={"Enter alternate phone number"}
                                    />
                                    <FormInput
                                        label={"Email Address"}
                                        id={'email'}
                                        name={"email"}
                                        type="email"
                                        onChange={handleChange}
                                        value={form?.email}
                                        error={errors?.email}
                                        required={true}
                                        placeholder={"eg. test@example.com"}
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Address Details</h2>
                                        <p className="text-sm text-slate-500">Enter your permanent and present address</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-5">
                                    <FormTextarea
                                        label={"Permanent Address"}
                                        id={'permanent_address'}
                                        name={"permanent_address"}
                                        onChange={handleChange}
                                        value={form?.permanent_address}
                                        error={errors?.permanent_address}
                                        required={true}
                                        placeholder={"Local Address, Street, City, District, State, PIN"}
                                        className={"h-24"}
                                    />
                                    <FormTextarea
                                        label={"Present Address"}
                                        id={'present_address'}
                                        name={"present_address"}
                                        onChange={handleChange}
                                        value={form?.present_address}
                                        error={errors?.present_address}
                                        required={true}
                                        placeholder={"Local Address, Street, City, District, State, PIN"}
                                        className={"h-24"}
                                    />
                                </div>
                            </div>

                            {/* Other Details */}
                            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Other Details</h2>
                                        <p className="text-sm text-slate-500">Identity and banking information</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormInput
                                        label={"Aadhar Number"}
                                        id={'aadhar_no'}
                                        name={"aadhar_no"}
                                        onChange={handleChange}
                                        value={form?.aadhar_no}
                                        error={errors?.aadhar_no}
                                        required={true}
                                        placeholder={"xxxx xxxx xxxx"}
                                    />
                                    <FormInput
                                        label={"PAN Number"}
                                        id={'pan_no'}
                                        name={"pan_no"}
                                        onChange={handleChange}
                                        value={form?.pan_no}
                                        error={errors?.pan_no}
                                        required={true}
                                        placeholder={"ABCDE1234F"}
                                    />
                                    <FormInput
                                        label={"Work Location"}
                                        id={'work_location'}
                                        name={"work_location"}
                                        onChange={handleChange}
                                        value={form?.work_location}
                                        error={errors?.work_location}
                                        required={true}
                                        placeholder={"Enter work location"}
                                    />
                                    <FormInput
                                        label={"Bank Account Number"}
                                        id={'bank_account_no'}
                                        name={"bank_account_no"}
                                        onChange={handleChange}
                                        value={form?.bank_account_no}
                                        error={errors?.bank_account_no}
                                        required={true}
                                        placeholder={"Enter account number"}
                                    />
                                    <FormInput
                                        label={"Branch Name"}
                                        id={'bank_branch'}
                                        name={"bank_branch"}
                                        onChange={handleChange}
                                        value={form?.bank_branch}
                                        error={errors?.bank_branch}
                                        required={true}
                                        placeholder={"Enter branch name"}
                                    />
                                </div>
                            </div>

                            {/* Document Upload */}
                            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Document Upload</h2>
                                        <p className="text-sm text-slate-500">Upload required documents (PDF, JPG, PNG)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                        label={"PAN Card"}
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
                                        label={"Passport Photo"}
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
                                        label={"Bank Passbook / Cancelled Cheque"}
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
                                        label={"Education Certificate (Optional)"}
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

                        {/* Sidebar - Summary & Actions */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Application Summary */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Application Summary</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                            <span className="text-slate-600">Personal Information</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                            <span className="text-slate-600">Address Details</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                            <span className="text-slate-600">Identity & Banking</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <CheckCircle className="h-4 w-4 text-blue-600" />
                                            <span className="text-slate-600">Document Upload</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            By submitting this application, you agree to our terms and conditions. 
                                            Our team will review your application within 2-3 business days.
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                                    <Button
                                        className="w-full h-12 bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 mb-3"
                                        onClick={submitForm}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Submit Application
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                                        onClick={handleReset}
                                        disabled={isSubmitting}
                                    >
                                        Reset Form
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <UserSuccessModal
                open={openSuccess}
                onOpenChange={setOpenSuccess}
                title="Application Submitted!"
                message="Your DSA registration has been successfully submitted. Our team will review your application and contact you within 2-3 business days."
            />
        </div>
    );
}
