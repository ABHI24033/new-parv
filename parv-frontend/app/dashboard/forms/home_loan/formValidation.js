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

// Define the Zod schema for the entire form with a flat structure for Home Loan
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
    loan_type: z.string().min(1, "Loan Type is required."), // New for Home Loan
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
      .email("Invalid email address.")
      .min(1, "Email is required."),
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
    // .refine(isValidPan, "Invalid PAN Number format."),
    dob: z
      .string()
      .min(1, "Date of Birth is required.")
      .refine(
        (val) => calculateAge(val) !== null && calculateAge(val) >= 21,
        "Applicant must be at least 21 years old."
      ),
    marital_status: z.string().min(1, "Marital Status is required."),
    spouse_name: z.string().optional(),

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

    // Profession Details (Job)
    current_company_name: z.string().optional(), // Conditional
    salary_account_bank: z.string().optional(), // Conditional
    savings_account_bank: z.string().optional(), // Conditional
    job_tenure: z.string().optional(), // Conditional
    job_experience: z.string().optional(), // Conditional
    monthly_income: z.string().optional(), // Conditional

    // Profession Details (Business)
    company_name: z.string().optional(), // Conditional (re-used name, but context is different)
    company_age: z.string().optional(), // Conditional
    registration_paper: z.array(z.string()).optional(), // Conditional (multi-select)

    // Profession Documents (Binary Questions)
    have_offer_letter: z.string().min(1, "Offer letter status is required."),
    have_tan_no: z.string().min(1, "TAN number status is required."),
    has_salary_slip: z.string().min(1, "Salary slip status is required."),
    has_bank_statement: z.string().min(1, "Bank statement status is required."),
    has_current_loan: z.string().min(1, "Current loan status is required."),

    // Current Loans (Conditional on has_current_loan)
    total_loan_amount: z.string().optional(),
    loan_start_date: z.string().optional(),
    loan_provider_bank: z.string().optional(),
    monthly_emi: z.string().optional(),

    // Property Information
    have_property_for_mortage: z
      .string()
      .min(1, "Property for mortgage status is required."),
    property_location: z.string().optional(), // Conditional
    who_own_property: z.string().optional(), // Conditional
    have_17_kahta_agri_land: z
      .string()
      .min(1, "17 khata agriculture land status is required."),
    needs_of_documents: z.array(z.string()).optional(), // Conditional (multi-select)

    // Document Uploads
    applicant_selfie: z
      .any()
      .refine((val) => val instanceof File || typeof val == "string", "Applicant Selfie is required."),
    aadhar_front: z
      .any()
      .refine((val) => val instanceof File || typeof val == "string", "Aadhar Front image is required."),
    aadhar_back: z
      .any()
      .refine((val) => val instanceof File || typeof val == "string", "Aadhar Back image is required."),
    personal_pan_upload: z
      .any()
      .refine((val) => val instanceof File || typeof val == "string", "Personal PAN image is required."),
    
    gst_certificate: z.any().optional(), // Optional, or conditional if registration_paper includes GST
    udyam_registration: z.any().optional(), // Optional, or conditional
    form_3: z.any().optional(), // Optional, or conditional
    itr_1: z.any().optional(), // Optional, or conditional
    itr_2: z.any().optional(), // Optional, or conditional
    // bank_statement: z
    //   .any()
    //   .refine((val) => val instanceof File || typeof val == "string", "Bank statement is required."),
    // shop_front: z
    //   .any()
    //   .refine((val) => val instanceof File || typeof val == "string", "Shop front picture is required."),
    // house_electricity: z
    //   .any()
    //   .refine(
    //     (val) => val instanceof File || typeof val == "string",
    //     "House electricity bill is required."
    //   ),
    // other_doc: z.any().optional(),
    // rashid: z
    //   .any()
    //   .refine((val) => val instanceof File || typeof val == "string", "Rashid document is required."), // New for Home Loan
  })
  .superRefine((data, ctx) => {
    // Conditional validations for Personal Details
    if (data.marital_status === "Married" && !data.spouse_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse Name is required if married.",
        path: ["spouse_name"],
      });
    }

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

    // Conditional validations for Profession -> Current Loans
    if (data.has_current_loan === "Yes") {
      if (!data.total_loan_amount)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total loan amount is required if you have current loan.",
          path: ["total_loan_amount"],
        });
      if (!data.loan_start_date)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Loan start date is required if you have current loan.",
          path: ["loan_start_date"],
        });
      if (!data.loan_provider_bank)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Loan provider bank is required if you have current loan.",
          path: ["loan_provider_bank"],
        });
      if (!data.monthly_emi)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly EMI is required if you have current loan.",
          path: ["monthly_emi"],
        });
    }

    // Conditional validations for Profession -> Property Information
    if (!data.property_location)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Property location is required if you have property for mortgage.",
        path: ["property_location"],
      });
    if (!data.who_own_property)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Property owner is required if you have property for mortgage.",
        path: ["who_own_property"],
      });


    // Conditional validations for Business Details (assuming if company_name is filled, others are required)
    // This is a simplification; a more robust solution might involve a binary "is_business_owner" field.
    if (data.company_name) {
      // If company name is provided, assume business details are relevant
      if (!data.company_age)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business age is required.",
          path: ["company_age"],
        });
      if (!data.registration_paper || data.registration_paper.length === 0)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one registration paper must be selected.",
          path: ["registration_paper"],
        });
    }

    // Conditional validations for Job Details (assuming if current_company_name is filled, others are required)
    // Similar to business, a binary "is_salaried" field would be more explicit.
    if (data.current_company_name) {
      // If company name is provided, assume job details are relevant
      if (!data.salary_account_bank)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Salary Account Bank Name is required.",
          path: ["salary_account_bank"],
        });
      if (!data.savings_account_bank)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Savings Account Bank Name is required.",
          path: ["savings_account_bank"],
        });
      if (!data.job_tenure)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job tenure is required.",
          path: ["job_tenure"],
        });
      if (!data.job_experience)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job experience is required.",
          path: ["job_experience"],
        });
      if (!data.monthly_income)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly income is required.",
          path: ["monthly_income"],
        });
    }

    // Documents conditional validations (e.g., if specific registration selected, then corresponding file is required)
    // This part is complex and depends on explicit rules not fully detailed in the config.
    // For now, I'll rely on the main schema's refine for File types if they are always required.
    // If 'itr_1' or 'itr_2' are conditional based on 'file_income_tax' (which is in BusinessLoan config, not HomeLoan directly),
    // then that logic would need to be added here.
    // Based on the provided HomeLoan config, itr_1 and itr_2 are just file fields under "Business Documents"
    // without an explicit binary switch like 'file_income_tax'. I will assume they are optional unless a specific
    // business registration type requires them. For simplicity, I'll keep them optional in the schema unless
    // a clear condition is provided.
  });

