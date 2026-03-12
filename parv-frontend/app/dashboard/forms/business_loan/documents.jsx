import React from 'react';
import { validateFields } from './formValidation';
import { FormFileUpload } from '@/components/common/FormFile';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const Documents = ({ formData, setFormData, errors, setErrors, isUploading, isRemoving, handleUpload, handleRemoveDocsFromCloudaniry, handleFileChange }) => {

    return (
        <div className="space-y-12">
            {/* Identity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Applicant Documents" description="Identity documents of the primary business applicant.">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Applicant Selfie" error={errors?.applicant_selfie} required>
                            <FormFileUpload
                                id={`applicant_selfie`}
                                label={`Selfie`}
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
                        <FormField label="Personal PAN" error={errors?.personal_pan_upload} required>
                            <FormFileUpload
                                id={`personal_pan_upload`}
                                label={`PAN Card`}
                                value={formData?.personal_pan_upload}
                                error={errors?.personal_pan_upload}
                                isUploading={isUploading}
                                onChange={handleFileChange}
                                handleUpload={handleUpload}
                                required={true}
                                removing={isRemoving}
                                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label="Aadhar Front" error={errors?.aadhar_front} required>
                            <FormFileUpload
                                id={`aadhar_front`}
                                label={`Front image`}
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
                                label={`Back image`}
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
                    </div>
                </FormSection>

                {formData?.have_coapplicant === "Yes" ? (
                    <FormSection title="Co-Applicant Proofs" description="Identity documents of the business co-applicant.">
                        <FormField label="Aadhar Documents">
                            <div className="grid grid-cols-2 gap-4">
                                <FormFileUpload
                                    id={`coapplicant_aadhar_front`}
                                    label={`Front`}
                                    value={formData?.coapplicant_aadhar_front}
                                    error={errors?.coapplicant_aadhar_front}
                                    isUploading={isUploading}
                                    onChange={handleFileChange}
                                    handleUpload={handleUpload}
                                    required={false}
                                    removing={isRemoving}
                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                />
                                <FormFileUpload
                                    id={`coapplicant_aadhar_back`}
                                    label={`Back`}
                                    value={formData?.coapplicant_aadhar_back}
                                    error={errors?.coapplicant_aadhar_back}
                                    isUploading={isUploading}
                                    onChange={handleFileChange}
                                    handleUpload={handleUpload}
                                    required={false}
                                    removing={isRemoving}
                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                />
                            </div>
                        </FormField>
                        <FormField label="Co-Applicant PAN" error={errors?.coapplicant_pan}>
                            <FormFileUpload
                                id={`coapplicant_pan`}
                                label={`Upload PAN`}
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
                    <div className="hidden md:flex flex-col items-center justify-center bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 h-full">
                        <p className="text-zinc-400 text-sm italic">Co-applicant proofs will appear here if applicable.</p>
                    </div>
                )}
            </div>

            {/* Business Documents - Full Width or Custom Grid */}
            <FormSection title="Business Documentation" description="Mandatory and optional documents for your business.">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <FormField label="Company Image" error={errors?.company_image} required>
                        <FormFileUpload
                            id={`company_image`}
                            label={`Store Front/Office`}
                            value={formData?.company_image}
                            error={errors?.company_image}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={true}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="GST Certificate" error={errors?.gst_certificate}>
                        <FormFileUpload
                            id={`gst_certificate`}
                            label={`GST Document`}
                            value={formData?.gst_certificate}
                            error={errors?.gst_certificate}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="UDYAM Registration" error={errors?.udyam_registration}>
                        <FormFileUpload
                            id={`udyam_registration`}
                            label={`UDYAM Certificate`}
                            value={formData?.udyam_registration}
                            error={errors?.udyam_registration}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Form-3 / trade licence" error={errors?.form_3}>
                        <FormFileUpload
                            id={`form_3`}
                            label={`Trade Licence`}
                            value={formData?.form_3}
                            error={errors?.form_3}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="ITR 2023-24" error={errors?.itr_2023_2024}>
                        <FormFileUpload
                            id={`itr_2023_2024`}
                            label={`ITR 23-24`}
                            value={formData?.itr_2023_2024}
                            error={errors?.itr_2023_2024}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="ITR 2024-25" error={errors?.itr_2024_2025}>
                        <FormFileUpload
                            id={`itr_2024_2025`}
                            label={`ITR 24-25`}
                            value={formData?.itr_2024_2025}
                            error={errors?.itr_2024_2025}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Bank Statement" error={errors?.bank_statement}>
                        <FormFileUpload
                            id={`bank_statement`}
                            label={`Last 12 months`}
                            value={formData?.bank_statement}
                            error={errors?.bank_statement}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Shop Front Picture" error={errors?.shop_front}>
                        <FormFileUpload
                            id={`shop_front`}
                            label={`Additional Shop Pic`}
                            value={formData?.shop_front}
                            error={errors?.shop_front}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Electricity Bill" error={errors?.house_electricity}>
                        <FormFileUpload
                            id={`house_electricity`}
                            label={`Latest Bill`}
                            value={formData?.house_electricity}
                            error={errors?.house_electricity}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                </div>
            </FormSection>

            {/* Income Tax & Other Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {formData.file_income_tax === 'Yes' ? (
                    <FormSection title="Tax Proofs" description="Additional tax filings if applicable.">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField label="ITR Document 1" error={errors?.itr_1_upload}>
                                <FormFileUpload
                                    id={`itr_1_upload`}
                                    label={`Filing Proof 1`}
                                    value={formData?.itr_1_upload}
                                    error={errors?.itr_1_upload}
                                    isUploading={isUploading}
                                    onChange={handleFileChange}
                                    handleUpload={handleUpload}
                                    required={false}
                                    removing={isRemoving}
                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                />
                            </FormField>
                            <FormField label="ITR Document 2" error={errors?.itr_2_upload}>
                                <FormFileUpload
                                    id={`itr_2_upload`}
                                    label={`Filing Proof 2`}
                                    value={formData?.itr_2_upload}
                                    error={errors?.itr_2_upload}
                                    isUploading={isUploading}
                                    onChange={handleFileChange}
                                    handleUpload={handleUpload}
                                    required={false}
                                    removing={isRemoving}
                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                />
                            </FormField>
                        </div>
                    </FormSection>
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200">
                        <p className="text-zinc-400 text-sm italic">Tax proofs will appear here if selected.</p>
                    </div>
                )}

                <FormSection title="Additional Files" description="Any other documents requested or relevant.">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormFileUpload
                            id={`other_doc1`}
                            label={`Doc 1`}
                            value={formData?.other_doc1}
                            error={errors?.other_doc1}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                        <FormFileUpload
                            id={`other_doc2`}
                            label={`Doc 2`}
                            value={formData?.other_doc2}
                            error={errors?.other_doc2}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                        <FormFileUpload
                            id={`other_doc3`}
                            label={`Doc 3`}
                            value={formData?.other_doc3}
                            error={errors?.other_doc3}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </div>
                </FormSection>
            </div>
        </div>
    );
};

export default Documents;
