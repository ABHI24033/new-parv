import { FormFileUploadForMembers } from '@/components/common/FormFile';
import { MinusIcon, PlusIcon, User, Phone, Mail, MessageSquare, Briefcase, Home, History, CreditCard, Camera, FileText } from 'lucide-react';
import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Button } from '@/components/ui/button';

const MembersDetails = ({
    formData,
    setFormData,
    errors,
    setErrors,
    removeMember,
    addMember,
    handleMemberDocumentChange,
    handleMemberChange,
    handleUpload,
    uploading,
    removing,
    handleRemoveDocsFromCloudaniry,
}) => {
    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Member Details
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold ml-2">
                            {formData?.members?.length}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 italic">
                        Add or remove members from this group loan application.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addMember}
                        className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-11 px-6 font-semibold transition-all hover:scale-[1.02]"
                    >
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add Member
                    </Button>
                    {formData?.members?.length > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeMember(formData?.members.length - 1)}
                            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-11 px-6 font-semibold transition-all hover:scale-[1.02]"
                        >
                            <MinusIcon className="w-4 h-4 mr-2" />
                            Remove
                        </Button>
                    )}
                </div>
            </div>

            <div className="space-y-16">
                {formData?.members?.map((item, index) => (
                    <div key={index} className="relative bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 transition-all group-hover:w-3"></div>
                        <div className="p-8 md:p-10">
                            {/* Member Header */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Member {index + 1} Profile</h4>
                                    <p className="text-sm text-gray-500 font-medium italic">Complete all information for this member.</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {/* Row 1: Contact & Spouse */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                                    <FormSection title="Basic Contact" description="Essential identity and communication details.">
                                        <FormField label="Full Name" error={errors[`members.${index}.name`]} required>
                                            <Input
                                                id={`name-${index}`}
                                                onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                                                value={item.name}
                                                placeholder="Member's full name"
                                                className="h-11 rounded-xl border-none"
                                            />
                                        </FormField>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField label="Phone" error={errors[`members.${index}.phone`]} required>
                                                <Input
                                                    id={`phone-${index}`}
                                                    type="tel"
                                                    onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                                                    value={item.phone}
                                                    placeholder="Mobile"
                                                    className="h-11 rounded-xl border-none"
                                                />
                                            </FormField>
                                            <FormField label="WhatsApp" error={errors[`members.${index}.whatsapp_number`]} required>
                                                <Input
                                                    id={`whatsapp-${index}`}
                                                    type="tel"
                                                    onChange={(e) => handleMemberChange(index, "whatsapp_number", e.target.value)}
                                                    value={item.whatsapp_number}
                                                    placeholder="WhatsApp"
                                                    className="h-11 rounded-xl border-none"
                                                />
                                            </FormField>
                                        </div>

                                        <FormField label="Email" error={errors[`members.${index}.email`]}>
                                            <Input
                                                id={`email-${index}`}
                                                type="email"
                                                onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                                                value={item.email}
                                                placeholder="Email address (optional)"
                                                className="h-11 rounded-xl border-none"
                                            />
                                        </FormField>
                                    </FormSection>

                                    <FormSection title="Family Info" description="Details about husband's profession and contact.">
                                        <FormField label="Husband's Name" error={errors[`members.${index}.husband_name`]}>
                                            <Input
                                                id={`husband_name-${index}`}
                                                onChange={(e) => handleMemberChange(index, "husband_name", e.target.value)}
                                                value={item.husband_name}
                                                placeholder="Enter name"
                                                className="h-11 rounded-xl border-none"
                                            />
                                        </FormField>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField label="Husband Phone" error={errors[`members.${index}.husband_phone`]}>
                                                <Input
                                                    id={`husband_phone-${index}`}
                                                    type="tel"
                                                    onChange={(e) => handleMemberChange(index, "husband_phone", e.target.value)}
                                                    value={item.husband_phone}
                                                    placeholder="Mobile"
                                                    className="h-11 rounded-xl border-none"
                                                />
                                            </FormField>
                                            <FormField label="Profession" error={errors[`members.${index}.husband_profession`]}>
                                                <Select
                                                    value={item.husband_profession}
                                                    onValueChange={(value) => handleMemberChange(index, "husband_profession", value)}
                                                >
                                                    <SelectTrigger className="h-11 rounded-xl border-none text-zinc-500">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[
                                                            { value: "Private Job", label: "Private Job" },
                                                            { value: "Govt. Job", label: "Govt. Job" },
                                                            { value: "Business", label: "Business" },
                                                            { value: "Farmer", label: "Farmer" },
                                                            { value: "Labour / Mistri", label: "Labour / Mistri" },
                                                            { value: "Other", label: "Other" },
                                                        ].map((opt) => (
                                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormField>
                                        </div>
                                    </FormSection>
                                </div>

                                {/* Row 2: Status & Background */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                                    <FormSection title="Housing & Loans" description="Current living and financial status.">
                                        <div className="space-y-6 pt-2">
                                            <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                <Label className="text-zinc-700 font-semibold">Owns a House?</Label>
                                                <RadioGroup
                                                    value={item.has_own_house}
                                                    onValueChange={(value) => handleMemberChange(index, "has_own_house", value)}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Yes" id={`house_yes-${index}`} />
                                                        <Label htmlFor={`house_yes-${index}`} className="cursor-pointer text-sm font-medium">Yes</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="No" id={`house_no-${index}`} />
                                                        <Label htmlFor={`house_no-${index}`} className="cursor-pointer text-sm font-medium">No</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                <Label className="text-zinc-700 font-semibold">Current Loans?</Label>
                                                <RadioGroup
                                                    value={item.have_any_current_loan}
                                                    onValueChange={(value) => handleMemberChange(index, "have_any_current_loan", value)}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Yes" id={`loan_yes-${index}`} />
                                                        <Label htmlFor={`loan_yes-${index}`} className="cursor-pointer text-sm font-medium">Yes</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="No" id={`loan_no-${index}`} />
                                                        <Label htmlFor={`loan_no-${index}`} className="cursor-pointer text-sm font-medium">No</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                                                <Label className="text-zinc-700 font-semibold">Good Record?</Label>
                                                <RadioGroup
                                                    value={item.past_loan_record}
                                                    onValueChange={(value) => handleMemberChange(index, "past_loan_record", value)}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="Yes" id={`record_yes-${index}`} />
                                                        <Label htmlFor={`record_yes-${index}`} className="cursor-pointer text-sm font-medium">Yes</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="No" id={`record_no-${index}`} />
                                                        <Label htmlFor={`record_no-${index}`} className="cursor-pointer text-sm font-medium">No</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </FormSection>

                                    <FormSection title="Verification Proofs" description="Official documentation for identity validation.">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                                            <FormField label="Member Pic" error={errors[`members.${index}.documents.photo`]} required>
                                                <FormFileUploadForMembers
                                                    id={`photo`}
                                                    label={"Selfie"}
                                                    onChange={(e) => handleMemberDocumentChange(index, "photo", e.target.files?.[0])}
                                                    value={item.documents.photo}
                                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                    required={true}
                                                    handleUpload={handleUpload}
                                                    uploading={uploading}
                                                    removing={removing}
                                                    index={index}
                                                />
                                            </FormField>
                                            <FormField label="Aadhar Front" error={errors[`members.${index}.documents.aadhar_front`]} required>
                                                <FormFileUploadForMembers
                                                    id={`aadhar_front`}
                                                    label={"Front"}
                                                    onChange={(e) => handleMemberDocumentChange(index, "aadhar_front", e.target.files?.[0])}
                                                    handleUpload={handleUpload}
                                                    value={item.documents.aadhar_front}
                                                    required={true}
                                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                    uploading={uploading}
                                                    removing={removing}
                                                    index={index}
                                                />
                                            </FormField>
                                            <FormField label="Aadhar Back" error={errors[`members.${index}.documents.aadhar_back`]} required>
                                                <FormFileUploadForMembers
                                                    id={`aadhar_back`}
                                                    label={"Back"}
                                                    onChange={(e) => handleMemberDocumentChange(index, "aadhar_back", e.target.files?.[0])}
                                                    handleUpload={handleUpload}
                                                    value={item.documents.aadhar_back}
                                                    required={true}
                                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                    uploading={uploading}
                                                    removing={removing}
                                                    index={index}
                                                />
                                            </FormField>
                                            <FormField label="Husband Pic">
                                                <FormFileUploadForMembers
                                                    id={`husband_photo`}
                                                    label={"Photo"}
                                                    onChange={(e) => handleMemberDocumentChange(index, "husband_photo", e.target.files?.[0])}
                                                    handleUpload={handleUpload}
                                                    value={item.documents.husband_photo}
                                                    required={false}
                                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                    uploading={uploading}
                                                    removing={removing}
                                                    index={index}
                                                />
                                            </FormField>
                                            <FormField label="Joint Pic">
                                                <FormFileUploadForMembers
                                                    id={`joint_photo`}
                                                    label={"Together"}
                                                    onChange={(e) => handleMemberDocumentChange(index, "joint_photo", e.target.files?.[0])}
                                                    handleUpload={handleUpload}
                                                    value={item.documents.joint_photo}
                                                    required={false}
                                                    handleRemoveDocsFromCloudaniry={handleRemoveDocsFromCloudaniry}
                                                    uploading={uploading}
                                                    removing={removing}
                                                    index={index}
                                                />
                                            </FormField>
                                        </div>
                                    </FormSection>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersDetails;