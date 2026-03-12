import React from "react";
import { validateFields } from "./formValidation";
import { FormFileUpload } from "@/components/common/FormFile";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const Documents = ({ formData, setFormData, errors, setErrors, isUploading, handleRemoveDocsFromCloudaniry, handleUpload, isRemoving, handleFileChange }) => {

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Personal Documents" description="Basic identity documents of the primary personal loan applicant.">
          <FormField label="Applicant Selfie" error={errors?.applicant_selfie} required>
            <FormFileUpload
              id={"applicant_selfie"}
              label="Applicant Selfie"
              required={true}
              value={formData?.applicant_selfie}
              onChange={handleFileChange}
              error={errors?.applicant_selfie}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="Aadhar Front" error={errors?.aadhar_front} required>
            <FormFileUpload
              id={"aadhar_front"}
              label="Upload aadhar front image"
              required={true}
              value={formData?.aadhar_front}
              onChange={handleFileChange}
              error={errors?.aadhar_front}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="Aadhar Back" error={errors?.aadhar_back} required>
            <FormFileUpload
              id={"aadhar_back"}
              label="Upload aadhar back image"
              required={true}
              value={formData?.aadhar_back}
              onChange={handleFileChange}
              error={errors?.aadhar_back}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="PAN Card" error={errors?.Personal_pan} required>
            <FormFileUpload
              id={"Personal_pan"}
              label="Upload Personal PAN image"
              required={true}
              value={formData?.Personal_pan}
              onChange={handleFileChange}
              error={errors?.Personal_pan}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
        </FormSection>

        {formData?.have_coapplicant === "Yes" ? (
          <FormSection title="Co-Applicant Documents" description="Identity documents of the personal loan co-applicant.">
            <FormField label="Aadhar Front" error={errors?.coapplicant_aadhar_front}>
              <FormFileUpload
                id={"coapplicant_aadhar_front"}
                label="Co-Applicant Aadhar Front"
                required={false}
                value={formData?.coapplicant_aadhar_front}
                onChange={handleFileChange}
                error={errors?.coapplicant_aadhar_front}
                handleUpload={handleUpload}
                isUploading={isUploading}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
            <FormField label="Aadhar Back" error={errors?.coapplicant_aadhar_back}>
              <FormFileUpload
                id={"coapplicant_aadhar_back"}
                label="Co-Applicant Aadhar Back"
                required={false}
                value={formData?.coapplicant_aadhar_back}
                onChange={handleFileChange}
                error={errors?.coapplicant_aadhar_back}
                handleUpload={handleUpload}
                isUploading={isUploading}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
            <FormField label="PAN Card" error={errors?.coapplicant_pan}>
              <FormFileUpload
                id={"coapplicant_pan"}
                label="Co-Applicant PAN"
                required={false}
                value={formData?.coapplicant_pan}
                onChange={handleFileChange}
                error={errors?.coapplicant_pan}
                handleUpload={handleUpload}
                isUploading={isUploading}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
          </FormSection>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Income Proofs" description="Financial documents related to your monthly earnings.">
          <FormField label="Salary Slip 1" error={errors?.salary_slip_1} required>
            <FormFileUpload
              id={"salary_slip_1"}
              label="Salary slip-1"
              required={true}
              value={formData?.salary_slip_1}
              onChange={handleFileChange}
              error={errors?.salary_slip_1}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
          <FormField label="Salary Slip 2" error={errors?.salary_slip_2} required>
            <FormFileUpload
              id={"salary_slip_2"}
              label="Salary slip-2"
              required={true}
              value={formData?.salary_slip_2}
              onChange={handleFileChange}
              error={errors?.salary_slip_2}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
          <FormField label="Salary Slip 3" error={errors?.salary_slip_3} required>
            <FormFileUpload
              id={"salary_slip_3"}
              label="Salary slip-3"
              required={true}
              value={formData?.salary_slip_3}
              onChange={handleFileChange}
              error={errors?.salary_slip_3}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
          <FormField label="Offer Letter" error={errors?.offer_letter}>
            <FormFileUpload
              id={"offer_letter"}
              label="Upload offer letter"
              required={false}
              value={formData?.offer_letter}
              onChange={handleFileChange}
              error={errors?.offer_letter}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
        </FormSection>

        <FormSection title="Additional Documents" description="Any other documents for personal loan approval.">
          <FormField label="Other Doc 1" error={errors?.other_doc1} required>
            <FormFileUpload
              id={"other_doc1"}
              label="Upload document"
              required={true}
              value={formData?.other_doc1}
              onChange={handleFileChange}
              error={errors?.other_doc1}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
          <FormField label="Other Doc 2" error={errors?.other_doc2} required>
            <FormFileUpload
              id={"other_doc2"}
              label="Upload document"
              required={true}
              value={formData?.other_doc2}
              onChange={handleFileChange}
              error={errors?.other_doc2}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
          <FormField label="Other Doc 3" error={errors?.other_doc3} required className="md:col-span-2">
            <FormFileUpload
              id={"other_doc3"}
              label="Upload document"
              required={true}
              value={formData?.other_doc3}
              onChange={handleFileChange}
              error={errors?.other_doc3}
              handleUpload={handleUpload}
              isUploading={isUploading}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
        </FormSection>
      </div>
    </div>
  );
};

export default Documents;
