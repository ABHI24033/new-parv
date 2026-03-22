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

// Define the Zod schema for the entire form with a flat structure for Vehicle Loan
export const loanApplicationSchema = z
  .object({
    // Vehicle Details
    which_vehicle: z.string().min(1, "Vehicle loan type is required."),
    when_purchase: z.string().min(1, "Purchase timeframe is required."),
    estimated_cost: z.string().min(1, "Estimated cost of vehicle is required."),
    loan_you_need: z.string().min(1, "Loan amount needed is required."),
    profession: z.string().min(1, "Profession type is required."),

    // Personal Details -> Prerequisits (from VehicleLoan config)
    loan_amount: z
      .string()
      .min(1, "Loan Amount is required.")
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Loan Amount must be a positive number."
      ),
    id_of_connector: z.string().min(1, "ID of Connector is required."),
    name_of_connector: z.string().min(1, "Name of Connector is required."),

    // Personal Details -> Personal Information (from VehicleLoan config)
    applicant_name: z
      .string()
      .min(1, "Name is required.")
      .min(2, "Name must be at least 2 characters."),
    fathers_name: z.string().min(1, "Father's Name is required."),
    mothers_name: z.string().min(1, "Mother's Name is required."),
    phone_no: z
      .string()
      .min(1, "Phone Number is required.")
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    email: z.string().email("Invalid email address").optional(),
    alt_phone_no: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\d{10}$/.test(val),
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
    spouse_name: z.string().optional(), // Conditional logic in superRefine

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

    // Present Address (conditional on same_as_permanent_address)
    present_building_name: z.string().optional(),
    present_street_name: z.string().optional(),
    present_landmark: z.string().optional(),
    present_city: z.string().optional(),
    present_district: z.string().optional(),
    present_state: z.string().optional(),
    present_pincode: z.string().optional(),

    // Employment & Loans -> Income Details (Business)
    company_name: z.string()?.optional(),
    // .min(1, "Company name is required."), // Conditional
    company_age: z.string()?.optional(),
    // .min(1, "Company age is required."), // Conditional
    registration_paper: z.array(z.string()).optional(),

    // Employment & Loans -> Income Details (Job)
    current_company_name: z.string().optional(), // Conditional
    salary_account_bank: z.string().optional(), // Conditional
    savings_account_bank: z.string().optional(), // Conditional
    job_tenure: z.string().optional(), // Conditional
    job_experience: z.string().optional(), // Conditional
    monthly_income: z.string().optional(), // Conditional
    // have_current_account: z
    //   .string()
    //   .min(1, "Current account status is required."),
    current_account_bank_name: z.string().optional(),
    name_in_current_account: z.string().optional(),
    current_account_age: z.string().optional(),
    current_account_turnover: z.string().optional(),

    // Employment & Loans -> Saving account
    saving_account_bank_name: z
      .string()
      .min(1, "Saving account bank name is required."),
    saving_account_turnover: z
      .string()
      .min(1, "Saving account turnover is required."),

    have_property_for_mortage: z
      .string()
      .min(1, "Property for mortgage status is required."),
    property_location: z.string().optional(), // Conditional
    who_own_property: z.string().optional(), // Conditional
    have_17_kahta_agri_land: z
      .string()
      .min(1, "17 khata agriculture land status is required."),
    needs_of_documents: z.array(z.string()).optional(),

    have_current_account: z
      .string()
      .min(1, "Current account status is required."),
    have_coapplicant: z.string().optional(),

    applicant_selfie: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.length > 0),
        "Applicant selfie is required."
      ),
    aadhar_front: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.length > 0),
        "Aadhar front is required."
      ),
    aadhar_back: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.length > 0),
        "Aadhar back is required."
      ),
    personal_pan: z
      .any()
      .refine(
        (val) => val instanceof File || (typeof val === "string" && val.length > 0),
        "PAN is required."
      ),
    address_prooof: z.any().optional(),
    coapplicant_aadhar_front: z.any().optional(),
    coapplicant_aadhar_back: z.any().optional(),
    coapplicant_pan: z.any().optional(),
    salary_slip_1: z.any().optional(),
    salary_slip_2: z.any().optional(),
    salary_slip_3: z.any().optional(),
    form_16_itr_1: z.any().optional(),
    form_16_itr_2: z.any().optional(),
    electricity_bill: z.any().optional(),
    business_images: z.any().optional(),
    business_proof: z.any().optional(),
    itr_1: z.any().optional(),
    itr_2: z.any().optional(),
    another_1: z.any().optional(),
    another_2: z.any().optional(),
    another_3: z.any().optional(),
    sale_deed: z.any().optional(),
    mutation: z.any().optional(),
    rashid: z.any().optional(),
    lpc: z.any().optional(),
    property_pic: z.any().optional(),
    property_map: z.any().optional(),
    chain_deed: z.any().optional(),
    guarantor_aadhar_front: z.any().optional(),
    guarantor_aadhar_back: z.any().optional(),
    guarantor_pan: z.any().optional(),
    vehicle_quotation: z.any().optional(),
    owner_book: z.any().optional(),
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

    // Conditional validations for Employment & Loans -> Income Details
    if (data.profession === "Business") {
      if (!data.company_name)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company / firm Name is required for Business profession.",
          path: ["company_name"],
        });
      if (!data.company_age)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business age is required for Business profession.",
          path: ["company_age"],
        });
    } else if (data.profession === "Job") {
      if (!data.current_company_name)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Current Company Name is required for Job profession.",
          path: ["current_company_name"],
        });
      if (!data.salary_account_bank)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Salary Account Bank Name is required for Job profession.",
          path: ["salary_account_bank"],
        });
      if (!data.savings_account_bank)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Savings Account Bank Name is required for Job profession.",
          path: ["savings_account_bank"],
        });
      if (!data.job_tenure)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job tenure is required for Job profession.",
          path: ["job_tenure"],
        });
      if (!data.job_experience)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Job experience is required for Job profession.",
          path: ["job_experience"],
        });
      if (!data.monthly_income)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly income is required for Job profession.",
          path: ["monthly_income"],
        });
    }
  });

export const stepFields = {
  0: [], // Instructions
  1: [
    "which_vehicle",
    "when_purchase",
    "estimated_cost",
    "loan_you_need",
    "profession",
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
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
    "company_name",
    "company_age",
    "registration_paper",
    "current_company_name",
    "salary_account_bank",
    "savings_account_bank",
    "job_tenure",
    "job_experience",
    "monthly_income",
  ],
  4: [
    "have_current_account",
    "current_account_bank_name",
    "name_in_current_account",
    "current_account_age",
    "current_account_turnover",
    "saving_account_bank_name",
    "saving_account_turnover",
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
    "personal_pan",
    "address_prooof",
    "coapplicant_aadhar_front",
    "coapplicant_aadhar_back",
    "coapplicant_pan",
    "salary_slip_1",
    "salary_slip_2",
    "salary_slip_3",
    "form_16_itr_1",
    "form_16_itr_2",
    "electricity_bill",
    "business_images",
    "business_proof",
    "itr_1",
    "itr_2",
    "another_1",
    "another_2",
    "another_3",
    "sale_deed",
    "mutation",
    "rashid",
    "lpc",
    "property_pic",
    "property_map",
    "chain_deed",
    "guarantor_aadhar_front",
    "guarantor_aadhar_back",
    "guarantor_pan",
    "vehicle_quotation",
    "owner_book",
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
