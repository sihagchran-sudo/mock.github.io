'use client';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SignInForm() {
  const searchParams = useSearchParams();

  // Read error parameters or verification parameters
  const error = searchParams.get("error");

  const getAlertMessage = () => {
    if (error) {
      if (error === "Configuration" || error === "AccessDenied") {
        return {
          type: "error",
          text: "Authentication configuration error. Please ensure Google OAuth credentials are correctly configured in your .env file.",
        };
      }
      return {
        type: "error",
        text: "Failed to sign in with Google. Please try again.",
      };
    }
    return null;
  };

  const alert = getAlertMessage();

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
          <h2 className="text-lg font-bold text-slate-800">Sign in to your account</h2>
          <p className="text-xs text-slate-500 mt-1">Google Sign-in Only Portal</p>
        </div>

        {/* Dynamic Alerts */}
        {alert && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <span className="text-base leading-none pt-0.5">⚠️</span>
            <span>{alert.text}</span>
          </div>
        )}

        <div className="space-y-6">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Create an account or sign in securely using your Google account to save attempt history and check pro passes.
          </p>

          {/* Google OAuth Login Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
          >
            {/* White Google Icon */}
            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.48 0-6.3-2.82-6.3-6.3s2.82-6.3 6.3-6.3c1.614 0 3.082.614 4.194 1.616l3.056-3.056C19.167 2.697 15.937 1.5 12.24 1.5 6.012 1.5 1 6.512 1 12.74s5.012 11.24 11.24 11.24c5.895 0 10.864-4.22 10.864-11.24 0-.668-.063-1.34-.177-1.97H12.24z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-slate-400">
          Secure authentication powered by Google OAuth.
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
