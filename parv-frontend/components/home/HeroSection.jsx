"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Calculator, CarFront, HandCoins, HomeIcon, Users, Shield, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

const loanCategories = [
  {
    title: "Personal Loan",
    description: "Quick funds for your personal needs",
    icon: Users,
    href: "/services/personal-loan",
    color: "bg-blue-500",
  },
  {
    title: "Business Loan",
    description: "Scale your business with ease",
    icon: Building2,
    href: "/services/business-loan",
    color: "bg-emerald-500",
  },
  {
    title: "Home Loan",
    description: "Own your dream home today",
    icon: HomeIcon,
    href: "/services/home-loan",
    color: "bg-indigo-500",
  },
  {
    title: "Vehicle Loan",
    description: "Drive your dreams forward",
    icon: CarFront,
    href: "/services/vehicle-loan",
    color: "bg-amber-500",
  },
  {
    title: "Gold Loan",
    description: "Instant liquidity on gold",
    icon: HandCoins,
    href: "/services/gold-loan",
    color: "bg-yellow-500",
  },
  {
    title: "Group Loan",
    description: "Community-based lending",
    icon: BadgeCheck,
    href: "/services/group-loan",
    color: "bg-violet-500",
  },
];

const stats = [
  { value: "₹500Cr+", label: "Loans Disbursed" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "15+", label: "Years Experience" },
  { value: "99%", label: "Approval Rate" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content - 2 Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 pt-10 pb-16 lg:pb-20 items-center">

          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            {/* Trust Badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-6">
              <Shield className="h-3.5 w-3.5" />
              <span>RBI Registered Financial Services</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Smart loans for
              <span className="block text-blue-600">your brighter future</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              Quick approvals, competitive rates, and personalized solutions.
              Get the funds you need with Parv Financial — trusted by thousands.
            </p>

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Clock, text: "24hr Approval" },
                { icon: TrendingUp, text: "Low Interest Rates" },
                { icon: CheckCircle2, text: "Zero Hidden Charges" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <item.icon className="h-4 w-4 text-blue-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/loan-enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300 hover:-translate-y-0.5"
              >
                Apply for Loan
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/50"
              >
                <Calculator className="h-5 w-5" />
                Check EMI
              </Link>
            </div>
          </div>

          {/* Right Column - Loan Cards Grid */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Choose Your Loan</h3>
                  <p className="text-sm text-slate-500 mt-1">Select a category to get started</p>
                </div>
                <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  6 Loan Types
                </span>
              </div>

              {/* Loan Category Cards Grid */}
              <div className="grid gap-3 sm:grid-cols-3">
                {loanCategories.map(({ title, description, icon: Icon, href, color }) => (
                  <Link
                    key={title}
                    href={href}
                    className="group relative flex flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 hover:bg-white"
                  >
                    <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-lg ${color} text-white shadow-lg shadow-slate-200 transition-transform group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                      <span>Apply now</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
