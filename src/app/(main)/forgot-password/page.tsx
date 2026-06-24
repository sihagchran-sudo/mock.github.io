'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: trimmedUsername,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password. Please try again.");
      } else {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/signin?reset=true");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
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
          <h2 className="text-lg font-bold text-slate-800">Reset Your Password</h2>
          <p className="text-xs text-slate-500 mt-1">Enter your User ID and choose a new password</p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <span className="text-base leading-none pt-0.5">✅</span>
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3.5 mb-5 flex items-start gap-2.5">
            <span className="text-base leading-none pt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">User ID (Username)</label>
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
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-800 placeholder:text-slate-400 font-medium bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
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
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>

        {/* Redirect */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Remember your password? </span>
          <Link href="/signin" className="text-blue-600 font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
