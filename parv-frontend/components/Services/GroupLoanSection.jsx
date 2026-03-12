import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function GroupLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/GroupLoan.png" // Replace with your group loan image path
                        alt="Group Loan"
                        width={600}
                        height={400}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>
                {/* Text Section */}
                <div className="md:w-1/2 space-y-2">
                    <div className="mb-3">
                        <Heading text={'Group Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Strength in unity, power in finance.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, we provide Group Loan facilities to support communities, 
                        small businesses, and self-help groups. Our goal is to empower collective growth through 
                        accessible and flexible loan solutions.
                    </p>
                    <p className="text-gray-600 text-base">
                        Whether it’s for starting a business, expanding existing work, or managing shared expenses, 
                        we make financing simple and reliable for groups of all sizes.
                    </p>
                    <ul className="space-y-3 text-gray-600 text-base list-disc pl-5">
                        <li>
                            Designed for self-help groups, communities, and joint ventures.
                        </li>
                        <li>
                            Shared responsibility for easier repayment and stronger trust.
                        </li>
                        <li>
                            Affordable interest rates with flexible repayment terms.
                        </li>
                        <li>
                            Quick approval process to boost collective goals.
                        </li>
                    </ul>
                    <Link href={'/services/group-loan'} >
                        <button className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
