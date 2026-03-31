import Footer from '@/components/common/Footer';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import { Shield, FileText, Lock, Eye, Database, Share2, UserCheck, Cookie } from "lucide-react";
import Head from 'next/head';

export const metadata = {
    title: 'Privacy Policy | Parv Financial Services',
    description: 'Read our privacy policy to understand how Parv Financial Services collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy | Parv Financial Services</title>
                <meta name="description" content="Read our privacy policy to understand how Parv Financial Services collects, uses, and protects your personal information." />
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
                                    <Shield className="h-3.5 w-3.5" />
                                    <span>Legal</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                                    Privacy Policy
                                </h1>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    Your privacy is important to us. Learn how we collect, use, and protect your personal information.
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
                                        <h2 className="text-xl font-bold text-slate-900">1. Introduction</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        Parv Financial Services (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our financial services. By accessing or using our services, you agree to the terms of this Privacy Policy.
                                    </p>
                                </div>

                                {/* Section 2 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Database className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
                                    </div>
                                    <div className="space-y-4 text-slate-600 leading-7">
                                        <p><strong className="text-slate-900">Personal Information:</strong> We may collect personal information including but not limited to your name, address, email address, phone number, date of birth, PAN number, Aadhar number, employment details, income information, and bank account details when you apply for our services.</p>
                                        <p><strong className="text-slate-900">Financial Information:</strong> When you apply for loans or other financial products, we collect information about your financial status, credit history, loan requirements, and repayment capacity.</p>
                                        <p><strong className="text-slate-900">Usage Information:</strong> We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on our site.</p>
                                    </div>
                                </div>

                                {/* Section 3 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Eye className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">3. How We Use Your Information</h2>
                                    </div>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>To process your loan applications and provide financial services</li>
                                        <li>To verify your identity and conduct credit assessments</li>
                                        <li>To communicate with you about our products, services, and promotions</li>
                                        <li>To improve our website, services, and customer experience</li>
                                        <li>To comply with legal and regulatory requirements</li>
                                        <li>To prevent fraud and ensure the security of our services</li>
                                        <li>To send important notifications and updates about your account</li>
                                    </ul>
                                </div>

                                {/* Section 4 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Share2 className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">4. Information Sharing</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7 mb-4">
                                        We may share your information with:
                                    </p>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>Banking partners and financial institutions to process your loan applications</li>
                                        <li>Credit bureaus and rating agencies for credit assessment purposes</li>
                                        <li>Regulatory authorities and government agencies as required by law</li>
                                        <li>Service providers who assist us in operating our business</li>
                                        <li>Legal and professional advisors when necessary</li>
                                    </ul>
                                    <p className="mt-4 text-slate-600 leading-7">
                                        We do not sell or rent your personal information to third parties for marketing purposes.
                                    </p>
                                </div>

                                {/* Section 5 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">5. Data Security</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, firewalls, and regular security assessments. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                                    </p>
                                </div>

                                {/* Section 6 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Cookie className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">6. Cookies and Tracking</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function properly.
                                    </p>
                                </div>

                                {/* Section 7 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <UserCheck className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">7. Your Rights</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7 mb-4">You have the right to:</p>
                                    <ul className="space-y-2 text-slate-600 leading-7 list-disc list-inside">
                                        <li>Access and review your personal information</li>
                                        <li>Request correction of inaccurate or incomplete information</li>
                                        <li>Request deletion of your personal information (subject to legal requirements)</li>
                                        <li>Opt-out of marketing communications</li>
                                        <li>Withdraw consent where processing is based on consent</li>
                                    </ul>
                                    <p className="mt-4 text-slate-600 leading-7">
                                        To exercise these rights, please contact us at parvmultiservices@gmail.com.
                                    </p>
                                </div>

                                {/* Section 8 */}
                                <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">8. Changes to This Policy</h2>
                                    </div>
                                    <p className="text-slate-600 leading-7">
                                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.
                                    </p>
                                </div>

                                {/* Contact */}
                                <div className="rounded-2xl bg-slate-900 p-6 lg:p-8 text-white">
                                    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                                    <p className="text-slate-300 leading-7 mb-4">
                                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
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
