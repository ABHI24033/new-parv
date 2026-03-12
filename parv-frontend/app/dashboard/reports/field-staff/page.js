'use client';


import { useEffect, useState } from 'react';
import { getDailyVisitReports } from '@/lib/actions/field-staff';

const fieldstaffVisitReportPage = ({ token }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReports = async (date = null) => {
    setLoading(true);
    const res = await getDailyVisitReports(token, date);
    console.log(res);
    
    if (res.success) {
      setReports(res.reports);
    } else {
      console.error(res.error);
    }
    setLoading(false);
  };
  console.log(reports);
  

  useEffect(() => {
    loadReports(); // fetch today's by default
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    loadReports(date);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Telecaller Daily Visit Report</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Date:</label>
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Id</th>
                <th className="px-4 py-2 border">Employee</th>
                <th className="px-4 py-2 border">Company name</th>
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Contact Person</th>
                <th className="px-4 py-2 border">Product Type</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">What's app</th>
                <th className="px-4 py-2 border">Next meeting</th>
                <th className="px-4 py-2 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {report.formSubmitDate }
                    </td>
                    <td className="px-4 py-2 border">{report.username || 'N/A'}</td>
                    <td className="px-4 py-2 border">{report.employeeName}</td>
                    <td className="px-4 py-2 border">{report.firmName}</td>
                    <td className="px-4 py-2 border">{report.clientName}</td>
                    <td className="px-4 py-2 border">{report.contactPersonName}</td>
                    <td className="px-4 py-2 border">{report.productDiscussed}</td>
                    <td className="px-4 py-2 border">{report.address}</td>
                    <td className="px-4 py-2 border">{report.contactNumber}</td>
                    <td className="px-4 py-2 border">{report.whatsappNumber}</td>
                    <td className="px-4 py-2 border">{report.nextMeetingDate}</td>
                    <td className="px-4 py-2 border">{report.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No reports found for selected date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default fieldstaffVisitReportPage;
