// components/LoanCalculatorSection.js
import { Button } from "@/components/ui/button"; // Import ShadCN Button component
import Link from "next/link";
import { BigHeading, Heading } from "../common/Common";

export default function LoanCalculatorSection() {
    return (
        // <section className=" py-6 md:py-20 bg-gradient-to-br from-royal-blue-50 to-white px-6 md:px-16 lg:px-20">
        <section className=" py-6 md:py-20 bg-gradient-to-bl from-blue-50 to-teal-50 px-6 md:px-16 lg:px-20">
            <div className=" max-w-7xl mx-auto md:px-12 lg:px-20">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Left Side: Illustration */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="/About/calculator.png"
                            alt="Loan Calculator Illustration"
                            className="min-w-32 md:max-w-md"
                        />
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-6">
                        <div className="my-5">
                            <Heading text={'Calculator'} />
                        </div>
                        <BigHeading text={'Plan Your Finances with Ease'} />
                        <p className="mt-4 text-gray-600 font-medium">
                            Unleash the power of simplicity and gain control over your
                            financial goals. Our loan calculator makes budgeting effortless
                            and helps you make informed decisions.
                        </p>
                        <ul className="mt-6 space-y-2 text-gray-600">
                            <li>• Calculate monthly payments in seconds.</li>
                            <li>• Compare loan terms and interest rates.</li>
                            <li>• Understand your financial options clearly.</li>
                            <li>• Plan your future with confidence.</li>
                        </ul>
                        <Link href={'/calculator'}>
                            <Button className="mt-6 bg-blue-500 py-4 hover:bg-blue-600 cursor-pointer">Calculate Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
