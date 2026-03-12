// 'use client';

// import { useEffect, useState } from 'react';
// import { deleteTelecallerReport, fetchTelleCallerDailyReport } from '@/lib/actions/telecaller';
// import { Button } from '@/components/ui/button';
// import { Eye, Trash2 } from 'lucide-react';
// import toast from 'react-hot-toast';
// import ReportDialog from '@/components/common/Modals';
// import { Toaster } from 'react-hot-toast';

// const TelecallerDailyReportPage = ({ token }) => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedReport, setSelectedReport] = useState(null);

//   const loadReports = async (date = null) => {
//     setLoading(true);
//     const res = await fetchTelleCallerDailyReport(token, date);
//     if (res.success) {
//       setReports(res.reports);
//     } else {
//       console.error(res.error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadReports(); // fetch today's by default
//   }, []);

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//     loadReports(date);
//   };

//   const handleView = (report) => {
//     setSelectedReport(report);
//     setDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     const res = await deleteTelecallerReport(token, id);
//     console.log(res);
    
//     if (res.success) {
//       toast.success("Report deleted");
//       loadReports();
//     } else {
//       toast.error(res.message);
//     }
//   };

//   return (
//     <div className="p-6">
//       <Toaster/>
//       <h2 className="text-2xl font-bold mb-6">📞 Telecaller Daily Visit Report</h2>

//       {/* Filter */}
//       <div className="mb-6 flex items-center gap-4">
//         <label className="font-medium">Filter by Date:</label>
//         <input
//           type="date"
//           className="border px-3 py-2 rounded-md shadow-sm"
//           value={selectedDate}
//           onChange={handleDateChange}
//         />
//       </div>

//       {/* Table */}
//       {loading ? (
//         <div className="text-gray-500">Loading...</div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow">
//           <table className="min-w-full text-sm text-left border border-gray-200 bg-white">
//             <thead className="bg-gray-100 text-gray-700 text-sm">
//               <tr>
//                 <th className="px-4 py-3 border">📅 Date</th>
//                 <th className="px-4 py-3 border">🆔 ID</th>
//                 <th className="px-4 py-3 border">👤 Username</th>
//                 <th className="px-4 py-3 border">📞 Total Calls</th>
//                 <th className="px-4 py-3 border">👥 Customers</th>
//                 <th className="px-4 py-3 border">✅ Closed</th>
//                 <th className="px-4 py-3 border">⏳ Running</th>
//                 <th className="px-4 py-3 border">📝 Notes</th>
//                 <th className="px-4 py-3 border">⚙️ Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.length > 0 ? (
//                 reports.map((report) => (
//                   <tr key={report.id} className="hover:bg-gray-50 transition">
//                     <td className="px-4 py-2 border">{report.formSubmitDate}</td>
//                     <td className="px-4 py-2 border">{report.telecallerName || 'N/A'}</td>
//                     <td className="px-4 py-2 border">{report.username || 'N/A'}</td>
//                     <td className="px-4 py-2 border text-center">{report.totalCalls}</td>
//                     <td className="px-4 py-2 border text-center">{report.totalCustomers}</td>
//                     <td className="px-4 py-2 border text-center">{report.casesClosed}</td>
//                     <td className="px-4 py-2 border text-center">{report.casesRunning}</td>
//                     <td className="px-4 py-2 border">{report.notes || '-'}</td>
//                     <td className="px-4 py-2 border flex gap-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleView(report)}
//                       >
//                         <Eye className="w-4 h-4 mr-1" />
//                         View
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="icon"
//                         onClick={() => handleDelete(report?.id)}
//                       >
//                         <Trash2 className="w-4 h-4 mr-1" />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center py-4 text-gray-500">
//                     No reports found for selected date.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <ReportDialog
//         open={dialogOpen}
//         onOpenChange={setDialogOpen}
//         report={selectedReport}
//       />
//     </div>
//   );
// };

// export default TelecallerDailyReportPage;







'use client';

import { useEffect, useState } from 'react';
import { deleteTelecallerReport, fetchTelleCallerDailyReport } from '@/lib/actions/telecaller';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import {ReportDialog} from '@/components/common/Modals';
import { formatDate } from '@/lib/utils';
import { formatDateToString } from '@/lib/dateformate';

const TelecallerDailyReportPage = ({ token }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const loadReports = async (date = null) => {
    setLoading(true);
    const res = await fetchTelleCallerDailyReport(token, date);
    console.log(res);
    
    if (res.success) {
      setReports(res.reports);
    } else {
      console.error(res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    loadReports(date);
  };

  const handleView = (report) => {
    setSelectedReport(report);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const res = await deleteTelecallerReport(token, id);
    if (res.success) {
      toast.success('Report deleted');
      loadReports();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">📞 Telecaller Daily Summary</h2>

      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">Filter by Date:</label>
        <input
          type="date"
          className="border px-3 py-2 rounded-md shadow-sm"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left border border-gray-200 bg-white">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 border">📅 Date</th>
                {/* <th className="px-4 py-3 border">🆔 ID</th> */}
                <th className="px-4 py-3 border">👤 Username</th>
                <th className="px-4 py-3 border">🎯 Monthly Goal</th>
                <th className="px-4 py-3 border">📈 Daily Goal</th>
                <th className="px-4 py-3 border">📞 Connector Calls</th>
                <th className="px-4 py-3 border">📞 Old Connector Calls</th>
                <th className="px-4 py-3 border">📑 Document Calls</th>
                <th className="px-4 py-3 border">🆕 New Leads</th>
                <th className="px-4 py-3 border">📊 Total Leads</th>
                <th className="px-4 py-3 border">📝 Notes</th>
                <th className="px-4 py-3 border">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{formatDateToString(report?.formSubmitDate)}</td>
                    {/* <td className="px-4 py-2 border">{report.telecallerName || 'N/A'}</td> */}
                    <td className="px-4 py-2 border">{report?.username || 'N/A'}</td>
                    <td className="px-4 py-2 border text-center">{report?.monthlyGoal}</td>
                    <td className="px-4 py-2 border text-center">{report?.dailyGoal}</td>
                    <td className="px-4 py-2 border text-center">{report?.totalConnectorsCall}</td>
                    <td className="px-4 py-2 border text-center">{report?.oldConnectorCall}</td>
                    <td className="px-4 py-2 border text-center">{report?.docCollectionCall}</td>
                    <td className="px-4 py-2 border text-center">{report?.newLeadsToday}</td>
                    <td className="px-4 py-2 border text-center">{report?.totalLeads}</td>
                    <td className="px-4 py-2 border">{report?.notes || '-'}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(report?.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500">
                    No reports found for selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ReportDialog open={dialogOpen} onOpenChange={setDialogOpen} report={selectedReport} />
    </div>
  );
};

export default TelecallerDailyReportPage;
