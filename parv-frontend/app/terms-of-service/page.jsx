import Footer from '@/components/common/Footer';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import { Scale, FileText, AlertCircle, CheckCircle, DollarSign, Users, Ban, RefreshCw, MessageSquare } from "lucide-react";
import Head from 'next/head';

export const metadata = {
    title: 'Terms of Service | Parv Financial Services',
    description: 'Read our terms of service to understand the rules and regulations governing the use of Parv Financial Services.',
};

export default function TermsOfService() {
    return (
        <>
            <Head>
                <title>Terms of Service | Parv Financial Services</title>
                <meta name="description" content="Read our terms of service to understand the rules and regulations governing the use of Parv Financial Services." />
                <meta name="robots" content="index, follow" />
            </Head>
            <div className="flex min-h-screen flex-col bg-white">
                <UpperHeader />
                <NavbarNew />
                <main className="flex-1 bg-slate-50">
                    {/* Hero Header */}
                    <section className="relative overflow-hidden bg-white border-b border-slate-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50" />
                        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                            <div className="text-center max-w-2xl mx-auto">
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                                    <Scale className="h-3.5 w-3.5" />
                                    <span>Legal</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                                    Terms of Service
                                </h1>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Please read these terms carefully before using our services. By accessing our services, you agree to be bound by these terms.
                                </p>
                                <p className="mt-4 text-sm text-slate-500">
                                    Last updated: March 31, 2026
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content */}
                    <section className="py-12 lg:py-16">
                        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                            <div className="space-y-8">
                                {/* Section 1 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        By accessing or using the services provided by Parv Financial Services (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who access or use our services.
                                    </p>
                                </div>

                                {/* Section 2 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">2. Services Overview</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7 mb-4">
                                        Parv Financial Services is a financial services company that provides various loan products and financial solutions including but not limited to:
                                    </p>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>Personal Loans</li>
                                        <li>Business Loans</li>
                                        <li>Home Loans</li>
                                        <li>Vehicle Loans</li>
                                        <li>Gold Loans</li>
                                        <li>Group Loans</li>
                                        <li>DSA (Direct Sales Agent) Partnerships</li>
                                    </ul>
                                    <p className="mt-4 text-slate-600 leading-7">
                                        All loan approvals are subject to verification of documents, credit assessment, and company policies.
                                    </p>
                                </div>

                                {/* Section 3 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">3. User Eligibility and Responsibilities</h2>
                                    </div>
                                    <div className="space-y-4 text-slate-600 leading-7">
                                        <p><strong className="text-slate-900">Eligibility:</strong> To use our services, you must be at least 18 years of age and a resident of India. You must have the legal capacity to enter into binding contracts.</p>
                                        <p><strong className="text-slate-900">Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                                        <p><strong className="text-slate-900">Accurate Information:</strong> You agree to provide accurate, current, and complete information when applying for our services. Providing false or misleading information may result in termination of services and legal action.</p>
                                    </div>
                                </div>

                                {/* Section 4 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <DollarSign className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">4. Loan Terms and Conditions</h2>
                                    </div>
                                    <div className="space-y-4 text-slate-600 leading-7">
                                        <p><strong className="text-slate-900">Loan Approval:</strong> All loan applications are subject to approval based on our internal policies, credit assessment, and verification of documents.</p>
                                        <p><strong className="text-slate-900">Interest Rates:</strong> Interest rates are determined based on various factors including loan type, amount, tenure, and creditworthiness. Rates are subject to change without prior notice.</p>
                                        <p><strong className="text-slate-900">Repayment:</strong> Borrowers are obligated to repay loans according to the agreed schedule. Late payments may attract penalties and affect credit scores.</p>
                                        <p><strong className="text-slate-900">Default:</strong> In case of default, we reserve the right to take appropriate legal action to recover dues, including engaging collection agencies.</p>
                                    </div>
                                </div>

                                {/* Section 5 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">5. Fees and Charges</h2>
                                    </div>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>Processing fees may be applicable on loan applications as per company policy</li>
                                        <li>Late payment charges will be levied on overdue amounts</li>
                                        <li>Pre-closure charges may apply for early repayment of loans</li>
                                        <li>All applicable taxes (GST) will be charged extra as per government regulations</li>
                                        <li>Documentation charges may be applicable</li>
                                    </ul>
                                </div>

                                {/* Section 6 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Ban className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">6. Prohibited Activities</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7 mb-4">Users are prohibited from:</p>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>Providing false or misleading information</li>
                                        <li>Using our services for illegal or fraudulent purposes</li>
                                        <li>Attempting to gain unauthorized access to our systems</li>
                                        <li>Interfering with other users&apos; use of our services</li>
                                        <li>Transmitting malware, viruses, or harmful code</li>
                                        <li>Engaging in activities that could damage our reputation</li>
                                    </ul>
                                </div>

                                {/* Section 7 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">7. Intellectual Property</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        All content on our website, including text, graphics, logos, images, and software, is the property of Parv Financial Services and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
                                    </p>
                                </div>

                                {/* Section 8 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <RefreshCw className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">8. Termination</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use our services will immediately cease.
                                    </p>
                                </div>

                                {/* Section 9 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">9. Limitation of Liability</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        To the maximum extent permitted by law, Parv Financial Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of our services. Our total liability shall not exceed the amount you have paid us in the past 12 months.
                                    </p>
                                </div>

                                {/* Section 10 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">10. Governing Law and Jurisdiction</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Patna, Bihar, India.
                                    </p>
                                </div>

                                {/* Section 11 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <RefreshCw className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">11. Changes to Terms</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        We reserve the right to modify or replace these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the new Terms.
                                    </p>
                                </div>

                                {/* Contact */}
                                <div className="rounded-2xl bg-slate-900 p-6 lg:p-8 text-white">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold">Contact Us</h2>
                                    </div>
                                    <p className="text-slate-300 leading-7 mb-4">
                                        If you have any questions about these Terms of Service, please contact us:
                                    </p>
                                    <div className="space-y-2 text-slate-300">
                                        <p><strong className="text-white">Email:</strong> parvmultiservices@gmail.com</p>
                                        <p><strong className="text-white">Phone:</strong> +91 7292800809</p>
                                        <p><strong className="text-white">Address:</strong> Hotel New Mayur, Dumrao Road, Bikramganj, Rohtas, Bihar - 802212</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}
