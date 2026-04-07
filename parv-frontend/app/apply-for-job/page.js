import Footer from '@/components/common/Footer';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import JobApplicationForm from '@/components/forms/JobApplicationForm';
import Head from 'next/head';
import React from "react";

function Connector() {
    return (
        <>
            <Head>
                <title>Apply for Job | Parv Financial Services</title>
                <meta name="description" content="Join our team at Parv Financial Services. Apply for exciting job opportunities in the financial services industry." />
                <meta name="keywords" content="job application, careers, financial services jobs, Parv Financial Services" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="Apply for Job | Parv Financial Services" />
                <meta property="og:description" content="Apply for job opportunities at Parv Financial Services and be part of our growing team." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/apply-for-job" />
                <meta name="robots" content="index, follow" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
                <UpperHeader />
                <NavbarNew />
                <main className="flex-1">
                    <div className="px-4 py-16 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl">
                            <div className="text-center mb-12">
                                <h1 className="text-4xl font-bold text-slate-900 mb-4">Apply for Job</h1>
                                <p className="text-lg text-slate-600">Join our team and help us empower financial dreams</p>
                            </div>
                            <JobApplicationForm />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Connector;