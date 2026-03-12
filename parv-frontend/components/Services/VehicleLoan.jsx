'use client'
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function VehicleLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Text Section */}
                <div className="md:w-1/2 space-y-2">
                    <div className="mb-3">
                        <Heading text={'Vehicle Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Drive your dreams into reality.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, we provide affordable vehicle loan solutions,
                        helping you own your dream car or bike with ease. Our streamlined process ensures
                        you can hit the road without financial worries.
                    </p>
                    <p className="text-gray-600 text-base">
                        With our attractive interest rates and flexible repayment plans, you can enjoy
                        a stress-free journey to vehicle ownership.
                    </p>
                    <ul className="space-y-3 text-gray-600 text-base list-disc pl-5">
                        <li>
                            Low-interest rates to make vehicle ownership affordable.
                        </li>
                        <li>
                            Quick approvals for faster access to funds.
                        </li>
                        <li>
                            Flexible repayment options tailored to your budget.
                        </li>
                        <li>
                            Expert support to guide you through the process.
                        </li>
                    </ul>
                    <Link href={'/services/vehicle-loan'}>
                        <button className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>

                </div>

                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/vehicleloan.png" // Replace with your image path
                        alt="Vehicle Loan"
                        width={600}
                        height={600}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
