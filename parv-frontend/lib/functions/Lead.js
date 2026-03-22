
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "@/api/api";
import { toast } from "react-hot-toast";

export const downloadLeadExcel = async () => {
  try {
    const response = await api.get("/leads/all");
    const allData = response.data;

    if (!allData || !allData.data || allData.data.length === 0) {
      toast.error("No lead data found.");
      return;
    }

    const flattenedData = allData?.data?.map((entry, i) => ({
      "S. No": i + 1,
      "Month/Year": entry.monthYear || "",
      "Lead Name": entry.leadName || "",
      "Mother's Name": entry.profession || "",
      "Phone": entry.contactNo || "",
      "Alt Phone": entry.whatsappNo || "",
      "Email": entry.email || "",
      "Lead Source": entry.leadSource || "",
      "Loan Product": entry.loanProduct || "",
      "Lead Status": entry.leadStatus || "",
      "Calling Date": entry.callingDate || "",
      "Followup Date": entry.followupDate || "",
      "State": entry.state || "",
      "City": entry.city || "",
      "Pincode": entry.pincode || "",
      // "Remarks": entry.remarks || "",
      "Created Date": entry.date
        ? new Date(entry.date).toLocaleString()
        : "",
      "Remarks": Array.isArray(entry.remarks) && entry.remarks.length > 0
        ? entry.remarks
          .map(
            (r, idx) =>
              `${idx + 1}. ${r.text}\n   By: ${r.createdBy}\n   At: ${new Date(
                r.createdAt
              ).toLocaleString()}`
          )
          .join("\n\n") // Separate remarks with a blank line
        : "No Remarks",
    }));

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);

    // Set column widths
    const wscols = Object.keys(flattenedData[0]).map(() => ({ wch: 20 }));
    worksheet["!cols"] = wscols;

    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true, // ✅ allows multi-line remarks to display properly
          },
        };
      }
    }


    // Apply center alignment to all data rows
    for (let R = 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!worksheet[cellAddress]) continue;
        worksheet[cellAddress].s = {
          alignment: { horizontal: "center", vertical: "center", wrapText: true },
        };
      }
    }

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lead Data");

    // Export Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, `LEAD_DATA_${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success("Excel downloaded successfully!");
  } catch (error) {
    console.error("Error downloading Excel:", error);
    toast.error("Failed to download Excel file.");
  }
};