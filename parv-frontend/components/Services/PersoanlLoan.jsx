import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function PersonalLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/personalloan.png" // Replace with your image path
                        alt="Personal Loan"
                        width={600}
                        height={400}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>
                {/* Text Section */}
                <div className="md:w-1/2 space-y-2">
                    <div className="mb-3">
                        <Heading text={'Personal Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Empowering your financial needs.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, we offer flexible personal loan solutions
                        to help you manage expenses, cover emergencies, or fulfill your goals.
                        With our seamless process and competitive rates, achieving financial freedom is easier than ever.
                    </p>
                    <p className="text-gray-600 text-base">
                        Whether it's for education, medical needs, or a family event, we've got you covered with
                        quick and reliable support.
                    </p>
                    <ul className="space-y-3 text-gray-600 text-base list-disc pl-5">
                        <li>
                            Easy application process with minimal paperwork.
                        </li>
                        <li>
                            Flexible repayment terms to fit your financial situation.
                        </li>
                        <li>
                            Attractive interest rates for affordable borrowing.
                        </li>
                        <li>
                            Fast approval so you can access funds when you need them most.
                        </li>
                    </ul>
                    <Link href={'/services/personal-loan'} >
                        <button className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>

                </div>
            </div>
        </section>
    );
}
