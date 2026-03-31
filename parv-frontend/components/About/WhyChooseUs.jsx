import { FileText, Zap, Users } from 'lucide-react';

export default function WhyChooseUs() {
    const features = [
        {
            title: "Personalized Loan Solutions",
            description: "Loans tailored to fit your financial goals and needs with flexible terms.",
            icon: FileText
        },
        {
            title: "Fast Approval Process",
            description: "Get your loan approved and disbursed quickly with our streamlined workflows.",
            icon: Zap
        },
        {
            title: "Expert Financial Guidance",
            description: "Work with a team of dedicated professionals committed to your financial success.",
            icon: Users
        }
    ];

    return (
        <section className="relative overflow-hidden py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                    Why Choose Parv
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                    Built for your financial success
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
                    We provide the support, transparency, and tools you need to succeed financially.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="group rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
