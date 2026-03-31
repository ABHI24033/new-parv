import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { dsaContent } from "./DSAData";
import { User, Network, BookOpen, Rocket, Briefcase, TrendingUp, Handshake, GraduationCap, Gift } from "lucide-react";
import { CheckCircle, FileText, Users, DollarSign } from "lucide-react";
import { CreditCard, Home, Shield } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-slate-50" />
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 items-center py-16 lg:py-20">
                    {/* Left - Text Content */}
                    <div className="text-center lg:text-left">
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-6">
                            <Network className="h-3.5 w-3.5" />
                            <span>Partnership Opportunity</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                            Become a DSA
                            <span className="block text-blue-600">Partner Today</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Join Parv Financial Services as a Direct Sales Agent and earn attractive commissions 
                            by referring loan applications. Start your journey to financial independence.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/dsa/apply">
                                <Button className="rounded-xl h-14 bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5">
                                    Apply as DSA
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="#benefits">
                                <Button variant="outline" className="rounded-xl h-14 px-8 text-base font-semibold border-2 border-slate-200 hover:border-blue-300 hover:text-blue-700">
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900">₹50K+</div>
                                <div className="text-xs text-slate-500">Monthly Earning</div>
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900">500+</div>
                                <div className="text-xs text-slate-500">Active DSAs</div>
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900">6+</div>
                                <div className="text-xs text-slate-500">Loan Products</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Feature Card */}
                    <div className="relative">
                        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Why Partner With Us?</h3>
                                    <p className="text-sm text-slate-500 mt-1">Benefits of becoming a DSA</p>
                                </div>
                                <span className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                    Join Now
                                </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    { icon: Rocket, title: "High Earnings", desc: "Attractive commissions" },
                                    { icon: Briefcase, title: "Flexible Work", desc: "Work on your schedule" },
                                    { icon: TrendingUp, title: "Career Growth", desc: "Training & support" },
                                    { icon: Handshake, title: "Networking", desc: "Build connections" },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm hover:border-blue-200">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
                                            <p className="text-xs text-slate-500">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function WhoIsDSA() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-6">
                            <User className="h-3.5 w-3.5" />
                            <span>Introduction</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                            Who is a DSA?
                        </h2>
                        <div className="space-y-4 text-base leading-7 text-slate-600">
                            <p>
                                A <strong className="font-semibold text-slate-900">Direct Sales Agent (DSA)</strong> is a partner who connects customers with
                                financial services like loans, insurance, and investments. As a DSA, you act as a bridge
                                between Parv Financial Services and potential customers.
                            </p>
                            <p>
                                DSAs play a crucial role in expanding the reach of financial services to individuals and
                                businesses. They are trained professionals who understand customer needs and recommend
                                suitable financial products.
                            </p>
                            <p>
                                By joining as a DSA, you become part of a trusted network that empowers people to achieve
                                their financial goals.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-2xl bg-slate-50 p-8 border border-slate-100">
                            <div className="grid gap-4">
                                {[
                                    { label: "Commission", value: "Up to 2%", desc: "On loan disbursal" },
                                    { label: "Payment Cycle", value: "Monthly", desc: "Direct bank transfer" },
                                    { label: "Support", value: "24/7", desc: "Dedicated manager" },
                                    { label: "Products", value: "6+", desc: "Loan categories" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-white p-4 border border-slate-100">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">{item.label}</p>
                                            <p className="text-lg font-bold text-slate-900">{item.value}</p>
                                        </div>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function HowItWorks() {
    const { title, steps } = dsaContent.howItWorks;
    const icons = [<FileText size={24} />, <Users size={24} />, <CheckCircle size={24} />, <DollarSign size={24} />];

    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span>Process</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div key={index} className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    {icons[index]}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-slate-900">{step.title}</h3>
                                <p className="text-sm leading-6 text-slate-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function BenefitsSection() {
    const benefits = [
        { icon: Rocket, title: "High Earnings", description: "Earn attractive commissions on every successful loan disbursal." },
        { icon: Briefcase, title: "Flexible Work", description: "Work at your own pace and schedule. No fixed office hours." },
        { icon: TrendingUp, title: "Career Growth", description: "Grow your career with training and support from Parv Financial Services." },
        { icon: Handshake, title: "Networking", description: "Build a strong network of clients and professionals." },
        { icon: GraduationCap, title: "Training & Support", description: "Get access to exclusive training programs and resources." },
        { icon: Gift, title: "Additional Incentives", description: "Enjoy bonuses and rewards for top performers." },
    ];

    return (
        <section id="benefits" className="py-16 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                        <Gift className="h-3.5 w-3.5" />
                        <span>Benefits</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Why Join as a DSA?
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600">
                        Discover the advantages of partnering with Parv Financial Services
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm leading-6 text-slate-600">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function CTASection() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-10 sm:p-16 text-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_40%)]" />
                    <div className="relative z-10 mx-auto max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">Ready to Join Us?</h2>
                        <p className="text-lg text-slate-300 leading-relaxed mb-8">
                            Start your journey as a DSA with Parv Financial Services today and unlock endless opportunities.
                        </p>
                        <Link href="/dsa/apply">
                            <Button className="rounded-xl h-14 bg-blue-600 px-8 text-base font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-900/50 transition-all hover:-translate-y-0.5">
                                Apply Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function FAQSection() {
    const faqs = [
        { question: "What is the role of a DSA?", answer: "A DSA connects customers with financial services like loans, insurance, and investments. They act as intermediaries between financial institutions and customers." },
        { question: "How much can I earn as a DSA?", answer: "Earnings depend on the number of successful loan disbursals. DSAs earn attractive commissions and additional incentives for top performance." },
        { question: "Is there any training provided?", answer: "Yes, Parv Financial Services provides comprehensive training and resources to help DSAs understand financial products and customer needs." },
        { question: "Can I work as a DSA part-time?", answer: "Absolutely! DSAs enjoy flexible working hours and can work at their own pace." },
        { question: "How do I join as a DSA?", answer: "Simply fill out the sign-up form on our website, and our team will get in touch with you." },
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 py-2 last:border-0">
                                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-7 text-sm">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}

export function ProductsSection() {
    const { title, categories } = dsaContent.products;

    const icons = [
        <CreditCard size={24} />,
        <Home size={24} />,
        <Briefcase size={24} />,
        <Shield size={24} />,
        <DollarSign size={24} />,
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>Products</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600">
                        Sell a wide range of financial products to your customers
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                {icons[index % icons.length]}
                            </div>
                            <h3 className="text-base font-bold text-slate-900">{category}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function EligibilitySection() {
    const { title, points } = dsaContent.eligibility;

    const icons = [<User size={24} />, <Network size={24} />, <BookOpen size={24} />];

    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
                        <User className="h-3.5 w-3.5" />
                        <span>Eligibility</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {points.map((point, index) => (
                        <div key={index} className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-200">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    {icons[index % icons.length]}
                                </div>
                            </div>
                            <p className="text-base font-semibold text-slate-800 leading-6">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function AboutDSAPage() {
    return (
        <div className="w-full bg-white">
            <HeroSection />
            <WhoIsDSA />
            <BenefitsSection />
            <HowItWorks />
            <ProductsSection />
            <EligibilitySection />
            <FAQSection />
            {/* <CTASection /> */}
        </div>
    );
}