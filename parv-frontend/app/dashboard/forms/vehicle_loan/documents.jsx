import React from "react";
import { validateFields } from "./formValidation";
import { FormFileUpload } from "@/components/common/FormFile";
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const Documents = ({ formData, setFormData, errors, setErrors, handleUpload, isUploading, handleRemoveDocsFromCloudaniry, isRemoving, handleFileChange }) => {

  return (
    <div className="space-y-12">
      {/* Identity Proofs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Personal Documents" description="Basic identity documents of the primary vehicle loan applicant.">
          <FormField label="Applicant Selfie" error={errors?.applicant_selfie} required>
            <FormFileUpload
              id={`applicant_selfie`}
              label="Applicant Selfie"
              value={formData?.applicant_selfie}
              error={errors?.applicant_selfie}
              isUploading={isUploading}
              onChange={handleFileChange}
              handleUpload={handleUpload}
              required={true}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="Aadhar Front" error={errors?.aadhar_front} required>
            <FormFileUpload
              id={`aadhar_front`}
              label="Aadhar front"
              value={formData?.aadhar_front}
              error={errors?.aadhar_front}
              isUploading={isUploading}
              onChange={handleFileChange}
              handleUpload={handleUpload}
              required={true}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="Aadhar Back" error={errors?.aadhar_back} required>
            <FormFileUpload
              id={`aadhar_back`}
              label="Aadhar back"
              value={formData?.aadhar_back}
              error={errors?.aadhar_back}
              isUploading={isUploading}
              onChange={handleFileChange}
              handleUpload={handleUpload}
              required={true}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="PAN Card" error={errors?.personal_pan} required>
            <FormFileUpload
              id={`personal_pan`}
              label="Personal PAN"
              value={formData?.personal_pan}
              error={errors?.personal_pan}
              isUploading={isUploading}
              onChange={handleFileChange}
              handleUpload={handleUpload}
              required={true}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>

          <FormField label="Address Proof" error={errors?.address_prooof}>
            <FormFileUpload
              id={`address_prooof`}
              label={`Electricity bill etc.`}
              value={formData?.address_prooof}
              error={errors?.address_prooof}
              isUploading={isUploading}
              onChange={handleFileChange}
              handleUpload={handleUpload}
              required={false}
              removing={isRemoving}
              handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
            />
          </FormField>
        </FormSection>

        {formData?.have_coapplicant === "Yes" ? (
          <FormSection title="Co-Applicant Documents" description="Identity documents of the co-applicant.">
            <FormField label="Aadhar Front" error={errors?.coapplicant_aadhar_front}>
              <FormFileUpload
                id={`coapplicant_aadhar_front`}
                label="Aadhar Front"
                value={formData?.coapplicant_aadhar_front}
                error={errors?.coapplicant_aadhar_front}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
            <FormField label="Aadhar Back" error={errors?.coapplicant_aadhar_back}>
              <FormFileUpload
                id={`coapplicant_aadhar_back`}
                label="Aadhar Back"
                value={formData?.coapplicant_aadhar_back}
                error={errors?.coapplicant_aadhar_back}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
            <FormField label="PAN Card" error={errors?.coapplicant_pan}>
              <FormFileUpload
                id={`coapplicant_pan`}
                label="Co-Applicant PAN"
                value={formData?.coapplicant_pan}
                error={errors?.coapplicant_pan}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
          </FormSection>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Financial Proofs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {formData.profession === "Job" && (
          <FormSection title="Income Proofs" description="Financial proofs for salaried individuals.">
            <FormField label="Salary Slips (3 months)" required>
              <div className="grid grid-cols-3 gap-2">
                <FormFileUpload
                  id={`salary_slip_1`}
                  label={`Slip 1`}
                  value={formData?.salary_slip_1}
                  error={errors?.salary_slip_1}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={true}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`salary_slip_2`}
                  label={`Slip 2`}
                  value={formData?.salary_slip_2}
                  error={errors?.salary_slip_2}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={false}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`salary_slip_3`}
                  label={`Slip 3`}
                  value={formData?.salary_slip_3}
                  error={errors?.salary_slip_3}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={false}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
              </div>
            </FormField>

            <FormField label="Form-16 / ITR 1" error={errors?.form_16_itr_1} required>
              <FormFileUpload
                id={`form_16_itr_1`}
                label={`Latest ITR/Form-16`}
                value={formData?.form_16_itr_1}
                error={errors?.form_16_itr_1}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={true}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
            <FormField label="Form-16 / ITR 2" error={errors?.form_16_itr_2}>
              <FormFileUpload
                id={`form_16_itr_2`}
                label={`Additional ITR/Form-16`}
                value={formData?.form_16_itr_2}
                error={errors?.form_16_itr_2}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>
          </FormSection>
        )}

        {formData.profession === "Business" && (
          <FormSection title="Business Documentation" description="Financial and registration proofs for business owners.">
            <FormField label="Registration & Photos" required>
              <div className="grid grid-cols-2 gap-4">
                <FormFileUpload
                  id={`business_proof`}
                  label={`Proof`}
                  value={formData?.business_proof}
                  error={errors?.business_proof}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={true}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`business_images`}
                  label={`Photos`}
                  value={formData?.business_images}
                  error={errors?.business_images}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={true}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
              </div>
            </FormField>

            <FormField label="Income Tax Returns" required>
              <div className="grid grid-cols-2 gap-4">
                <FormFileUpload
                  id={`itr_1`}
                  label={`Latest ITR`}
                  value={formData?.itr_1}
                  error={errors?.itr_1}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={true}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`itr_2`}
                  label={`Previous ITR`}
                  value={formData?.itr_2}
                  error={errors?.itr_2}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={true}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
              </div>
            </FormField>

            <FormField label="Electricity Bill" error={errors?.electricity_bill}>
              <FormFileUpload
                id={`electricity_bill`}
                label={`Business utility bill`}
                value={formData?.electricity_bill}
                error={errors?.electricity_bill}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </FormField>

            <FormField label="Additional Proofs">
              <div className="grid grid-cols-3 gap-2">
                <FormFileUpload
                  id={`another_1`}
                  label={`Doc 1`}
                  value={formData?.another_1}
                  error={errors?.another_1}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={false}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`another_2`}
                  label={`Doc 2`}
                  value={formData?.another_2}
                  error={errors?.another_2}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={false}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
                <FormFileUpload
                  id={`another_3`}
                  label={`Doc 3`}
                  value={formData?.another_3}
                  error={errors?.another_3}
                  isUploading={isUploading}
                  onChange={handleFileChange}
                  handleUpload={handleUpload}
                  required={false}
                  removing={isRemoving}
                  handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                />
              </div>
            </FormField>
          </FormSection>
        )}

        <FormSection title="Vehicle & Guarantor" description="Additional vehicle and guarantor related documents.">
          <FormField label="Guarantor Identity">
            <div className="grid grid-cols-3 gap-2">
              <FormFileUpload
                id={`guarantor_aadhar_front`}
                label={`Aadhar F`}
                value={formData?.guarantor_aadhar_front}
                error={errors?.guarantor_aadhar_front}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`guarantor_aadhar_back`}
                label={`Aadhar B`}
                value={formData?.guarantor_aadhar_back}
                error={errors?.guarantor_aadhar_back}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`guarantor_pan`}
                label={`PAN`}
                value={formData?.guarantor_pan}
                error={errors?.guarantor_pan}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </div>
          </FormField>

          <FormField label="Vehicle Details">
            <div className="grid grid-cols-2 gap-4">
              <FormFileUpload
                id={`vehicle_quotation`}
                label={`Quotation`}
                value={formData?.vehicle_quotation}
                error={errors?.vehicle_quotation}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`owner_book`}
                label={`Owner Book`}
                value={formData?.owner_book}
                error={errors?.owner_book}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </div>
          </FormField>

          <div className="hidden md:block h-[60px]" />
        </FormSection>
      </div>

      {/* Property Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <FormSection title="Asset Proofs" description="Primary ownership documents for the property.">
          <FormField label="Deeds & Mutation">
            <div className="grid grid-cols-2 gap-4">
              <FormFileUpload
                id={`sale_deed`}
                label={`Sale Deed`}
                value={formData?.sale_deed}
                error={errors?.sale_deed}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`mutation`}
                label={`Mutation`}
                value={formData?.mutation}
                error={errors?.mutation}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </div>
          </FormField>

          <FormField label="History & Deed">
            <div className="grid grid-cols-2 gap-4">
              <FormFileUpload
                id={`chain_deed`}
                label={`Chain Deed`}
                value={formData?.chain_deed}
                error={errors?.chain_deed}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <div className="hidden md:block" />
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Certificates & Media" description="Visual proof and government certificates.">
          <FormField label="Official Papers">
            <div className="grid grid-cols-2 gap-4">
              <FormFileUpload
                id={`rashid`}
                label={`Rashid`}
                value={formData?.rashid}
                error={errors?.rashid}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`lpc`}
                label={`LPC Cert`}
                value={formData?.lpc}
                error={errors?.lpc}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </div>
          </FormField>

          <FormField label="Property Media">
            <div className="grid grid-cols-2 gap-4">
              <FormFileUpload
                id={`property_pic`}
                label={`Photo`}
                value={formData?.property_pic}
                error={errors?.property_pic}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
              <FormFileUpload
                id={`property_map`}
                label={`Map`}
                value={formData?.property_map}
                error={errors?.property_map}
                isUploading={isUploading}
                onChange={handleFileChange}
                handleUpload={handleUpload}
                required={false}
                removing={isRemoving}
                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
              />
            </div>
          </FormField>
        </FormSection>
      </div>
    </div>
  );
};

export default Documents;
