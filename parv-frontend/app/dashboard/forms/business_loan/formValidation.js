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

// Define the Zod schema for the entire form with a flat structure
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
    email: z.string().min(1, "Email is required.").email("Invalid email address."),
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
      .min(12, "Addhar Number is required."),
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
    have_coapplicant: z.string().optional(),
    co_applicant_dob: z.string().optional(),
    co_applicant_name: z.string().optional(),
    co_applicant_address: z.string().optional(),
    co_applicant_phone: z.string().optional(),
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
    company_name: z.string().min(1, "Company / firm Name is required."),
    company_age: z.string().min(1, "Business age is required."),
    registration_paper: z
      .array(z.string())
      .min(1, "At least one registration paper must be selected."),
    have_current_account: z
      .string()
      .min(1, "Current account status is required."),
    current_account_bank_name: z.string().optional(), // Conditional logic in superRefine
    name_in_current_account: z.string().optional(), // Conditional logic in superRefine
    current_account_age: z.string().optional(), // Conditional logic in superRefine
    current_account_turnover: z.string().optional(), // Conditional logic in superRefine
    saving_account_bank_name: z
      .string()
      .min(1, "Saving Account Bank Name is required."),
    saving_account_turnover: z
      .string()
      .min(1, "Saving Account Turnover is required."),

    // file_income_tax: z.string().min(1, "Income tax filing status is required."),
    itr_1_upload: z.any().optional(), // Conditional logic in superRefine
    itr_2_upload: z.any().optional(), // Conditional logic in superRefine
    is_family_files_income_tax: z
      .string()
      .min(1, "Family income tax status is required."),

    property_location: z.string().optional(), // Conditional logic in superRefine
    who_own_property: z.string().optional(), // Conditional logic in superRefine
    have_17_kahta_agri_land: z
      .string()
      .min(1, "17 khata agriculture land status is required."),
    needs_of_documents: z.array(z.string()).optional(), // Conditional logic in superRefine, multi-select

    // Document Uploads
    applicant_selfie: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Photo is required."
      ),
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
      ),
    company_image: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Company / firm image is required."
      ),
    gst_certificate: z.any().optional(), // Conditional in superRefine
    udyam_registration: z.any().optional(), // Conditional in superRefine
    form_3: z.any().optional(), // Conditional in superRefine
    itr_2023_2024: z.any().optional(), // Conditional in superRefine
    itr_2024_2025: z.any().optional(), // Conditional in superRefine

    address_proof: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Address Proof is required."
      ),
    other_doc_1: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Other Document 1 is required."
      ),
    other_doc_2: z
      .any()
      .refine(
        (val) => val instanceof File || typeof val == "string",
        "Other Document 2 is required."
      ),
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
      .max(2, "Maximum 2 references allowed.")
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
    if (data.marital_status === "Married" && !data.spouse_name) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Spouse Name is required if married.",
        path: ["spouse_name"],
      });
    }

    if (data.have_coapplicant === "Yes") {
      if (!data.co_applicant_name) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Co-applicant Name is required.", path: ["co_applicant_name"] });
      }
      if (!data.co_applicant_dob) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Co-applicant DOB is required.", path: ["co_applicant_dob"] });
      }
      if (!data.co_occupation) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Occupation is required.", path: ["co_occupation"] });
      }
      if (!data.relation_with_applicant) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Relation is required.", path: ["relation_with_applicant"] });
      }
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

    // Employment section conditional validations
    // if (data.have_current_account === "Yes") {
    //   if (!data.current_account_bank_name)
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Current Account Bank Name is required.",
    //       path: ["current_account_bank_name"],
    //     });
    //   if (!data.name_in_current_account)
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Current Account Holder Name is required.",
    //       path: ["name_in_current_account"],
    //     });
    //   if (!data.current_account_age)
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Current Account Age is required.",
    //       path: ["current_account_age"],
    //     });
    //   if (!data.current_account_turnover)
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Current Account Turnover is required.",
    //       path: ["current_account_turnover"],
    //     });
    // }
    // The provided formData structure for Employment includes:
    // loan_provider_bank, total_loan_amount, current_emi, remaining_amount.
    // These are under "Previous Loan History". Assuming they are optional
    // unless a specific condition makes them required (e.g., if a 'has_previous_loan' field was 'Yes').
    // As there's no such explicit binary in the provided flat structure,
    // they remain optional at the schema level. If you add a field like
    // `has_previous_loan: z.boolean(),` and set it to true, then you'd add:
    // if (data.has_previous_loan) { ... add validation for these fields ... }
  });

// Define fields for each step for step-specific validation (flat structure)
export const stepFields = {
  0: [], // Instructions step has no input fields to validate for submission
  1: [
    // Personal Details
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "purpose_of_loan",
    "applicant_name",
    "fathers_name",
    "mothers_name",
    "phone_no",
    "alt_phone_no",
    "pan",
    "aadhar",
    "dob",
    "marital_status",
    "spouse_name",
    "have_coapplicant",
    "co_applicant_dob",
    "co_applicant_name",
    "co_occupation",
    "relation_with_applicant",
    "email",
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
  2: [
    // Employment & Loans
    "company_name",
    "company_age",
    "registration_paper",
    "have_current_account",
    "current_account_bank_name",
    "name_in_current_account",
    "current_account_age",
    "current_account_turnover",
    "saving_account_bank_name",
    "saving_account_turnover",
    "loan_provider_bank",
    "total_loan_amount",
    "current_emi",
    "remaining_amount",
    "file_income_tax",
    "itr_1_upload",
    "itr_2_upload",
    "is_family_files_income_tax",
    "have_property_for_mortgage",
    "property_location",
    "who_own_property",
    "have_17_kahta_agri_land",
    "needs_of_documents",
  ],
  3: [
    // References
    "references",
  ],
  4: [
    // Documents
    "applicant_selfie",
    "aadhar_front",
    "aadhar_back",
    "personal_pan_upload",
    "company_image",
    "gst_certificate",
    "udyam_registration",
    "form_3",
    "itr_2023_2024",
    "itr_2024_2025",
    "bank_statement",
    "shop_front",
    "address_proof",
    "other_doc_1",
    "other_doc_2",
  ],
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
      // Check if the error path matches one of our requested field names
      // or if it's a sub-path of a requested field (e.g. references.0.name for references)
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
      if (err.path && err.path.length > 0) {
        errors[err.path[0]] = err.message;
      }
    });
  }
  return errors;
};
