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
                <CardDescription>Comprehensive summary of your vehicle loan application.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
                <ReviewSection title="Personal Details" icon={UserRound} onEdit={() => setStep(1)}>
                    <DataField label="Applicant Name" value={formData.applicant_name} />
                    <DataField label="Vehicle Type" value={formData.which_vehicle} />
                    <DataField label="Estimated Cost" value={`₹${formData.estimated_cost}`} />
                    <DataField label="Loan Required" value={`₹${formData.loan_you_need}`} />
                    <DataField label="Phone" value={formData.phone_no} />
                    <DataField label="PAN Card" value={formData.pan} />
                    <DataField label="Aadhar Number" value={formData.aadhar} />
                    <DataField label="DOB" value={formData.dob} />
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

                <ReviewSection title="Profession Details" icon={Building2} onEdit={() => setStep(3)}>
                    <DataField label="Profession" value={formData.profession} />
                    {formData.profession === "Job" ? (
                        <>
                            <DataField label="Company" value={formData.current_company_name} />
                            <DataField label="Salary Bank" value={formData.salary_account_bank} />
                            <DataField label="Monthly Income" value={formData.monthly_income} />
                        </>
                    ) : (
                        <>
                            <DataField label="Business Name" value={formData.company_name} />
                            <DataField label="Business Age" value={formData.company_age} />
                        </>
                    )}
                </ReviewSection>

                <ReviewSection title="Financial Details" icon={Briefcase} onEdit={() => setStep(4)}>
                    <DataField label="Current Account" value={formData.have_current_account} />
                    {formData.have_current_account === "Yes" && (
                        <>
                            <DataField label="Bank Name" value={formData.current_account_bank_name} />
                            <DataField label="Turnover" value={formData.current_account_turnover} />
                        </>
                    )}
                    <DataField label="Saving Bank" value={formData.saving_account_bank_name} />
                </ReviewSection>

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
                            ["personal_pan", "PAN Card"],
                            ["address_prooof", "Address Proof"],
                            ["coapplicant_aadhar_front", "Co-app Aadhar Front"],
                            ["coapplicant_aadhar_back", "Co-app Aadhar Back"],
                            ["coapplicant_pan", "Co-app PAN"],
                            ["salary_slip_1", "Salary 1"],
                            ["salary_slip_2", "Salary 2"],
                            ["salary_slip_3", "Salary 3"],
                            ["form_16_itr_1", "ITR 1"],
                            ["form_16_itr_2", "ITR 2"],
                            ["electricity_bill", "Electricity Bill"],
                            ["business_images", "Business Images"],
                            ["business_proof", "Business Proof"],
                            ["itr_1", "ITR 1"],
                            ["itr_2", "ITR 2"],
                            ["another_1", "Another 1"],
                            ["another_2", "Another 2"],
                            ["another_3", "Another 3"],
                            ["sale_deed", "Sale Deed"],
                            ["mutation", "Mutation"],
                            ["rashid", "Rashid"],
                            ["lpc", "LPC"],
                            ["property_pic", "Property Pic"],
                            ["property_map", "Property Map"],
                            ["chain_deed", "Chain Deed"],
                            ["guarantor_aadhar_front", "Guar Aadhar Front"],
                            ["guarantor_aadhar_back", "Guar Aadhar Back"],
                            ["guarantor_pan", "Guar PAN"],
                            ["vehicle_quotation", "Quotation"],
                            ["owner_book", "Owner Book"],
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
