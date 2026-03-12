import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import api from "@/api/api";
// import { upload_doc } from "./actions/file";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function DateFormatter(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
export function getPublicIdFromUrl(url) {
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    // remove version (v123...) and extension (.jpg, .png, etc.)
    const withoutDomain = parts[1].replace(/^v\d+\//, ""); // removes v123/
    const publicId = withoutDomain.replace(/\.[^/.]+$/, ""); // removes .jpg/.png

    return publicId; // e.g. "documents/abc123"
  } catch (error) {
    console.error("Error extracting publicId:", error);
    return null;
  }
}

export const upload_single_file = async (id, file, folder = "general") => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);
    formData.append("field", id);

    const res = await api.post("/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res?.data?.success && res?.data?.url) {
      return { url: res.data.url, public_id: res.data.public_id };
    }

    return { error: res?.data?.message || "Upload failed" };
  } catch (error) {
    return {
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Upload failed",
    };
  }
};

export const remove_docs = async (public_id) => {
  try {
    const res = await api.post("/remove-image", { public_id });
    return res?.data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to remove document",
    };
  }
};

export const get_upload_promises = (fileFields, formData, dataToSubmit) => {
  return fileFields.map(async (field) => {
    const file = formData?.[field];
    if (!(file instanceof File)) return;

    const folderPrefix = formData?.folderName
      ? `documents/${formData.folderName}`
      : "documents";

    const result = await upload_single_file(field, file, folderPrefix);
    if (result?.url) {
      dataToSubmit[field] = result.url;
      return;
    }

    throw new Error(result?.error || `Upload failed for ${field}`);
  });
};


export const getUsername = (role, length) => {
  let result = "";
  switch (role) {
    case "Telecaller":
      result = "TC" + String(length).padStart(4, 0);
      break;
    case "RM":
      result = "RM" + String(length).padStart(4, 0);
      break;
    case "Field Staff":
      result = "FS" + String(length).padStart(4, 0);
      break;
  }

  return result;
};

export const multiValueFilter = (row, columnId, filterValue) => {
  console.log(filterValue);
  if (filterValue.includes("all")) {
    return true;
  }
  const rowValue = row.getValue(columnId);
  return filterValue.includes(rowValue);
};

// copy

// import { clsx } from "clsx";
// import { cloneDeep, forOwn, get, isObject, set, unset } from "lodash";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

export const removeProperty = (obj, propertyToRemove) => {
  forOwn(obj, (value, key) => {
    if (key === propertyToRemove) {
      unset(obj, key);
    } else if (isObject(value)) {
      removeProperty(value, propertyToRemove);
    }
  });
};

export const extractTableData = (data, type) => {
  console.log(data, type);
  let result = [];
  data.forEach((e) => {
    result.push({
      date: e.data.date,
      type: type,
      loanid: e.id,
      name: e.data.formData.name,
      connector_name: e.data.formData.name_of_connector,
      connector_id: e.data.connectorID,
      status: e.data.status,
      edit: "edit",
    });
  });
  console.log(result);
  return result;
};

export const makeBreadcrumItem = (value) => {
  let arr = value.split("_");
  arr = arr.map((e) => e.charAt(0).toUpperCase() + e.slice(1));
  return arr.join(" ");
};

export const extractParticularField = (fieldStr, data) => {
  let result = ["all"];
  console.log(data);
  data.forEach((e) => {
    let val = get(e.data, fieldStr);
    val && !result.includes(val) ? result.push(val) : null;
  });
  return result;
};

export const makeSelectableState = (obj) => {
  let keys = Object.keys(obj);
  let result = {};
  keys.forEach((key) => {
    obj[key].forEach((elem, ind) => {
      result[key]
        ? result[key].push({ isChecked: ind == 0 ? true : false, value: elem })
        : ((result[key] = []),
          result[key].push({
            isChecked: ind == 0 ? true : false,
            value: elem,
          }));
    });
  });
  console.log("result", result);
  return result;
};

export const getLoanType = (type, length) => {
  let result = {
    key: "",
    value: "",
  };
  switch (type) {
    case "Personal":
      result.key = "personal_loans";
      result.value = "PL" + String(length).padStart(5, 0);
      break;
    case "Home":
      result.key = "home_loans";
      result.value = "HL" + String(length).padStart(5, 0);
      break;
    default:
      result.key = "personal_loans";
      result.value = "PL" + String(length).padStart(5, 0);
      break;
  }

  return result;
};

export const updateErrors = (state, validationErrors, e) => {
  let newState = cloneDeep(state);
  console.log("this is the newState", { ...newState });

  // we are removing any error values present in the object
  validationErrors.forEach((err) => {
    console.log(err.path);
    let path = err.path.split(".");
    path.pop();
    path = path.join(".");
    unset(newState, `${path}.error`);
  });
  console.log("this is the state after error removal", {
    ...newState,
  });

  // we are adding the necessary error values in the object
  e.inner.forEach((err) => {
    console.log(err.path);
    let path = err.path.split(".");
    path.pop();
    path = path.join(".");
    set(newState, `${path}.error`, err.message);
  });
  console.log("this is after error addition", { ...newState });

  return newState;
};

