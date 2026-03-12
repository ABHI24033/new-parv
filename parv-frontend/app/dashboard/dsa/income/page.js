// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getConnectorIncomes } from '@/lib/actions/loan';
// import { useUserState } from '../../store';

// export default function Page() {
//   const userState = useUserState();
//   const [incomes, setIncomes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIncomes = async () => {
//       try {
//         const token = await userState.user?.getIdToken();
//         if (!token) {
//           console.error("Token not available");
//           return;
//         }

//         console.log(token);
        

//         const res = await getConnectorIncomes(token, userState?.profile?.username);
//         console.log("Fetched incomes:", res);
//         if (res?.data) {
//           setIncomes(res.data);
//         }
//       } catch (error) {
//         console.error("Error fetching incomes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userState?.user && userState?.profile?.username) {
//       fetchIncomes();
//     }
//   }, [userState?.user, userState?.profile?.username]);

//   return (
//     // <div className="p-6">
//     //   <h1 className="text-2xl font-semibold mb-4">DSA Incomes Details</h1>

//     //   {loading ? (
//     //     <p>Loading...</p>
//     //   ) : incomes.length === 0 ? (
//     //     <p>No income records found.</p>
//     //   ) : (
//     //     <ul className="space-y-2">
//     //       {incomes.map((income, idx) => (
//     //         <li
//     //           key={idx}
//     //           className="border p-4 rounded shadow-sm bg-white text-sm text-gray-800"
//     //         >
//     //           <strong>ID:</strong> {income.id} <br />
//     //           <strong>Income:</strong> ₹{income.income} <br />
//     //           <strong>Paid:</strong> ₹{income.paid} <br />
//     //           <strong>Unpaid:</strong> ₹{income.unpaid} <br />
//     //           <strong>Date:</strong> {new Date(income.timestamp).toLocaleString()}
//     //         </li>
//     //       ))}
//     //     </ul>
//     //   )}
//     // </div>



//      <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Connector Incomes</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : incomes.length === 0 ? (
//         <p>No income records found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 shadow-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 border">#</th>
//                 <th className="px-4 py-2 border">Income (₹)</th>
//                 <th className="px-4 py-2 border">Paid (₹)</th>
//                 <th className="px-4 py-2 border">Unpaid (₹)</th>
//                 <th className="px-4 py-2 border">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {incomes.map((income, idx) => (
//                 <tr key={income.id} className="text-center">
//                   <td className="px-4 py-2 border">{idx + 1}</td>
//                   <td className="px-4 py-2 border">₹{income.income}</td>
//                   <td className="px-4 py-2 border">₹{income.paid}</td>
//                   <td className="px-4 py-2 border">₹{income.unpaid}</td>
//                   <td className="px-4 py-2 border">
//                     {new Date(income.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-50 font-semibold">
//               <tr>
//                 <td className="px-4 py-2 border text-right" colSpan={1}>
//                   Total:
//                 </td>
//                 <td className="px-4 py-2 border">₹{totals.income}</td>
//                 <td className="px-4 py-2 border">₹{totals.paid}</td>
//                 <td className="px-4 py-2 border">₹{totals.unpaid}</td>
//                 <td className="px-4 py-2 border"></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       )}
//     </div>

//   );
// }



















'use client';

import React, { useEffect, useState } from 'react';
import { getConnectorIncomes } from '@/lib/actions/loan';
import { useUserState } from '../../store';
import Spinners from '@/components/common/Spinners';

export default function ConnectorIncomePage() {
  const userState = useUserState();
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totals, setTotals] = useState({ income: 0, paid: 0, unpaid: 0 });

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const token = await userState.user?.getIdToken();
        const username = userState?.profile?.username;
        if (!token || !username) return;

        const res = await getConnectorIncomes(token, username);

        if (res?.data) {
          const cleaned = res.data.map((item) => ({
            ...item,
            income: Number(item.income || 0),
            paid: Number(item.paid || 0),
            unpaid: Number(item.unpaid || 0),
          }));

          // Calculate totals
          const incomeTotal = cleaned.reduce((acc, item) => acc + item.income, 0);
          const paidTotal = cleaned.reduce((acc, item) => acc + item.paid, 0);
          const unpaidTotal = cleaned.reduce((acc, item) => acc + item.unpaid, 0);

          setTotals({ income: incomeTotal, paid: paidTotal, unpaid: unpaidTotal });
          setIncomes(cleaned);
        }
      } catch (error) {
        console.error('Error fetching incomes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userState?.user && userState?.profile?.username) {
      fetchIncomes();
    }
  }, [userState?.user, userState?.profile?.username]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">DSA Incomes Details</h1>

      {loading ? (
        <div>
            <Spinners/>
        </div>
      ) : incomes.length === 0 ? (
        <p>No income records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Loan Id</th>
                <th className="px-4 py-2 border">Income (₹)</th>
                <th className="px-4 py-2 border">Paid (₹)</th>
                <th className="px-4 py-2 border">Unpaid (₹)</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income, idx) => (
                <tr key={income.id} className="text-center">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{income?.loanId || '-'}</td>
                  <td className="px-4 py-2 border">₹{income?.income}</td>
                  <td className="px-4 py-2 border">₹{income?.paid}</td>
                  <td className="px-4 py-2 border">₹{income?.unpaid}</td>
                  <td className="px-4 py-2 border">
                    {new Date(income.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-2 border text-right" colSpan={1}>
                  Total:
                </td>
                <td className="px-4 py-2 border">₹{totals.income}</td>
                <td className="px-4 py-2 border">₹{totals.paid}</td>
                <td className="px-4 py-2 border">₹{totals.unpaid}</td>
                <td className="px-4 py-2 border"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

