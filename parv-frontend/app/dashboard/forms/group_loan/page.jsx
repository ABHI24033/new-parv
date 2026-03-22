"use client";

import React, { useEffect, useMemo, useState } from "react";
import { del } from "idb-keyval";
import { Building2, CheckCircle2, FileText, History, Home, MinusIcon, PlusIcon, Upload, Users as UsersIcon, UserRound } from "lucide-react";

import { FormFileUploadForMembers } from "@/components/common/FormFile";
import FormInstructions from "@/components/common/FormInstructions";
import { LoanWizardFrame } from "@/components/forms/loans/LoanWizardFrame";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateGroupLoan } from "@/hooks/loans/useGroupLoan";
import { useLoanForm } from "@/hooks/loans/useLoanForm";
import { upload_single_file, getPublicIdFromUrl, remove_docs } from "@/lib/utils";
import toast from "react-hot-toast";
import { validateAllFields, validateFields } from "./formValidation";

const stepFields = {
  0: [],
  1: [
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "group_name",
    "group_size",
    "nearest_branch",
  ],
  2: [
    "group_village",
    "group_post",
    "group_police_station",
    "group_district",
    "group_pincode",
  ],
  3: ["members.name", "members.phone", "members.whatsapp_number"],
  4: [
    "members.has_own_house",
    "members.have_any_current_loan",
    "members.past_loan_record",
  ],
  5: ["references"],
  6: [
    "members.documents.aadhar_front",
    "members.documents.aadhar_back",
    "members.documents.photo",
  ],
  7: [],
};

