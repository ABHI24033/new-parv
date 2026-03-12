import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers starting 6-9, 10 digits
const pincodeRegex = /^\d{6}$/;    // 6-digit pincode
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format (basic validation)

export const formSchema = z.object({
  date: z
    .string()
    .nonempty("Date is required")
    .regex(dateRegex, "Invalid date format (YYYY-MM-DD)"),
    
  monthYear: z
    .string()
    .nonempty("Month and Year is required")
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Invalid format (YYYY-MM)"),

  leadName: z
    .string()
    .nonempty("Lead Name is required")
    .min(3, "Lead Name must be at least 3 characters"),

  profession: z.string().nonempty("Profession is required"),

  contactNo: z
    .string()
    .nonempty("Contact No is required")
    .regex(phoneRegex, "Contact No must be a valid 10-digit number"),

  whatsappNo: z
    .string()
    .nonempty("WhatsApp No is required")
    .regex(phoneRegex, "WhatsApp No must be a valid 10-digit number"),

  email: z.string().email("Invalid email"),

  leadSource: z.string().nonempty("Lead Source is required"),

  loanProduct: z.string().nonempty("Loan Product is required"),

  leadStatus: z.string().nonempty("Lead Status is required"),

  callingDate: z
    .string()
    .nonempty("Calling Date is required")
    .regex(dateRegex, "Invalid date format (YYYY-MM-DD)"),

  followupDate: z
    .string()
    .nonempty("Next Follow-up Date is required")
    .regex(dateRegex, "Invalid date format (YYYY-MM-DD)"),

  state: z.string().nonempty("State is required"),

  city: z.string().nonempty("Town/City is required"),

  pincode: z
    .string()
    .nonempty("Pincode is required")
    .regex(pincodeRegex, "Pincode must be exactly 6 digits"),

  remarks: z
    .string()
    .max(500, "Remarks cannot exceed 500 characters")
    .optional(),
});
