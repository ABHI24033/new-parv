import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";
import toast from "react-hot-toast";

export function ReferenceDetails({ formData, setFormData, errors, setErrors, validateFields }) {

    const addReference = () => {
        if (formData.references.length < 2) {
            setFormData((prev) => ({
                ...prev,
                references: [
                    ...prev.references,
                    { name: "", relation: "", phone: "", village: "", street: "", district: "", pincode: "", profession: "" },
                ],
            }));
        } else {
            toast.error("Maximum 2 references allowed");
        }
    };

    const removeReference = (index) => {
        if (formData.references.length > 1) {
            setFormData((prev) => ({
                ...prev,
                references: prev.references.filter((_, i) => i !== index),
            }));
        }
    };

    const handleReferenceChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedReferences = [...prev.references];
            updatedReferences[index] = { ...updatedReferences[index], [field]: value };
            return { ...prev, references: updatedReferences };
        });

        const fieldName = `references.${index}.${field}`;
        const fieldValidation = validateFields(
            { ...formData, references: formData.references.map((r, i) => i === index ? { ...r, [field]: value } : r) },
            [fieldName]
        );

        setErrors((prevErrors) => {
            const nextErrors = { ...prevErrors };
            if (!fieldValidation[fieldName]) delete nextErrors[fieldName];
            else nextErrors[fieldName] = fieldValidation[fieldName];
            return nextErrors;
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="font-bold flex items-center gap-2 text-zinc-800">
                    <UsersIcon className="w-5 h-5 text-blue-600" /> Reference Details ({formData.references?.length || 0})
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addReference}
                    disabled={(formData.references?.length || 0) >= 2}
                    className="rounded-xl font-bold border-blue-100 text-blue-600 hover:bg-blue-50"
                >
                    + Add Reference
                </Button>
            </div>

            {formData.references?.map((ref, idx) => (
                <Card key={idx} className="rounded-2xl border-zinc-200 shadow-sm overflow-hidden">
                    <CardHeader className="py-4 bg-zinc-50/50 border-b flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Reference {idx + 1}</CardTitle>
                        </div>
                        {(formData.references?.length || 0) > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeReference(idx)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold"
                            >
                                Remove
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FormInput
                                required
                                label="Full Name"
                                value={ref.name || ""}
                                onChange={(e) => handleReferenceChange(idx, "name", e.target.value)}
                                error={errors?.[`references.${idx}.name`]}
                            />
                            <FormSelect
                                required
                                label="Relation"
                                value={ref.relation || ""}
                                onChange={(v) => handleReferenceChange(idx, "relation", v)}
                                error={errors?.[`references.${idx}.relation`]}
                                options={[
                                    { label: "Friend", value: "Friend" },
                                    { label: "Family Member", value: "Family Member" },
                                    { label: "Relative", value: "Relative" },
                                ]}
                            />
                            <FormInput
                                required
                                type="tel"
                                label="Contact Number"
                                value={ref.phone || ""}
                                onChange={(e) => handleReferenceChange(idx, "phone", e.target.value)}
                                error={errors?.[`references.${idx}.phone`]}
                            />
                            <FormSelect
                                required
                                label="Profession"
                                value={ref.profession || ""}
                                onChange={(v) => handleReferenceChange(idx, "profession", v)}
                                error={errors?.[`references.${idx}.profession`]}
                                options={[
                                    { label: "Job", value: "Job" },
                                    { label: "Business", value: "Business" },
                                    { label: "CA", value: "CA" },
                                    { label: "Doctor", value: "Doctor" },
                                    { label: "Farmer", value: "Farmer" },
                                    { label: "Advocate", value: "Advocate" },
                                    { label: "Non Professional / Unemployed", value: "Non Professional / Unemployed" },
                                ]}
                            />
                        </div>

                        <div className="border-t border-zinc-100 pt-6">
                            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Address Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormInput
                                    required
                                    label="Village / Town"
                                    value={ref.village || ""}
                                    onChange={(e) => handleReferenceChange(idx, "village", e.target.value)}
                                    error={errors?.[`references.${idx}.village`]}
                                />
                                <FormInput
                                    required
                                    label="Street Name"
                                    value={ref.street || ""}
                                    onChange={(e) => handleReferenceChange(idx, "street", e.target.value)}
                                    error={errors?.[`references.${idx}.street`]}
                                />
                                <FormInput
                                    required
                                    label="District"
                                    value={ref.district || ""}
                                    onChange={(e) => handleReferenceChange(idx, "district", e.target.value)}
                                    error={errors?.[`references.${idx}.district`]}
                                />
                                <FormInput
                                    required
                                    type="number"
                                    label="Pincode"
                                    value={ref.pincode || ""}
                                    onChange={(e) => handleReferenceChange(idx, "pincode", e.target.value)}
                                    error={errors?.[`references.${idx}.pincode`]}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
