"use client";

import React from "react";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { FormSelect } from "@/components/forms/reusable/FormSelect";
import { useDSAList } from "@/hooks/dsa/useDSADataTable";
import { useAuth } from "@/context/AuthContext";

/**
 * ConnectorSelector Component
 * Handles role-based display and logic for ID of Connector and Name of Connector.
 * 
 * @param {Object} formData - Current form data
 * @param {Function} handleFieldChange - Function to update form data
 * @param {Object} errors - Form validation errors
 */
export function ConnectorSelector({ formData, handleFieldChange, errors }) {
    const { user: userProfile } = useAuth();
    const isAdmin = userProfile?.role === "Admin";
    const { dsaData } = useDSAList(""); // Fetch all DSAs for Admin selection

    // Fallback: If non-admin and fields are empty, auto-fill them from profile
    React.useEffect(() => {
        if (!isAdmin && userProfile && !formData.id_of_connector) {
            handleFieldChange("id_of_connector", userProfile.username);
            handleFieldChange("name_of_connector", userProfile.full_name);
        }
    }, [userProfile, formData.id_of_connector, isAdmin, handleFieldChange]);

    // If NOT an Admin, show read-only fields auto-filled with user's own data
    if (!isAdmin) {
        return (
            <>
                <FormInput
                    required
                    label="Connector ID"
                    id="id_of_connector"
                    value={formData.id_of_connector || ""}
                    readOnly
                    className="bg-slate-50 cursor-not-allowed font-medium text-slate-500 border-slate-200"
                    placeholder="Auto-filled from profile"
                    error={errors?.id_of_connector}
                />
                <FormInput
                    required
                    label="Connector Name"
                    id="name_of_connector"
                    value={formData.name_of_connector || ""}
                    readOnly
                    className="bg-slate-50 cursor-not-allowed font-medium text-slate-500 border-slate-200"
                    placeholder="Auto-filled from profile"
                    error={errors?.name_of_connector}
                />
            </>
        );
    }

    // If Admin, show a selection for Connector ID and auto-fill Name
    return (
        <>
            <FormSelect
                required
                label="Connector ID / DSA"
                id="connector_selector"
                placeholder="Select a Connector (DSA)"
                value={formData.id_of_connector || ""}
                onChange={(val) => {
                    const selectedDsa = dsaData.find(d => d.username === val);
                    handleFieldChange("id_of_connector", val);
                    if (selectedDsa) {
                        handleFieldChange("name_of_connector", selectedDsa.full_name || "");
                    }
                }}
                options={dsaData.map(d => ({ 
                    label: `${d.username} - ${d.full_name}`, 
                    value: d.username 
                }))}
                error={errors?.id_of_connector}
            />
            <FormInput
                required
                label="Connector Name"
                id="name_of_connector"
                value={formData.name_of_connector || ""}
                readOnly
                className="bg-slate-50 font-medium text-slate-600 border-slate-200"
                placeholder="Auto-filled on selection"
                error={errors?.name_of_connector}
            />
        </>
    );
}
