// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { AlertCircle } from "lucide-react";
// import { useEffect } from "react";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
// import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

 
//   const EmailInput = ({ username, setUsername, onNext }) => (
//     <div className="min-h-screen flex items-center w-full justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
//       <Card
//         className="
//           w-full 
//           max-w-xl
//           shadow-lg
//           rounded-3xl 
//           border border-gray-200 
//           bg-white/95 
//           backdrop-blur-sm
//           px-4 sm:px-6 lg:px-10 /* responsive padding */
//         "
//       >
//         <CardHeader className="text-center space-y-3 pb-4 pt-6">
//           <CardTitle className="text-3xl font-bold text-gray-900">
//             Reset Your Password
//           </CardTitle>
  
//           <CardDescription className="text-lg text-gray-600 max-w-sm mx-auto">
//             Enter your registered email address and we will send you an OTP to reset your password.
//           </CardDescription>
//         </CardHeader>
  
//         <CardContent className="space-y-5 py-2">
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="username" className="text-sm font-medium text-gray-700">
//               Email Address
//             </Label>
  
//             <Input
//               id="username"
//               placeholder="yourname@example.com"
//               className="
//                 h-14 
//                 text-lg 
//                 rounded-2xl
//                 border-gray-300 
//                 focus:ring-2 
//                 focus:ring-indigo-500 
//                 focus:border-indigo-500
//                 transition-all
//               "
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//         </CardContent>
  
//         <CardFooter className="pb-6">
//           <Button
//             onClick={onNext}
//             className="
//               w-full 
//               h-14 
//               rounded-2xl 
//               text-lg 
//               font-semibold 
//               bg-indigo-600 
//               hover:bg-indigo-700 
//               transition-all 
//               shadow-lg 
//               hover:shadow-xl
//             "
//           >
//             Send OTP
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );

  


// // const OTPInput = ({ otp, setOTP, onVerify }) => (
// //   <Card className="w-[350px]">
// //     <CardHeader>
// //       <CardTitle>Verify OTP</CardTitle>
// //       <CardDescription>Enter the OTP sent to your email</CardDescription>
// //     </CardHeader>

// //     <CardContent>
// //       <div className="flex flex-col space-y-1.5">
// //         <Label htmlFor="otp">OTP</Label>
// //         <Input
// //           id="otp"
// //           placeholder="Enter OTP"
// //           value={otp}
// //           onChange={(e) => setOTP(e.target.value)}
// //         />
// //       </div>
// //     </CardContent>

// //     <CardFooter>
// //       <Button onClick={onVerify}>Verify</Button>
// //     </CardFooter>
// //   </Card>
// // );


// const OTPInput = ({ otp, setOTP, onVerify }) => (
//   <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <Card className="w-[380px] rounded-2xl shadow-lg border border-gray-200 bg-white">
//         <CardHeader className="text-center space-y-2">
//           <CardTitle className="text-2xl font-semibold">Verify OTP</CardTitle>
//           <CardDescription className="text-gray-600">
//             Enter the 6-digit OTP sent to your email
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="otp" className="text-sm font-medium">OTP</Label>
//             <Input
//               id="otp"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOTP(e.target.value)}
//               className="h-12 text-lg tracking-widest text-center rounded-xl"
//             />
//           </div>
//         </CardContent>

//         <CardFooter className="pt-2">
//           <Button 
//             className="w-full h-11 rounded-xl text-base font-medium" 
//             onClick={onVerify}
//           >
//             Verify
//           </Button>
//         </CardFooter>
//       </Card>
//   </div>
// );


// const PasswordInput = ({ password, setPassword, onNext }) => (
//   <Card className="w-[350px]">
//     <CardHeader>
//       <CardTitle>Reset Password</CardTitle>
//       <CardDescription>Enter a new password</CardDescription>
//     </CardHeader>

//     <CardContent>
//       <div className="flex flex-col space-y-1.5">
//         <Label>Password</Label>
//         <Input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//     </CardContent>

//     <CardFooter>
//       <Button onClick={onNext}>Next</Button>
//     </CardFooter>
//   </Card>
// );

// const SuccessMessage = () => (
//   <Card className="w-[350px]">
//     <CardHeader>
//       <CardTitle>Password Reset</CardTitle>
//       <CardDescription>Password reset successful!</CardDescription>
//     </CardHeader>
//   </Card>
// );

// const ErrorMessage = () => <></>;

