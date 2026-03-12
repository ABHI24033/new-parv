
import api from "./api";

// -------------------------
// Helper: Extract error message
// -------------------------
const extractError = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};

// -------------------------
// 1️⃣ Request OTP for Forgot Password
// POST /auth/send-otp
// -------------------------
export const requestOtpForForgotPasswordAPI = async (data) => {
  try {
    const res = await api.post("/auth/send-otp", data);
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Failed to send OTP"));
  }
};

// -------------------------
// 2️⃣ Verify OTP
// POST /auth/verify-otp
// data = { email, otp }
// -------------------------
export const verifyOtpAPI = async (data) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Failed to verify OTP"));
  }
};

// -------------------------
// 3️⃣ Reset Password after OTP verification
// POST /auth/change-password
// data = { email, newPassword }
// -------------------------
export const resetPasswordAPI = async (data) => {
  try {
    const res = await api.post("/auth/change-password", data);
    return res.data;
  } catch (error) {
    throw new Error(extractError(error, "Failed to reset password"));
  }
};

// Optional — only if needed separately for logged-in users
// -------------------------
// export const changePasswordAPI = async (data) => {
//   try {
//     const res = await api.post("/auth/change-password", data);
//     return res.data;
//   } catch (error) {
//     throw new Error(extractError(error, "Failed to change password"));
//   }
// };
