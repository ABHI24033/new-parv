import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NavbarNew from '@/components/common/Navbar';
import UpperHeader from '@/components/common/UpperHeader';
import LoanEnquiryForm from '@/components/LoanEnquiry/LoanEnquiryForm';
import PleaseNote from '@/components/LoanEnquiry/Note';
import Head from 'next/head';
import React from "react";

function ContactUs() {
    return (
        <>
            <Head>
                <title>Contact Us | Loan Enquiry | Parv Financial Services</title>
                <meta name="description" content="Fill out our loan enquiry form to get in touch with Parv Financial Services. Our team will assist you in choosing the right loan option for your financial needs." />
                <meta name="keywords" content="loan enquiry, contact us, personal loan, business loan, home loan, vehicle loan, financial services" />
                <meta name="author" content="Parv Financial Services" />
                <meta property="og:title" content="Contact Us | Loan Enquiry | Parv Financial Services" />
                <meta property="og:description" content="Submit your loan enquiry with Parv Financial Services and let our experts guide you through the process. Quick approval and hassle-free applications!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.parvfinancialservices.com/contact" />
                <meta property="og:image" content="/services/loan-enquiry.png" />
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
            <div className=" ">
                <UpperHeader />
                <NavbarNew />
                <main className=" mx-auto">
                    <Header title={'Loan Enquiry Form'} subTitle={'Please fill out the form below to inquire about our loan services. Once you submit the form, our representative will contact you shortly to discuss your requirements and guide you through the next steps.'}
                        img={'/services/loan-enquiry.png'}
                    />
                    <LoanEnquiryForm />
                    <PleaseNote />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default ContactUs;
