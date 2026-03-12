
import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";
import { BigHeading, Heading } from "../common/Common";


const AboutBox = ({ head, para, imageUrl }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md border-white -500 cursor-pointer hover:scale-105 transition-all duration-700">
            <img src={imageUrl} alt="icons" className="w-10 " />
            <h1 className="text-lg font-semibold text-slate-800">{head}</h1>
            <p className="text-sm text-gray-600">{para}</p>
        </div>
    )
}

const data = {
    // heading: "The Tale of Our Achievement Story",
    heading: "Brand Story for Parv Financial Services",
    desc: "At PARV Financial Services, we take pride in shaping brighter financial futures. Through unwavering dedication and customer-first values, we’ve turned countless dreams into reality. Here’s a glimpse of what we’ve accomplished:",
    box: [
        <AboutBox head={'20+ Years of Expertise'} para={'Empowering Financial Growth with Reliable Loan Solutions'} imageUrl={'/About/experies.png'} />,
        <AboutBox head={'15,000+ Successful Loans'} para={'Helping Customers Achieve Their Goals with Confidence'} imageUrl={'/About/loan.png'} />,
        <AboutBox head={'30+ Prestigious Awards'} para={'Honored for Our Commitment to Excellence and Innovation'} imageUrl={'/About/medal.png'} />,
        <AboutBox head={'97% Client Success Rate'} para={'Consistently delivering impactful financial solutions for success, trust, and growth'} imageUrl={'/About/client.png'} />,
    ]
}
const About = () => {
    return (
        <div className="bg-white px-6 md:px-16 lg:px-20">
            <section className="py-10 md:py-24 relative xl:mr-0 lg:mr-5 mr-0">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                    <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
                        <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                            <div className="w-full flex-col justify-center items-start gap-8 flex">
                                <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                                    <Heading text={'About Us'} />
                                    {/* <h6 className="text-gray-100 text-xs bg-orange-500 px-3 rounded-full py-1 font-normal leading-relaxed">About Us</h6> */}
                                    <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                        {/* <h2
                                            class="text-indigo-700 text-xl md:text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                            Brand Story for Parv Financial Services
                                        </h2> */}
                                        <BigHeading text={`Brand Story for Parv Financial Services`}/>
                                        <p
                                            className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                            {/* Our achievement story is a testament to teamwork and perseverance. Together, we've
                                            overcome challenges, celebrated victories, and created a narrative of progress and
                                            success. */}
                                            At Parv Financial Services, we believe finance is more than numbers — it's the bridge between dreams and reality.
 Founded with a vision to transform lives, we are committed to making financial support simple, secure, and empowering for everyone.
 <br /><br />
We exist to eliminate the barriers people face when pursuing their ambitions — whether it's education, entrepreneurship, or building a better life. Through trusted guidance, personalized solutions, and a spirit of care, we make navigating finance effortless and human.

                                        </p>
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {
                                        data?.box?.map((items, index) => {
                                            return (
                                                <div key={index}>
                                                    {items}
                                                </div>
                                            )
                                        })
                                    }
                                </div> */}
                            </div>
                            <Link href={'/about'}>
                                <button
                                    className="sm:w-fit w-full cursor-pointer group px-3.5 py-2 bg-blue-500 hover:bg-indigo-500 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                                    <span
                                        className="px-1.5 text-white text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">Read
                                        More</span>
                                    <ChevronRight size={17} className="text-white" />
                                </button>
                            </Link>

                        </div>
                        <div className="w-full lg:justify-start justify-center items-start flex">
                            <div
                                className="sm:w-[464px] w-full sm:h-[446px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                                <img className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                                    src="https://pagedone.io/asset/uploads/1717742431.png" alt="about Us image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default About;