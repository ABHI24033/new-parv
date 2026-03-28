"use client";

import React, { useState } from "react";
import useAdminSignup from "@/hooks/admin/useAdminSignup";
import { FormSection, FormField } from "@/components/common/ModernFormLayout";
import { LoanFormShell } from "@/components/forms/LoanFormShell";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FormFileUpload } from "@/components/common/FormFile";
import { UserSuccessModal } from "@/components/common/Modals";
import { UserPlus, MapPin, Briefcase, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MultiStepAccountForm() {
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
  } = useAdminSignup();

  const [step, setStep] = useState(0);
  const steps = [
    { id: "personal", title: "Personal" },
    { id: "contact", title: "Contact & Address" },
    { id: "professional", title: "Professional" },
    { id: "documents", title: "Documents" },
  ];
  const stepIcons = [UserPlus, MapPin, Briefcase, FileText];
  const fieldStepMap = {
    full_name: 0,
    guardian_name: 0,
    dob: 0,
    gender: 0,
    marital_status: 0,
    phone_no: 1,
    alt_phone_no: 1,
    email: 1,
    permanent_address: 1,
    present_address: 1,
    designation: 2,
    work_location: 2,
    aadhar_no: 2,
    pan_no: 2,
    bank_account_no: 2,
    bank_branch: 2,
    aadhar: 3,
    pan: 3,
    photo: 3,
    bank_doc: 3,
    education_certificate: 3,
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const handleSubmit = async () => {
    const result = await submitForm();

    if (!result?.ok && result?.firstErrorField) {
      const targetStep = fieldStepMap[result.firstErrorField];
      if (typeof targetStep === "number") {
        setStep(targetStep);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FormSection title="Personal Details" description="Basic identity information" className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Full Name" required error={errors.full_name}>
              <Input
                id="full_name"
                placeholder="John Doe"
                value={form.full_name}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Guardian Name" required error={errors.guardian_name}>
              <Input
                id="guardian_name"
                placeholder="Guardian's Name"
                value={form.guardian_name}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Date of Birth" required error={errors.dob}>
              <Input
                id="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Gender" required error={errors.gender}>
              <Select onValueChange={(v) => handleSelectChange("gender", v)} value={form.gender}>
                <SelectTrigger className="border-none focus:ring-0 px-4 h-11 bg-white">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Marital Status" required error={errors.marital_status}>
              <Select onValueChange={(v) => handleSelectChange("marital_status", v)} value={form.marital_status}>
                <SelectTrigger className="border-none focus:ring-0 px-4 h-11 bg-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Unmarried">Unmarried</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        );
      case 1:
        return (
          <FormSection title="Contact & Address" description="Where can we reach you?" className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Phone Number" required error={errors.phone_no}>
              <Input
                id="phone_no"
                placeholder="+91 00000 00000"
                value={form.phone_no}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Alternate Phone" error={errors.alt_phone_no}>
              <Input
                id="alt_phone_no"
                placeholder="Optional"
                value={form.alt_phone_no}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Email Address" required error={errors.email} className="md:col-span-2">
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Permanent Address" required error={errors.permanent_address} className="md:col-span-2">
              <Input
                id="permanent_address"
                placeholder="Full Street Address, City, State, PIN"
                value={form.permanent_address}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Present Address" required error={errors.present_address} className="md:col-span-2">
              <Input
                id="present_address"
                placeholder="Same as permanent or other"
                value={form.present_address}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
          </FormSection>
        );
      case 2:
        return (
          <FormSection title="Professional Details" description="Role and office information" className="animate-in fade-in slide-in-from-right-4 duration-500">
            <FormField label="Designation / Role" required error={errors.designation}>
              <Select onValueChange={(v) => handleSelectChange("designation", v)} value={form.designation}>
                <SelectTrigger className="border-none focus:ring-0 px-4 h-11 bg-white">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RM">Relationship Manager (RM)</SelectItem>
                  <SelectItem value="Telecaller">Telecaller</SelectItem>
                  <SelectItem value="Field Staff">Field Staff</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Work Location" required error={errors.work_location}>
              <Input
                id="work_location"
                placeholder="City/Office Branch"
                value={form.work_location}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Aadhar Number" required error={errors.aadhar_no}>
              <Input
                id="aadhar_no"
                placeholder="12-digit UID"
                value={form.aadhar_no}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="PAN Number" required error={errors.pan_no}>
              <Input
                id="pan_no"
                placeholder="ABCDE1234F"
                value={form.pan_no}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11 uppercase"
              />
            </FormField>
            <FormField label="Bank Account Number" required error={errors.bank_account_no}>
              <Input
                id="bank_account_no"
                placeholder="Acc No"
                value={form.bank_account_no}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
            <FormField label="Bank Branch & IFSC" required error={errors.bank_branch}>
              <Input
                id="bank_branch"
                placeholder="Branch Name, IFSC Code"
                value={form.bank_branch}
                onChange={handleChange}
                className="border-none focus-visible:ring-0 px-4 h-11"
              />
            </FormField>
          </FormSection>
        );
      case 3:
        return (
          <FormSection title="Documents" description="Upload required verification files" className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-dashed border-2 hover:border-blue-400 transition-colors bg-white">
                <CardContent className="p-4">
                  <FormFileUpload
                    label="Aadhar Card"
                    id="aadhar"
                    name="aadhar"
                    onChange={(e) => handleFileChange(e, "aadhar")}
                    value={form.aadhar}
                    error={errors.aadhar}
                    required
                    isUploading={uploadingFields["aadhar"]}
                    handleRemoveDocsFromCloudaniry={handleRemoveFile}
                  />
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 hover:border-blue-400 transition-colors bg-white">
                <CardContent className="p-4">
                  <FormFileUpload
                    label="Pan Card"
                    id="pan"
                    name="pan"
                    onChange={(e) => handleFileChange(e, "pan")}
                    value={form.pan}
                    error={errors.pan}
                    required
                    isUploading={uploadingFields["pan"]}
                    handleRemoveDocsFromCloudaniry={handleRemoveFile}
                  />
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 hover:border-blue-400 transition-colors bg-white">
                <CardContent className="p-4">
                  <FormFileUpload
                    label="Photo"
                    id="photo"
                    name="photo"
                    onChange={(e) => handleFileChange(e, "photo")}
                    value={form.photo}
                    error={errors.photo}
                    required
                    isUploading={uploadingFields["photo"]}
                    handleRemoveDocsFromCloudaniry={handleRemoveFile}
                  />
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 hover:border-blue-400 transition-colors bg-white">
                <CardContent className="p-4">
                  <FormFileUpload
                    label="Bank Document"
                    id="bank_doc"
                    name="bank_doc"
                    onChange={(e) => handleFileChange(e, "bank_doc")}
                    value={form.bank_doc}
                    error={errors.bank_doc}
                    isUploading={uploadingFields["bank_doc"]}
                    handleRemoveDocsFromCloudaniry={handleRemoveFile}
                  />
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 hover:border-blue-400 transition-colors bg-white">
                <CardContent className="p-4">
                  <FormFileUpload
                    label="Education Cert."
                    id="education_certificate"
                    name="education_certificate"
                    onChange={(e) => handleFileChange(e, "education_certificate")}
                    value={form.education_certificate}
                    error={errors.education_certificate}
                    isUploading={uploadingFields["education_certificate"]}
                    handleRemoveDocsFromCloudaniry={handleRemoveFile}
                  />
                </CardContent>
              </Card>
            </div>
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 rounded-2xl bg-blue-600 p-3 shadow-lg shadow-blue-200">
          <UserPlus className="size-7 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Create New Account</h1>
        <p className="mt-2 text-base font-medium text-slate-500">Follow the simple steps to set up a new member profile.</p>
      </div>

      <LoanFormShell
        steps={steps}
        stepIndex={step}
        icons={stepIcons}
        onBack={prevStep}
        onNext={nextStep}
        onReset={handleReset}
        onSubmit={handleSubmit}
        isLastStep={step === steps.length - 1}
        navDisabled={isSubmitting}
        submitDisabled={isSubmitting || Object.values(uploadingFields).some(Boolean)}
        submitLabel={isSubmitting ? "Creating..." : "Complete Setup"}
      >
        <div className="min-h-[500px] overflow-hidden rounded-3xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-100/50">
          <div className="flex-1 p-6 md:p-8">
            {renderStep()}
          </div>
        </div>
      </LoanFormShell>

      <UserSuccessModal
        open={openSuccess}
        onOpenChange={setOpenSuccess}
        title="Member Created!"
        message="The new account has been successfully set up and is ready for use."
        redirectTo="/dashboard"
        buttonText="Back to Dashboard"
      />
    </div>
  );
}
