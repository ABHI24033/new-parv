import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export function LoanDetails({ formData, handleFieldChange, errors, loanHistory, setLoanHistory }) {

    const handleAddEntry = () => {
        setLoanHistory([...loanHistory, {
            loan_provider_bank: "",
            total_loan_amount: "",
            current_emi: "",
            remaining_amount: "",
        }]);
    };

    const handleRemoveEntry = (index) => {
        const updatedHistory = [...loanHistory];
        updatedHistory.splice(index, 1);
        setLoanHistory(updatedHistory);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedHistory = [...loanHistory];
        updatedHistory[index][name] = value;
        setLoanHistory(updatedHistory);
    };

    return (
        <FormSectionCard
            title="Loan Details"
            description="Past loans and other financial details."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="font-semibold text-zinc-700">Have any current loan?</Label>
                    <RadioGroup
                        value={formData.has_current_loan}
                        onValueChange={(v) => handleFieldChange("has_current_loan", v)}
                        className="mt-2 flex gap-4"
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="Yes" id="curr_yes" />
                            <Label htmlFor="curr_yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="No" id="curr_no" />
                            <Label htmlFor="curr_no">No</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-zinc-800">Previous Loan History</h4>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddEntry}>+ Add Entry</Button>
                </div>

                {loanHistory?.map((entry, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 relative group">
                        <FormInput
                            placeholder="Bank Name"
                            name="loan_provider_bank"
                            value={entry.loan_provider_bank}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Loan Amount"
                            name="total_loan_amount"
                            value={entry.total_loan_amount}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Current EMI"
                            name="current_emi"
                            value={entry.current_emi}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            placeholder="Remaining"
                            name="remaining_amount"
                            value={entry.remaining_amount}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <div className="flex items-end justify-start lg:justify-end">
                            {(loanHistory?.length || 0) > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleRemoveEntry(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </FormSectionCard>
    );
}
