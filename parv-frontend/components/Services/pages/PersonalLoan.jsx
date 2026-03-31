import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRightCircle,
  CheckCircle2,
  Clock3,
  IndianRupee,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const heroStats = [
  { label: "Avg. Approval", value: "24 hrs" },
  { label: "Max Amount", value: "Up to ₹50L" },
  { label: "Tenure", value: "Up to 6 yrs" },
];

const features = [
  {
    title: "No Collateral",
    desc: "Unsecured personal loans with minimal paperwork.",
    icon: ShieldCheck,
  },
  {
    title: "Quick Disbursal",
    desc: "Fast underwriting for medical, travel, or urgent needs.",
    icon: Clock3,
  },
  {
    title: "Flexible EMI",
    desc: "Choose repayment plans that fit your cash flow.",
    icon: IndianRupee,
  },
  {
    title: "End-use Freedom",
    desc: "Wedding, education, relocation—use funds your way.",
    icon: Sparkles,
  },
];

const loanTypes = [
  {
    title: "Wedding & Events",
    desc: "Plan celebrations without compromising on your vision.",
    img: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Medical & Emergency",
    desc: "Immediate support for hospitalization or health expenses.",
    img: "https://images.unsplash.com/photo-1582719478248-5fbb3c6ff95b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Travel & Lifestyle",
    desc: "Finance a dream holiday or upgrade your essentials.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

const processSteps = [
  { title: "Loan Enquiry", desc: "Share your need and basic KYC details.", icon: ArrowRightCircle },
  { title: "Get Call Back", desc: "We confirm eligibility and best offers.", icon: ArrowRightCircle },
  { title: "Submit Documents", desc: "Upload KYC, income proofs, bank statements.", icon: ArrowRightCircle },
  { title: "Verify & Approve", desc: "Credit review and sanction in quick time.", icon: ArrowRightCircle },
  { title: "Disbursement", desc: "Funds credited directly to your bank.", icon: ArrowRightCircle },
];

const eligibility = [
  {
    title: "Salaried Applicants",
    desc: "Age 21-60, stable employment, minimum net salary as per city.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Self-employed",
    desc: "3+ years business vintage with audited financials.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Credit Profile",
    desc: "Good bureau score improves approval speed and rate.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=60",
  },
  {
    title: "Documentation",
    desc: "Valid KYC and verifiable income proofs are required.",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=60",
  },
];

const documents = [
  {
    type: "KYC",
    details: ["PAN & Aadhaar / Passport", "Recent passport-size photo", "Address proof (utility bill/rent agreement)"],
  },
  {
    type: "Income Proof",
    details: ["Salary slips (3 months) or ITR (2-3 years)", "Bank statements (6-12 months)", "Form 16 / GST returns"],
  },
  {
    type: "Employment/Business",
    details: ["Offer/appointment letter or business registration", "Company ID / visiting card"],
  },
];

export default function PersonalLoanPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
            <Sparkles className="h-4 w-4" />
            Personal Loans
          </div>
          <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
            Get instant funds for life’s big moments—fast and hassle-free.
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Quick approvals, transparent pricing, and flexible repayment options tailored to your cash flow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="rounded-2xl bg-blue-600 px-6 py-5 text-sm font-bold text-white hover:bg-blue-700">
              Start Your Application
            </Button>
            <Button variant="outline" className="rounded-2xl border-slate-200 px-6 py-5 text-sm font-bold text-slate-800 hover:border-blue-200 hover:text-blue-700">
              Talk to an Expert
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-center shadow-sm"
              >
                <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-full w-full overflow-hidden rounded-[22px]">
          <Image
            src="https://images.unsplash.com/photo-1582719478248-5fbb3c6ff95b?auto=format&fit=crop&w=1400&q=80"
            alt="Indian couple planning finances"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent" />
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item) => (
          <div
            key={item.title}
            className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Process</p>
            <h2 className="text-2xl font-black text-slate-900">Your step-by-step journey</h2>
          </div>
          <Button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
            Check Eligibility
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {processSteps.map((step, idx) => (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
                Step {idx + 1}
              </div>
              <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
              {idx < processSteps.length - 1 && (
                <div className="absolute right-2 top-1/2 hidden h-px w-5 bg-slate-300 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Loan Types</p>
          <h2 className="text-2xl font-black text-slate-900">Choose the right fit</h2>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {loanTypes.map((type) => (
            <div key={type.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-48 w-full">
                <Image src={type.img} alt={type.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">{type.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{type.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Eligibility</p>
          <h2 className="text-2xl font-black text-slate-900">Who can apply</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {eligibility.map((item) => (
              <div key={item.title} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Documents</p>
          <h2 className="text-2xl font-black text-slate-900">Keep these handy</h2>
          <div className="mt-4 space-y-4">
            {documents.map((block) => (
              <div key={block.type} className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900">{block.type}</h3>
                </div>
                <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                  {block.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <ArrowRightCircle className="mt-1 h-4 w-4 text-blue-600" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
