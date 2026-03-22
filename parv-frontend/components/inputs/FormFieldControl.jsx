"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function FormFieldControl({
    label,
    htmlFor,
    error,
    children,
    className,
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
        </div>
    );
}
