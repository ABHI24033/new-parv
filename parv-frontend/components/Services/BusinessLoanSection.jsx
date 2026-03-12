import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function BusinessLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/businessloan.png" // Replace with the actual image path
                        alt="Business Loan"
                        width={600}
                        height={400}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>

                {/* Text Section */}
                <div className="md:w-1/2 space-y-3">
                    <div className="mb-3">
                        <Heading text={'Business Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Empowering your business growth.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, we help businesses thrive with our
                        customized business loan solutions. Whether you’re looking to
                        expand operations, purchase equipment, or manage cash flow, we have
                        you covered.
                    </p>
                    <p className="text-gray-600 text-base">
                        Our team ensures quick approvals, competitive rates, and
                        flexibility, so you can focus on scaling your business without
                        financial stress.
                    </p>
                    <ul className="space-y-2 text-gray-600 text-base list-disc pl-5">
                        <li>
                            Tailored loan options to meet your business needs.
                        </li>
                        <li>
                            Streamlined approval process for quick funding.
                        </li>
                        <li>
                            Attractive interest rates to maximize savings.
                        </li>
                        <li>
                            Expert financial guidance every step of the way.
                        </li>
                    </ul>
                    <Link href={'/services/business-loan'}>
                        <button className="bg-blue-500 flex items-center cursor-pointer gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
