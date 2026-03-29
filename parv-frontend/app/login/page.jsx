"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronLeft, Loader2Icon, ShieldCheck, KeyRound, UserCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
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

            <div className="max-w-xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Secure access for DSA and internal teams
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black leading-tight tracking-tight">
                  Continue your lending workflow without friction.
                </h1>
                <p className="max-w-lg text-lg leading-8 text-blue-50/78">
                  Manage loan applications, connector activity, payouts, and operational follow-ups from one consistent workspace.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">24x7</p>
                  <p className="mt-2 text-sm text-blue-100/75">Access for field and back-office teams</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">Role</p>
                  <p className="mt-2 text-sm text-blue-100/75">Aware dashboards and permissions</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black">Fast</p>
                  <p className="mt-2 text-sm text-blue-100/75">Loan tracking with payout visibility</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-blue-100/70">
              Trusted workspace for Parv Financial Services operations
            </div>
          </div>
        </section>

        <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700">
              <ChevronLeft size={18} />
              Back to website
            </Link>
            <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
              Authorized Access
            </div>
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

              <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur xl:p-10">
                <div className="mb-8 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-blue-700">
                    <KeyRound className="h-3.5 w-3.5" />
                    Sign In
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Sign in to manage applications, commissions, and customer workflows.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs font-medium text-blue-700">
                    Only approved DSA and employee accounts can access this panel.
                  </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-semibold text-slate-700">
                      Username
                    </Label>
                    <div className="relative">
                      <UserCircle2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 text-base shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                        Password
                      </Label>
                      <Link href="/forget-password" className="text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="h-14 rounded-2xl border-slate-200 bg-slate-50 pl-12 pr-12 text-base shadow-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-700"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {loginMutation.isError ? (
                      <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {loginMutation.error?.message || "Unable to sign in. Please try again."}
                      </p>
                    ) : null}
                  </div>

                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="h-14 w-full rounded-2xl bg-blue-600 text-base font-bold shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Signing in
                      </>
                    ) : (
                      "Login to Dashboard"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
