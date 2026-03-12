
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Heading } from "../common/Common";

export default function HomeLoanSection() {
    return (
        <section className="bg-gray-50 py-6">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-8">
                {/* Text Section */}
                <div className="md:w-1/2 space-y-2">
                    <div className="mb-3">
                        <Heading text={'Home Loan'} />
                    </div>
                    <h2 className="text-3xl font-bold text-blue-600">
                        Helping you achieve your dream home.
                    </h2>
                    <p className="text-gray-600 text-base">
                        At PARV Financial Services, we understand that buying a home is a
                        significant milestone. Our tailored home loan solutions are
                        designed to make the process seamless, offering you the best rates
                        and terms to fit your unique needs.
                    </p>
                    <p className="text-gray-600 text-base">
                        Whether you're purchasing your first home, upgrading to a new one,
                        or refinancing, we're here to guide you every step of the way.
                    </p>
                    <ul className="space-y-3 text-gray-600 text-base list-disc pl-5">
                        <li>
                            Flexible loan options to suit your requirements.
                        </li>
                        <li>
                            Quick and transparent approval processes with minimal paperwork.
                        </li>
                        <li>
                            Competitive interest rates designed to save you money.
                        </li>
                        <li>
                            Expert support to help you make informed decisions.
                        </li>
                    </ul>
                    <Link href={'/services/home-loan'}>
                        <button className="bg-blue-500 cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-500 text-white text-sm px-4 mt-6 py-2 rounded-lg shadow hover:bg-blue-600">
                            Explore <MoveRight size={20} />
                        </button>
                    </Link>

                </div>

                {/* Image Section */}
                <div className="md:w-1/2">
                    <Image
                        src="/services/homeloan1.png" // Replace with your image path
                        alt="Home Loan"
                        width={600}
                        height={400}
                        className="rounded-lg h-96 shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}


