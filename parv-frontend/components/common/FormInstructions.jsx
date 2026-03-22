import React from 'react'
import { CheckCircle2, FileText, Smartphone, AlertCircle, Clock, PhoneCall } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export const instructionData = {
    title: "Instructions (निर्देश)",
    description: "Please read all instructions carefully before starting the form. (फॉर्म भरने से पहले सभी निर्देशों को ध्यान से पढ़ें।)",
    points: [
        {
            icon: FileText,
            heading: "Prepare Documents First (दस्तावेज़ तैयार करें)",
            text: "Ready your ID, Income, Address proof, and Bank Statements.",
            hindiText: "आईडी, आय, पता प्रमाण और बैंक स्टेटमेंट तैयार रखें।",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Smartphone,
            heading: "Size & Format (फ़ाइल और प्रारूप)",
            text: "Max 2MB per file. Only JPG, JPEG, PNG, and PDF accepted.",
            hindiText: "अधिकतम 2MB। केवल JPG, PNG और PDF मान्य हैं।",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: CheckCircle2,
            heading: "Eligibility (पात्रता)",
            text: "Review eligibility and interest rates before proceeding.",
            hindiText: "आगे बढ़ने से पहले पात्रता और ब्याज दरों की जांच करें।",
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: AlertCircle,
            heading: "Accuracy (सटीकता)",
            text: "Ensure all details match your official documents (* is mandatory).",
            hindiText: "सुनिश्चित करें कि सभी विवरण दस्तावेजों से मेल खाते हैं।",
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            icon: Clock,
            heading: "Processing Time (प्रसंस्करण समय)",
            text: "Review takes 5-7 business days after verification.",
            hindiText: "सत्यापन के बाद समीक्षा में 5-7 कार्य दिन लगते हैं।",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
        },
        {
            icon: PhoneCall,
            heading: "For Assistance (सहायता के लिए)",
            text: "Call +91 7292800809 or email parvmultiservices@gmail.com",
            hindiText: "संपर्क करें: +91 7292800809 या parvmultiservices@gmail.com",
            color: "text-red-600",
            bgColor: "bg-red-50"
        }
    ]
};

const FormInstructions = () => {
    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white ">
                <div className="relative z-10">
                    <h2 className="text-lg md:text-xl font-bold mb-2">{instructionData.title}</h2>
                    <p className="text-blue-100 text-sm max-w-2xl">{instructionData.description}</p>
                </div>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructionData.points.map((point, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${point.bgColor} ${point.color} transition-transform duration-300 group-hover:scale-110`}>
                                    <point.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-zinc-800 text-sm tracking-tight">{point.heading}</h3>
                                    <p className="text-zinc-600 text-[13px] leading-snug">{point.text}</p>
                                    <p className="text-zinc-400 text-[11px] italic mt-1">{point.hindiText}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3 text-amber-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-medium">Note: Fields marked with <span className="text-red-600 font-bold">*</span> are mandatory and must be filled to proceed. (नोट: * से चिह्नित फ़ील्ड अनिवार्य हैं।)</p>
            </div>
        </div>
    )
}

export default FormInstructions
