import { FormSectionCard } from "@/components/forms/reusable/FormSectionCard";
import { FormInput } from "@/components/forms/reusable/FormInput";
import { Button } from "@/components/ui/button";

export function LoanDetails({ loanHistory, setLoanHistory }) {
    const handleAddEntry = () => {
        setLoanHistory([
            ...loanHistory,
            {
                loan_provider_bank: "",
                total_loan_amount: "",
                current_emi: "",
                remaining_amount: "",
            },
        ]);
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
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-zinc-700">Previous Loan History</h4>
                    <Button type="button" variant="outline" onClick={handleAddEntry} className="font-bold border-blue-100 text-blue-600 hover:bg-blue-50">
                        + Add Entry
                    </Button>
                </div>
                {loanHistory?.map((entry, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50">
                        <FormInput
                            label="Bank Name"
                            id={`history_${index}_bank`}
                            name="loan_provider_bank"
                            placeholder="Bank Name"
                            value={entry.loan_provider_bank || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            label="Loan Amount"
                            id={`history_${index}_amount`}
                            name="total_loan_amount"
                            placeholder="Loan Amount"
                            value={entry.total_loan_amount || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            label="Current EMI"
                            id={`history_${index}_emi`}
                            name="current_emi"
                            placeholder="Current EMI"
                            value={entry.current_emi || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <FormInput
                            type="number"
                            label="Remaining Amount"
                            id={`history_${index}_remaining`}
                            name="remaining_amount"
                            placeholder="Remaining"
                            value={entry.remaining_amount || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        {(loanHistory?.length || 0) > 1 && (
                            <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                                <Button type="button" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold" onClick={() => handleRemoveEntry(index)}>
                                    Remove Entry
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </FormSectionCard>
    );
}
