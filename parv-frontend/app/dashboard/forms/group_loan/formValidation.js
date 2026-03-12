import { z } from "zod";

// 🔹 File validation helper
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileSchema = z
  .any()
  .refine((file) => {
    if (!file) return true; // allow empty
    if (typeof file === "string") return true; // uploaded URL
    return file instanceof File && file.size <= MAX_FILE_SIZE;
  }, "File must be under 2MB")
  .refine((file) => {
    if (!file) return true;
    if (typeof file === "string") return true; // already uploaded
    return ACCEPTED_FILE_TYPES.includes(file.type);
  }, "Only .jpg, .png, or .pdf files are allowed");

// const MAX_FILE_SIZE = 2000000; // 2MB in bytes
// const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const fileSchemaRequired = z
  .any()
  .refine(
    (file) => {
      // Return false (fail validation) if the file is missing and it's not a pre-existing URL string.
      return file !== undefined && file !== null && file !== "";
    },
    // Customize your error message for the required field
    "A file is required."
  )
  .refine(
    (file) => {
      // 1. Allow pre-existing URL string or if it's not a new file (though the previous check should handle this)
      if (typeof file === "string") return true; 
      
      // 2. Validate size for new File uploads
      return file instanceof File && file.size <= MAX_FILE_SIZE;
    },
    "File must be under 2MB"
  )
  .refine(
    (file) => {
      // 1. Allow pre-existing URL string
      if (typeof file === "string") return true; 
      
      // 2. Validate type for new File uploads
      return ACCEPTED_FILE_TYPES.includes(file?.type);
    },
    "Only .jpg, .png, or .pdf files are allowed"
  );

// 🔹 Member schema
const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  whatsapp_number: z.string().min(10,"what's app number must be 10 digits "),
  husband_name: z.string().optional().or(z.literal("")),
  husband_phone: z.string().optional().or(z.literal("")),
  husband_profession: z.string().optional().or(z.literal("")),
  has_own_house: z.enum(["Yes", "No"]),
  have_any_current_loan: z.enum(["Yes", "No"]),
  past_loan_record: z.enum(["Yes", "No"]),
  documents: z.object({
    aadhar_front: fileSchemaRequired,
    aadhar_back: fileSchemaRequired,
    photo: fileSchemaRequired,
    voter_id: fileSchema,
    husband_photo: fileSchema,
    husband_aadhar_front: fileSchema,
    husband_aadhar_back: fileSchema,
    husband_voter_id: fileSchema,
    joint_photo:fileSchema,
  }),
});

// 🔹 Main group loan form schema
export const groupLoanSchema = z.object({
  loan_amount: z.string().min(1, "Loan amount is required"),
  id_of_connector: z.string().min(1, "Connector ID is required"),
  name_of_connector: z.string().min(1, "Connector name is required"),
  group_size: z.string().min(1, "Group size is required"),
  group_name: z.string().min(1, "Group name is required"),
  nearest_branch: z.string().min(1, "Nearest branch is required"),
  group_village: z.string().min(1, "Village is required"),
  group_post: z.string().min(1, "Post is required"),
  group_police_station: z.string().min(1, "Police station is required"),
  group_district: z.string().min(1, "District is required"),
  group_pincode: z.string().min(6, "Pincode must be at least 6 digits"),
  members: z.array(memberSchema).min(1, "At least one member is required"),
});

// 🔹 Step fields (you can adjust as per UI steps)
export const stepFields = {
  0: [], // Instructions
  1: [
    "loan_amount",
    "id_of_connector",
    "name_of_connector",
    "group_size",
    "group_name",
    "nearest_branch",
    "group_village",
    "group_post",
    "group_police_station",
    "group_district",
    "group_pincode",
  ],
  2: ["members"], // whole members array will be validated
  3: ["members.documents"], // nested docs (optional step if you split docs separately)
};


// // normalize dot/bracket paths: "members[0].documents.aadhar_front" -> "members.0.documents.aadhar_front"
// const normalizePath = (p) => p.replace(/\[(\d+)\]/g, ".$1");

// // new validateFields that supports nested keys like "members.0.documents.aadhar_front"
// export const validateFields = (formData, fieldNames) => {
//   // run full validation once (safeParse to avoid throwing)
//   const result = groupLoanSchema.safeParse(formData);
//   const errors = {};

//   if (!result.success) {
//     // build a map of zod errors keyed by normalized dot-path
//     const zodErrorsByPath = result.error.errors.reduce((acc, err) => {
//       const path = (err.path || []).map((p) => String(p)).join(".");
//       const norm = normalizePath(path);
//       // keep first message for a path
//       if (!acc[norm]) acc[norm] = err.message;
//       return acc;
//     }, {});

//     // for each requested fieldName, try to find a matching zod error
//     fieldNames.forEach((rawField) => {
//       const field = normalizePath(rawField);

//       // exact match first
//       if (zodErrorsByPath[field]) {
//         errors[rawField] = zodErrorsByPath[field];
//         return;
//       }

//       // then check for any error whose path starts with field (covers nested paths)
//       const matchKey = Object.keys(zodErrorsByPath).find((k) => k === field || k.startsWith(field + "."));
//       if (matchKey) {
//         errors[rawField] = zodErrorsByPath[matchKey];
//         return;
//       }

//       // no error found for this field -> leave it absent
//     });
//   }

//   return errors; // e.g. { "members.0.documents.aadhar_front": "File must be under 2MB" }
// };



// normalize dot/bracket paths: "members[0].documents.aadhar_front" -> "members.0.documents.aadhar_front"
const normalizePath = (p) => p.replace(/\[(\d+)\]/g, ".$1");

export const validateFields = (
  formData,
  fieldNames
) => {
  const result = groupLoanSchema.safeParse(formData);
  const errors = {};

  if (!result.success) {
    // build full error map with normalized paths
    const zodErrorsByPath = result.error.errors.reduce((acc, err) => {
      const path = (err.path || []).map((p) => String(p)).join(".");
      const norm = normalizePath(path);
      if (!acc[norm]) acc[norm] = err.message; // keep first message
      return acc;
    }, {} );

    fieldNames.forEach((rawField) => {
      const field = normalizePath(rawField);

      // collect all matching errors (not just one)
      Object.entries(zodErrorsByPath).forEach(([errPath, message]) => {
        if (errPath === field || errPath.startsWith(field + ".")) {
          errors[errPath] = message; // key by deep path (works with inputs having id=members.0.phone)
        }
      });
    });
  }

  return errors; 
};



// 🔹 Validate all fields
export const validateAllFields = (formData) => {
  const result = groupLoanSchema.safeParse(formData);
  const errors = {};
  if (!result.success) {
    result.error.errors.forEach((err) => {
      if (err.path && err.path.length > 0) {
        errors[err.path.join(".")] = err.message;
      }
    });
  }
  return errors;
};