// export default function ForgotPasswordPage() {
//   const {
//     step,
//     setStep,
//     username,
//     setUsername,
//     otp,
//     setOTP,
//     password,
//     setPassword,
//     error,
//     setError,
//     handleSendOTP,
//     handleVerifyOTP,
//     handleChangePassword,
//   } = useForgotPassword();

//   useEffect(() => {
//     setError("");
//   }, [step]);

//   const steps = {
//     1: (
//       <EmailInput
//         username={username}
//         setUsername={setUsername}
//         onNext={handleSendOTP}
//       />
//     ),
//     2: (
//       <OTPInput otp={otp} setOTP={setOTP} onVerify={handleVerifyOTP} />
//     ),
//     3: (
//       <PasswordInput
//         password={password}
//         setPassword={setPassword}
//         onNext={handleChangePassword}
//       />
//     ),
//     4: <SuccessMessage />,
//     5: <ErrorMessage />,
//   };

//   return (
//     <div className=" flex items-center justify-center flex-col gap-4">
//       {error && (
//         <Alert variant="destructive" className="w-[350px] fixed top-10 left-1/2 -translate-x-1/2">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {steps[step]}
//     </div>
//   );
// }

























"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

/* ------------------------- EMAIL INPUT CARD ------------------------- */
// const EmailInput = ({ username, setUsername, onNext }) => (
//   <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
//     <Card
//       className="
//         w-full 
//         max-w-xl
//         shadow-lg
//         rounded-3xl 
//         border border-gray-200 
//         bg-white/95 
//         backdrop-blur-sm
//         px-4 sm:px-6 lg:px-10
//       "
//     >
//       <CardHeader className="text-center space-y-3 pb-4 pt-6">
//         <CardTitle className="text-3xl font-bold text-gray-900">
//           Reset Your Password
//         </CardTitle>

//         <CardDescription className="text-lg text-gray-600 max-w-sm mx-auto">
//           Enter your registered email and we will send you an OTP.
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-5 py-2">
//         <div className="flex flex-col space-y-2">
//           <Label htmlFor="username" className="text-sm font-medium text-gray-700">
//             Email Address
//           </Label>

//           <Input
//             id="username"
//             placeholder="yourname@example.com"
//             className="
//               h-14 
//               text-lg 
//               rounded-2xl
//               border-gray-300 
//               focus:ring-2 
//               focus:ring-indigo-500 
//               focus:border-indigo-500
//               transition-all
//             "
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//       </CardContent>

//       <CardFooter className="pb-6">
//         <Button
//           onClick={onNext}
//           className="
//             w-full 
//             h-14 
//             rounded-2xl 
//             text-lg 
//             font-semibold 
//             bg-indigo-600 
//             hover:bg-indigo-700 
//             transition-all 
//             shadow-lg 
//             hover:shadow-xl
//           "
//         >
//           Send OTP
//         </Button>
//       </CardFooter>
//     </Card>
//   </div>
// );

