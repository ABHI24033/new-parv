import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, CheckCircle2, FileText, Home, UserRound, UsersIcon } from "lucide-react";

export function ReviewSubmit({ formData, setStep, loanHistory }) {
    const ReviewSection = ({ title, icon: Icon, children, onEdit }) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-600" /> {title}
                </h4>
                <Button variant="ghost" size="sm" onClick={onEdit} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {children}
            </div>
        </div>
    );

    const DataField = ({ label, value, className = "" }) => (
        <div className={`rounded-xl border border-zinc-100 bg-zinc-50/30 p-3 ${className}`}>
            <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">{label}</p>
            <p className="text-sm font-semibold text-zinc-700">{value || "-"}</p>
        </div>
    );

    return (
        <Card className="rounded-2xl shadow-sm border-zinc-200 overflow-hidden">
            <CardHeader className="bg-zinc-50/50 border-b">
                <CardTitle>Review & Submit</CardTitle>
                <CardDescription>Comprehensive summary of your gold loan application.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <ReviewSection title="Personal Details" icon={UserRound} onEdit={() => setStep(1)}>
                    <DataField label="Applicant Name" value={formData.applicant_name} />
                    <DataField label="Loan Amount" value={`₹${formData.loan_amount}`} />
                    <DataField label="Phone" value={formData.phone_no} />
                    <DataField label="PAN Card" value={formData.pan} />
                    <DataField label="DOB" value={formData.dob} />
                    <DataField label="Father's Name" value={formData.fathers_name} />
                    <DataField label="Mother's Name" value={formData.mothers_name} />
                </ReviewSection>

                <ReviewSection title="Address Details" icon={Home} onEdit={() => setStep(2)}>
                    <DataField
                        label="Permanent Address"
                        value={[formData.permanent_building_name, formData.permanent_street_name, formData.permanent_city, formData.permanent_district, formData.permanent_state, formData.permanent_pincode].filter(Boolean).join(", ")}
                        className="md:col-span-2 lg:col-span-3"
                    />
                    {!formData.same_as_permanent_address && (
                        <DataField
                            label="Present Address"
                            value={[formData.present_building_name, formData.present_street_name, formData.present_city, formData.present_district, formData.present_state, formData.present_pincode].filter(Boolean).join(", ")}
                            className="md:col-span-2 lg:col-span-3"
                        />
                    )}
                </ReviewSection>

                <ReviewSection title="Employment Details" icon={Building2} onEdit={() => setStep(3)}>
                    <DataField label="Bank Name" value={formData.saving_account_bank_name} />
                    <DataField label="Turnover" value={formData.saving_account_turnover} />
                </ReviewSection>

                <div className="space-y-4">
                    <ReviewSection title="Previous Loan Details" icon={Briefcase} onEdit={() => setStep(4)}>
                        <p className="text-xs text-zinc-500 italic">History of previous loans if any.</p>
                    </ReviewSection>

                    {loanHistory?.length > 0 && (
                        <div className="rounded-xl border border-zinc-100 bg-zinc-50/30 p-4">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-3">Previous Loan History</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="text-zinc-500 border-b">
                                            <th className="pb-2 font-bold">Bank</th>
                                            <th className="pb-2 font-bold">Amount</th>
                                            <th className="pb-2 font-bold">EMI</th>
                                            <th className="pb-2 font-bold">Remaining</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-700">
                                        {loanHistory.map((h, i) => (
                                            <tr key={i} className="border-b last:border-0">
                                                <td className="py-2">{h.loan_provider_bank || "-"}</td>
                                                <td className="py-2">₹{h.total_loan_amount || "0"}</td>
                                                <td className="py-2">₹{h.current_emi || "0"}</td>
                                                <td className="py-2">₹{h.remaining_amount || "0"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                            <UsersIcon className="w-4 h-4 text-blue-600" /> Reference Details
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setStep(5)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.references?.map((r, i) => (
                            <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 space-y-2">
                                <div className="flex justify-between">
                                    <p className="font-bold text-zinc-800">{r.name || "N/A"}</p>
                                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold uppercase">{r.relation}</span>
                                </div>
                                <p className="text-xs text-zinc-600 font-medium">{r.phone} • {r.profession}</p>
                                <p className="text-[11px] text-zinc-400">
                                    {[r.village, r.street, r.district, r.pincode].filter(Boolean).join(", ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-bold text-zinc-700 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-600" /> Documents Uploaded
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setStep(6)} className="h-7 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            ["applicant_selfie", "Selfie"],
                            ["aadhar_front", "Aadhar Front"],
                            ["aadhar_back", "Aadhar Back"],
                            ["personal_pan_upload", "PAN Card"],
                            ["house_electricity", "Electricity Bill"],
                        ].map(([id, label]) => formData[id] && (
                            <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> {label}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
