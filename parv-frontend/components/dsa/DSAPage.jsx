import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { dsaContent } from "./DSAData";
import { Card, CardContent } from "@/components/ui/card";
import { User, Network, BookOpen } from "lucide-react";
import { CheckCircle, FileText, Users, DollarSign } from "lucide-react";
import { CreditCard, Home, Briefcase, Shield } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Join Parv Financial Services as a DSA
            </h1>
            <p className="text-lg text-gray-600">
                Empower your career by becoming a Direct Sales Agent (DSA) with us.
            </p>
            <Link href={`/dsa/apply`}>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                    Join Now
                </Button>
            </Link>

        </div>
    );
}
export function WhoIsDSA() {
    return (
        <div className="bg-whi p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Who is a DSA?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>Direct Sales Agent (DSA)</strong> is a partner who connects customers with
                financial services like loans, insurance, and investments. As a DSA, you act as a bridge
                between Parv Financial Services and potential customers, helping them find the right
                financial solutions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
                DSAs play a crucial role in expanding the reach of financial services to individuals and
                businesses. They are trained professionals who understand customer needs and recommend
                suitable financial products.
            </p>
            <p className="text-gray-700 leading-relaxed">
                By joining as a DSA, you become part of a trusted network that empowers people to achieve
                their financial goals.
            </p>
        </div>
    );
}

export function HowItWorks() {
    const { title, steps } = dsaContent.howItWorks;
    const icons = [<FileText size={40} />, <Users size={40} />, <CheckCircle size={40} />, <DollarSign size={40} />];

    return (
        <div className="py-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
                {steps.map((step, index) => (
                    <Card key={index} className="bg-white rounded-lg hover:shadow-xl transition-shadow duration-300">
                        <CardContent className="flex flex-col items-center p-6 text-center">
                            {/* Icon */}
                            <div className="mb-4 text-blue-600">{icons[index]}</div>
                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            {/* Description */}
                            <p className="text-gray-600">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}


export function BenefitsSection() {
    const benefits = [
        {
            icon: "🚀",
            title: "High Earnings",
            description: "Earn attractive commissions on every successful loan disbursal.",
        },
        {
            icon: "💼",
            title: "Flexible Work",
            description: "Work at your own pace and schedule. No fixed office hours.",
        },
        {
            icon: "📈",
            title: "Career Growth",
            description: "Grow your career with training and support from Parv Financial Services.",
        },
        {
            icon: "🤝",
            title: "Networking Opportunities",
            description: "Build a strong network of clients and professionals.",
        },
        {
            icon: "🎓",
            title: "Training & Support",
            description: "Get access to exclusive training programs and resources.",
        },
        {
            icon: "💰",
            title: "Additional Incentives",
            description: "Enjoy bonuses and rewards for top performers.",
        },
    ];

    return (
        <div className="p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
                Benefits of Joining as a DSA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                            {benefit.icon} {benefit.title}
                        </h3>
                        <p className="text-gray-700">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export function CTASection() {
    return (
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-lg mb-6">
                Start your journey as a DSA with Parv Financial Services today and unlock endless
                opportunities.
            </p>
            {/* <Button className="bg-white text-blue-900 hover:bg-blue-50">
                Sign Up Now
            </Button> */}
        </div>
    );
}


export function FAQSection() {
    const faqs = [
        {
            question: "What is the role of a DSA?",
            answer:
                "A DSA connects customers with financial services like loans, insurance, and investments. They act as intermediaries between financial institutions and customers.",
        },
        {
            question: "How much can I earn as a DSA?",
            answer:
                "Earnings depend on the number of successful loan disbursals. DSAs earn attractive commissions and additional incentives for top performance.",
        },
        {
            question: "Is there any training provided?",
            answer:
                "Yes, Parv Financial Services provides comprehensive training and resources to help DSAs understand financial products and customer needs.",
        },
        {
            question: "Can I work as a DSA part-time?",
            answer:
                "Absolutely! DSAs enjoy flexible working hours and can work at their own pace.",
        },
        {
            question: "How do I join as a DSA?",
            answer:
                "Simply fill out the sign-up form on our website, and our team will get in touch with you.",
        },
    ];

    return (
        <div className=" p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-blue-900 hover:text-blue-600">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export function ProductsSection() {
    const { title, categories } = dsaContent.products;

    // Map icons to categories (customize as needed)
    const icons = [
        <CreditCard size={40} />,
        <Home size={40} />,
        <Briefcase size={40} />,
        <Shield size={40} />,
        <DollarSign size={40} />,
    ];

    return (
        <div className="py-12 p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <CardContent className="flex flex-col items-center p-6 text-center">
                            {/* Icon */}
                            <div className="mb-4 text-blue-600">{icons[index]}</div>
                            {/* Category Title */}
                            <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export function EligibilitySection() {
    const { title, points } = dsaContent.eligibility;

    // Define icons for each point
    const icons = [<User size={40} />, <Network size={40} />, <BookOpen size={40} />];

    return (
        <div className="py-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 ">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
                {points.map((point, index) => (
                    <Card key={index} className="bg-white shadow-lg rounded-lg">
                        <CardContent className="p-6 text-center">
                            <div className="mb-4 flex justify-center text-blue-600">
                                {icons[index]}
                            </div>
                            <p className="text-lg font-medium text-gray-700">{point}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}


export default function AboutDSAPage() {
    return (
        <div className="bg-gradient-to-r w-full mx-auto from-blue-50 to-purple-50 min-h-screen py-12">
            <div className="container max-w-7xl mx-auto px-4">
                {/* Hero Section */}
                <HeroSection />

                {/* Who is a DSA? */}
                <WhoIsDSA />

                {/* Benefits Section */}
                <BenefitsSection />
                <HowItWorks />
                <ProductsSection />
                <EligibilitySection />

                <FAQSection />

                {/* Call to Action Section */}
                <CTASection />
            </div>
        </div>
    );
}