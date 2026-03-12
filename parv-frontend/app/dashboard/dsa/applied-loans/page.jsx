// // components/LoanTable.tsx

// import React from "react";

// const loanData = [
//   {
//     date: "2025-07-13",
//     name: "John Doe",
//     phone: "+91-9876543210",
//     loanId: "LN001",
//     loanAmount: 100000,
//     incomeFromLoan: 5000,
//     loanType: "Business Loan",
//     status: "Approved",
//   },
//   {
//     date: "2025-07-10",
//     name: "Priya Sharma",
//     phone: "+91-9123456789",
//     loanId: "LN002",
//     loanAmount: 50000,
//     incomeFromLoan: 2000,
//     loanType: "Personal Loan",
//     status: "Pending",
//   },
//   // Add more entries as needed
// ];

// const LoanTable = () => {


//   return (
//     <div className="p-4 md:p-8">
//       <h2 className="text-2xl font-bold mb-4 text-center">Loan Applications</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Applicant's Name</th>
//               <th className="px-4 py-2 border">Phone</th>
//               <th className="px-4 py-2 border">Loan ID</th>
//               <th className="px-4 py-2 border">Loan Amount</th>
//               <th className="px-4 py-2 border">Income from Loan</th>
//               <th className="px-4 py-2 border">Loan Type</th>
//               <th className="px-4 py-2 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loanData.map((loan, index) => (
//               <tr key={index} className="text-center hover:bg-gray-50">
//                 <td className="px-4 py-2 border">{loan.date}</td>
//                 <td className="px-4 py-2 border">{loan.name}</td>
//                 <td className="px-4 py-2 border">{loan.phone}</td>
//                 <td className="px-4 py-2 border">{loan.loanId}</td>
//                 <td className="px-4 py-2 border">₹{loan.loanAmount.toLocaleString()}</td>
//                 <td className="px-4 py-2 border">₹{loan.incomeFromLoan.toLocaleString()}</td>
//                 <td className="px-4 py-2 border">{loan.loanType}</td>
//                 <td className={`px-4 py-2 border font-medium ${
//                   loan.status === "Approved" ? "text-green-600" :
//                   loan.status === "Pending" ? "text-yellow-600" :
//                   "text-red-600"
//                 }`}>
//                   {loan.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LoanTable;





















"use client";

import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { getLoanDataByType } from "@/lib/actions/dsa";
import React, { useEffect, useState } from "react";
// import { getLoanDataByType } from "@/app/actions/loan"; // Adjust path if needed

const PAGE_SIZE = 5;

const LoanTable = ({ token }) => {
    const [loans, setLoans] = useState([]);
    const [lastDocId, setLastDocId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [type, setType] = useState(""); // Filter type if needed

    const username = 'PDSA1'


    useEffect(() => {
        fetchLoans(currentPage);
    }, [currentPage, type]);

    const fetchLoans = async (page) => {
        const res = await getLoanDataByType(token, username, PAGE_SIZE, lastDocId, page);
        console.log("Fetched loans:", res);

        if (page === 1) {
            setLoans(res.data);
        } else {
            setLoans((prev) => [...prev, ...res.data]);
        }
        setLastDocId(res.lastDocId);
        setHasMore(res.hasMore);
    };

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-start">Loan Applications</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-2 border">Sr.no</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Applicant's Name</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Loan ID</th>
                            <th className="px-4 py-2 border">Loan Amount</th>
                            {/* <th className="px-4 py-2 border">Income from Loan</th> */}
                            <th className="px-4 py-2 border">Loan Type</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan, index) => (
                            <tr key={loan.id ?? index} className="text-center hover:bg-gray-50">
                                <td className="px-2 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{new Date(loan.date?.toDate?.() ?? loan.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">{loan?.applicant_name}</td>
                                <td className="px-4 py-2 border">{loan.phone_no}</td>
                                <td className="px-4 py-2 border">{loan?.id}</td>
                                <td className="px-4 py-2 border">₹{loan.loan_amount?.toLocaleString()}</td>
                                {/* <td className="px-4 py-2 border">₹{loan.incomeFromLoan?.toLocaleString() ||0}</td> */}
                                <td className="px-4 py-2 border">{loan.type}</td>
                                <td className={`px-4 py-2 border font-medium `}>
                                    <Badge>
                                        {loan?.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {hasMore && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
            <Pagination/>
        </div>
    );
};

export default LoanTable;
