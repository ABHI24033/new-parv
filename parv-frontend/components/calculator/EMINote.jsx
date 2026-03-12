// components/EMINote.js
export default function EMINote() {
    return (
        <div className="bg-green-50 max-w-6xl mx-auto my-10 border-l-4 w-full border-green-400 p-4 rounded-lg shadow-md">
            <div className="flex items-start">
                {/* <div className="flex-shrink-0">
                    <svg
                        className="h-6 w-6 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v3m0 0v3m0-6h.01M6 18h12c1.104 0 2-.896 2-2v-8c0-1.104-.896-2-2-2H6c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2z"
                        />
                    </svg>
                </div> */}
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">💡 EMI Calculator Note</h3>
                    <div className="mt-2 text-sm text-green-700 space-y-4">
                        <p>
                            📊 <span className="font-semibold">EMI Calculation:</span> Our EMI calculator helps you determine the monthly installments based on the loan amount, tenure, and interest rate. Please make sure to input the correct values for accurate results.
                        </p>
                        <p>
                            🕒 <span className="font-semibold">Processing Time:</span> The EMI calculation is instantly available upon input. It does not require any personal information to calculate the EMI.
                        </p>
                        <p>
                            💼 <span className="font-semibold">Custom Loan Details:</span> For tailored loan advice or to discuss your EMI options, feel free to reach out to us directly.
                        </p>
                        <p>
                            📞 <span className="font-semibold">Need Assistance?</span> If you have any doubts or need help understanding the EMI results, don't hesitate to contact us at{" "}
                            <a
                                href="tel:+917292800809"
                                className="text-green-600 underline hover:text-green-800"
                            >
                                +917292800809
                            </a>{" "}
                            or{" "}
                            <a
                                href="mailto:parvmultiservices@gmail.com"
                                className="text-green-600 underline hover:text-green-800"
                            >
                                parvmultiservices@gmail.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
