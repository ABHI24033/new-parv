import { Heading } from "../common/Common";

const steps = [
    {
        stepNumber: 1,
        title: "Apply Online",
        description: "Fill out the application form with your basic details in minutes.",
        icon: "📋",
    },
    {
        stepNumber: 2,
        title: "Upload Documents",
        description: "Submit your required documents for verification.",
        icon: "📂",
    },
    {
        stepNumber: 3,
        title: "Get Approval",
        description: "Receive confirmation once your application is approved.",
        icon: "✅",
    },
    {
        stepNumber: 4,
        title: "Disbursement",
        description: "Funds are disbursed directly to your account quickly.",
        icon: "💰",
    },
];

export function ProcessHeader({ title, subtitle }) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">{subtitle}</p>
        </div>
    );
}


export function StepCard({ stepNumber, title, description, icon }) {
    return (
        <div className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 text-2xl font-bold text-blue-600 bg-blue-100 rounded-full">
                {icon}
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Step {stepNumber}: {title}
                </h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}


export default function LoanApplicationProcess() {
    return (
        <div className="bg-gradient-to-tl from-blue-50 to-teal-50 mx-auto w-full">
            <div className="max-w-6xl mx-auto py-14 w-full px-4 space-y-4">
                <div className="flex justify-center">
                    <Heading text={'Application Process'} />
                </div>
                {/* Header */}
                <ProcessHeader
                    title="How to Apply for a Loan"
                    subtitle="Follow these simple steps to get started with your loan application."
                />

                {/* Steps */}
                <div className="grid gap-6 md:grid-cols-2">
                    {steps.map((step) => (
                        <StepCard
                            key={step.stepNumber}
                            stepNumber={step.stepNumber}
                            title={step.title}
                            description={step.description}
                            icon={step.icon}
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}
