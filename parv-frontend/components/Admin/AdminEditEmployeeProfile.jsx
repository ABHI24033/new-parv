"use client";

import { useParams } from "next/navigation";
import useAdminEditProfile from "@/hooks/admin/useEditEmployees";

import FormInput from "../common/FormInput";
import { FormSelect } from "../common/FormSelect";
import FormTextarea from "../common/FormTextArea";
import { FormFileUpload } from "../common/FormFile";
import { UserSuccessModal } from "../common/Modals";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function AdminEditProfile() {
  const { id } = useParams();
  const {
    form,
    errors,
    isSubmitting,
    openSuccess,
    setOpenSuccess,
    handleChange,
    handleSelectChange,
    handleFileChange,
    submitForm,
  } = useAdminEditProfile(id);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Profile settings
            </h1>
            <p className="text-sm text-muted-foreground">
              Update employee information, contact details, and documents.
            </p>
          </div>
          <Button onClick={submitForm} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Personal details</CardTitle>
              <CardDescription>
                Basic identity information for the employee.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label="Full Name"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  error={errors.full_name}
                />
                <FormInput
                  label="Guardian Name"
                  name="guardian_name"
                  value={form.guardian_name}
                  onChange={handleChange}
                />
                <FormInput
                  label="DOB"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                />
                <FormSelect
                  label="Gender"
                  value={form.gender}
                  onChange={(v) => handleSelectChange("gender", v)}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Others", value: "Others" },
                  ]}
                />
                <FormInput
                  label="Phone"
                  name="phone_no"
                  value={form.phone_no}
                  onChange={handleChange}
                />
                <FormInput label="Email" value={form.email} disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Residential information used for official records.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-5">
                <FormTextarea
                  label="Permanent Address"
                  name="permanent_address"
                  value={form.permanent_address}
                  onChange={handleChange}
                />
                <FormTextarea
                  label="Present Address"
                  name="present_address"
                  value={form.present_address}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <CardTitle>Work & compliance</CardTitle>
              <CardDescription>
                Role, IDs, and bank details required for payroll and compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormSelect
                  label="Job Role"
                  name="role"
                  id="role"
                  placeholder="Select Role"
                  onChange={(value) => handleSelectChange("role", value)}
                  value={form?.role}
                  error={errors?.role}
                  required={true}
                  options={[
                    { label: "Relationship Manager (RM)", value: "RM" },
                    { label: "Telecaller", value: "Telecaller" },
                    { label: "Field Staff", value: "Field Staff" },
                  ]}
                />
                <FormInput
                  label="Aadhar Number"
                  id="aadhar_no"
                  name="aadhar_no"
                  onChange={handleChange}
                  value={form?.aadhar_no}
                  error={errors?.aadhar_no}
                  required={true}
                  placeholder="eg. xxxx xxxx xxxx"
                />
                <FormInput
                  label="PAN Number"
                  id="pan_no"
                  name="pan_no"
                  onChange={handleChange}
                  value={form?.pan_no}
                  error={errors?.pan_no}
                  required={true}
                />
                <FormInput
                  label="Work Location"
                  id="work_location"
                  name="work_location"
                  onChange={handleChange}
                  value={form?.work_location}
                  error={errors?.work_location}
                  required={true}
                  placeholder="Work location"
                />
                <FormInput
                  label="Bank Account Number"
                  id="bank_account_no"
                  name="bank_account_no"
                  onChange={handleChange}
                  value={form?.bank_account_no}
                  error={errors?.bank_account_no}
                  required={true}
                  placeholder="Bank account"
                />
                <FormInput
                  label="Branch Name"
                  id="bank_branch"
                  name="bank_branch"
                  onChange={handleChange}
                  value={form?.bank_branch}
                  error={errors?.bank_branch}
                  required={true}
                  placeholder="Branch name"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Upload clear images/PDFs for verification.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <FormFileUpload
                  label="Aadhar"
                  value={form.aadhar}
                  onChange={(e) => handleFileChange(e, "aadhar")}
                />
                <FormFileUpload
                  label="PAN"
                  value={form.pan}
                  onChange={(e) => handleFileChange(e, "pan")}
                />
                <FormFileUpload
                  label="Photo"
                  value={form.photo}
                  onChange={(e) => handleFileChange(e, "photo")}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t justify-end">
              <Button onClick={submitForm} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <UserSuccessModal
          open={openSuccess}
          onOpenChange={setOpenSuccess}
          title="Profile Updated"
          message="User profile updated successfully."
          redirectTo="/dashboard/view/rm"
        />
      </div>
    </div>
  );
}