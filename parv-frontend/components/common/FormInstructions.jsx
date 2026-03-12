import React from 'react'

export const instructionData = {
    title: "Instructions (निर्देश)",
    description:"please read all instructions carefully before start filling form. (फॉर्म भरने से पहले सभी निर्देशों को ध्यान से पढ़ें।)",
    points: [
        {
            heading: "1. Prepare Documents First 📝 (दस्तावेज़ पहले तैयार करें)",
            text: "Please make ready all necessary documents (ID proof, Income proof, Address proof, and Bank Statements) before you start filling out the form.",
            hindiText: "फॉर्म भरने से पहले सभी आवश्यक दस्तावेज (आईडी प्रमाण, आय प्रमाण, पता प्रमाण आदि) को तैयार रखें।"
        },
        {
            heading: "2. Document Size Limit",
            text: "The maximum file size for each document upload is **2MB**. Ensure all files are clearly legible and within this limit.",
            hindiText:"प्रत्येक दस्तावेज़ अपलोड के लिए अधिकतम फ़ाइल आकार **2MB** है। सुनिश्चित करें कि सभी फ़ाइलें स्पष्ट रूप से पढ़ने योग्य हैं और इस सीमा के भीतर हैं।"
        },
        {
            heading: "2. Document Size Type",
            text: "You can upload documents in JPG, JPEG, PNG and PDF Only",
            hindiText:"आप केवल JPG, JPEG, PNG और PDF में दस्तावेज़ अपलोड कर सकते हैं।"
        },
        {
            heading: "3. Review Eligibility & Loan Details",
            text: "Before proceeding, carefully check the minimum loan eligibility criteria and understand the interest rates/tenure options displayed on the previous screen.",
            hindiText:"आगे बढ़ने से पहले, न्यूनतम ऋण पात्रता मानदंड को ध्यान से जांचें और पिछली स्क्रीन पर प्रदर्शित ब्याज दरों/अवधि विकल्पों को समझें।",
        },
        {
            heading: "4. Accuracy and Mandatory Fields (*)",
            text: "Ensure all details provided are **accurate and match your official documents**. Fields marked with an asterisk **(\*) are mandatory** and must be filled in to avoid processing delays.",
            hindiText:"सुनिश्चित करें कि प्रदान किए गए सभी विवरण **सटीक हैं और आपके आधिकारिक दस्तावेजों से मेल खाते हैं**। तारक **(\*) से चिह्नित फ़ील्ड अनिवार्य** हैं और प्रसंस्करण में देरी से बचने के लिए इन्हें भरा जाना चाहिए।",
        },
        // {
        //   heading: "5. Digital Signature/Declaration",
        //   text: "At the end of the form, you must digitally sign or check the declaration box confirming that all information is true to the best of your knowledge."
        // },
        {
            heading: "5. Processing Timeframe",
            text: "Once submitted, the application will be reviewed. Standard processing time is typically **5-7 business days**, subject to successful document verification.",
            hindiText:"एक बार सबमिट होने के बाद, आवेदन की समीक्षा की जाएगी। सफल दस्तावेज़ सत्यापन के अधीन, मानक प्रसंस्करण समय आम तौर पर **5-7 व्यावसायिक दिन** है।",
        },
        {
            heading: "6. For Assistance",
            text: "If you have any questions while filling out the form, contact on +91 7292800809 or parvmultiservices@gmail.com",
            hindiText:"यदि आपको फॉर्म भरते समय कोई समस्या आती है, तो +91 7292800809 या parvmultiservices@gmail.com पर संपर्क करें।",
        }
    ]
};

const FormInstructions = () => {
    return (
        <div className="w-full flex flex-col min-h-[70vh] ">
            <div className="max-w-7xl w-full rounded-2xl">
                <div className="border-b pb-2">
                    <div className="text-md md:text-xl px-2  md:px-4 font-semibold text-blue-900 flex items-start gap-2">
                        {instructionData?.title}
                    </div>
                    <p className='text-sm text-gray-700 px-4'>{instructionData?.description}</p>
                </div>
                {/* <div className="border-b bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
                    <div className="text-md md:text-xl p-2  md:p-4 font-semibold text-blue-900 flex items-start gap-2">
                        <CheckCircle2 className="text-blue-600 pt-2 w-10 md:w-6 md:h-6" />
                        {instructionData?.title}
                    </div>
                </div> */}

                <div className="mt-6 space-y-6 text-gray-700 leading-relaxed">
                    {instructionData?.points?.map((point, index) => (
                        <div
                            key={index}
                            className="border-l-4 border-blue-200 pl-4 hover:border-blue-400 transition-colors"
                        >
                            <p className="font-semibold text-blue-800 text-sm md:text-base">
                                {/* {point?.heading}: */}
                                <span className="font-normal text-gray-700 ml-1">
                                    {index+1}. {point?.text}
                                </span>
                                <br />
                                <span className="font-normal text-gray-700 ml-1">
                                    {point?.hindiText}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FormInstructions