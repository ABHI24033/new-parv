'use client'
import React from 'react';
import { validateFields } from './formValidation';
import { FormFileUpload } from '@/components/common/FormFile';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const Documents = ({ formData, setFormData, errors, setErrors, handleUpload, isUploading, handleRemoveDocsFromCloudaniry, isRemoving, handleFileChange }) => {

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection
                    title="Upload Documents"
                    description="Upload clear images of your original documents."
                >
                    <FormField label="Aadhar Front" error={errors?.aadhar_front} required>
                        <FormFileUpload
                            id={`aadhar_front`}
                            label={`Upload aadhar front image`}
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
                            label={`Upload aadhar back image`}
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

                    <FormField label="PAN Card" error={errors?.personal_pan_upload} required>
                        <FormFileUpload
                            id={`personal_pan_upload`}
                            label={`Upload Personal PAN image`}
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

                    <FormField label="Address Proof (Electricity Bill)" error={errors?.house_electricity} required>
                        <FormFileUpload
                            id={`house_electricity`}
                            label={`Upload electricity bill`}
                            value={formData?.house_electricity}
                            error={errors?.house_electricity}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={true}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>

                    <FormField label="Other Document 1" error={errors?.other_doc1}>
                        <FormFileUpload
                            id={`other_doc1`}
                            label={`Upload additional document`}
                            value={formData?.other_doc1}
                            error={errors?.other_doc1}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>

                    <FormField label="Other Document 2" error={errors?.other_doc2}>
                        <FormFileUpload
                            id="other_doc2"
                            label="Upload additional document"
                            value={formData?.other_doc2}
                            error={errors?.other_doc2}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
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
