import React from "react";
import { BigHeading, Heading } from "../common/Common";
const data = [
    {
        "question": "What types of loans do you offer?",
        "answer": "We offer a variety of loans including personal loans, business loans, home loans, and auto loans. Each type of loan is tailored to meet specific financial needs."
    },
    {
        "question": "What are the eligibility criteria to apply for a loan?",
        "answer": "Eligibility criteria vary depending on the type of loan. Generally, factors such as credit score, income level, employment status, and debt-to-income ratio are considered. Specific requirements can be discussed with our loan officers."
    },
    {
        "question": "How much can I borrow?",
        "answer": "Loan amounts vary based on factors like creditworthiness, income, and the type of loan. Our loan officers will work with you to determine the maximum amount you can borrow."
    },
    {
        "question": "What are your interest rates?",
        "answer": "Interest rates depend on several factors including the type of loan, current market rates, and your credit profile. We offer competitive rates and provide personalized rate quotes upon application."
    },
    {
        "question": "How long does it take to get approved for a loan?",
        "answer": "The approval process can vary depending on the type of loan and individual circumstances. Typically, you can expect a decision within a few business days after submitting a complete application."
    },
    {
        "question": "What documents are required to apply for a loan?",
        "answer": "Required documents may include proof of identity, income verification (such as pay stubs or tax returns), bank statements, and details about the collateral (if applicable). Specific document requirements will be communicated during the application process."
    }
]

const FaqBox = ({ item }) => {
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-700">{item?.question}</h3>
            <div className="mt-2">
                <p className="text-sm text-gray-600">{item?.answer}</p>
            </div>
        </div>
    )
}


const FAQ = () => {
    return (
        <div className="w-full bg-gradient-to-tr from-blue-200 via-gray-50 to-teal-100 px-4 py-10 font-sans">
            <div className="max-w-6xl mx-auto font-sans">
                <div className="flex justify-center py-2">
                    <Heading text={"FAQs"} />
                </div>
                <div className="w-full flex justify-center flex-col">
                    <BigHeading className="text-center" text={'Frequently asked questions'} />
                    <p className="text-base text-gray-600 mt-3 text-center">
                        Your Questions, Answered: Everything You Need to Know About Our Loans
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 mt-10">
                    {
                        data?.map((item, index) => {
                            return (
                                <FaqBox item={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default FAQ;