import { ArrowRight, BadgeCheck, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const calculatorPoints = [
  "Calculate monthly payments in seconds.",
  "Compare loan terms and interest rates.",
  "Understand your financial options clearly.",
  "Plan your future with confidence.",
];

export default function LoanCalculatorSection() {
  return (
    <section className="rounded-[2rem] border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4">
      <div className="grid items-center gap-8 lg:grid-cols-1">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
            <TrendingUp className="h-4 w-4" />
            Financial Planning
          </div>
          <h3 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Plan Your Finances with Ease
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
            Unleash the power of simplicity and gain control over your financial goals. Our loan calculator makes budgeting effortless and helps you make informed decisions.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {calculatorPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm"
              >
                <div className="mt-0.5 rounded-full bg-emerald-50 p-1.5 text-emerald-600">
                  <BadgeCheck className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 text-slate-700">{point}</p>
              </div>
            ))}
          </div>

          <Link href="/calculator" className="mt-8 inline-block">
            <Button className="rounded-2xl bg-slate-900 px-6 py-6 text-sm font-bold text-white hover:bg-blue-700">
              Calculate Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
