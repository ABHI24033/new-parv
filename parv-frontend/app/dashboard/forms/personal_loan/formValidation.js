// lib/formValidation.js
import { z } from "zod";

// Helper functions (still useful for custom Zod refinements or transformations)
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

// Define the Zod schema for the entire form
export const loanApplicationSchema = z
  .object({
    // Personal Details
    loan_amount: z
      .string()
      .min(1, "Loan Amount is required.")
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Loan Amount must be a positive number."
      ),
    id_of_connector: z.string().min(1, "ID of Connector is required."),
    name_of_connector: z.string().min(1, "Name of Connector is required."),
    purpose_of_loan: z.string().min(1, "Purpose of Loan is required."),
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
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address."),
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
    aadhar: z
      .string()
      .min(1, "Aadhar Number is required."),
    dob: z
      .string()
      .min(1, "Date of Birth is required.")
      .refine(
        (val) => calculateAge(val) !== null && calculateAge(val) >= 21,
        "Applicant must be at least 21 years old."
      ),
    marital_status: z.string().min(1, "Marital Status is required."),
    spouse_name: z.string().optional(), // Now optional at this level, conditional logic in superRefine
    have_coapplicant: z.string().min(1, "Co-applicant selection is required."),
    co_applicant_name: z.string().optional(),
    co_applicant_dob: z.string().optional(),
    co_occupation: z.string().optional(),
    relation_with_applicant: z.string().optional(),

    permanent_building_name: z
      .string()
      .min(1, "Permanent Building/House Name is required."),
    permanent_street_name: z
      .string()
      .min(1, "Permanent Street/Road Name is required."),
    permanent_landmark: z.string().optional(), // Assuming landmark is optional
    permanent_city: z.string().min(1, "Permanent City is required."),
    permanent_district: z.string().min(1, "Permanent District is required."),
    permanent_state: z.string().min(1, "Permanent State is required."),
    permanent_pincode: z
      .string()
      .min(1, "Permanent Pincode is required.")
      .refine((val) => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
    same_as_permanent_address: z.boolean(),

    present_building_name: z.string().optional(), // Conditional logic in superRefine
    present_street_name: z.string().optional(), // Conditional logic in superRefine
    present_landmark: z.string().optional(), // Still optional
    present_city: z.string().optional(), // Conditional logic in superRefine
    present_district: z.string().optional(), // Conditional logic in superRefine
    present_state: z.string().optional(), // Conditional logic in superRefine
    present_pincode: z.string().optional(), // Conditional logic in superRefine

    // Employment Details
    current_company_name: z
      .string()
      .min(1, "Current Company Name is required."),
    salary_account_bank: z
      .string()
      .min(1, "Salary Account Bank Name is required."),
    savings_account_bank: z
      .string()
      .min(1, "Savings Account Bank Name is required."),
    job_tenure: z.string().min(1, "Job Tenure is required."),
    job_experience: z.string().min(1, "Job Experience is required."),
    monthly_income: z.string().min(1, "Monthly Income is required."),
    designation: z.string().optional(),
    office_building_name: z
      .string()
      .min(1, "Office Building/House Name is required."),
    office_street_name: z
      .string()
      .min(1, "Office Street/Road Name is required."),
    office_landmark: z.string().optional(), // Assuming landmark is optional
    office_city: z.string().min(1, "Office City is required."),
    office_district: z.string().min(1, "Office District is required."),
    office_state: z.string().min(1, "Office State is required."),
    office_pincode: z
      .string()
      .min(1, "Office Pincode is required.")
      .refine((val) => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
    offer_letter: z.any().optional(),
    bank_statement: z.any().optional(),
    existing_loans: z.string().optional(),
    total_loan_amount: z.string().optional(),
    loan_start_date: z.string().optional(),
    loan_provider_bank: z.string().optional(),
    monthly_emi: z.string().optional(),

    // Document Uploads
    applicant_selfie: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Applicant Selfie is required."
      ),
    aadhar_front: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Aadhar Front image is required."
      ),
    aadhar_back: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Aadhar Back image is required."
      ),
    Personal_pan: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Personal PAN image is required."
      ),
    salary_slip_1: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Salary Slip 1 is required."
      ),
    salary_slip_2: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Salary Slip 2 is required."
      ),
    salary_slip_3: z
      .any()
      .optional()
      .refine(
        (val) => !val || val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Invalid file format."
      ),
    other_doc1: z
      .any()
      .optional()
      .refine(
        (val) => !val || val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Invalid file format."
      ),
    other_doc2: z
      .any()
      .optional()
      .refine(
        (val) => !val || val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Invalid file format."
      ),
    other_doc3: z
      .any()
      .optional()
      .refine(
        (val) => !val || val instanceof File || (typeof val === "string" && val.startsWith("http")),
        "Invalid file format."
      ),
    coapplicant_aadhar_back: z.any().optional(),
    coapplicant_pan: z.any().optional(),
    bank_statement: z.any().optional(),
    references: z
      .array(
        z.object({
          name: z.string().min(1, "Full Name is required."),
          relation: z.string().min(1, "Relation is required."),
          phone: z
            .string()
            .min(1, "Phone Number is required.")
            .refine(isValidPhone, "Invalid Phone Number (10 digits required)."),
          village: z.string().min(1, "Village / Town is required."),
          street: z.string().min(1, "Street Name is required."),
          district: z.string().min(1, "District is required."),
          pincode: z
            .string()
            .min(1, "Pincode is required.")
            .refine((val) => /^\d{6}$/.test(val), "Pincode must be 6 digits."),
          profession: z.string().min(1, "Profession is required."),
        })
      )
      .min(1, "At least one reference is required.")
      .max(2, "Maximum 2 references allowed."),
  })
  .superRefine((data, ctx) => {
    // Check for duplicate phone numbers in references
    if (data.references && data.references.length > 1) {
      const phones = data.references.map((r) => r.phone).filter((p) => !!p);
      if (new Set(phones).size !== phones.size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Duplicate contact numbers across references are not allowed.",
          path: ["references"],
        });
      }
    }
    // Conditional validations using superRefine
    if (data.have_coapplicant === "Yes") {
      if (!data.co_applicant_name)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Co-applicant name is required.",
          path: ["co_applicant_name"],
        });
      if (!data.co_applicant_dob)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Co-applicant DOB is required.",
          path: ["co_applicant_dob"],
        });
      if (!data.co_occupation)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Co-applicant occupation is required.",
          path: ["co_occupation"],
        });
      if (!data.relation_with_applicant)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Relation with applicant is required.",
          path: ["relation_with_applicant"],
        });
    }
    if (data.marital_status === "Married" && !data.spouse_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse Name is required if married.",
        path: ["spouse_name"],
      });
    }

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
export const stepFields = {
  0: [], // Instructions
  1: [
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "purpose_of_loan",
    "applicant_name",
    "fathers_name",
    "mothers_name",
    "phone_no",
    "alt_phone_no",
    "email",
    "pan",
    "aadhar",
    "dob",
    "marital_status",
    "spouse_name",
    "have_coapplicant",
    "co_applicant_name",
    "co_applicant_dob",
    "co_occupation",
    "relation_with_applicant",
  ],
  2: [
    "permanent_building_name",
    "permanent_street_name",
    "permanent_landmark",
    "permanent_city",
    "permanent_district",
    "permanent_state",
    "permanent_pincode",
    "same_as_permanent_address",
    "present_building_name",
    "present_street_name",
    "present_landmark",
    "present_city",
    "present_district",
    "present_state",
    "present_pincode",
  ],
  3: [
    "current_company_name",
    "designation",
    "salary_account_bank",
    "savings_account_bank",
    "job_tenure",
    "job_experience",
    "monthly_income",
    "office_building_name",
    "office_street_name",
    "office_landmark",
    "office_city",
    "office_district",
    "office_state",
    "office_pincode",
  ],
  4: [
    "have_offer_letter",
    "offer_letter",
    "have_tan_no",
    "tan_no",
    "has_bank_statement",
    "bank_statement",
    "has_current_loan",
    "existing_loans",
    "total_loan_amount",
    "loan_start_date",
    "loan_provider_bank",
    "monthly_emi",
  ],
  5: ["references"],
  6: [
    "applicant_selfie",
    "aadhar_front",
    "aadhar_back",
    "Personal_pan",
    "coapplicant_aadhar_front",
    "coapplicant_aadhar_back",
    "coapplicant_pan",
    "salary_slip_1",
    "salary_slip_2",
    "salary_slip_3",
    "other_doc1",
    "other_doc2",
    "other_doc3",
  ],
  7: [],
};

/**
 * Validates a subset of the form data using the Zod schema.
 * @param {object} formData - The current form data state.
 * @param {string[]} fieldNames - An array of field names to validate.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateFields = (formData, fieldNames) => {
  const result = loanApplicationSchema.safeParse(formData);
  const errors = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      const pathString = err.path.join(".");
      if (
        fieldNames.includes(pathString) ||
        fieldNames.some((fn) => pathString.startsWith(`${fn}.`))
      ) {
        errors[pathString] = err.message;
      }
    });
  }
  return errors;
};

/**
 * Validates all fields in the form using the full Zod schema.
 * @param {object} formData - The current form data state.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateAllFields = (formData) => {
  const result = loanApplicationSchema.safeParse(formData);
  const errors = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      const pathString = err.path.join(".");
      errors[pathString] = err.message;
    });
  }
  return errors;
};
