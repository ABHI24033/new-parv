import { Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="relative mt-auto overflow-hidden border-t border-blue-100/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_28%),linear-gradient(180deg,#0f172a_0%,#111827_100%)] text-slate-200">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="mb-10 grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-2 xl:grid-cols-4 xl:p-8">
                    <div className="xl:col-span-1">
                        <Link href="/" className="flex items-center">
                            <img src={'/logo/logo1.png'} className="h-10 w-28 bg-transparent" alt="Logo" />
                        </Link>
                        <p className="mt-5 text-sm leading-7 text-slate-300">
                            Parv Financial Services - We make finance simple, so you can focus on building your dreams.
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            GST NO. : 10OCHPS7931B1ZJ
                        </div>
                        <div className="mt-5 space-y-3 text-sm text-slate-300">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-blue-300" />
                                <span>+91 7292800809</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-blue-300" />
                                <span>parvmultiservices@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock3 className="h-4 w-4 text-blue-300" />
                                <span>WORKING HOURS- 10 AM to 6 PM ( Monday - Saturday)</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-black tracking-tight text-white">Company</h2>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li><Link href="/about" className="transition hover:text-white">About Us</Link></li>
                            <li><Link href="/loan-enquiry" className="transition hover:text-white">Loan Enquiry</Link></li>
                            <li><Link href="/calculator" className="transition hover:text-white">Calculator</Link></li>
                            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
                            <li><Link href="/dsa" className="transition hover:text-white">DSA</Link></li>
                            <li><Link href="/privacy-policy" className="transition hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="transition hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-black tracking-tight text-white">Loans</h2>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li><Link href="/services/home-loan" className="transition hover:text-white">Home Loan</Link></li>
                            <li><Link href="/services/personal-loan" className="transition hover:text-white">Personal Loan</Link></li>
                            <li><Link href="/services/business-loan" className="transition hover:text-white">Business Loan</Link></li>
                            <li><Link href="/services/vehicle-loan" className="transition hover:text-white">Vehicle Loan</Link></li>
                            <li><Link href="/services/gold-loan" className="transition hover:text-white">Gold Loan</Link></li>
                            <li><Link href="/services/group-loan" className="transition hover:text-white">Group Loan</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-black tracking-tight text-white">Connect With Us</h2>
                        <div className="mt-5 space-y-5 text-sm text-slate-300">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-300" />
                                <span className="leading-7 lowercase">REGD. OFFICE-HOTEL NEW MAYUR, DUMRAO ROAD, BIKRAMGANJ, ROHTAS BIHAR 802212.</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-4 w-4 shrink-0 text-blue-300" />
                                <span className="leading-7 lowercase">Admin office-Maurya Vihar colony, Near Ultra tech cement godown, Landmark- BMP-16, Phulwarishariff Patna 801505.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-400">
                    Copyright (c) Parv financial services. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer;
