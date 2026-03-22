import { useState, useEffect } from "react";
import { useGetUserDataByToken } from "@/hooks/useUser";
import { upload_single_file, remove_docs, getPublicIdFromUrl } from "@/lib/utils";
import toast from "react-hot-toast";
import useFormPersistence from "@/hooks/useFormPersistence";
import { del } from "idb-keyval";

export const useLoanForm = ({
    initialData,
    validateFields,
    validateAllFields,
    stepFields,
    mutation,
    persistenceKey,
    folderPrefix,
    formSteps,
    fileFields = [],
    extraPersistenceData = {},
}) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState({});
    const [isRemoving, setIsRemoving] = useState({});

    const { data: userData } = useGetUserDataByToken();
    const userProfile = userData?.data?.data?.user || {};

    // Folder Name Generation
    useEffect(() => {
        if (!formData.folderName) {
            const now = new Date();
            const formattedDate = now.toISOString().split("T")[0];
            const randomString = Math.random().toString(36).substring(2, 8);
            setFormData((prev) => ({
                ...prev,
                folderName: `${folderPrefix}-${formattedDate}-${randomString}`,
            }));
        }
    }, [folderPrefix, formData.folderName]);

    // Connector Info Initialization
    useEffect(() => {
        if (!userProfile?.role) return;
        setFormData((prev) => ({
            ...prev,
            id_of_connector: prev.id_of_connector || (userProfile.role === "Admin" ? "" : userProfile.username || ""),
            name_of_connector: prev.name_of_connector || (userProfile.role === "Admin" ? "" : userProfile.full_name || ""),
        }));
    }, [userProfile?.role, userProfile?.username, userProfile?.full_name]);

    // Persistence
    useFormPersistence(persistenceKey, {
        formData,
        setFormData,
        step,
        setStep,
        ...extraPersistenceData
    });

    const handleUpload = async (id, fileOverride) => {
        const file = fileOverride || formData[id];
        if (!(file instanceof File)) return;

        setIsUploading((prev) => ({ ...prev, [id]: true }));
        try {
            const result = await upload_single_file(id, file, `${folderPrefix}/${formData?.folderName}`);
            if (result?.url) {
                setFormData((prev) => ({ ...prev, [id]: result.url }));
                return result.url;
            } else {
                setErrors((prev) => ({ ...prev, [id]: result?.error || "Upload failed" }));
            }
        } catch (err) {
            console.error(`Upload error for ${id}:`, err);
        } finally {
            setIsUploading((prev) => ({ ...prev, [id]: false }));
        }
    };

    const handleFileChange = async (e) => {
        const { id, files } = e.target;
        const file = files[0];
        if (!file) return;

        // Max 2MB file size validation
        if (file.size > 2 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, [id]: "File size must be less than 2MB" }));
            toast.error("File size must be less than 2MB");
            return;
        }

        // Immediately update form data with the File object (temp)

        setFormData((prev) => ({ ...prev, [id]: file }));

        // Validate the field immediately
        const fieldValidation = validateFields({ ...formData, [id]: file }, [id]);
        setErrors((prev) => {
            const newErrors = { ...prev };
            if (!fieldValidation[id]) {
                delete newErrors[id];
            } else {
                newErrors[id] = fieldValidation[id];
            }
            return newErrors;
        });

        // If validation passes, auto-upload
        if (!fieldValidation[id]) {
            await handleUpload(id, file);
        }
    };

    const handleRemoveDocsFromCloudaniry = async (url, fieldName) => {
        try {
            setIsRemoving((prev) => ({ ...prev, [fieldName]: true }));
            const publicId = getPublicIdFromUrl(url);
            const result = await remove_docs(publicId);
            if (result?.success) {
                setFormData((prev) => ({ ...prev, [fieldName]: undefined }));
                toast.success(result.message || "Document removed successfully!");
            } else {
                toast.error(result.message || "Failed to remove document!");
            }
        } catch (error) {
            console.error("Error removing doc:", error);
            toast.error("Something went wrong while removing the document!");
        } finally {
            setIsRemoving((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    const handleNext = () => {
        const fieldsToValidate = stepFields[step];
        if (fieldsToValidate && fieldsToValidate.length > 0) {
            const stepErrors = validateFields(formData, fieldsToValidate);
            console.log(stepErrors);

            if (Object.keys(stepErrors).length > 0) {
                setErrors((prev) => ({ ...prev, ...stepErrors }));
                const firstErrorField = Object.keys(stepErrors)[0];
                const element = document.getElementById(firstErrorField);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            setErrors((prev) => {
                const newErrors = { ...prev };
                fieldsToValidate.forEach((field) => delete newErrors[field]);
                return newErrors;
            });
        }

        if (step < formSteps.length - 1) {
            setStep((prev) => prev + 1);
        } else {
            setIsDialogOpen(true);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
            setErrors({});
        }
    };

    const openPreview = () => {
        const fieldsToValidate = stepFields[step];
        if (fieldsToValidate && fieldsToValidate.length > 0) {
            const stepErrors = validateFields(formData, fieldsToValidate);
            if (Object.keys(stepErrors).length > 0) {
                setErrors((prev) => ({ ...prev, ...stepErrors }));
                const firstErrorField = Object.keys(stepErrors)[0];
                const element = document.getElementById(firstErrorField);
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
        setIsDialogOpen(true);
    };

    const handleFinalSubmit = async (finalData) => {
        const allFormErrors = validateAllFields(finalData || formData);
        if (Object.keys(allFormErrors).length > 0) {
            setErrors(allFormErrors);
            setIsDialogOpen(false);
            const firstErrorStep = formSteps.findIndex((s, idx) =>
                stepFields[idx]?.some((field) => allFormErrors[field])
            );
            if (firstErrorStep !== -1) setStep(firstErrorStep);
            const firstErrorField = Object.keys(allFormErrors)[0];
            const element = document.getElementById(firstErrorField);
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setIsSubmitting(true);
        setIsDialogOpen(false);

        // Sanitize data recursively: Ensure no File objects or empty objects remain in file fields
        const sanitize = (obj) => {
            if (!obj || typeof obj !== 'object') return obj;
            if (obj instanceof File) return undefined;

            if (Array.isArray(obj)) {
                return obj.map(sanitize);
            }

            const newObj = { ...obj };
            // If it's an empty object and we're at a potential file field level
            // Note: This is a bit aggressive but helps prevent the Mongoose error
            if (Object.keys(newObj).length === 0 && typeof newObj === 'object' && !(newObj instanceof Date)) {
                return undefined;
            }

            Object.keys(newObj).forEach(key => {
                newObj[key] = sanitize(newObj[key]);
            });
            return newObj;
        };

        const sanitizedData = sanitize(finalData || formData);

        // Check if anything is still uploading
        if (Object.values(isUploading).some(val => val === true)) {
            toast.error("Please wait for all documents to finish uploading.");
            setIsSubmitting(false);
            return;
        }

        try {
            mutation.mutate(sanitizedData, {
                onSuccess: async () => {
                    setOpenSuccess(true);
                    await del(persistenceKey);
                },
                onError: (error) => {
                    console.error("Submission failed:", error);
                    toast.error(error.message || "Failed to submit loan application. Please try again.");
                },
                onSettled: () => setIsSubmitting(false),
            });
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Submission failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    return {
        step,
        setStep,
        formData,
        setFormData,
        errors,
        setErrors,
        isDialogOpen,
        setIsDialogOpen,
        isSubmitting,
        openSuccess,
        setOpenSuccess,
        isUploading,
        isRemoving,
        handleUpload,
        handleFileChange,
        handleRemoveDocsFromCloudaniry,
        handleNext,
        handlePrevious,
        openPreview,
        handleFinalSubmit,
        userProfile,
    };
};
