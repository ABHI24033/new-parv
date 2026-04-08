import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const documents = [
        { id: "applicant_selfie", label: "Applicant Selfie / Photo",required:true },
        { id: "aadhar_front", label: "Aadhar Front",required:true },
        { id: "aadhar_back", label: "Aadhar Back",required:true },
        { id: "Personal_pan", label: "Personal PAN",required:true },
        { id: "salary_slip_1", label: "Salary Slip 1",required:true },
        { id: "salary_slip_2", label: "Salary Slip 2",required:false },
        { id: "salary_slip_3", label: "Salary Slip 3",required:false },
        { id: "offer_letter", label: "Offer Letter",required:false },
        { id: "bank_statement", label: "Bank Statement",required:true },
    ];

    const coApplicantDocuments = [
        { id: "coapplicant_aadhar_front", label: "Co-applicant Aadhar Front",required:false },
        { id: "coapplicant_aadhar_back", label: "Co-applicant Aadhar Back",required:false },
        { id: "coapplicant_pan", label: "Co-applicant PAN",required:false },
    ];

    const otherDocuments = [
        { id: "other_doc1", label: "Other Doc 1",required:false },
        { id: "other_doc2", label: "Other Doc 2",required:false },
        { id: "other_doc3", label: "Other Doc 3",required:false },
    ];

    const renderDocument = (doc) => (
        <div key={doc.id} className="space-y-3">
            <Label className="font-semibold text-zinc-700">
                {doc.label} 
                {
                    doc.required ?<span className="text-red-500">*</span> :""
                }
                
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
