'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  // Read error parameters or verification parameters
  const error = searchParams.get("error");

  const getAlertMessage = () => {
    if (localError) {
      return { type: "error", text: localError };
    }
    if (error) {
      if (error === "CredentialsSignin" || error === "CallbackRouteError") {
        return {
          type: "error",
          text: "Invalid username or password. Please try again.",
        };
      }
      if (error === "Configuration" || error === "AccessDenied") {
        return {
          type: "error",
          text: "Authentication configuration error. Please ensure settings are correct.",
        };
      }
      return {
        type: "error",
        text: "Failed to sign in. Please try again.",
      };
    }
    return null;
  };

  const alert = getAlertMessage();

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setLocalError("Please enter both username and password.");
      return;
    }
    setLocalError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username: username.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin" || res.error.includes("CredentialsSignin")) {
          setLocalError("Invalid username or password.");
        } else {
          setLocalError("An error occurred during sign in. Please try again.");
        }
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setLocalError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            MockMaster
          </Link>
          <h2 className="text-lg font-bold text-slate-800">Sign in to your account</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your username and password below</p>
        </div>

        {/* Dynamic Alerts */}
        {alert && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <span className="text-base leading-none pt-0.5">⚠️</span>
            <span>{alert.text}</span>
          </div>
        )}

        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. sihagchran"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 placeholder:text-slate-400 font-medium bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 placeholder:text-slate-400 font-medium bg-slate-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 mt-2"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Don't have an account? </span>
          <Link href="/signup" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-semibold animate-pulse">
        Loading sign in portal...
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
