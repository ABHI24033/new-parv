"use client";

import { LoanFormShell } from "@/components/forms/LoanFormShell";
import FormLayout from "@/components/common/ModernFormLayout";
import { LoadingModal, SuccessModal } from "@/components/common/Modals";
import { Toaster } from "react-hot-toast";

/**
 * Page-level wrapper: marketing header + toaster + shared loan wizard chrome + modals.
 */
export function LoanWizardFrame({
    title,
    description,
    icon,
    steps,
    stepIcons,
    stepIndex,
    onBack,
    onNext,
    onReset,
    onSubmit,
    isLastStep,
    nextDisabled,
    submitDisabled,
    navDisabled,
    submitLabel,
    children,
    loadingOpen,
    successOpen,
    onSuccessOpenChange,
}) {
    return (
        <FormLayout
            title={title}
            description={description}
            icon={icon}
        >
            <Toaster />
            <LoanFormShell
                steps={steps}
                stepIndex={stepIndex}
                icons={stepIcons}
                onBack={onBack}
                onNext={onNext}
                onReset={onReset}
                onSubmit={onSubmit}
                isLastStep={isLastStep}
                nextDisabled={nextDisabled}
                submitDisabled={submitDisabled}
                navDisabled={navDisabled}
                submitLabel={submitLabel}
            >
                {children}
            </LoanFormShell>
            <LoadingModal open={loadingOpen} />
            <SuccessModal open={successOpen} onOpenChange={onSuccessOpenChange} />
        </FormLayout>
    );
}
