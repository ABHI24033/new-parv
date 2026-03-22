import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AddressDetails({ formData, handleFieldChange, handleAddressSync, errors }) {
    return (
        <FormSectionCard
            title="Address Details"
            description="Permanent and present address."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                    required
                    label="Permanent Building"
                    id="permanent_building_name"
                    value={formData.permanent_building_name || ""}
                    onChange={(e) => handleFieldChange("permanent_building_name", e.target.value)}
                    error={errors?.permanent_building_name}
                />
                <FormInput
                    required
                    label="Permanent Street"
                    id="permanent_street_name"
                    value={formData.permanent_street_name || ""}
                    onChange={(e) => handleFieldChange("permanent_street_name", e.target.value)}
                    error={errors?.permanent_street_name}
                />
                <FormInput
                    required
                    label="Permanent City"
                    id="permanent_city"
                    value={formData.permanent_city || ""}
                    onChange={(e) => handleFieldChange("permanent_city", e.target.value)}
                    error={errors?.permanent_city}
                />
                <FormInput
                    required
                    label="Permanent District"
                    id="permanent_district"
                    value={formData.permanent_district || ""}
                    onChange={(e) => handleFieldChange("permanent_district", e.target.value)}
                    error={errors?.permanent_district}
                />
                <FormInput
                    required
                    label="Permanent State"
                    id="permanent_state"
                    value={formData.permanent_state || ""}
                    onChange={(e) => handleFieldChange("permanent_state", e.target.value)}
                    error={errors?.permanent_state}
                />
                <FormInput
                    required
                    label="Permanent Pincode"
                    type="number"
                    id="permanent_pincode"
                    value={formData.permanent_pincode || ""}
                    onChange={(e) => handleFieldChange("permanent_pincode", e.target.value)}
                    error={errors?.permanent_pincode}
                />
            </div>

            <div className="flex items-center gap-2 pt-4 pb-2">
                <Checkbox
                    id="same_as_permanent_address"
                    checked={formData.same_as_permanent_address}
                    onCheckedChange={(checked) => handleAddressSync(Boolean(checked))}
                />
                <Label htmlFor="same_as_permanent_address" className="font-semibold text-zinc-700 cursor-pointer">
                    Present address same as permanent
                </Label>
            </div>

            {!formData.same_as_permanent_address && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                    <FormInput
                        required
                        label="Present Building"
                        id="present_building_name"
                        value={formData.present_building_name || ""}
                        onChange={(e) => handleFieldChange("present_building_name", e.target.value)}
                        error={errors?.present_building_name}
                    />
                    <FormInput
                        required
                        label="Present Street"
                        id="present_street_name"
                        value={formData.present_street_name || ""}
                        onChange={(e) => handleFieldChange("present_street_name", e.target.value)}
                        error={errors?.present_street_name}
                    />
                    <FormInput
                        required
                        label="Present City"
                        id="present_city"
                        value={formData.present_city || ""}
                        onChange={(e) => handleFieldChange("present_city", e.target.value)}
                        error={errors?.present_city}
                    />
                    <FormInput
                        required
                        label="Present District"
                        id="present_district"
                        value={formData.present_district || ""}
                        onChange={(e) => handleFieldChange("present_district", e.target.value)}
                        error={errors?.present_district}
                    />
                    <FormInput
                        required
                        label="Present State"
                        id="present_state"
                        value={formData.present_state || ""}
                        onChange={(e) => handleFieldChange("present_state", e.target.value)}
                        error={errors?.present_state}
                    />
                    <FormInput
                        required
                        label="Present Pincode"
                        type="number"
                        id="present_pincode"
                        value={formData.present_pincode || ""}
                        onChange={(e) => handleFieldChange("present_pincode", e.target.value)}
                        error={errors?.present_pincode}
                    />
                </div>
            )}
        </FormSectionCard>
    );
}
