export function ResultDisplay({ monthlyPayment, totalPayable, totalInterest }) {
    return (
        <div className="space-y-4 w-full">
            <h2 className="text-lg font-semibold text-center">Payment Breakdown</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <span className="block font-medium">Monthly Payment</span>
                    <span className="block font-semibold text-lg">₹{monthlyPayment}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <span className="block font-medium">Total Payable</span>
                    <span className="block font-semibold text-lg">₹{totalPayable}</span>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <span className="block font-medium">Total Interest</span>
                    <span className="block font-semibold text-lg">₹{totalInterest}</span>
                </div>
            </div>
        </div>
    );
}
