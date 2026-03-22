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
    have_coapplicant: z.string().min(1, "Co-applicant selection is required."),
    co_applicant_name: z.string().optional(),
    co_applicant_dob: z.string().optional(),
    co_occupation: z.string().optional(),
    relation_with_applicant: z.string().optional(),

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
    company_image: z.any().optional(),
    bank_statement: z.any().optional(),
    shop_front: z.any().optional(),
    house_electricity: z.any().optional(),
    other_doc: z.any().optional(),
    rashid: z.any().optional(),
    coapplicant_aadhar_front: z.any().optional(),
    coapplicant_aadhar_back: z.any().optional(),
    coapplicant_pan: z.any().optional(),
    salary_slip_1: z.any().optional(),
    salary_slip_2: z.any().optional(),
    salary_slip_3: z.any().optional(),
    sale_deed: z.any().optional(),
    mutation: z.any().optional(),
    lpc: z.any().optional(),
    property_pic: z.any().optional(),
    property_map: z.any().optional(),
    chain_deed: z.any().optional(),
    other_doc1: z.any().optional(),
    other_doc2: z.any().optional(),
    other_doc3: z.any().optional(),
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
    if (data.have_property_for_mortage === "Yes") {
      if (!data.property_location)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Property location is required if you have property for mortgage.",
          path: ["property_location"],
        });
      if (!data.who_own_property)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Property owner is required if you have property for mortgage.",
          path: ["who_own_property"],
        });
    }

    // Conditional validations for Business Details
    if (data.company_name) {
      if (!data.company_age)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business age is required.",
          path: ["company_age"],
        });
    }


    // Conditional validations for Job Details
    if (data.current_company_name) {
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
  });

// Define fields for each step for step-specific validation (flat structure)
export const stepFields = {
  0: [], // Instructions
  1: [
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    // "purpose_of_loan",
    "loan_type",
    "applicant_name",
    "fathers_name",
    "mothers_name",
    "phone_no",
    "email",
    "alt_phone_no",
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
  3: [
    "current_company_name",
    "salary_account_bank",
    "savings_account_bank",
    "job_tenure",
    "job_experience",
    "monthly_income",
    "company_name",
    "company_age",
    "registration_paper",
    "have_offer_letter",
    "have_tan_no",
    "has_salary_slip",
    "has_bank_statement",
  ],
  4: [
    "has_current_loan",
    "total_loan_amount",
    "loan_start_date",
    "loan_provider_bank",
    "monthly_emi",
    "have_property_for_mortage",
    "property_location",
    "who_own_property",
    "have_17_kahta_agri_land",
    "needs_of_documents",
  ],
  5: ["references"],
  6: [
    "applicant_selfie",
    "aadhar_front",
    "aadhar_back",
    "personal_pan_upload",
    "coapplicant_aadhar_front",
    "coapplicant_aadhar_back",
    "coapplicant_pan",
    "salary_slip_1",
    "salary_slip_2",
    "salary_slip_3",
    "other_doc",
    "company_image",
    "gst_certificate",
    "udyam_registration",
    "form_3",
    "bank_statement",
    "house_electricity",
    "sale_deed",
    "mutation",
    "rashid",
    "lpc",
    "property_pic",
    "property_map",
    "chain_deed",
    "other_doc1",
    "other_doc2",
    "other_doc3",
  ],
  7: [],
};

/**
 * Validates a subset of the form data using the Zod schema.
 * @param {object} formData - The current flat form data state.
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
 * @param {object} formData - The current flat form data state.
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
