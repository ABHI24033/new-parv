import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function FormSelect({
    label,
    id,
    error,
    required,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    containerClassName,
    triggerClassName,
}) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            <Label htmlFor={id} className="font-semibold text-zinc-700">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    id={id}
                    className={cn(
                        "w-full transition-all focus:ring-blue-500",
                        error && "border-red-500 focus:ring-red-500",
                        triggerClassName
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}
