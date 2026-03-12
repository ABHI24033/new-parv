
// // import * as XLSX from "xlsx";
// // import { saveAs } from "file-saver";
// // import { getAllLeads } from "../actions/leadgeneration";

// // export const downloadLeadExcel = async () => {
// //   // const token = await useUserState.user.getIdToken();
// //   const allData = await getAllLeads();

// //   if (!allData || allData.length === 0) {
// //     toast.error("No loan data found.");
// //     return;
// //   }

// //   const flattenedData = allData?.data?.map((entry, i) => ({
// //     "S. No": i + 1,
// //     //   "date": entry?.date || "",
// //     "monthYear": entry.monthYear || "",
// //     "leadName": entry.leadName || "",
// //     "Mother's Name": entry.profession || "",
// //     "Phone": entry.contactNo || "",
// //     "Alt Phone": entry.whatsappNo || "",
// //     "Email": entry.email || "",
// //     "Lead Source": entry.leadSource || "",
// //     "Loan Product": entry.loanProduct || "",
// //     "Lead Status": entry.leadStatus || "",
// //     "Calling Date": entry.callingDate || "",
// //     "Followup Date": entry.followupDate || "",
// //     "State": entry.state || "",
// //     "City": entry.city || "",
// //     "Pincode": entry.pincode || "",
// //     "Remarks": entry.remarks,
// //     "Created Date": entry.date
// //       ? new Date(entry.date).toLocaleString()
// //       : "",
// //   }));

// //   const worksheet = XLSX.utils.json_to_sheet(flattenedData);
// //   const wscols = Object.keys(flattenedData[0]).map(() => ({ wch: 25 }));
// //   worksheet["!cols"] = wscols;

// //   const range = XLSX.utils.decode_range(worksheet["!ref"]);
// //   for (let C = range.s.c; C <= range.e.c; ++C) {
// //     const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
// //     if (!worksheet[cellAddress]) continue;
// //     worksheet[cellAddress].s = {
// //       font: { bold: true },
// //       alignment: { horizontal: "center" },
// //     };
// //   }

// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, "All Loan Data");

// //   const excelBuffer = XLSX.write(workbook, {
// //     bookType: "xlsx",
// //     type: "array",
// //   });

// //   const blob = new Blob([excelBuffer], {
// //     type:
// //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
// //   });

// //   saveAs(blob, `LEAD_DATA_${new Date().toISOString().slice(0, 10)}.xlsx`);
// // };




import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAllLeads } from "../actions/leadgeneration";
import { toast } from "react-hot-toast";

export const downloadLeadExcel = async () => {
  try {
    const allData = await getAllLeads();

    if (!allData || allData.length === 0) {
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

    // Apply styling to header row
    // const range = XLSX.utils.decode_range(worksheet["!ref"]);
    // for (let C = range.s.c; C <= range.e.c; ++C) {
    //   const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
    //   if (!worksheet[cellAddress]) continue;
    //   worksheet[cellAddress].s = {
    //     font: { bold: true, color: { rgb: "FFFFFF" } },
    //     fill: { fgColor: { rgb: "4472C4" } }, // Blue header background
    //     alignment: { horizontal: "center", vertical: "center" },
    //   };
    // }

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

















// import XLSX from "xlsx-js-style";
// import { saveAs } from "file-saver";
// import { getAllLeads } from "../actions/leadgeneration";
// import { toast } from "react-hot-toast";

// export const downloadLeadExcel = async () => {
//   try {
//     const allData = await getAllLeads();

//     if (!allData || !allData.data || allData.data.length === 0) {
//       toast.error("No lead data found.");
//       return;
//     }

//     // ✅ Format remarks neatly into multi-line string
//     const flattenedData = allData.data.map((entry, i) => ({
//       "S. No": i + 1,
//       "Month/Year": entry.monthYear || "",
//       "Lead Name": entry.leadName || "",
//       "Mother's Name": entry.profession || "",
//       "Phone": entry.contactNo || "",
//       "Alt Phone": entry.whatsappNo || "",
//       "Email": entry.email || "",
//       "Lead Source": entry.leadSource || "",
//       "Loan Product": entry.loanProduct || "",
//       "Lead Status": entry.leadStatus || "",
//       "Calling Date": entry.callingDate || "",
//       "Followup Date": entry.followupDate || "",
//       "State": entry.state || "",
//       "City": entry.city || "",
//       "Pincode": entry.pincode || "",
//       "Remarks":
//         Array.isArray(entry.remarks) && entry.remarks.length > 0
//           ? entry.remarks
//               .map(
//                 (r, idx) =>
//                   `${idx + 1}. ${r.text}\n   By: ${r.createdBy}\n   At: ${new Date(
//                     r.createdAt
//                   ).toLocaleString()}`
//               )
//               .join("\n\n")
//           : "No Remarks",
//       "Created Date": entry.date
//         ? new Date(entry.date).toLocaleString()
//         : "",
//     }));

//     // ✅ Create worksheet
//     const worksheet = XLSX.utils.json_to_sheet(flattenedData);

//     // ✅ Get range of cells
//     const range = XLSX.utils.decode_range(worksheet["!ref"]);

//     // ✅ Header styling (bold, blue background, white text)
//     const headerStyle = {
//       font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
//       fill: { fgColor: { rgb: "4472C4" } },
//       alignment: { horizontal: "center", vertical: "center", wrapText: true },
//       border: {
//         top: { style: "thin", color: { rgb: "AAAAAA" } },
//         bottom: { style: "thin", color: { rgb: "AAAAAA" } },
//         left: { style: "thin", color: { rgb: "AAAAAA" } },
//         right: { style: "thin", color: { rgb: "AAAAAA" } },
//       },
//     };

//     // ✅ Default cell style for data rows
//     const cellStyle = {
//       alignment: { horizontal: "center", vertical: "center", wrapText: true },
//       border: {
//         top: { style: "thin", color: { rgb: "DDDDDD" } },
//         bottom: { style: "thin", color: { rgb: "DDDDDD" } },
//         left: { style: "thin", color: { rgb: "DDDDDD" } },
//         right: { style: "thin", color: { rgb: "DDDDDD" } },
//       },
//     };

//     // ✅ Apply header style
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
//       if (!worksheet[cellAddress]) continue;
//       worksheet[cellAddress].s = headerStyle;
//     }

//     // ✅ Apply data style for all cells
//     for (let R = 1; R <= range.e.r; ++R) {
//       for (let C = range.s.c; C <= range.e.c; ++C) {
//         const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
//         if (!worksheet[cellAddress]) continue;
//         worksheet[cellAddress].s = cellStyle;
//       }
//     }

//     // ✅ Auto column width
//     const wscols = Object.keys(flattenedData[0]).map(() => ({ wch: 25 }));
//     worksheet["!cols"] = wscols;

//     // ✅ Create workbook
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Lead Data");

//     // ✅ Write workbook to buffer
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     // ✅ Save Excel file
//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//     });

//     saveAs(blob, `LEAD_DATA_${new Date().toISOString().slice(0, 10)}.xlsx`);

//     toast.success("Excel downloaded successfully!");
//   } catch (error) {
//     console.error("Excel generation error:", error);
//     toast.error("Failed to download Excel file.");
//   }
// };
