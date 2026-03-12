"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { upload_single_file } from "@/lib/utils";
import { useUserState } from "@/app/dashboard/store";
import { setLoanByID } from "@/lib/actions/loan";
import FormInput from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import { FormFileUploadForMembers } from "@/components/common/FormFile";
import { LoadingModal, UserSuccessModal } from "@/components/common/Modals";
import { FormRadio } from "@/components/common/FormRadio";
import { validateAllFields, validateFields } from "@/app/dashboard/forms/group_loan/formValidation";

const GroupLoan = ({ id, initialData }) => {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const userState = useUserState();

    const [uploading, setUploading] = useState({ temp: false });
    const [removing, setRemoving] = useState({ temp: false });


    const handleMemberChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedMembers = [...prev.members];
            updatedMembers[index] = {
                ...updatedMembers[index],
                [field]: value,
            };
            return {
                ...prev,
                members: updatedMembers,
            };
        });
    };


    const handleMemberDocumentChange = (index, docField, value) => {
        // 1. Create updated formData (candidate, but don’t set yet)
        const updatedFormData = {
            ...formData,
            members: formData.members.map((member, i) =>
                i === index
                    ? {
                        ...member,
                        documents: {
                            ...member.documents,
                            [docField]: value,
                        },
                    }
                    : member
            ),
        };

        // 2. Run validation only for this field
        const fieldErrors = validateFields(updatedFormData, [`members.${index}.documents.${docField}`]);
        if (Object.keys(fieldErrors).length === 0) {
            setFormData(updatedFormData);
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[`members.${index}.documents.${docField}`];
                return newErrors;
            });
        } else {
            setErrors((prev) => ({
                ...prev,
                [`members.${index}.documents.${docField}`]: fieldErrors[`members.${index}.documents.${docField}`],
            }));
        }
    };

    const handleUpload = async (id, index) => {
        const file = formData?.members[index]?.documents[id];
        if (!(file instanceof File)) return;
        setUploading((prev) => ({ ...prev, [`${index}-${id}`]: true }));

        try {
            const result = await upload_single_file(id, file, `grouploan/${formData?.folderName}`);

            if (result?.url) {
                setFormData((prev) => {
                    const updatedMembers = [...prev.members];
                    updatedMembers[index] = {
                        ...updatedMembers[index],
                        documents: {
                            ...updatedMembers[index].documents,
                            [id]: result?.url,
                        },
                    };
                    return {
                        ...prev,
                        members: updatedMembers,
                    };
                });
            } else {
                alert("somethinbg went wrong")
            }
        } catch (err) {
            console.error(`Upload error for ${id}:`, err);
        } finally {
            setUploading((prev) => ({ ...prev, [`${index}-${id}`]: false }));
        }
    };

    const handleRemoveDocsFromCloudaniry = async (url, index, id) => {
        try {
            setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: true }));
            const publicId = getPublicIdFromUrl(url);
            const result = await remove_docs(publicId);
            if (result?.success) {
                setFormData((prev) => {
                    const updatedMembers = [...prev.members];
                    updatedMembers[index] = {
                        ...updatedMembers[index],
                        documents: {
                            ...updatedMembers[index].documents,
                            [id]: "",
                        },
                    };
                    return {
                        ...prev,
                        members: updatedMembers,
                    };
                });
                alert(result?.message);
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong !");
        } finally {
            setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: true }));
        }
    }
    const formSteps = [
        { id: "instructions", title: "Instructions" },
        { id: "group_info", title: "Group Info" },
        { id: "members", title: "Member Details" },
    ];

    const handleCloseSuccessModel=()=>{
        setIsSuccess(false);
    }
    const stepFields = {
        0: [], // Instructions
        1: [
            "loan_amount",
            "id_of_connector",
            "name_of_connector",
            "nearest_branch",
            "group_name",
            "group_size",
            "group_village",
            "group_post",
            "group_police_station",
            "group_district",
            "group_pincode",
        ],
        2: [
            "members"
        ],
    };

    const handleFinalSubmit = async () => {
        const allFormErrors = validateAllFields(formData);

        if (Object.keys(allFormErrors).length > 0) {
            setErrors(allFormErrors);
            const firstErrorStep = formSteps.findIndex((s) =>
                stepFields[formSteps.indexOf(s)]?.some((field) => allFormErrors[field])
            );
            if (firstErrorStep !== -1) {
                setStep(firstErrorStep);
            }
            const firstErrorField = Object.keys(allFormErrors)[0];
            document.getElementById(firstErrorField)?.focus();
            return;
        }

        setIsSubmitting(true);
        const dataToSubmit = { ...formData };

        try {
            const token = await userState.user.getIdToken();
            userState.setShowLoader(true);
            const res = await setLoanByID(token, id, dataToSubmit);
            if (res && res?.msg) {
                setIsSuccess(true);
            }else{
                alert("Update fail")
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Submission failed. Please check console for details.");
        } finally {
            userState.setShowLoader(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto ">
            <Card className="max-w-full mx-auto my-8 border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight text-start">
                        Edit Group Loan Application
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="space-y-8"
                    >
                        {/* Personal Details Section */}
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium tracking-tight mb-4">
                                Group Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    id={"loan_amount"}
                                    label={"Loan Amount"}
                                    onChange={(e) => handleFieldChange("loan_amount", e?.target?.value)}
                                    value={formData?.loan_amount}
                                    error={errors?.loan_amount}
                                    required={true}
                                />
                                <FormInput
                                    id={"id_of_connector"}
                                    label={"DSA ID"}
                                    onChange={(e) => handleFieldChange("id_of_connector", e?.target?.value)}
                                    value={formData?.id_of_connector}
                                    error={errors?.id_of_connector}
                                    required={true}
                                />
                                <FormInput
                                    id={"name_of_connector"}
                                    label={"DSA Name"}
                                    onChange={(e) => handleFieldChange("name_of_connector", e?.target?.value)}
                                    value={formData?.name_of_connector}
                                    error={errors?.name_of_connector}
                                    required={true}
                                />

                                <FormSelect
                                    id="nearest_branch"
                                    label={"Select nearest branch"}
                                    onChange={(value) => handleFieldChange("nearest_branch", value)}
                                    value={formData?.nearest_branch}
                                    error={errors?.nearest_branch}
                                    required={true}
                                    options={[
                                        { value: "Bikramganj", label: "Bikramganj" },
                                        { value: "Sasaram", label: "Sasaram" },
                                        { value: "Dehri", label: "Dehri" },
                                    ]}
                                />

                                <FormInput
                                    id={"group_name"}
                                    label={"Group Name"}
                                    onChange={(e) => handleFieldChange("group_name", e?.target?.value)}
                                    value={formData?.group_name}
                                    error={errors?.group_name}
                                    required={true}
                                />

                                <FormSelect
                                    id="group_size"
                                    label={"Total members in group"}
                                    onChange={(val) => handleFieldChange("group_size", val)}
                                    value={formData?.group_size}
                                    error={errors?.group_size}
                                    required={true}
                                    options={[
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" },
                                        { value: "4", label: "4" },
                                        { value: "5", label: "5" },
                                        { value: "6", label: "6" },
                                        { value: "7", label: "7" },
                                        { value: "8", label: "8" },
                                        { value: "9", label: "9" },
                                        { value: "10", label: "10" },
                                        { value: "11", label: "11" },
                                        { value: "12", label: "12" },
                                        { value: "13", label: "13" },
                                        { value: "14", label: "14" },
                                        { value: "15", label: "15" },
                                    ]}
                                />
                            </div>
                        </div>

                        {/* Co-applicant Details Section */}
                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium tracking-tight mb-4">
                                Group Address
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput
                                    id={"group_village"}
                                    label={"Village Name"}
                                    onChange={(e) => handleFieldChange("group_village", e?.target?.value)}
                                    value={formData?.group_village}
                                    error={errors?.group_village}
                                    required={true}
                                />
                                <FormInput
                                    id={"group_post"}
                                    label={"Post Office"}
                                    onChange={(e) => handleFieldChange("group_post", e?.target?.value)}
                                    value={formData?.group_post}
                                    error={errors?.group_post}
                                    required={true}
                                />
                                <FormInput
                                    id={"group_police_station"}
                                    label={"Police Station"}
                                    onChange={(e) => handleFieldChange("group_police_station", e?.target?.value)}
                                    value={formData?.group_police_station}
                                    error={errors?.group_police_station}
                                    required={true}
                                />
                                <FormInput
                                    id={"group_district"}
                                    label={"District"}
                                    onChange={(e) => handleFieldChange("group_district", e?.target?.value)}
                                    value={formData?.group_district}
                                    error={errors?.group_district}
                                    required={true}
                                />
                                <FormInput
                                    id={"group_pincode"}
                                    label={"Pincode"}
                                    onChange={(e) => handleFieldChange("group_pincode", e?.target?.value)}
                                    value={formData?.group_pincode}
                                    error={errors?.group_pincode}
                                    required={true}
                                />

                            </div>
                        </div>

                        <div className="mb-8 pb-6 border-b border-gray-200">
                            <h3 className="text-xl font-medium tracking-tight mb-4">Member's Details  ({formData?.members?.length})</h3>
                            <div className='grid gap-4 grid-cols-1 '>
                                {
                                    formData?.members?.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <h3 className='font-medium text-sm space-y-2 mb-2'>Member - ({index + 1})</h3>
                                                <div className=" max-w-full gap-4 border p-6 rounded-md">
                                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                                        <FormInput
                                                            id={`name`}
                                                            label={"Name"}
                                                            onChange={(e) => handleMemberChange(index, "name", e?.target?.value)}
                                                            value={formData?.members[index]?.name}
                                                            error={errors[`members.${index}.name`]}
                                                            required={true}
                                                        />
                                                        <FormInput
                                                            id={`phone`}
                                                            label={"Phone Number"}
                                                            onChange={(e) => handleMemberChange(index, "phone", e?.target?.value)}
                                                            value={formData?.members[index]?.phone}
                                                            error={errors[`members.${index}.phone`]}
                                                            required={true}
                                                        />
                                                        <FormInput
                                                            id={`email`}
                                                            label={"Email"}
                                                            onChange={(e) => handleMemberChange(index, "email", e?.target?.value)}
                                                            value={formData?.members[index]?.email}
                                                            error={errors[`members.${index}.email`]}
                                                            required={false}
                                                        />

                                                        <FormInput
                                                            id={`whatsapp_number`}
                                                            label={"What's app Number"}
                                                            onChange={(e) => handleMemberChange(index, "whatsapp_number", e?.target?.value)}
                                                            value={formData?.members[index]?.whatsapp_number}
                                                            error={errors[`members.${index}.whatsapp_number`]}
                                                            required={true}
                                                        />
                                                        <FormInput
                                                            id={`husband_name`}
                                                            label={"Husband's Name"}
                                                            onChange={(e) => handleMemberChange(index, "husband_name", e?.target?.value)}
                                                            value={formData?.members[index]?.husband_name}
                                                            error={errors[`members.${index}.husband_name`]}
                                                            required={false}
                                                        />
                                                        <FormInput
                                                            id={`husband_phone`}
                                                            label={"Husband Phone Number"}
                                                            onChange={(e) => handleMemberChange(index, "husband_phone", e?.target?.value)}
                                                            value={formData?.members[index]?.husband_phone}
                                                            error={errors[`members.${index}.husband_phone`]}
                                                            required={false}
                                                        />

                                                        <FormSelect
                                                            id={`husband_profession`}
                                                            label={"Husband's Profession"}
                                                            onChange={(value) => handleMemberChange(index, "husband_profession", value)}
                                                            value={formData?.members[index]?.husband_profession}
                                                            error={errors[`members.${index}.husband_profession`]}
                                                            required={false}
                                                            options={[
                                                                { value: "Private Job", label: "Private Job" },
                                                                { value: "Govt. Job", label: "Govt. Job" },
                                                                { value: "Business", label: "Business" },
                                                                { value: "Farmer", label: "Farmer" },
                                                                { value: "Labour / Mistri", label: "Labour / Mistri" },
                                                                { value: "Other", label: "Other" },
                                                            ]}
                                                        />

                                                        <FormRadio
                                                            id={`has_own_house`}
                                                            label="Does customer has own house ?"
                                                            required
                                                            value={formData?.members[index]?.has_own_house}
                                                            onChange={(value) => handleMemberChange(index, "has_own_house", value)}
                                                            error={errors[`members.${index}.has_own_house`]}
                                                            options={[
                                                                { value: "Yes", label: "Yes" },
                                                                { value: "No", label: "No" },
                                                            ]}
                                                        />
                                                        <FormRadio
                                                            id={`have_any_current_loan`}
                                                            label="Does customer have any current loan ?"
                                                            required
                                                            value={formData?.members[index]?.have_any_current_loan}
                                                            onChange={(value) => handleMemberChange(index, "have_any_current_loan", value)}
                                                            error={errors[`members.${index}.have_any_current_loan`]}
                                                            options={[
                                                                { value: "Yes", label: "Yes" },
                                                                { value: "No", label: "No" },
                                                            ]}
                                                        />
                                                        <FormRadio
                                                            id={`past_loan_record`}
                                                            label="Is customers past loan record is good "
                                                            required
                                                            value={formData?.members[index]?.past_loan_record}
                                                            onChange={(value) => handleMemberChange(index, "past_loan_record", value)}
                                                            error={errors[`members.${index}.past_loan_record`]}
                                                            options={[
                                                                { value: "Yes", label: "Yes" },
                                                                { value: "No", label: "No" },
                                                            ]}
                                                        />
                                                    </div>

                                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                                                        <FormFileUploadForMembers
                                                            id={`photo`}
                                                            label={"Applicant photo"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "photo", e.target.files?.[0])}
                                                            value={formData?.members[index]?.documents?.photo}
                                                            error={errors[`members.${index}.documents.photo`]}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            required={true}
                                                            handleUpload={handleUpload}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`aadhar_front`}
                                                            label={"Applicant Aadhar front"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "aadhar_front", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.aadhar_front}
                                                            error={errors[`members.${index}.documents.aadhar_front`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`aadhar_back`}
                                                            label={"Applicant Aadhar back"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "aadhar_back", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.aadhar_back}
                                                            error={errors[`members.${index}.documents.aadhar_back`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`voter_id`}
                                                            label={"Applicant Voter Id"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "voter_id", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.voter_id}
                                                            error={errors[`members.${index}.documents.voter_id`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`husband_photo`}
                                                            label={"Husband's Photo"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "husband_photo", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.husband_photo}
                                                            error={errors[`members.${index}.documents.husband_photo`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`husband_aadhar_front`}
                                                            label={"Husband aadhar front"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "husband_aadhar_front", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.husband_aadhar_front}
                                                            error={errors[`members.${index}.documents.husband_aadhar_front`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`husband_aadhar_back`}
                                                            label={"Husband aadhar back"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "husband_aadhar_back", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.husband_aadhar_back}
                                                            error={errors[`members.${index}.documents.husband_aadhar_back`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing}
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`husband_voter_id`}
                                                            label={"Husband voter id"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "husband_voter_id", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.husband_voter_id}
                                                            error={errors[`members.${index}.documents.husband_voter_id`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing} 
                                                            index={index}
                                                        />
                                                        <FormFileUploadForMembers
                                                            id={`joint_photo`}
                                                            label={"Joint Photo"}
                                                            onChange={(e) => handleMemberDocumentChange(index, "joint_photo", e.target.files?.[0])}
                                                            handleUpload={handleUpload}
                                                            value={formData?.members[index]?.documents?.joint_photo}
                                                            error={errors[`members.${index}.documents.joint_photo`]}
                                                            required={true}
                                                            handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                            uploading={uploading}
                                                            removing={removing} 
                                                            index={index}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>


                        </div>

                        <div className="flex w-full items-center justify-end ">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleFinalSubmit}
                                className="px-8 py-3 rounded-md font-semibold transition-colors duration-200"
                            >
                                {isSubmitting
                                    ? "Updating..."
                                    : "Update Group Loan "}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {isSubmitting && (
                <LoadingModal
                open={isSubmitting}
                />
            )}

            <UserSuccessModal
                onOpenChange={handleCloseSuccessModel}
                open={isSuccess}
                message="Updated Successfully!"
                redirectTo={"/dashboard/view/loans"}
                buttonText={"View Loans"}
            />
        </div>
    );
};

export default GroupLoan;
