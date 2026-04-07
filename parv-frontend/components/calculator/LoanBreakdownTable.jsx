import React from 'react';

export default function LoanBreakdownTable({ amount, length, interest, monthlyPayment, totalPayable, totalInterest }) {
    const monthlyInterestRate = interest / 100 / 12;

    // Generate complete breakdown for all months
    const breakdown = [];
    let remainingBalance = amount;

    for (let month = 1; month <= length; month++) {
        const interestPayment = remainingBalance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        breakdown.push({
            month,
            principal: principalPayment.toFixed(2),
            interest: interestPayment.toFixed(2),
            totalPayment: monthlyPayment,
            remainingBalance: Math.max(0, remainingBalance).toFixed(2)
        });
    }

    const formatCurrency = (amount) => {
        return '₹' + Number(amount).toLocaleString('en-IN');
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-slate-900">Complete Loan Amortization Schedule</h3>
            <p className="text-sm text-slate-600 text-center">
                Detailed month-by-month breakdown for your {length}-month loan
            </p>

            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Month</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Principal</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Interest</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">EMI</th>
                            <th className="text-right py-3 px-4 font-semibold text-slate-700">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breakdown.map((row) => (
                            <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="py-2 px-4 text-slate-900 font-medium">{row.month}</td>
                                <td className="py-2 px-4 text-right text-slate-700">{formatCurrency(row.principal)}</td>
                                <td className="py-2 px-4 text-right text-slate-700">{formatCurrency(row.interest)}</td>
                                <td className="py-2 px-4 text-right text-slate-700 font-medium">{formatCurrency(row.totalPayment)}</td>
                                <td className="py-2 px-4 text-right text-slate-700">{formatCurrency(row.remainingBalance)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Cards */}
            <div className='mb-6'>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-blue-700 uppercase">Loan Amount</p>
                        <p className="text-lg font-bold text-blue-900">{formatCurrency(amount)}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-emerald-700 uppercase">Monthly EMI</p>
                        <p className="text-lg font-bold text-emerald-900">{formatCurrency(monthlyPayment)}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-orange-700 uppercase">Total Interest</p>
                        <p className="text-lg font-bold text-orange-900">{formatCurrency(totalInterest)}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                        <p className="text-xs font-semibold text-slate-700 uppercase">Total Payable</p>
                        <p className="text-lg font-bold text-slate-900">{formatCurrency(totalPayable)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}