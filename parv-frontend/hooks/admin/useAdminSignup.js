"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { validateAllFields } from "@/app/dsa/apply/formValidation";
import useImageUpload, { useImageRemove } from "@/api/imageUpload";
import { createDSAAccountAPI } from "@/api/dsa";

export default function useAdminSignup() {
    const [uploadFolder, setUploadFolder] = useState("");

    // Initialize uploadFolder on mount (from localStorage or new)
    useEffect(() => {
        const savedFolder = localStorage.getItem("admin_upload_folder");
        if (savedFolder) {
            setUploadFolder(savedFolder);
        } else {
            const newFolder = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
            setUploadFolder(newFolder);
            localStorage.setItem("admin_upload_folder", newFolder);
        }
    }, []);

    const initialForm = {
        full_name: "",
        guardian_name: "",
        dob: "",
        gender: "Male",
        marital_status: "Unmarried",
        phone_no: "",
        alt_phone_no: "",
        email: "",
        aadhar_no: "",
        pan_no: "",
        present_address: "",
        permanent_address: "",
        work_location: "",
        bank_account_no: "",
        bank_branch: "",
        designation: "RM", // Default to RM

        // file URLs (after upload)
        aadhar: "",
        pan: "",
        photo: "",
        bank_doc: "",
        education_certificate: "",
    };

    const [form, setForm] = useState(initialForm);

    // Load form data from localStorage on mount
    useEffect(() => {
        const savedForm = localStorage.getItem("admin_form_data");
        if (savedForm) {
            try {
                setForm(JSON.parse(savedForm));
            } catch (e) {
                console.error("Failed to parse saved form data", e);
            }
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("admin_form_data", JSON.stringify(form));
    }, [form]);

    const [errors, setErrors] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);

    // ----------------------------------------------------
    // Text & Select Handlers
    // ----------------------------------------------------
    const handleChange = (e) => {
        const { id, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));

        if (errors[id]) {
            setErrors((prev) => {
                const err = { ...prev };
                delete err[id];
                return err;
            });
        }
    };

    const handleSelectChange = (id, value) => {
        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));

        if (errors[id]) {
            setErrors((prev) => {
                const err = { ...prev };
                delete err[id];
                return err;
            });
        }
    };

    // ----------------------------------------------------
    // File Upload Handler (Cloudinary)
    // ----------------------------------------------------
    const { mutateAsync: uploadImage } = useImageUpload();
    const { mutateAsync: removeImage } = useImageRemove();

    // Track uploading state per field: { [fieldName]: boolean }
    const [uploadingFields, setUploadingFields] = useState({});

    const handleFileUpload = async (fieldName, file) => {
        if (!file) return;

        // Set uploading state for this specific field
        setUploadingFields((prev) => ({ ...prev, [fieldName]: true }));

        try {
            const uploaded = await uploadImage({
                file,
                folder: `admin/${uploadFolder}`, // folder-wise upload
            });

            setForm((prev) => ({
                ...prev,
                [fieldName]: uploaded.url, // secure URL
            }));

            if (errors[fieldName]) {
                setErrors((prev) => {
                    const err = { ...prev };
                    delete err[fieldName];
                    return err;
                });
            }
        } catch (err) {
            toast.error("Image upload failed!");
        } finally {
            // Clear uploading state for this specific field
            setUploadingFields((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    const handleRemoveFile = async (url, fieldName) => {
        if (!url) return;

        try {
            await removeImage({ url });
            setForm((prev) => ({
                ...prev,
                [fieldName]: "",
            }));
            toast.success("Image removed successfully");
        } catch (error) {
            console.error("Error removing image:", error);
            toast.error("Failed to remove image");
        }
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) handleFileUpload(fieldName, file);
    };

    // ----------------------------------------------------
    // Submit Mutation
    // ----------------------------------------------------
    const mutation = useMutation({
        mutationFn: (data) => createDSAAccountAPI({ ...data, role: data.designation, status: 'approved' }), // Force status approved
        onSuccess: () => {
            setOpenSuccess(true);
            toast.success("Account created successfully!");
            // Clear storage and reset form on success
            localStorage.removeItem("admin_form_data");
            localStorage.removeItem("admin_upload_folder");
            setForm(initialForm);
            // Generate new folder for next time
            const newFolder = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
            setUploadFolder(newFolder);
            localStorage.setItem("admin_upload_folder", newFolder);
        },
        onError: (error) => {
            toast.error(error.message || "Submission failed!");
        },
    });

    // ----------------------------------------------------
    // Submit Driver
    // ----------------------------------------------------
    const submitForm = async () => {
        const validation = validateAllFields(form);

        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            const first = Object.keys(validation)[0];
            document.getElementById(first)?.focus();
            return;
        }

        mutation.mutate(form);
    };

    const handleReset = async () => {
        if (confirm("Are you sure you want to reset the form? This will delete all uploaded documents.")) {
            try {
                localStorage.removeItem("admin_form_data");
                localStorage.removeItem("admin_upload_folder");
                setForm(initialForm);

                // Generate new folder
                const newFolder = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
                setUploadFolder(newFolder);
                localStorage.setItem("admin_upload_folder", newFolder);

                toast.success("Form reset successfully");
            } catch (error) {
                console.error("Error resetting form:", error);
                toast.error("Failed to reset form completely");
            }
        }
    };

    return {
        form,
        errors,
        uploadingFields,
        handleRemoveFile,
        openSuccess,
        isSubmitting: mutation.isPending,

        handleChange,
        handleSelectChange,
        handleFileChange,
        submitForm,
        setOpenSuccess,
        handleReset,
    };
}
