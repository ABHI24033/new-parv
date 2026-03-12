// lib/dsaFormValidation.js
import { z } from "zod";

// Helper functions for common validations
const isValidPhone = (phone) => /^\d{10}$/.test(phone); // 10 digits
const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar); // 12 digits
const isValidPan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan); // Standard PAN format (5 letters, 4 digits, 1 letter)

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

// Define the Zod schema for the SimpleDSAForm
export const dsaFormSchema = z.object({
    // Basic Info
    full_name: z.string().min(1, "Full Name is required."),
    guardian_name: z.string().min(1, "Guardian Name is required."),
    dob: z
        .string()
        .min(1, "Date of Birth is required.")
        .refine(
            (val) => calculateAge(val) !== null && calculateAge(val) >= 18,
            "Applicant must be at least 18 years old."
        ),
    gender: z.string().min(1, "Gender is required."),
    marital_status: z.string().min(1, "Marital Status is required."),
    phone_no: z
        .string()
        .min(1, "Phone Number is required.")
        .refine(isValidPhone, "Invalid Phone Number (10 digits required)."),
    alt_phone_no: z
        .string()
        .min(1, "Alternate Phone Number is required.")
        .refine(isValidPhone, "Invalid Alternate Phone Number (10 digits required)."),
    email: z
        .string()
        .min(1, "Email is required.")
        .email("Invalid Email address."),
    aadhar_no: z
        .string()
        .min(1, "Aadhar Number is required.")
        .refine(isValidAadhar, "Invalid Aadhar Number (12 digits required)."),
    pan_no: z
        .string()
        .min(1, "PAN Number is required.")
        .refine(isValidPan, "Invalid PAN Number format."),
    present_address: z.string().min(1, "Present Address is required."),
    permanent_address: z.string().min(1, "Permanent Address is required."),

    // Job Specific (assuming these are part of the main form as per the JSX)
    // date_of_joining: z.string().min(1, "Date of Joining is required."),
    work_location: z.string().min(1, "Work Location is required."),
    bank_account_no: z.string().min(1, "Bank Account Number is required."),
    bank_branch: z.string().min(1, "Bank Branch is required."),

    // Documents (File objects)
    // These are required based on the provided config in the previous turn for 'UserCreationForm'
    // aadhar: z.any().refine(val => val instanceof File, "Aadhar document is required."),
    // pan: z.any().refine(val => val instanceof File, "PAN document is required."),
    // photo: z.any().refine(val => val instanceof File, "Photo is required."),
    // bank_doc: z.any().refine(val => val instanceof File, "Passbook photo/Cancelled Cheque is required."),
    // education_certificate: z.any().refine(val => val instanceof File, "Education Certificate is required."),
});

/**
 * Validates all fields in the DSA form using the full Zod schema.
 * @param {object} formData - The current flat form data state.
 * @returns {object} An object where keys are field names and values are error messages (or null).
 */
export const validateAllFields = (formData) => {
    const result = dsaFormSchema.safeParse(formData);
    const errors = {};
    if (!result.success) {
        result.error.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
                errors[err.path[0]] = err.message;
            }
        });
    }
    return errors;
};
