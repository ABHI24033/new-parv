import Footer from '@/components/common/Footer';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import AboutDSAPage from '@/components/dsa/DSAPage';
import Head from 'next/head';
import React from "react";

function Connector() {
    return (
        <>
            <Head>
                <title>DSA Partnership | Parv Financial Services</title>
                <meta name="description" content="Become a Direct Selling Agent (DSA) with Parv Financial Services and earn commissions by referring loan applications. Partner with us today!" />
                <meta name="keywords" content="DSA partnership, direct selling agent,connectors, loan referral, financial services, earn with loans" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="DSA Partnership | Parv Financial Services" />
                <meta property="og:description" content="Join Parv Financial Services as a Direct Selling Agent (DSA) and grow your earnings by referring loan applicants. Start your partnership today!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/dsa" />
                <meta property="og:image" content="/dsa/dsa_banner.png" />
                <meta name="robots" content="index, follow" />
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
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
                <UpperHeader />
                <NavbarNew />
                <main className="flex w-full flex-col">
                    <AboutDSAPage />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Connector;
