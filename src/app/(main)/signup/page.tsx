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

      const data = await signupRes.json();

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

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
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

        {/* Divider */}
        <div className="relative my-6 text-center">
          <hr className="border-slate-200" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Or
          </span>
        </div>

        {/* Google Signup Option */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs py-3.5 px-4 rounded-xl shadow-sm transition-all active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.87-3c-1.08.72-2.47 1.16-4.09 1.16-3.15 0-5.82-2.13-6.78-5.01L1.24 17.3c2 3.97 6.11 6.7 10.76 6.7z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.44c-.28 1.48-1.12 2.73-2.37 3.58l3.87 3c2.26-2.09 3.55-5.17 3.55-8.71z"/>
            <path fill="#FBBC05" d="M5.22 14.12c-.24-.72-.38-1.5-.38-2.3a7.82 7.82 0 01.38-2.3L1.24 6.4C.45 7.98 0 9.77 0 11.64c0 1.87.45 3.66 1.24 5.24l3.98-2.76z"/>
            <path fill="#34A853" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.35 0 3.24 2.73 1.24 6.7l3.98 3.08c.96-2.88 3.63-5.03 6.78-5.03z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

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
