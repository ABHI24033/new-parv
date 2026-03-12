'use client'
import { useUserState } from '@/app/dashboard/store'
import { LayoutDashboard } from 'lucide-react'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UpperHeader = () => {
    const user = useUserState();
    console.log(user?.profile?.role);
    console.log(user);

    const roles={
        Admin:"/dashboard",
        DSA:"/dashboard/dsa",
        RM:"/dashboard/rm",
        "Field Staff":"/dashboard/field-staff",
        Telecaller:"/dashboard/telecaller",
    }

    return (
        <div className="bg-gradient-to-r from-blue-100 via-teal-100 to-blue-100 text-sm border-b border-gray-300 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-2 border-b flex flex-col md:flex-row md:items-center justify-between">
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row md:items-center space-x-4">
                    {/* Phone */}
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2a1 1 0 01.9.55l1.3 2.6a1 1 0 01-.1 1.05l-1.2 1.6a12 12 0 005.3 5.3l1.6-1.2a1 1 0 011.05-.1l2.6 1.3a1 1 0 01.55.9v2a1 1 0 01-1 1H17A15 15 0 012 3z" />
                        </svg>
                        <span className="text-gray-700 font-medium">+91 7292800809</span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v.01L12 13 2 4.01V4zm0 2.24V20a2 2 0 002 2h16a2 2 0 002-2V6.24l-10 8.76L2 6.24z" />
                        </svg>
                        <span className="text-gray-700 font-medium">parvmultiservices@gmail.com</span>
                    </div>
                </div>

                {/* Right Side: Login / Language */}
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <p>
                        <span className='font-medium'>GST :</span>
                        <span className='text-sm'>10OCHPS7931B1ZJ</span>
                    </p>
                    |
                    {/* <div className='px-4'>
                        <Link href="/login" className="hover:underline flex gap-0.5 items-center text-gray-700 font-medium">
                            <User size={16} /> Login
                        </Link>
                    </div> */}
                    {
                        user?.user?.accessToken ?
                            <div className='px-4'>
                                <Link href={roles[user?.profile?.role]} className="hover:underline flex gap-0.5 items-center text-gray-700 font-medium">
                                    <LayoutDashboard size={16} /> Dashboard
                                </Link>
                            </div>
                            :
                            <div className='px-4'>
                                <Link href="/login" className="hover:underline flex gap-0.5 items-center text-gray-700 font-medium">
                                    <User size={16} /> Login
                                </Link>
                            </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default UpperHeader