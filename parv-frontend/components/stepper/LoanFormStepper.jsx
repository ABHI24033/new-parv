"use client";

import { cn } from "@/lib/utils";

export function LoanFormStepper({
    steps,
    stepIndex,
    icons,
}) {
    const progressPercent =
        steps.length > 1
            ? Math.round((stepIndex / (steps.length - 1)) * 100)
            : 100;

    return (
        <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium">
                    Step {stepIndex + 1} of {steps.length} ({progressPercent}% completed)
                </p>
                <p className="hidden text-xs text-zinc-500 sm:block">
                    {steps[stepIndex]?.title}
                </p>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-zinc-100 sm:hidden">
                <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
            <div
                className={cn(
                    "mt-6 hidden gap-2 sm:grid",
                    steps.length <= 4 && "sm:grid-cols-4",
                    steps.length === 5 && "sm:grid-cols-5",
                    steps.length === 6 && "sm:grid-cols-6",
                    steps.length === 7 && "sm:grid-cols-7",
                    steps.length >= 8 && "sm:grid-cols-8"
                )}
            >
                {steps.map((item, index) => {
                    const Icon = icons[index] ?? icons[0];
                    const isDone = index < stepIndex;
                    const isCurrent = index === stepIndex;
                    return (
                        <div
                            key={item.id}
                            className={cn(
                                "rounded-xl border p-3 text-center",
                                isCurrent && "border-blue-600 bg-blue-50",
                                !isCurrent && "border-zinc-200",
                                isDone && "border-emerald-400 bg-emerald-50"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "mx-auto h-4 w-4",
                                    isCurrent && "text-blue-600",
                                    isDone && "text-emerald-600",
                                    !isCurrent && !isDone && "text-zinc-500"
                                )}
                            />
                            <p className="mt-1 truncate text-[11px] font-medium">
                                {item.title}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
