"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    
    loginMutation.mutate({ username, password });
  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/auth/login.jpeg"
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Link href={"/"} className="flex text-blue-500 hover:underline items-center"><ChevronLeft size={19} />Back</Link>
        <div className="flex flex-1 items-center justify-center">
          <form
            className="flex flex-col border p-10 rounded-2xl w-[30rem] max-w-md items-start"
            onSubmit={handleSubmit}
          >
            {/* logo */}
            <div className="flex items-center justify-center w-full pb-3 space-x-1 rtl:space-x-reverse">
              <img src={'/logo/PAR2.png'} className="h-10" alt="Logo" />
              <div className="flex flex-col justify-start">
                <span className=" text-2xl text-slate-600 font-semibold whitespace-nowrap leading-5 dark:text-white">PARV</span>
                <span className="text-[0.6rem] text-blue-600">Financial Services</span>
              </div>
            </div>

            <div className="mb-8 w-full text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Welcome</h1>
              <p className="text-md text-gray-600">Login to your account</p>
              <p className="text-xs leading-0 text-blue-600 font-medium">
                *Only DSA or employees can log in
              </p>
            </div>


            {/* Added font-bold for better heading */}
            <div className="w-full gap-4 space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username} // Controlled input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your user Id"
                required
              />
              {/* password */}
              <div className="relative space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 transform -translate-y-1/4 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {loginMutation.isError && (
                  <p className="text-red-500 text-sm">
                    {loginMutation.error?.message || "An error occurred. Please try again."}
                  </p>
                )}
              </div>

              <Link
                href="/forget-password"
                className="text-blue-900 hover:underline text-sm text-center w-full"
              >
                Forgot your password?
              </Link>
              <Button type="submit" className="w-full mt-4" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

