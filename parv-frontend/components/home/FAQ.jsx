import React from "react";

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
];

const FaqBox = ({ item, index }) => {
  return (
    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
        FAQ {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="text-lg font-black tracking-tight text-slate-900">{item?.question}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{item?.answer}</p>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 sm:p-6">
      <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-blue-100 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">FAQs</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Frequently asked questions
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Your Questions, Answered: Everything You Need to Know About Our Loans
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {data?.map((item, index) => (
          <FaqBox item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
