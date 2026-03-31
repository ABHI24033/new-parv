import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const VisionMission = () => {
    return (
        <section className="relative overflow-hidden py-12 sm:py-16">
            {/* Subtle background overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
            
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                    {/* Vision Card */}
                    <div className="group rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 sm:p-10">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <Lightbulb className="h-7 w-7" />
                        </div>
                        <h2 className="mb-5 text-3xl font-black tracking-tight text-slate-900">Our Vision</h2>
                        <div className="space-y-4 text-base leading-relaxed text-slate-600">
                            <p>
                                In the contemporary landscape, the need for financial support is an inevitable part of everyone's journey – 
                                be it for personal aspirations, business expansion, educational pursuits, or unforeseen emergencies. 
                                Navigating the labyrinth of loans can, however, prove to be a complex and daunting task for many individuals, 
                                leaving them apprehensive about the process.
                            </p>
                            <p>
                                Enter <strong className="font-bold text-slate-900">Parv Financial Services</strong>, guided by a singular vision – to make the acquisition of loans 
                                accessible and secure for everyone, all from the comfort of their homes, without disrupting their daily routines, 
                                jobs, or businesses.
                            </p>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="group rounded-[2rem] border border-blue-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/5 sm:p-10">
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                            <Target className="h-7 w-7" />
                        </div>
                        <h2 className="mb-5 text-3xl font-black tracking-tight text-slate-900">Our Mission</h2>
                        <div className="space-y-4 text-base leading-relaxed text-slate-600">
                            <p>
                                In a world where financial decisions can be overwhelming, we strive to simplify the lending process, 
                                ensuring that obtaining a loan is not just a necessity but a hassle-free and safe experience for every individual.
                            </p>
                            <p>
                                Our commitment revolves around creating a seamless and user-friendly platform, recognizing that 
                                financial assistance should be a facilitator rather than a barrier. Whether you're dreaming of pursuing 
                                higher education, expanding your entrepreneurial ventures, or managing unforeseen expenses, 
                                <strong className="font-bold text-slate-900"> Parv Financial Services</strong> stands as a reliable partner.
                            </p>
                            <p>
                                We understand the importance of simplicity and security in financial transactions, and our mission is 
                                to redefine the loan landscape by providing a trustworthy and straightforward solution to our customers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
