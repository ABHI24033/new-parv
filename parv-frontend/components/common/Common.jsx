
import { cn } from "@/lib/utils";


export const Heading = ({ text }) => {
    return (
        <div className="w-fit">
            <h6 className="text-gray-100 text-xs bg-orange-500 px-3 rounded-full py-1 font-normal leading-relaxed">{text}</h6>
        </div>
    )
};

export const BigHeading = ({ text, className }) => {
    return (
        <div>
            <h2 className={cn("text-gray-800 sm:text-3xl text-2xl font-bold", className)}>{text}</h2>
        </div>
    )
}