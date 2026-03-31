import {
  BadgeCheck,
  FileUp,
  FileText,
  IndianRupee,
  PhoneCall,
} from "lucide-react";

const steps = [
  {
    stepNumber: 1,
    title: "Loan Enquiry",
    description: "Share your loan requirement and basic details to get started.",
    icon: FileText,
  },
  {
    stepNumber: 2,
    title: "Get Call Back & Connect with DSA",
    description: "Our team/DSA will reach out to understand your needs and guide you.",
    icon: PhoneCall,
  },
  {
    stepNumber: 3,
    title: "Apply Loan with Documents",
    description: "Submit the required documents and complete your application.",
    icon: FileUp,
  },
  {
    stepNumber: 4,
    title: "Verify & Get Approval",
    description: "We verify details and provide loan approval updates promptly.",
    icon: BadgeCheck,
  },
  {
    stepNumber: 5,
    title: "Disbursement",
    description: "Approved funds are disbursed quickly to your account.",
    icon: IndianRupee,
  },
];

export function StepCard({ stepNumber, title, description, icon: Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Step {stepNumber}
          </div>
          <h3 className="text-xl font-black tracking-tight text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function LoanApplicationProcess() {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 sm:p-6">
      <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-blue-100 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_32%),linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Simple Journey</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            How to Apply for a Loan
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Follow these simple steps to get started with your loan application.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Step {step.stepNumber}
              </span>
              <span className="mt-2 block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {steps.map((step) => (
          <StepCard
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </div>
  );
}
