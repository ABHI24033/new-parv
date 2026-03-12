// lib/formValidation.js
import { z } from "zod";

// Helper functions
const isValidPhone = (phone) => /^\d{10}$/.test(phone); // 10 digits
const isValidPan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan); // Standard PAN format

// Function to calculate age from DOB
const calculateAge = (dobString) => {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Define the Zod schema for the entire form with a flat structure for Gold Loan
export const loanApplicationSchema = z
  .object({
    // Personal Details -> Prerequisits
    loan_amount: z
      .string()
      .min(1, "Loan Amount is required.")
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Loan Amount must be a positive number."
      ),
    id_of_connector: z.string().min(1, "ID of Connector is required."),
    name_of_connector: z.string().min(1, "Name of Connector is required."),

    // Personal Details -> Personal Information
    applicant_name: z
      .string()
      .min(1, "Name is required.")
      .min(2, "Name must be at least 2 characters."),
    fathers_name: z.string().min(1, "Father's Name is required."),
    mothers_name: z.string().min(1, "Mother's Name is required."),
    phone_no: z
      .string()
      .min(1, "Phone Number is required.")
      .refine(isValidPhone, "Invalid Phone Number (10 digits required)."),
    alt_phone_no: z
      .string()
      .optional()
      .refine(
        (val) => !val || isValidPhone(val),
        "Invalid Alternate Phone Number (10 digits required)."
      ),
    pan: z
      .string()
      .min(1, "PAN Number is required.")
      .refine(isValidPan, "Invalid PAN Number format."),
    dob: z
      .string()
      .min(1, "Date of Birth is required.")
      .refine(
        (val) => calculateAge(val) !== null && calculateAge(val) >= 21,
        "Applicant must be at least 21 years old."
      ),

    // Present Address
    present_building_name: z
      .string()
      .min(1, "Present Building/House Name is required."),
    present_street_name: z
      .string()
      .min(1, "Present Street/Road Name is required."),
    present_landmark: z.string().optional(),
    present_city: z.string().min(1, "Present City is required."),
    present_district: z.string().min(1, "Present District is required."),
    present_state: z.string().min(1, "Present State is required."),
    present_pincode: z
      .string()
      .min(1, "Present Pincode is required.")
      .refine((val) => /^\d{6}$/.test(val), "Pincode must be 6 digits."),

    // Permanent Address
    permanent_building_name: z
      .string()
      .min(1, "Permanent Building/House Name is required."),
    permanent_street_name: z
      .string()
      .min(1, "Permanent Street/Road Name is required."),
    permanent_landmark: z.string().optional(),
    permanent_city: z.string().min(1, "Permanent City is required."),
    permanent_district: z.string().min(1, "Permanent District is required."),
    permanent_state: z.string().min(1, "Permanent State is required."),
    permanent_pincode: z
      .string()
      .min(1, "Permanent Pincode is required.")
      .refine((val) => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
    same_as_permanent_address: z.boolean(),

    // Employment & Loans -> Saving account
    saving_account_bank_name: z
      .string()
      .min(1, "Saving account bank name is required."),
    saving_account_turnover: z
      .string()
      .min(1, "Saving account turnover is required."),
    aadhar_front: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Aadhar Front image is required."
      ),
    aadhar_back: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Aadhar Back image is required."
      ),
    personal_pan_upload: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Personal PAN image is required."
      ), // Corrected ID
    house_electricity: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Present address proof (electricity bill) is required."
      ),
  })
  .superRefine((data, ctx) => {
    // Conditional validation for Present Address based on same_as_permanent_address
    if (!data.same_as_permanent_address) {
      if (!data.present_building_name)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present Building/House Name is required.",
          path: ["present_building_name"],
        });
      if (!data.present_street_name)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present Street/Road Name is required.",
          path: ["present_street_name"],
        });
      if (!data.present_city)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present City is required.",
          path: ["present_city"],
        });
      if (!data.present_district)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present District is required.",
          path: ["present_district"],
        });
      if (!data.present_state)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present State is required.",
          path: ["present_state"],
        });
      if (!data.present_pincode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Present Pincode is required.",
          path: ["present_pincode"],
        });
      } else if (!/^\d{6}$/.test(data.present_pincode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pincode must be 6 digits.",
          path: ["present_pincode"],
        });
      }
    }
  });

// Define fields for each step for step-specific validation (flat structure) for Gold Loan
export const stepFields = {
  0: [], // Instructions
  1: [
    // Personal Details
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "applicant_name",
    "fathers_name",
    "mothers_name",
    "phone_no",
    "alt_phone_no",
    "pan",
    "dob",
    "present_building_name",
    "present_street_name",
    "present_landmark",
    "present_city",
    "present_district",
    "present_state",
    "present_pincode",
    "permanent_building_name",
    "permanent_street_name",
    "permanent_landmark",
    "permanent_city",
    "permanent_district",
    "permanent_state",
    "permanent_pincode",
    "same_as_permanent_address",
  ],
  2: [
    // Employment & Loans
    "saving_account_bank_name",
    "saving_account_turnover",
    "total_loan_amount",
    "loan_start_date",
    "loan_provider_bank",
    "monthly_emi",
  ],
  3: [
    // Documents
    "aadhar_front",
    "aadhar_back",
    "personal_pan_upload",
    "house_electricity",
  ],
};

/**
 * Validates a subset of the form data using the Zod schema.
 * @param {object} formData - The current flat form data state.
 * @param {string[]} fieldNames - An array of field names to validate.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateFields = (formData, fieldNames) => {
  const shape = fieldNames.reduce((acc, key) => {
    // Ensure the key exists in the original schema to pick it
    if (loanApplicationSchema._def.schema.shape[key]) {
      acc[key] = loanApplicationSchema._def.schema.shape[key];
    }
    return acc;
  }, {});

  const subsetSchema = z.object(shape);
  const result = subsetSchema.safeParse(formData);
  const errors = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        errors[err.path[0]] = err.message;
      }
    });
  }
  return errors;
};

/**
 * Validates all fields in the form using the full Zod schema.
 * @param {object} formData - The current flat form data state.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateAllFields = (formData) => {
  const result = loanApplicationSchema.safeParse(formData);
  const errors = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        errors[err.path[0]] = err.message;
      }
    });
  }
  return errors;
};
