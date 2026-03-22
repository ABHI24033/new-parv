"use client";

import { cn } from "@/lib/utils";

/** Responsive 1 / 2 / 3 column layout for form fields */
export function FieldGrid({ children, className }) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                className
            )}
        >
            {children}
        </div>
    );
}
