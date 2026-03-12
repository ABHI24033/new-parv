import React from 'react';
import { validateFields } from './formValidation';
import { FormFileUpload } from '@/components/common/FormFile';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';

const Documents = ({ formData, setFormData, errors, setErrors, handleRemoveDocsFromCloudaniry, isRemoving, isUploading, handleUpload, handleFileChange }) => {

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Personal Documents" description="Basic identity documents of the primary applicant.">
                    <FormField label="Applicant Selfie" error={errors?.applicant_selfie} required>
                        <FormFileUpload
                            id={`applicant_selfie`}
                            label={`Upload Applicant Selfie`}
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
                            label={`Upload personal PAN image`}
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
                </FormSection>

                {formData?.have_coapplicant === "Yes" ? (
                    <FormSection title="Co-Applicant Documents" description="Identity documents of the co-applicant.">
                        <FormField label="Aadhar Front" error={errors?.coapplicant_aadhar_front}>
                            <FormFileUpload
                                id={`coapplicant_aadhar_front`}
                                label={`Co - Applicant Aadhar Front`}
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
                                label={`Co - Applicant Aadhar Back`}
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
                                label={`Co - Applicant PAN`}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {formData?.profession === "Job" ? (
                    <FormSection title="Employment Documents" description="Financial proofs for salaried individuals.">
                        <FormField label="Salary Slip 1" error={errors?.salary_slip_1} required>
                            <FormFileUpload
                                id={`salary_slip_1`}
                                label={`Salary slip - 1`}
                                value={formData?.salary_slip_1}
                                error={errors?.salary_slip_1}
                                isUploading={isUploading}
                                onChange={handleFileChange}
                                handleUpload={handleUpload}
                                required={true}
                                removing={isRemoving}
                                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                            />
                        </FormField>
                        <FormField label="Salary Slip 2" error={errors?.salary_slip_2} required>
                            <FormFileUpload
                                id={`salary_slip_2`}
                                label={`Salary slip - 2`}
                                value={formData?.salary_slip_2}
                                error={errors?.salary_slip_2}
                                isUploading={isUploading}
                                onChange={handleFileChange}
                                handleUpload={handleUpload}
                                required={true}
                                removing={isRemoving}
                                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                            />
                        </FormField>
                        <FormField label="Salary Slip 3" error={errors?.salary_slip_3}>
                            <FormFileUpload
                                id={`salary_slip_3`}
                                label={`Salary slip - 3`}
                                value={formData?.salary_slip_3}
                                error={errors?.salary_slip_3}
                                isUploading={isUploading}
                                onChange={handleFileChange}
                                handleUpload={handleUpload}
                                required={false}
                                removing={isRemoving}
                                handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                            />
                        </FormField>
                        <FormField label="Other Doc" error={errors?.other_doc}>
                            <FormFileUpload
                                id={`other_doc`}
                                label={`Additional document`}
                                value={formData?.other_doc}
                                error={errors?.other_doc}
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
                    <FormSection title="Business Documents" description="Financial proofs for business owners.">
                        <FormField label="Company Image" error={errors?.company_image} required>
                            <FormFileUpload
                                id={`company_image`}
                                label={`Upload image`}
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
                                label={`GST certificate`}
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
                        <FormField label="UDYAM Reg" error={errors?.udyam_registration}>
                            <FormFileUpload
                                id={`udyam_registration`}
                                label={`UDYAM certificate`}
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
                        <FormField label="Form-3 / Trade" error={errors?.form_3}>
                            <FormFileUpload
                                id={`form_3`}
                                label={`Trade licence`}
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
                        <FormField label="Bank Stmt (12mo)" error={errors?.bank_statement}>
                            <FormFileUpload
                                id={`bank_statement`}
                                label={`Upload statement`}
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
                        <FormField label="House Elec Bill" error={errors?.house_electricity}>
                            <FormFileUpload
                                id={`house_electricity`}
                                label={`Upload bill`}
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
                    </FormSection>
                )}

                <FormSection title="Property Documents" description="Documents related to the financing property.">
                    <FormField label="Sale Deed" error={errors?.sale_deed} className="md:col-span-1">
                        <FormFileUpload
                            id={`sale_deed`}
                            label={`Upload deed`}
                            value={formData?.sale_deed}
                            error={errors?.sale_deed}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Mutation" error={errors?.mutation} className="md:col-span-1">
                        <FormFileUpload
                            id={`mutation`}
                            label={`Upload mutation`}
                            value={formData?.mutation}
                            error={errors?.mutation}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Current Rashid" error={errors?.rashid}>
                        <FormFileUpload
                            id={`rashid`}
                            label={`Upload rashid`}
                            value={formData?.rashid}
                            error={errors?.rashid}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="LPC Certificate" error={errors?.lpc}>
                        <FormFileUpload
                            id={`lpc`}
                            label={`Upload LPC`}
                            value={formData?.lpc}
                            error={errors?.lpc}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <FormSection title="Property Visuals" description="Pictures and maps of the property.">
                    <FormField label="Front View" error={errors?.property_pic}>
                        <FormFileUpload
                            id={`property_pic`}
                            label={`Front picture`}
                            value={formData?.property_pic}
                            error={errors?.property_pic}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Property Map" error={errors?.property_map}>
                        <FormFileUpload
                            id={`property_map`}
                            label={`Upload map`}
                            value={formData?.property_map}
                            error={errors?.property_map}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                    <FormField label="Chain Deed" error={errors?.chain_deed} className="md:col-span-2">
                        <FormFileUpload
                            id={`chain_deed`}
                            label={`Upload chain deed`}
                            value={formData?.chain_deed}
                            error={errors?.chain_deed}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            handleUpload={handleUpload}
                            required={false}
                            removing={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                    </FormField>
                </FormSection>

                <FormSection title="Secondary Docs" description="Any additional documents for approval.">
                    <FormField label="Document 1" error={errors?.other_doc1}>
                        <FormFileUpload
                            id={`other_doc1`}
                            label={`Upload document`}
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
                    <FormField label="Document 2" error={errors?.other_doc2}>
                        <FormFileUpload
                            id={`other_doc2`}
                            label={`Upload document`}
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
                    <FormField label="Document 3" error={errors?.other_doc3} className="md:col-span-2">
                        <FormFileUpload
                            id={`other_doc3`}
                            label={`Upload document`}
                            value={formData?.other_doc3}
                            error={errors?.other_doc3}
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
