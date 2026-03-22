"use client";

import { LoanFormNavigation } from "@/components/forms/LoanFormNavigation";
import { LoanFormStepper } from "@/components/stepper/LoanFormStepper";

/**
 * Shared chrome for all loan wizards: stepper + scrollable content + sticky mobile nav.
 */
export function LoanFormShell({
    steps,
    stepIndex,
    icons,
    children,
    onBack,
    onNext,
    onReset,
    onSubmit,
    isLastStep,
    nextDisabled,
    submitDisabled = false,
    navDisabled = false,
    submitLabel,
}) {
    return (
        <>
            <LoanFormStepper steps={steps} stepIndex={stepIndex} icons={icons} />
            <div className="mt-3">{children}</div>
            <LoanFormNavigation
                onBack={onBack}
                onReset={onReset}
                onNext={onNext}
                onSubmit={onSubmit}
                isFirstStep={stepIndex === 0}
                isLastStep={isLastStep}
                nextDisabled={nextDisabled || navDisabled}
                submitDisabled={submitDisabled || navDisabled}
                backDisabled={navDisabled}
                resetDisabled={navDisabled}
                submitLabel={submitLabel}
            />
        </>
    );
}
