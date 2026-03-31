'use client'
import React, { useState, useMemo } from "react";
import { Slider } from "./Slider";
import { ResultDisplay } from "./ResultDisplay";
import LoanGraph from "./LoanGraph";

export default function LoanCalculator() {
  const [amount, setAmount] = useState(500000);
  const [length, setLength] = useState(60); // months
  const [interest, setInterest] = useState(9.5); // percentage

  const monthlyInterestRate = interest / 100 / 12;
  const monthlyPayment = useMemo(
    () =>
      (
        (amount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -length))
      ).toFixed(2),
    [amount, interest, length]
  );

  const totalPayable = (monthlyPayment * length).toFixed(2);
  const totalInterest = (totalPayable - amount).toFixed(2);

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Plan in seconds</p>
            <h2 className="text-2xl font-black text-slate-900">Adjust sliders to see your EMI</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Explore how amount, tenure, and rate change your monthly outgo. Values are indicative—connect with us for personalised offers.
            </p>
          </div>

          <div className="space-y-6 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
            <Slider label="Loan Amount" value={amount} min={50000} max={10000000} step={10000} onChange={setAmount} unit="₹" />
            <Slider label="Loan Term (Months)" value={length} min={6} max={240} step={1} onChange={setLength} unit="Months" />
            <Slider label="Interest Rate" value={interest} min={6} max={18} step={0.1} onChange={setInterest} unit="%" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Amount</p>
              <p className="text-lg font-black text-slate-900">₹{amount.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">EMI</p>
              <p className="text-lg font-black text-slate-900">₹{Number(monthlyPayment).toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">Tenure</p>
              <p className="text-lg font-black text-slate-900">{length} months</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ResultDisplay monthlyPayment={monthlyPayment} totalPayable={totalPayable} totalInterest={totalInterest} />
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <LoanGraph amount={amount} length={length} interest={interest} />
          </div>
        </div>
      </div>
    </section>
  );
}
