// // 'use client';

// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { db } from '@/lib/firebaseConfig';
// // // import { Timestamp } from '@firebase/firestore';
// // // import { collection } from '@firebase/firestore';
// // // import { addDoc } from '@firebase/firestore';
// // import { useState } from 'react';
// // import { useUserState } from '../../store';
// // import { collection, addDoc, Timestamp } from '@firebase/firestore';
// // import { submitTelecallerSummary } from '@/lib/actions/file_action';
// // import toast from 'react-hot-toast';
// // // import { submitTelecallerSummary } from '@/api/file_action';

// // const TelecallerSummaryForm = () => {
// //     const { profile, user,setInfo,setShowInfo } = useUserState();
// //     console.log(profile);

// //     const [formData, setFormData] = useState({
// //         username: profile?.username || "",
// //         telecallerName: '',
// //         totalCalls: '',
// //         totalCustomers: '',
// //         casesClosed: '',
// //         casesRunning: '',
// //         notes: '',
// //     });

// //     const [loading, setLoading] = useState(false);
// //     const [message, setMessage] = useState('');

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({
// //             ...prev,
// //             [name]: value,
// //         }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setMessage('');

// //         try {
// //             const token = await user.getIdToken();
// //             const currentDate = new Date().toLocaleString(); // Capture submission date

// //             const result = await submitTelecallerSummary(token, {
// //                 ...formData,
// //                 formSubmitDate: currentDate,
// //                 totalCalls: Number(formData.totalCalls),
// //                 totalCustomers: Number(formData.totalCustomers),
// //                 casesClosed: Number(formData.casesClosed),
// //                 casesRunning: Number(formData.casesRunning),
// //             });

// //             console.log(result);
// //             if (result?.success) {
// //                 setFormData({
// //                     telecallerName: '',
// //                     totalCalls: '',
// //                     totalCustomers: '',
// //                     casesClosed: '',
// //                     casesRunning: '',
// //                     notes: '',
// //                 });
// //                 // setInfo({
// //                 //     desc: `Work Report submitted successfully!`,
// //                 //     highlight: result.id,
// //                 // });
// //                 toast.success('Summary submitted successfully!');
// //                 setShowInfo(true);
// //             }
// //         } catch (error) {
// //             console.error('Error submitting summary:', error);
// //             setMessage('Error submitting summary.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="max-w-5xl w-full border mx-auto bg-white p-6  rounded-md mt-10">
// //             <h3 className="pb-6 font-bold text-lg">Telecaller Daily Summary</h3>

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //                 <div className='grid grid-cols-2 gap-4'>
// //                     <div>
// //                         <Label className="block mb-1 font-medium">Username</Label>
// //                         <Input
// //                             type="text"
// //                             name="username"
// //                             value={formData.username}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>
// //                     <div>
// //                         <Label className="block mb-1 font-medium">Telecaller Name</Label>
// //                         <Input
// //                             type="text"
// //                             name="telecallerName"
// //                             value={formData.telecallerName}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                         <Label className="block mb-1 font-medium">Total Calls</Label>
// //                         <Input
// //                             type="number"
// //                             name="totalCalls"
// //                             value={formData.totalCalls}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>

// //                     <div>
// //                         <Label className="block mb-1 font-medium">Total Customers</Label>
// //                         <Input
// //                             type="number"
// //                             name="totalCustomers"
// //                             value={formData.totalCustomers}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>

// //                     <div>
// //                         <Label className="block mb-1 font-medium">Cases Closed</Label>
// //                         <Input
// //                             type="number"
// //                             name="casesClosed"
// //                             value={formData.casesClosed}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>

// //                     <div>
// //                         <Label className="block mb-1 font-medium">Cases Running</Label>
// //                         <Input
// //                             type="number"
// //                             name="casesRunning"
// //                             value={formData.casesRunning}
// //                             onChange={handleChange}
// //                             required
// //                             className="w-full border p-2 rounded"
// //                         />
// //                     </div>
// //                 </div>

// //                 <div>
// //                     <Label className="block mb-1 font-medium">Additional Notes (Optional)</Label>
// //                     <textarea
// //                         name="notes"
// //                         value={formData.notes}
// //                         onChange={handleChange}
// //                         className="w-full border p-2 rounded"
// //                     ></textarea>
// //                 </div>

// //                 <Button
// //                     type="submit"
// //                     disabled={loading}
// //                     className=" float-end"
// //                 >
// //                     {loading ? 'Submitting...' : 'Submit Summary'}
// //                 </Button>
// //             </form>

// //             {message && <p className="mt-4 text-green-600">{message}</p>}
// //         </div>
// //     );
// // };

// // export default TelecallerSummaryForm;



// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import toast from 'react-hot-toast';
// import { useState, useEffect } from 'react';
// import { useUserState } from '../../store';
// import { submitTelecallerSummary } from '@/lib/actions/file_action';

// const TelecallerSummaryForm = () => {
//   const { profile, user, setShowInfo } = useUserState();

//   const [formData, setFormData] = useState({
//     username: '',
//     telecallerName: '',
//     totalCalls: '',
//     totalCustomers: '',
//     casesClosed: '',
//     casesRunning: '',
//     notes: '',
//   });

//   const [loading, setLoading] = useState(false);

//   // Populate username when profile is ready
//   useEffect(() => {
//     if (profile?.username) {
//       setFormData((prev) => ({ ...prev, username: profile.username }));
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = await user.getIdToken();
//       const result = await submitTelecallerSummary(token, {
//         ...formData,
//         formSubmitDate: new Date().toISOString(), // ✅ better than toLocaleString
//         totalCalls: Number(formData.totalCalls),
//         totalCustomers: Number(formData.totalCustomers),
//         casesClosed: Number(formData.casesClosed),
//         casesRunning: Number(formData.casesRunning),
//       });
//       console.log(result);


//       if (result?.success) {
//         toast.success('Summary submitted successfully!');
//         setFormData((prev) => ({
//           ...prev,
//           telecallerName: '',
//           totalCalls: '',
//           totalCustomers: '',
//           casesClosed: '',
//           casesRunning: '',
//           notes: '',
//         }));
//         setShowInfo(true);
//       } else {
//         toast.error('Submission failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting summary:', error);
//       toast.error('Error submitting summary.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl w-full border mx-auto bg-white p-6 rounded-md mt-10">
//       <h3 className="pb-6 font-bold text-lg">Telecaller Daily Summary</h3>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label className="mb-1 font-medium">Username</Label>
//             <Input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               readOnly
//               className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//             />
//           </div>
//           <div>
//             <Label className="mb-1 font-medium">Telecaller Name</Label>
//             <Input
//               type="text"
//               name="telecallerName"
//               value={formData.telecallerName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <Label className="mb-1 font-medium">Total Calls</Label>
//             <Input
//               type="number"
//               name="totalCalls"
//               value={formData.totalCalls}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Label className="mb-1 font-medium">Total Customers</Label>
//             <Input
//               type="number"
//               name="totalCustomers"
//               value={formData.totalCustomers}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Label className="mb-1 font-medium">Cases Closed</Label>
//             <Input
//               type="number"
//               name="casesClosed"
//               value={formData.casesClosed}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <Label className="mb-1 font-medium">Cases Running</Label>
//             <Input
//               type="number"
//               name="casesRunning"
//               value={formData.casesRunning}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <Label className="mb-1 font-medium">Additional Notes (Optional)</Label>
//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           ></textarea>
//         </div>

//         <Button
//           type="submit"
//           disabled={loading}
//           className="float-end"
//         >
//           {loading ? 'Submitting...' : 'Submit Summary'}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default TelecallerSummaryForm;












"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserState } from "../../store";
import { submitTelecallerSummary } from "@/lib/actions/file_action";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { set } from "lodash";

const emojiMap = {
    "0": "🙁", // Very Bad
    "1-3": "😔", // Bad
    "4-6": "😐", // Average
    "7-9": "🙂", // Good
    "10-12": "😊", // Very Good
    "13-15": "😍", // Excellent
};

const getEmoji = (value) => {
    if (value === "0") return emojiMap["0"];
    if (["1", "2", "3"].includes(value)) return emojiMap["1-3"];
    if (["4", "5", "6"].includes(value)) return emojiMap["4-6"];
    if (["7", "8", "9"].includes(value)) return emojiMap["7-9"];
    if (["10", "11", "12"].includes(value)) return emojiMap["10-12"];
    if (["13", "14", "15"].includes(value)) return emojiMap["13-15"];
    return "";
};

const TelecallerSummaryForm = () => {
    const { profile, user, setShowInfo } = useUserState();
    const [rating, setRating] = useState("");
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState('');
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        monthlyGoal: "",
        dailyGoal: "",
        totalConnectorsCall: "",
        oldConnectorCall: "",
        docCollectionCall: "",
        newLeadsToday: "",
        totalLeads: "",
        fileLoginRating: "",
    });

    useEffect(() => {
        if (profile?.username) {
            setFormData((prev) => ({ ...prev, username: profile.username }));
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "fileLoginRating") setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await user.getIdToken();
            const result = await submitTelecallerSummary(token, {
                ...formData,
                formSubmitDate: new Date().toISOString(),
            });
            if (result?.success) {
                toast.success("Summary submitted successfully!");
                setShowInfo(true);
                setFormStatus("success");
                setMessage("Work Report submitted successfully!");
            } else {
                toast.error("Submission failed. Try again.");
                setFormStatus("error");
                setMessage("Failed to submit work report.");
            }
        } catch (err) {
            toast.error("Something went wrong.");
            console.error("Error submitting summary:", err);
            setFormStatus("error"); 
            setMessage("Error submitting work report.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl w-full border mx-auto bg-white p-6 rounded-md mt-10">
            <h3 className="pb-6 font-bold text-lg">Telecaller Daily Summary</h3>
            <Toaster />
            {formStatus === "success" && (
                <div className="mb-4 p-2 rounded bg-green-100 text-green-700">
                    {message}
                </div>
            )}
            {formStatus === "error" && (
                <div className="mb-4 p-2 rounded bg-red-100 text-red-700">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>ID (Username)</Label>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Monthly Goal</Label>
                        <Input
                            type="number"
                            name="monthlyGoal"
                            value={formData.monthlyGoal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Daily Goal</Label>
                        <Input
                            type="number"
                            name="dailyGoal"
                            value={formData.dailyGoal}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Total Connectorship Calls</Label>
                        <Input
                            type="number"
                            name="totalConnectorsCall"
                            value={formData.totalConnectorsCall}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Old Connector Calls</Label>
                        <Input
                            type="number"
                            name="oldConnectorCall"
                            value={formData.oldConnectorCall}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Calls for Doc Collection</Label>
                        <Input
                            type="number"
                            name="docCollectionCall"
                            value={formData.docCollectionCall}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>New Leads Received Today</Label>
                        <Input
                            type="number"
                            name="newLeadsToday"
                            value={formData.newLeadsToday}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Total No. of Leads</Label>
                        <Input
                            type="number"
                            name="totalLeads"
                            value={formData.totalLeads}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    <Label>File Login Today</Label>
                    <select
                        name="fileLoginRating"
                        value={formData.fileLoginRating}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select</option>
                        <option value="0">0 - Very Bad</option>
                        <option value="1">1-3 - Bad</option>
                        <option value="4">4-6 - Average</option>
                        <option value="7">7-9 - Good</option>
                        <option value="10">10-12 - Very Good</option>
                        <option value="13">13-15 - Excellent</option>
                    </select>

                    {rating && (
                        <p className="mt-2 text-lg">
                            Your performance today: <span>{getEmoji(rating)}</span>
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="float-end mt-4"
                >
                    {loading ? "Submitting..." : "Submit Summary"}
                </Button>
            </form>
        </div>
    );
};

export default TelecallerSummaryForm;
