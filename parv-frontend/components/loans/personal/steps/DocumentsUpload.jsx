import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const documents = [
        { id: "applicant_selfie", label: "Applicant Selfie" },
        { id: "aadhar_front", label: "Aadhar Front" },
        { id: "aadhar_back", label: "Aadhar Back" },
        { id: "Personal_pan", label: "Personal PAN" },
        { id: "salary_slip_1", label: "Salary Slip 1" },
        { id: "salary_slip_2", label: "Salary Slip 2" },
        { id: "salary_slip_3", label: "Salary Slip 3" },
        { id: "offer_letter", label: "Offer Letter" },
    ];

    const coApplicantDocuments = [
        { id: "coapplicant_aadhar_front", label: "Co-applicant Aadhar Front" },
        { id: "coapplicant_aadhar_back", label: "Co-applicant Aadhar Back" },
        { id: "coapplicant_pan", label: "Co-applicant PAN" },
    ];

    const otherDocuments = [
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
            description="Upload KYC and income documents."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map(renderDocument)}

                {formData.have_coapplicant === "Yes" && coApplicantDocuments.map(renderDocument)}

                {otherDocuments.map(renderDocument)}
            </div>
        </FormSectionCard>
    );
}
