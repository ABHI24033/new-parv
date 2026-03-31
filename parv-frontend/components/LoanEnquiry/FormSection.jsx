"use client";

import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUserState } from '@/app/dashboard/store';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Send, Wallet, User, Info } from 'lucide-react';
import { loanEnquiryApi } from '@/lib/api/loanEnquiry';
import { Label } from '../ui/label';

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
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loanEnquiryApi.create(formData);
            toast.success("Enquiry submitted successfully!");
            setFormData((prev) => ({
                ...prev,
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
            }));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit enquiry.");
        }
    };

    return (
        <div>
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Loan Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Loan Information</h2>
                            <p className="text-sm text-slate-500">Details about the loan you're interested in</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Loan Product <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.loanProduct}
                                onValueChange={(val) => handleSelectChange("loanProduct", val)}
                            >
                                <SelectTrigger className="w-full h-11 rounded-lg border-slate-200 focus:ring-blue-500">
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
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Loan Amount <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="loanAmount"
                                placeholder="Enter amount"
                                value={formData.loanAmount}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Profession <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.profession}
                                onValueChange={(val) => handleSelectChange("profession", val)}
                            >
                                <SelectTrigger className="w-full h-11 rounded-lg border-slate-200 focus:ring-blue-500">
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
                        </div>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                            <p className="text-sm text-slate-500">Your contact details for follow-up</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                name="fullName"
                                type="text"
                                placeholder="Your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Phone Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="Mobile number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                WhatsApp Number
                            </Label>
                            <Input
                                type="tel"
                                name="whatsappNo"
                                placeholder="WhatsApp number"
                                value={formData.whatsappNo}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                City/Town <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="city"
                                placeholder="Your city"
                                value={formData.city}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                Pincode <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="pincode"
                                placeholder="6-digit pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="h-11 rounded-lg border-slate-200 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Source Information */}
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Info className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Source Information</h2>
                            <p className="text-sm text-slate-500">How did you find us?</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-slate-700">
                                How did you hear about us?
                            </Label>
                            <Select
                                value={formData.source}
                                onValueChange={(val) => handleSelectChange("source", val)}
                            >
                                <SelectTrigger className="w-full h-11 rounded-lg border-slate-200 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Source" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[
                                        { value: "Refferd by someone", label: "Referred by someone" },
                                        { value: "Facebook", label: "Facebook" },
                                        { value: "Google / Website", label: "Google / Website" },
                                        { value: "Justdial", label: "Justdial" },
                                        { value: "Instagram", label: "Instagram" },
                                        { value: "Office visited", label: "Office visited" },
                                        { value: "Pamplet / Banner", label: "Pamphlet / Banner" },
                                        { value: "Other", label: "Other" },
                                    ].map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        className="h-12 px-8 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