// Define fields for each step for step-specific validation (flat structure)
export const stepFields = {
  0: [], // Instructions
  1: [
    // Personal Details
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "purpose_of_loan",
    "loan_type",
    "applicant_name",
    "fathers_name",
    "mothers_name",
    "phone_no",
    "email",
    "alt_phone_no",
    "pan",
    "dob",
    "marital_status",
    "spouse_name",
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
    // Profession
    // Job Details
    "current_company_name",
    "salary_account_bank",
    "savings_account_bank",
    "job_tenure",
    "job_experience",
    "monthly_income",
    // Business Details
    "company_name",
    "company_age",
    "registration_paper",
    // Documents (Binary Questions)
    "have_offer_letter",
    "have_tan_no",
    "has_salary_slip",
    "has_bank_statement",
    "has_current_loan",
    // Current Loans
    "total_loan_amount",
    "loan_start_date",
    "loan_provider_bank",
    "monthly_emi",
    // Property Information
    "have_property_for_mortage",
    "property_location",
    "who_own_property",
    "have_17_kahta_agri_land",
    "needs_of_documents",
  ],
  3: [
    // Documents
    "applicant_selfie",
    "aadhar_front",
    "aadhar_back",
    "personal_pan_upload",
    "company_image",
    "gst_certificate",
    "udyam_registration",
    "form_3",
    "itr_1",
    "itr_2",
    "bank_statement",
    "shop_front",
    "house_electricity",
    "other_doc",
    "rashid",
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
    console.log(loanApplicationSchema._def.schema.shape[key]);
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
