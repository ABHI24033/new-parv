"use client";

import React from "react";

const Detail = ({ label, value }) => (
    <div className="flex justify-between text-sm py-2">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-800 text-right max-w-[60%]">
            {value || "-"}
        </span>
    </div>
);

const DocLink = ({ title, url }) => {
    if (!url) return null;

    return (
        <a
            href={url}
            target="_blank"
            className="flex items-center justify-between p-3 rounded-xl border hover:bg-gray-50 transition"
        >
            <span className="text-sm font-medium text-gray-700">{title}</span>
            <span className="text-blue-600 text-sm font-semibold">View</span>
        </a>
    );
};


export default function ProfilePage({user,isError,isLoading}) {

    if (isLoading) {
        return <div className="p-10 text-center">Loading profile...</div>;
    }

    if (isError || !user) {
        return <div className="p-10 text-center text-red-500">Failed to load profile</div>;
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* ===== PROFILE HEADER ===== */}
                <div className="relative bg-white rounded-3xl shadow p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img
                            src={user.photo || "/user.png"}
                            alt="Profile"
                            className="w-36 h-36 rounded-2xl object-cover border-4 border-white shadow"
                        />
                        <span className="absolute bottom-2 right-2 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user?.full_name}
                        </h1>
                        <p className="text-gray-500 mt-1">{user.work_location}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                            <span className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                                {user.gender}
                            </span>
                            <span className="px-4 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                                {user.marital_status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ===== DETAILS GRID ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* PERSONAL */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Personal Details
                        </h2>

                        <Detail label="Guardian Name" value={user.guardian_name} />
                        <Detail label="Date of Birth" value={user.dob} />
                        <Detail label="Gender" value={user.gender} />
                        <Detail label="Marital Status" value={user.marital_status} />
                    </div>

                    {/* CONTACT */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Contact Information
                        </h2>

                        <Detail label="Phone" value={user.phone_no} />
                        <Detail label="Alt Phone" value={user.alt_phone_no} />
                        <Detail label="Email" value={user.email} />
                        <Detail label="Aadhar No" value={user.aadhar_no} />
                        <Detail label="PAN No" value={user.pan_no} />
                    </div>

                    {/* BANK */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Bank Details
                        </h2>

                        <Detail label="Account No" value={user.bank_account_no} />
                        <Detail label="Branch" value={user.bank_branch} />
                    </div>

                    {/* ADDRESS */}
                    <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Address Details
                        </h2>

                        <Detail label="Present Address" value={user.present_address} />
                        <Detail label="Permanent Address" value={user.permanent_address} />
                    </div>

                    {/* DOCUMENTS */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                            Documents
                        </h2>

                        <div className="space-y-3">
                            <DocLink title="Aadhar Card" url={user.aadhar} />
                            <DocLink title="PAN Card" url={user.pan} />
                            <DocLink title="Bank Document" url={user.bank_doc} />
                            <DocLink title="Education Certificate" url={user.education_certificate} />
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}
