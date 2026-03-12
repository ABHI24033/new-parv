import { ArrowRightCircle } from "lucide-react";
import {
    FeaturesData,
    EligibilityData,
    PersonalLoanTypesData,
    DocumentsData
} from "../data/PersonalLoanData";
import Image from "next/image";


function AboutPersonalLoan() {
    return (
        <header className="mb-6">
            <p className="text-gray-600 text-lg mt-2">
                A personal loan is an unsecured loan provided by financial institutions to meet personal financial needs such as wedding expenses, medical emergencies, travel plans, or other unforeseen situations. It requires minimal documentation and offers flexible repayment options.
            </p>
        </header>
    );
}

const FeaturesCard = ({ data }) => (
    <div className="group relative w-full bg-gray-100 rounded-2xl p-6 transition-all duration-500 hover:bg-indigo-600">
        <div className="bg-white rounded-full flex px-3 py-3 justify-center items-center mb-5 w-20 h-20">
            <img src={data.icon} alt="icon" />
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
            {data.title}
        </h4>
        <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
            {data.desc}
        </p>
    </div>
);

// Component: Features
function Features() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features of Personal Loan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FeaturesData.map((item, index) => (
                    <FeaturesCard data={item} key={index} />
                ))}
            </div>
        </section>
    );
}

const EligibilityCard = ({ item }) => (
    <div className="bg-white shadow p-6 w-full max-w-sm rounded-lg mx-auto mt-4">
        <div className="inline-block rounded-full py-2 px-3">
            <img src={item.img} alt="icon" className="w-16 rounded-full" />
        </div>
        <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
        </div>
    </div>
);

// Component: Eligibility
function Eligibility() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eligibility Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {EligibilityData?.map((item, index) => (
                    <EligibilityCard item={item} key={index} />
                ))}
            </div>
        </section>
    );
}

// Component: Loan Types
function LoanTypes() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Personal Loans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PersonalLoanTypesData?.map((item, index) => (
                    <div className="p-6 bg-white rounded-lg shadow" key={index}>
                        <Image
                            src={item?.img}
                            alt={item?.type}
                            width={200}
                            height={100}
                            className="w-full h-40 mb-2"
                        />
                        <h3 className="font-bold text-gray-800">{item.type}</h3>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Component: Additional Benefits
function AdditionalBenefits() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Benefits of Personal Loans</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-3">
                <li>
                    <span className="font-semibold">No Hidden Charges:</span> Transparent loan processes with no unexpected fees or surprises.
                </li>
                <li>
                    <span className="font-semibold">Customizable Loan Amount:</span> Borrow the amount that matches your financial requirements, big or small.
                </li>
                <li>
                    <span className="font-semibold">Prepayment Options:</span> Pay off your loan early with flexible prepayment plans, often without penalties.
                </li>
                <li>
                    <span className="font-semibold">Multi-Purpose Usage:</span> Use the loan for anything—medical emergencies, weddings, travel, education, or debt consolidation.
                </li>
                <li>
                    <span className="font-semibold">Minimal Documentation:</span> Enjoy a hassle-free process with simple document requirements for quick approval.
                </li>
                <li>
                    <span className="font-semibold">Instant Approval:</span> Get your loan approved within hours, so you can focus on what matters.
                </li>
                <li>
                    <span className="font-semibold">Dedicated Customer Support:</span> Receive round-the-clock assistance to help with any loan-related queries.
                </li>
                <li>
                    <span className="font-semibold">Top-Up Loan Facility:</span> Easily avail additional funds on your existing loan if needed.
                </li>
            </ul>
        </section>
    );
}


// Component: Documents Required
function DocumentsRequired() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documents Required</h2>
            <ul className="list-disc grid grid-cols-1 space-y-4 md:grid-cols-3 gap-3 list-inside text-gray-600">
                {DocumentsData.map((item, index) => (
                    <li key={index} className="border p-4 rounded-lg">
                        <span className="font-semibold">{item.type}</span>
                        <ul className="ml-6 space-y-1">
                            {item.details.map((detail, idx) => (
                                <li key={idx} className="flex gap-2 items-center">
                                    <ArrowRightCircle size={17} />
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// Main Page Component
export default function PersonalLoanPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full bg-gray-50">
            <AboutPersonalLoan />
            <Features />
            <Eligibility />
            <LoanTypes />
            <AdditionalBenefits />
            <DocumentsRequired />
        </div>
    );
}
