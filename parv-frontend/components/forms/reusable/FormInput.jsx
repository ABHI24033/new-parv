import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FormInput({
    label,
    id,
    error,
    required,
    className,
    containerClassName,
    ...props
}) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            <Label htmlFor={id} className="font-semibold text-zinc-700">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                id={id}
                className={cn(
                    "w-full transition-all focus-visible:ring-blue-500",
                    error && "border-red-500 focus-visible:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}
