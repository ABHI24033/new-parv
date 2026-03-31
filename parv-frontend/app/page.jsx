import Head from "next/head";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/common/Footer";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import WhatsAppFloatingButton from "@/components/common/whatsappIcon";
import LoanApplicationProcess from "@/components/home/Application";
import ContactUs from "@/components/home/ContactUs";
import FAQ from "@/components/home/FAQ";
import LoanCalculatorSection from "@/components/home/LoanCalculatorSection";
import Services from "@/components/home/Services";
import TestimonialSection from "@/components/home/TestimonialSection";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Head>
        <title>Parv Financial Services | Personal & Business Loans</title>
        <meta
          name="description"
          content="Discover competitive personal and business loans at Parv Financial Services. Flexible terms, easy application process, and expert financial advice. Apply now!"
        />
        <meta
          name="keywords"
          content="loans, personal loans, business loans, financial services, easy loan application, low interest rates"
        />
        <meta name="author" content="Parv Financial Services" />
        <meta property="og:title" content="Parv Financial Services | Personal & Business Loans" />
        <meta
          property="og:description"
          content="Get hassle-free personal and business loans with flexible repayment options. Apply now with Parv Financial Services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.parvfinancialservices.com" />
        <meta property="og:image" content="/images/parv-logo.png" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Parv Financial Services",
            url: "https://www.parvfinancialservices.com",
            logo: "/images/parv-logo.png",
            description:
              "Parv Financial Services provides personal and business loans with flexible repayment options and expert financial guidance.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-XXXXXXXXXX",
              contactType: "customer service",
            },
          })}
        </script>
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

      <Toaster />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
        <UpperHeader />
        <NavbarNew />

        <main className="flex w-full flex-col">
          <HeroSection />
          <section className="relative">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
              <WhyChooseUs />

              <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-8">
                <LoanCalculatorSection />
              </div>
            </div>
          </section>

          <section className="relative py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
                <LoanApplicationProcess />
              </div>
            </div>
          </section>

          <section className="relative py-16 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 lg:p-10">
                <TestimonialSection />
                <div className="mt-10 border-t border-slate-100 pt-10">
                  <FAQ />
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-16 bg-slate-50">
            <ContactUs />
          </section>
        </main>

        <WhatsAppFloatingButton />
        <Footer />
      </div>
    </>
  );
}
