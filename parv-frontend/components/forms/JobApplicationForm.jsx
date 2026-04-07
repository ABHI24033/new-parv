'use client'

import { useState } from 'react';
import api from '@/api/api';
import { useUploadDoc } from '@/hooks/useFile';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Upload, Loader2 } from "lucide-react";

const positions = [
    "Loan Officer",
    "DSA Manager",
    "Field Executive",
    "Customer Service Representative",
    "Marketing Specialist",
    "Operations Manager",
    "Other"
];

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

export default function JobApplicationForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        position: '',
        experience: '',
        resume: null,
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const uploadDoc = useUploadDoc();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
                return;
            }
            setFormData(prev => ({ ...prev, resume: file }));
            if (errors.resume) {
                setErrors(prev => ({ ...prev, resume: '' }));
            }
        } else {
            setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or DOC file' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
        if (!formData.resume) newErrors.resume = 'Resume is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            let resumeUrl = null;
            
            // Upload resume if exists
            if (formData.resume) {
                const uploadRes = await uploadDoc.mutateAsync({
                    file: formData.resume,
                    folder: 'job-applications'
                });
                resumeUrl = uploadRes.url || uploadRes.data?.url;
            }

            // Prepare data for API
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                state: formData.state,
                city: formData.city,
                position: formData.position,
                experience: parseInt(formData.experience),
                message: formData.message,
                resumeUrl: resumeUrl
            };

            await api.post('/job-applications', payload);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            setErrors(prev => ({ 
                ...prev, 
                submit: error.response?.data?.message || 'Failed to submit application. Please try again.' 
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
                        <p className="text-slate-600 mb-6">
                            Thank you for your interest in joining Parv Financial Services. We have received your application and will review it shortly. We'll get back to you within 3-5 business days.
                        </p>
                        <Button onClick={() => window.location.href = '/'} className="bg-blue-600 hover:bg-blue-700">
                            Back to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Job Application Form</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className={errors.fullName ? 'border-red-500' : ''}
                        />
                        {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                            <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select your state" />
                            </SelectTrigger>
                            <SelectContent>
                                {states.map(state => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            type="text"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="position">Position Applying For *</Label>
                        <Select value={formData.position} onValueChange={(value) => handleInputChange('position', value)}>
                            <SelectTrigger className={errors.position ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map(position => (
                                    <SelectItem key={position} value={position}>{position}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="experience">Experience (in years) *</Label>
                        <Input
                            id="experience"
                            type="number"
                            min="0"
                            max="50"
                            placeholder="Enter years of experience"
                            value={formData.experience}
                            onChange={(e) => handleInputChange('experience', e.target.value)}
                            className={errors.experience ? 'border-red-500' : ''}
                        />
                        {errors.experience && <p className="text-sm text-red-600">{errors.experience}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="resume">Upload Resume *</Label>
                        <div className="flex items-center gap-4">
                            <Input
                                id="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Label htmlFor="resume" className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors">
                                <Upload className="h-4 w-4" />
                                {formData.resume ? formData.resume.name : 'Choose PDF/DOC file'}
                            </Label>
                        </div>
                        {errors.resume && <p className="text-sm text-red-600">{errors.resume}</p>}
                        <p className="text-xs text-slate-500">Supported formats: PDF, DOC, DOCX. Max size: 5MB</p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="message">Message / Cover Letter</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us why you're interested in this position..."
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}