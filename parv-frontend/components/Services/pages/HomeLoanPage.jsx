import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { documentsData, EligibilityData, FeaturesData, HomeLoanTypesData } from "./LoanData";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";

// Component: Header
function Header() {
    return (
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Home Loans</h1>
            <p className="text-gray-600 mt-2">
                Get financing for whatever you need now. Achieve all your goals and aspirations with the right kind of help, exactly when you need it.
            </p>
        </header>
    );
}
function AboutHomeLoan() {
    return (
        <header className=" mb-6">
            {/* <h1 className="text-4xl font-bold text-gray-800">Home </h1> */}
            <p className="text-gray-600 text-lg mt-2">
                A home loan in India is a financial product provided by banks and financial institutions to individuals looking to purchase or construct a residential property. These loans are a popular means for individuals to fulfill their dream of owning a home, as they allow borrowers to acquire funds to buy a house and repay the amount over an extended period.
            </p>
        </header>
    );
}


const FeatresCard = ({ data }) => {
    return (
        <div>
            <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:h-64 xl:p-7 hover:bg-indigo-600">
                <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">

                    <img src={data?.icon} alt="icons" />

                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">{data?.title}</h4>
                <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                    {data?.desc}
                </p>
            </div>
        </div>
    )
}

// Component: Features
function Features() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features of Home Loan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    FeaturesData?.map((item, index) => {
                        return (
                            <FeatresCard data={item} key={index} />
                        )
                    })
                }
            </div>
        </section>
    );
}

const ElegibilityCard = ({ item }) => {
    return (
        <div
            className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto">
            <div className="inline-block rounded-full py-2 sm:px-3">
                <img src={item?.img} alt="icons" className="w-16 rounded-full" />
            </div>

            <div className="sm:mt-4">
                <h3 className="text-xl font-bold text-gray-800">{item?.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item?.desc}</p>
            </div>
        </div>
    )
}

// Component: Eligibility
function Eligibility() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eligibility Criteria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    EligibilityData?.map((item, index) => {
                        return (
                            <ElegibilityCard item={item} key={index} />
                        )
                    })
                }
            </div>
        </section>
    );
}

// Component: Loan Types
function LoanTypes() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Types of Home Loans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    HomeLoanTypesData?.map((item, index) => {
                        return (
                            <div className="p-4 space-y-1 bg-white rounded-lg shadow" key={index}>
                                <Image
                                    src={item?.img}
                                    alt={item?.type}
                                    width={500}
                                    height={500}
                                    loading="lazy"
                                    className="max-h-[10rem]"
                                />
                                <h3 className="font-bold text-gray-800 pt-4">{item?.type}</h3>
                                <p className="text-gray-600 ">{item?.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

// Component: Additional Details
function AdditionalDetails() {
    return (
        <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Additional Details</h2>
            <ol className="list-decimal list-inside lg:pl-5 text-gray-600 space-y-3">
                <li> <span className="font-semibold">Loan Amount:</span> Depends on factors like income, property cost, and loan-to-value (LTV) ratio.</li>
                <li> <span className="font-semibold">Interest Rates: </span>Fixed rates remain constant, while floating rates change based on market conditions.</li>
                <li> <span className="font-semibold">Loan Tenure: </span>Maximum tenure of up to 30 years, repayable in equated monthly installments (EMIs).</li>
                <li> <span className="font-semibold">Tax Benefits: </span>Tax deductions available under sections 80C and 24(b) of the Income Tax Act.</li>
                <li> <span className="font-semibold">EMI Calculation:</span> EMI consists of both principal and interest, with proportions changing over time.</li>
                <li> <span className="font-semibold">Prepayment and Foreclosure:</span> Borrowers can prepay or foreclose the loan, though some lenders may charge penalties.</li>
                <li> <span className="font-semibold">Insurance:</span> Lenders may require home loan insurance to cover the outstanding amount in case of borrower's demise.</li>
            </ol>
        </section>
    );
}

// Component: Documents Required
function DocumentsRequired() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documents Required</h2>
            <ul className="list-disc grid grid-cols-1 lg:grid-cols-3 gap-3 list-inside text-gray-600">
                {
                    documentsData?.map((item, index) => {
                        return (
                            <li key={index} className="border p-4 rounded-lg" >
                                <span className="font-semibold">{item?.type}</span>
                                <ul className="ml-6 space-y-1">
                                    {item?.details.map((item, index) => (
                                        <li key={index} className="flex gap-2 items-center">
                                            <ArrowRightCircle size={17} />
                                            <span className='w-[90%]'>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    );
}

// Main Page Component
export default function HomeLoanPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full bg-gray-50">
            {/* <Header /> */}
            <AboutHomeLoan />
            <Features />
            <Eligibility />
            <LoanTypes />
            <AdditionalDetails />
            <DocumentsRequired />
        </div>
    );
}
