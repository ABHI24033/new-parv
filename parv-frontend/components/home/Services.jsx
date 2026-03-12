// import React from "react";
// import { BriefcaseBusiness, BusIcon, CastleIcon, HandCoinsIcon, User2Icon } from "lucide-react";
// import { BigHeading, Heading } from "../common/Common";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { Button } from "../ui/button";
// import HomeLoanSection from "../Services/HomeLoanSection";
// import BusinessLoanSection from "../Services/BusinessLoanSection";
// import VehicleLoanSection from "../Services/VehicleLoan";
// import PersonalLoanSection from "../Services/PersoanlLoan";
// import GoldLoanSection from "../Services/GoldLoanSection";
// import GroupLoanSection from "../Services/GroupLoanSection";

// const loanDetails = [
//   {
//     type: "Home Loan",
//     header: "Own Your Dream Home with Ease",
//     subheader: "Affordable Home Loans for Every Aspiration",
//     icon: CastleIcon,
//     content: [
//       "Flexible repayment options available.",
//       "Loan tenure up to 30 years.",
//       "Quick approvals and minimal documentation.",
//       "Loans for purchases or renovations."
//     ]
//   },
//   {
//     type: "Vehicle Loan",
//     header: "Drive Your Dreams Today",
//     subheader: "Hassle-Free Loans for Two-Wheelers and Four-Wheelers",
//     icon: BusIcon,
//     content: [
//       "Finance up to 90% cost.",
//       "Flexible repayment tenures offered.",
//       "Fast approvals for quick disbursement.",
//       "Loans for new or used vehicles."
//     ]
//   },
//   {
//     type: "Personal Loan",
//     header: "Instant Funds for Your Personal Needs",
//     subheader: "Quick Approval, No Collateral Required",
//     icon: User2Icon,
//     content: [
//       "Funds for emergencies or travel.",
//       "Loans up to ₹25 lakh available.",
//       "Repayment tenure up to 60 months.",
//       "Easy online applications, instant approval."
//     ]
//   },
//   {
//     type: "Business Loan",
//     header: "Empower Your Business Growth",
//     subheader: "Customized Loans for Small and Large Businesses",
//     icon: BriefcaseBusiness,
//     content: [
//       "Loans up to ₹50 lakh available.",
//       "Flexible EMIs tailored to business needs.",
//       "Pre-approved offers for quick access.",
//       "Minimal paperwork, fast processing guaranteed."
//     ]
//   },
//   {
//     type: "Gold Loan",
//     header: "Unlock the Value of Your Gold",
//     subheader: "Instant Funds with Gold as Security",
//     icon: HandCoinsIcon,
//     content: [
//       "Quick loans against gold ornaments.",
//       "High loan-to-value ratio offered.",
//       "No credit score requirements needed.",
//       "Instant disbursement, secure gold storage."
//     ]
//   },
//   // {
//   //   type: "Loan Against Property",
//   //   header: "Invest in Your Future",
//   //   subheader: "Affordable Loans for Quality Education",
//   //   icon: Building2Icon,
//   //   content: [
//   //     "Covers tuition fees and expenses.",
//   //     "Loans for studying in India or abroad.",
//   //     "Flexible repayment with moratorium period.",
//   //     "Special offers for higher education courses."
//   //   ]
//   // }
// ];

// const Card = ({ data }) => {
//   return (
//     <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
//       <div className="flex items-center justify-between mb-4">
//         <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
//           <data.icon size={24} />
//         </div>
//         <span className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
//           {data?.type}
//         </span>
//       </div>
//       <h3 className="text-xl font-bold text-gray-800 mb-1">{data?.header}</h3>
//       <p className="text-gray-500 text-sm mb-4">{data?.subheader}</p>
//       <ul className="space-y-3">
//         {data?.content?.map((item, index) => (
//           <li className="flex items-start text-gray-600 text-sm" key={index}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               className="mt-1 mr-2 text-blue-500"
//               viewBox="0 0 24 24"
//             >
//               <path d="M9 16.2l-3.5-3.5 1.41-1.41L9 13.38l7.09-7.09 1.41 1.41z" />
//             </svg>
//             {item}
//           </li>
//         ))}
//       </ul>
//       <Link href={`/services/${data.type.toLowerCase().replace(/ /g, '-')}`}>
//         <Button className="mt-4 bg-blue-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//           Learn More <ArrowRight className="inline-block ml-2" size={16} />
//         </Button>
//       </Link>
//     </div>
//   );
// };

// const Services = () => {
//   return (
//     // <div className="px-4 py-4 md:py-10 w-full bg-gradient-to-br from-royal-blue-50 to-white space-y-6 mx-auto font-[sans-serif]">
//     <div className="px-4 py-4 md:py-10 w-full bg-gradient-to-tr from-blue-50 via-gray-50 to-teal-50 mx-auto font-[sans-serif]">
//       <div className="text-start md:text-center w-full md:max-w-2xl mx-auto">
//         <div className="flex justify-center my-6">
//           <Heading text={"Services"} />
//         </div>
//         <BigHeading text="Simplify Your Success Today" />
//         <p className="text-sm text-gray-600 mt-6">
//           Discover innovative solutions designed to streamline your journey. Our
//           exceptional services provide the tools and support you need to unlock
//           potential, achieve goals, and excel effortlessly.
//         </p>
//       </div>

//       {/* <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto"> */}
//       {/* <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
//         {loanDetails?.map((item, index) => (
//           <Card data={item} key={index} />
//         ))}
//       </div> */}
//       <HomeLoanSection />
//       <BusinessLoanSection />
//       <VehicleLoanSection />
//       <PersonalLoanSection />
//       <GoldLoanSection />
//       <GroupLoanSection/>
//     </div>
//   );
// };

// export default Services;
















"use client";

import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import {
  CastleIcon,
  BusIcon,
  User2Icon,
  BriefcaseBusiness,
  HandCoinsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Home Loan",
    icon: CastleIcon,
    description: "Affordable loans to buy or renovate your dream home.",
    link: "/services/home-loan",
  },
  {
    title: "Vehicle Loan",
    icon: BusIcon,
    description: "Finance your car or bike with flexible EMI options.",
    link: "/services/vehicle-loan",
  },
  {
    title: "Personal Loan",
    icon: User2Icon,
    description: "Instant funds for travel, medical or emergencies.",
    link: "/services/personal-loan",
  },
  {
    title: "Business Loan",
    icon: BriefcaseBusiness,
    description: "Flexible business loans to grow your company.",
    link: "/services/business-loan",
  },
  {
    title: "Gold Loan",
    icon: HandCoinsIcon,
    description: "Get instant cash against your gold ornaments.",
    link: "/services/gold-loan",
  },
];

const Services = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-12 bg-gradient-to-tr from-blue-50 via-gray-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h4 className="text-blue-600 font-semibold">Services</h4>
          <h2 className="text-3xl font-bold mt-2">
            Loan Solutions for Every Need
          </h2>
          <p className="text-gray-600 text-sm mt-4 max-w-xl mx-auto">
            Explore our wide range of loan services designed to support
            your personal and business financial goals.
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={index} className="px-3">
                <div className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all h-full">

                  {/* Icon */}
                  <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-4 text-blue-600">
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mt-2 mb-4">
                    {service.description}
                  </p>

                  {/* Button */}
                  <Link href={service.link}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>

      </div>
    </section>
  );
};

export default Services;