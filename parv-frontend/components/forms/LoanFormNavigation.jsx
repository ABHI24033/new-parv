"use client";

import { Button } from "@/components/ui/button";

export function LoanFormNavigation({
    onBack,
    onReset,
    onNext,
    onSubmit,
    isFirstStep,
    isLastStep,
    nextDisabled,
    submitDisabled = false,
    backDisabled = false,
    resetDisabled = false,
    submitLabel = "Submit Application",
    nextLabel = "Next",
    submitVariant = "default",
    nextVariant = "default",
    resetVariant = "outline",
    backVariant = "outline",
    size = "default",
}) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:static md:bg-transparent md:pb-0 md:backdrop-blur-none">
            <div className="mx-auto flex w-full max-w-7xl items-stretch justify-between gap-2 sm:gap-3 md:pt-6 md:border-t md:border-gray-100">
                <Button
                    type="button"
                    variant={backVariant}
                    size={size}
                    onClick={onBack}
                    disabled={isFirstStep || backDisabled}
                    className="h-9 flex-1 rounded-md md:flex-none md:px-4"
                >
                    Back
                </Button>

                <div className="space-x-4">
                    <Button
                        type="button"
                        variant={resetVariant}
                        size={size}
                        onClick={onReset}
                        disabled={resetDisabled}
                        className="h-9 flex-1 rounded-md md:flex-none md:px-4"
                    >
                        Reset
                    </Button>
                    {isLastStep ? (
                        <Button
                            type="button"
                            variant={submitVariant}
                            size={size}
                            onClick={() => onSubmit?.()}
                            disabled={submitDisabled}
                            className={`h-9 flex-1 rounded-md md:flex-none md:px-4 ${submitVariant === 'default' ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                        >
                            {submitLabel}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant={nextVariant}
                            size={size}
                            onClick={onNext}
                            disabled={nextDisabled}
                            className={`h-9 flex-1 rounded-md md:flex-none md:px-4 ${nextVariant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
                        >
                            {nextLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
