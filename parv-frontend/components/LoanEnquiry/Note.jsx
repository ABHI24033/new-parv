import { Clock, Phone, CheckCircle, HelpCircle } from "lucide-react";

export default function PleaseNote() {
    return (
        <section className="py-12 lg:py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <HelpCircle className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Please Note</h3>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">Confirmation Call</p>
                                        <p className="text-sm text-slate-600 mt-1">Our Sales Executive will call to verify your details after submission.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">Response Time</p>
                                        <p className="text-sm text-slate-600 mt-1">We aim to contact you within 24 hours of your submission.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">Ensure Accuracy</p>
                                        <p className="text-sm text-slate-600 mt-1">Double-check contact details to avoid processing delays.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-900 text-sm">Need Help?</p>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Contact us at{" "}
                                            <a href="tel:7292800809" className="text-blue-600 font-medium hover:underline">
                                                +91 7292800809
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