export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function populateFieldsFromSections(sections, populatedFlatData) {
  if (!sections) {
    return; // Handle cases where a step/section might not have fields
  }

  for (const section of sections) {
    if (section.fields) {
      for (const field of section.fields) {
        // Check if the field object has a 'name' property
        if (field.name) {
          // Determine the initial/default value based on field type
          let defaultValue;
          if (field.type === "Binary") {
            defaultValue = field.value !== undefined ? field.value : ""; // Initialize Binary parents to false
          } else {
            // For other types, use the 'value' from schema if present, otherwise empty string
            defaultValue = field.value !== undefined ? field.value : "";
          }

          // Use the value from existingFlatData if it exists, otherwise use the default value
          // We check if the key exists AND is not undefined in existingFlatData
          // if (existingFlatData.hasOwnProperty(field.name) && existingFlatData[field.name] !== undefined) {
          //    populatedFlatData[field.name] = existingFlatData[field.name];
          // } else {
          populatedFlatData[field.name] = defaultValue;
          // }

          // If a Binary type field has nested fields, process them recursively
          // Note: The nested fields under a Binary type should also have names
          if (field.type === "Binary" && field.fields) {
            populateFieldsFromSections(
              [{ fields: field.fields }],
              populatedFlatData
            );
          }
        } else if (field.fields) {
          // If a field object doesn't have a 'name' but has nested 'fields'
          // (like the structure you provided for Binary types), process the nested fields.
          // This ensures any deeply nested fields are captured even if the parent isn't.
          populateFieldsFromSections(
            [{ fields: field.fields }],
            populatedFlatData
          );
        }
      }
    }
  }
}

/**
 * Generates a complete flat object containing all field names from the nested schema,
 * populated with values from an existing flat data object where available,
 * and initialized with default values otherwise.
 *
 * @param {Object} schema - The full nested form schema object (e.g., PersonalLoan).
 * @param {Object} [existingFlatData={}] - An optional existing flat object with form data.
 * @returns {Object} A new flat object representing the complete form data state.
 */
export function populateFlatDataFromSchema(schema) {
  const populatedFlatData = {};

  // Iterate through the steps (properties like 'instructions', 'personal_details', etc.)
  for (const stepKey in schema) {
    if (schema.hasOwnProperty(stepKey) && schema[stepKey].sections) {
      // Pass the sections array of the current step to the recursive helper
      populateFieldsFromSections(schema[stepKey].sections, populatedFlatData);
    }
  }

  return populatedFlatData;
}

export function populateSchemaSectionsFromFlatData(sections, flatData) {
  if (!sections) {
    return;
  }

  for (const section of sections) {
    if (section.fields) {
      for (const field of section.fields) {
        // Check if the field object has a 'name' property
        if (field.name) {
          // Check if the flatData object has a value for this field name
          // We check if the key exists AND is not undefined in flatData
          if (
            flatData.hasOwnProperty(field.name) &&
            flatData[field.name] !== undefined
          ) {
            // Populate the 'value' property in the schema copy
            field.value = flatData[field.name];
          }
          // Note: If the field.name is not in flatData, its 'value' property
          // will remain as whatever was in the original schema copy (likely "" or false)

          // If a field (like Binary type) has nested fields, process them recursively
          if (field.fields) {
            populateSchemaSectionsFromFlatData(
              [{ fields: field.fields }],
              flatData
            );
          }
        } else if (field.fields) {
          // Handle cases where a field object might not have a 'name' but has nested 'fields'
          populateSchemaSectionsFromFlatData(
            [{ fields: field.fields }],
            flatData
          );
        }
      }
    }
  }
}

/**
 * Creates a deep copy of the schema and populates the 'value' properties
 * of fields within the copied schema using data from a flat object.
 *
 * @param {Object} schema - The original nested form schema object (e.g., PersonalLoan).
 * @param {Object} flatData - The flat object containing the form data.
 * @returns {Object} A new, deep copy of the schema with field values populated.
 */
export function populateSchemaFromFlatData(schema, flatData) {
  // Create a deep copy of the schema object
  // Using JSON.parse(JSON.stringify(schema)) is a simple way for JSON-serializable objects.
  // For more complex objects (e.g., with functions, dates, undefined), a dedicated deep clone utility is better.
  const schemaCopy = JSON.parse(JSON.stringify(schema));

  // Iterate through the steps (properties like 'instructions', 'personal_details', etc.)
  for (const stepKey in schemaCopy) {
    if (schemaCopy.hasOwnProperty(stepKey) && schemaCopy[stepKey].sections) {
      // Pass the sections array of the current step in the COPY to the recursive helper
      populateSchemaSectionsFromFlatData(
        schemaCopy[stepKey].sections,
        flatData
      );
    }
  }

  return schemaCopy;
}
