'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

function SignUpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const error = searchParams.get("error");

  const getAlertMessage = () => {
    if (localError) {
      return { type: "error", text: localError };
    }
    if (error) {
      if (error === "Configuration" || error === "AccessDenied") {
        return {
          type: "error",
          text: "Authentication configuration error. Please ensure settings are correct.",
        };
      }
      return {
        type: "error",
        text: "Failed to sign up. Please try again.",
      };
    }
    return null;
  };

  const alert = getAlertMessage();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password || !confirmPassword) {
      setLocalError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (trimmedUsername.length < 3) {
      setLocalError("Username must be at least 3 characters long.");
      return;
    }
    if (password.length < 4) {
      setLocalError("Password must be at least 4 characters long.");
      return;
    }

    setLocalError("");
    setLoading(true);

    try {
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          password,
        }),
      });

      let data;
      const contentType = signupRes.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await signupRes.json();
      } else {
        const text = await signupRes.text();
        setLocalError(text.substring(0, 100) || `Server error (Status ${signupRes.status})`);
        setLoading(false);
        return;
      }

      if (!signupRes.ok) {
        setLocalError(data.error || "Failed to register user. Please try again.");
        setLoading(false);
        return;
      }

      // Auto login after successful signup
      const signinRes = await signIn("credentials", {
        username: trimmedUsername,
        password,
        redirect: false,
      });

      if (signinRes?.error) {
        router.push("/signin?registered=true");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setLocalError("An unexpected error occurred. Please try again.");
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
          <h2 className="text-lg font-bold text-slate-800">Create your account</h2>
          <p className="text-xs text-slate-500 mt-1">Sign up with a username and password below</p>
        </div>

        {/* Dynamic Alerts */}
        {alert && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <span className="text-base leading-none pt-0.5">⚠️</span>
            <span>{alert.text}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
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

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 placeholder:text-slate-400 font-medium bg-slate-50/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 mt-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Already have an account? </span>
          <Link href="/signin" className="text-blue-600 font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500 font-semibold animate-pulse">
        Loading registration portal...
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
