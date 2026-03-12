import React from "react"
import EnquiryForm from "./FormSection";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";

const LoanEnquiryForm = () => {
    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {/* Contact Information Sidebar */}
                    <div className="bg-blue-700 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-blue-100">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                            <p className="text-blue-100 text-sm mb-8 opacity-90">
                                Have a specific financial goal? Reach out to our experts for personalized guidance.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Email Us</p>
                                        <a href="mailto:parvmultiservices@gmail.com" className="text-sm font-semibold hover:text-blue-200 transition-colors">
                                            parvmultiservices@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                                        <Phone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Call Us</p>
                                        <a href="tel:+917292800809" className="text-sm font-semibold hover:text-blue-200 transition-colors">
                                            +91 7292800809
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md mt-1">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Admin Office</p>
                                        <p className="text-sm font-semibold leading-relaxed">
                                            Behind Hi tech hospital, Saguna More, Danapur Patna - 801503
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md mt-1">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 font-medium uppercase tracking-wider">Registered Office</p>
                                        <p className="text-sm font-semibold leading-relaxed">
                                            Hotel New Mayur, Dumrao Road, Bikramganj, Rohtas, Bihar - 802212
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="text-sm font-medium text-blue-200 mb-4">Follow us on social media</p>
                            <div className="flex gap-4">
                                <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="lg:col-span-2 bg-zinc-50/50 rounded-3xl p-6 md:p-10 border border-zinc-100">
                        <EnquiryForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanEnquiryForm;