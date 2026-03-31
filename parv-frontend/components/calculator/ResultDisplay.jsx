export function ResultDisplay({ monthlyPayment, totalPayable, totalInterest }) {
  const fmt = (num) => Number(num).toLocaleString("en-IN");

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-semibold text-center text-slate-900">Payment Breakdown</h2>
      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <span className="block font-medium text-slate-600">Monthly Payment</span>
          <span className="block text-xl font-black text-slate-900">₹{fmt(monthlyPayment)}</span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <span className="block font-medium text-slate-600">Total Payable</span>
          <span className="block text-xl font-black text-slate-900">₹{fmt(totalPayable)}</span>
        </div>
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <span className="block font-medium text-slate-600">Total Interest</span>
          <span className="block text-xl font-black text-slate-900">₹{fmt(totalInterest)}</span>
        </div>
      </div>
    </div>
  );
}
