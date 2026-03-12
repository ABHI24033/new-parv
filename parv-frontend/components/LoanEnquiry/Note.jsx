export default function PleaseNote() {
    return (
        <div className="bg-blue-50 max-w-7xl mx-auto my-10 border-l-4 w-full border-blue-400 p-4 rounded-lg shadow-md">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg
                        className="h-6 w-6 text-blue-400"
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
                            d="M13 16h-1v-4h-1m1-4h.01M12 8v4m0 4v.01m6.938 4.586a9 9 0 1 1-12.727-12.728 9 9 0 0 1 12.727 12.728z"
                        />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-lg font-medium text-blue-800">🔔 Please Note</h3>
                    <div className="mt-2 text-sm text-blue-700 space-y-2">
                        <p>
                            📞 <span className="font-semibold">Confirmation Call:</span> After
                            you submit the form, our Sales Development Executive (SDE) will
                            call you to verify your details and assist you further.
                        </p>
                        <p>
                            🕒 <span className="font-semibold">Response Time:</span> We aim to
                            contact you within 24 hours of your submission.
                        </p>
                        <p>
                            ✅ <span className="font-semibold">Ensure Accuracy:</span> Double-check your contact details to avoid delays in processing your enquiry.
                        </p>
                        <p>
                            💡 <span className="font-semibold">Need Help?</span> If you have
                            urgent questions, feel free to contact us at{" "}
                            <a
                                href="tel:7292800809"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                 +91 7292800809
                            </a>{" "}
                            or{" "}
                            <a
                                href="mailto:parvmultiservices@gmail.com"
                                className="text-blue-600 underline hover:text-blue-800"
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
