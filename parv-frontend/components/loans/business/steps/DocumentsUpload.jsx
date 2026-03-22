import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const documents = [
        { id: "applicant_selfie", label: "Applicant Selfie" },
        { id: "aadhar_front", label: "Aadhar Front" },
        { id: "aadhar_back", label: "Aadhar Back" },
        { id: "personal_pan_upload", label: "Personal PAN" },
        { id: "company_image", label: "Company Image" },
        { id: "business_pan_upload", label: "Business PAN" },
        { id: "gst_upload", label: "GST Upload" },
        { id: "udyam_registration", label: "Udyam Registration" },
        { id: "form_3", label: "Form 3" },
        { id: "itr_2023_2024", label: "ITR (2023-24)" },
        { id: "itr_2024_2025", label: "ITR (2024-25)" },
        { id: "bank_statement", label: "Bank Statement" },
        { id: "shop_front", label: "Shop Front" },
        { id: "address_proof", label: "Address Proof" },
        { id: "other_doc_1", label: "Other Doc 1" },
        { id: "other_doc_2", label: "Other Doc 2" }
    ];

    return (
        <FormSectionCard
            title="Documents Upload"
            description="Upload required KYC and business documents."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, idx) => (
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
