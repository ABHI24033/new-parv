"use client";

import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Home Loan",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Affordable loans to buy or renovate your dream home with flexible tenure.",
    link: "/loan-enquiry",
  },
  {
    title: "Vehicle Loan",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Finance your car or bike efficiently with our quick approval process.",
    link: "/loan-enquiry",
  },
  {
    title: "Personal Loan",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Instant funds for travel, medical emergencies, or lifestyle upgrades.",
    link: "/loan-enquiry",
  },
  {
    title: "Business Loan",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Flexible working capital and business expansion loans to grow your company.",
    link: "/loan-enquiry",
  },
  {
    title: "Gold Loan",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Get instant liquidity against your gold ornaments with top security.",
    link: "/loan-enquiry",
  },
];

const Services = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="relative">
      <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Our Financial Solutions</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
              Explore our comprehensive range of loan options designed to support your personal aspirations and business goals.
            </p>
          </div>
          <Link href="/loan-enquiry" className="inline-flex rounded-full bg-blue-50 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 hover:bg-blue-100 transition-colors">
            View All Services
          </Link>
        </div>

        <Slider {...settings} className="services-slider pb-8">
          {services.map((service) => (
            <div key={service.title} className="px-3 pb-6">
              <div className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                {/* Real Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500 z-10" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                      Loan
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>

                  <Link href={service.link} className="mt-6 block w-full">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 transition-colors group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Services;
