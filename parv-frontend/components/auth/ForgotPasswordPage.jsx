"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ChevronLeft, Loader2Icon, KeyRound, Mail, ShieldCheck, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

const AuthShell = ({ eyebrow, title, description, children, footer, sideNote }) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.18),_transparent_28%),linear-gradient(135deg,_#eff6ff_0%,_#ffffff_42%,_#f0fdfa_100%)]">
    <div className="grid min-h-screen w-full lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative hidden overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:46px_46px] opacity-30" />
        <div className="relative flex w-full flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/12 ring-1 ring-white/20 backdrop-blur">
              <img src="/logo/PAR2.png" alt="Parv Financial Services" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight">Parv Financial</p>
              <p className="text-sm uppercase tracking-[0.28em] text-blue-100/80">Services Pvt Ltd</p>
            </div>
          </div>

          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Password recovery workflow
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Securely recover access to your account.
            </h1>
            <p className="text-lg leading-8 text-blue-50/78">
              Verify your identity with username, registered email, and OTP before setting a new password.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black">Step 1</p>
                <p className="mt-2 text-sm text-blue-100/75">Confirm your registered identity</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black">Step 2</p>
                <p className="mt-2 text-sm text-blue-100/75">Verify OTP delivered to email</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black">Step 3</p>
                <p className="mt-2 text-sm text-blue-100/75">Create your new password</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-blue-100/70">Protected recovery flow for Parv Financial Services users</div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700">
            <ChevronLeft size={18} />
            Back to login
          </Link>
          {sideNote ? (
            <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              {sideNote}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-xl">
            <div className="mb-8 flex items-center gap-4 lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-600 shadow-lg shadow-blue-200">
                <img src="/logo/PAR2.png" alt="Parv Financial Services" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-slate-900">Parv Financial</p>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Services Pvt Ltd</p>
              </div>
            </div>

            <Card className="rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="space-y-3 px-8 pt-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
                  <KeyRound className="h-3.5 w-3.5" />
                  {eyebrow}
                </div>
                <div>
                  <CardTitle className="text-4xl font-black tracking-tight text-slate-900">{title}</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6 text-slate-500">{description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-2 pt-4">{children}</CardContent>
              {footer ? <CardFooter className="px-8 pb-8 pt-4">{footer}</CardFooter> : null}
            </Card>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const FieldWrap = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <Label className="text-sm font-semibold text-slate-700">{label}</Label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      {children}
    </div>
  </div>
);

const EmailInput = ({ username, setUsername, email, setEmail, onNext, isLoading }) => (
  <AuthShell
    eyebrow="Reset Access"
    title="Forgot password?"
    description="Enter your username and registered email address to receive a verification OTP."
    sideNote="Identity Check"
    footer={
      <Button
        onClick={onNext}
        disabled={isLoading}
        className="h-14 w-full rounded-2xl bg-blue-600 text-base font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Sending OTP
          </>
        ) : (
          "Send OTP"
        )}
      </Button>
    }
  >
    <div className="space-y-5">
      <FieldWrap label="Username" icon={UserCircle2}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </FieldWrap>
      <FieldWrap label="Email Address" icon={Mail}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </FieldWrap>
    </div>
  </AuthShell>
);

const OTPInput = ({ otp, setOTP, onVerify, isLoading }) => (
  <AuthShell
    eyebrow="Verify OTP"
    title="Check your inbox"
    description="Enter the OTP delivered to your registered email address to continue."
    sideNote="Step 2 of 3"
    footer={
      <Button
        onClick={onVerify}
        disabled={isLoading}
        className="h-14 w-full rounded-2xl bg-blue-600 text-base font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Verifying
          </>
        ) : (
          "Verify OTP"
        )}
      </Button>
    }
  >
    <FieldWrap label="One-Time Password" icon={ShieldCheck}>
      <Input
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base tracking-[0.3em] shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </FieldWrap>
  </AuthShell>
);

const PasswordInput = ({ password, setPassword, onNext, isLoading }) => (
  <AuthShell
    eyebrow="Set Password"
    title="Create a new password"
    description="Choose a strong password for your account. You will be redirected to login after reset."
    sideNote="Step 3 of 3"
    footer={
      <Button
        onClick={onNext}
        disabled={isLoading}
        className="h-14 w-full rounded-2xl bg-blue-600 text-base font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Updating password
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    }
  >
    <FieldWrap label="New Password" icon={KeyRound}>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </FieldWrap>
  </AuthShell>
);

const SuccessMessage = () => (
  <AuthShell
    eyebrow="Success"
    title="Password updated"
    description="Your password has been changed successfully. Redirecting you to login."
    sideNote="Completed"
    footer={
      <Button asChild className="h-14 w-full rounded-2xl bg-blue-600 text-base font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
        <Link href="/login">Go to Login</Link>
      </Button>
    }
  >
    <div className="rounded-3xl border border-green-100 bg-green-50 px-5 py-5 text-sm font-medium text-green-700">
      You can now use your new password to sign in to the Parv Financial dashboard.
    </div>
  </AuthShell>
);

const ErrorMessage = () => null;

export default function ForgotPasswordPage() {
  const router = useRouter();
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
    loadingSendOTP,
    loadingVerifyOTP,
    loadingChangePassword,
  } = useForgotPassword();

  useEffect(() => {
    setError("");
  }, [step, setError]);

  useEffect(() => {
    if (step !== 4) return;
    const timer = setTimeout(() => {
      router.push("/login");
    }, 1800);
    return () => clearTimeout(timer);
  }, [router, step]);

  const steps = {
    1: (
      <EmailInput
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        onNext={handleSendOTP}
        isLoading={loadingSendOTP}
      />
    ),
    2: <OTPInput otp={otp} setOTP={setOTP} onVerify={handleVerifyOTP} isLoading={loadingVerifyOTP} />,
    3: (
      <PasswordInput
        password={password}
        setPassword={setPassword}
        onNext={handleChangePassword}
        isLoading={loadingChangePassword}
      />
    ),
    4: <SuccessMessage />,
    5: <ErrorMessage />,
  };

  return (
    <div className="relative">
      {error ? (
        <Alert
          variant="destructive"
          className="fixed left-1/2 top-8 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border-red-200 bg-white shadow-xl"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {steps[step]}
    </div>
  );
}
