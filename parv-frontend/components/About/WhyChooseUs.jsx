export default function WhyChooseUs() {
    const features = [
        {
            title: "Personalized Loan Solutions",
            description: "Loans tailored to fit your financial goals and needs.",
            icon: "📄"
        },
        {
            title: "Fast Approval Process",
            description: "Get your loan approved quickly with our streamlined processes.",
            icon: "⚡"
        },
        {
            title: "Expert Financial Guidance",
            description: "Work with a team of experts dedicated to your success.",
            icon: "🧑‍💼"
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="container max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
                <p className="text-gray-600 mt-4">We provide the support and tools you need to succeed financially.</p>
                <div className="mt-10 grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="text-4xl">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800 mt-4">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