const GroupLoan = () => {
  const createLoanMutation = useCreateGroupLoan();

  const formSteps = [
    { id: "instructions", title: "Instruction" },
    { id: "group_info", title: "Group Information" },
    { id: "group_address", title: "Group Address" },
    { id: "member_profiles", title: "Member Profiles" },
    { id: "member_background", title: "Member Background" },
    { id: "reference_details", title: "Reference Details" },
    { id: "member_documents", title: "Member Documents" },
    { id: "review_submit", title: "Review & Submit" },
  ];

  const initialData = {
    folderName: undefined,
    loan_amount: "",
    id_of_connector: "",
    name_of_connector: "",
    group_size: "",
    group_name: "",
    nearest_branch: "",
    group_village: "",
    group_post: "",
    group_police_station: "",
    group_district: "",
    group_pincode: "",
    members: [
      {
        name: "",
        phone: "",
        email: "",
        whatsapp_number: "",
        husband_name: "",
        husband_phone: "",
        husband_profession: "",
        has_own_house: "No",
        have_any_current_loan: "No",
        past_loan_record: "No",
        documents: {
          aadhar_front: undefined,
          aadhar_back: undefined,
          photo: undefined,
          voter_id: undefined,
          husband_photo: undefined,
          husband_aadhar_front: undefined,
          husband_aadhar_back: undefined,
          husband_voter_id: undefined,
          joint_photo: undefined,
        },
      },
    ],
    references: [
      {
        name: "",
        relation: "",
        phone: "",
        village: "",
        street: "",
        district: "",
        pincode: "",
        profession: "",
      },
    ],
  };

  const {
    step,
    setStep,
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    openSuccess,
    setOpenSuccess,
    handleNext,
    handlePrevious,
    handleFinalSubmit,
  } = useLoanForm({
    initialData,
    validateFields,
    validateAllFields,
    stepFields,
    mutation: createLoanMutation,
    persistenceKey: "groupLoanForm",
    folderPrefix: "grouploan",
    formSteps,
  });

  const addReference = () => {
    if (formData.references.length < 2) {
      setFormData((prev) => ({
        ...prev,
        references: [
          ...prev.references,
          {
            name: "",
            relation: "",
            phone: "",
            village: "",
            street: "",
            district: "",
            pincode: "",
            profession: "",
          },
        ],
      }));
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
      {
        ...formData,
        references: formData.references.map((r, i) =>
          i === index ? { ...r, [field]: value } : r
        ),
      },
      [fieldName]
    );

    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      if (!fieldValidation[fieldName]) delete nextErrors[fieldName];
      else nextErrors[fieldName] = fieldValidation[fieldName];
      return nextErrors;
    });
  };

  const [uploading, setUploading] = useState({});
  const [removing, setRemoving] = useState({});

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          name: "",
          phone: "",
          email: "",
          whatsapp_number: "",
          husband_name: "",
          husband_phone: "",
          husband_profession: "",
          has_own_house: "No",
          have_any_current_loan: "No",
          past_loan_record: "No",
          documents: {
            aadhar_front: undefined,
            aadhar_back: undefined,
            photo: undefined,
            voter_id: undefined,
            husband_photo: undefined,
            husband_aadhar_front: undefined,
            husband_aadhar_back: undefined,
            husband_voter_id: undefined,
            joint_photo: undefined,
          },
        },
      ],
    }));
  };

  const removeMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

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

  const handleMemberDocumentChange = async (index, docField, value) => {
    const isFile = value instanceof File;

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

    if (isFile) {
      const fieldErrors = validateFields(updatedFormData, [
        `members.${index}.documents.${docField}`,
      ]);
      if (Object.keys(fieldErrors).length === 0) {
        setFormData(updatedFormData);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`members.${index}.documents.${docField}`];
          return newErrors;
        });
        await handleMemberUpload(docField, index, value);
      } else {
        setErrors((prev) => ({
          ...prev,
          [`members.${index}.documents.${docField}`]:
            fieldErrors[`members.${index}.documents.${docField}`],
        }));
      }
    } else {
      setFormData(updatedFormData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`members.${index}.documents.${docField}`];
        return newErrors;
      });
    }
  };

  const handleMemberUpload = async (id, index, fileOverride) => {
    const file = fileOverride || formData?.members[index]?.documents[id];
    if (!(file instanceof File)) return;
    setUploading((prev) => ({ ...prev, [`${index}-${id}`]: true }));

    try {
      const result = await upload_single_file(
        id,
        file,
        `grouploan/${formData?.folderName}`
      );
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
          return { ...prev, members: updatedMembers };
        });
      } else {
        toast.error(result?.error || "Upload failed");
      }
    } catch (err) {
      console.error(`Upload error for ${id}:`, err);
    } finally {
      setUploading((prev) => ({ ...prev, [`${index}-${id}`]: false }));
    }
  };

  const handleMemberRemoveDocs = async (url, index, id) => {
    try {
      setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: true }));
      const publicId = getPublicIdFromUrl(url);
      const result = await remove_docs(publicId);
      if (result?.success) {
        setFormData((prev) => {
          const updatedMembers = [...prev.members];
          updatedMembers[index] = {
            ...updatedMembers[index],
            documents: { ...updatedMembers[index].documents, [id]: "" },
          };
          return { ...prev, members: updatedMembers };
        });
        toast.success(result?.message || "Document removed");
      } else {
        toast.error(result?.message || "Failed to remove document");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setRemoving((prev) => ({ ...prev, [`${index}-${id}`]: false }));
    }
  };

  const currentStepErrors = useMemo(() => {
    const fields = stepFields[step] || [];
    if (!fields.length) return {};
    return validateFields(formData, fields);
  }, [step, formData]);

  const isCurrentStepValid = Object.keys(currentStepErrors).length === 0;
  console.log(isCurrentStepValid);
  console.log(currentStepErrors);


  useEffect(() => {
    const firstInput = document.querySelector("[data-autofocus='true']");
    if (firstInput && typeof firstInput.focus === "function") {
      firstInput.focus();
    }
  }, [step]);

  const resetWholeForm = async () => {
    await del("groupLoanForm");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("groupLoanForm");
    }
    setFormData(initialData);
    setErrors({});
    setStep(0);
  };

  const handleGroupSubmit = () => {
    handleFinalSubmit();
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    const fieldValidation = validateFields({ ...formData, [fieldName]: value }, [fieldName]);
    setErrors((prevErrors) => {
      const nextErrors = { ...prevErrors };
      if (!fieldValidation[fieldName]) delete nextErrors[fieldName];
      else nextErrors[fieldName] = fieldValidation[fieldName];
      return nextErrors;
    });
  };

  const renderFieldError = (name) => (
    errors?.[name] ? <p className="text-xs text-red-600 mt-1">{errors[name]}</p> : null
  );

  const stepIcons = [FileText, Building2, Home, UserRound, History, UsersIcon, Upload, CheckCircle2];

  const renderStepContent = () => {
    switch (formSteps[step].id) {
      case "instructions":
        return <FormInstructions />;
      case "group_info":
        return (
          <Card className="rounded-2xl shadow-sm border-zinc-200">
            <CardHeader><CardTitle>Group Information</CardTitle><CardDescription>Basic group loan requirements.</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><Label className="mb-2">Loan Amount <span className="text-red-500">*</span></Label><Input type="number" value={formData.loan_amount} onChange={(e) => handleFieldChange("loan_amount", e.target.value)} />{renderFieldError("loan_amount")}</div>
                <div><Label className="mb-2">Connector ID <span className="text-red-500">*</span></Label><Input value={formData.id_of_connector} onChange={(e) => handleFieldChange("id_of_connector", e.target.value)} />{renderFieldError("id_of_connector")}</div>
                <div><Label className="mb-2">DSA Name <span className="text-red-500">*</span></Label><Input value={formData.name_of_connector} onChange={(e) => handleFieldChange("name_of_connector", e.target.value)} />{renderFieldError("name_of_connector")}</div>
                <div><Label className="mb-2">Group Name <span className="text-red-500">*</span></Label><Input value={formData.group_name} onChange={(e) => handleFieldChange("group_name", e.target.value)} />{renderFieldError("group_name")}</div>
                <div><Label className="mb-2">Group Size <span className="text-red-500">*</span></Label><Select className="w-[100%]" value={formData.group_size} onValueChange={(v) => handleFieldChange("group_size", v)}><SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{Array.from({ length: 15 }, (_, i) => (i + 1).toString()).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select>{renderFieldError("group_size")}</div>
                <div><Label className="mb-2">Nearest Branch <span className="text-red-500">*</span></Label><Select className="w-[100%]" value={formData.nearest_branch} onValueChange={(v) => handleFieldChange("nearest_branch", v)}><SelectTrigger className="w-full"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Bikramganj">Bikramganj</SelectItem><SelectItem value="Sasaram">Sasaram</SelectItem><SelectItem value="Dehri">Dehri</SelectItem></SelectContent></Select>{renderFieldError("nearest_branch")}</div>
              </div>
            </CardContent>
          </Card>
        );
      case "group_address":
        return (
          <Card className="rounded-2xl shadow-sm border-zinc-200">
            <CardHeader><CardTitle>Group Address</CardTitle><CardDescription>Meeting location details.</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><Label className="mb-2">Village / Area <span className="text-red-500">*</span></Label><Input value={formData.group_village} onChange={(e) => handleFieldChange("group_village", e.target.value)} />{renderFieldError("group_village")}</div>
                <div><Label className="mb-2">Post Office <span className="text-red-500">*</span></Label><Input value={formData.group_post} onChange={(e) => handleFieldChange("group_post", e.target.value)} />{renderFieldError("group_post")}</div>
                <div><Label className="mb-2">Police Station <span className="text-red-500">*</span></Label><Input value={formData.group_police_station} onChange={(e) => handleFieldChange("group_police_station", e.target.value)} />{renderFieldError("group_police_station")}</div>
                <div><Label className="mb-2">District <span className="text-red-500">*</span></Label><Input value={formData.group_district} onChange={(e) => handleFieldChange("group_district", e.target.value)} />{renderFieldError("group_district")}</div>
                <div><Label className="mb-2">Pincode <span className="text-red-500">*</span></Label><Input value={formData.group_pincode} onChange={(e) => handleFieldChange("group_pincode", e.target.value)} />{renderFieldError("group_pincode")}</div>
              </div>
            </CardContent>
          </Card>
        );
      case "member_profiles":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border">
              <h3 className="font-bold flex items-center gap-2"><UserRound className="w-5 h-5" /> Members Profiles ({formData.members?.length || 0})</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={addMember}><PlusIcon className="w-4 h-4 mr-1" /> Add</Button>
                {(formData.members?.length || 0) > 1 && <Button variant="outline" size="sm" onClick={() => removeMember(formData.members.length - 1)} className="text-red-600"><MinusIcon className="w-4 h-4 mr-1" /> Remove</Button>}
              </div>
            </div>
            {formData.members?.map((member, idx) => (
              <Card key={idx} className="rounded-2xl border-zinc-200">
                <CardHeader className="py-4 bg-zinc-50/50"><CardTitle className="text-sm">Member {idx + 1}</CardTitle></CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div><Label className="mb-2">Full Name <span className="text-red-500">*</span></Label><Input value={member.name} onChange={(e) => handleMemberChange(idx, "name", e.target.value)} />{renderFieldError(`members.${idx}.name`)}</div>
                    <div><Label className="mb-2">Phone <span className="text-red-500">*</span></Label><Input type="tel" value={member.phone} onChange={(e) => handleMemberChange(idx, "phone", e.target.value)} />{renderFieldError(`members.${idx}.phone`)}</div>
                    <div><Label className="mb-2">WhatsApp <span className="text-red-500">*</span></Label><Input type="tel" value={member.whatsapp_number} onChange={(e) => handleMemberChange(idx, "whatsapp_number", e.target.value)} />{renderFieldError(`members.${idx}.whatsapp_number`)}</div>
                    <div><Label className="mb-2">Husband's Name</Label><Input value={member.husband_name} onChange={(e) => handleMemberChange(idx, "husband_name", e.target.value)} /></div>
                    <div><Label className="mb-2">Husband Profession</Label><Select value={member.husband_profession} onValueChange={(v) => handleMemberChange(idx, "husband_profession", v)}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{["Private Job", "Govt. Job", "Business", "Farmer", "Labour / Mistri", "Other"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "member_background":
        return (
          <div className="space-y-6">
            {formData.members?.map((member, idx) => (
              <Card key={idx} className="rounded-2xl border-zinc-200">
                <CardHeader className="py-4 bg-zinc-50/50"><CardTitle className="text-sm">Member {idx + 1} Background</CardTitle></CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border"><Label>Owns House?</Label><RadioGroup value={member.has_own_house} onValueChange={(v) => handleMemberChange(idx, "has_own_house", v)} className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="Yes" id={`y_h_${idx}`} /><Label htmlFor={`y_h_${idx}`}>Yes</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="No" id={`n_h_${idx}`} /><Label htmlFor={`n_h_${idx}`}>No</Label></div></RadioGroup></div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border"><Label>Current Loans?</Label><RadioGroup value={member.have_any_current_loan} onValueChange={(v) => handleMemberChange(idx, "have_any_current_loan", v)} className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="Yes" id={`y_l_${idx}`} /><Label htmlFor={`y_l_${idx}`}>Yes</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="No" id={`n_l_${idx}`} /><Label htmlFor={`n_l_${idx}`}>No</Label></div></RadioGroup></div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border"><Label>Past Record?</Label><RadioGroup value={member.past_loan_record} onValueChange={(v) => handleMemberChange(idx, "past_loan_record", v)} className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="Yes" id={`y_r_${idx}`} /><Label htmlFor={`y_r_${idx}`}>Yes</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="No" id={`n_r_${idx}`} /><Label htmlFor={`n_r_${idx}`}>No</Label></div></RadioGroup></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "reference_details":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-200">
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
                    <div className="space-y-2">
                      <Label className="text-zinc-600 mb-2 font-bold">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        data-autofocus={idx === 0}
                        placeholder="Enter full name"
                        value={ref.name}
                        onChange={(e) => handleReferenceChange(idx, "name", e.target.value)}
                        className="rounded-xl border-zinc-200 focus:ring-blue-500"
                      />
                      {renderFieldError(`references.${idx}.name`)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-600 mb-2 font-bold">Relation <span className="text-red-500">*</span></Label>
                      <Select
                        value={ref.relation}
                        onValueChange={(v) => handleReferenceChange(idx, "relation", v)}
                      >
                        <SelectTrigger className="rounded-xl border-zinc-200">
                          <SelectValue placeholder="Select relation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Family Member">Family Member</SelectItem>
                          <SelectItem value="Relative">Relative</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderFieldError(`references.${idx}.relation`)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-600 mb-2 font-bold">Contact Number <span className="text-red-500">*</span></Label>
                      <Input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={ref.phone}
                        onChange={(e) => handleReferenceChange(idx, "phone", e.target.value)}
                        className="rounded-xl border-zinc-200 focus:ring-blue-500"
                      />
                      {renderFieldError(`references.${idx}.phone`)}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-600 mb-2 font-bold">Profession <span className="text-red-500">*</span></Label>
                      <Select
                        value={ref.profession}
                        onValueChange={(v) => handleReferenceChange(idx, "profession", v)}
                      >
                        <SelectTrigger className="rounded-xl border-zinc-200">
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Job">Job</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="CA">CA</SelectItem>
                          <SelectItem value="Doctor">Doctor</SelectItem>
                          <SelectItem value="Farmer">Farmer</SelectItem>
                          <SelectItem value="Advocate">Advocate</SelectItem>
                          <SelectItem value="Non Professional / Unemployed">Non Professional / Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                      {renderFieldError(`references.${idx}.profession`)}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Address Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-xs mb-2 font-bold text-zinc-500">Village / Town <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="Village/Town"
                          value={ref.village}
                          onChange={(e) => handleReferenceChange(idx, "village", e.target.value)}
                          className="mt-1 rounded-lg border-zinc-200 shadow-sm"
                        />
                        {renderFieldError(`references.${idx}.village`)}
                      </div>
                      <div>
                        <Label className="text-xs mb-2 font-bold text-zinc-500">Street Name <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="Street"
                          value={ref.street}
                          onChange={(e) => handleReferenceChange(idx, "street", e.target.value)}
                          className="mt-1 rounded-lg border-zinc-200 shadow-sm"
                        />
                        {renderFieldError(`references.${idx}.street`)}
                      </div>
                      <div>
                        <Label className="text-xs mb-2 font-bold text-zinc-500">District <span className="text-red-500">*</span></Label>
                        <Input
                          placeholder="District"
                          value={ref.district}
                          onChange={(e) => handleReferenceChange(idx, "district", e.target.value)}
                          className="mt-1 rounded-lg border-zinc-200 shadow-sm"
                        />
                        {renderFieldError(`references.${idx}.district`)}
                      </div>
                      <div>
                        <Label className="text-xs mb-2 font-bold text-zinc-500">Pincode <span className="text-red-500">*</span></Label>
                        <Input
                          type="number"
                          placeholder="6 digits"
                          value={ref.pincode}
                          onChange={(e) => handleReferenceChange(idx, "pincode", e.target.value)}
                          className="mt-1 rounded-lg border-zinc-200 shadow-sm"
                        />
                        {renderFieldError(`references.${idx}.pincode`)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "member_documents":
        return (
          <div className="space-y-6">
            {formData.members.map((member, idx) => (
              <Card key={idx} className="rounded-2xl border-zinc-200">
                <CardHeader className="py-4 bg-zinc-50/50"><CardTitle className="text-sm">Member {idx + 1} Documents</CardTitle></CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {[
                      ["photo", "Member Pic"],
                      ["aadhar_front", "Aadhar Front"],
                      ["aadhar_back", "Aadhar Back"],
                      ["voter_id", "Voter ID"],
                      ["husband_photo", "Husband Pic"],
                      ["husband_aadhar_front", "Husband Aadhar Front"],
                      ["husband_aadhar_back", "Husband Aadhar Back"],
                      ["husband_voter_id", "Husband Voter ID"],
                      ["joint_photo", "Joint Photo"],
                    ].map(([id, label]) => (
                      <div key={id} className="space-y-2">
                        <Label className="mb-2">{label} <span className="text-red-500">*</span></Label>
                        <FormFileUploadForMembers
                          id={id}
                          label={label}
                          onChange={(e) => handleMemberDocumentChange(idx, id, e.target.files?.[0])}
                          handleUpload={handleMemberUpload}
                          value={member.documents[id]}
                          handleRemoveDocsFromCloudaniry={handleMemberRemoveDocs}
                          uploading={uploading}
                          removing={removing}
                          index={idx}
                          required={true}
                        />
                        {renderFieldError(`members.${idx}.documents.${id}`)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case "review_submit":
        const ReviewSection = ({ title, icon: Icon, children, onEdit }) => (
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                <Icon className="w-4 h-4 text-blue-600" /> {title}
              </h4>
              <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {children}
            </div>
          </div>
        );

        const DataField = ({ label, value, className = "" }) => (
          <div className={`rounded-xl border border-zinc-100 bg-zinc-50/30 p-3 ${className}`}>
            <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">{label}</p>
            <p className="text-sm font-semibold text-zinc-700">{value || "-"}</p>
          </div>
        );

        return (
          <Card className="rounded-2xl shadow-sm border-zinc-200 overflow-hidden">
            <CardHeader className="bg-zinc-50/50 border-b">
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Comprehensive summary of your group loan application.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Group Section */}
              <ReviewSection title="Group Information" icon={Building2} onEdit={() => setStep(1)}>
                <DataField label="Group Name" value={formData.group_name} />
                <DataField label="Group Size" value={formData.group_size} />
                <DataField label="Loan Amount" value={`₹${formData.loan_amount}`} />
                <DataField label="DSA Name" value={formData.name_of_connector} />
                <DataField label="Branch" value={formData.nearest_branch} />
              </ReviewSection>

              {/* Address Section */}
              <ReviewSection title="Group Address" icon={Home} onEdit={() => setStep(2)}>
                <DataField
                  label="Meeting Location"
                  value={[formData.group_village, formData.group_post, formData.group_police_station, formData.group_district, formData.group_pincode].filter(Boolean).join(", ")}
                  className="md:col-span-2 lg:col-span-3"
                />
              </ReviewSection>

              {/* Members Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                    <UserRound className="w-4 h-4 text-blue-600" /> Member Details
                  </h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setStep(3)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit Profiles</Button>
                    <Button variant="ghost" size="sm" onClick={() => setStep(4)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit Background</Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.members?.map((m, i) => (
                    <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-zinc-800">{m.name || `Member ${i + 1}`}</p>
                          <p className="text-xs text-zinc-500">{m.phone} | {m.husband_name}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${m.has_own_house === 'Yes' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {m.has_own_house === 'Yes' ? 'Own House' : 'Rented'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {m.have_any_current_loan === 'Yes' && (
                          <span className="text-[9px] px-2 py-0.5 bg-red-50 text-red-600 border border-red-100 rounded-full font-bold">Has Active Loan</span>
                        )}
                        {m.past_loan_record === 'Yes' && (
                          <span className="text-[9px] px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full font-bold">Past Record Available</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* References Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-blue-600" /> Reference Details
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => setStep(5)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.references?.map((r, i) => (
                    <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 space-y-2">
                      <div className="flex justify-between">
                        <p className="font-bold text-zinc-800">{r.name || "N/A"}</p>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold uppercase">{r.relation}</span>
                      </div>
                      <p className="text-xs text-zinc-600 font-medium">{r.phone} • {r.profession}</p>
                      <p className="text-[11px] text-zinc-400">
                        {[r.village, r.street, r.district, r.pincode].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> Documents Status
                  </h4>
                  <Button variant="ghost" size="sm" onClick={() => setStep(6)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {formData.members?.map((m, i) => {
                    const docCount = Object.values(m.documents || {}).filter(Boolean).length;
                    return (
                      <div key={i} className="flex items-center justify-between px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-xl">
                        <span className="text-[11px] font-bold text-zinc-600">Member {i + 1}</span>
                        <span className={`text-[10px] font-bold ${docCount >= 9 ? 'text-green-600' : 'text-orange-500'}`}>
                          {docCount}/9 Docs Uploaded
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <div>Form Section Not Found</div>;
    }
  };

  return (
    <LoanWizardFrame
      title="Group Loan Application"
      description="Apply for a group loan together. Empower your community with shared financial growth."
      icon={UsersIcon}
      steps={formSteps}
      stepIcons={stepIcons}
      stepIndex={step}
      onBack={handlePrevious}
      onNext={handleNext}
      onReset={resetWholeForm}
      onSubmit={handleGroupSubmit}
      isLastStep={step === formSteps.length - 1}
      nextDisabled={!isCurrentStepValid}
      submitDisabled={isSubmitting || createLoanMutation.isPending}
      navDisabled={isSubmitting || createLoanMutation.isPending}
      submitLabel={
        createLoanMutation.isPending ? "Submitting..." : "Submit Application"
      }
      loadingOpen={isSubmitting || createLoanMutation.isPending}
      successOpen={openSuccess}
      onSuccessOpenChange={setOpenSuccess}
    >
      {renderStepContent()}
    </LoanWizardFrame>
  );
};

export default GroupLoan;
