import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormFileUpload } from "@/components/forms/reusable/FormFileUpload";
import { Label } from "@/components/ui/label";

export function DocumentsUpload({ formData, errors, handleFileChange, isUploading, isRemoving, handleRemoveDocsFromCloudaniry }) {

    const documentsList = [
        { id: "applicant_selfie", label: "Applicant Selfie" },
        { id: "aadhar_front", label: "Aadhar Front" },
        { id: "aadhar_back", label: "Aadhar Back" },
        { id: "personal_pan_upload", label: "Personal PAN" },
        { id: "house_electricity", label: "House Electricity Bill" },
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
