'use client'
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function GoldLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Text Section */}
                <div className="md:w-1/2 space-y-2">
                    <div className="mb-3">
                        <Heading text={'Gold Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Unlock the power of your gold.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, our gold loan services provide instant financial
                        assistance by leveraging the value of your gold assets. Experience quick approvals
                        and maximum value with minimal effort.
                    </p>
                    <p className="text-gray-600 text-base">
                        Whether it's for personal needs or business expansion, our transparent process and
                        competitive rates make gold loans a smart financial choice.
                    </p>
                    <ul className="space-y-3 text-gray-600 text-base list-disc pl-5">
                        <li>
                            High loan-to-value ratio for maximum benefits.
                        </li>
                        <li>
                            Fast disbursal with minimal documentation.
                        </li>
                        <li>
                            Flexible repayment terms to suit your convenience.
                        </li>
                        <li>
                            Safe and secure handling of your gold.
                        </li>
                    </ul>
                    <Link href={'/services/gold-loan'}>
                        <button className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>

                </div>

                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/goldloan1.png" // Replace with your image path
                        alt="Gold Loan"
                        width={600}
                        height={400}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
