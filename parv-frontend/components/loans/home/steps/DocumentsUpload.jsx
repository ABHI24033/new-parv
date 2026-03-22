import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const personalDocuments = [
        { id: "applicant_selfie", label: "Applicant Selfie" },
        { id: "aadhar_front", label: "Aadhar Front" },
        { id: "aadhar_back", label: "Aadhar Back" },
        { id: "personal_pan_upload", "label": "Personal PAN" },
    ];

    const coApplicantDocuments = [
        { id: "coapplicant_aadhar_front", label: "Co-applicant Aadhar Front" },
        { id: "coapplicant_aadhar_back", label: "Co-applicant Aadhar Back" },
        { id: "coapplicant_pan", label: "Co-applicant PAN" },
    ];

    const financialDocuments = [
        { id: "salary_slip_1", label: "Salary Slip 1" },
        { id: "salary_slip_2", label: "Salary Slip 2" },
        { id: "salary_slip_3", label: "Salary Slip 3" },
        { id: "gst_certificate", label: "GST Certificate" },
        { id: "udyam_registration", label: "Udyam Registration" },
        { id: "form_3", label: "Form 3" },
        { id: "itr_1", label: "ITR 1" },
        { id: "itr_2", label: "ITR 2" },
        { id: "bank_statement", label: "Bank Statement" },
    ];

    const propertyDocuments = [
        { id: "shop_front", label: "Shop Front" },
        { id: "house_electricity", label: "House Electricity" },
        { id: "lpc", label: "LPC" },
        { id: "rashid", label: "Rashid" },
        { id: "mutation", label: "Mutation" },
        { id: "sale_deed", label: "Sale Deed" },
        { id: "property_pic", label: "Property Picture" },
        { id: "property_map", label: "Property Map" },
        { id: "chain_deed", label: "Chain Deed" },
    ];

    const otherDocuments = [
        { id: "other_doc", label: "Other Doc" },
        { id: "other_doc1", label: "Other Doc 1" },
        { id: "other_doc2", label: "Other Doc 2" },
        { id: "other_doc3", label: "Other Doc 3" },
    ];

    const renderDocument = (doc) => (
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
    );

    return (
        <FormSectionCard
            title="Documents Upload"
            description="Upload KYC and property documents."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalDocuments.map(renderDocument)}

                {formData.have_coapplicant === "Yes" && coApplicantDocuments.map(renderDocument)}

                {financialDocuments.map(renderDocument)}

                {propertyDocuments.map(renderDocument)}

                {otherDocuments.map(renderDocument)}
            </div>
        </FormSectionCard>
    );
}
