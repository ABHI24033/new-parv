
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const emiContent = [
    {
        title: "What is an EMI Calculator?",
        description: "An EMI calculator is an online tool that helps you estimate your monthly loan repayment amount based on the loan amount, interest rate, and tenure."
    },
    {
        title: "How does an EMI Calculator work?",
        description: "The calculator uses the standard EMI formula to compute the monthly installment: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the tenure in months."
    },
    {
        title: "Why should you use an EMI Calculator?",
        description: "It provides a quick and accurate estimation of your loan EMI, helping you plan your finances better and compare different loan options."
    },
    {
        title: "What are the factors affecting EMI?",
        description: "The EMI is influenced by the loan amount, interest rate, tenure, and whether the loan has a fixed or floating interest rate."
    },
    {
        title: "What are the benefits of using an EMI Calculator?",
        description: "Using an EMI calculator saves time, eliminates manual calculation errors, and helps in financial decision-making by providing clarity on loan repayments."
    },
    {
        title: "Can EMI change during the loan tenure?",
        description: "Yes, in the case of floating interest rate loans, the EMI amount can vary over time depending on changes in the interest rate."
    },
    {
        title: "Is an EMI Calculator free to use?",
        description: "Yes, most online EMI calculators are free to use and provide instant results without any charges."
    }
];

export default function EmiAccordion() {
    return (
        <div className="px-6 pb-10 max-w-7xl mx-auto md:px-16 lg:px-20">
            <Accordion type="double" collapsible className="mx-auto w-full">
                {
                    emiContent?.map((item, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger>{item?.title}</AccordionTrigger>
                            <AccordionContent>
                                {item?.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div>

    );
}



// export function AccordionDemo() {
//     return (
//         <Accordion type="single" collapsible className="max-w-6xl mx-auto w-full">
//             <AccordionItem value="item-1">
//                 <AccordionTrigger>Is it accessible?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It adheres to the WAI-ARIA design pattern.
//                 </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//                 <AccordionTrigger>Is it styled?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It comes with default styles that matches the other
//                     components&apos; aesthetic.
//                 </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//                 <AccordionTrigger>Is it animated?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It&apos;s animated by default, but you can disable it if you
//                     prefer.
//                 </AccordionContent>
//             </AccordionItem>
//         </Accordion>
//     )
// }
