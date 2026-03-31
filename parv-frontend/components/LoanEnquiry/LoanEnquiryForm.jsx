import React from "react"
import EnquiryForm from "./FormSection";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram, MessageSquare, ArrowRight } from "lucide-react";

const LoanEnquiryForm = () => {
    return (
        <div className="w-full">
            {/* Hero Header */}
            <section className="relative overflow-hidden bg-white border-b border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Get in Touch</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                            Loan Enquiry
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Fill out the form below to inquire about our loan services. Our team will contact you shortly to discuss your requirements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Content */}
            <section className="py-12 lg:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Contact Information Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-xl">
                                    <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                                    <p className="text-slate-400 text-sm mb-6">
                                        Have a specific financial goal? Reach out to our experts for personalized guidance.
                                    </p>

                                    <div className="space-y-4">
                                        <a href="mailto:parvmultiservices@gmail.com" className="group flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Email Us</p>
                                                <p className="text-sm font-semibold">parvmultiservices@gmail.com</p>
                                            </div>
                                        </a>

                                        <a href="tel:+917292800809" className="group flex items-center gap-3 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Call Us</p>
                                                <p className="text-sm font-semibold">+91 7292800809</p>
                                            </div>
                                        </a>

                                        <div className="group flex items-start gap-3 rounded-xl bg-white/5 p-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Admin Office</p>
                                                <p className="text-sm font-semibold leading-relaxed">
                                                    Behind Hi tech hospital, Saguna More, Danapur Patna - 801503
                                                </p>
                                            </div>
                                        </div>

                                        <div className="group flex items-start gap-3 rounded-xl bg-white/5 p-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Registered Office</p>
                                                <p className="text-sm font-semibold leading-relaxed">
                                                    Hotel New Mayur, Dumrao Road, Bikramganj, Rohtas, Bihar - 802212
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-white/10">
                                        <p className="text-xs text-slate-400 mb-3">Follow us</p>
                                        <div className="flex gap-2">
                                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-blue-600">
                                                <Facebook className="h-4 w-4" />
                                            </a>
                                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-blue-600">
                                                <Instagram className="h-4 w-4" />
                                            </a>
                                            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-blue-600">
                                                <Linkedin className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enquiry Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                <EnquiryForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoanEnquiryForm;