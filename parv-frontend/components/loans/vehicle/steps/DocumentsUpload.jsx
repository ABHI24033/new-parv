import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const documentsList = [
        { id: "applicant_selfie", label: "Applicant Selfie" },
        { id: "aadhar_front", label: "Aadhar Front" },
        { id: "aadhar_back", label: "Aadhar Back" },
        { id: "personal_pan", label: "Personal PAN" },
        { id: "address_prooof", label: "Address Proof" },
        ...(formData.have_coapplicant === "Yes" ? [
            { id: "coapplicant_aadhar_front", label: "Co-applicant Aadhar Front" },
            { id: "coapplicant_aadhar_back", label: "Co-applicant Aadhar Back" },
            { id: "coapplicant_pan", label: "Co-applicant PAN" },
        ] : []),
        { id: "salary_slip_1", label: "Salary Slip 1" },
        { id: "salary_slip_2", label: "Salary Slip 2" },
        { id: "salary_slip_3", label: "Salary Slip 3" },
        { id: "form_16_itr_1", label: "Form 16 / ITR 1" },
        { id: "form_16_itr_2", label: "Form 16 / ITR 2" },
        { id: "electricity_bill", label: "Electricity Bill" },
        { id: "business_images", label: "Business Images" },
        { id: "business_proof", label: "Business Proof" },
        { id: "itr_1", label: "ITR 1" },
        { id: "itr_2", label: "ITR 2" },
        { id: "another_1", label: "Another Doc 1" },
        { id: "another_2", label: "Another Doc 2" },
        { id: "another_3", label: "Another Doc 3" },
        { id: "sale_deed", label: "Sale Deed" },
        { id: "mutation", label: "Mutation" },
        { id: "rashid", label: "Rashid" },
        { id: "lpc", label: "LPC" },
        { id: "property_pic", label: "Property Picture" },
        { id: "property_map", label: "Property Map" },
        { id: "chain_deed", label: "Chain Deed" },
        { id: "guarantor_aadhar_front", label: "Guarantor Aadhar Front" },
        { id: "guarantor_aadhar_back", label: "Guarantor Aadhar Back" },
        { id: "guarantor_pan", label: "Guarantor PAN" },
        { id: "vehicle_quotation", label: "Vehicle Quotation" },
        { id: "owner_book", label: "Owner Book" },
    ];

    return (
        <FormSectionCard
            title="Documents Upload"
            description="Upload KYC and other required documents."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentsList.map((doc) => (
                    <div key={doc.id} className="space-y-3">
                        <Label className="font-semibold text-zinc-700">
                            {doc.label} <span className="text-red-500">*</span>
                        </Label>
                        <FormFileUpload
                            id={doc.id}
                            label={doc.label}
                            value={formData[doc.id]}
                            error={errors?.[doc.id]}
                            isUploading={isUploading}
                            onChange={handleFileChange}
                            isRemoving={isRemoving}
                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                        />
                        {errors?.[doc.id] && <p className="text-xs text-red-500 font-medium">— {errors[doc.id]}</p>}
                    </div>
                ))}
            </div>
        </FormSectionCard>
    );
}
