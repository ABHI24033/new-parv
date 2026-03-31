'use client'

import { useUserState } from '@/app/dashboard/store'
import { LayoutDashboard, Mail, Phone, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UpperHeader = () => {
    const user = useUserState();

    const roles = {
        Admin: "/dashboard",
        DSA: "/dashboard/dsa",
        RM: "/dashboard/rm",
        "Field Staff": "/dashboard/field-staff",
        Telecaller: "/dashboard/telecaller",
    };

    return (
        <div className="bg-slate-50/80 border-b border-slate-200/60 text-slate-600">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
                {/* Left: Contact Info */}
                <div className="flex items-center gap-6">
                    <a 
                        href="tel:+917292800809" 
                        className="flex items-center gap-1.5 transition-colors hover:text-blue-600"
                    >
                        <Phone className="h-3 w-3 text-blue-500" />
                        <span className="font-medium">+91 7292800809</span>
                    </a>
                    <a 
                        href="mailto:parvmultiservices@gmail.com" 
                        className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-blue-600"
                    >
                        <Mail className="h-3 w-3 text-blue-500" />
                        <span className="font-medium">parvmultiservices@gmail.com</span>
                    </a>
                </div>

                {/* Right: GST & Login */}
                <div className="flex items-center gap-4">
                    <span className="hidden md:inline-flex items-center gap-1 text-slate-500">
                        <ShieldCheck className="h-3 w-3 text-emerald-500" />
                        <span className="font-medium tracking-wide">GST: 10OCHPS7931B1ZJ</span>
                    </span>
                    
                    <div className="h-3 w-px bg-slate-300 hidden md:block" />
                    
                    {user?.user?.accessToken ? (
                        <Link
                            href={roles[user?.profile?.role]}
                            className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-blue-600"
                        >
                            <LayoutDashboard className="h-3 w-3" />
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-blue-600"
                        >
                            <User className="h-3 w-3" />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpperHeader
