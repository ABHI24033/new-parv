"use client";
// import { useSubmitEnquiry } from '@/hooks/useEnquiry';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUserState } from '@/app/dashboard/store';
import { Input } from '../ui/input';
import { FormSection, FormField } from '@/components/common/ModernFormLayout';
import { Button } from '../ui/button';
import { Send, FileText, User, Phone, Mail, MapPin } from 'lucide-react';

const EnquiryForm = () => {
    const userState = useUserState();

    const [formData, setFormData] = useState({
        DSAName: "",
        DSAID: "",
        loanProduct: '',
        loanAmount: '',
        profession: '',
        fullName: '',
        phone: '',
        whatsappNo: '',
        email: '',
        city: '',
        pincode: '',
        source: ''
    });

    useEffect(() => {
        if (userState?.profile) {
            setFormData(prev => ({
                ...prev,
                DSAName: userState.profile.full_name || "",
                DSAID: userState.profile.username || ""
            }));
        }
    }, [userState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("Message sent successfully!");
        setFormData({
            loanProduct: '',
            loanAmount: '',
            profession: '',
            fullName: '',
            phone: '',
            whatsappNo: '',
            email: '',
            city: '',
            pincode: '',
            source: ''
        });
    };

    return (
        <div className="p-2 lg:col-span-2">
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-10">
                <FormSection title="Loan Information" description="Details about the loan you're interested in.">
                    <FormField label="Select Loan Product" required>
                        <Select
                            value={formData.loanProduct}
                            onValueChange={(val) => handleSelectChange("loanProduct", val)}
                        >
                            <SelectTrigger className="h-11 rounded-xl">
                                <SelectValue placeholder="Select Product" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "personal", label: "Personal Loan" },
                                    { value: "business", label: "Business Loan" },
                                    { value: "term", label: "Term Loan" },
                                    { value: "ODICON/Individual/CC", label: "ODICON/Individual/CC" },
                                    { value: "home", label: "Home Loan" },
                                    { value: "gold", label: "Gold Loan" },
                                    { value: "group", label: "Group" },
                                    { value: "LAP", label: "LAP" },
                                    { value: "plot/flat purchase", label: "Plot/Flat Purchase" },
                                    { value: "bike loan", label: "Bike Loan" },
                                    { value: "car loan", label: "Car Loan" },
                                    { value: "refinance", label: "Refinance" },
                                    { value: "micro loan", label: "Micro Loan" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>

                    <FormField label="Loan Amount" required>
                        <Input
                            type="number"
                            name="loanAmount"
                            placeholder="Enter amount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="Profession" required>
                        <Select
                            value={formData.profession}
                            onValueChange={(val) => handleSelectChange("profession", val)}
                        >
                            <SelectTrigger className="h-11 rounded-xl">
                                <SelectValue placeholder="Select profession" />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    { value: "job", label: "Job" },
                                    { value: "business", label: "Business" },
                                    { value: "unemployed", label: "Unemployed" },
                                ].map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormField>
                </FormSection>

                <FormSection title="Personal Information" description="Your contact details for follow-up.">
                    <FormField label="Full Name" required>
                        <Input
                            name="fullName"
                            type="text"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="Phone Number" required>
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Mobile number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="WhatsApp Number">
                        <Input
                            type="tel"
                            name="whatsappNo"
                            placeholder="WhatsApp number"
                            value={formData.whatsappNo}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="Email Address">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="City/Town" required>
                        <Input
                            type="text"
                            name="city"
                            placeholder="Your city"
                            value={formData.city}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>

                    <FormField label="Pincode" required>
                        <Input
                            type="number"
                            name="pincode"
                            placeholder="6-digit pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="h-11 rounded-xl"
                        />
                    </FormField>
                </FormSection>

                <FormSection title="Source Information" description="How did you find us?">
                    <div className="col-span-full">
                        <FormField label="How did you hear about us?">
                            <Select
                                value={formData.source}
                                onValueChange={(val) => handleSelectChange("source", val)}
                            >
                                <SelectTrigger className="h-11 rounded-xl">
                                    <SelectValue placeholder="Select Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        { value: "Refferd by someone", label: "Refferd by someone" },
                                        { value: "Facebook", label: "Facebook" },
                                        { value: "Google / Website", label: "Google / Website" },
                                        { value: "Justdial", label: "Justdial" },
                                        { value: "Instagram", label: "Instagram" },
                                        { value: "Office visited", label: "Office visited" },
                                        { value: "Pamplet / Banner", label: "Pamplet / Banner" },
                                        { value: "Other", label: "Other" },
                                    ].map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>
                </FormSection>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <Button
                        type="submit"
                        className="px-10 py-2 h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send Enquiry
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EnquiryForm;
