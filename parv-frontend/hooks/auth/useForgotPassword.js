// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";

// import {
//     requestOtpForForgotPasswordAPI,
//     verifyOtpAPI,
//     resetPasswordAPI,
// } from "@/api/auth";

// export function useForgotPassword() {
//     const [step, setStep] = useState(1); 
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [otp, setOTP] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [tryCount, setTryCount] = useState(0);

//     // -----------------------------------------
//     // 1️⃣ SEND OTP
//     // -----------------------------------------
//     const sendOTPMutation = useMutation({
//         mutationFn: (email) => requestOtpForForgotPasswordAPI(email),
//         onSuccess: () => {
//             setError("");
//             setStep(2); // move to OTP screen
//         },
//         onError: (err) => {
//             setError(err.message || "Failed to send OTP");
//         },
//     });

//     const handleSendOTP = () => {
//         if (!username.trim()) {
//             setError("Email is required");
//             return;
//         }
//         sendOTPMutation.mutate(username);
//     };

//     // -----------------------------------------
//     // 2️⃣ VERIFY OTP
//     // -----------------------------------------
//     const verifyOTPMutation = useMutation({
//         mutationFn: (payload) => verifyOtpAPI(payload),
//         onSuccess: () => {
//             setError("");
//             setTryCount(0); // reset attempts
//             setStep(3); // move to password reset screen
//         },
//         onError: (err) => {
//             const newTryCount = tryCount + 1;
//             setTryCount(newTryCount);

//             if (newTryCount >= 3) {
//                 setError("Too many incorrect attempts. Please try again later.");
//                 setStep(5); // lock screen
//             } else {
//                 setError(err.message || "Incorrect OTP, try again");
//             }
//         },
//     });

//     const handleVerifyOTP = () => {
//         verifyOTPMutation.mutate({
//             email: username,
//             otp,
//         });
//     };

//     // -----------------------------------------
//     // 3️⃣ RESET PASSWORD
//     // -----------------------------------------
//     const resetPasswordMutation = useMutation({
//         mutationFn: (payload) => resetPasswordAPI(payload),
//         onSuccess: () => {
//             setError("");
//             setStep(4); // success page
//         },
//         onError: (err) => {
//             setError(err.message || "Failed to reset password");
//             setStep(5); // optional error/lock screen
//         },
//     });

//     const handleChangePassword = () => {
//         if (!password.trim()) {
//             setError("Password cannot be empty");
//             return;
//         }

//         resetPasswordMutation.mutate({
//             username,
//             password,
//             otp,
//         });
//     };

//     return {
//         // states
//         step,
//         setStep,
//         username,
//         setUsername,
//         email,
//         setEmail,
//         otp,
//         setOTP,
//         password,
//         setPassword,
//         error,
//         setError,

//         // handlers
//         handleSendOTP,
//         handleVerifyOTP,
//         handleChangePassword,

//         // loading states
//         loadingSendOTP: sendOTPMutation.isPending,
//         loadingVerifyOTP: verifyOTPMutation.isPending,
//         loadingChangePassword: resetPasswordMutation.isPending,

//         // success flags
//         isOTPSent: sendOTPMutation.isSuccess,
//         isOTPVerified: verifyOTPMutation.isSuccess,
//         isPasswordChanged: resetPasswordMutation.isSuccess,
//     };
// }























import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  requestOtpForForgotPasswordAPI,
  verifyOtpAPI,
  resetPasswordAPI,
} from "@/api/auth";

export function useForgotPassword() {
  const [step, setStep] = useState(1); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(0);

  // -----------------------------------------
  // 1️⃣ SEND OTP
  // -----------------------------------------
  const sendOTPMutation = useMutation({
    mutationFn: (payload) => requestOtpForForgotPasswordAPI(payload),
    onSuccess: () => {
      setError("");
      setStep(2);
    },
    onError: (err) => {
      setError(err.message || "Failed to send OTP");
    },
  });

  const handleSendOTP = () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    sendOTPMutation.mutate({ username, email });
  };

  // -----------------------------------------
  // 2️⃣ VERIFY OTP
  // -----------------------------------------
  const verifyOTPMutation = useMutation({
    mutationFn: (payload) => verifyOtpAPI(payload),
    onSuccess: () => {
      setError("");
      setTryCount(0);
      setStep(3);
    },
    onError: (err) => {
      const newTryCount = tryCount + 1;
      setTryCount(newTryCount);

      if (newTryCount >= 3) {
        setError("Too many incorrect attempts. Try again later.");
        setStep(5);
      } else {
        setError(err.message || "Incorrect OTP, please try again");
      }
    },
  });

  const handleVerifyOTP = () => {
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    verifyOTPMutation.mutate({
      username,
      email,
      otp,
    });
  };

  // -----------------------------------------
  // 3️⃣ CHANGE PASSWORD
  // -----------------------------------------
  const resetPasswordMutation = useMutation({
    mutationFn: (payload) => resetPasswordAPI(payload),
    onSuccess: () => {
      setError("");
      setStep(4); // success screen
    },
    onError: (err) => {
      setError(err.message || "Failed to reset password");
    },
  });

  const handleChangePassword = () => {
    if (!password.trim()) {
      setError("Password cannot be empty");
      return;
    }

    resetPasswordMutation.mutate({
      username,
      email,
      otp,
      password,
    });
  };

  return {
    // states
    step,
    setStep,
    username,
    setUsername,
    email,
    setEmail,
    otp,
    setOTP,
    password,
    setPassword,
    error,
    setError,

    // handlers
    handleSendOTP,
    handleVerifyOTP,
    handleChangePassword,

    // loading states
    loadingSendOTP: sendOTPMutation.isPending,
    loadingVerifyOTP: verifyOTPMutation.isPending,
    loadingChangePassword: resetPasswordMutation.isPending,

    // success flags
    isOTPSent: sendOTPMutation.isSuccess,
    isOTPVerified: verifyOTPMutation.isSuccess,
    isPasswordChanged: resetPasswordMutation.isSuccess,
  };
}

