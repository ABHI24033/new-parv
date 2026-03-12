import api from "./api";

export const createDSAAccountAPI = async (data) => {
  try {
    const res = await api.post("/users/create-dsa", data);
    return res.data;
  } catch (error) {
    // Optional: Debug in console
    console.error("DSA Create Error:", error?.response?.data || error.message);

    // Throw error so React Query can catch it
    throw new Error(
      error?.response?.data?.message || "Failed to create DSA account"
    );
  }
};
