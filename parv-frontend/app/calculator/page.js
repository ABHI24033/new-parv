import EmiAccordion from '@/components/calculator/Content';
import EMINote from '@/components/calculator/EMINote';
import LoanCalculator from '@/components/calculator/LoanCalculator';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import Head from 'next/head';
import React from "react";

function Connector() {
    return (
        <>
            <Head>
                <title>EMI Calculator | Parv Financial Services</title>
                <meta name="description" content="Use our EMI Calculator to estimate your loan repayments with ease. Plan your finances with Parv Financial Services and make informed decisions." />
                <meta name="keywords" content="EMI calculator, loan calculator, financial planning, loan EMI, Parv Financial Services" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="EMI Calculator | Parv Financial Services" />
                <meta property="og:description" content="Calculate your loan EMI easily with Parv Financial Services' EMI Calculator. Plan your loan repayments effectively!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/calculator" />
                <meta property="og:image" content="/About/calculator.png" />
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
            <div>
                 <UpperHeader/>
                <NavbarNew />
                <main className="">
                    <Header title={"EMI Calculator"} subTitle={"Your trusted financial Partner"} img={'/About/calculator.png'} />
                    <LoanCalculator />
                    <EMINote />
                    <EmiAccordion />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Connector;
