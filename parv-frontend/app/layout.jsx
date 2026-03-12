import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import QueryProviderWrapper from "@/components/providers/QueryProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title:
    "Parv Financial Services - Flexible Loan Options for Your Needs",
  description:
    "Parv Financial Services offers flexible loan options, including personal, business, and home loans. Our expert team is dedicated to providing fast, reliable, and affordable financial solutions to help you achieve your goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Global site tag (gtag.js) - Google Ads */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}');
          `}
        </Script>

        {/* <!-- Google Tag Manager --> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TWB35QNV');
  `}
        </Script>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWB35QNV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }} 
          ></iframe>
        </noscript>

          <QueryProviderWrapper>
            {children}
          </QueryProviderWrapper>
      </body>
    </html>
  );
}
