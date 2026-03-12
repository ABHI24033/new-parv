"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserState } from "../../store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { submitDailyVisitReport } from "@/lib/actions/field-staff";
import { Label } from "recharts";

export default function DailyVisitReport() {
    const userState = useUserState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        employeeName: "",
        clientName: "",
        firmName: "",
        contactPersonName: "",
        contactNumber: "",
        whatsappNumber: "",
        address: "",
        productDiscussed: "",
        remarks: "",
        nextMeetingDate: "",
        formSubmitDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value) => {
        setFormData({ ...formData, productDiscussed: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = await userState.user.getIdToken();
            const currentDate = new Date().toLocaleString();

            const result = await submitDailyVisitReport(token, {
                ...formData,
                formSubmitDate: currentDate,
            });

            if (result.success) {
                setMessage("Report submitted successfully!");
                setFormData({
                    employeeName: "",
                    clientName: "",
                    firmName: "",
                    contactPersonName: "",
                    contactNumber: "",
                    whatsappNumber: "",
                    address: "",
                    productDiscussed: "",
                    remarks: "",
                    nextMeetingDate: "",
                    formSubmitDate: "",
                });
            } else {
                setMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            setMessage("Failed to submit report.");
            console.error("Submission error:", error);
        }

        setLoading(false);
    };

    return (
        <div className="p-6">
            <section className="max-w-5xl w-full mx-auto bg-white p-6 rounded-2xl pt-10 border">
                {message && (
                    <p
                        className={`text-sm text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"
                            }`}
                    >
                        {message}
                    </p>
                )}
                <h2 className="text-xl font-semibold mb-4">Daily Visit Report</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Input
                            name="employeeName"
                            value={formData?.employeeName}
                            onChange={handleChange}
                            placeholder="Employee Name"
                            required
                        />
                        <Input
                            name="clientName"
                            value={formData?.clientName}
                            onChange={handleChange}
                            placeholder="Client Name"
                            required
                        />
                        <Input
                            name="firmName"
                            value={formData?.firmName}
                            onChange={handleChange}
                            placeholder="Firm / Company Name"
                            required
                        />
                        <Input
                            name="contactPersonName"
                            value={formData?.contactPersonName}
                            onChange={handleChange}
                            placeholder="Contact Person Name"
                            required
                        />
                        <Input
                            name="contactNumber"
                            value={formData?.contactNumber}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            required
                        />
                        <Input
                            name="whatsappNumber"
                            value={formData?.whatsappNumber}
                            onChange={handleChange}
                            placeholder="WhatsApp Number"
                            required
                        />
                        <Input
                            name="address"
                            value={formData?.address}
                            onChange={handleChange}
                            placeholder="Company or Client Address"
                            required
                        />
                        <Select
                            name="productDiscussed"
                            className="w-full"
                            value={formData?.productDiscussed}
                            onValueChange={handleSelectChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Product Discussed" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="connectorship">Connectorship</SelectItem>
                                <SelectItem value="personal_loan">Personal Loan</SelectItem>
                                <SelectItem value="business_loan">Business Loan</SelectItem>
                                <SelectItem value="home_loan">Home Loan</SelectItem>
                                <SelectItem value="vehicle_loan">Vehicle Loan</SelectItem>
                                <SelectItem value="gold_loan">Gold Loan</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="space-y-6">
                        <label htmlFor="nextMeetingDate" className="text-xs font-medium">
                            Next Meeting Date
                        </label>
                        <Input
                            type="date"
                            name="nextMeetingDate"
                            id='nextMeetingDate'
                            value={formData?.nextMeetingDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-6">
                        <Textarea
                            name="remarks"
                            value={formData?.remarks}
                            onChange={handleChange}
                            placeholder="Remarks / Comments"
                        />
                    </div>

                    <div className="flex justify-end w-full">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Report"}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}
