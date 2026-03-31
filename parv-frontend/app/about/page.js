import Head from 'next/head';
import Header from "@/components/common/Header";
import React from "react";
import NavbarNew from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import UpperHeader from '@/components/common/UpperHeader';
import HeroSection from '@/components/About/AboutSection';
import VisionMission from '@/components/About/mission/main';
import WhyChooseUs from '@/components/About/WhyChooseUs';

function About() {
    return (
        <>
            <Head>
                <title>About Us | Parv Financial Services</title>
                <meta name="description" content="Learn more about Parv Financial Services, our mission, vision, and commitment to providing personal, business, and home loans at competitive interest rates." />
                <meta name="keywords" content="about Parv Financial Services, financial services, personal loans, business loans, home loans, vehicle loans" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="About Us | Parv Financial Services" />
                <meta property="og:description" content="Parv Financial Services is dedicated to providing accessible and competitive loan solutions. Discover why customers trust us for their financial needs." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/about" />
                <meta property="og:image" content="/About/about_header.png" />
                <meta name="robots" content="index, follow" />
                {/* <!-- Google tag (gtag.js) --> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17568164283"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17568164283');
            `,
                    }}
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
                <UpperHeader />
                <NavbarNew />
                <main>
                    <Header
                        title={'About us'}
                        subTitle={'Our goal at Parv Financial Services is to provide access to Personal Loans, Vehicle Loan, Home Loan, Business Loan at insight competitive interest rates '}
                        img={"https://images.unsplash.com/photo-1556761175-5973dc0f32b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                    />
                    <HeroSection />
                    <VisionMission />
                    <WhyChooseUs />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default About;