const EmailInput = ({ username, setUsername, email, setEmail, onNext }) => (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <Card
        className="
          w-full 
          max-w-xl
          shadow-lg
          rounded-3xl 
          border border-gray-200 
          bg-white/95 
          backdrop-blur-sm
          px-4 sm:px-6 lg:px-10
        "
      >
        <CardHeader className="text-center space-y-3 pb-4 pt-6">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Reset Your Password
          </CardTitle>
  
          <CardDescription className="text-lg text-gray-600 max-w-sm mx-auto">
            Enter your username and registered email to receive an OTP.
          </CardDescription>
        </CardHeader>
  
        <CardContent className="space-y-5 py-2">
  
          {/* Username Input */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              Username
            </Label>
  
            <Input
              id="username"
              placeholder="Enter your username"
              className="
                h-14 
                text-lg 
                rounded-2xl
                border-gray-300 
                focus:ring-2 
                focus:ring-indigo-500 
                focus:border-indigo-500
                transition-all
              "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
  
            <Input
              id="email"
              placeholder="yourname@example.com"
              className="
                h-14 
                text-lg 
                rounded-2xl
                border-gray-300 
                focus:ring-2 
                focus:ring-indigo-500 
                focus:border-indigo-500
                transition-all
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
        </CardContent>
  
        <CardFooter className="pb-6">
          <Button
            onClick={onNext}
            className="
              w-full 
              h-14 
              rounded-2xl 
              text-lg 
              font-semibold 
              bg-indigo-600 
              hover:bg-indigo-700 
              transition-all 
              shadow-lg 
              hover:shadow-xl
            "
          >
            Send OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
  
/* ------------------------- OTP INPUT CARD ------------------------- */
const OTPInput = ({ otp, setOTP, onVerify }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <Card
      className="
        w-full 
        max-w-xl
        shadow-lg
        rounded-3xl 
        border border-gray-200 
        bg-white/95 
        backdrop-blur-sm
        px-4 sm:px-6 lg:px-10
      "
    >
      <CardHeader className="text-center space-y-3 pb-2 pt-6">
        <CardTitle className="text-3xl font-bold text-gray-900">Verify OTP</CardTitle>
        <CardDescription className="text-lg text-gray-600 max-w-sm mx-auto">
          Enter the 6-digit OTP sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4 space-y-3">
        <Label className="text-sm font-medium text-gray-700">OTP</Label>
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          maxLength={6}
          className="
            h-14 
            text-xl 
            tracking-widest 
            text-center 
            rounded-2xl
            border-gray-300
            focus:ring-2 
            focus:ring-indigo-500 
            focus:border-indigo-500
            transition-all
          "
        />
      </CardContent>

      <CardFooter className="pb-6">
        <Button
          onClick={onVerify}
          className="
            w-full 
            h-14 
            rounded-2xl 
            text-lg 
            font-semibold 
            bg-indigo-600 
            hover:bg-indigo-700 
            transition-all 
            shadow-lg 
            hover:shadow-xl
          "
        >
          Verify OTP
        </Button>
      </CardFooter>
    </Card>
  </div>
);

/* ------------------------- NEW PASSWORD CARD ------------------------- */
const PasswordInput = ({ password, setPassword, onNext }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <Card
      className="
        w-full 
        max-w-xl
        shadow-lg
        rounded-3xl 
        border border-gray-200 
        bg-white/95 
        backdrop-blur-sm
        px-6 lg:px-10
      "
    >
      <CardHeader className="text-center space-y-3 pb-2 pt-6">
        <CardTitle className="text-3xl font-bold text-gray-900">Create New Password</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Enter your new password below.
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4 space-y-4">
        <Label className="text-sm font-medium text-gray-700">New Password</Label>
        <Input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            h-14 
            text-lg 
            rounded-2xl
            border-gray-300 
            focus:ring-2 
            focus:ring-indigo-500 
            focus:border-indigo-500
            transition-all
          "
        />
      </CardContent>

      <CardFooter className="pb-6">
        <Button
          onClick={onNext}
          className="
            w-full 
            h-14 
            rounded-2xl 
            text-lg 
            font-semibold 
            bg-indigo-600 
            hover:bg-indigo-700 
            shadow-lg 
            hover:shadow-xl
          "
        >
          Reset Password
        </Button>
      </CardFooter>
    </Card>
  </div>
);

/* ------------------------- SUCCESS MESSAGE ------------------------- */
const SuccessMessage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <Card className="max-w-lg w-full text-center rounded-3xl shadow-lg border bg-white/95 backdrop-blur-sm p-10">
      <CardTitle className="text-3xl font-bold text-green-600">🎉 Password Reset Successful!</CardTitle>
      <CardDescription className="text-lg text-gray-600 mt-3">
        You can now log in with your new password.
      </CardDescription>
    </Card>
  </div>
);

/* ------------------------- ERROR MESSAGE ------------------------- */
const ErrorMessage = () => <></>;

/* ------------------------- MAIN PAGE ------------------------- */
export default function ForgotPasswordPage() {
  const {
    step,
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
    handleSendOTP,
    handleVerifyOTP,
    handleChangePassword,
  } = useForgotPassword();

  useEffect(() => {
    setError("");
  }, [step]);

  const steps = {
    1: <EmailInput username={username} setUsername={setUsername} email={email} setEmail={setEmail} onNext={handleSendOTP} />,
    2: <OTPInput otp={otp} setOTP={setOTP} onVerify={handleVerifyOTP} />,
    3: <PasswordInput password={password} setPassword={setPassword} onNext={handleChangePassword} />,
    4: <SuccessMessage />,
    5: <ErrorMessage />,
  };

  return (
    <div className="relative">
      {error && (
        <Alert
          variant="destructive"
          className="
            w-[350px] 
            fixed 
            top-10 
            left-1/2 
            -translate-x-1/2 
            shadow-lg 
            rounded-xl
          "
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {steps[step]}
    </div>
  );
}

